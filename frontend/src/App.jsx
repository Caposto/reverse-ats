import { useState, useMemo, useEffect } from "react";
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

  // Initialize keywords from chrome storage
  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.get(["chromeJobKeywords", "chromeResumeKeywords"], (result) => {
      if (result.chromeJobKeywords) {
        setJobKeywords(result.chromeJobKeywords);
      }
      if (result.chromeResumeKeywords) {
        setResumeKeywords(result.chromeResumeKeywords);
      }
    });
  }, []); // Empty dependency array means this runs once on component mount

  // Store Keywords in Chrome Storage
  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ chromeJobKeywords: jobKeywords }, () => {
      console.log("Job Keywords Saved");
    });
  }, [jobKeywords]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ chromeResumeKeywords: resumeKeywords }, () => {
      console.log("Resume Keywords Saved");
    });
  }, [resumeKeywords]);

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
    // Add all resume keywords to a hash set for O(1) lookup
    const resumeKeywordsSet = new Set(resumeKeywords.map((keyword) => keyword.text));

    // Compare each keyword from job description to see the number of matches
    Object.values(jobKeywords).forEach((jobKeyword) => {
      if (resumeKeywordsSet.has(jobKeyword.text)) {
        commonKeywords.add(jobKeyword.text);
      }
    });

    Object.values(jobKeywords).forEach((jobKeyword) => {
      if (!commonKeywords.has(jobKeyword.text)) {
        recommendedKeywords.push(jobKeyword.text);
      }
    });

    setCommonKeywordsState(commonKeywords);
    setRecommendedKeywordsState(recommendedKeywords);
    setPercentage(Math.floor((commonKeywords.size / jobKeywords.length) * 100));
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
      <Header
        matchesRoute={() => setShowMatches(true)}
        keywordsRoutes={() => setShowMatches(false)}
      />
      <div className="flex-grow">
        <KeywordsContext.Provider value={keywordsContextValue}>
          <div className={!showMatches ? "flex flex-col flex-grow pt-4" : "hidden"}>
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
          <div className={showMatches ? "flex flex-col flex-grow" : "hidden"}>
            <Matches
              commonKeywords={[...commonKeywordsState]}
              recommendedKeywords={recommendedKeywordsState}
              percentage={percentage}
            />
            <div className="text-center">
              <button
                type="submit"
                className="button-lg pt-2"
                onClick={compareNewDescription}
              >
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
