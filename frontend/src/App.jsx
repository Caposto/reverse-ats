import { useState, useMemo } from "react";
import JobForm from "./components/JobForm";
import KeywordsContext from "./services/KeywordContext";

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
    const resumeTextKeywords = resumeKeywords.map((keyword) => keyword.text);
    const resumeKeywordsSet = new Set(resumeTextKeywords);
    const commonKeywords = new Set();
    const recommendedKeywords = [];

    Object.values(jobKeywords).forEach((jobKeyword) => {
      if (resumeKeywordsSet.has(jobKeyword.text)) {
        commonKeywords.add(jobKeyword.text);
      }
    });

    Object.values(resumeTextKeywords).forEach((resumeKeyword) => {
      if (!commonKeywords.has(resumeKeyword)) {
        recommendedKeywords.push(resumeKeyword);
      }
    });
  };

  // Handles Error: changes every render
  const keywordsContextValue = useMemo(() => ({
    handleJobKeywords,
    handleResumeKeywords,
  }));

  return (
    <div className="flex">
      <KeywordsContext.Provider value={keywordsContextValue}>
        <div>
          <h1 className="text-xl text-center">Job Description</h1>
          <JobForm className="grow" descriptionType="job" />
        </div>
        <div>
          <h1 className="text-xl text-center">Resume</h1>
          <JobForm className="grow" descriptionType="resume" />
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
      </KeywordsContext.Provider>
    </div>
  );
}

export default App;
