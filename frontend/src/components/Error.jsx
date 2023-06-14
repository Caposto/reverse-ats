import PropTypes from "prop-types";

function Error({ errorMessage }) {
  return <div className="border-2 text-red-600">{errorMessage}</div>;
}

Error.propTypes = {
  errorMessage: PropTypes.string,
};

Error.defaultProps = {
  errorMessage: "Sorry! The service is temporarily down. Please try again later.",
};

export default Error;
