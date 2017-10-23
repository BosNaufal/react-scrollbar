import React from 'react';
import PropTypes from 'prop-types';

class HorizontalScrollbar extends React.Component {

  constructor() {
    super();
    this.state = {
      width: 0,
      dragging: false,
      start: 0,
    };

    this.jump = this.jump.bind(this);
    this.startDrag = this.startDrag.bind(this);
  }

  componentDidMount() {
    this.calculateSize(this.props);

    // Put the Listener
    document.addEventListener('mousemove', this.onDrag.bind(this));
    document.addEventListener('touchmove', this.onDrag.bind(this));
    document.addEventListener('mouseup', this.stopDrag.bind(this));
    document.addEventListener('touchend', this.stopDrag.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.wrapper.width !== this.props.wrapper.width ||
        nextProps.area.width !== this.props.area.width) this.calculateSize(nextProps);
  }

  componentWillUnmount() {
    // Remove the Listener
    document.removeEventListener('mousemove', this.onDrag.bind(this));
    document.removeEventListener('touchmove', this.onDrag.bind(this));
    document.removeEventListener('mouseup', this.stopDrag.bind(this));
    document.removeEventListener('touchend', this.stopDrag.bind(this));
  }

  onDrag(event) {
    if (this.state.dragging) {
      // Make The Parent being in the Dragging State
      this.props.onDragging();

      event.preventDefault();
      event.stopPropagation();

      const e = event.changedTouches ? event.changedTouches[0] : event;

      const xMovement = e.clientX - this.state.start;
      const xMovementPercentage = (xMovement / this.props.wrapper.width) * 100;

      // Update the last e.clientX
      this.setState({ start: e.clientX }, () => {
        // The next Horizontal Value will be
        const next = this.props.scrolling + xMovementPercentage;

        // Tell the parent to change the position
        this.props.onChangePosition(next, 'horizontal');
      });
    }
  }

  startDrag(event) {
    event.preventDefault();
    event.stopPropagation();

    const e = event.changedTouches ? event.changedTouches[0] : event;

    // Prepare to drag
    this.setState({
      dragging: true,
      start: e.clientX,
    });
  }

  stopDrag() {
    if (this.state.dragging) {
      // Parent Should Change the Dragging State
      this.props.onStopDrag();
      this.setState({ dragging: false });
    }
  }

  jump(e) {
    const isContainer = e.target === this.container;

    if (isContainer) {
      // Get the Element Position
      const position = this.scrollbar.getBoundingClientRect();

      // Calculate the horizontal Movement
      const xMovement = e.clientX - position.left;
      const centerize = (this.state.width / 2);
      const xMovementPercentage = ((xMovement / this.props.wrapper.width) * 100) - centerize;

      // Update the last e.clientX
      this.setState({ start: e.clientX }, () => {
        // The next Horizontal Value will be
        const next = this.props.scrolling + xMovementPercentage;

        // Tell the parent to change the position
        this.props.onChangePosition(next, 'horizontal');
      });
    }
  }

  calculateSize(source) {
    // Scrollbar Width
    this.setState({ width: (source.wrapper.width / source.area.width) * 100 });
  }

  render() {
    const className = (base, name, pos, act, isAct) =>
      [
        base + name,
        base + name + pos,
        isAct ? base + name + act : '',
        isAct ? base + name + pos + act : '',
      ].join(' ');

    if (this.state.width < 100) {
      return (
        <div
          className={
            className(
              '-reactjs-scrollbar',
              '-track', ':horizontal',
              ':dragging',
              this.state.dragging || this.props.draggingFromParent,
            )}
          ref={(c) => { this.container = c; }}
          onClick={this.jump}
          style={{ position: 'absolute' }}
        >

          <div
            className={
              className(
                '-reactjs-scrollbar',
                '-thumb',
                ':horizontal',
                ':dragging',
                this.state.dragging || this.props.draggingFromParent,
              )}
            ref={(c) => { this.scrollbar = c; }}
            onTouchStart={this.startDrag}
            onMouseDown={this.startDrag}
            style={{
              position: 'relative',
              width: `${this.state.width}%`,
              left: `${this.props.scrolling}%`,
            }}
          />

        </div>
      );
    }
    return null;
  }

}


// The Props
HorizontalScrollbar.propTypes = {
  draggingFromParent: PropTypes.bool.isRequired,
  scrolling: PropTypes.number.isRequired,
  wrapper: PropTypes.shape().isRequired,
  area: PropTypes.shape().isRequired,
  onChangePosition: PropTypes.func.isRequired,
  onDragging: PropTypes.func.isRequired,
  onStopDrag: PropTypes.func.isRequired,
};

export default HorizontalScrollbar;
