(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{12:function(e,t,n){},36:function(e,t,n){},60:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n(0),a=n.n(r),s=n(28),o=n.n(s),i=(n(36),n(12),n(11)),u={color:"black"};var j,h=function(){return Object(c.jsxs)("nav",{children:[Object(c.jsx)("h3",{children:"Logo"}),Object(c.jsxs)("ul",{className:"Nav-Links",children:[Object(c.jsx)(i.b,{style:u,to:"/",children:Object(c.jsx)("li",{children:"Home"})}),Object(c.jsx)(i.b,{style:u,to:"/createEvent",children:Object(c.jsx)("li",{children:"Search"})})]})]})},l=n(9),b=n.n(l),p=n(13),d=n(18),x=n(30),O=n.n(x);function f(e){return v.apply(this,arguments)}function v(){return(v=Object(p.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.post("".concat(j,"/createEvent"),t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}j="localhost"===window.location.host?"http://localhost:5000":"";var m=function(){var e=Object(r.useState)(""),t=Object(d.a)(e,2),n=t[0],a=t[1],s=Object(r.useState)(""),o=Object(d.a)(s,2),i=o[0],u=o[1],j=function(){var e=Object(p.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(n),t={searchQuery:n},e.next=4,f(t).then((function(e){u(e),console.log(i)}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.jsxs)("div",{children:[Object(c.jsx)("input",{type:"text",className:"input",onChange:function(e){a(e.target.value)},placeholder:"Search..."}),Object(c.jsx)("button",{onClick:j,type:"submit",id:"myInput",children:"Submit"}),Object(c.jsx)("div",{children:i.searchQuery&&i.searchQuery.map((function(e){return Object(c.jsxs)("h1",{children:[" ",e," "]},e)}))})]})};var g=function(){return Object(c.jsx)("h3",{children:"Home Page"})},y=n(2);var w=function(){return Object(c.jsx)(i.a,{children:Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)(h,{}),Object(c.jsxs)(y.c,{children:[Object(c.jsx)(y.a,{path:"/",exact:!0,component:g}),Object(c.jsx)(y.a,{path:"/createEvent",component:m})]})]})})},k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,61)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),c(e),r(e),a(e),s(e)}))};o.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(w,{})}),document.getElementById("root")),k()}},[[60,1,2]]]);
//# sourceMappingURL=main.b371c308.chunk.js.map