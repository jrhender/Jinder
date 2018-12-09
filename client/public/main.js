/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./wwwroot/client/app/Components/index.jsx","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./wwwroot/client/app/Components/JTinderButtons.jsx":
/*!**********************************************************!*\
  !*** ./wwwroot/client/app/Components/JTinderButtons.jsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ProfileModal_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProfileModal.jsx */ "./wwwroot/client/app/Components/ProfileModal.jsx");



class JTinderButtons extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileText: "",
      profileModalIsOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(ev) {
    this.setState(prevState => {
      return {
        profileModalIsOpen: !prevState.profileModalIsOpen
      };
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "actions-wrap"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "actions"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "profile"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      onClick: this.toggleModal,
      src: "img/happyFace.png"
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dislike"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      onClick: this.props.handleDislike,
      src: "img/dislike_button.png"
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "like"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      onClick: this.props.handleLike,
      src: "img/like_button.png"
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ProfileModal_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
      currentPane: this.props.currentPane,
      closeModal: this.toggleModal,
      show: this.state.profileModalIsOpen
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (JTinderButtons);

/***/ }),

/***/ "./wwwroot/client/app/Components/JTinderPane.jsx":
/*!*******************************************************!*\
  !*** ./wwwroot/client/app/Components/JTinderPane.jsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-motion */ "./node_modules/react-motion/lib/react-motion.js");
/* harmony import */ var react_motion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_motion__WEBPACK_IMPORTED_MODULE_1__);



class JTinderPane extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let paneNumber = this.props.paneNumber;
    let likeOpacity = this.props.likeOpacity;
    let dislikeOpacity = this.props.dislikeOpacity;
    let likeStatus = this.props.likeStatus;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_motion__WEBPACK_IMPORTED_MODULE_1__["Motion"], {
      defaultStyle: {
        xTranslateVal: 0,
        yTranslateVal: 0,
        rotationVal: 0
      },
      style: {
        xTranslateVal: this.props.xTranslateVal,
        yTranslateVal: this.props.yTranslateVal,
        rotationVal: this.props.rotationVal
      },
      onRest: this.props.motionRestCallback
    }, ({
      xTranslateVal,
      yTranslateVal,
      rotationVal
    }) => {
      let paneStyle = {
        transform: 'translate(' + xTranslateVal + 'px, ' + yTranslateVal + 'px) ' + 'rotate(' + rotationVal + 'deg)'
      };

      if (likeStatus == 1 || likeStatus == -1) {
        paneStyle = {
          visibility: 'hidden'
        };
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "pane" + paneNumber,
        style: paneStyle
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "img",
        style: this.props.imageUrl ? {
          backgroundImage: `url(${this.props.imageUrl})`
        } : {}
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "like",
        style: likeOpacity
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "dislike",
        style: dislikeOpacity
      }));
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (JTinderPane);

/***/ }),

/***/ "./wwwroot/client/app/Components/JTinderPaneWrapper.jsx":
/*!**************************************************************!*\
  !*** ./wwwroot/client/app/Components/JTinderPaneWrapper.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _JTinderPane_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JTinderPane.jsx */ "./wwwroot/client/app/Components/JTinderPane.jsx");
/* harmony import */ var _JTinderButtons_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./JTinderButtons.jsx */ "./wwwroot/client/app/Components/JTinderButtons.jsx");
/* harmony import */ var react_measure__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-measure */ "./node_modules/react-measure/lib/react-measure.js");
/* harmony import */ var react_measure__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_measure__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-motion */ "./node_modules/react-motion/lib/react-motion.js");
/* harmony import */ var react_motion__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_motion__WEBPACK_IMPORTED_MODULE_4__);






