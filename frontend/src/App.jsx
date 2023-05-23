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
  const keywordsContextValue = useMemo(() => ({
    handleJobKeywords,
    handleResumeKeywords,
  }));

  // TODO: Remove reference frame: <div className="relative mt-8 ml-8"> & <div className="popup-frame" />

  return (
    <div className="relative">
      <div className="popup-frame" />
      <div className="flex justify-center bg-slate-300">
        <svg width="20" height="20">
          <rect width="20" height="20" />
        </svg>
        <h1 className="text-2xl">Reverse-ATS</h1>
        <svg width="20" height="20">
          <rect width="20" height="20" />
        </svg>
      </div>
      <div>
        <div className="flex">
          <button type="submit" onClick={switchRoutes}>
            Keywords
          </button>
          <button type="submit" onClick={switchRoutes}>
            Results
          </button>
        </div>
        <KeywordsContext.Provider value={keywordsContextValue}>
          {!showMatches && (
            <div>
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
          )}
          {showMatches && (
            <div>
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
          )}
        </KeywordsContext.Provider>
        <div className="bg-slate-300">Copyright</div>
      </div>
    </div>
  );
}

export default App;
