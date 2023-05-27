import { useState, useMemo } from "react";
import Header from "./components/Header";
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

  // Handles Error: changes every render
  const keywordsContextValue = useMemo(
    () => ({
      handleJobKeywords,
      handleResumeKeywords,
    }),
    []
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="popup-frame" />
      <Header
        matchesRoute={() => setShowMatches(true)}
        keywordsRoutes={() => setShowMatches(false)}
      />
      <div className="flex-grow">
        <KeywordsContext.Provider value={keywordsContextValue}>
          <div
            className="flex flex-col flex-grow pt-4"
            style={{ display: !showMatches ? "flex" : "none" }}
          >
            <div>
              <h1 className="text-xl pl-4">Job Description</h1>
              <DynamicForm className="grow" descriptionType="job" />
            </div>
            <div>
              <h1 className="text-xl pl-4">Resume</h1>
              <DynamicForm className="grow" descriptionType="resume" />
            </div>
            <div className="text-center">
              <button type="submit" onClick={compareKeywords} className="button-lg">
                Compare
              </button>
            </div>
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
            <div className="text-center">
              <button type="submit" className="button-lg" onClick={compareNewDescription}>
                Submit New Descriptions
              </button>
            </div>
          </div>
        </KeywordsContext.Provider>
      </div>
      <footer className="mt-auto h-16 bg-slate-300">Copyright</footer>
    </div>
  );
}

export default App;
