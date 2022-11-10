import React, {useState} from 'react';
import { Button, Form, Message, Input } from 'semantic-ui-react';

export const JobForm = () => {
    const [description, setDescription] = useState(''); // Create state for job description, default empty string

    // Return form for inputting job description
    return (

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
                const response = await fetch('/extract_keywords', {
                    method: 'POST', // Using POST since GET does not accept a body
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(job_description)
                });

                if (response.ok) {
                    let res = response.json();
                    console.log(res);
                    setDescription(''); // Clear the form
                }
                
            }}>Submit</Button>
        </Form>
    )
}