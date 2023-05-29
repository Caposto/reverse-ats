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
    <div className="flex flex-col items-center text-center bg-white p-8 rounded shadow">
      <CircularProgressBar percentage={percentage} />
      <div className="mt-8 w-full overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-lg font-semibold text-gray-700 border-r border-gray-200">
                Matches
              </th>
              <th className="px-4 py-2 text-lg font-semibold text-gray-700">
                Recommended Keywords
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-t border-r border-gray-200 px-4 py-4">
                {commonKeywordsList}
              </td>
              <td className="border-t border-gray-200 px-4 py-4">
                {recommendedKeywordsList}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

Matches.propTypes = {
  commonKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  recommendedKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  percentage: PropTypes.number.isRequired,
};

export default Matches;
