import PropTypes from "prop-types";

function Word({ wordContent }) {
  return <div className="flex items-center mb-6">{wordContent}</div>;
}

Word.propTypes = {
  wordContent: PropTypes.string.isRequired,
};

export default Word;
