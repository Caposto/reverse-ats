import PropTypes from "prop-types";

function Header({ viewController }) {
  return (
    <div className="pb-2">
      <div className="flex justify-between h-16 border-2 items-center">
        <div className="pl-4">
          <svg width="20" height="20">
            <rect width="20" height="20" />
          </svg>
        </div>
        <h1 className="text-2xl">Reverse-ATS</h1>
        <div className="pr-4">
          <svg width="20" height="20">
            <rect width="20" height="20" />
          </svg>
        </div>
      </div>
      <div className="flex py-2">
        <button type="submit" className="px-2" onClick={viewController}>
          Keywords
        </button>
        <button type="submit" className="px-2" onClick={viewController}>
          Results
        </button>
      </div>
      <div className="border-2" />
    </div>
  );
}

Header.propTypes = {
  viewController: PropTypes.func.isRequired,
};

export default Header;
