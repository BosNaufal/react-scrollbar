
import React from 'react';
import ReactDOM from 'react-dom';

import ReactScrollbar from './react-scrollbar.js';

require('../../sass/main.sass')

class App extends React.Component {

  render(){
    let myScrollbar = {
      width: '35%',
      minWidth: 300,
      maxHeight: 450,
      border: '5px #2196F3 solid'
    }
    return(
      <ReactScrollbar className="my-scrollbar" style={myScrollbar}>
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
