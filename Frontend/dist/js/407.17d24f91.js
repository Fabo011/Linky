(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[407],{8134:function(t,e,n){n(7658),
/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
function(e,n){t.exports=n()}(0,(function(){return function(){var t={686:function(t,e,n){"use strict";n.d(e,{default:function(){return M}});var r=n(279),o=n.n(r),i=n(370),a=n.n(i),c=n(817),u=n.n(c);function l(t){try{return document.execCommand(t)}catch(e){return!1}}var s=function(t){var e=u()(t);return l("cut"),e},f=s;function d(t){var e="rtl"===document.documentElement.getAttribute("dir"),n=document.createElement("textarea");n.style.fontSize="12pt",n.style.border="0",n.style.padding="0",n.style.margin="0",n.style.position="absolute",n.style[e?"right":"left"]="-9999px";var r=window.pageYOffset||document.documentElement.scrollTop;return n.style.top="".concat(r,"px"),n.setAttribute("readonly",""),n.value=t,n}var h=function(t,e){var n=d(t);e.container.appendChild(n);var r=u()(n);return l("copy"),n.remove(),r},p=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{container:document.body},n="";return"string"===typeof t?n=h(t,e):t instanceof HTMLInputElement&&!["text","search","url","tel","password"].includes(null===t||void 0===t?void 0:t.type)?n=h(t.value,e):(n=u()(t),l("copy")),n},y=p;function v(t){return v="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}var m=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.action,n=void 0===e?"copy":e,r=t.container,o=t.target,i=t.text;if("copy"!==n&&"cut"!==n)throw new Error('Invalid "action" value, use either "copy" or "cut"');if(void 0!==o){if(!o||"object"!==v(o)||1!==o.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===n&&o.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===n&&(o.hasAttribute("readonly")||o.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes')}return i?y(i,{container:r}):o?"cut"===n?f(o):y(o,{container:r}):void 0},g=m;function b(t){return b="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},b(t)}function w(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function k(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function x(t,e,n){return e&&k(t.prototype,e),n&&k(t,n),t}function C(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&S(t,e)}function S(t,e){return S=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},S(t,e)}function E(t){var e=_();return function(){var n,r=T(t);if(e){var o=T(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return A(this,n)}}function A(t,e){return!e||"object"!==b(e)&&"function"!==typeof e?L(t):e}function L(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function _(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function T(t){return T=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},T(t)}function R(t,e){var n="data-clipboard-".concat(t);if(e.hasAttribute(n))return e.getAttribute(n)}var O=function(t){C(n,t);var e=E(n);function n(t,r){var o;return w(this,n),o=e.call(this),o.resolveOptions(r),o.listenClick(t),o}return x(n,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"===typeof t.action?t.action:this.defaultAction,this.target="function"===typeof t.target?t.target:this.defaultTarget,this.text="function"===typeof t.text?t.text:this.defaultText,this.container="object"===b(t.container)?t.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=a()(t,"click",(function(t){return e.onClick(t)}))}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget,n=this.action(e)||"copy",r=g({action:n,container:this.container,target:this.target(e),text:this.text(e)});this.emit(r?"success":"error",{action:n,text:r,trigger:e,clearSelection:function(){e&&e.focus(),window.getSelection().removeAllRanges()}})}},{key:"defaultAction",value:function(t){return R("action",t)}},{key:"defaultTarget",value:function(t){var e=R("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return R("text",t)}},{key:"destroy",value:function(){this.listener.destroy()}}],[{key:"copy",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{container:document.body};return y(t,e)}},{key:"cut",value:function(t){return f(t)}},{key:"isSupported",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],e="string"===typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach((function(t){n=n&&!!document.queryCommandSupported(t)})),n}}]),n}(o()),M=O},828:function(t){var e=9;if("undefined"!==typeof Element&&!Element.prototype.matches){var n=Element.prototype;n.matches=n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector}function r(t,n){while(t&&t.nodeType!==e){if("function"===typeof t.matches&&t.matches(n))return t;t=t.parentNode}}t.exports=r},438:function(t,e,n){var r=n(828);function o(t,e,n,r,o){var i=a.apply(this,arguments);return t.addEventListener(n,i,o),{destroy:function(){t.removeEventListener(n,i,o)}}}function i(t,e,n,r,i){return"function"===typeof t.addEventListener?o.apply(null,arguments):"function"===typeof n?o.bind(null,document).apply(null,arguments):("string"===typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,(function(t){return o(t,e,n,r,i)})))}function a(t,e,n,o){return function(n){n.delegateTarget=r(n.target,e),n.delegateTarget&&o.call(t,n)}}t.exports=i},879:function(t,e){e.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},e.nodeList=function(t){var n=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in t&&(0===t.length||e.node(t[0]))},e.string=function(t){return"string"===typeof t||t instanceof String},e.fn=function(t){var e=Object.prototype.toString.call(t);return"[object Function]"===e}},370:function(t,e,n){var r=n(879),o=n(438);function i(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!r.string(e))throw new TypeError("Second argument must be a String");if(!r.fn(n))throw new TypeError("Third argument must be a Function");if(r.node(t))return a(t,e,n);if(r.nodeList(t))return c(t,e,n);if(r.string(t))return u(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function a(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function c(t,e,n){return Array.prototype.forEach.call(t,(function(t){t.addEventListener(e,n)})),{destroy:function(){Array.prototype.forEach.call(t,(function(t){t.removeEventListener(e,n)}))}}}function u(t,e,n){return o(document.body,t,e,n)}t.exports=i},817:function(t){function e(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var r=window.getSelection(),o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o),e=r.toString()}return e}t.exports=e},279:function(t){function e(){}e.prototype={on:function(t,e,n){var r=this.e||(this.e={});return(r[t]||(r[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var r=this;function o(){r.off(t,o),e.apply(n,arguments)}return o._=e,this.on(t,o,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),r=0,o=n.length;for(r;r<o;r++)n[r].fn.apply(n[r].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),r=n[t],o=[];if(r&&e)for(var i=0,a=r.length;i<a;i++)r[i].fn!==e&&r[i].fn._!==e&&o.push(r[i]);return o.length?n[t]=o:delete n[t],this}},t.exports=e,t.exports.TinyEmitter=e}},e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={exports:{}};return t[r](o,o.exports,n),o.exports}return function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),n(686)}().default}))},6407:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return Z}});var r=n(3396);function o(t,e,n,o,i,a){const c=(0,r.up)("RetrieveCategories"),u=(0,r.up)("RetrieveAllLinks");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(c),(0,r.Wm)(u)],64)}var i=n(7840),a=n(7139),c=n(9242);const u=t=>((0,r.dD)("data-v-235f8948"),t=t(),(0,r.Cn)(),t),l={class:"card",id:"theCard"},s={class:"card-header"},f=["src","alt"],d={class:"category text-primary"},h={class:"card-body"},p={class:"card-title"},y={class:"card-text"},v=["href"],m=["onClick"],g=u((()=>(0,r._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-share-fill",viewBox:"0 0 16 16"},[(0,r._)("path",{d:"M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"})],-1))),b=[g],w=["onClick"];function k(t,e,n,o,i,u){return(0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.filteredLinks,(e=>((0,r.wg)(),(0,r.iD)("section",{key:e.id,ref_for:!0,ref:"dataComponent"},[(0,r._)("div",l,[(0,r._)("h5",s,[(0,r._)("img",{height:"18",width:"18",src:t.baseUrl+e.link,alt:e.linkname},null,8,f),(0,r.Uk)(" "+(0,a.zw)(e.linkname)+" ",1),(0,r._)("mark",d,(0,a.zw)(e.category),1)]),(0,r._)("div",h,[(0,r._)("h6",p,(0,a.zw)(e.link),1),(0,r._)("p",y,(0,a.zw)(e.linkdescription),1),(0,r._)("a",{href:e.link,target:"_blank",class:"btn btn-primary btn-sm"},"Open link",8,v),(0,r._)("button",{class:"btn",onClick:(0,c.iM)((n=>t.shareLink(e)),["prevent"])},b,8,m),(0,r._)("button",{class:"btn btn-danger btn-sm btn-space",onClick:(0,c.iM)((n=>t.deleteLink(e)),["prevent"])},"Delete",8,w)])])])))),128)}var x=n(1809),C=n(8134),S=n.n(C),E=(0,r.aZ)({name:"RetrieveAllLinks",data(){return{store:i.h,baseUrl:"http://www.google.com/s2/favicons?domain=",items:[],toast:!0}},created(){this.retrieveAllLinks()},computed:{filteredLinks:function(){return this.items.filter((t=>t.linkname.match(i.h.searchValue)||t.linkdescription.match(i.h.searchValue)||t.category.match(i.h.searchValue)||t.link.match(i.h.searchValue)))}},methods:{async retrieveAllLinks(){const t=x.Z[0],e=i.h.username,n=i.h.token;try{await this.axios.post(`${t}profile/v1/retrieveAllLinks`,{token:n,username:e}).then((t=>{this.items=t.data}))}catch(r){console.error(r)}},shareLink(t){const e=t.link;new(S())(".btn",{text:()=>e}),this.$swal({icon:"success",text:"You copied the link to your clipboard.",timer:1500,showConfirmButton:!1})},async deleteLink(t){this.$swal({icon:"warning",title:"Warning",html:`Do you really want to delete the <b>${t.linkname}</b> link?`,showCancelButton:!0,cancelButtonText:"Cancel",cancelButtonColor:"#0d6efd",confirmButtonText:"Delete",confirmButtonColor:"#dc3545"}).then((async e=>{if(1==e.value){const e=t.username,r=t.link,o=i.h.token,a=x.Z[0];try{await this.axios.post(`${a}profile/v1/deleteLink`,{username:e,link:r,token:o}).then((()=>{this.retrieveAllLinks()}))}catch(n){console.log(n)}}else this.$swal.close()}))}}}),A=n(89);const L=(0,A.Z)(E,[["render",k],["__scopeId","data-v-235f8948"]]);var _=L;const T={class:"scrollableCategories"},R=["onClick"];function O(t,e,n,o,i,u){return(0,r.wg)(),(0,r.iD)("div",T,[(0,r._)("div",{class:"text-secondary mr-2 child",onClick:e[0]||(e[0]=(0,c.iM)(((...e)=>t.resetCategories&&t.resetCategories(...e)),["prevent"]))},"Categories:"),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.items,(e=>((0,r.wg)(),(0,r.iD)("mark",{key:e.category,onClick:(0,c.iM)((n=>t.setCategory(e)),["prevent"]),class:"bg-white text-decoration-underline mr-2 child"},(0,a.zw)(e),9,R)))),128))])}var M=(0,r.aZ)({name:"RetrieveCategories",data(){return{store:i.h,items:[],resetValue:""}},beforeMount(){this.retrieveAllCategories()},methods:{async retrieveAllCategories(){const t=x.Z[0],e=i.h.username,n=i.h.token;try{await this.axios.post(`${t}profile/v1/retrieveAllLinks`,{token:n,username:e}).then((t=>{let e=new Set;t.data.forEach((t=>{e.add(t.category)})),this.items=Array.from(e)}))}catch(r){console.error(r)}},setCategory(t){i.h.setSearchValue(t)},resetCategories(){i.h.setSearchValue(this.resetValue)}}});const j=(0,A.Z)(M,[["render",O],["__scopeId","data-v-327a1b4e"]]);var D=j,P=(0,r.aZ)({components:{RetrieveAllLinks:_,RetrieveCategories:D},data(){return{store:i.h}},beforeRouteEnter(){i.h.authStatusRefresh(),"loggedIn"!==i.h.authStatus&&(window.location.href="/signin")}});const I=(0,A.Z)(P,[["render",o]]);var Z=I}}]);
//# sourceMappingURL=407.17d24f91.js.map