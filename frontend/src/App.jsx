import React, { useState, useMemo } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import EntryForm from "./routes/index";
import NotFound from "./routes/error";
import CurrentKeywords from "./routes/list";
import KeywordContext from "./context";

function App() {
  const [keywords, setKeywords] = useState([]);

  return (
    <KeywordContext.Provider value={useMemo(() => [keywords, setKeywords])}>
      <Routes>
        <Route path="/" element={<EntryForm />} />
        <Route path="keywords" element={<CurrentKeywords />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </KeywordContext.Provider>
  );
}

export default App;
