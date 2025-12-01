/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";
import { fetchDataAsync } from "@/app/_utils/fetch";
import type { NasaSearchResponse } from "@/app/_types/nasa";

jest.mock("next/image", () => (props: any) => {
  return <img {...props} />;
});

jest.mock("next/link", () => {
    return ({ href, children }: any) => <a href={href}>{children}</a>
})

jest.mock('@/app/_utils/fetch', () => ({
  __esModule: true,
  fetchDataAsync: jest.fn(),
}));

const testFetch = fetchDataAsync as jest.MockedFunction<typeof fetchDataAsync>;

const mockNasaItemMars = {
  data: [
    {
      nasa_id: "MARS_ID",
      title: "Mars Image",
      description: "Mars description",
      date_created: "2024-01-01T00:00:00Z",
      location: "Mars",
      photographer: "Mars Photographer",
      keywords: ["mars", "planet"],
      media_type: "image",
    },
  ],
  links: [
    {
      href: "https://example.com/mars-preview.jpg",
      rel: "preview",
      render: "image",
    },
  ],
};

const buildResponse = (items: any[]) =>
  ({
    collection: {
      version: '1.0',
      href: 'https://example.com/search',
      items,
    },
  } as NasaSearchResponse);

beforeEach(() => {
  jest.clearAllMocks();
});

it("loading, API fetch, render initial results", async () => {
  testFetch.mockResolvedValueOnce(buildResponse([mockNasaItemMars]));

  render(<Home />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  expect(testFetch).toHaveBeenCalledWith("mars", "all");

  const marsHeading = await screen.findByRole("heading", {
    name: /mars image/i,
  });
  expect(marsHeading).toBeInTheDocument();

  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();

  expect(screen.getByText(/media type:\s*image/i)).toBeInTheDocument();
});


it("error for failed API call", async () => {
  testFetch.mockRejectedValueOnce(new Error("error"));

  render(<Home />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  const errorMessage = await screen.findByText(/something went wrong/i);
  expect(errorMessage).toBeInTheDocument();

  expect(screen.queryByRole("heading", { name: /mars image/i })).toBeNull();
});