class JTinderPaneWrapper extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    let initializingArray = [];

    for (let i = 0; i < this.props.paneCount; i++) {
      initializingArray.push({});
    }

    this.state = {
      touchStart: false,
      xStart: 0,
      yStart: 0,
      dimensions: {
        width: -1,
        height: -1
      },
      likeOpacityArray: initializingArray,
      dislikeOpacityArray: initializingArray,
      xTranslateArray: initializingArray.map(() => 0),
      yTranslateArray: initializingArray.map(() => 0),
      rotationArray: initializingArray.map(() => 0),
      motionRestCallbackArray: initializingArray.map(() => {
        () => undefined;
      })
    };
  }

  mousedown(ev) {
    if (this.state.touchStart === false) {
      let pageX = typeof ev.pageX == 'undefined' ? ev.touches[0].pageX : ev.pageX;
      let pageY = typeof ev.pageY == 'undefined' ? ev.touches[0].pageY : ev.pageY;
      this.setState(prevState => {
        return {
          touchStart: true,
          xStart: pageX,
          yStart: pageY
        };
      });
    }
  }

  mouseup(ev) {
    let pageX = typeof ev.pageX == 'undefined' ? ev.changedTouches[0].pageX : ev.pageX;
    let deltaX = parseInt(pageX) - parseInt(this.state.xStart);
    let opa = Math.abs(Math.abs(deltaX) / this.props.threshold / 100 + 0.2);

    if (opa >= 1) {
      if (this.state.xTranslateArray[this.props.currentPane] > 0) {
        this.handleLike();
      } else {
        this.handleDislike();
      }
    } else {
      this.setState(prevState => {
        return {
          touchStart: false,
          xTranslateArray: prevState.xTranslateArray.map(function (item, index) {
            return index == this.props.currentPane ? 0 : item;
          }, this),
          yTranslateArray: prevState.yTranslateArray.map(function (item, index) {
            return index == this.props.currentPane ? 0 : item;
          }, this),
          rotationArray: prevState.rotationArray.map(function (item, index) {
            return index == this.props.currentPane ? 0 : item;
          }, this),
          likeOpacityArray: prevState.likeOpacityArray.map(function (item, index) {
            return index == this.props.currentPane ? {
              opacity: 0
            } : item;
          }, this),
          dislikeOpacityArray: prevState.dislikeOpacityArray.map(function (item, index) {
            return index == this.props.currentPane ? {
              opacity: 0
            } : item;
          }, this)
        };
      });
    }
  }

  mousemove(ev) {
    if (this.state.touchStart === true) {
      let pageX = typeof ev.pageX == 'undefined' ? ev.touches[0].pageX : ev.pageX;
      let pageY = typeof ev.pageY == 'undefined' ? ev.touches[0].pageY : ev.pageY;
      let deltaX = parseInt(pageX) - parseInt(this.state.xStart);
      let deltaY = parseInt(pageY) - parseInt(this.state.yStart);
      let percent = 100 / this.state.dimensions.width * deltaX / this.props.paneCount;
      let opa = Math.abs(deltaX) / this.props.threshold / 100 + 0.2;

      if (opa > 1.0) {
        opa = 1.0;
      }

      if (deltaX > 0) {
        this.setState(prevState => {
          return {
            xTranslateArray: prevState.xTranslateArray.map(function (item, index) {
              return index == this.props.currentPane ? deltaX : item;
            }, this),
            yTranslateArray: prevState.yTranslateArray.map(function (item, index) {
              return index == this.props.currentPane ? deltaY : item;
            }, this),
            rotationArray: prevState.rotationArray.map(function (item, index) {
              return index == this.props.currentPane ? percent / 2 : item;
            }, this),
            likeOpacityArray: prevState.likeOpacityArray.map(function (item, index) {
              return index == this.props.currentPane ? {
                opacity: opa
              } : item;
            }, this),
            dislikeOpacityArray: prevState.dislikeOpacityArray.map(function (item, index) {
              return index == this.props.currentPane ? {
                opacity: 0
              } : item;
            }, this)
          };
        });
      } else if (deltaX < 0) {
        this.setState(prevState => {
          return {
            xTranslateArray: prevState.xTranslateArray.map(function (item, index) {
              return index == this.props.currentPane ? deltaX : item;
            }, this),
            yTranslateArray: prevState.yTranslateArray.map(function (item, index) {
              return index == this.props.currentPane ? deltaY : item;
            }, this),
            rotationArray: prevState.rotationArray.map(function (item, index) {
              return index == this.props.currentPane ? percent / 2 : item;
            }, this),
            likeOpacityArray: prevState.likeOpacityArray.map(function (item, index) {
              return index == this.props.currentPane ? {
                opacity: 0
              } : item;
            }, this),
            dislikeOpacityArray: prevState.dislikeOpacityArray.map(function (item, index) {
              return index == this.props.currentPane ? {
                opacity: opa
              } : item;
            }, this)
          };
        });
      }
    }
  }

  handleLike() {
    this.setState(prevState => {
      return {
        touchStart: false,
        xTranslateArray: prevState.xTranslateArray.map(function (item, index) {
          return index == this.props.currentPane ? Object(react_motion__WEBPACK_IMPORTED_MODULE_4__["spring"])(this.state.dimensions.width / 2, react_motion__WEBPACK_IMPORTED_MODULE_4__["presets"].wobbly) : item;
        }, this),
        yTranslateArray: prevState.yTranslateArray.map(function (item, index) {
          return index == this.props.currentPane ? 0 : item;
        }, this),
        rotationArray: prevState.rotationArray.map(function (item, index) {
          return index == this.props.currentPane ? 45 : item;
        }, this),
        likeOpacityArray: prevState.likeOpacityArray.map(function (item, index) {
          return index == this.props.currentPane ? {
            opacity: 1
          } : item;
        }, this),
        dislikeOpacityArray: prevState.dislikeOpacityArray.map(function (item, index) {
          return index == this.props.currentPane ? {
            opacity: 0
          } : item;
        }, this),
        motionRestCallbackArray: prevState.motionRestCallbackArray.map(function (item, index) {
          return index == this.props.currentPane ? () => {
            this.setPaneToInitialState();
            this.props.updatePaneStatusForLike();
          } : item;
        }, this)
      };
    });
  }

  handleDislike() {
    this.setState(prevState => {
      return {
        touchStart: false,
        xTranslateArray: prevState.xTranslateArray.map(function (item, index) {
          return index == this.props.currentPane ? Object(react_motion__WEBPACK_IMPORTED_MODULE_4__["spring"])(-(this.state.dimensions.width / 2), react_motion__WEBPACK_IMPORTED_MODULE_4__["presets"].wobbly) : item;
        }, this),
        yTranslateArray: prevState.yTranslateArray.map(function (item, index) {
          return index == this.props.currentPane ? 0 : item;
        }, this),
        rotationArray: prevState.rotationArray.map(function (item, index) {
          return index == this.props.currentPane ? -45 : item;
        }, this),
        likeOpacityArray: prevState.likeOpacityArray.map(function (item, index) {
          return index == this.props.currentPane ? {
            opacity: 0
          } : item;
        }, this),
        dislikeOpacityArray: prevState.dislikeOpacityArray.map(function (item, index) {
          return index == this.props.currentPane ? {
            opacity: 1
          } : item;
        }, this),
        motionRestCallbackArray: prevState.motionRestCallbackArray.map(function (item, index) {
          return index == this.props.currentPane ? () => {
            this.setPaneToInitialState();
            this.props.updatePaneStatusForDislike();
          } : item;
        }, this)
      };
    });
  }

  setPaneToInitialState() {
    this.setState(prevState => {
      return {
        xTranslateArray: prevState.xTranslateArray.map(function (item, index) {
          return index == this.props.currentPane ? 0 : item;
        }, this),
        yTranslateArray: prevState.yTranslateArray.map(function (item, index) {
          return index == this.props.currentPane ? 0 : item;
        }, this),
        rotationArray: prevState.rotationArray.map(function (item, index) {
          return index == this.props.currentPane ? 0 : item;
        }, this),
        likeOpacityArray: prevState.likeOpacityArray.map(function (item, index) {
          return index == this.props.currentPane ? {} : item;
        }, this),
        dislikeOpacityArray: prevState.dislikeOpacityArray.map(function (item, index) {
          return index == this.props.currentPane ? {} : item;
        }, this),
        motionRestCallbackArray: prevState.motionRestCallbackArray.map(function (item, index) {
          return index == this.props.currentPane ? () => {
            () => undefined;
          } : item;
        }, this)
      };
    });
  }

  render() {
    let panes = new Array(this.props.paneCount);

    for (var i = 0; i < this.props.paneCount; i++) {
      panes.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_JTinderPane_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
        key: i,
        paneNumber: i,
        xTranslateVal: this.state.xTranslateArray[i],
        yTranslateVal: this.state.yTranslateArray[i],
        rotationVal: this.state.rotationArray[i],
        likeOpacity: this.state.likeOpacityArray[i],
        dislikeOpacity: this.state.dislikeOpacityArray[i],
        likeStatus: this.props.likeStatusArray[i],
        motionRestCallback: this.state.motionRestCallbackArray[i],
        imageUrl: this.props.imageUrls != undefined ? this.props.imageUrls[i] : ""
      }));
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "wrap"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "slideOuter"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "Tinderslide",
      onMouseDown: this.mousedown.bind(this),
      onMouseMove: this.mousemove.bind(this),
      onMouseUp: this.mouseup.bind(this),
      onTouchStart: this.mousedown.bind(this),
      onTouchMove: this.mousemove.bind(this),
      onTouchEnd: this.mouseup.bind(this)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_measure__WEBPACK_IMPORTED_MODULE_3___default.a, {
      onMeasure: dimensions => {
        this.setState({
          dimensions
        });
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, panes))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_JTinderButtons_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      handleLike: this.handleLike.bind(this),
      handleDislike: this.handleDislike.bind(this),
      currentPane: this.props.currentPane
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (JTinderPaneWrapper);

