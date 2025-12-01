import { render, screen } from "@testing-library/react";
import SearchBar from "@/app/_components/SearchBar";

describe("SearchBar", () => {
    it("renders the search input and btn", () => {
        const mockSearch = jest.fn();
        render(<SearchBar onSearch={mockSearch} />);

        const input = screen.getByPlaceholderText(/search/i);
        const button = screen.getByRole("button", { name: /search/i });

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });
});
