import { useState } from "react";
import KeywordList2 from "./KeywordList2";
import getKeywordsFromFlask from "../Services/User";

function JobForm() {
  const [description, setDescription] = useState("");
  const [visible, setVisibility] = useState(true);
  const [keywords, setKeywords] = useState([]);

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
      {visible && <h2 className="text-lg"> Enter the job description above </h2>}
      {!visible && (
        <div>
          <KeywordList2 initial={keywords} />
        </div>
      )}
    </div>
  );
}

export default JobForm;
