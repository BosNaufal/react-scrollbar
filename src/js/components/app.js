
import React from 'react';
import ReactDOM from 'react-dom';

import ReactScrollbar from './react-scrollbar.js';

require('../../sass/main.sass')

class App extends React.Component {

  render(){
    return(
      <ReactScrollbar className="my-scrollbar">
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
