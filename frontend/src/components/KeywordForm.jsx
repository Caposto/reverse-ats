import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

function KeywordForm({ edit, onSubmit }) {
  const [input, setInput] = useState(edit ? edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
    <div>
      {edit ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="p-4 border-solid border-4"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="p-4 border-solid border-4 cursor-pointer bg-purple-300"
          >
            Update
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            placeholder="Add a keyword"
            value={input}
            onChange={handleChange}
            name="text"
            className="p-4 border-solid border-4"
            ref={inputRef}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="p-4 border-solid border-4 cursor-pointer bg-purple-300"
          >
            Add
          </button>
        </form>
      )}
    </div>
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
