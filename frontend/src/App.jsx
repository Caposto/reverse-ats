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

  const compareKeywords = () => {
    // Add all resume keywords to a hash set for O(1) lookup
    const resumeKeywordsSet = new Set(
      resumeKeywords.map((keyword) => keyword.text.trim().toLowerCase())
    );

    // Compare each keyword from job description to see the number of matches
    Object.values(jobKeywords).forEach((jobKeyword) => {
      const jobKeywordText = jobKeyword.text.trim().toLowerCase();
      if (resumeKeywordsSet.has(jobKeywordText)) {
        commonKeywords.add(jobKeywordText);
      }
    });

    // Generate a list of recommended keywords from all non-matches on the job description
    Object.values(jobKeywords).forEach((jobKeyword) => {
      const jobKeywordText = jobKeyword.text.trim().toLowerCase();
      if (!commonKeywords.has(jobKeywordText)) {
        recommendedKeywords.push(jobKeyword.text);
      }
    });

    setCommonKeywordsState(commonKeywords);
    setRecommendedKeywordsState(recommendedKeywords);
    setPercentage(Math.floor((commonKeywords.size / jobKeywords.length) * 100));
    setShowMatches(true);
  };

  const compareNewDescription = () => {
    setCommonKeywordsState(new Set());
    setRecommendedKeywordsState([]);
    setPercentage(0);
    setShowMatches(false);
  };

  // Ensures context is not recreated on every render to optimize performance
  const keywordsContextValue = useMemo(
    () => ({
      handleJobKeywords: (keywords) => setJobKeywords(keywords),
      handleResumeKeywords: (keywords) => setResumeKeywords(keywords),
    }),
    []
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        matchesRoute={() => setShowMatches(true)}
        keywordsRoutes={() => setShowMatches(false)}
        closeWindow={() => window.close()}
      />
      <div className="flex-grow">
        <KeywordsContext.Provider value={keywordsContextValue}>
          <div className={!showMatches ? "flex flex-col flex-grow pt-4" : "hidden"}>
            <div>
              <h1 className="text-xl text-center pt-4">Resume</h1>
              <DynamicForm className="grow" descriptionType="resume" />
            </div>
            <div>
              <h1 className="text-xl text-center">Job Description</h1>
              <DynamicForm className="grow" descriptionType="job" />
            </div>
            <div className="text-center">
              <button type="submit" onClick={compareKeywords} className="button-lg">
                Compare
              </button>
            </div>
          </div>
          <div className={showMatches ? "flex flex-col flex-grow" : "hidden"}>
            <Matches
              commonKeywords={[...commonKeywordsState]}
              recommendedKeywords={recommendedKeywordsState}
              percentage={percentage}
            />
            <div className="text-center pt-4">
              <button type="submit" className="button-lg" onClick={compareNewDescription}>
                Submit New Descriptions
              </button>
            </div>
          </div>
        </KeywordsContext.Provider>
      </div>
      <footer className="mt-auto h-16 bg-slate-300" />
    </div>
  );
}

export default App;
