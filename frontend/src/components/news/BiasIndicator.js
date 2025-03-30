import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import './BiasIndicator.css';

const BiasIndicator = ({ bias }) => {
  const getBiasPosition = (bias) => {
    switch (bias) {
      case 'left':
        return 10;
      case 'center-left':
        return 30;
      case 'center':
        return 50;
      case 'center-right':
        return 70;
      case 'right':
        return 90;
      default:
        return 50; // Default to center if unknown
    }
  };

  const getBiasLabel = (bias) => {
    switch (bias) {
      case 'left':
        return 'Left';
      case 'center-left':
        return 'Center Left';
      case 'center':
        return 'Center';
      case 'center-right':
        return 'Center Right';
      case 'right':
        return 'Right';
      default:
        return 'Unknown Bias';
    }
  };

  const position = getBiasPosition(bias);
  const label = getBiasLabel(bias);

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={`bias-tooltip-${bias}`}>{label}</Tooltip>}
    >
      <div className="bias-indicator-container">
        <div className="bias-spectrum">
          <div className="bias-label left-label">Left</div>
          <div className="bias-label center-label">Center</div>
          <div className="bias-label right-label">Right</div>
        </div>
        <div className="bias-bar">
          <div 
            className="bias-marker" 
            style={{ left: `${position}%` }}
          />
        </div>
      </div>
    </OverlayTrigger>
  );
};

export default BiasIndicator;
