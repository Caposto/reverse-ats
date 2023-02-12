import { useState } from 'react';
import KeywordForm from './KeywordForm';
import Keyword from './Keyword';

function KeywordList2() {
  const [keywords, setKeywords] = useState([]);

  const addKeyword = keyword => {
    if (!keyword.text || /^\s*$/.test(keyword.text)) {
      return;
    }

    const newKeywords = [keyword, ...keywords];

    setKeywords(newKeywords);
    console.log(...keywords);
  };

  const updateKeyword = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setKeywords(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeKeyword = id => {
    const removedArr = [...keywords].filter(keyword => keyword.id !== id);

    setKeywords(removedArr);
  };

  const completeKeyword = id => {
    let updatedKeywords = keywords.map(keyword => {
      if (keyword.id === id) {
        keyword.isComplete = !keyword.isComplete;
      }
      return keyword;
    });
    setKeywords(updatedKeywords);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <KeywordForm onSubmit={addKeyword} />
      <Keyword
        keywords={keywords}
        completeKeyword={completeKeyword}
        removeKeyword={removeKeyword}
        updateKeyword={updateKeyword}
      />
    </>
  );
}

export default KeywordList2;