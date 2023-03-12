import { useState, useEffect, useRef } from "react";

function KeywordForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="keyword-form">
      {props.edit ? (
        <>
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="keyword-input edit"
          />
          <button onClick={handleSubmit} className="keyword-button edit">
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
          <button onClick={handleSubmit} className="keyword-button">
            Add keyword
          </button>
        </>
      )}
    </form>
  );
}

export default KeywordForm;