/***/ }),

/***/ "./wwwroot/client/app/Components/JTinderWrapper.jsx":
/*!**********************************************************!*\
  !*** ./wwwroot/client/app/Components/JTinderWrapper.jsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _JTinderPaneWrapper_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JTinderPaneWrapper.jsx */ "./wwwroot/client/app/Components/JTinderPaneWrapper.jsx");
/* harmony import */ var _MatchModal_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MatchModal.jsx */ "./wwwroot/client/app/Components/MatchModal.jsx");
/* harmony import */ var _Services_paneImageService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Services/paneImageService */ "./wwwroot/client/app/Services/paneImageService.ts");





class JTinderWrapper extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor() {
    super();
    this.state = {
      imagesAreLoaded: false
    };
  }

  componentDidUpdate() {
    if (this.props.isSignedIn && this.state.imagesAreLoaded === false) {
      _Services_paneImageService__WEBPACK_IMPORTED_MODULE_3__["default"].getImagesOfCurrentUser().then(returnedImageUrls => {
        if (returnedImageUrls.length > 0) {
          this.initializingArray = [];

          for (let i = 0; i < this.paneCount; i++) {
            this.initializingArray.push(0);
          }

          this.paneCount = returnedImageUrls.length;
          this.setState({
            imageUrls: returnedImageUrls,
            currentPane: this.paneCount - 1,
            // likeStatusArray possible statuses: 0->neutral, -1->disliked, 1->liked
            likeStatusArray: this.initializingArray,
            imagesAreLoaded: true
          });
        } else {
          this.setState({
            imagesAreLoaded: true
          });
        }
      });
    }
  }

  updatePaneStatusForLike() {
    let paneNumberOfNewCurrentPane = this.getNumberOfNewCurrentPane();
    let newLikeStatusArray = this.getNewLikeStatusArray();
    this.setState(prevState => {
      return {
        currentPane: paneNumberOfNewCurrentPane,
        likeStatusArray: newLikeStatusArray,
        likeModalIsOpen: true
      };
    });
  }

  updatePaneStatusForDislike() {
    let paneNumberOfNewCurrentPane = this.getNumberOfNewCurrentPane();
    let newLikeStatusArray = this.getNewLikeStatusArray();
    this.setState(prevState => {
      return {
        currentPane: paneNumberOfNewCurrentPane,
        likeStatusArray: newLikeStatusArray
      };
    });
  }

  getNumberOfNewCurrentPane() {
    if (this.state.currentPane != 0) {
      return this.state.currentPane - 1;
    } else {
      return this.paneCount - 1; //Go back to the beginning
    }
  }

  getNewLikeStatusArray() {
    let currentPane = this.state.currentPane;

    if (currentPane != 0) {
      return this.state.likeStatusArray.map(function (item, index) {
        return index == currentPane ? -1 : item;
      });
    } else {
      return this.initializingArray;
    }
  }

  toggleModal(ev) {
    this.setState(prevState => {
      return {
        //likeModalIsOpen: !prevState.likeModalIsOpen 
        likeModalIsOpen: false
      };
    });
  }

  render() {
    if (this.props.isSignedIn) {
      if (this.state.imagesAreLoaded) {
        if (this.paneCount > 0) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "customStyle"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_JTinderPaneWrapper_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
            threshold: "1",
            paneCount: this.paneCount,
            currentPane: this.state.currentPane,
            likeStatusArray: this.state.likeStatusArray,
            updatePaneStatusForLike: this.updatePaneStatusForLike.bind(this),
            updatePaneStatusForDislike: this.updatePaneStatusForDislike.bind(this),
            imageUrls: this.state.imageUrls
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MatchModal_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
            show: this.state.likeModalIsOpen,
            onClose: this.toggleModal.bind(this),
            currentPane: this.state.currentPane + 1,
            imageUrl: this.state.imageUrls != undefined ? this.state.imageUrls[this.state.currentPane] : ""
          }));
        } else {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "You have no love options :("));
        }
      } else {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Profiles have not loaded yet (wannabe loading gif)"));
      }
    } else {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null);
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (JTinderWrapper);

