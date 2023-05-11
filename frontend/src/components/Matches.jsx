import PropTypes from "prop-types";
import Word from "./Word";

function Matches({ commonKeywords, recommendedKeywords, percentage }) {
  // FIXME: Is there a better value that can be used for the key?
  const commonKeywordsList = commonKeywords.map((word) => (
    <Word key={word} wordContent={word} />
  ));

  const recommendedKeywordsList = recommendedKeywords.map((word) => (
    <Word key={word} wordContent={word} />
  ));

  return (
    <div>
      {commonKeywordsList}
      {recommendedKeywordsList}
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
