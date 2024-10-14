"use strict";
'use client';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Chatbot = function Chatbot() {
  var _useState = (0, _react.useState)([{
      id: 1,
      type: "assistant",
      text: "How can I help you today?"
    }]),
    _useState2 = _slicedToArray(_useState, 2),
    messages = _useState2[0],
    setMessages = _useState2[1];
  var _useState3 = (0, _react.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    input = _useState4[0],
    setInput = _useState4[1];

  // Handle message submission
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return; // Avoid empty submissions

    // Add user's message to the chat
    var userMessage = {
      id: messages.length + 1,
      type: "user",
      text: input
    };
    setMessages([].concat(_toConsumableArray(messages), [userMessage]));

    // Simulate AI response (this could be replaced by an actual AI call)
    setTimeout(function () {
      var aiResponse = generateAIResponse(input);
      setMessages(function (prevMessages) {
        return [].concat(_toConsumableArray(prevMessages), [aiResponse]);
      });
    }, 1000);
    setInput(""); // Clear the input field
  };

  // Simulate AI response logic (for now, just basic responses)
  var generateAIResponse = function generateAIResponse(inputText) {
    if (inputText.toLowerCase().includes("javascript")) {
      return {
        id: messages.length + 2,
        type: "assistant",
        text: "You can add JavaScript to HTML in two ways:",
        code: "\n          // Inline JavaScript\n          <script>\n            console.log(\"Hello World\");\n          </script>\n          \n          // External JavaScript\n          <script src=\"script.js\"></script>\n        "
      };
    } else {
      return {
        id: messages.length + 2,
        type: "assistant",
        text: "Sorry, I don't know how to respond to \"".concat(inputText, "\".")
      };
    }
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-full max-w-md space-y-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white p-4 rounded-lg shadow-md h-96 overflow-y-auto"
  }, messages.map(function (message) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: message.id,
      className: "flex items-start space-x-2 ".concat(message.type === "user" ? "justify-end" : "")
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800", " p-3 rounded-lg max-w-xs")
    }, /*#__PURE__*/_react["default"].createElement("p", null, message.text), message.code && /*#__PURE__*/_react["default"].createElement("pre", {
      className: "mt-2 bg-gray-900 text-white p-2 rounded"
    }, message.code)));
  })), /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: handleSubmit,
    className: "flex space-x-2"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: input,
    onChange: function onChange(e) {
      return setInput(e.target.value);
    },
    placeholder: "Type your message...",
    className: "w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
  }), /*#__PURE__*/_react["default"].createElement("button", {
    type: "submit",
    className: "bg-blue-600 text-white px-4 py-2 rounded-lg"
  }, "Send"))));
};
var _default = exports["default"] = Chatbot;