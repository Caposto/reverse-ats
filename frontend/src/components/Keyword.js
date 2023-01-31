import React, {useState} from 'react'
import KeywordForm from './KeywordForm'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'

function Keyword({ keywords, completeKeyword }) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    return keywords.map((keyword, index) => (
       <div 
        className={keyword.isUsed ? 'keyword-row-used' : 
        'keyword-row'} key={index}>
            <div key={keyword.id} onClick={() => completeKeyword(keyword.id)}>
                {keyword.text}
            </div>
            <div className='icons'>
                <RiCloseCircleLine />
                <TiEdit />
            </div>
       </div>
    ))
}

export default Keyword