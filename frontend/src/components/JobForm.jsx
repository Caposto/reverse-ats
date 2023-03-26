import { useState } from "react";
import KeywordList from "./KeywordList";
import Error from "./Error";
import getKeywordsFromFlask from "../services/User";

function JobForm() {
  const [description, setDescription] = useState("");
  const [visible, setVisibility] = useState(true);
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const apiKeywords = await getKeywordsFromFlask(description);
      setKeywords(apiKeywords);
      setDescription("");
      setVisibility(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="6"
          className="block px-4 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
        />
        <div className="py-4">
          <button className="text-xl p-2 rounded-md border border-2" type="submit">
            {loading ? <>Loading..</> : <>Submit</>}
          </button>
        </div>
      </form>
      {!visible && !error && (
        <div>
          <KeywordList initial={keywords} />
        </div>
      )}
      {error && <Error />}
    </div>
  );
}

export default JobForm;
