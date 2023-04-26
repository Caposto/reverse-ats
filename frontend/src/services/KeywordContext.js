import { createContext } from "react";

const KeywordsContext = createContext({
  handleJobsKeywords: () => {},
  handleResumeKeywords: () => {},
});

export default KeywordsContext;
