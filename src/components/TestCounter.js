import React from 'react';

const TestCounter = (props) => {
  return (
    <div className="test-counter">
      <hr/>
      <p>Running: <b>{props.running}</b></p>
      <p>Passed: <b>{props.passed}</b></p>
      <p>Failed: <b>{props.failed}</b></p>
      <hr/>
      {props.isFinished &&
        <p>* * * FINISHED!! * * *</p>
      }
    </div>
  );
}

export default TestCounter;
