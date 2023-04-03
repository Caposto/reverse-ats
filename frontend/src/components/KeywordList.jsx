import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import KeywordForm from "./KeywordForm";
import Keyword from "./Keyword";

function KeywordList({ initial }) {
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
  }, []);

  const addKeyword = (keyword) => {
    // Checks if string is empty or if the string contains only whitespace characters
    if (!keyword.text || /^\s*$/.test(keyword.text)) {
      return;
    }
    const newKeywords = [keyword, ...keywords]; // "..." is called spread operator: spreads iterable into individual elements
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

  return (
    <div className="border-solid border-2 border-sky-500 p-4">
      <KeywordForm onSubmit={addKeyword} />
      <Keyword
        keywords={keywords}
        removeKeyword={removeKeyword}
        updateKeyword={updateKeyword}
      />
    </div>
  );
}

KeywordList.propTypes = {
  initial: PropTypes.arrayOf(PropTypes.string),
};

KeywordList.defaultProps = {
  initial: [],
};

export default KeywordList;
