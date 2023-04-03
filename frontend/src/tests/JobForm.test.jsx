import { render, screen } from "@testing-library/react";
import JobForm from "../components/JobForm";

test("render empty component", () => {
  render(<JobForm />);

  const jobDescriptionTextArea = screen.getByLabelText("Job Description Submission");
  const placeholderText = jobDescriptionTextArea.getAttribute("placeholder");

  expect(placeholderText).toBe("Enter Job Description");
});
