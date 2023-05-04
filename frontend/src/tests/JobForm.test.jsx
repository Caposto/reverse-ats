import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobForm from "../components/Form";
import "@testing-library/jest-dom/extend-expect";

describe("JobForm", () => {
  test("render empty component", () => {
    render(<JobForm />);

    const jobDescriptionTextArea = screen.getByLabelText("Job Description Submission");
    const placeholderText = jobDescriptionTextArea.getAttribute("placeholder");

    expect(placeholderText).toBe("Enter Job Description");
  });

  test("handles empty submission and sets exception prop to true", async () => {
    render(<JobForm />);
    await userEvent.click(screen.getByLabelText("submit-button"));
    const form = screen.getByLabelText("form-test-id");
    expect(form).toHaveTextContent("No empty submissions allowed!");
  });
});
