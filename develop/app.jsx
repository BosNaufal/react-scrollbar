import React from 'react';
import ReactDOM from 'react-dom'; // eslint-disable-line

// eslint-disable-next-line
import ReactScrollbar from 'react-scrollbar-js'; // (see webpack.dev.config.js)

require('./main.sass');

class App extends React.Component {

  render() {
    const myScrollbar = {
      maxWidth: 550,
      minWidth: 300,
      maxHeight: 450,
      border: '5px #2196F3 solid',
    };

    return (
      <ReactScrollbar style={myScrollbar}>
        <div className="scroll-content">
          <div className="kolom" />
          <div className="kolom" />
          <div className="kolom" />
          <div className="kolom" />
          <div className="kolom" />
          <div className="kolom" />
          <div className="kolom" />
          <div className="kolom" />
          <div className="kolom" />
          <div className="kolom" />
          <div className="kolom" />
          <div className="kolom" />
          <div className="kolom" />
          <div className="kolom" />
          <div className="kolom" />
          <div className="kolom" />
          <div className="clearfix" />
        </div>
      </ReactScrollbar>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
