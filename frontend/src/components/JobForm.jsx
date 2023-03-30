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
      } catch (err) {
        setLoading(false);
        // eslint-disable-next-line no-console
        console.log(err);
        setError(true);
      }
    }
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter Job Description"
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
          <button className="text-xl p-2 rounded-md border border-2" type="submit">
            {loading ? <>Loading..</> : <>Submit</>}
          </button>
        </div>
      </form>
      {!visible && !error && !exception && (
        <div>
          <KeywordList initial={keywords} />
          <button
            className="text-xl p-2 rounded-md border border-2"
            type="submit"
            onClick={() => window.location.reload()} // FIXME: Is there a way to reload just the component instead of whole page?
          >
            Submit New Description
          </button>
        </div>
      )}
      {error && <Error />}
      {exception && <Error errorMessage="No empty submissions allowed!" />}
    </div>
  );
}

export default JobForm;
