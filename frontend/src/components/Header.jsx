import PropTypes from "prop-types";
import { useState } from "react";

function Header({ matchesRoute, keywordsRoutes, closeWindow }) {
  const [showInstructions, setShowInstructions] = useState(false);

  const displayInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="pb-2">
      <div className="h-16 border-2 text-center items-center flex justify-between">
        <button
          type="submit"
          onClick={displayInstructions}
          className="px-2 text-xl font-bold italic border-2 rounded"
        >
          I
        </button>
        <h1 className="font-extrabold">Reverse-ATS</h1>
        <button type="submit" onClick={closeWindow} className="px-2 text-xl">
          X
        </button>
      </div>
      <div className="flex py-2">
        <button type="submit" className="px-2" onClick={keywordsRoutes}>
          Keywords
        </button>
        <button type="submit" className="px-2" onClick={matchesRoute}>
          Results
        </button>
      </div>
      {showInstructions && (
        <div className="p-2 bg-gray-200 rounded-md">
          <h2>Instructions:</h2>
          <p>Here are the instructions...</p>
        </div>
      )}
      <div className="border-2" />
    </div>
  );
}

Header.propTypes = {
  matchesRoute: PropTypes.func.isRequired,
  keywordsRoutes: PropTypes.func.isRequired,
  closeWindow: PropTypes.func.isRequired,
};

export default Header;
