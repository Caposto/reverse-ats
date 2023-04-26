import { useState } from "react";
import JobForm from "./components/JobForm";
import KeywordsContext from "./services/KeywordContext";

function App() {
  const [jobKeywords, setJobKeywords] = useState([]);
  const [resumeKeywords, setResumeKeywords] = useState([]);

  const handleJobKeywords = (keywords) => {
    setJobKeywords(keywords);
    console.log("updated job keywords");
  };

  const handleResumeKeywords = (keywords) => {
    setResumeKeywords(keywords);
    console.log("updated resume keywords");
  };

  const compareKeywords = () => {
    console.log(jobKeywords);
    console.log(resumeKeywords);
  };

  return (
    <div className="flex">
      <KeywordsContext.Provider
        // FIXME: implement useMemo
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{
          handleJobKeywords,
          handleResumeKeywords,
        }}
      >
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
