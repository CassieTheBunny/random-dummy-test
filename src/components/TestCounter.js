import React from 'react';

const TestCounter = (props) => {
  return (
    <div className="test-counter">
      <hr/>
      <p>Running: <strong>{props.running}</strong></p>
      <p>Passed: <strong>{props.passed}</strong></p>
      <p>Failed: <strong>{props.failed}</strong></p>
      <hr/>
      {props.isFinished &&
        <p>* * * FINISHED!! * * *</p>
      }
    </div>
  );
}

export default TestCounter;
