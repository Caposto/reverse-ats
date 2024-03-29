import { useState, useContext } from "react";
import PropTypes from "prop-types";
import KeywordList from "./KeywordList";
import Error from "./Error";
import Loader from "../Loader";
import getKeywordsFromFlask from "../services/ApiCall";
import KeywordsContext from "../services/KeywordContext";

function DynamicForm({ descriptionType }) {
  const [description, setDescription] = useState("");
  const [visible, setVisibility] = useState(true);
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);
  const [exception, setException] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { handleJobKeywords, handleResumeKeywords } = useContext(KeywordsContext);

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

        // Ensure consitency of keyword list when comparing
        const apiKeywords = await getKeywordsFromFlask(description);
        const formattedKeywords = apiKeywords.map((keyword, index) => ({
          id: index + 1,
          text: keyword,
          isComplete: false,
        }));

        setKeywords(apiKeywords);

        // Update parent keywords with useContext
        if (descriptionType === "job") {
          handleJobKeywords(formattedKeywords);
        } else if (descriptionType === "resume") {
          handleResumeKeywords(formattedKeywords);
        }

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
    <div aria-label="form-test-id" className="px-12">
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
          <div className="flex items-center">
            <div className="p-4">
              <button className="button-sm" type="submit" aria-label="Submit Button">
                Extract
              </button>
            </div>
            <div>
              Character Limit: {count}/{maxJobDescriptionLength}
            </div>
            <div className="text-xl pl-2"> {loading ? <Loader /> : ""} </div>
          </div>
        </form>
      )}
      {!visible && !error && !exception && (
        <div>
          <KeywordList initial={keywords} descriptionType={descriptionType} />
          <div className="text-center py-2">
            <button className="button-sm" type="submit" onClick={submitNewDescription}>
              Submit New Description
            </button>
          </div>
        </div>
      )}
      {error && <Error />}
      {exception && (
        <Error errorMessage="No empty submissions allowed! Please try again." />
      )}
    </div>
  );
}

DynamicForm.propTypes = {
  descriptionType: PropTypes.string.isRequired,
};

export default DynamicForm;
