/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************************!*\
  !*** ./resources/js/pages/pages/pages-index.js ***!
  \*************************************************/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PagesIndex = /*#__PURE__*/function () {
  function PagesIndex() {
    _classCallCheck(this, PagesIndex);

    this.init();
  }

  _createClass(PagesIndex, [{
    key: "init",
    value: function init() {
      var element = $('[data-message]');

      if (element.length) {
        var type = element.data('type');
        var message = element.data('message');
        window.postMessage({
          detail: {
            type: type,
            message: message
          }
        });
      }
    }
  }]);

  return PagesIndex;
}();

new PagesIndex();
/******/ })()
;