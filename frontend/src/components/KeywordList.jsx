import PropTypes from "prop-types";

export default function KeywordList({ keywordArray }) {
  // FIXME: Getting Warning, each child in a lisst should have a unique "key" prop
  const uniqueKeywords = [...new Set(keywordArray)];
  const keywordItems = uniqueKeywords.map((k) => <li key={k.id}>{k}</li>);
  return (
    <div>
      <h1>KEYWORDS</h1>
      <ul>{keywordItems}</ul>
    </div>
  );
}

KeywordList.propTypes = {
  keywordArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    })
  ),
};

KeywordList.defaultProps = {
  keywordArray: null,
};