/***/ }),

/***/ "./wwwroot/client/app/Components/Login.jsx":
/*!*************************************************!*\
  !*** ./wwwroot/client/app/Components/Login.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Services_firebaseInitialization__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Services/firebaseInitialization */ "./wwwroot/client/app/Services/firebaseInitialization.ts");
/* harmony import */ var react_firebaseui_StyledFirebaseAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-firebaseui/StyledFirebaseAuth */ "./node_modules/react-firebaseui/StyledFirebaseAuth.js");
/* harmony import */ var react_firebaseui_StyledFirebaseAuth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_firebaseui_StyledFirebaseAuth__WEBPACK_IMPORTED_MODULE_2__);



const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  signInOptions: [_Services_firebaseInitialization__WEBPACK_IMPORTED_MODULE_1__["default"].auth.EmailAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};

class Login extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor() {
    super();
  } // Listen to the Firebase Auth state and set the local state.


  componentDidMount() {
    this.unregisterAuthObserver = _Services_firebaseInitialization__WEBPACK_IMPORTED_MODULE_1__["default"].auth().onAuthStateChanged(user => {
      if (user !== undefined) {
        var newState = !!user;
        this.props.handleSignInChange(newState);
      }
    });
  } // Make sure we un-register Firebase observers when the component unmounts.


  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.props.isSignedIn) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
        style: loginStyle
      }, "Welcome To Jinder!"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_firebaseui_StyledFirebaseAuth__WEBPACK_IMPORTED_MODULE_2___default.a, {
        uiConfig: uiConfig,
        firebaseAuth: _Services_firebaseInitialization__WEBPACK_IMPORTED_MODULE_1__["default"].auth()
      }));
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Welcome ", _Services_firebaseInitialization__WEBPACK_IMPORTED_MODULE_1__["default"].auth().currentUser.displayName, "! You are now signed-in!"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      onClick: () => _Services_firebaseInitialization__WEBPACK_IMPORTED_MODULE_1__["default"].auth().signOut()
    }, "Sign-out"));
  }

}

