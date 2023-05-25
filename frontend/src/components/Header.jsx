import PropTypes from "prop-types";

function Header({ matchesRoute, keywordsRoutes }) {
  return (
    <div className="pb-2">
      <div className="flex justify-between h-16 border-2 items-center">
        <div className="pl-4">
          <svg width="20" height="20">
            <rect width="20" height="20" />
          </svg>
        </div>
        <h1 className="font-extrabold">Reverse-ATS</h1>
        <div className="pr-4">
          <svg width="20" height="20">
            <rect width="20" height="20" />
          </svg>
        </div>
      </div>
      <div className="flex py-2">
        <button type="submit" className="px-2" onClick={keywordsRoutes}>
          Keywords
        </button>
        <button type="submit" className="px-2" onClick={matchesRoute}>
          Results
        </button>
      </div>
      <div className="border-2" />
    </div>
  );
}

Header.propTypes = {
  matchesRoute: PropTypes.func.isRequired,
  keywordsRoutes: PropTypes.func.isRequired,
};

export default Header;
