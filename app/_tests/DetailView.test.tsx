/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import { axe } from "jest-axe";
import DetailView from '@/app/_components/DetailView';
import type { NasaItem } from '@/app/_types/nasa';

jest.mock('next/image', () => (props: any) => {
  const { fill: _ignoredFill, priority: _ignoredPriority, ...rest } = props;
  return <img {...rest} />;
});

const mockItem: NasaItem = {
  data: [
    {
      nasa_id: 'TEST_ID',
      title: 'Test Title',
      description: 'A test description for this NASA item',
      date_created: '2024-01-01T00:00:00Z',
      location: 'Test Location',
      photographer: 'Test Photographer',
      keywords: ['space', 'test'],
      media_type: 'image',
    },
  ],
  links: [
    {
      href: 'https://example.com/preview.jpg',
      rel: 'preview',
      render: 'image',
    },
    {
      href: 'https://example.com/canonical.jpg',
      rel: 'canonical',
      render: 'image',
    },
  ],
  href: '',
};

const mockItemNoRel: NasaItem = {
  ...mockItem,
  links: [
    {
      href: 'https://example.com/fallback.jpg',
      // rel missing / empty so the component will fall back to first link
    } as any,
  ],
};

describe('DetailView', () => {
  it('renders core metadata fields', () => {
    render(<DetailView item={mockItem} />);

    expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument();

    expect(screen.getByText(/a test description for this nasa item/i)).toBeInTheDocument();

    expect(screen.getByText(/test location/i)).toBeInTheDocument();

    expect(screen.getByText(/test photographer/i)).toBeInTheDocument();

    expect(screen.getByText(/^date$/i)).toBeInTheDocument();
    expect(screen.getByText(/Dec 31, 2023/i)).toBeInTheDocument();

    expect(screen.getByText(/^space$/i)).toBeInTheDocument();
    expect(screen.getByText(/^test$/i)).toBeInTheDocument();
  });


  it('renders preview image and canonical download link when rels are present', () => {
    render(<DetailView item={mockItem} />);

    const img = screen.getByRole('img', { name: /test title/i });
    expect(img).toHaveAttribute('src', 'https://example.com/preview.jpg');

    const link = screen.getByRole('link', { name: /download image/i });
    expect(link).toHaveAttribute('href', 'https://example.com/canonical.jpg');
  });


  it('falls back to first link for preview + download when rel attributes are missing', () => {
    render(<DetailView item={mockItemNoRel} />);

    const img = screen.getByRole('img', { name: /test title/i });
    expect(img).toHaveAttribute('src', 'https://example.com/fallback.jpg');

    const link = screen.getByRole('link', { name: /download image/i });
    expect(link).toHaveAttribute('href', 'https://example.com/fallback.jpg');
  });


  it('does not render image or download link when no links exist', () => {
    const itemWithoutLinks: NasaItem = {
      ...mockItem,
      links: undefined,
    };

    render(<DetailView item={itemWithoutLinks} />);

    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.queryByRole('link', { name: /download image/i })).toBeNull();
  });


  it('handles missing keywords gracefully', () => {
    const itemWithoutKeywords: NasaItem = {
      ...mockItem,
      data: [
        {
          ...mockItem.data[0],
          keywords: undefined,
        },
      ],
    };

    render(<DetailView item={itemWithoutKeywords} />);

    expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
  const { container } = render(<DetailView item={mockItem} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
});
