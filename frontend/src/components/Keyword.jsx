import { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import PropTypes from "prop-types";
import KeywordForm from "./KeywordForm";

function Keyword({ keywords, removeKeyword, updateKeyword }) {
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
      className="flex justify-between items-center m-2 p-4 bg-green-300"
      key={keyword.id}
    >
      {keyword.text}
      <div className="flex justify-center cursor-pointer text-2xl">
        <RiCloseCircleLine onClick={() => removeKeyword(keyword.id)} />
        <TiEdit onClick={() => setEdit({ id: keyword.id, value: keyword.text })} />
      </div>
    </div>
  ));
}

Keyword.propTypes = {
  keywords: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeKeyword: PropTypes.func.isRequired,
  updateKeyword: PropTypes.func.isRequired,
};

export default Keyword;
