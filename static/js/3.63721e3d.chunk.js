(this["webpackJsonp@zuze/react-ast-example"]=this["webpackJsonp@zuze/react-ast-example"]||[]).push([[3],{206:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(72),p=n(111),s={CODE:{component:"Code"},FRAGMENT:{component:"Fragment",module:"react"},TITLE_CMP:{component:"Typography",module:"mui",props:{variant:"h3"},styles:{root:{marginBottom:20}}},MAIN:{component:"div",styles:{root:{paddingBottom:50}},children:[{$ref:"INSTALLATION"},{$ref:"USAGE"}]},USAGE:{component:"div",children:[{$ref:"TITLE_CMP",children:["Usage"]},{$ref:"CODE",props:{language:"js",children:"\nimport React from 'react';\nimport ReactAST from '@zuze/react-ast'\n\nconst myAst = {\n    MAIN: {\n        component:'div',\n        props: {\n            title: 'I\\'m a title attribute'\n        },\n        children: ['Hello World']\n    }\n}\n\nconst App = () => <ReactAST ast={myAst}/>\n"}}]},INSTALLATION:{component:"div",children:[{$ref:"TITLE_CMP",children:["Installation"]},{$ref:"SUBTITLE"},{$ref:"INSTALL"},{$ref:"INSTALL_NOTE"}]},SUBTITLE:{component:"Typography",module:"mui",props:{variant:"body1"},styles:{root:{marginBottom:20,display:"block"}},children:["@zuze/react-ast is available as an ",{$ref:{component:"Link",module:"mui",props:{color:"primary",href:"https://npmjs.org"},children:["NPM package"]}}]},INSTALL:{component:"Tabs",styles:{root:{marginBottom:20},panel:{padding:0,paddingTop:20}},props:{tabs:["yarn","npm"]},children:[{$ref:"CODE",props:{language:"bash"},children:"yarn add @zuze/react-ast"},{$ref:"CODE",props:{language:"bash"},children:"npm install @zuze/react-ast"}]},INSTALL_NOTE:{component:"Typography",module:"mui",props:{variant:"body1"},styles:{root:{marginBottom:20,display:"block"}},children:[{$ref:{component:"Interweave",props:{content:'@zuze/react-ast supports <a href="https://www.npmjs.com/package/react">react</a> >= 16.6.0 (the one with lazy and memo) is required'}}}]}};t.default=()=>a.a.createElement(r.b,{resolver:p.b,ast:s},p.a)}}]);
//# sourceMappingURL=3.63721e3d.chunk.js.map