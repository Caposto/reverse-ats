import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

function KeywordForm({ edit, onSubmit }) {
  const [input, setInput] = useState(edit ? edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="keyword-form">
      {edit ? (
        <>
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="keyword-input edit"
          />
          <button type="submit" onClick={handleSubmit} className="keyword-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Add a keyword"
            value={input}
            onChange={handleChange}
            name="text"
            className="keyword-input"
            ref={inputRef}
          />
          <button type="submit" onClick={handleSubmit} className="keyword-button">
            Add keyword
          </button>
        </>
      )}
    </form>
  );
}

KeywordForm.propTypes = {
  edit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
};

KeywordForm.defaultProps = {
  edit: null,
};

export default KeywordForm;
