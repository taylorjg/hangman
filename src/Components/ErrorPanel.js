import React from 'react';
import PropTypes from 'prop-types';
import './ErrorPanel.css';

const FRIENDLY_MESSAGE =
  '(using a local dictionary due to a server error)';

const ErrorPanel = ({ errorMessage }) => {

  const renderError = () => {
    return (
      <div className="ErrorPanel">
        <img
          src="WarningTriangle-16x16.png"
          alt="Warning triangle"
          title={errorMessage}
        />
        {' '}
        <span>{FRIENDLY_MESSAGE}</span>
      </div>
    )
  };

  return (
    <div>
      {errorMessage && renderError()}
    </div>
  )
};

ErrorPanel.propTypes = {
  errorMessage: PropTypes.string.isRequired
};

export default ErrorPanel;
