import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobForm from "../components/JobForm";
import getKeywordsFromFlask from "../services/User";

jest.mock("../services/User");

const mockGetKeywordsFromFlask = getKeywordsFromFlask;

describe("JobForm", () => {
  test("renders JobForm component", () => {
    render(<JobForm />);
    expect(screen.getByPlaceholderText("Enter Job Description")).toBeInTheDocument();
  });

  test("handles empty submission", async () => {
    render(<JobForm />);
    userEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(screen.getByText("No empty submissions allowed!")).toBeInTheDocument();
    });
  });

  test("handles valid submission", async () => {
    const mockKeywords = ["keyword1", "keyword2", "keyword3"];
    mockGetKeywordsFromFlask.mockResolvedValueOnce(mockKeywords);

    render(<JobForm />);
    const descriptionInput = screen.getByPlaceholderText("Enter Job Description");
    userEvent.type(descriptionInput, "Sample job description");
    userEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockGetKeywordsFromFlask).toHaveBeenCalledTimes(1);
      expect(mockGetKeywordsFromFlask).toHaveBeenCalledWith("Sample job description");
      expect(screen.getByText("Submit New Description")).toBeInTheDocument();
    });
  });

  test("handles API error", async () => {
    mockGetKeywordsFromFlask.mockRejectedValueOnce(new Error("API error"));

    render(<JobForm />);
    const descriptionInput = screen.getByPlaceholderText("Enter Job Description");
    userEvent.type(descriptionInput, "Sample job description");
    userEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockGetKeywordsFromFlask).toHaveBeenCalledTimes(1);
      expect(mockGetKeywordsFromFlask).toHaveBeenCalledWith("Sample job description");
      expect(
        screen.getByText("Something went wrong. Please try again later.")
      ).toBeInTheDocument();
    });
  });
});
