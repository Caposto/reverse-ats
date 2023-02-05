import React from 'react';
import { JobForm } from '../components/JobForm';
import { Container } from 'semantic-ui-react';

const EntryForm = () => {
    return (
        <div className="App">
          <Container>
            <JobForm />
          </Container>
        </div>
      )
}

export default EntryForm;