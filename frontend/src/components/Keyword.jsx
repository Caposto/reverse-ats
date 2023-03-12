import { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import PropTypes from "prop-types";
import KeywordForm from "./KeywordForm";

function Keyword({ keywords, completeKeyword, removeKeyword, updateKeyword }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateKeyword(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <KeywordForm edit={edit} onSubmit={submitUpdate} />;
  }

  return keywords.map((keyword) => (
    <div
      className={keyword.isComplete ? "keyword-row complete" : "keyword-row"}
      key={keyword.id}
    >
      <div
        key={keyword.id}
        onClick={() => completeKeyword(keyword.id)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            completeKeyword(keyword.id);
          }
        }}
        role="button"
        tabIndex={0}
      >
        {keyword.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeKeyword(keyword.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: keyword.id, value: keyword.text })}
          className="edit-icon"
        />
      </div>
    </div>
  ));
}

Keyword.propTypes = {
  keywords: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    })
  ).isRequired,
  completeKeyword: PropTypes.func.isRequired,
  removeKeyword: PropTypes.func.isRequired,
  updateKeyword: PropTypes.func.isRequired,
};

export default Keyword;
