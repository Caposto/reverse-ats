import { useState, useContext } from "react";
import KeywordList from "./KeywordList";
import KeywordContext from "../context";

function JobForm() {
  const [description, setDescription] = useState(""); // Create state for job description, default empty string
  const [visible, setVisibility] = useState(true); // Hide form once submitted
  const [keywords, setKeywords] = useContext(KeywordContext); // Create state for keywords received from server

  // TODO: Edit state of list with the intial list being the keywords processed from flask

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page from refreshing

    try {
      // TODO: store url for server in a .env file
      const response = await fetch("http://127.0.0.1:5000/extract_keywords", {
        method: "POST", // Using POST since GET does not accept a body
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });

      if (response.ok) {
        const res = response.json();
        res.then((prom) => setKeywords(prom)); // Store keywords in {keywords}
        setDescription(""); // Clear the form
        setVisibility(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Return form for inputting job description/
  return (
    <div id="standard-form" className="px-8 py-8">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Paste Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="text-xl" type="submit">
          Submit
        </button>
      </form>
      {visible && <div />}
      {!visible && (
        <div>
          <div className="py-4">
            <p className="text-2xl">Keywords:</p>
            <KeywordList keywordArray={keywords} />
          </div>
        </div>
      )}
    </div>
  );
}

export default JobForm;
