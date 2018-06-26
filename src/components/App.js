import React, {Component} from 'react';

import TestDisplay from 'components/TestDisplay';
import TestCounter from 'components/TestCounter';

const TEST_NOT_STARTED = 'NOT STARTED YET',
  TEST_FAILED = 'FAILED',
  TEST_PASSED = 'PASSED',
  TEST_RUNNING = 'RUNNING...';

class App extends Component {
  constructor(props) {
    super(props);

    this.generateTestInfo = this.generateTestInfo.bind(this);
    this.updateTestData = this.updateTestData.bind(this);
    this.startTests = this.startTests.bind(this);
  }

  // APPLICATION STATE
  state = {
    running: [],
    passed: [],
    failed: [],
    data: [],
    isFinished: false
  }

  // PROVIDED TEST DATA - DO NOT ALTER!! ****
  tests = [
    { description: "commas are rotated properly", run: this.generateDummyTest() },
    { description: "exclamation points stand up straight", run: this.generateDummyTest() },
    { description: "run-on sentences don't run forever", run: this.generateDummyTest() },
    { description: "question marks curl down, not up", run: this.generateDummyTest() },
    { description: "semicolons are adequately waterproof", run: this.generateDummyTest() },
    { description: "capital letters can do yoga", run: this.generateDummyTest() }
  ];

  componentWillMount() {
    this.generateTestInfo();
  }

  // CREATE NEW ARRAY WITH DESCRIPTION AND STATUS TO DISPLAY
  generateTestInfo() {
    let data = [];
    data.push(this.tests.map((test) => {
      return {
        description: test.description,
        run: test.run,
        status: TEST_NOT_STARTED
      }
    }));
    data = data[0];
    this.setState({ data });
  }

  // GENERATE DELAY AND PASS/FAIL CONDITIONS - DO NOT ALTER!! ****
  generateDummyTest() {
    var delay = 7000 + Math.random() * 7000;
    var testPassed = Math.random() > 0.5;

    return(callback) => {
      setTimeout(() => {
        callback(testPassed);
      }, delay);
    };
  }

  // DETERMINES FINISHED MESSAGING DISPLAY STATE
  isDone() {
    if (this.state.running.length === 0)
      this.setState({ isFinished: true });
  }

  // UPDATE STATE AND STATUS BASED ON GENERATED RESULTS
  updateTestData(result, test) {
    const running = this.state.running;
    let testUpdated = {
      description: test.description,
      run: test.run
    };

    this.setState({
      running: running.filter(t => t !== test)
    }, this.isDone);

    if (result) {
      testUpdated.status = TEST_PASSED;
      this.setState({
        passed: [ ...this.state.passed, test ]
      })
    } else {
      testUpdated.status = TEST_FAILED;
      this.setState({
        failed: [ ...this.state.failed, test ]
      })
    }

    const data = this.state.data.filter(t => t !== test);
    data.push(testUpdated);
    this.setState({ data });
  }

  // START ALL DUMMY TESTS
  startTests() {
    this.setState({running: this.state.data})

    this.state.data.forEach((test) => {
      test.status = TEST_RUNNING;
      test.run((result) => {
        this.updateTestData(result, test);
      });
    });
  }

  // RENDER APPLICATION
  render() {
    return <div className="main-app">
      Run Tests:&nbsp;
      <button onClick={this.startTests}>START</button>
      <hr/>
      <TestDisplay data={this.state.data}/>
      <TestCounter running={this.state.running.length} failed={this.state.failed.length} passed={this.state.passed.length} isFinished={this.state.isFinished}/>
    </div>
  }
}

export default App;
