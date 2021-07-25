import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(
    /Retype the characters from the picture/i
  );
  expect(linkElement).toBeInTheDocument();
});
