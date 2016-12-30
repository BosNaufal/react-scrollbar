
import React from 'react';
import ReactDOM from 'react-dom';

import ReactScrollbar from '../../index.js';

require('../../style/react-scrollbar.css')
require('../../style/app.css')

class App extends React.Component {

  render(){
    let myScrollbar = {
      width: '35%',
      minWidth: 300,
      maxHeight: 450,
      border: '5px #2196F3 solid'
    }
    return(
      <ReactScrollbar className="my-scrollbar" style={myScrollbar} ref="Scrollbar">
        <div className="scroll-me">
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
