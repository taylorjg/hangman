import React from 'react';
import PropTypes from 'prop-types';
import './ErrorPanel.css';

const FRIENDLY_MESSAGE =
  '(using a local dictionary due to a server error)';

const ErrorPanel = ({ errorMessage }) => {

  const renderError = () => {
    return (
      <span>
        <img
          src="WarningTriangle-16x16.png"
          alt="Warning triangle"
          title={errorMessage}
        />
        {FRIENDLY_MESSAGE}
      </span>
    );
  };

  return (
    <div className="ErrorPanel">
      {errorMessage && renderError()}
    </div>
  );
};

ErrorPanel.propTypes = {
  errorMessage: PropTypes.string.isRequired
};

export default ErrorPanel;
