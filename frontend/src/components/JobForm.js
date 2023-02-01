import React, {useState} from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import KeywordList from './KeywordList'; // Component to display keywords

export const JobForm = () => {
    const [description, setDescription] = useState(''); // Create state for job description, default empty string
    const [keywords, setKeywords] = useState([]); // Create state for keywords received from server

    // TODO: Edit state of list with the intial list being the keywords processed from flask
    const [list, setList] = useState(keywords); // Pass the state variable the keywords as the "inital list"

    function handleRemove() {
        console.log("Deleted Keyword!");
    }

    // Return form for inputting job description
    return (
        <div>
            <Form>
                <Form.Field>
                    <Input
                      placeholder="job description" 
                      value={description} 
                      onChange={e => setDescription(e.target.value)}  
                    />
                </Form.Field>
                <Button onClick={async() => {
                    const job_description = {description};

                    // TODO: store url for server in a .env file
                    const response = await fetch('http://127.0.0.1:5000/extract_keywords', {
                        method: 'POST', // Using POST since GET does not accept a body
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(job_description)
                    });

                    if (response.ok) {
                        let res = response.json();
                        res.then((prom) => setKeywords(prom)); // Store keywords in {keywords}
                        setDescription(''); // Clear the form
                    }

                }}>Submit</Button>
            </Form>
            <div>
                <KeywordList keywordArray = {keywords}/>
            </div>
        </div>
    )
}