import PropTypes from "prop-types";

function CircularProgressBar({ percentage }) {
  const radius = 40; // radius of a circle
  const circumference = 2 * Math.PI * radius; // circumference of a circle

  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg
        className="absolute top-0 left-0 transform rotate-270" // rotate SVG to start from 12 o'clock
        viewBox="0 0 100 100"
        width="100"
        height="100"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
        <span className="text-lg font-bold">{percentage}%</span>
      </div>
    </div>
  );
}

CircularProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default CircularProgressBar;
