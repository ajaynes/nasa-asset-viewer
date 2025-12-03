import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '@/app/_components/SearchBar';

describe('SearchBar', () => {
  it('renders the search input and btn', () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('update input value as user types', async () => {
    const mockSearch = jest.fn();
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText(/search/i);

    await user.type(input, 'mars');

    expect(input).toHaveValue('mars');
  });

  it('submit by typing enter', async () => {
    const mockSearch = jest.fn();
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText(/search/i);

    await user.type(input, 'saturn{enter}');

    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(mockSearch).toHaveBeenCalledWith('saturn');
  });


  it('submits by pressing Enter and calls onSearch with trimmed value', async () => {
    const mockSearch = jest.fn();
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText(/search/i);

    await user.type(input, '   saturn  {enter}');

    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(mockSearch).toHaveBeenCalledWith('saturn');
  });


  it('submits by clicking the Search button', async () => {
    const mockSearch = jest.fn();
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'jupiter');
    await user.click(button);

    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(mockSearch).toHaveBeenCalledWith('jupiter');
  });


  it("does not call onSearch when input is empty", async () => {
    const mockSearch = jest.fn();
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockSearch} />);

    const button = screen.getByRole("button", { name: /search/i });

    await user.click(button);

    expect(mockSearch).not.toHaveBeenCalled();
  });


  it("does not call onSearch when input is only whitespace", async () => {
    const mockSearch = jest.fn();
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole("button", { name: /search/i });

    await user.type(input, "    ");
    await user.click(button);

    expect(mockSearch).not.toHaveBeenCalled();
  });

});
