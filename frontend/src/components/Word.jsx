import PropTypes from "prop-types";

function Word({ wordContent }) {
  return <div className="mb-1 border-2">{wordContent}</div>;
}

Word.propTypes = {
  wordContent: PropTypes.string.isRequired,
};

export default Word;
