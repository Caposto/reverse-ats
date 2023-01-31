import React, { useState } from 'react';
import KeywordForm from './KeywordForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Keyword = ({ keywords, completeKeyword, removeKeyword, updateKeyword }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateKeyword(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <KeywordForm edit={edit} onSubmit={submitUpdate} />;
  }

  return keywords.map((keyword, index) => (
    <div
      className={keyword.isComplete ? 'keyword-row complete' : 'keyword-row'}
      key={index}
    >
      <div key={keyword.id} onClick={() => completeKeyword(keyword.id)}>
        {keyword.text}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeKeyword(keyword.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: keyword.id, value: keyword.text })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Keyword;