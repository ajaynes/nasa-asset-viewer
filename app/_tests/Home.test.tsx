/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';
import { fetchDataAsync } from '@/app/_utils/fetch';
import type { NasaSearchResponse } from '@/app/_types/nasa';

const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

afterAll(() => {
  consoleErrorSpy.mockRestore();
});

jest.mock('next/image', () => ({ fill: _ignored, ...props }: any) => {
  return <img {...props} />;
});

jest.mock('next/link', () => {
  return ({ href, children }: any) => <a href={href}>{children}</a>;
});

jest.mock('@/app/_utils/fetch', () => ({
  __esModule: true,
  fetchDataAsync: jest.fn(),
}));

const mockFetch = fetchDataAsync as jest.MockedFunction<typeof fetchDataAsync>;

const mockNasaItemMars = {
  data: [
    {
      nasa_id: 'MARS_ID',
      title: 'Mars Image',
      description: 'Mars description',
      date_created: '2024-01-01T00:00:00Z',
      location: 'Mars',
      photographer: 'Mars Photographer',
      keywords: ['mars', 'planet'],
      media_type: 'image',
    },
  ],
  links: [
    {
      href: 'https://example.com/mars-preview.jpg',
      rel: 'preview',
      render: 'image',
    },
  ],
};

const mockNasaItemJupiter = {
  data: [
    {
      nasa_id: 'JUPITER_ID',
      title: 'Jupiter Image',
      description: 'Jupiter description',
      date_created: '2024-01-01T00:00:00Z',
      location: 'Jupiter',
      photographer: 'Jupiter Photographer',
      keywords: ['jupiter', 'planet'],
      media_type: 'image',
    },
  ],
  links: [
    {
      href: 'https://example.com/jupiter-preview.jpg',
      rel: 'preview',
      render: 'image',
    },
  ],
};

const buildResponse = (items: any[], totalHits = items.length) =>
  ({
    collection: {
      version: '1.0',
      href: 'https://example.com/search',
      items,
      metadata: {
        total_hits: totalHits,
      },
    },
  } as NasaSearchResponse);

beforeEach(() => {
  jest.clearAllMocks();
});

it('fetches and renders initial results with summary', async () => {
  mockFetch.mockResolvedValueOnce(buildResponse([mockNasaItemMars], 42));

  render(<Home />);

  const marsHeading = await screen.findByRole('heading', {
    name: /mars image/i,
  });
  expect(marsHeading).toBeInTheDocument();

  expect(mockFetch).toHaveBeenCalledWith('mars', 'all', 1);
});

it('renders an error message when the API call fails', async () => {
  mockFetch.mockRejectedValueOnce(new Error('error'));

  render(<Home />);

  const errorMessage = await screen.findByText(/something went wrong/i);
  expect(errorMessage).toBeInTheDocument();
});

it('searches a new term and loads new results', async () => {
  mockFetch.mockResolvedValueOnce(buildResponse([mockNasaItemMars], 1)).mockResolvedValueOnce(buildResponse([mockNasaItemJupiter], 1));

  const user = userEvent.setup();

  render(<Home />);

  await screen.findByRole('heading', { name: /mars image/i });

  const input = screen.getByPlaceholderText(/search/i);
  const button = screen.getByRole('button', { name: /search/i });

  await user.clear(input);
  await user.type(input, 'jupiter');
  await user.click(button);

  await waitFor(() => {
    expect(mockFetch).toHaveBeenLastCalledWith('jupiter', 'all', 1);
  });

  const jupiterHeading = await screen.findByRole('heading', {
    name: /jupiter image/i,
  });

  expect(jupiterHeading).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /mars image/i })).not.toBeInTheDocument();
});

it('filters results by media type (video)', async () => {
  mockFetch.mockResolvedValue(buildResponse([mockNasaItemMars], 1));

  const user = userEvent.setup();
  render(<Home />);

  await screen.findByRole('heading', { name: /mars image/i });

  const videoRadio = screen.getByLabelText(/video/i);

  await user.click(videoRadio);

  await waitFor(() => {
    expect(mockFetch).toHaveBeenLastCalledWith('mars', 'video', 1);
  });
});
