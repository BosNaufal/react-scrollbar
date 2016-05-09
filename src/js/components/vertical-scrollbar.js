
import React from 'react';

class VerticalScrollbar extends React.Component {

  constructor() {
    super();
    this.state = {
      height: 0,
      dragging: false,
      start: 0
    }
  }

  render(){
    if(this.state.height < 100) return(
      <div
        className="react-scrollbar__scrollbar-vertical"
        ref="container"
        onClick={ this.jump.bind(this) }>

        <div
          className={ "scrollbar" + ( this.state.dragging || this.props.draggingFromParent ? '' : ' react-scrollbar-transition') }
          ref="scrollbar"
          onTouchStart={ this.startDrag.bind(this) }
          onMouseDown={ this.startDrag.bind(this) }
          style={{
            height: this.state.height+'%',
            top: this.props.scrolling + '%'
          }} />

      </div>
    )
  }


  startDrag(e){

    e.preventDefault()
    e.stopPropagation()

    e = e.changedTouches ? e.changedTouches[0] : e

    // Prepare to drag
    this.setState({
      dragging: true,
      start: e.pageY
    })
  }

  onDrag(e){

    if(this.state.dragging){

      // Make The Parent being in the Dragging State
      this.props.onDragging()

      e.preventDefault()
      e.stopPropagation()

      e = e.changedTouches ? e.changedTouches[0] : e

      let yMovement = e.pageY - this.state.start
      let yMovementPercentage = yMovement / this.props.wrapper.height * 100

      // Update the last e.pageY
      this.setState({ start: e.pageY }, () => {

        // The next Vertical Value will be
        let next = this.props.scrolling + yMovementPercentage

        // Tell the parent to change the position
        this.props.onChangePosition(next, 'vertical')
      })



    }

  }

  stopDrag(e){
    if(this.state.dragging){
      // Parent Should Change the Dragging State
      this.props.onStopDrag()
      this.setState({ dragging: false })
    }
  }

  jump(e){

    let isContainer = e.target === this.refs.container

    if(isContainer){

      // Get the Element Position
      let position = this.refs.scrollbar.getBoundingClientRect()

      // Calculate the vertical Movement
      let yMovement = e.pageY - position.top
      let centerize = (this.state.height / 2)
      let yMovementPercentage = yMovement / this.props.wrapper.height * 100 - centerize

      // Update the last e.pageY
      this.setState({ start: e.pageY }, () => {

        // The next Vertical Value will be
        let next = this.props.scrolling + yMovementPercentage

        // Tell the parent to change the position
        this.props.onChangePosition(next, 'vertical')

      })

    }
  }

  componentDidMount() {
    // Scrollbar Height
    this.setState({ height:  this.props.wrapper.height / this.props.area.height * 100 })

    // Put the Listener
    document.addEventListener("mousemove", this.onDrag.bind(this))
    document.addEventListener("touchmove", this.onDrag.bind(this))
    document.addEventListener("mouseup", this.stopDrag.bind(this))
    document.addEventListener("touchend", this.stopDrag.bind(this))
  }

  componentWillUnmount() {
    // Remove the Listener
    document.removeEventListener("mousemove", this.onDrag.bind(this))
    document.removeEventListener("touchmove", this.onDrag.bind(this))
    document.removeEventListener("mouseup", this.stopDrag.bind(this))
    document.removeEventListener("touchend", this.stopDrag.bind(this))
  }

}

export default VerticalScrollbar;
