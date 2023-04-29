import { useState, useMemo } from "react";
import JobForm from "./components/Form";
import Matches from "./components/Matches";
import KeywordsContext from "./services/KeywordContext";

function App() {
  const [jobKeywords, setJobKeywords] = useState([]);
  const [resumeKeywords, setResumeKeywords] = useState([]);

  // Used For Comparison
  const commonKeywords = new Set();
  const recommendedKeywords = [];

  const handleJobKeywords = (keywords) => {
    setJobKeywords(keywords);
  };

  const handleResumeKeywords = (keywords) => {
    setResumeKeywords(keywords);
  };

  const compareKeywords = () => {
    const resumeKeywordsSet = new Set(resumeKeywords.map((keyword) => keyword.text));

    Object.values(jobKeywords).forEach((jobKeyword) => {
      if (resumeKeywordsSet.has(jobKeyword.text)) {
        commonKeywords.add(jobKeyword.text);
      }
    });

    Object.values(resumeKeywords).forEach((resumeKeyword) => {
      if (!commonKeywords.has(resumeKeyword.text)) {
        recommendedKeywords.push(resumeKeyword.text);
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
      <Matches
        commonKeywords={commonKeywords}
        recommendedKeywords={recommendedKeywords}
        percentage={100}
      />
    </div>
  );
}

export default App;
