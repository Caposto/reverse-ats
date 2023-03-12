import { createContext } from "react";

// Context used to first initialize keywords with Flask request and then enabled adding and taking away of keywords
const KeywordContext = createContext([]);

export default KeywordContext;
