import React from 'react';
import PropTypes from 'prop-types';

import VerticalScrollbar from './vertical-scrollbar';
import HorizontalScrollbar from './horizontal-scrollbar';

import './style_default';

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
      dragging: false,  // note: dragging - fake pseudo class
      scrolling: false, // changes: scrolling (new fake pseudo class)
      reset: false, // changes: change state without rendering
      start: { y: 0, x: 0 },
    };

    this.updateSize = this.updateSize.bind(this);
    this.calculateSize = this.calculateSize.bind(this);
    this.scroll = this.scroll.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.stopDrag = this.stopDrag.bind(this);
    this.handleChangePosition = this.handleChangePosition.bind(this);
    this.handleScrollbarDragging = this.handleScrollbarDragging.bind(this);
    this.handleScrollbarStopDrag = this.handleScrollbarStopDrag.bind(this);
  }

  componentDidMount() {
    this.updateSize();

    // Attach The Event for Responsive View~
    window.addEventListener('resize', this.updateSize);
  }

// changes: update scrollbars when parent resizing
  componentWillReceiveProps() {
    this.updateSize();
  }

// changes: reset settings without rerendering (need for scrolling state)
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.reset) {
      this.setState({ reset: false });
      return false;
    }
    return true;
  }


  componentWillUnmount() {
    // Remove Event
    window.removeEventListener('resize', this.updateSize);
  }

  onDrag(event) {
    if (this.state.dragging) {
      event.preventDefault();
      const e = event.changedTouches ? event.changedTouches[0] : event;

      // Invers the Movement
      const yMovement = this.state.start.y - e.clientY;
      const xMovement = this.state.start.x - e.clientX;

      // Update the last e.client
      this.setState({ start: { y: e.clientY, x: e.clientX } });

      // The next Vertical Value will be
      const nextY = this.state.top + yMovement;
      const nextX = this.state.left + xMovement;

      this.normalizeVertical(nextY);
      this.normalizeHorizontal(nextX);
    }
  }

  getSize() {
    // The Elements
    const $scrollArea = this.scrollArea;
    const $scrollWrapper = this.scrollWrapper;

    // Get new Elements Size
    const elementSize = {
      // Scroll Area Height and Width

      // changes: support margin and no one child
      scrollAreaHeight: $scrollArea.getBoundingClientRect().height,
      scrollAreaWidth: $scrollArea.children[0].clientWidth, // fixme: not working same way

      // Scroll Wrapper Height and Width
      scrollWrapperHeight: $scrollWrapper.clientHeight,
      scrollWrapperWidth: $scrollWrapper.clientWidth,
    };

    return elementSize;
  }

  stopDrag() {
    this.setState({ dragging: false });
  }

  scrollToY(pos) {
    const maxVal = this.state.scrollAreaHeight - this.state.scrollWrapperHeight;
    let val = pos;
    if (typeof pos === 'string') {
      const valK = parseInt(pos.match(/-?[\d]*%$/)[0], 10) / 100;
      val = valK * maxVal;
    }

    if (val < 0) {
      val = maxVal + val;
    }
    this.normalizeVertical(val);
  }

  scrollToX(pos) {
    const maxVal = this.state.scrollAreaWidth - this.state.scrollWrapperWidth;
    let val = pos;
    if (typeof pos === 'string') {
      const valK = parseInt(pos.match(/-?[\d]*%$/)[0], 10) / 100;
      val = valK * maxVal;
    }

    if (val < 0) {
      val = maxVal + val;
    }
    this.normalizeHorizontal(val);
  }


  normalizeVertical(nextPos, nextState) {
    // Vertical Scrolling
    const lowerEnd = this.state.scrollAreaHeight - this.state.scrollWrapperHeight;

    // Max Scroll Down
    // Max Scroll Up
    const trim = (max, min, val) => {
      const tmax = (val > max) ? max : val;
      const tmin = (tmax < min) ? min : tmax;
      return tmin;
    };
    const next = trim(lowerEnd, 0, nextPos);

    // Update the Vertical Value
    this.setState({
      top: next,
      vMovement: (next / this.state.scrollAreaHeight) * 100,
    }, () => this.setState({ ...nextState })); // changes: update state after operation
  }

  normalizeHorizontal(nextPos, nextState) {
    // Horizontal Scrolling
    const rightEnd = this.state.scrollAreaWidth - this.state.scrollWrapperWidth;

    // Max Scroll Right
    // Max Scroll Right
    const trim = (max, min, val) => {
      const tmax = (val > max) ? max : val;
      const tmin = (tmax < min) ? min : tmax;
      return tmin;
    };
    const next = trim(rightEnd, 0, nextPos);

    // Update the Horizontal Value
    this.setState({
      left: next,
      hMovement: (next / this.state.scrollAreaWidth) * 100,
    }, () => this.setState({ ...nextState })); // changes: update state after operation
  }

  handleChangePosition(movement, orientation) {
    // Make sure the content height is not changed
    this.calculateSize(() => {
      // Convert Percentage to Pixel
      const next = movement / 100;
      if (orientation === 'vertical') this.normalizeVertical(next * this.state.scrollAreaHeight);
      if (orientation === 'horizontal') this.normalizeHorizontal(next * this.state.scrollAreaWidth);
    });
  }

  handleScrollbarDragging() {
    this.setState({ dragging: true });
  }

  handleScrollbarStopDrag() {
    this.setState({ dragging: false });
  }

  updateSize() {
    const elementSize = this.getSize();

    if (elementSize.scrollWrapperHeight !== this.state.scrollWrapperHeight ||
        elementSize.scrollWrapperWidth !== this.state.scrollWrapperWidth ||
        elementSize.scrollAreaHeight !== this.state.scrollAreaHeight ||
        elementSize.scrollAreaWidth !== this.state.scrollAreaWidth) {
      // Set the State!
      this.setState({

        // Scroll Area Height and Width
        scrollAreaHeight: elementSize.scrollAreaHeight,
        scrollAreaWidth: elementSize.scrollAreaWidth,

        // Scroll Wrapper Height and Width
        scrollWrapperHeight: elementSize.scrollWrapperHeight,
        scrollWrapperWidth: elementSize.scrollWrapperWidth,

        // Make sure The wrapper is Ready, then render the scrollbar
        ready: true,
      });
    }
  }

  calculateSize(cb) {
    const elementSize = this.getSize();

    if (elementSize.scrollWrapperHeight !== this.state.scrollWrapperHeight ||
        elementSize.scrollWrapperWidth !== this.state.scrollWrapperWidth ||
        elementSize.scrollAreaHeight !== this.state.scrollAreaHeight ||
        elementSize.scrollAreaWidth !== this.state.scrollAreaWidth) {
      // Set the State!
      this.setState({
        // Scroll Area Height and Width
        scrollAreaHeight: elementSize.scrollAreaHeight,
        scrollAreaWidth: elementSize.scrollAreaWidth,

        // Scroll Wrapper Height and Width
        scrollWrapperHeight: elementSize.scrollWrapperHeight,
        scrollWrapperWidth: elementSize.scrollWrapperWidth,

        // Make sure The wrapper is Ready, then render the scrollbar
        ready: true,
      }, cb);
    } else cb();
  }

  // DRAG EVENT JUST FOR TOUCH DEVICE~
  startDrag(event) {
    event.preventDefault();
    event.stopPropagation();

    const e = event.changedTouches ? event.changedTouches[0] : event;

    // Make sure the content height is not changed
    this.calculateSize(() => {
      // Prepare to drag
      this.setState({
        dragging: true,
        start: { y: e.pageY, x: e.pageX },
      });
    });
  }

  scroll(e) {
    e.preventDefault();

    // Make sure the content height is not changed
    this.calculateSize(() => {
      // Set the wheel step
      const num = this.props.speed;

      // DOM events
      const shifted = e.shiftKey;
      const scrollY = e.deltaY > 0 ? num : -(num);
      let scrollX = e.deltaX > 0 ? num : -(num);

      // Fix Mozilla Shifted Wheel~
      if (shifted && e.deltaX === 0) scrollX = e.deltaY > 0 ? num : -(num);

      // Next Value
      const nextY = this.state.top + scrollY;
      const nextX = this.state.left + scrollX;

      // Is it Scrollable?
      const canScrollY = this.state.scrollAreaHeight > this.state.scrollWrapperHeight;
      const canScrollX = this.state.scrollAreaWidth > this.state.scrollWrapperWidth;

      // changes: Set scrolling state before changing position
      this.setState({ scrolling: true }, () => {
        // Vertical Scrolling
        if (canScrollY && !shifted) {
          this.normalizeVertical(nextY, { scrolling: false, reset: true });
        }

        // Horizontal Scrolling
        if (shifted && canScrollX) {
          this.normalizeHorizontal(nextX, { scrolling: false, reset: true });
        }
      });
    });
  }

  render() {
    const className = (base, name, pos, isDrg, isScr) => [
      base + name,
      base + name + pos,
      isDrg ? `${base + name}:dragging` : '',
      isDrg ? `${base + name + pos}:dragging` : '',
      isScr ? `${base + name}:scrolling` : '',
      isScr ? `${base + name + pos}:scrolling` : '',
    ].join(' ');

    return (
      <div
        onClick={this.updateSize}
        className={this.props.className}
        ref={(c) => { this.scrollWrapper = c; }}
        style={{ ...this.props.style, overflow: 'hidden', position: 'relative' }}
      >

        <div
          className={
            className('-reactjs-scrollbar', '-area', '', this.state.dragging, this.state.scrolling)
          }
          ref={(c) => { this.scrollArea = c; }}
          onWheel={this.scroll}
          onTouchStart={this.startDrag}
          onTouchMove={this.onDrag}
          onTouchEnd={this.stopDrag}
          onChange={this.updateSize}
          style={{ marginTop: `${this.state.top * -1}px`, marginLeft: `${this.state.left * -1}px` }}
        >

          { this.props.children }

          { this.state.ready ?

            <VerticalScrollbar
              area={{ height: this.state.scrollAreaHeight }}
              wrapper={{ height: this.state.scrollWrapperHeight }}
              scrolling={this.state.vMovement}
              draggingFromParent={this.state.dragging}
              onChangePosition={this.handleChangePosition}
              onDragging={this.handleScrollbarDragging}
              onStopDrag={this.handleScrollbarStopDrag}
            />

          : null }


          { this.state.ready ?

            <HorizontalScrollbar
              area={{ width: this.state.scrollAreaWidth }}
              wrapper={{ width: this.state.scrollWrapperWidth }}
              scrolling={this.state.hMovement}
              draggingFromParent={this.state.dragging}
              onChangePosition={this.handleChangePosition}
              onDragging={this.handleScrollbarDragging}
              onStopDrag={this.handleScrollbarStopDrag}
            />

          : null }

        </div>
      </div>

    );
  }

}

// The Props
ScrollWrapper.propTypes = {
  speed: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
  children: PropTypes.node,
};

ScrollWrapper.defaultProps = {
  speed: 53,
  className: 'react-scrollbar-default',
  style: { },
  children: null,
};

export default ScrollWrapper;
