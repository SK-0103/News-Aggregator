import React from 'react';
import { ButtonGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const BiasFilter = ({ activeBias, onBiasChange }) => {
  const biases = [
    { id: 'all', name: 'All Biases', color: '#6c757d' },
    { id: 'left', name: 'Left', color: '#3b82f6' },
    { id: 'center-left', name: 'Center Left', color: '#93c5fd' },
    { id: 'center', name: 'Center', color: '#f3f4f6' },
    { id: 'center-right', name: 'Center Right', color: '#fca5a5' },
    { id: 'right', name: 'Right', color: '#ef4444' },
  ];

  return (
    <div className="bias-filter mb-4">
      <h5 className="mb-3">Filter by Political Bias</h5>
      <div className="d-flex flex-wrap">
        {biases.map((bias) => (
          <OverlayTrigger
            key={bias.id}
            placement="top"
            overlay={<Tooltip id={`bias-tooltip-${bias.id}`}>{bias.name}</Tooltip>}
          >
            <Button
              variant={activeBias === bias.id ? 'primary' : 'outline-secondary'}
              className="me-2 mb-2"
              onClick={() => onBiasChange(bias.id)}
              style={
                bias.id !== 'all'
                  ? {
                      backgroundColor: activeBias === bias.id ? bias.color : 'transparent',
                      borderColor: bias.color,
                      color: activeBias === bias.id ? (bias.id === 'center' ? '#000' : '#fff') : bias.color,
                    }
                  : {}
              }
            >
              {bias.name}
            </Button>
          </OverlayTrigger>
        ))}
      </div>
    </div>
  );
};

export default BiasFilter;
