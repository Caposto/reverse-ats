import {useState, useContext} from 'react';
import KeywordList from './KeywordList';
import { KeywordContext } from '../App';

export const JobForm = () => {
    const [description, setDescription] = useState(''); // Create state for job description, default empty string
    const [visible, setVisibility] = useState(true); // Hide form once submitted
    const [keywords, setKeywords] = useContext(KeywordContext); // Create state for keywords received from server

    // TODO: Edit state of list with the intial list being the keywords processed from flask

    let handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page from refreshing

        try {
            // TODO: store url for server in a .env file
            const response = await fetch('http://127.0.0.1:5000/extract_keywords', {
                method: 'POST', // Using POST since GET does not accept a body
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({description})
            });

            if (response.ok) {
                let res = response.json();
                res.then((prom) => setKeywords(prom)); // Store keywords in {keywords}
                setDescription(''); // Clear the form
                setVisibility(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // Return form for inputting job description/
    return (
        <div id="standard-form">
            {visible && (
                <form onSubmit={handleSubmit}>
                    <input 
                        placeholder='Paste Job Description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form> 
            )}
            {!visible && (
                <div>
                    <KeywordList keywordArray={keywords}/>
                </div> 
            )}
        </div>
    )
}