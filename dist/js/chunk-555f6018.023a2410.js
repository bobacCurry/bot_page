(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-555f6018"],{"22ce":function(t,e,n){"use strict";n.d(e,"b",(function(){return c})),n.d(e,"i",(function(){return r})),n.d(e,"g",(function(){return s})),n.d(e,"f",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"e",(function(){return u})),n.d(e,"a",(function(){return d})),n.d(e,"d",(function(){return l})),n.d(e,"h",(function(){return h}));var a=n("66df"),c=function(t){return a["a"].request({url:"/service/push/add",data:t,method:"post"})},r=function(t,e){return a["a"].request({url:"/service/push/update/".concat(t),method:"post",data:e})},s=function(t){return a["a"].request({url:"/service/push/get?page=".concat(t),method:"get"})},i=function(t){return a["a"].request({url:"/service/push/get_one/".concat(t),method:"get"})},o=function(t){return a["a"].request({url:"/service/push/change_status/".concat(t),method:"post"})},u=function(t){return a["a"].request({url:"/service/push/del_push/".concat(t),method:"post"})},d=function(t){return a["a"].request({url:"/service/vip/add_chat",method:"post",data:t})},l=function(t){return a["a"].request({url:"/service/vip/del_add_chat/".concat(t),method:"post"})},h=function(t){return a["a"].request({url:"/service/vip/update_add_chat/".concat(t),method:"post"})}},"30ca":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"admin-add-chat"},[n("div",{staticClass:"zone-frame"},[n("h2",[t._v("配置加群信息")]),n("div",{staticClass:"flex-start-center option-frame"},[n("div",{staticClass:"option-item"},[n("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"广告业务类型"},on:{"on-change":t.changeChatType},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},t._l(this.chatType,(function(e,a){return n("Option",{key:a,attrs:{value:a}},[t._v(t._s(e))])})),1)],1),n("div",{staticClass:"option-item"},[n("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择TG实例"},model:{value:t.params.phone,callback:function(e){t.$set(t.params,"phone",e)},expression:"params.phone"}},t._l(this.clientList,(function(e,a){return n("Option",{key:a,attrs:{value:e.phone}},[t._v(t._s(e.phone))])})),1)],1),n("div",{staticClass:"info-item"},[n("Checkbox",{on:{"on-change":t.checkAll}},[t._v("全选")])],1),n("div",{staticClass:"option-item"},[n("Button",{attrs:{type:"primary",disabled:t.loading},on:{click:t.addChat}},[t._v("创建自动加群订单")])],1)]),n("div",{staticClass:"flex-start-center option-frame"},[n("CheckboxGroup",{model:{value:t.params.chatids,callback:function(e){t.$set(t.params,"chatids",e)},expression:"params.chatids"}},t._l(t.chatList,(function(e,a){return n("Checkbox",{key:a,attrs:{label:e.chatid,disabled:!!e.auth}},[n("span",{staticClass:"check-item"},[t._v(t._s(e.chatid)+" "),e.auth?n("label",{staticStyle:{color:"red"}},[t._v("(需验证)")]):t._e()])])})),1)],1)]),n("div",{staticClass:"zone-frame"},[n("h2",[t._v("加群订单列表")]),n("div",{staticClass:"add-chat-list flex-between-top"},t._l(t.orderList,(function(e,a){return n("div",{key:a,staticClass:"add-chat-item"},[n("div",{staticClass:"title"},[t._v("\n\t\t\t\t\tTG账号："+t._s(e.phone)+"\n\t\t\t\t")]),n("div",{staticClass:"status"},[t._v("\n\t\t\t\t\t状态：\n\t\t\t\t\t"),0===e.status?n("span",{staticStyle:{color:"green"}},[t._v("执行中")]):t._e(),1===e.status?n("span",{staticStyle:{color:"blue"}},[t._v("执行完毕")]):t._e(),-1===e.status?n("span",{staticStyle:{color:"red"}},[t._v("执行失败")]):t._e(),t._v("\n\t\t\t\t\t  \n\t\t\t\t\t"),1===e.status?n("Button",{attrs:{type:"primary",size:"small"},on:{click:function(n){return t.updateAddChat(e._id,a)}}},[t._v("启动服务")]):t._e(),t._v("\n\t\t\t\t\t  \n\t\t\t\t\t"),n("Button",{attrs:{type:"primary",size:"small"},on:{click:function(n){return t.delAddChat(e._id,a)}}},[t._v("删除服务")])],1),n("Collapse",[n("Panel",{attrs:{name:"1"}},[t._v("\n\t\t\t            等待加入的群\n\t\t\t            "),n("p",{attrs:{slot:"content"},slot:"content"},t._l(e.chatids,(function(e,a){return n("Tag",{key:a,attrs:{color:"primary"}},[t._v(t._s(e))])})),1)]),n("Panel",{attrs:{name:"2"}},[t._v("\n\t\t\t            加入成功\n\t\t\t            "),n("p",{attrs:{slot:"content"},slot:"content"},t._l(e.success,(function(e,a){return n("Tag",{key:a,attrs:{color:"primary"}},[t._v(t._s(e))])})),1)]),n("Panel",{attrs:{name:"3"}},[t._v("\n\t\t\t            加入失败\n\t\t\t            "),n("p",{attrs:{slot:"content"},slot:"content"},t._l(e.fail,(function(e,a){return n("Tag",{key:a,attrs:{color:"primary"}},[t._v(t._s(e))])})),1)]),n("Panel",{attrs:{name:"4"}},[t._v("\n\t\t\t            加群信息\n\t\t\t            "),n("p",{attrs:{slot:"content"},slot:"content"},[t._v("\n\t\t\t            \t"+t._s(e.msg)+"\n\t\t\t        \t")])])],1)],1)})),0),n("Page",{attrs:{"page-size":50,total:5e3,simple:""},on:{"on-change":t.getAddChat}})],1)])},c=[],r=n("9328"),s=n("acd9"),i=n("22ce"),o=n("b39f"),u={mounted:function(){this.getClient(),this.getChat(),this.getAddChat(1)},data:function(){return{chatType:r["b"],clientList:[],chatList:[],type:0,params:{chatids:[],phone:""},orderList:[],loading:!1}},methods:{getClient:function(){var t=this;Object(s["e"])().then((function(e){e.data.success&&(t.clientList=e.data.msg)}))},getChat:function(){var t=this;Object(s["c"])(this.type).then((function(e){e.data.success&&(t.chatList=e.data.msg)}))},changeChatType:function(t){this.type=t,this.getChat()},addChat:function(){var t=this;return this.params.phone.trim()?this.params.chatids.length?(this.loading=!0,void Object(i["a"])(this.params).then((function(e){var n=e.data;n.success?(t.$Notice.success({title:n.msg}),t.getAddChat(1)):t.$Notice.error({title:n.msg})})).catch((function(e){var n=e.response;t.$Notice.error({title:n.data.msg})})).finally((function(){t.loading=!1}))):this.$Notice.error({title:"请选择要自动加的群"}):this.$Notice.error({title:"请选择要加群的TG账号"})},getAddChat:function(t){var e=this;Object(o["b"])(t).then((function(t){var n=t.data;n.success?e.orderList=n.msg:e.$Notice.error({title:n.msg})})).catch((function(t){var n=t.response;e.$Notice.error({title:n.data.msg})}))},checkAll:function(t){if(t){this.params.chatids=[];for(var e=this.chatList.length-1;e>=0;e--)this.chatList[e].auth||this.params.chatids.push(this.chatList[e].chatid)}else this.params.chatids=[]},delAddChat:function(t,e){var n=this;this.$Modal.confirm({title:"确认删除",content:"确认删除该单",onOk:function(){Object(i["d"])(t).then((function(t){var a=t.data;a.success?n.orderList.splice(e,1):n.$Notice.error({title:a["msg"]})}))}})},updateAddChat:function(t,e){var n=this;Object(i["h"])(t).then((function(t){var a=t.data;a.success?n.orderList[e].status=0:n.$Notice.error({title:a["msg"]})}))}}},d=u,l=(n("cde9"),n("2877")),h=Object(l["a"])(d,a,c,!1,null,"9fd8173c",null);e["default"]=h.exports},9328:function(t,e,n){"use strict";n.d(e,"e",(function(){return a})),n.d(e,"c",(function(){return c})),n.d(e,"b",(function(){return r})),n.d(e,"f",(function(){return s})),n.d(e,"a",(function(){return i})),n.d(e,"d",(function(){return o}));var a=["群发服务","私信服务","拉群服务"],c=["未开启","正常","被禁言（spam）","被封禁（banned）","验证失效"],r=["工作信息","商业推广","美食外卖","其他业务"],s=["文字","图片"],i=["未通过","通过"],o=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},acd9:function(t,e,n){"use strict";n.d(e,"e",(function(){return c})),n.d(e,"f",(function(){return r})),n.d(e,"b",(function(){return s})),n.d(e,"a",(function(){return i})),n.d(e,"d",(function(){return o})),n.d(e,"c",(function(){return u}));var a=n("66df"),c=function(){return a["a"].request({url:"service/client/get_user_client",method:"get"})},r=function(t){return a["a"].request({url:"service/auth/send_code/".concat(t),method:"post"})},s=function(t,e){return a["a"].request({url:"service/auth/confirm_code/".concat(t,"/").concat(e),method:"post"})},i=function(t,e,n){return a["a"].request({url:"service/chat/add_chat/".concat(t,"/").concat(e,"/").concat(n),method:"post"})},o=function(t,e){return a["a"].request({url:"service/chat/get_user_chat/".concat(t,"/").concat(e),method:"get"})},u=function(t){return a["a"].request({url:"/service/chat/get_chat/".concat(t),method:"get"})}},b39f:function(t,e,n){"use strict";n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return r})),n.d(e,"e",(function(){return s})),n.d(e,"b",(function(){return i})),n.d(e,"d",(function(){return o}));var a=n("66df"),c=function(t,e){return a["a"].request({url:"/service/client/get_notused_client",method:"get"})},r=function(t){return a["a"].request({url:"/service/client/del_user_client/".concat(t),method:"post"})},s=function(t){return a["a"].request({url:"/service/client/restore/".concat(t),method:"post"})},i=function(t){return a["a"].request({url:"/service/client/get_add_chat/".concat(t),method:"get"})},o=function(t){return a["a"].request({url:"/service/client/get_client/".concat(t),method:"get"})}},cde9:function(t,e,n){"use strict";var a=n("f486"),c=n.n(a);c.a},f486:function(t,e,n){}}]);