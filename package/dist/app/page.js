"use strict";
"use client";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Home;
var _Chatbot = _interopRequireDefault(require("./components/Chatbot"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function Home() {
  return /*#__PURE__*/React.createElement("div", {
    className: "h-[100vh] overflow-hidden"
  }, /*#__PURE__*/React.createElement(_Chatbot["default"], null));
}