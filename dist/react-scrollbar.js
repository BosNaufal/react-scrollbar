(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["react-scrollbar"] = factory(require("react"));
	else
		root["react-scrollbar"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _verticalScrollbar = __webpack_require__(4);

var _verticalScrollbar2 = _interopRequireDefault(_verticalScrollbar);

var _horizontalScrollbar = __webpack_require__(3);

var _horizontalScrollbar2 = _interopRequireDefault(_horizontalScrollbar);

__webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollWrapper = function (_React$Component) {
  _inherits(ScrollWrapper, _React$Component);

  function ScrollWrapper() {
    _classCallCheck(this, ScrollWrapper);

    var _this = _possibleConstructorReturn(this, (ScrollWrapper.__proto__ || Object.getPrototypeOf(ScrollWrapper)).call(this));

    _this.state = {
      ready: false,
      top: 0,
      left: 0,
      scrollAreaHeight: null,
      scrollAreaWidth: null,
      scrollWrapperHeight: null,
      scrollWrapperWidth: null,
      vMovement: 0,
      hMovement: 0,
      dragging: false, //note: dragging - fake pseudo class
      scrolling: false, //changes: scrolling (new fake pseudo class)
      reset: false, //changes: change state without rendering
      start: { y: 0, x: 0 }
    };
    return _this;
  }

  //changes: update scrollbars when parent resizing


  _createClass(ScrollWrapper, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.calculateSize.bind(this)();
    }

    //changes: reset settings without rerendering (need for scrolling state)

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextState.reset) {
        this.setState({ reset: false });
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var className = function className(base, name, pos, isDrg, isScr) {
        return [base + name, base + name + pos, isDrg ? base + name + ':dragging' : '', isDrg ? base + name + pos + ':dragging' : '', isScr ? base + name + ':scrolling' : '', isScr ? base + name + pos + ':scrolling' : ''].join(' ');
      };

      return _react2.default.createElement(
        'div',
        {
          onClick: this.calculateSize.bind(this),
          className: this.props.className,
          ref: 'scrollWrapper',
          style: _extends({}, this.props.style, { overflow: 'hidden', position: 'relative' })
        },
        _react2.default.createElement(
          'div',
          {
            className: className('-reactjs-scrollbar', '-area', '', this.state.dragging, this.state.scrolling),
            ref: 'scrollArea',
            onWheel: this.scroll.bind(this),
            onTouchStart: this.startDrag.bind(this),
            onTouchMove: this.onDrag.bind(this),
            onTouchEnd: this.stopDrag.bind(this),
            onChange: this.calculateSize.bind(this),
            style: { marginTop: this.state.top * -1 + 'px', marginLeft: this.state.left * -1 + 'px' } },
          this.props.children,
          this.state.ready ? _react2.default.createElement(_verticalScrollbar2.default, {
            area: { height: this.state.scrollAreaHeight },
            wrapper: { height: this.state.scrollWrapperHeight },
            scrolling: this.state.vMovement,
            draggingFromParent: this.state.dragging,
            onChangePosition: this.handleChangePosition.bind(this),
            onDragging: this.handleScrollbarDragging.bind(this),
            onStopDrag: this.handleScrollbarStopDrag.bind(this) }) : null,
          this.state.ready ? _react2.default.createElement(_horizontalScrollbar2.default, {
            area: { width: this.state.scrollAreaWidth },
            wrapper: { width: this.state.scrollWrapperWidth },
            scrolling: this.state.hMovement,
            draggingFromParent: this.state.dragging,
            onChangePosition: this.handleChangePosition.bind(this),
            onDragging: this.handleScrollbarDragging.bind(this),
            onStopDrag: this.handleScrollbarStopDrag.bind(this) }) : null
        )
      );
    }
  }, {
    key: 'scroll',
    value: function scroll(e) {
      var _this2 = this;

      e.preventDefault();

      // Make sure the content height is not changed
      this.calculateSize(function () {
        // Set the wheel step
        var num = _this2.props.speed;

        // DOM events
        var shifted = e.shiftKey;
        var scrollY = e.deltaY > 0 ? num : -num;
        var scrollX = e.deltaX > 0 ? num : -num;

        // Fix Mozilla Shifted Wheel~
        if (shifted && e.deltaX == 0) scrollX = e.deltaY > 0 ? num : -num;

        // Next Value
        var nextY = _this2.state.top + scrollY;
        var nextX = _this2.state.left + scrollX;

        // Is it Scrollable?
        var canScrollY = _this2.state.scrollAreaHeight > _this2.state.scrollWrapperHeight;
        var canScrollX = _this2.state.scrollAreaWidth > _this2.state.scrollWrapperWidth;

        //changes: Set scrolling state before changing position
        _this2.setState({ scrolling: true }, function () {
          // Vertical Scrolling
          if (canScrollY && !shifted) _this2.normalizeVertical(nextY, { scrolling: false, reset: true });

          // Horizontal Scrolling
          if (shifted && canScrollX) _this2.normalizeHorizontal(nextX, { scrolling: false, reset: true });
        });
      });
    }

    // DRAG EVENT JUST FOR TOUCH DEVICE~

  }, {
    key: 'startDrag',
    value: function startDrag(e) {
      var _this3 = this;

      e.preventDefault();
      e.stopPropagation();

      e = e.changedTouches ? e.changedTouches[0] : e;

      // Make sure the content height is not changed
      this.calculateSize(function () {
        // Prepare to drag
        _this3.setState({
          dragging: true,
          start: { y: e.pageY, x: e.pageX }
        });
      });
    }
  }, {
    key: 'onDrag',
    value: function onDrag(e) {
      if (this.state.dragging) {

        e.preventDefault();
        e = e.changedTouches ? e.changedTouches[0] : e;

        // Invers the Movement
        var yMovement = this.state.start.y - e.clientY;
        var xMovement = this.state.start.x - e.clientX;

        // Update the last e.client
        this.setState({ start: { y: e.clientY, x: e.clientX } });

        // The next Vertical Value will be
        var nextY = this.state.top + yMovement;
        var nextX = this.state.left + xMovement;

        this.normalizeVertical(nextY);
        this.normalizeHorizontal(nextX);
      }
    }
  }, {
    key: 'stopDrag',
    value: function stopDrag(e) {
      this.setState({ dragging: false });
    }
  }, {
    key: 'scrollToY',
    value: function scrollToY(y) {
      this.normalizeVertical(y);
    }
  }, {
    key: 'scrollToX',
    value: function scrollToX(x) {
      this.normalizeVertical(x);
    }
  }, {
    key: 'normalizeVertical',
    value: function normalizeVertical(next) {
      var elementSize = this.getSize();

      // Vertical Scrolling
      var lowerEnd = elementSize.scrollAreaHeight - elementSize.scrollWrapperHeight;

      // Max Scroll Down
      if (next > lowerEnd) next = lowerEnd;

      // Max Scroll Up
      else if (next < 0) next = 0;

      // Update the Vertical Value
      this.setState({
        top: next,
        vMovement: next / elementSize.scrollAreaHeight * 100
      });
    }
  }, {
    key: 'normalizeHorizontal',
    value: function normalizeHorizontal(next) {
      var elementSize = this.getSize();

      // Horizontal Scrolling
      var rightEnd = elementSize.scrollAreaWidth - this.state.scrollWrapperWidth;

      // Max Scroll Right
      if (next > rightEnd) next = rightEnd;

      // Max Scroll Right
      else if (next < 0) next = 0;

      // Update the Horizontal Value
      this.setState({
        left: next,
        hMovement: next / elementSize.scrollAreaWidth * 100
      });
    }
  }, {
    key: 'handleChangePosition',
    value: function handleChangePosition(movement, orientation) {
      var _this4 = this;

      // Make sure the content height is not changed
      this.calculateSize(function () {
        // Convert Percentage to Pixel
        var next = movement / 100;
        if (orientation == 'vertical') _this4.normalizeVertical(next * _this4.state.scrollAreaHeight);
        if (orientation == 'horizontal') _this4.normalizeHorizontal(next * _this4.state.scrollAreaWidth);
      });
    }
  }, {
    key: 'handleScrollbarDragging',
    value: function handleScrollbarDragging() {
      this.setState({ dragging: true });
    }
  }, {
    key: 'handleScrollbarStopDrag',
    value: function handleScrollbarStopDrag() {
      this.setState({ dragging: false });
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      // The Elements
      var $scrollArea = this.refs.scrollArea;
      var $scrollWrapper = this.refs.scrollWrapper;

      // Get new Elements Size
      var elementSize = {
        // Scroll Area Height and Width
        scrollAreaHeight: $scrollArea.getBoundingClientRect().height, //changes: support margin and no one child
        scrollAreaWidth: $scrollArea.children[0].clientWidth, //fixme: not working same way

        // Scroll Wrapper Height and Width
        scrollWrapperHeight: $scrollWrapper.clientHeight,
        scrollWrapperWidth: $scrollWrapper.clientWidth
      };
      return elementSize;
    }
  }, {
    key: 'calculateSize',
    value: function calculateSize(cb) {
      if (typeof cb !== 'function') cb = null;

      var elementSize = this.getSize();

      if (elementSize.scrollWrapperHeight != this.state.scrollWrapperHeight || elementSize.scrollWrapperWidth != this.state.scrollWrapperWidth || elementSize.scrollAreaHeight != this.state.scrollAreaHeight || elementSize.scrollAreaWidth != this.state.scrollAreaWidth) {
        // Set the State!
        return this.setState({

          // Scroll Area Height and Width
          scrollAreaHeight: elementSize.scrollAreaHeight,
          scrollAreaWidth: elementSize.scrollAreaWidth,

          // Scroll Wrapper Height and Width
          scrollWrapperHeight: elementSize.scrollWrapperHeight,
          scrollWrapperWidth: elementSize.scrollWrapperWidth,

          // Make sure The wrapper is Ready, then render the scrollbar
          ready: true
        }, function () {
          return cb ? cb() : false;
        });
      } else return cb ? cb() : false;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.calculateSize();

      // Attach The Event for Responsive View~
      window.addEventListener('resize', this.calculateSize.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Remove Event
      window.removeEventListener('resize', this.calculateSize.bind(this));
    }
  }]);

  return ScrollWrapper;
}(_react2.default.Component);

