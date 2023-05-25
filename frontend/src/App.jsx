import { useState, useMemo } from "react";
import DynamicForm from "./components/DynamicForm";
import Matches from "./components/Matches";
import KeywordsContext from "./services/KeywordContext";

function App() {
  const [jobKeywords, setJobKeywords] = useState([]);
  const [resumeKeywords, setResumeKeywords] = useState([]);
  const [commonKeywordsState, setCommonKeywordsState] = useState(new Set());
  const [recommendedKeywordsState, setRecommendedKeywordsState] = useState([]);
  const [showMatches, setShowMatches] = useState(false);
  const [percentage, setPercentage] = useState(0);

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

    setCommonKeywordsState(commonKeywords);
    setRecommendedKeywordsState(recommendedKeywords);
    setPercentage(Math.floor((commonKeywords.size / resumeKeywords.length) * 100));
    setShowMatches(true);
  };

  // FIXME: How can I preseve the resume keyword list
  const compareNewDescription = () => {
    setCommonKeywordsState(new Set());
    setRecommendedKeywordsState([]);
    setPercentage(0);
    setShowMatches(false);
  };

  const switchRoutes = () => {
    setShowMatches(!showMatches);
  };

  // Handles Error: changes every render
  const keywordsContextValue = useMemo(
    () => ({
      handleJobKeywords,
      handleResumeKeywords,
    }),
    []
  );

  // TODO: Remove reference frame: <div className="relative"> & <div className="popup-frame" />

  return (
    <div className="flex flex-col min-h-screen">
      <div className="popup-frame" />
      <div className="flex justify-between h-16 border-2 items-center">
        <div className="pl-4">
          <svg width="20" height="20">
            <rect width="20" height="20" />
          </svg>
        </div>
        <h1 className="text-2xl">Reverse-ATS</h1>
        <div className="pr-4">
          <svg width="20" height="20">
            <rect width="20" height="20" />
          </svg>
        </div>
      </div>
      <div className="flex py-2">
        <button type="submit" className="p-2" onClick={switchRoutes}>
          Keywords
        </button>
        <button type="submit" className="p-2" onClick={switchRoutes}>
          Results
        </button>
      </div>
      <div className="flex-grow">
        <KeywordsContext.Provider value={keywordsContextValue}>
          <div
            className="flex flex-col flex-grow"
            style={{ display: !showMatches ? "flex" : "none" }}
          >
            <div>
              <h1 className="text-xl text-center">Job Description</h1>
              <DynamicForm className="grow" descriptionType="job" />
            </div>
            <div>
              <h1 className="text-xl text-center">Resume</h1>
              <DynamicForm className="grow" descriptionType="resume" />
            </div>
            <button
              type="submit"
              onClick={compareKeywords}
              className="text-xl p-2 rounded-md border border-2"
            >
              Compare
            </button>
          </div>
          <div
            className="flex flex-col flex-grow"
            style={{ display: showMatches ? "flex" : "none" }}
          >
            <Matches
              commonKeywords={[...commonKeywordsState]}
              recommendedKeywords={recommendedKeywordsState}
              percentage={percentage}
            />
            <button
              type="submit"
              className="text-xl p-2 rounded-md border border-2"
              onClick={compareNewDescription}
            >
              Submit New Descriptions
            </button>
          </div>
        </KeywordsContext.Provider>
      </div>
      <footer className="mt-auto h-16 bg-slate-300">Copyright</footer>
    </div>
  );
}

export default App;
