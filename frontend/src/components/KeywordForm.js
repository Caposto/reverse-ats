import React, {useState} from 'react';

function KeywordForm(props) {
    const [input, setInput] = useState('');

    const handleChange = e => {
      setInput(e.target.value);
    };

    const handleSubmit = e => {
      e.preventDefault();

      props.onSubmit ({
        id: Math.floor(Math.random() * 10000), // FIXME: Is this ID necessary
        text: input
      });

      setInput('');
    };

    return (
      <form className="keyword-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Add a Keyword" 
            value={input}
            name="text"
            className='keyword-input'
            onChange={handleChange}>
          </input>
    
          <button className='todo-button'>Add Keyword</button>
      </form>
    );
}

export default KeywordForm;