// The Props


ScrollWrapper.propTypes = {
  speed: _react2.default.PropTypes.number,
  className: _react2.default.PropTypes.string,
  style: _react2.default.PropTypes.object
};

ScrollWrapper.defaultProps = {
  speed: 53,
  className: "",
  style: {}
};

exports.default = ScrollWrapper;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function () {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for (var i = 0; i < this.length; i++) {
			var item = this[i];
			if (item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HorizontalScrollbar = function (_React$Component) {
  _inherits(HorizontalScrollbar, _React$Component);

  function HorizontalScrollbar() {
    _classCallCheck(this, HorizontalScrollbar);

    var _this = _possibleConstructorReturn(this, (HorizontalScrollbar.__proto__ || Object.getPrototypeOf(HorizontalScrollbar)).call(this));

    _this.state = {
      width: 0,
      dragging: false,
      start: 0
    };
    return _this;
  }

  _createClass(HorizontalScrollbar, [{
    key: 'render',
    value: function render() {
      var className = function className(base, name, pos, act, isAct) {
        return [base + name, base + name + pos, isAct ? base + name + act : '', isAct ? base + name + pos + act : ''].join(' ');
      };
      if (this.state.width < 100) return _react2.default.createElement(
        'div',
        {
          className: className('-reactjs-scrollbar', '-track', ':horizontal', ':dragging', this.state.dragging || this.props.draggingFromParent),
          ref: 'container',
          onClick: this.jump.bind(this),
          style: { position: 'absolute' } },
        _react2.default.createElement('div', {
          className: className('-reactjs-scrollbar', '-thumb', ':horizontal', ':dragging', this.state.dragging || this.props.draggingFromParent),
          ref: 'scrollbar',
          onTouchStart: this.startDrag.bind(this),
          onMouseDown: this.startDrag.bind(this),
          style: {
            position: 'relative',
            width: this.state.width + '%',
            left: this.props.scrolling + '%'
          } })
      );else return null;
    }
  }, {
    key: 'startDrag',
    value: function startDrag(e) {

      e.preventDefault();
      e.stopPropagation();

      e = e.changedTouches ? e.changedTouches[0] : e;

      // Prepare to drag
      this.setState({
        dragging: true,
        start: e.clientX
      });
    }
  }, {
    key: 'onDrag',
    value: function onDrag(e) {
      var _this2 = this;

      if (this.state.dragging) {
        (function () {

          // Make The Parent being in the Dragging State
          _this2.props.onDragging();

          e.preventDefault();
          e.stopPropagation();

          e = e.changedTouches ? e.changedTouches[0] : e;

          var xMovement = e.clientX - _this2.state.start;
          var xMovementPercentage = xMovement / _this2.props.wrapper.width * 100;

          // Update the last e.clientX
          _this2.setState({ start: e.clientX }, function () {

            // The next Horizontal Value will be
            var next = _this2.props.scrolling + xMovementPercentage;

            // Tell the parent to change the position
            _this2.props.onChangePosition(next, 'horizontal');
          });
        })();
      }
    }
  }, {
    key: 'stopDrag',
    value: function stopDrag(e) {
      if (this.state.dragging) {
        // Parent Should Change the Dragging State
        this.props.onStopDrag();
        this.setState({ dragging: false });
      }
    }
  }, {
    key: 'jump',
    value: function jump(e) {
      var _this3 = this;

      var isContainer = e.target === this.refs.container;

      if (isContainer) {
        (function () {

          // Get the Element Position
          var position = _this3.refs.scrollbar.getBoundingClientRect();

          // Calculate the horizontal Movement
          var xMovement = e.clientX - position.left;
          var centerize = _this3.state.width / 2;
          var xMovementPercentage = xMovement / _this3.props.wrapper.width * 100 - centerize;

          // Update the last e.clientX
          _this3.setState({ start: e.clientX }, function () {

            // The next Horizontal Value will be
            var next = _this3.props.scrolling + xMovementPercentage;

            // Tell the parent to change the position
            _this3.props.onChangePosition(next, 'horizontal');
          });
        })();
      }
    }
  }, {
    key: 'calculateSize',
    value: function calculateSize(source) {
      // Scrollbar Width
      this.setState({ width: source.wrapper.width / source.area.width * 100 });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.wrapper.width !== this.props.wrapper.width || nextProps.area.width !== this.props.area.width) this.calculateSize(nextProps);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.calculateSize(this.props);

      // Put the Listener
      document.addEventListener("mousemove", this.onDrag.bind(this));
      document.addEventListener("touchmove", this.onDrag.bind(this));
      document.addEventListener("mouseup", this.stopDrag.bind(this));
      document.addEventListener("touchend", this.stopDrag.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Remove the Listener
      document.removeEventListener("mousemove", this.onDrag.bind(this));
      document.removeEventListener("touchmove", this.onDrag.bind(this));
      document.removeEventListener("mouseup", this.stopDrag.bind(this));
      document.removeEventListener("touchend", this.stopDrag.bind(this));
    }
  }]);

  return HorizontalScrollbar;
}(_react2.default.Component);

// The Props


HorizontalScrollbar.propTypes = {
  draggingFromParent: _react2.default.PropTypes.bool.isRequired,
  scrolling: _react2.default.PropTypes.number.isRequired,
  wrapper: _react2.default.PropTypes.object.isRequired,
  area: _react2.default.PropTypes.object.isRequired,
  onChangePosition: _react2.default.PropTypes.func.isRequired,
  onDragging: _react2.default.PropTypes.func.isRequired,
  onStopDrag: _react2.default.PropTypes.func.isRequired
};

exports.default = HorizontalScrollbar;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VerticalScrollbar = function (_React$Component) {
  _inherits(VerticalScrollbar, _React$Component);

  function VerticalScrollbar() {
    _classCallCheck(this, VerticalScrollbar);

    var _this = _possibleConstructorReturn(this, (VerticalScrollbar.__proto__ || Object.getPrototypeOf(VerticalScrollbar)).call(this));

    _this.state = {
      height: 0,
      dragging: false,
      start: 0
    };
    return _this;
  }

  _createClass(VerticalScrollbar, [{
    key: 'render',
    value: function render() {
      var className = function className(base, name, pos, act, isAct) {
        return [base + name, base + name + pos, isAct ? base + name + act : '', isAct ? base + name + pos + act : ''].join(' ');
      };
      if (this.state.height < 100) return _react2.default.createElement(
        'div',
        {
          className: className('-reactjs-scrollbar', '-track', ':vertical', ':dragging', this.state.dragging || this.props.draggingFromParent),
          ref: 'container',
          onClick: this.jump.bind(this),
          style: { position: 'absolute' } },
        _react2.default.createElement('div', {
          className: className('-reactjs-scrollbar', '-thumb', ':vertical', ':dragging', this.state.dragging || this.props.draggingFromParent),
          ref: 'scrollbar',
          onTouchStart: this.startDrag.bind(this),
          onMouseDown: this.startDrag.bind(this),
          style: {
            position: 'relative',
            height: this.state.height + '%',
            top: this.props.scrolling + '%'
          } })
      );else return null;
    }
  }, {
    key: 'startDrag',
    value: function startDrag(e) {

      e.preventDefault();
      e.stopPropagation();

      e = e.changedTouches ? e.changedTouches[0] : e;

      // Prepare to drag
      this.setState({
        dragging: true,
        start: e.clientY
      });
    }
  }, {
    key: 'onDrag',
    value: function onDrag(e) {
      var _this2 = this;

      if (this.state.dragging) {
        (function () {

          // Make The Parent being in the Dragging State
          _this2.props.onDragging();

          e.preventDefault();
          e.stopPropagation();

          e = e.changedTouches ? e.changedTouches[0] : e;

          var yMovement = e.clientY - _this2.state.start;
          var yMovementPercentage = yMovement / _this2.props.wrapper.height * 100;

          // Update the last e.clientY
          _this2.setState({ start: e.clientY }, function () {

            // The next Vertical Value will be
            var next = _this2.props.scrolling + yMovementPercentage;

            // Tell the parent to change the position
            _this2.props.onChangePosition(next, 'vertical');
          });
        })();
      }
    }
  }, {
    key: 'stopDrag',
    value: function stopDrag(e) {
      if (this.state.dragging) {
        // Parent Should Change the Dragging State
        this.props.onStopDrag();
        this.setState({ dragging: false });
      }
    }
  }, {
    key: 'jump',
    value: function jump(e) {
      var _this3 = this;

      var isContainer = e.target === this.refs.container;

      if (isContainer) {
        (function () {

          // Get the Element Position
          var position = _this3.refs.scrollbar.getBoundingClientRect();

          // Calculate the vertical Movement
          var yMovement = e.clientY - position.top;
          var centerize = _this3.state.height / 2;
          var yMovementPercentage = yMovement / _this3.props.wrapper.height * 100 - centerize;

          // Update the last e.clientY
          _this3.setState({ start: e.clientY }, function () {

            // The next Vertical Value will be
            var next = _this3.props.scrolling + yMovementPercentage;

            // Tell the parent to change the position
            _this3.props.onChangePosition(next, 'vertical');
          });
        })();
      }
    }
  }, {
    key: 'calculateSize',
    value: function calculateSize(source) {
      // Scrollbar Width
      this.setState({ height: source.wrapper.height / source.area.height * 100 });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.wrapper.height !== this.props.wrapper.height || nextProps.area.height !== this.props.area.height) this.calculateSize(nextProps);
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      // The Elements
      var $scrollArea = this.refs.container.parentElement;
      var $scrollWrapper = $scrollArea.parentElement;

      // Get new Elements Size
      var elementSize = {
        // Scroll Area Height and Width
        scrollAreaHeight: $scrollArea.children[0].clientHeight,
        scrollAreaWidth: $scrollArea.children[0].clientWidth,

        // Scroll Wrapper Height and Width
        scrollWrapperHeight: $scrollWrapper.clientHeight,
        scrollWrapperWidth: $scrollWrapper.clientWidth
      };
      return elementSize;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.calculateSize(this.props);

      // Put the Listener
      document.addEventListener("mousemove", this.onDrag.bind(this));
      document.addEventListener("touchmove", this.onDrag.bind(this));
      document.addEventListener("mouseup", this.stopDrag.bind(this));
      document.addEventListener("touchend", this.stopDrag.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Remove the Listener
      document.removeEventListener("mousemove", this.onDrag.bind(this));
      document.removeEventListener("touchmove", this.onDrag.bind(this));
      document.removeEventListener("mouseup", this.stopDrag.bind(this));
      document.removeEventListener("touchend", this.stopDrag.bind(this));
    }
  }]);

  return VerticalScrollbar;
}(_react2.default.Component);

// The Props


VerticalScrollbar.propTypes = {
  draggingFromParent: _react2.default.PropTypes.bool.isRequired,
  scrolling: _react2.default.PropTypes.number.isRequired,
  wrapper: _react2.default.PropTypes.object.isRequired,
  area: _react2.default.PropTypes.object.isRequired,
  onChangePosition: _react2.default.PropTypes.func.isRequired,
  onDragging: _react2.default.PropTypes.func.isRequired,
  onStopDrag: _react2.default.PropTypes.func.isRequired
};

exports.default = VerticalScrollbar;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, ".-reactjs-scrollbar-area\\:scrolling {\n  transition: all 0.5s ease;\n  -moz-transition: all 0.5s ease;\n  -webkit-transition: all 0.5s ease;\n  -o-transition: all 0.5s ease; }\n  .-reactjs-scrollbar-area\\:scrolling .-reactjs-scrollbar-thumb {\n    transition: all 0.5s ease;\n    -moz-transition: all 0.5s ease;\n    -webkit-transition: all 0.5s ease;\n    -o-transition: all 0.5s ease; }\n\n.-reactjs-scrollbar-area:hover .-reactjs-scrollbar-track {\n  opacity: 1; }\n\n.-reactjs-scrollbar-track {\n  /*future: .-reactjs-scrollbar */\n  transition: all 0.5s ease;\n  -moz-transition: all 0.5s ease;\n  -webkit-transition: all 0.5s ease;\n  -o-transition: all 0.5s ease;\n  opacity: 0.5;\n  background: transparent; }\n  .-reactjs-scrollbar-track:hover {\n    background: rgba(0, 0, 0, 0.3); }\n  .-reactjs-scrollbar-track\\:vertical {\n    width: 10px;\n    height: 100%;\n    top: 0;\n    right: 0; }\n  .-reactjs-scrollbar-track\\:horizontal {\n    height: 10px;\n    width: 100%;\n    bottom: 0;\n    right: 0; }\n\n.-reactjs-scrollbar-thumb {\n  background: rgba(0, 0, 0, 0.5);\n  cursor: default;\n  width: 10px;\n  height: 10px; }\n", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(6)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./style_default.scss", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./style_default.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactScrollbar = __webpack_require__(1);

var _reactScrollbar2 = _interopRequireDefault(_reactScrollbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _reactScrollbar2.default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=react-scrollbar.js.map