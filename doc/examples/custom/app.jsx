
import React from 'react';
import ReactDOM from 'react-dom';

import ReactScrollbar from 'react-scrollbar-js';
import './style_custom1.scss';
import './style_custom2.scss';
import './style_custom3.scss';

function genList(num) {
  const itemStyle = {
    backgroundColor: '#d0dde2',
    border: '#5d7f8e solid 3px',
    borderRight: 'none',
    marginBottom: 6,
    padding: 6,
//      fontFamily: 'sans-serif',
    fontSize: 10,
//      display: 'flex',
  };
  const numStyle = {
    width: 60,
    height: 50,
    textAlign: 'center',
    fontSize: 48,
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
    const scrollbarStyle = {
      width: '50%',
      height: 450,
      border: '10px #acb0b2 solid',
      backgroundColor: '#e5ebef',
      margin: 16,
    };
    const sectionStyle = {
      display: 'flex',
    };
    const appStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'sans-serif',
    };
    const info = title => (
      <p style={{ textAlign: 'center' }}>{title}:</p>
    );
    return (
      <div style={appStyle}>
        <h2>React scrollbar</h2>
        <h4>Custom styles</h4>
        <div style={sectionStyle}>
          <ReactScrollbar className="style1" style={scrollbarStyle}>
            {info('style_custom1.scss')}
            {genList(this.state.length)}
          </ReactScrollbar>
          <ReactScrollbar className="style2" style={scrollbarStyle}>
            {info('style_custom2.scss')}
            {genList(this.state.length)}
          </ReactScrollbar>
          <ReactScrollbar className="style3" style={scrollbarStyle}>
            {info('style_custom3.scss')}
            {genList(this.state.length)}
          </ReactScrollbar>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));

// todo: [] check -reactjs-scrollbar-area:scrolling
// todo: [] remove fixed in tracks
// todo: [] revert .gitignore before PR
// todo: [] setup dependencies in example projects after publishing to NPM
