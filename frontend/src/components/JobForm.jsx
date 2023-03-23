import { useState } from "react";
import KeywordList from "./KeywordList";
import Error from "./Error";
import getKeywordsFromFlask from "../services/User";

function JobForm() {
  const [description, setDescription] = useState("");
  const [visible, setVisibility] = useState(true);
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiKeywords = await getKeywordsFromFlask(description);
      setKeywords(apiKeywords);
      setDescription("");
      setVisibility(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      setError(true);
    }
  };

  return (
    <div id="standard-form">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="text-2xl" type="submit">
          Submit
        </button>
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
