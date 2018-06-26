import React, {Component} from 'react';

class TestDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data !== prevState.data) {
      return {data: nextProps.data};
    } else
      return null;
    }

  compareStatus(a, b) {
    if (a.status < b.status)
      return 1;
    if (a.status > b.status)
      return -1;
    return 0;
  }

  render() {
    let testData = this.state.data;
    testData.sort(this.compareStatus);
    let i = 0;

    return <div className="test-display">
      {
        testData.map((test) => {
          i++;
          return <p key={i}>{test.description}  - <strong>{test.status}</strong></p>;
        })
      }
    </div>
  }

}

export default TestDisplay;
