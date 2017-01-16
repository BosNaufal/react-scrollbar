
import React from 'react';
import ReactDOM from 'react-dom';

import ReactScrollbar from 'react-scrollbar-js';

import './main.css';
// import './scroll.css';

class App extends React.Component {
  genList(num) {
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
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eaque repellendus quo perspiciatis pariatur deserunt molestias sequi sed quisquam unde adipisci tempore facere a, ex et atque, aperiam asperiores. Distinctio Distinctio eaque repellendus quo perspiciatis pariatur deserunt molestias sequi sed quisquam unde adipisci tempore facere a, ex et atque, aperiam asperiores. Distinctio.</p>
        </div>
      </div>
    );
    return list.map((val, ind) => item(ind));
  }
  
  scrollTo(pos) {
    return () => {
      this.scroll.scrollToY(pos);
    }
  }
  
  render() {
    const scrollbarStyle = {
      width: '50%',
      height: 250,
      border: '10px #acb0b2 solid',
    };
    const appStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'sans-serif',
    };
    return (
      <div style={appStyle}>
        <h2>React scrollbar</h2>
        <h4>Simple example</h4>
        <ReactScrollbar style={scrollbarStyle} ref={(c) => { this.scroll = c; }}>
          {this.genList(10)}
        </ReactScrollbar>
        <div>
          <h4>Callbacks</h4>
          <button onClick={this.scrollTo(0)}>to Top</button>
          <button onClick={this.scrollTo(10000)}>to Bottom</button>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
