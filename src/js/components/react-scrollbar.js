
import React from 'react';

import VerticalScrollbar from './vertical-scrollbar.js';
import HorizontalScrollbar from './horizontal-scrollbar.js';

require('../../sass/_Scrollbar.sass')

class ScrollWrapper extends React.Component {

  constructor() {
    super();
    this.state = {
      ready: false,
      scrollY: null,
      scrollX: null,
      top: 0,
      left: 0,
      scrollAreaHeight: null,
      scrollAreaWidth: null,
      scrollWrapperHeight: null,
      scrollWrapperWidth: null,
      verticalHeight: null,
      vMovement: 0,
      hMovement: 0,
      dragging: false,
      start: { y: 0, x: 0}
    }
  }

  render(){

    return(

      <div
        className={ "react-scrollbar__wrapper" + ( this.props.className ? " " + this.props.className : "" ) }
        ref="scrollWrapper">

        <div
          className={ "react-scrollbar__area" + ( this.state.dragging ? ' ' : ' react-scrollbar-transition') }
          ref="scrollArea"
          onWheel={ this.scroll.bind(this) }
          onTouchStart={ this.startDrag.bind(this) }
          onTouchMove={ this.onDrag.bind(this) }
          onTouchEnd={ this.stopDrag.bind(this) }
          style={{ marginTop: this.state.top * -1 +'px', marginLeft: this.state.left * -1 +'px' }} >

          { this.props.children }

          { this.state.ready ?

            <VerticalScrollbar
              area={{ height: this.state.scrollAreaHeight }}
              wrapper={{ height: this.state.scrollWrapperHeight }}
              scrolling={ this.state.vMovement }
              draggingFromParent={ this.state.dragging }
              onChangePosition={ this.handleChangePosition.bind(this) }
              onDragging={ this.handleScrollbarDragging.bind(this) }
              onStopDrag={ this.handleScrollbarStopDrag.bind(this) } />

          : null }


          { this.state.ready ?

            <HorizontalScrollbar
              area={{ width: this.state.scrollAreaWidth }}
              wrapper={{ width: this.state.scrollWrapperWidth }}
              scrolling={ this.state.hMovement }
              draggingFromParent={ this.state.dragging }
              onChangePosition={ this.handleChangePosition.bind(this) }
              onDragging={ this.handleScrollbarDragging.bind(this) }
              onStopDrag={ this.handleScrollbarStopDrag.bind(this) } />

          : null }

        </div>
      </div>

    )

  }



  scroll(e){
    e.preventDefault()

    // Set the wheel step
    let num = this.props.speed

    // DOM events
    let shifted = e.shiftKey
    let scrollY = e.deltaY > 0 ? num : -(num)
    let scrollX = e.deltaX > 0 ? num : -(num)

    // Fix Mozilla Shifted Wheel~
    if(shifted && e.deltaX == 0) scrollX = e.deltaY > 0 ? num : -(num)

    // Next Value
    let nextY = this.state.top + scrollY
    let nextX = this.state.left + scrollX

    // Is it Scrollable?
    let canScrollY = this.state.scrollAreaHeight > this.state.scrollWrapperHeight
    let canScrollX = this.state.scrollAreaWidth > this.state.scrollWrapperWidth

    // Vertical Scrolling
    if(canScrollY && !shifted) this.normalizeVertical(nextY)

    // Horizontal Scrolling
    if(shifted && canScrollX) this.normalizeHorizontal(nextX)

  }

  // DRAG EVENT JUST FOR TOUCH DEVICE~
  startDrag(e){
    e.preventDefault()
    e.stopPropagation()

    e = e.changedTouches ? e.changedTouches[0] : e

    // Prepare to drag
    this.setState({
      dragging: true,
      start: { y: e.pageY, x: e.pageX }
    })

  }

  onDrag(e){

    if(this.state.dragging){

      e.preventDefault()
      e = e.changedTouches ? e.changedTouches[0] : e

      // Invers the Movement
      let yMovement = this.state.start.y - e.pageY
      let xMovement = this.state.start.x - e.pageX

      // Update the last e.page
      this.setState({ start: { y: e.pageY, x: e.pageX } })

      // The next Vertical Value will be
      let nextY = this.state.top + yMovement
      let nextX = this.state.left + xMovement

      this.normalizeVertical(nextY)
      this.normalizeHorizontal(nextX)

    }

  }

  stopDrag(e){
    this.setState({ dragging: false })
  }

  normalizeVertical(next){

    // Vertical Scrolling
    let lowerEnd = this.state.scrollAreaHeight - this.state.scrollWrapperHeight

    // Max Scroll Down
    if(next > lowerEnd) next = lowerEnd

    // Max Scroll Up
    else if(next < 0) next = 0

    // Update the Vertical Value
    this.setState({
      top: next,
      vMovement: next / this.state.scrollAreaHeight * 100
    })
  }

  normalizeHorizontal(next){
    // Horizontal Scrolling
    let rightEnd = this.state.scrollAreaWidth - this.state.scrollWrapperWidth

    // Max Scroll Right
    if(next > rightEnd) next = rightEnd;

    // Max Scroll Right
    else if(next < 0) next = 0

    // Update the Horizontal Value
    this.setState({
      left: next,
      hMovement: next / this.state.scrollAreaWidth * 100
    })
  }

  handleChangePosition(movement, orientation){
    // Convert Percentage to Pixel
    let next = movement / 100
    if( orientation == 'vertical' ) this.normalizeVertical( next * this.state.scrollAreaHeight )
    if( orientation == 'horizontal' ) this.normalizeHorizontal( next * this.state.scrollAreaWidth )
  }

  handleScrollbarDragging(){
    this.setState({ dragging: true })
  }

  handleScrollbarStopDrag(){
    this.setState({ dragging: false })
  }

  componentDidMount() {

    // The Elements
    let $scrollArea = this.refs.scrollArea
    let $scrollWrapper = this.refs.scrollWrapper

    // Computed Style
    let scrollWrapperStyle = window.getComputedStyle($scrollWrapper,null)

    // Set the State!
    this.setState({

      // Scroll Area Height and Width
      scrollAreaHeight: $scrollArea.children[0].clientHeight,
      scrollAreaWidth: $scrollArea.children[0].clientWidth,

      // Scroll Wrapper Height and Width
      scrollWrapperHeight: parseFloat(scrollWrapperStyle.height),
      scrollWrapperWidth: parseFloat(scrollWrapperStyle.width),

      // Make sure The wrapper is Ready, then render the scrollbar
      ready: true
    })

  }

}

// The Props
ScrollWrapper.propTypes = {
  speed: React.PropTypes.number,
  className: React.PropTypes.string
}

ScrollWrapper.defaultProps = {
  speed: 53,
  className: ""
}

export default ScrollWrapper;
