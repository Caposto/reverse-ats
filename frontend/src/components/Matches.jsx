import PropTypes from "prop-types";
import Word from "./Word";

function Matches({ commonKeywords, recommendedKeywords, percentage }) {
  const commonKewywordsList = commonKeywords.map((word) => (
    <Word key={word.id} wordContent={word} />
  ));

  const recommendedKewywordsList = recommendedKeywords.map((word) => (
    <Word key={word.id} wordContent={word} />
  ));

  return (
    <div>
      {commonKewywordsList}
      {recommendedKewywordsList}
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
