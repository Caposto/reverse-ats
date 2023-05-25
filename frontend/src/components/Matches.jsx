import PropTypes from "prop-types";
import Word from "./Word";
import CircularProgressBar from "./CircularProgressBar";

function Matches({ commonKeywords, recommendedKeywords, percentage }) {
  const commonKeywordsList = commonKeywords.map((word) => (
    <Word key={word} wordContent={word} />
  ));

  const recommendedKeywordsList = recommendedKeywords.map((word) => (
    <Word key={word} wordContent={word} />
  ));

  return (
    <div className="text-center">
      <CircularProgressBar percentage={percentage} />
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4">Matches</th>
            <th>Recommended Keywords</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{commonKeywordsList}</td>
            <td>{recommendedKeywordsList}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

Matches.propTypes = {
  commonKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  recommendedKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  percentage: PropTypes.number.isRequired,
};

export default Matches;
