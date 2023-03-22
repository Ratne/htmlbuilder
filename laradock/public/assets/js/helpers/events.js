/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!****************************************!*\
  !*** ./resources/js/helpers/events.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Events; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Events = /*#__PURE__*/function () {
  function Events() {
    _classCallCheck(this, Events);

    this.init();
  }

  _createClass(Events, [{
    key: "init",
    value: function init() {
      var _this = this;

      window.addEventListener("DOMContentLoaded", function () {
        _this.emitInitToLivewireComponents();
      });
      this.modalsEvent();
      this.htmlEvent();
      this.toastEvent();
      this.tabEvent();
      this.submitFormEvent();
      this.templateSelectorEvent();
    }
  }, {
    key: "toastEvent",
    value: function toastEvent() {
      var fun = function fun(e) {
        if (!e.detail && !e.data.detail) return;

        if (e.data && e.data.detail) {
          e.detail = e.data.detail;
        }

        toastr[e.detail.type](e.detail.message);
      };

      window.addEventListener('message', fun);
      window.addEventListener('toast', fun);
    }
  }, {
    key: "emitInitToLivewireComponents",
    value: function emitInitToLivewireComponents() {
      $('.emit-init').each(function () {
        var emit_name = $(this).data('emit-name');
        var emit_data = $(this).data('emit-data');
        var emit_data_object = $(this).data('emit-object');
        Livewire.emit(emit_name, emit_data_object ? JSON.parse(emit_data) : emit_data);
      });
    }
  }, {
    key: "modalsEvent",
    value: function modalsEvent() {
      window.addEventListener('openModal', function (e) {
        $(e.detail["class"]).modal('show');
      });
      window.addEventListener('closeModal', function (e) {
        $(e.detail["class"]).modal('hide');
      });
    }
  }, {
    key: "htmlEvent",
    value: function htmlEvent() {
      window.addEventListener('html', function (e) {
        Livewire.emit('onHtml', ['<style type="text/css">', window.builder.editor.getCss(), '</style>', window.builder.editor.getHtml()].join(''));
      });
    }
  }, {
    key: "tabEvent",
    value: function tabEvent() {
      window.addEventListener('openNewTab', function (e) {
        var win = window.open(e.detail.url, '_blank');
        win.focus();
      });
    }
  }, {
    key: "submitFormEvent",
    value: function submitFormEvent() {
      window.addEventListener('submitForm', function (e) {
        $(e.detail.id).submit();
      });
    }
  }, {
    key: "templateSelectorEvent",
    value: function templateSelectorEvent() {
      window.addEventListener('template-selected', function (e) {
        window.builder.editor.setComponents(window.builder.editor.getHtml() + e.detail.template);
      });
    }
  }]);

  return Events;
}();


new Events();
/******/ })()
;