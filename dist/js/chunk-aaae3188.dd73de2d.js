(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-aaae3188"],{7821:function(t,e,a){},8608:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Card",[a("Row",{staticClass:"table-option",attrs:{type:"flex",justify:"start",align:"middle"}},[a("Col",[a("Card",{staticClass:"option-card"},[a("Button",{attrs:{type:"info"},on:{click:function(e){return t.createShow()}}},[t._v("create menu")])],1)],1),a("Col",[a("Card",{staticClass:"option-card"},[a("Button",{attrs:{type:"success"},on:{click:function(e){return t.setStatus(1)}}},[t._v("Success")])],1)],1),a("Col",[a("Card",{staticClass:"option-card"},[a("Button",{attrs:{type:"warning"},on:{click:function(e){return t.setStatus(0)}}},[t._v("Disable")])],1)],1),t._l(t.tableColumnsChecked,(function(e,r){return a("Col",{key:r},[a("Card",{staticClass:"option-card",attrs:{size:"small"}},[t._v(t._s(r)+" "),a("i-switch",{model:{value:t.tableColumnsChecked[r],callback:function(e){t.$set(t.tableColumnsChecked,r,e)},expression:"tableColumnsChecked[k]"}})],1)],1)})),a("Col",[a("Card",{staticClass:"option-card",attrs:{size:"small"}},[t._v("search "),a("i-switch",{model:{value:t.search.flag,callback:function(e){t.$set(t.search,"flag",e)},expression:"search.flag"}})],1)],1)],2),a("Row",{directives:[{name:"show",rawName:"v-show",value:t.search.flag,expression:"search.flag"}],staticClass:"table-search",attrs:{type:"flex",justify:"end",align:"middle"}},[a("Col",{staticClass:"search-input-box",attrs:{span:"9"}},[a("Input",{staticClass:"search-input",attrs:{size:"large",clearable:"",search:"","enter-button":"search",placeholder:"Please enter keywords"},on:{"on-keyup":function(e){t.search.keywords=t.search.keywords.trim()},"on-search":function(e){return t.searchKeywords(!0)},"on-clear":function(e){return t.searchKeywords(!1)}},model:{value:t.search.keywords,callback:function(e){t.$set(t.search,"keywords",e)},expression:"search.keywords"}},[a("Select",{staticClass:"search-input-select",attrs:{slot:"prepend",size:"large",clearable:""},on:{"on-clear":function(e){return t.searchKeywords(!1)}},slot:"prepend",model:{value:t.search.type,callback:function(e){t.$set(t.search,"type",e)},expression:"search.type"}},[a("Option",{attrs:{value:"text"}},[t._v("text (模糊匹配)")]),a("Option",{attrs:{value:"path"}},[t._v("path (模糊匹配)")]),a("Option",{attrs:{value:"sort"}},[t._v("sort (精准匹配)")]),a("Option",{attrs:{value:"width"}},[t._v("width (精准匹配)")]),a("Option",{attrs:{value:"level"}},[t._v("level (精准匹配)")]),a("Option",{attrs:{value:"status"}},[t._v("status (精准匹配)")])],1)],1)],1)],1),a("Table",{ref:"menu",staticClass:"table",attrs:{loading:t.loading,data:t.tableData,columns:t.tableColumns,border:""},scopedSlots:t._u([{key:"action",fn:function(e){e.row;var r=e.index;return[a("Button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.editShow(r)}}},[t._v("Edit")]),a("Button",{style:"margin-left: 10px",attrs:{type:"error",size:"small"},on:{click:function(e){return t.remove(r)}}},[t._v("Remove")])]}}])}),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{staticClass:"table-page",attrs:{total:t.total,current:t.page,"show-elevator":"","show-sizer":""},on:{"on-change":t.changePage,"on-page-size-change":t.changeSize}})],1)])],1),t.modalOpt.flag?a("myModal",{attrs:{modalOptObj:t.modalOpt,formValidateObj:t.formValidate},on:{updateTableData:t.updateTableData,createTableData:t.createTableData,modalCancel:t.modalCancel}}):t._e()],1)},s=[],o=(a("8e6e"),a("75fc")),n=a("a8db"),i=(a("456d"),a("ac6a"),a("386d"),a("96cf"),a("3b8d")),l=a("bd86"),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Modal",{attrs:{closable:t.modalOpt.closable,"mask-closable":!1},model:{value:t.modalOpt.flag,callback:function(e){t.$set(t.modalOpt,"flag",e)},expression:"modalOpt.flag"}},[a("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("span",[t._v(t._s(t.modalOpt.name))])]),a("Form",{ref:"formValidate",attrs:{model:t.formValidate,rules:t.ruleValidate,"label-width":80}},[t._l(t.formValidate.text,(function(e,r){return a("FormItem",{key:r,attrs:{label:r,prop:"text"}},[a("Row",[a("Col",{attrs:{span:"18"}},[a("Input",{attrs:{type:"text",placeholder:"Enter "+r+" text"},on:{"on-keyup":function(e){t.formValidate.text[r]=t.formValidate.text[r].trim()}},model:{value:t.formValidate.text[r],callback:function(e){t.$set(t.formValidate.text,r,e)},expression:"formValidate.text[lang]"}})],1),a("Col",{attrs:{span:"4",offset:"1"}},["cn"!=r?a("Button",{on:{click:function(e){return t.handleRemove(r)}}},[t._v("Delete")]):t._e()],1)],1)],1)})),a("FormItem",[a("Row",[a("Col",{attrs:{span:"12"}},[t.lang_length>0?a("Dropdown",[a("Button",{attrs:{type:"primary"}},[t._v("\n                add text\n                "),a("Icon",{attrs:{type:"ios-arrow-down"}})],1),a("DropdownMenu",{attrs:{slot:"list"},slot:"list"},t._l(t.textData.langList,(function(e,r){return e?a("DropdownItem",{nativeOn:{click:function(e){return t.handleAdd(r)}}},[t._v(t._s(r))]):t._e()})),1)],1):t._e()],1)],1)],1),a("FormItem",{attrs:{label:"path",prop:"path"}},[a("Input",{attrs:{placeholder:"Enter your path"},model:{value:t.formValidate.path,callback:function(e){t.$set(t.formValidate,"path",e)},expression:"formValidate.path"}})],1),a("FormItem",{attrs:{label:"sort",prop:"sort"}},[a("Input",{attrs:{type:"number",number:"",placeholder:"Enter your sort"},model:{value:t.formValidate.sort,callback:function(e){t.$set(t.formValidate,"sort",e)},expression:"formValidate.sort"}})],1),a("FormItem",{attrs:{label:"width",prop:"width"}},[a("Input",{attrs:{type:"number",number:"",placeholder:"Enter your width"},model:{value:t.formValidate.width,callback:function(e){t.$set(t.formValidate,"width",e)},expression:"formValidate.width"}})],1),a("FormItem",{attrs:{label:"level",prop:"level"}},[a("Input",{attrs:{type:"number",number:"",placeholder:"Enter your level"},model:{value:t.formValidate.level,callback:function(e){t.$set(t.formValidate,"level",e)},expression:"formValidate.level"}})],1),a("FormItem",{attrs:{label:"status",prop:"status"}},[a("RadioGroup",{model:{value:t.formValidate.status,callback:function(e){t.$set(t.formValidate,"status",e)},expression:"formValidate.status"}},[a("Radio",{attrs:{label:1}},[t._v("success")]),a("Radio",{attrs:{label:0}},[t._v("disable")])],1)],1)],2),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{on:{click:function(e){return t.handleCancel()}}},[t._v("取消")]),t.modalOptObj.edit?a("Button",{staticStyle:{"margin-left":"8px"},attrs:{type:"primary",loading:t.modalOpt.loading},on:{click:function(e){return t.editSubmit("formValidate")}}},[t._v("编辑")]):a("Button",{staticStyle:{"margin-left":"8px"},attrs:{type:"primary",loading:t.modalOpt.loading},on:{click:function(e){return t.createSubmit("formValidate")}}},[t._v("创建")])],1)],1)],1)},d=[],u=(a("7f7f"),a("2f62"));function h(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function m(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?h(Object(a),!0).forEach((function(e){Object(l["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):h(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var p={props:["modalOptObj","formValidateObj"],data:function(){var t=this,e=function(e,a,r){Object.keys(t.formValidate.text).forEach((function(e){t.formValidate.text[e]||r(new Error("The text cannot be empty"))})),r()};return{modalOpt:m({},this.modalOptObj),formValidate:{},textData:{langList:{cn:!0,en:!0,jp:!0}},ruleValidate:{text:[{validator:e,trigger:"blur"}],path:[{required:!0,message:"The path cannot be empty",trigger:"blur"}],sort:[{required:!0,type:"number",message:"The sort cannot be empty",trigger:"blur"}],width:[{required:!0,type:"number",message:"The width cannot be empty",trigger:"blur"}],level:[{required:!0,type:"number",message:"The level cannot be empty",trigger:"blur"}],status:[{required:!0,type:"number",message:"Please select the status",trigger:"change"}]}}},mounted:function(){var t=this.formValidateObj,e=t.text,a=Object(n["a"])(t,["text"]);this.formValidate=a,this.formValidate.text=m({},e),this.setTextData()},computed:{lang_length:function(){var t=this,e=0;return Object.keys(this.textData.langList).forEach((function(a){t.textData.langList[a]&&e++})),e}},methods:m({},Object(u["b"])(["editData","createData"]),{setTextData:function(){var t=this;Object.keys(this.formValidate.text).forEach((function(e){t.textData.langList[e]=!1}))},handleAdd:function(t){var e=m({},this.formValidate.text);e[t]="",this.textData.langList[t]=!1,this.formValidate.text=m({},e)},handleRemove:function(t){delete this.formValidate.text[t];var e=m({},this.formValidate.text);this.textData.langList[t]=!0,this.formValidate.text=m({},e)},createSubmit:function(t){var e=this;this.modalOpt.loading=!0,this.$refs[t].validate((function(t){if(t){var a="menu",r=e.formValidate;e.createData({model:a,data:r}).then((function(t){t.success&&(e.formValidate=t.data,e.modalOpt.loading=!1,e.modalOpt.flag=!1,e.$emit("createTableData",{modalOpt:e.modalOpt,formValidate:e.formValidate}),e.$Message.success(t.msg))})).catch((function(t){e.$Notice.error({title:t.response.data.msg})}))}else e.$Message.error("Fail!"),e.modalOpt.loading=!1}))},editSubmit:function(t){var e=this;this.modalOpt.loading=!0,this.$refs[t].validate((function(t){if(t){var a="menu",r=e.formValidate;e.editData({model:a,data:r}).then((function(t){t.success&&(e.formValidate=t.data,e.modalOpt.loading=!1,e.modalOpt.flag=!1,e.$emit("updateTableData",{modalOpt:e.modalOpt,formValidate:e.formValidate}),e.$Message.success(t.msg))})).catch((function(t){e.$Notice.error({title:t.response.data.msg})}))}else e.$Message.error("Fail!"),e.modalOpt.loading=!1}))},handleCancel:function(){this.modalOpt.loading=!1,this.modalOpt.flag=!1,this.$emit("modalCancel",this.modalOpt)}})},f=p,b=a("2877"),g=Object(b["a"])(f,c,d,!1,null,null,null),v=g.exports;function y(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function O(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?y(Object(a),!0).forEach((function(e){Object(l["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):y(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var w={components:{myModal:v},data:function(){return{search:{flag:!0,date:["",""],type:"",keywords:"",conditions:{}},total:0,page:1,size:10,loading:!1,tableData:[],tableColumns:[],tableColumnsChecked:{selection:!0,path:!0,sort:!0,width:!0,level:!0,status:!0,action:!0},modalOpt:{index:0,name:"",loading:!1,flag:!1,closable:!1},formValidate:{},formCreateDate:{text:{cn:""},path:"",sort:0,width:0,level:0,status:0}}},watch:{tableColumnsChecked:{handler:function(t,e){this.changeTableColumns()},deep:!0}},mounted:function(){var t=this;this.mockTableData().then((function(e){t.tableData=e})),this.changeTableColumns()},methods:O({},Object(u["b"])(["getList","changeStatus","removeData"]),{mockTableData:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,a,r,s,o,n=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e="menu",a=[],r=this.page,s=this.size,o=this.search.conditions,t.next=3,this.getList({model:e,page:r,size:s,conditions:o}).then((function(t){n.total=t.menu_count,a=t.menu_list})).catch((function(t){n.$Notice.error({title:t.response.data.msg})}));case 3:return t.abrupt("return",Promise.resolve(a));case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),getTableColumns:function(){var t={selection:{type:"selection",align:"center",fixed:"left",width:60},text:{title:"text",key:"text",width:150,render:function(t,e){var a=e.row;return t("span",{},a.text.cn)}},path:{title:"path",key:"path",width:150},sort:{title:"sort",key:"sort",width:150,sortable:!0},width:{title:"width",key:"width",width:150,sortable:!0},level:{title:"level",key:"level",width:150,sortable:!0},status:{title:"status",key:"status",width:150,sortable:!0,render:function(t,e){var a=e.row,r=0===a.status?"warning":1===a.status?"success":"error",s=0===a.status?"Disable":1===a.status?"Success":"Fail";return t("Tag",{props:{type:"dot",color:r}},s)}},action:{title:"Action",slot:"action",width:150,align:"center"}},e=this.tableColumnsChecked,a=[t.text];return Object.keys(e).forEach((function(r){"selection"==r&&e[r]?a.splice(0,0,t[r]):e[r]&&a.push(t[r])})),a},changeTableColumns:function(){this.tableColumns=this.getTableColumns()},dateChange:function(t){var e=this;if(t)this.search.conditions.date=this.search.date;else{var a=this.search.conditions,r=(a.date,Object(n["a"])(a,["date"]));this.search.conditions=r}this.page=1,this.mockTableData().then((function(t){e.tableData=t}))},searchKeywords:function(t){var e=this;if(t){if(!(this.search.type.length>0&&this.search.keywords.length>0))return this.search.type?void this.$Message.warning("未填写关键词"):void this.$Message.warning("未选择类型");this.loading=!0,this.search.conditions.type=this.search.type,this.search.conditions.keywords=this.search.keywords}else{this.loading=!0,this.search.type="",this.search.keywords="";var a=this.search.conditions,r=(a.type,a.keywords,Object(n["a"])(a,["type","keywords"]));this.search.conditions=r}this.page=1,this.mockTableData().then((function(t){e.loading=!1,e.tableData=t}))},setStatus:function(t){var e=this,a=this.$refs["menu"].getSelection();a.length?this.$Modal.confirm({title:"将 status 修改 ".concat(1==t?"Success":"Disable"),onOk:function(){var a=e.$refs["menu"].objData,r="menu",s=[],o=[];Object.keys(a).forEach((function(t){a[t]._isChecked&&(s.push(a[t]._id),o.push(t))})),e.changeStatus({model:r,id_list:s,status:t}).then((function(a){o.forEach((function(a){e.tableData[a].status=t}))})).catch((function(t){e.$Notice.error({title:t.response.data.msg})}))}}):this.$Message.warning("未选择数据")},changePage:function(t){var e=this;this.page=t,this.mockTableData().then((function(t){e.tableData=t}))},changeSize:function(t){var e=this;this.size=t,this.mockTableData().then((function(t){e.tableData=t}))},createShow:function(){this.modalOpt.edit=!1,this.formValidate=this.formCreateDate,this.modalOpt.name="create menu",this.modalOpt.flag=!0},editShow:function(t){this.modalOpt.edit=!0,this.modalOpt.index=t,this.formValidate=this.tableData[t],this.modalOpt.name=this.tableData[t].text.cn,this.modalOpt.flag=!0},remove:function(t){var e=this;this.$Modal.confirm({title:"删除 ".concat(this.tableData[t].text.cn),onOk:function(){var a=e.tableData[t]._id,r="menu";e.removeData({model:r,id:a}).then((function(a){a.success&&(e.tableData.splice(t,1),e.$Message.success(a.msg))})).catch((function(t){e.$Notice.error({title:t.response.data.msg})}))}})},createTableData:function(t){var e=t.modalOpt,a=t.formValidate;this.modalOpt=e,this.tableData.splice(0,0,a)},updateTableData:function(t){var e=t.modalOpt,a=t.formValidate;this.modalOpt=e;var r=Object(o["a"])(this.tableData);r[e.index]=a,this.tableData=r},modalCancel:function(t){this.modalOpt=t}})},k=w,x=(a("a4d8"),Object(b["a"])(k,r,s,!1,null,null,null));e["default"]=x.exports},a4d8:function(t,e,a){"use strict";var r=a("7821"),s=a.n(r);s.a}}]);