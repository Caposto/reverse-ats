import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import EntryForm from './routes';
import NotFound from './routes/error';
import CurrentKeywords from './routes/list';


function App() {
  return (
    <Routes>
      <Route path="/" element={<EntryForm />} />
      <Route path="keywords" element={<CurrentKeywords />}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
