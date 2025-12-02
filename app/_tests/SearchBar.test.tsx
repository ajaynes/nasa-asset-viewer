import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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


    it("update input value as user types", async () => {
        const mockSearch = jest.fn();
        const user = userEvent.setup();
        render(<SearchBar onSearch={mockSearch} />);

        const input = screen.getByPlaceholderText(/search/i);

        await user.type(input, "mars");

        expect(input).toHaveValue("mars");
    });


    it("submit by typing enter", async () => {
        const mockSearch = jest.fn();
        const user = userEvent.setup();
        render(<SearchBar onSearch={mockSearch} />);

        const input = screen.getByPlaceholderText(/search/i);

        await user.type(input, "saturn{enter}");

        expect(mockSearch).toHaveBeenCalledTimes(1);
        expect(mockSearch).toHaveBeenCalledWith("saturn");
    });

    // TODO: empty input value, untrimmed input value
});
