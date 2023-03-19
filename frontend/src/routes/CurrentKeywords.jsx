// Page that shows extracted keywords

import KeywordList2 from "../components/KeywordList2";

const initialKeywords = ["apple", "chicken", "banana"];

function CurrentKeywords() {
  return (
    <div className="keyword-app">
      <KeywordList2 initial={initialKeywords} />
    </div>
  );
}

export default CurrentKeywords;
