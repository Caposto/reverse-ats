import React, {useState} from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

export const JobForm = () => {
    const [description, setDescription] = useState(''); // Create state for job description, default empty string

    // Return form for inputting job description
    // TODO: Add <Button> from semantic-ui for submitting the form (In Ben Awad's Video 15:00/)
    return (
        <Form> 
            <Form.Field>
                <Input 
                  placeholder="job description" 
                  value={description} 
                  onChange={e => setDescription(e.target.value)}  
                />
            </Form.Field>
        </Form>
    )
}