import { useState, useContext } from "react";
import KeywordList from "./KeywordList";
import KeywordContext from "../context";
import getKeywordsFromFlask from "../Services/User";

function JobForm() {
  const [description, setDescription] = useState("");
  const [visible, setVisibility] = useState(true);
  const [keywords, setKeywords] = useContext(KeywordContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiKeywords = await getKeywordsFromFlask(description);
      setKeywords(apiKeywords);
      setDescription("");
      setVisibility(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="standard-form">
      {visible && (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Paste Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="text-2xl" type="submit">
            Submit
          </button>
        </form>
      )}
      {!visible && (
        <div>
          <KeywordList keywordArray={keywords} />
        </div>
      )}
    </div>
  );
}

export default JobForm;
