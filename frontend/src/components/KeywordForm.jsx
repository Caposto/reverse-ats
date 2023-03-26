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
    <form onSubmit={handleSubmit} className="mb-4">
      {edit ? (
        <>
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="p-6 border-solid border-4"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="p-6 border-solid border-4 cursor-pointer bg-blue-100"
          >
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
            className="p-6 border-solid border-4"
            ref={inputRef}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="p-6 border-solid border-4 cursor-pointer bg-blue-300"
          >
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
