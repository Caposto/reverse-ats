import { useState } from "react";
import KeywordList from "./KeywordList";
import Error from "./Error";
import getKeywordsFromFlask from "../services/User";

function JobForm() {
  const [description, setDescription] = useState("");
  const [visible, setVisibility] = useState(true);
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);
  const [exception, setException] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const maxJobDescriptionLength = 5000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle empty string and whitespace submissions
    if (description.trim().length === 0) {
      setException(true);
      setDescription("");
      setCount(0);
    } else {
      try {
        setException(false);
        setLoading(true);
        const apiKeywords = await getKeywordsFromFlask(description);
        setKeywords(apiKeywords);
        setDescription("");
        setCount(0);
        setVisibility(false);
        setLoading(false);
        setSubmitted(true);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    }
  };

  const submitNewDescription = () => {
    setKeywords([]);
    setVisibility(true);
    setSubmitted(false);
  };

  return (
    <div aria-label="form-test-id" className="px-8">
      {!submitted && (
        <form onSubmit={handleSubmit}>
          <textarea
            aria-label="Job Description Submission"
            placeholder="Enter Text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setCount(e.target.value.length);
            }}
            rows="6"
            maxLength={maxJobDescriptionLength}
            className="block px-4 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
          />
          <div className="pt-2">
            Character Limit: {count}/{maxJobDescriptionLength}
          </div>
          <div className="py-4">
            <button
              className="text-xl p-2 rounded-md border border-2"
              type="submit"
              aria-label="Submit Button"
            >
              Extract
            </button>
          </div>
        </form>
      )}
      <div className="text-xl"> {loading ? <>Loading...</> : ""} </div>
      {!visible && !error && !exception && (
        <div>
          <KeywordList initial={keywords} />
          <button
            className="text-xl p-2 rounded-md border border-2"
            type="submit"
            onClick={submitNewDescription} // FIXME: Is there a way to reload just the component instead of whole page?
          >
            Submit New Description
          </button>
        </div>
      )}
      {error && <Error />}
      {exception && (
        <Error errorMessage="No empty submissions allowed! Please try again." />
      )}
    </div>
  );
}

export default JobForm;
