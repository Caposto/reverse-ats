import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import KeywordForm from "./KeywordForm";
import Keyword from "./Keyword";

function KeywordList2({ initial }) {
  const [keywords, setKeywords] = useState([]);

  // Update KeywordList2 with the result of the API call
  useEffect(() => {
    setKeywords(
      initial.map((keyword, index) => ({
        id: index + 1,
        text: keyword,
        isComplete: false,
      }))
    );
  }, []); // Fixed issue where useEffect prevented editing by chaning [keywords] to [] for 2nd arg

  const addKeyword = (keyword) => {
    if (!keyword.text || /^\s*$/.test(keyword.text)) {
      return;
    }
    const newKeywords = [keyword, ...keywords];
    setKeywords(newKeywords);
  };

  const updateKeyword = (keywordId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setKeywords((prevKeywords) =>
      prevKeywords.map((keyword) =>
        keyword.id === keywordId ? { ...keyword, ...newValue } : keyword
      )
    );
  };

  const removeKeyword = (keywordId) => {
    const removedArr = keywords.filter((keyword) => keyword.id !== keywordId);
    setKeywords(removedArr);
  };

  const completeKeyword = (keywordId) => {
    const updatedKeywords = keywords.map((keyword) =>
      keyword.id === keywordId ? { ...keyword, isComplete: !keyword.isComplete } : keyword
    );
    setKeywords(updatedKeywords);
  };

  return (
    <div>
      <h1>Keywords</h1>
      <KeywordForm onSubmit={addKeyword} />
      <Keyword
        keywords={keywords}
        completeKeyword={completeKeyword}
        removeKeyword={removeKeyword}
        updateKeyword={updateKeyword}
      />
    </div>
  );
}

KeywordList2.propTypes = {
  initial: PropTypes.arrayOf(PropTypes.string),
};

KeywordList2.defaultProps = {
  initial: [],
};

export default KeywordList2;
