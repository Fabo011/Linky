"use strict";(self["webpackChunklinky"]=self["webpackChunklinky"]||[]).push([[724],{4e3:function(e,t,n){n.d(t,{c:function(){return c}});var o=n(4108),r=n(9096);const a={type:"button",class:"btn w-100"};function s(e,t,n,s,i,l){return(0,o.Wz)(),(0,o.An)("button",a,(0,r.WA)(e.buttonText),1)}var i=(0,o._M)({name:"TheAuthButton.vue",beforeMount(){const e=this.$route.name;"signin"===e?this.buttonText="Login":"signup"===e?this.buttonText="Register":"key"===e&&(this.buttonText="Got To Account")},data(){return{buttonText:""}}}),l=n(6482);const u=(0,l.c)(i,[["render",s],["__scopeId","data-v-759425f2"]]);var c=u},1580:function(e,t,n){n.r(t),n.d(t,{default:function(){return z}});var o=n(4108),r=n(7764),a=n.p+"img/key.099b588a.png";const s=e=>((0,o.ED)("data-v-2e427eae"),e=e(),(0,o.ii)(),e),i={class:"container mt-5"},l={class:"row d-flex justify-content-center"},u={class:"col-md-6"},c={class:"card px-4 py-5 shadow p-3 mb-5 bg-body rounded border-0",id:"form1"},d=s((()=>(0,o.QD)("h3",null,[(0,o.QD)("b",null,"Digital Key "),(0,o.QD)("img",{src:a,alt:"cat waiting for key",id:"image"})],-1))),y=s((()=>(0,o.QD)("hr",null,null,-1))),h={key:0},p=s((()=>(0,o.QD)("p",null," Store your digital key in a password manager or encrypted on a usb drive. It's the only way to decrypt your data in the cloud. Never lose the key or show to anyone. ",-1))),k={class:"form-data"},f={class:"key-field"},g=["placeholder"],b={key:1},v=s((()=>(0,o.QD)("p",null,"Please copy your digital key into the input field and click the button below.",-1))),D={class:"form-data"},m={class:"key-field"};function Q(e,t,n,a,s,Q){const w=(0,o.E1)("TheAuthButton"),A=(0,o.E1)("TheFooter");return(0,o.Wz)(),(0,o.An)(o.ae,null,[(0,o.QD)("section",i,[(0,o.QD)("div",l,[(0,o.QD)("div",u,[(0,o.QD)("div",c,[d,y,e.key?.length>20?((0,o.Wz)(),(0,o.An)("div",h,[p,(0,o.QD)("form",k,[(0,o.QD)("div",f,[(0,o.QD)("input",{type:"text",placeholder:e.placeholder,readonly:""},null,8,g),(0,o.QD)("span",{class:"btn copyBtn",onClick:t[0]||(t[0]=(0,r.Y7)((t=>e.copyPrivateKey()),["prevent"]))},"Copy Digital Key")])])])):(0,o.g1)("",!0),null==e.key?((0,o.Wz)(),(0,o.An)("div",b,[v,(0,o.QD)("form",D,[(0,o.QD)("div",m,[(0,o.wt)((0,o.QD)("input",{"onUpdate:modelValue":t[1]||(t[1]=t=>e.userKey=t),type:"text",placeholder:"Enter Digital Key"},null,512),[[r.Og,e.userKey]])])]),(0,o.K2)(w,{onClick:t[2]||(t[2]=(0,r.Y7)((t=>e.toAccount()),["prevent"]))})])):(0,o.g1)("",!0)])])])]),(0,o.K2)(A)],64)}n(1960);var w=n(8948),A=n(3392),K=n.n(A),T=n(2652),x=n(4e3),_=n(912),C=(0,o._M)({components:{TheFooter:T.c,TheAuthButton:x.c},data(){return{store:w.i,placeholder:"*******************************",key:"",userKey:""}},beforeMount(){w.i.authStatusRefresh(),w.i.checkUser();const e=sessionStorage.getItem("key");this.key=e},methods:{copyPrivateKey(){const e=this.key;new(K())(".btn",{text:()=>e}),(0,_.gF)()},toAccount(){sessionStorage.setItem("key",this.userKey),this.$router.push("/profile")}}}),I=n(6482);const W=(0,I.c)(C,[["render",Q],["__scopeId","data-v-2e427eae"]]);var z=W}}]);
//# sourceMappingURL=724.b4aa358c.js.map