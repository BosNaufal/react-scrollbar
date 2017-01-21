
import React from 'react';
import ReactDOM from 'react-dom';

import ReactScrollbar from 'react-scrollbar-js';

function genList(num) {
  const itemStyle = {
    backgroundColor: '#d0dde2',
    border: '#5d7f8e solid 5px',
    borderRight: 'none',
    marginBottom: 10,
    padding: 6,
//      fontFamily: 'sans-serif',
    fontSize: 12,
//      display: 'flex',
  };
  const numStyle = {
    width: 50,
    height: 30,
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#646464',
    float: 'left',
  };
  const list = new Array(num).fill(0);
  const item = ind => (
    <div style={itemStyle} key={ind}>
      <div style={numStyle}>{ind + 1}</div>
      <div>
        <div style={{ margin: 4, color: '#207cbf' }}><big>Lorem item!</big></div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Distinctio eaque repellendus quo perspiciatis pariatur deserunt molestias sequi
        sed quisquam unde adipisci tempore facere a, ex et atque,
        aperiam asperiores. Distinctio Distinctio eaque repellendus quo perspiciatis
        pariatur deseruntmolestias sequi sed quisquam unde adipisci tempore facere a,
        ex et atque, aperiam asperiores. Distinctio.</p>
      </div>
    </div>
  );
  return list.map((val, ind) => item(ind));
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 10,
    };
    this.renderCount = 0;
  }

  scrollTo(pos) {
    return () => {
      this.scroll.scrollToY(pos);
    };
  }

  render() {
    this.renderCount += 1;
    const scrollbarStyle = {
      width: '50%',
      height: 250,
      border: '10px #acb0b2 solid',
      backgroundColor: '#e5ebef',
    };
    const appStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'sans-serif',
    };
    const navStyle = {
      minWidth: 100,
      minHeight: 30,
      margin: 10,
    };
    const navItems = ['100%', 0, '0%', '50%', 150, -150, '-30%', 10000].map(val => (
      <button
        style={navStyle}
        onClick={this.scrollTo(val)}
        key={val}
        title={`The app was rendered ${this.renderCount} times`}
      >
        {val}
      </button>
    ));
    return (
      <div style={appStyle}>
        <h2>React scrollbar</h2>
        <h4>Simple example</h4>
        <p style={{ fontSize: 14, maxWidth: 400 }}>
          This is React Scrollbar with the default appearance.
          Use the navigation section to test <i>scrollToY()</i> function with different props.
        </p>
        <ReactScrollbar style={scrollbarStyle} ref={(c) => { this.scroll = c; }}>
          {genList(this.state.length)}
        </ReactScrollbar>
        <h4>Navigation:</h4>
        <div>
          {navItems}
        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
