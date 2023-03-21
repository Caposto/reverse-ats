import "./App.css";
import { Route, Routes } from "react-router-dom";
import EntryForm from "./routes/EntryForm";
import NotFound from "./routes/NotFound";
import CurrentKeywords from "./routes/CurrentKeywords";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EntryForm />} />
      <Route path="keywords" element={<CurrentKeywords />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
