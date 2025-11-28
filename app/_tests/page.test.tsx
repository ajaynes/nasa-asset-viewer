import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home page', () => {
  it('testing shell', () => {
    render(<Home />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});

