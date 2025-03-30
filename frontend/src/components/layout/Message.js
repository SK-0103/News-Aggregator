import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children, dismissible = false }) => {
  const [show, setShow] = useState(true);

  if (dismissible) {
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible show={show}>
        {children}
      </Alert>
    );
  }

  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
