import PropTypes from "prop-types";

function CircularProgressBar({ percentage }) {
  const circumference = 2 * Math.PI * 50; // circumference of a circle with a radius of 50

  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // FIXME: Percentage not centered
  return (
    <div className="relative w-32 h-32">
      <svg
        className="absolute top-0 left-0"
        viewBox="0 0 100 100"
        width="100"
        height="100"
      >
        <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#4f46e5"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
        {percentage}%
      </span>
    </div>
  );
}

CircularProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default CircularProgressBar;
