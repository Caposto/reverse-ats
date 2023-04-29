// Display the matches and recommended additions + percentage of how many keywords you got
import PropTypes from "prop-types";

function Matches({ commonKeywords, recommendedKeywords, percentage }) {
  return (
    <div>
      <p>{commonKeywords}</p>
      <p>{recommendedKeywords}</p>
      <p>{percentage}</p>
    </div>
  );
}

Matches.propTypes = {
  commonKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  recommendedKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  percentage: PropTypes.number.isRequired,
};

export default Matches;