var loginStyle = {
  'text-align': 'center'
};
Login.propTypes = {};
/* harmony default export */ __webpack_exports__["default"] = (Login);

/***/ }),

/***/ "./wwwroot/client/app/Components/MatchModal.jsx":
/*!******************************************************!*\
  !*** ./wwwroot/client/app/Components/MatchModal.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Services_paneImageService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Services/paneImageService */ "./wwwroot/client/app/Services/paneImageService.ts");



class MatchModal extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  stopEventPropagation(e) {
    e.stopPropagation();
  }

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    } // The gray background


    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50,
      zIndex: 3
    }; // The modal "window"

    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      width: '90%',
      minHeight: 300,
      margin: '0 auto',
      padding: 20,
      zIndex: 4
    };
    const imgCircle = {
      borderRadius: 50,
      height: '30vw',
      width: '45%',
      marginLeft: '2%',
      marginRight: '2%'
    };
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "backdrop",
      style: backdropStyle,
      onClick: this.props.onClose
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: modalStyle,
      onClick: this.stopEventPropagation.bind(this)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "footer"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      onClick: this.props.onClose,
      style: {
        fontWeight: "bold",
        cursor: "pointer",
        textAlign: 'right'
      }
    }, "X")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "It's a match!"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "You and John have liked each-other"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      className: "img-circle",
      src: "img/pane/matchFace.jpg",
      style: imgCircle
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      className: "img-circle",
      src: this.props.imageUrl ? this.props.imageUrl : "",
      style: imgCircle
    }))));
  }

}

