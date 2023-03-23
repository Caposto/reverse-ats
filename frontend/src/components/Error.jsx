import PropTypes from "prop-types";

function Error({ errorMessage }) {
  return (
    <div>
      <p>{errorMessage}</p>
    </div>
  );
}

Error.propTypes = {
  errorMessage: PropTypes.string,
};

Error.defaultProps = {
  errorMessage: "Oops, something went wrong. Please Try again later.",
};

export default Error;
