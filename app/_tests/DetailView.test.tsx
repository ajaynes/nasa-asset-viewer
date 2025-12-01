import { render, screen } from "@testing-library/react";
import DetailView from "@/app/item/[id]/DetailView";
import type { NasaItem } from "@/app/_types/nasa";

// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
jest.mock("next/image", () => (props: any) => {
  return <img {...props} />;
});

const mockItem: NasaItem = {
    data: [
        {
            nasa_id: "TEST_ID",
            title: "Test Title",
            description: "A test description for this NASA item",
            date_created: "2024-01-01T00:00:00Z",
            location: "Test Location",
            photographer: "Test Photographer",
            keywords: ["space", "test"],
            media_type: "image",
        },
    ],
    links: [
        {
            href: "https://example.com/preview.jpg",
            rel: "preview",
            render: "image",
        },
        {
            href: "https://example.com/canonical.jpg",
            rel: "canonical",
            render: "image",
        },
    ],
    href: ""
};

describe("DetailView", () => {
  it("renders data", () => {
    render(<DetailView item={mockItem} />);
    expect(screen.getByRole("heading", { name: /test title/i })).toBeInTheDocument();
    expect(screen.getByText(/a test description for this nasa item/i)).toBeInTheDocument();
    expect(screen.getByText(/test location/i)).toBeInTheDocument();
    expect(screen.getByText(/test photographer/i)).toBeInTheDocument();
    expect(screen.getByText(/Date:\s*2024-01-01T00:00:00Z/i)).toBeInTheDocument();
    const renderedKeywords = screen.getAllByText(/space|test/i);
    expect(renderedKeywords.length).toBeGreaterThan(0);
  });
});


it("renders preview image and download link", () => {
  render(<DetailView item={mockItem} />);

  const img = screen.getByRole("img", { name: /test title/i });
  expect(img).toHaveAttribute("src", "https://example.com/preview.jpg");

  const link = screen.getByRole("link", { name: /download image/i });
  expect(link).toHaveAttribute("href", "https://example.com/canonical.jpg");
});

const mockItemNoRel: NasaItem = {
  ...mockItem,
  links: [
    {
        href: "https://example.com/fallback.jpg",
        // rel: ""
    },
  ],
};

it("falls back to first link when rel attributes are missing", () => {
  render(<DetailView item={mockItemNoRel} />);

  const img = screen.getByRole("img", { name: /test title/i });
  expect(img).toHaveAttribute("src", "https://example.com/fallback.jpg");

  const link = screen.getByRole("link", { name: /download image/i });
  expect(link).toHaveAttribute("href", "https://example.com/fallback.jpg");
});


it("does not render image or download link when no links exist", () => {
  const itemWithoutLinks: NasaItem = {
    ...mockItem,
    links: undefined,
  };

  render(<DetailView item={itemWithoutLinks} />);

  expect(screen.queryByRole("img")).toBeNull();
  expect(
    screen.queryByRole("link", { name: /download image/i })
  ).toBeNull();
});

