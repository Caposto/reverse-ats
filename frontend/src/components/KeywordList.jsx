import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import KeywordForm from "./KeywordForm";
import Keyword from "./Keyword";
import KeywordsContext from "../services/KeywordContext";

function KeywordList({ initial, descriptionType }) {
  const [keywords, setKeywords] = useState([]);

  const { handleJobKeywords, handleResumeKeywords } = useContext(KeywordsContext);

  // Intialize the keyword list with the result of the API Call
  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.get(["chromeJobKeywords", "chromeResumeKeywords"], (result) => {
      if (result.chromeJobKeywords) {
        console.log(result.chromeJobKeywords);
      }
      if (initial) {
        setKeywords(
          initial.map((keyword, index) => ({
            id: index + 1,
            text: keyword,
            isComplete: false,
          }))
        );
      }
    });
  }, []);

  // Store Keywords in Chrome Storage
  useEffect(() => {
    if (descriptionType === "job") {
      // eslint-disable-next-line no-undef
      chrome.storage.local.set({ chromeJobKeywords: keywords }, () => {});
    } else if (descriptionType === "resume") {
      // eslint-disable-next-line no-undef
      chrome.storage.local.set({ chromeResumeKeywords: keywords }, () => {});
    }
  }, [keywords]);

  // Update Parent Keywords
  useEffect(() => {
    // Call the appropriate function based on descriptionType
    if (descriptionType === "job") {
      handleJobKeywords(keywords);
    } else if (descriptionType === "resume") {
      handleResumeKeywords(keywords);
    }
  }, [keywords]);

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
  descriptionType: PropTypes.string.isRequired,
};

KeywordList.defaultProps = {
  initial: [],
};

export default KeywordList;
