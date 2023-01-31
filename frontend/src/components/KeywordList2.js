import React, {useState} from 'react'
import Keyword from './Keyword';
import KeywordForm from './KeywordForm'

function KeywordList2() {
    const[keywords, setKeywords] = useState([]); // FIXME: Can I pass the inital state to be the result of the API? try UseEffect hook 

    const addKeyword = keyword => {
        if (!keyword.text || /^\s*$/.test(keyword.text)) {
            return
        }

        const newKeywords = [keyword, ...keywords]

        setKeywords(newKeywords) // Update state with new keywords
    }

    const completeKeywords = id => {
        let updatedKeywords = keywords.map(keyword => {
            if (keyword.id === id) {
                keyword.isComplete = !keyword.isComplete
            }
            return keyword 
        })

        setKeywords(updatedKeywords)
    }

    return (
      <div>
          <h1>Reverse-ATS</h1>
          <KeywordForm onSubmit={addKeyword}/>
          <Keyword keywords={keywords} completeKeywords={completeKeywords}/>
      </div>
    )
}

export default KeywordList2