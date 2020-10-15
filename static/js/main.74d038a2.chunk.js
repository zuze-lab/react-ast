(this["webpackJsonp@zuze/react-ast-example"]=this["webpackJsonp@zuze/react-ast-example"]||[]).push([[5],{198:function(e){e.exports=JSON.parse('{"__ROUTE_HOME":"/","__ROUTE_GETTING_STARTED":"/getting-started","__ROUTE_SIMPLE_TREE":"/rendering-a-simple-tree","__ROUTE_RESOLVERS":"/resolvers","__ROUTE_RENDERERS":"/renderers","__GITHUB_LINK":"https://github.com/zuze-lab/react-ast","__ACTIVE_LINK_COLOR":"rgba(0,0,0,0.2)","SUSPENSE":{"component":"Suspense","module":"react","props":{"fallback":{"$ref":{"module":"react","component":"Fragment"}}}},"MAIN":{"component":"Fragment","module":"react","children":[{"$ref":"SUSPENSE","children":[{"$ref":{"component":"BrowserRouter","module":"router","props":{"basename":"{{$BASE_PATH}}"},"children":[{"$ref":"PAGE"}]}}]}]},"BODY_ROUTES":{"component":"Switch","module":"router","children":[{"$ref":{"component":"Route","module":"router","props":{"exact":true,"path":"{{__ROUTE_HOME}}"},"children":[{"$ref":"ROUTE_HOME","props":{"key":"fred"}}]}},{"$ref":{"component":"Route","module":"router","props":{"exact":true,"path":"{{__ROUTE_GETTING_STARTED}}"},"children":[{"$ref":"ROUTE_GETTING_STARTED"}]}},{"$ref":{"component":"Route","module":"router","props":{"exact":true,"path":"{{__ROUTE_SIMPLE_TREE}}"},"children":[{"$ref":"ROUTE_SIMPLE_TREE"}]}},{"$ref":{"component":"Route","module":"router","props":{"exact":true,"path":"{{__ROUTE_RESOLVERS}}"},"children":[{"$ref":"ROUTE_RESOLVERS"}]}},{"$ref":{"component":"Route","module":"router","props":{"exact":true,"path":"{{__ROUTE_RENDERERS}}"},"children":[{"$ref":"ROUTE_RENDERERS"}]}},{"$ref":{"module":"router","component":"Redirect","props":{"to":"{{__ROUTE_HOME}}"}}}]},"ROUTE_HOME":{"module":"home","component":"Home"},"ROUTE_GETTING_STARTED":{"module":"getting-started","component":"default"},"ROUTE_SIMPLE_TREE":{"component":"span","children":["Simple Tree"]},"ROUTE_RESOLVERS":{"component":"span","children":["Resolvers"]},"ROUTE_RENDERERS":{"component":"span","children":["Renderers"]},"PAGE":{"component":"div","styles":{"root":{"display":"flex","minHeight":"100vh"}},"children":[{"$ref":{"component":"CssBaseline","module":"mui"}},{"$ref":"APPBAR"},{"$ref":"DRAWER"},{"$ref":"BODY"}]},"BODY":{"component":"div","children":[{"$ref":{"module":"mui","component":"Toolbar"}},{"$ref":"SUSPENSE","children":[{"$ref":{"component":"div","children":[{"$ref":"BODY_ROUTES"}],"props":{"style":{"height":"100vh","padding":20}}}}]}],"styles":{"root":{"flex":1}}},"APPBAR":{"component":"AppBar","module":"mui","props":{"position":"fixed"},"styles":{"root":{"zIndex":1000}},"children":[{"$ref":"HEADER_TOOLBAR"}]},"HEADER_TOOLBAR":{"component":"Toolbar","module":"mui","styles":{"root":{"display":"flex","alignItems":"stretch","justifyContent":"space-between"}},"children":[{"$ref":"TITLE"},{"$ref":"HEADER_LINKS"}]},"TITLE":{"component":"div","styles":{"root":{"display":"flex"}},"children":[{"$ref":{"component":"Link","module":"router","props":{"to":"{{__ROUTE_HOME}}"},"styles":{"root":{"color":"inherit","textDecoration":"none","display":"flex","alignItems":"center"}}},"children":[{"$ref":{"component":"div","styles":{"root":{"display":"flex"}},"children":[{"$ref":{"component":"span","styles":{"root":{"display":"block","paddingRight":"1rem"}},"children":["@zuze/react-ast"]}},{"$ref":{"module":"common","component":"Logo","styles":{"root":{"color":"white"}}}}]}}]}]},"HEADER_LINKS":{"component":"div","styles":{"root":{"alignSelf":"center"}},"children":[{"$ref":{"component":"IconButton","module":"mui","props":{"href":"{{__GITHUB_LINK}}","target":"_blank"},"children":[{"$ref":{"module":"icons","component":"GitHub","styles":{"root":{"color":"white"}}}}]}}]},"DRAWER":{"component":"Drawer","module":"mui","props":{"variant":"permanent"},"children":[{"$ref":{"module":"mui","component":"Toolbar"}},{"$ref":"NAV"}],"styles":{"root":{"zIndex":1,"width":"240px"},"paper":{"width":"240px"}}},"NAVLISTITEM":{"component":"ListItem","module":"mui","props":{"button":true},"styles":{"root":{"paddingLeft":"2rem"}}},"NAVLINK":{"component":"NavLink","module":"router","props":{"activeStyle":{"background":"{{__ACTIVE_LINK_COLOR}}"}},"styles":{"root":{"display":"block","textDecoration":"none","color":"inherit"}}},"NAVLISTHEADER":{"component":"ListSubheader","module":"mui"},"NAV":{"component":"List","module":"mui","children":[{"$ref":"NAVLISTHEADER","children":["@zuze/react-ast"]},{"$ref":"NAVLINK","props":{"to":"{{__ROUTE_GETTING_STARTED}}"},"children":[{"$ref":"NAVLISTITEM","children":["Getting Started"]}]},{"$ref":"NAVLINK","props":{"to":"{{__ROUTE_SIMPLE_TREE}}"},"children":[{"$ref":"NAVLISTITEM","children":["Rendering a Simple Tree"]}]},{"$ref":"NAVLINK","props":{"to":"{{__ROUTE_RESOLVERS}}"},"children":[{"$ref":"NAVLISTITEM","children":["Resolvers"]}]},{"$ref":"NAVLINK","props":{"to":"{{__ROUTE_RENDERERS}}"},"children":[{"$ref":"NAVLISTITEM","children":["Renderers"]}]},{"$ref":"NAVLISTHEADER","children":["Guides"]},{"$ref":"NAVLISTITEM","children":["Code Splitting"]},{"$ref":"NAVLISTITEM","children":["Material UI Styles"]},{"$ref":"NAVLISTITEM","children":["Conditional"]},{"$ref":"NAVLISTHEADER","children":["API Reference"]},{"$ref":"NAVLISTITEM","children":["<ReactAST/>"]},{"$ref":"NAVLISTITEM","children":["Utilities"]}]}}')},214:function(e,r,t){e.exports=t(225)},223:function(e,r,t){var n={"./a-test-module":[204,3],"./a-test-module.js":[204,3],"./common":[208,4],"./common.js":[208,4],"./getting-started":[205,1],"./getting-started.js":[205,1],"./home":[206,2],"./home.js":[206,2],"./icons":[207,0],"./icons.js":[207,0]};function o(e){if(!t.o(n,e))return Promise.resolve().then((function(){var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}));var r=n[e],o=r[0];return t.e(r[1]).then((function(){return t(o)}))}o.keys=function(){return Object.keys(n)},o.id=223,e.exports=o},225:function(e,r,t){"use strict";t.r(r);var n=t(0),o=t.n(n),a=t(12),c=t.n(a),s=t(72),l=t(74),i=t(198),p=()=>o.a.createElement(o.a.Fragment,null,o.a.createElement(s.b,{resolver:l.c,ast:i,context:l.b},l.a));c.a.render(o.a.createElement(p,null),document.getElementById("root"))},72:function(e,r,t){"use strict";t.d(r,"a",(function(){return p}));var n=t(20),o=t(83),a=t(39),c=t.n(a),s=t(61),l=t(0),i=e=>e.join("//"),p=e=>r=>Object(l.lazy)(Object(s.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e(r);case 2:return t.t0=t.sent,t.abrupt("return",{default:t.t0});case 4:case"end":return t.stop()}}),t)})))),u=(e,...r)=>r.reduce((e,r)=>{var t=r.props,a=Object(o.a)(r,["props"]);return Object(n.a)(Object(n.a)(Object(n.a)({},e),a),{},{props:Object(n.a)(Object(n.a)({},e.props),t||{})})},e),d=(e,r,t,o=[])=>{return r(e)?t(e,o):(a=e)&&"function"!==typeof a&&"number"!==typeof a&&"boolean"!==typeof a&&"string"!==typeof a?Array.isArray(e)?e.map((e,n)=>d(e,r,t,[...o,n])):Object.entries(e).reduce((e,[a,c])=>Object(n.a)(Object(n.a)({},e),{},{[d(a,r,t,o)]:d(c,r,t,[...o,a])}),{}):e;var a},m={},E=(e,r,t)=>{var n=f(r).reduce((e,r)=>e?e[r]:e,e);return void 0===n?t:n},f=e=>e.match(T).map(e=>e.replace(R,"$2")),T=/[^.^\]^[]+|(?=\[\]|\.\.)/g,R=/^\s*(['"]?)(.*?)(\1)\s*$/,h=(e,r,t,o,a,c,s)=>{var l=((e,r,t,n,o)=>(a,c)=>d(a,r=>e.test(r),(a,c)=>o(a.replace(e,(...e)=>{var o=e[1],a=o[0]===n?r:t,s=E(a,a===r?o.substr(1):o);if(void 0===s)throw new Error("Could not perform interpolation of ".concat(e[0]," at path ").concat(i(c)));return s})),c))(c,t,a,o,(...n)=>h(e,r,t,o,a,c,s)(...n)),p=((e,r,t,o)=>(a,c)=>d(a,e=>e&&e[r],(a,c)=>{var s=Object.entries(a).reduce((e,[t,o])=>{var a=t===r;return{ref:a?o:e.ref,rest:a?e.rest:Object(n.a)(Object(n.a)({},e.rest),{},{[t]:o})}},{}),l=s.ref,p=s.rest,u=void 0===p?{}:p,d="string"===typeof l,m=d?E(o,l):l,f=[...c,d?l:r];if(!m)throw new Error("Unable to resolve ref at path ".concat(i(f)));return e(t(m,u),f)},c))(e,r,s,a);return(e,r)=>p(l(e,r),r)},_=Object(l.memo)(({ast:e,root:r="MAIN",render:t,children:o=(({render:e})=>e()),Component:a,resolver:c,cacheKey:s="component",refKey:p="$ref",merge:d=u,interpolate:E=/\{\{(.+?)\}\}/g,context:f={},contextKey:T="$"})=>{var R=h((...e)=>_(...e),p,f,T,e,E,d),_=(e,p=[r])=>{var u=i(p);if(!e)throw new Error("Failed to resolved component found at path ".concat(u));var d={descriptor:e,key:u,render:(r={},t=e)=>{var o=R(Object(n.a)(Object(n.a)({},t),{},{props:Object(n.a)(Object(n.a)({key:u,children:t.children},t.props),r),key:u}));return Object(l.createElement)(((e,r,t,n)=>{var o=r[t]||n;return m[o]||(m[o]=e(r))})(c,o,s,u),o.props)}};return a?Object(l.createElement)(a,d):(t||o)(d)};return _(e[r])});r.b=_},74:function(e,r,t){"use strict";t.d(r,"c",(function(){return $})),t.d(r,"a",(function(){return v})),t.d(r,"b",(function(){return L}));var n=t(83),o=t(39),a=t.n(o),c=t(61),s=t(84),l=t(199),i=t(0),p=t.n(i),u=t(72),d=t(195),m=t(20),E=t(114),f=({children:e,language:r})=>p.a.createElement(E.a,Object.assign({},E.b,{code:e.trim(),language:r}),({className:e,style:r,tokens:t,getLineProps:n,getTokenProps:o})=>p.a.createElement("pre",{className:e,style:Object(m.a)(Object(m.a)({},r),{},{margin:0,padding:"20px",borderRadius:10,fontSize:16})},t.map((e,r)=>p.a.createElement("div",Object.assign({key:r},n({line:e,key:r})),e.map((e,r)=>p.a.createElement("span",Object.assign({key:r},o({token:e,key:r})))))))),T=t(200),R=t(243),h=t(241),_=t(115),O=t(242),b=({tabs:e,children:r,classes:t={}})=>{var n=Object(i.useState)(e[0]),o=Object(T.a)(n,2),a=o[0],c=o[1];return p.a.createElement("div",{className:t.root},p.a.createElement(_.a,{value:a},p.a.createElement(R.a,{value:a,onChange:(e,r)=>c(r)},e.map((e,r)=>p.a.createElement(h.a,{className:t.tab,key:r,label:e,value:e}))),e.map((e,n)=>p.a.createElement(O.a,{key:e,value:e,className:t.panel},r[n]))))},S=t(194),I=e=>e,A=({hooks:e=[],render:r,children:t,Component:n})=>(n?e=>Object(i.createElement)(n,e):r||t)((e=>e.reduce((e,{use:r,process:t=I})=>Object(m.a)(Object(m.a)({},e),t(r(e))),{}))(e)),N=({render:e,styles:r})=>p.a.createElement(A,{render:e,hooks:[{use:Object(S.a)(r),process:e=>({className:e.root,classes:e})}]}),y=Object(u.a)(function(){var e=Object(c.a)(a.a.mark((function e({module:r,component:n}){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t(223)("./".concat(r));case 2:return e.t0=n,e.abrupt("return",e.sent[e.t0]);case 4:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}()),$=({module:e,component:r})=>{if("Code"===r)return f;if("Tabs"===r)return b;if("Interweave"===r)return d.a;switch(e){case void 0:return r;case"react":return p.a[r];case"mui":return s[r];case"router":return l[r];default:return y({module:e,component:r})}},v=e=>{var r=e.render,t=e.descriptor,o=Object(n.a)(e,["render","descriptor"]);return t.styles?p.a.createElement(N,Object.assign({},o,{render:r,styles:t.styles})):r()},L={BASE_PATH:"/react-ast/"}}},[[214,6,7]]]);
//# sourceMappingURL=main.74d038a2.chunk.js.map