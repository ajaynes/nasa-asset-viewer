import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filters from "@/app/_components/Filters";

describe("Filters", () => {
  it("render all, images, and video options", () => {
    const mockOnChange = jest.fn();

    render(<Filters mediaType="all" onMediaTypeChange={mockOnChange} />);

    expect(screen.getByLabelText(/all/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/images/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/video/i)).toBeInTheDocument();
  });

  it("checks the radio that matches the mediaType prop", () => {
    const mockOnChange = jest.fn();
    const { rerender } = render(
      <Filters mediaType="all" onMediaTypeChange={mockOnChange} />
    );

    const allRadio = screen.getByLabelText(/all/i) as HTMLInputElement;
    const imagesRadio = screen.getByLabelText(/images/i) as HTMLInputElement;
    const videoRadio = screen.getByLabelText(/video/i) as HTMLInputElement;

    expect(allRadio.checked).toBe(true);
    expect(imagesRadio.checked).toBe(false);
    expect(videoRadio.checked).toBe(false);

    rerender(<Filters mediaType="image" onMediaTypeChange={mockOnChange} />);

    expect(allRadio.checked).toBe(false);
    expect(imagesRadio.checked).toBe(true);
    expect(videoRadio.checked).toBe(false);

    rerender(<Filters mediaType="video" onMediaTypeChange={mockOnChange} />);

    expect(allRadio.checked).toBe(false);
    expect(imagesRadio.checked).toBe(false);
    expect(videoRadio.checked).toBe(true);
  });

  it("calls onMediaTypeChange when different option selected", async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();

    render(<Filters mediaType="all" onMediaTypeChange={mockOnChange} />);

    const imagesRadio = screen.getByLabelText(/images/i);
    const videoRadio = screen.getByLabelText(/video/i);

    await user.click(imagesRadio);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("image");

    await user.click(videoRadio);
    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenLastCalledWith("video");
  });
});
