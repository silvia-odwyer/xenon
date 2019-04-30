webpackJsonp([40],{

/***/ 710:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(763);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(697)("f7f39938", content, true);

/***/ }),

/***/ 763:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(696)(true);
// imports


// module
exports.push([module.i, ".cm-s-duotone-light.CodeMirror{background:#faf8f5;color:#b29762}.cm-s-duotone-light div.CodeMirror-selected{background:#e3dcce!important}.cm-s-duotone-light .CodeMirror-gutters{background:#faf8f5;border-right:0}.cm-s-duotone-light .CodeMirror-linenumber{color:#cdc4b1}.cm-s-duotone-light .CodeMirror-cursor{border-left:1px solid #93abdc;border-right:.5em solid #93abdc;opacity:.5}.cm-s-duotone-light .CodeMirror-activeline-background{background:#e3dcce;opacity:.5}.cm-s-duotone-light .cm-fat-cursor .CodeMirror-cursor{background:#93abdc;opacity:.5}.cm-s-duotone-light-light span.cm-hr,.cm-s-duotone-light-light span.cm-link,.cm-s-duotone-light span.cm-atom,.cm-s-duotone-light span.cm-attribute,.cm-s-duotone-light span.cm-keyword,.cm-s-duotone-light span.cm-number,.cm-s-duotone-light span.cm-quote,.cm-s-duotone-light span.cm-variable{color:#063289}.cm-s-duotone-light span.cm-property{color:#b29762}.cm-s-duotone-light span.cm-negative,.cm-s-duotone-light span.cm-punctuation,.cm-s-duotone-light span.cm-unit{color:#063289}.cm-s-duotone-light span.cm-operator,.cm-s-duotone-light span.cm-string{color:#1659df}.cm-s-duotone-light span.cm-positive,.cm-s-duotone-light span.cm-string-2,.cm-s-duotone-light span.cm-type,.cm-s-duotone-light span.cm-url,.cm-s-duotone-light span.cm-variable-2,.cm-s-duotone-light span.cm-variable-3{color:#896724}.cm-s-duotone-light span.cm-builtin,.cm-s-duotone-light span.cm-def,.cm-s-duotone-light span.cm-em,.cm-s-duotone-light span.cm-header,.cm-s-duotone-light span.cm-qualifier,.cm-s-duotone-light span.cm-tag{color:#2d2006}.cm-s-duotone-light span.cm-bracket,.cm-s-duotone-light span.cm-comment{color:#b6ad9a}.cm-s-duotone-light span.cm-error,.cm-s-duotone-light span.cm-invalidchar{color:red}.cm-s-duotone-light span.cm-header{font-weight:400}.cm-s-duotone-light .CodeMirror-matchingbracket{text-decoration:underline;color:#faf8f5!important}", "", {"version":3,"sources":["C:/Users/silvi/Desktop/blockstack/markdown-editor/node_modules/codemirror/theme/duotone-light.css"],"names":[],"mappings":"AAOA,+BAAiC,mBAAoB,AAAC,aAAe,CAAE,AACvE,4CAA8C,4BAA+B,CAAE,AAC/E,wCAA0C,mBAAoB,AAAC,cAAkB,CAAE,AACnF,2CAA6C,aAAe,CAAE,AAG9D,uCAAyC,8BAA+B,AAAyC,gCAAiC,AAA2C,UAAY,CAAE,AAC3M,sDAAwD,mBAAoB,AAA+B,UAAY,CAAE,AACzH,sDAAwD,mBAAoB,AAAkB,UAAY,CAAE,AAG5G,iSAA0S,aAAe,CAAE,AAE3T,qCAAuC,aAAe,CAAE,AACxD,8GAAkH,aAAe,CAAE,AACnI,wEAA2E,aAAe,CAAE,AAG5F,yNAA0L,aAAe,CAAE,AAC3M,4MAAmN,aAAe,CAAE,AACpO,wEAA2E,aAAe,CAAE,AAI5F,0EAA6E,SAAY,CAAE,AAE3F,mCAAqC,eAAoB,CAAE,AAC3D,gDAAkD,0BAA2B,AAAC,uBAA0B,CAAE","file":"duotone-light.css","sourcesContent":["/*\nName:   DuoTone-Light\nAuthor: by Bram de Haan, adapted from DuoTone themes by Simurai (http://simurai.com/projects/2016/01/01/duotone-themes)\n\nCodeMirror template by Jan T. Sott (https://github.com/idleberg), adapted by Bram de Haan (https://github.com/atelierbram/)\n*/\n\n.cm-s-duotone-light.CodeMirror { background: #faf8f5; color: #b29762; }\n.cm-s-duotone-light div.CodeMirror-selected { background: #e3dcce !important; }\n.cm-s-duotone-light .CodeMirror-gutters { background: #faf8f5; border-right: 0px; }\n.cm-s-duotone-light .CodeMirror-linenumber { color: #cdc4b1; }\n\n/* begin cursor */\n.cm-s-duotone-light .CodeMirror-cursor { border-left: 1px solid #93abdc; /* border-left: 1px solid #93abdc80; */ border-right: .5em solid #93abdc; /* border-right: .5em solid #93abdc80; */ opacity: .5; }\n.cm-s-duotone-light .CodeMirror-activeline-background { background: #e3dcce;  /* background: #e3dcce80; */ opacity: .5; }\n.cm-s-duotone-light .cm-fat-cursor .CodeMirror-cursor { background: #93abdc; /* #93abdc80; */ opacity: .5; }\n/* end cursor */\n\n.cm-s-duotone-light span.cm-atom, .cm-s-duotone-light span.cm-number, .cm-s-duotone-light span.cm-keyword, .cm-s-duotone-light span.cm-variable, .cm-s-duotone-light span.cm-attribute, .cm-s-duotone-light span.cm-quote, .cm-s-duotone-light-light span.cm-hr, .cm-s-duotone-light-light span.cm-link { color: #063289; }\n\n.cm-s-duotone-light span.cm-property { color: #b29762; }\n.cm-s-duotone-light span.cm-punctuation, .cm-s-duotone-light span.cm-unit, .cm-s-duotone-light span.cm-negative { color: #063289; }\n.cm-s-duotone-light span.cm-string, .cm-s-duotone-light span.cm-operator { color: #1659df; }\n.cm-s-duotone-light span.cm-positive { color: #896724; }\n\n.cm-s-duotone-light span.cm-variable-2, .cm-s-duotone-light span.cm-variable-3, .cm-s-duotone-light span.cm-type, .cm-s-duotone-light span.cm-string-2, .cm-s-duotone-light span.cm-url { color: #896724; }\n.cm-s-duotone-light span.cm-def, .cm-s-duotone-light span.cm-tag, .cm-s-duotone-light span.cm-builtin, .cm-s-duotone-light span.cm-qualifier, .cm-s-duotone-light span.cm-header, .cm-s-duotone-light span.cm-em { color: #2d2006; }\n.cm-s-duotone-light span.cm-bracket, .cm-s-duotone-light span.cm-comment { color: #b6ad9a; }\n\n/* using #f00 red for errors, don't think any of the colorscheme variables will stand out enough, ... maybe by giving it a background-color ... */\n/* .cm-s-duotone-light span.cm-error { background: #896724; color: #728fcb; } */\n.cm-s-duotone-light span.cm-error, .cm-s-duotone-light span.cm-invalidchar { color: #f00; }\n\n.cm-s-duotone-light span.cm-header { font-weight: normal; }\n.cm-s-duotone-light .CodeMirror-matchingbracket { text-decoration: underline; color: #faf8f5 !important; }\n\n"],"sourceRoot":""}]);

// exports


/***/ })

});
//# sourceMappingURL=40.8e6bfd273feb3cbcfdc8.js.map