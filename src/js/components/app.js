
import React from 'react';
import ReactDOM from 'react-dom';

import ReactScrollbar from '../../index.js';

require('../../sass/main.sass')

class App extends React.Component {

  render(){
    let myScrollbar = {
      width: '60%',
      minWidth: 300,
      maxHeight: 450,
      border: '5px #2196F3 solid'
    }
    return(
      <ReactScrollbar className="scroll-block" style={myScrollbar} ref="Scrollbar">
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
    )
  }
}


ReactDOM.render(<App />, document.getElementById("app"))