MatchModal.propTypes = {
  onClose: react__WEBPACK_IMPORTED_MODULE_0___default.a.PropTypes.func.isRequired,
  show: react__WEBPACK_IMPORTED_MODULE_0___default.a.PropTypes.bool,
  imageUrl: react__WEBPACK_IMPORTED_MODULE_0___default.a.PropTypes.string
};
/* harmony default export */ __webpack_exports__["default"] = (MatchModal);

/***/ }),

/***/ "./wwwroot/client/app/Components/ProfileModal.jsx":
/*!********************************************************!*\
  !*** ./wwwroot/client/app/Components/ProfileModal.jsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


class ProfileModal extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  stopEventPropagation(e) {
    e.stopPropagation();
  }

  getProfileText() {
    let currentPane = this.props.currentPane;

    if (currentPane == 4) {
      return "Nothing on his baby face is particularly pretty, but somehow it all just works together";
    } else if (currentPane == 3) {
      return "He's smarter than two dumb guys!";
    } else if (currentPane == 2) {
      return "He hates how intimidated people get when they see his muscular biceps.";
    } else if (currentPane == 1) {
      return "He oozes class from every pore. No wonder his face is shiny";
    } else if (currentPane == 0) {
      return "Impossible to resist his unhinged joy!";
    } else {
      return "What a mystery man...";
    }
  }

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    } // The gray background


    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50,
      zIndex: 3
    }; // The modal "window"

    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      width: '90%',
      minHeight: 300,
      margin: '0 auto',
      padding: 20,
      zIndex: 4
    };
    const imgCircle = {
      borderRadius: 50,
      height: '30vw',
      width: '45%',
      marginLeft: '2%',
      marginRight: '2%'
    };
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "backdrop",
      style: backdropStyle,
      onClick: this.props.closeModal
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: modalStyle,
      onClick: this.stopEventPropagation.bind(this)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      onClick: this.props.closeModal,
      style: {
        fontWeight: "bold",
        cursor: "pointer",
        textAlign: 'right'
      }
    }, "X"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, this.getProfileText())));
  }

}

ProfileModal.propTypes = {
  closeModal: react__WEBPACK_IMPORTED_MODULE_0___default.a.PropTypes.func.isRequired,
  profileText: react__WEBPACK_IMPORTED_MODULE_0___default.a.PropTypes.string,
  show: react__WEBPACK_IMPORTED_MODULE_0___default.a.PropTypes.bool
};
/* harmony default export */ __webpack_exports__["default"] = (ProfileModal);

/***/ }),

/***/ "./wwwroot/client/app/Components/index.jsx":
/*!*************************************************!*\
  !*** ./wwwroot/client/app/Components/index.jsx ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _JTinderWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./JTinderWrapper.jsx */ "./wwwroot/client/app/Components/JTinderWrapper.jsx");
