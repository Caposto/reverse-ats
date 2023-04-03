import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobForm from "../components/JobForm";

describe("JobForm", () => {
  test("render empty component", () => {
    render(<JobForm />);

    const jobDescriptionTextArea = screen.getByLabelText("Job Description Submission");
    const placeholderText = jobDescriptionTextArea.getAttribute("placeholder");

    expect(placeholderText).toBe("Enter Job Description");
  });

  test("handles empty submission and sets exception prop to true", async () => {
    render(<JobForm />);

    const submitButton = screen.getByLabelText("Submit Button");
    userEvent.click(submitButton);

    await waitFor(() => {
      const jobFormInstance = screen.getByLabelText("form-test-id").parentNode;
      expect(jobFormInstance.props.exception).toBe(true);
    });
  });
});
