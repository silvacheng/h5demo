webpackJsonp([1],{"5GDR":function(t,e){},"78BN":function(t,e){},NHnr:function(t,e,n){"use strict";function i(t){n("RjyN")}function r(t){n("78BN")}function o(t){n("cqo/")}function s(t){n("5GDR")}Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),l=n("v5o6"),u=n.n(l),d=n("/ocq"),c={name:"app"},f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},m=[],g={render:f,staticRenderFns:m},h=g,p=n("VU/8"),x=i,v=p(c,h,!1,x,null,null),b=v.exports,_={name:"divider"},y=function(){var t=this,e=t.$createElement;return(t._self._c||e)("p",{staticClass:"vux-divider"},[t._t("default")],2)},w=[],S={render:y,staticRenderFns:w},N=S,D=n("VU/8"),$=r,j=D(_,N,!1,$,null,null),T=j.exports,C=(Number,String,String,String,String,String,{name:"flexbox",props:{gutter:{type:Number,default:8},orient:{type:String,default:"horizontal"},justify:String,align:String,wrap:String,direction:String},computed:{styles:function(){return{"justify-content":this.justify,"-webkit-justify-content":this.justify,"align-items":this.align,"-webkit-align-items":this.align,"flex-wrap":this.wrap,"-webkit-flex-wrap":this.wrap,"flex-direction":this.direction,"-webkit-flex-direction":this.direction}}}}),F=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"vux-flexbox",class:{"vux-flex-col":"vertical"===t.orient,"vux-flex-row":"horizontal"===t.orient},style:t.styles},[t._t("default")],2)},M=[],q={render:F,staticRenderFns:M},R=q,k=n("VU/8"),A=o,E=k(C,R,!1,A,null,null),U=E.exports,W=["-moz-box-","-webkit-box-",""],I=(Number,String,Number,String,["-moz-box-","-webkit-box-",""]),H={name:"flexbox-item",props:{span:[Number,String],order:[Number,String]},beforeMount:function(){this.bodyWidth=document.documentElement.offsetWidth},methods:{buildWidth:function(t){return"number"==typeof t?t<1?t:t/12:"string"==typeof t?t.replace("px","")/this.bodyWidth:void 0}},computed:{style:function(){var t={},e="horizontal"===this.$parent.orient?"marginLeft":"marginTop";if(1*this.$parent.gutter!=0&&(t[e]=this.$parent.gutter+"px"),this.span)for(var n=0;n<I.length;n++)t[I[n]+"flex"]="0 0 "+100*this.buildWidth(this.span)+"%";return void 0!==this.order&&(t.order=this.order),t}},data:function(){return{bodyWidth:0}}},z=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"vux-flexbox-item",style:t.style},[t._t("default")],2)},B=[],O={render:z,staticRenderFns:B},V=O,J=n("VU/8"),G=J(H,V,!1,null,null,null),P=G.exports,L=n("yD8N"),X=n("162o"),Y=n("EhXH"),K=n.n(Y),Q=n("M4fF"),Z=n.n(Q),tt={components:{Flexbox:U,FlexboxItem:P,Divider:T},data:function(){return{list:new Array(10),listClone:[],timer:null,delay:300,requestIndex:0,registerDelay:25,baseUrl:"fileupdown/downloadBusiFile?filePath=",current:+new Date}},computed:{win_width:function(){return window.innerWidth}},mounted:function(){var t=this;this.timer=Object(X.setInterval)(function(){t._getData()},this.delay)},methods:{_getData:function(){var t=this;L.a.$http.post("/iscportal/conferenceSigning/get").then(function(e){if(200===e.status&&"0000"===e.data.returnCode){var n=t._stringToJson(e.data.ext1.abc),i=Z.a.isEqual(n,t.listClone);if(1===++t.requestIndex)t.list=n;else if(i)return void console.log("后台数据与备份数据相同");t.listClone=n,t.list=t.list.concat(n),t.list=Z.a.uniq(t.list),t.list.sort(function(t,e){return e.capturedTime-t.capturedTime}),console.log("取前十个之前 -----\x3e "),console.log(t.list),t.list.length>=10&&(t.list=t.list.slice(0,10)),console.log("取前十个之后 -----\x3e "),console.log(t.list),1!==t.requestIndex&&K.a.unregisterAnimation("move"),Object(X.setTimeout)(function(){t._setAnimation()},t.registerDelay)}})},_setAnimation:function(){var t={0:{transform:"translate(0, 0)"},100:{transform:"translate("+this.win_width/8+"px, 0)"}};K.a.registerAnimation({name:"move",animation:t,presets:{duration:this.delay,easing:"linear"}}),K.a.runAnimation(this.$refs.flexBox.$el,"move")},_stringToJson:function(t){if(t){var e=[];return t.map(function(t){var n=JSON.parse(t);e.push(n)}),e}},_formatTime:function(t){if("null"===t)return"";var e=t?new Date(t):new Date,n=e.getMonth()<9?"0"+(e.getMonth()+1):e.getMonth()+1,i=e.getDate()<10?"0"+e.getDate():e.getDate(),r=e.getHours()<10?"0"+e.getHours():e.getHours(),o=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),s=e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds();return e.getFullYear()+"-"+n+"-"+i+" "+r+":"+o+":"+s}},destroyed:function(){Object(X.clearInterval)(this.timer)}},et=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("divider",[t._v(" 第"+t._s(t.requestIndex)+"次请求")]),t._v(" "),n("flexbox",{ref:"flexBox",staticClass:"flexbox",attrs:{gutter:10,id:"flexbox"}},t._l(t.list,function(e,i){return n("flexbox-item",{key:i},[n("div",{staticClass:"flex-demo"},[n("dl",[n("dt",[n("img",{attrs:{src:t.baseUrl+e.prsnAvtrUrlAddr,alt:"",width:"80",height:"80"}})]),t._v(" "),n("dd",[t._v("\n            "+t._s(e.prsnName)+"\n          ")]),t._v(" "),n("dd",[t._v("\n            "+t._s(t._formatTime(e.capturedTime))+"\n          ")]),t._v(" "),n("dd",[t._v("\n            相差："+t._s(t.current-e.capturedTime)+"ms\n          ")])])])])}))],1)},nt=[],it={render:et,staticRenderFns:nt},rt=it,ot=n("VU/8"),st=s,at=ot(tt,rt,!1,st,"data-v-f4de22d6",null),lt=at.exports;a.a.use(d.a);var ut=new d.a({routes:[{path:"/",name:"Meeting",component:lt}]});u.a.attach(document.body),a.a.config.productionTip=!1,new a.a({router:ut,render:function(t){return t(b)}}).$mount("#app-box")},RjyN:function(t,e){},"cqo/":function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.4e022aa44d19b43d58d9.js.map