/* harmony import */ var _Login_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Login.jsx */ "./wwwroot/client/app/Components/Login.jsx");





class App extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor() {
    super();
    this.handleSignInChange = this.handleSignInChange.bind(this);
    this.state = {
      isSignedIn: false // Local signed-in state.

    };
  }

  handleSignInChange(newSignInState) {
    this.setState({
      isSignedIn: newSignInState
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Login_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      isSignedIn: this.state.isSignedIn,
      handleSignInChange: this.handleSignInChange
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_JTinderWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      isSignedIn: this.state.isSignedIn
    }));
  }

}

Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById('app'));

/***/ }),

/***/ "./wwwroot/client/app/Services/firebaseInitialization.ts":
/*!***************************************************************!*\
  !*** ./wwwroot/client/app/Services/firebaseInitialization.ts ***!
  \***************************************************************/
/*! exports provided: firestoreDB, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firestoreDB", function() { return firestoreDB; });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/storage */ "./node_modules/firebase/storage/dist/index.esm.js");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/index.esm.js");




// Initialize Firebase
const config = {
    apiKey: "AIzaSyDGkmGcCvF-zuTrfmHWKmeTy_wO0pRcG9c",
    authDomain: "jinder-157bf.firebaseapp.com",
    databaseURL: "https://jinder-157bf.firebaseio.com",
    projectId: "jinder-157bf",
    storageBucket: "jinder-157bf.appspot.com",
    messagingSenderId: "1020303948089"
};
firebase_app__WEBPACK_IMPORTED_MODULE_0__["initializeApp"](config);
let firestoreDB = firebase_app__WEBPACK_IMPORTED_MODULE_0__["firestore"]();
// Disable deprecated features
firestoreDB.settings({
    timestampsInSnapshots: true
});

/* harmony default export */ __webpack_exports__["default"] = (firebase_app__WEBPACK_IMPORTED_MODULE_0__);
// Good SO thread on the background on this file:
// https://stackoverflow.com/questions/53139432/importing-only-auth-package-from-firebase-module?noredirect=1&lq=1


/***/ }),

/***/ "./wwwroot/client/app/Services/paneImageService.ts":
/*!*********************************************************!*\
  !*** ./wwwroot/client/app/Services/paneImageService.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _firebaseInitialization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./firebaseInitialization */ "./wwwroot/client/app/Services/firebaseInitialization.ts");


const getPaneImageUrl = (paneNumber) => {
    // Points to the root reference
    let storageRef = _firebaseInitialization__WEBPACK_IMPORTED_MODULE_0__["default"].storage().ref();
    // Points to 'images'
    let paneImagesRef = storageRef.child('paneImages');
    // Points to 'images/space.jpg'
    // Note that you can use variables to create child values
    let fileName = 'pane0.jpg';
    let paneRef = paneImagesRef.child(fileName);
    let downloadURLPromise = paneRef.getDownloadURL();
    return downloadURLPromise;
};
const getImagesOfCurrentUser = () => {
    let imageUrls = new Array();
    let currentUserID = _firebaseInitialization__WEBPACK_IMPORTED_MODULE_0__["default"].auth().currentUser.uid;
    let jinderImagesRef = _firebaseInitialization__WEBPACK_IMPORTED_MODULE_0__["firestoreDB"].collection("JinderImages");
    let userImagesQuery = jinderImagesRef.where("UserID", "==", currentUserID);
    return new Promise((resolve, reject) => {
        userImagesQuery.get()
            .then((querySnapshop) => {
            querySnapshop.forEach((doc) => {
                imageUrls.push(doc.data().ImageUrl);
            });
            return resolve(imageUrls);
        })
            .catch((error) => {
            console.log("Error getting documents: ", error);
            return reject("Error getting documents: " + error);
        });
    });
};
const paneImageService = {
    getPaneImageUrl,
    getImagesOfCurrentUser
};
/* harmony default export */ __webpack_exports__["default"] = (paneImageService);


/***/ })

/******/ });
//# sourceMappingURL=main.js.map