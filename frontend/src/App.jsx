import { useState } from "react";
import JobForm from "./components/JobForm";

function App() {
  const [jobKeywords, setJobKeywords] = useState([]);
  const [resumeKeywords, setResumeKeywords] = useState([]);

  const handleJobKeywords = (keywords) => {
    setJobKeywords(keywords);
  };

  const handleResumeKeywords = (keywords) => {
    setResumeKeywords(keywords);
  };

  const compareKeywords = () => {
    console.log(jobKeywords);
    console.log(resumeKeywords);
  };

  return (
    <div className="flex">
      <div>
        <h1 className="text-xl text-center">Job Description</h1>
        <JobForm className="grow" onKeywordsChange={handleJobKeywords} />
      </div>
      <div>
        <h1 className="text-xl text-center">Resume</h1>
        <JobForm className="grow" onKeywordsChange={handleResumeKeywords} />
      </div>
      <div>
        <button
          type="submit"
          onClick={compareKeywords}
          className="text-xl p-2 rounded-md border border-2"
        >
          Compare
        </button>
      </div>
    </div>
  );
}

export default App;
