import { useState, useMemo } from "react";
import JobForm from "./components/Form";
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

  // Handles Error: changes every render
  const keywordsContextValue = useMemo(() => ({
    handleJobKeywords,
    handleResumeKeywords,
  }));

  const compareNewDescription = () => {
    // FIXME: How can I keep the resume keywords in the render?
    // setResumeKeywords(resumeKeywords);
    console.log(resumeKeywords);
    console.log(jobKeywords);
    setCommonKeywordsState(new Set());
    setRecommendedKeywordsState([]);
    setPercentage(0);
    setShowMatches(false);
  };

  return (
    <div>
      <KeywordsContext.Provider value={keywordsContextValue}>
        {!showMatches && (
          <div>
            <div className="flex">
              <div>
                <h1 className="text-xl text-center">Job Description</h1>
                <JobForm className="grow" descriptionType="job" />
              </div>
              <div>
                <h1 className="text-xl text-center">Resume</h1>
                <JobForm className="grow" descriptionType="resume" />
              </div>
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
              onClick={compareNewDescription} // FIXME: Are the keywords cleared or just not shown?
            >
              Submit New Descriptions
            </button>
          </div>
        )}
      </KeywordsContext.Provider>
    </div>
  );
}

export default App;
