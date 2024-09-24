import { render, screen, fireEvent } from "@testing-library/react";
import EmojiWidget from "./EmojiWidget";
import Swal from "sweetalert2";

// Mock SweetAlert2
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

test("renders emoji widget and asks how user feels", () => {
  render(<EmojiWidget />); // React Testing Library automatically wraps this in act
  const questionElement = screen.getByText(/How are you feeling today?/i);
  expect(questionElement).toBeInTheDocument();
});

test("renders all emoji options", () => {
  render(<EmojiWidget />);
  const emojis = ["Terrible", "Bad", "Alright", "Pretty Good", "Fantastic"];

  emojis.forEach((emoji) => {
    expect(screen.getByText(emoji)).toBeInTheDocument();
  });
});

test("allows user to select an emoji", () => {
  render(<EmojiWidget />);

  const emojiOption = screen.getByText("Fantastic");
  fireEvent.click(emojiOption); // Simulate clicking on the "Fantastic" emoji

  const selectedEmoji = emojiOption.closest(".emoji-container");
  expect(selectedEmoji).toHaveClass("selected");
});

test("disables submit button if no emoji is selected", () => {
  render(<EmojiWidget />);

  const submitButton = screen.getByText("Continue");
  expect(submitButton).toBeDisabled(); // Button should be disabled initially
});

test("enables submit button after selecting an emoji", () => {
  render(<EmojiWidget />);

  const emojiOption = screen.getByText("Pretty Good");
  fireEvent.click(emojiOption); // Select an emoji

  const submitButton = screen.getByText("Continue");
  expect(submitButton).not.toBeDisabled(); // Button should now be enabled
});

test("shows success alert after submitting selected emoji", () => {
  render(<EmojiWidget />);

  const emojiOption = screen.getByText("Pretty Good");
  fireEvent.click(emojiOption); // Select an emoji

  const submitButton = screen.getByText("Continue");
  fireEvent.click(submitButton); // Submit the selected emoji

  expect(Swal.fire).toHaveBeenCalledWith({
    icon: "success",
    title: "Good job!",
    text: "Your feeling Pretty Good submitted successfully",
  });
});
