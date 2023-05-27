import PropTypes from "prop-types";

function CircularProgressBar({ percentage }) {
  return (
    <div className="progress-bar relative w-24 h-24 rounded-full overflow-hidden">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-hotpink via-pink to-transparent transform rotate-180" />
      <progress
        className="absolute top-0 right-0 bottom-0 left-0 w-full h-full appearance-none bg-transparent"
        value={percentage}
        max="100"
      />
    </div>
  );
}

CircularProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default CircularProgressBar;
