(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-05afd42a"],{"53eb":function(e,t,a){"use strict";var l=a("7126"),o=a.n(l);o.a},7126:function(e,t,a){},f7d5:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Card",[a("Card",{staticClass:"switch-card"},[a("Button",{attrs:{type:"success"},on:{click:function(t){return e.setStatus(1)}}},[e._v("Success")])],1),a("Card",{staticClass:"switch-card"},[a("Button",{attrs:{type:"info"},on:{click:function(t){return e.setStatus(0)}}},[e._v("Working")])],1),e._l(e.tableColumnsChecked,(function(t,l){return a("Card",{staticClass:"switch-card"},[e._v(e._s(l)+" "),a("i-switch",{model:{value:e.tableColumnsChecked[l],callback:function(t){e.$set(e.tableColumnsChecked,l,t)},expression:"tableColumnsChecked[k]"}})],1)})),a("Table",{ref:"selection",attrs:{loading:e.loading,data:e.tableData,columns:e.tableColumns,border:""},scopedSlots:e._u([{key:"name",fn:function(t){var l=t.row;return[a("strong",[e._v(e._s(l.name))])]}},{key:"action",fn:function(t){t.row;var l=t.index;return[a("Button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.show(l)}}},[e._v("编辑")])]}}])}),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{staticClass:"table-page",attrs:{total:e.total,current:e.page,"show-elevator":"","show-sizer":""},on:{"on-change":e.changePage,"on-page-size-change":e.changeSize}})],1)])],2),e.modalOpt.flag?a("myModal",{attrs:{modalOptObj:e.modalOpt,formValidateObj:e.formValidate},on:{setTableData:e.setTableData,modalCancel:e.modalCancel}}):e._e()],1)},o=[],s=(a("7f7f"),a("456d"),a("ac6a"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Modal",{attrs:{closable:e.modalOpt.closable,"mask-closable":!1},model:{value:e.modalOpt.flag,callback:function(t){e.$set(e.modalOpt,"flag",t)},expression:"modalOpt.flag"}},[a("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("span",[e._v(e._s(e.modalOpt.name))])]),e._v("\n    "+e._s(e.modalOpt)+"\n    "),a("Form",{ref:"formValidate",attrs:{model:e.formValidate,rules:e.ruleValidate,"label-width":80}},[a("FormItem",{attrs:{label:"Name",prop:"name"}},[a("Input",{attrs:{placeholder:"Enter your name"},model:{value:e.formValidate.name,callback:function(t){e.$set(e.formValidate,"name",t)},expression:"formValidate.name"}})],1),a("FormItem",{attrs:{label:"E-mail",prop:"mail"}},[a("Input",{attrs:{placeholder:"Enter your e-mail"},model:{value:e.formValidate.mail,callback:function(t){e.$set(e.formValidate,"mail",t)},expression:"formValidate.mail"}})],1),a("FormItem",{attrs:{label:"City",prop:"city"}},[a("Select",{attrs:{placeholder:"Select your city"},model:{value:e.formValidate.city,callback:function(t){e.$set(e.formValidate,"city",t)},expression:"formValidate.city"}},[a("Option",{attrs:{value:"beijing"}},[e._v("New York")]),a("Option",{attrs:{value:"shanghai"}},[e._v("London")]),a("Option",{attrs:{value:"shenzhen"}},[e._v("Sydney")])],1)],1),a("FormItem",{attrs:{label:"Date"}},[a("Row",[a("Col",{attrs:{span:"11"}},[a("FormItem",{attrs:{prop:"date"}},[a("DatePicker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.formValidate.date,callback:function(t){e.$set(e.formValidate,"date",t)},expression:"formValidate.date"}})],1)],1),a("Col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}},[e._v("-")]),a("Col",{attrs:{span:"11"}},[a("FormItem",{attrs:{prop:"time"}},[a("TimePicker",{attrs:{type:"time",placeholder:"Select time"},model:{value:e.formValidate.time,callback:function(t){e.$set(e.formValidate,"time",t)},expression:"formValidate.time"}})],1)],1)],1)],1),a("FormItem",{attrs:{label:"Gender",prop:"gender"}},[a("RadioGroup",{model:{value:e.formValidate.gender,callback:function(t){e.$set(e.formValidate,"gender",t)},expression:"formValidate.gender"}},[a("Radio",{attrs:{label:"male"}},[e._v("Male")]),a("Radio",{attrs:{label:"female"}},[e._v("Female")])],1)],1),a("FormItem",{attrs:{label:"Hobby",prop:"interest"}},[a("CheckboxGroup",{model:{value:e.formValidate.interest,callback:function(t){e.$set(e.formValidate,"interest",t)},expression:"formValidate.interest"}},[a("Checkbox",{attrs:{label:"Eat"}}),a("Checkbox",{attrs:{label:"Sleep"}}),a("Checkbox",{attrs:{label:"Run"}}),a("Checkbox",{attrs:{label:"Movie"}})],1)],1),a("FormItem",{attrs:{label:"Desc",prop:"desc"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"Enter something..."},model:{value:e.formValidate.desc,callback:function(t){e.$set(e.formValidate,"desc",t)},expression:"formValidate.desc"}})],1)],1),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{on:{click:function(t){return e.handleCancel()}}},[e._v("取消")]),a("Button",{staticStyle:{"margin-left":"8px"},attrs:{type:"primary",loading:e.modalOpt.loading},on:{click:function(t){return e.handleSubmit("formValidate")}}},[e._v("修改")])],1)],1)],1)}),i=[],n={props:["modalOptObj","formValidateObj"],data:function(){return{modalOpt:this.modalOptObj,formValidate:this.formValidateObj,ruleValidate:{name:[{required:!0,message:"The name cannot be empty",trigger:"blur"}],mail:[{required:!0,message:"Mailbox cannot be empty",trigger:"blur"},{type:"email",message:"Incorrect email format",trigger:"blur"}],city:[{required:!0,message:"Please select the city",trigger:"change"}],gender:[{required:!0,message:"Please select gender",trigger:"change"}],interest:[{required:!0,type:"array",min:1,message:"Choose at least one hobby",trigger:"change"},{type:"array",max:2,message:"Choose two hobbies at best",trigger:"change"}],date:[{required:!0,type:"date",message:"Please select the date",trigger:"change"}],time:[{required:!0,type:"string",message:"Please select time",trigger:"change"}],desc:[{required:!0,message:"Please enter a personal introduction",trigger:"blur"},{type:"string",min:20,message:"Introduce no less than 20 words",trigger:"blur"}]}}},methods:{handleSubmit:function(e){var t=this;this.modalOpt.loading=!0,this.$refs[e].validate((function(e){e?(t.$Message.success("Success!"),setTimeout((function(){t.modalOpt.loading=!1,t.modalOpt.flag=!1,t.$emit("setData",{modalOpt:t.modalOpt,formValidate:t.formValidate}),t.$Message.success("修改成功")}),2e3)):(t.$Message.error("Fail!"),t.modalOpt.loading=!1)}))},handleCancel:function(){this.modalOpt.loading=!1,this.modalOpt.flag=!1,this.formValidate={name:"",mail:"",city:"",gender:"",interest:[],date:"",time:"",desc:""},this.$emit("modalCancel",{modalOpt:this.modalOpt,formValidate:this.formValidate})}}},r=n,c=a("2877"),d=Object(c["a"])(r,s,i,!1,null,null,null),m=d.exports,u={components:{myModal:m},data:function(){return{total:100,page:1,size:10,loading:!1,tableData:[],tableColumns:[],tableColumnsChecked:{selection:!0,description:!0,username:!0,type:!0,tags:!0,member_count:!0,lang:!0,score:!0,keywords:!0,end_at:!0,created_at:!0,updated_at:!0,action:!0},modalOpt:{index:0,name:"",loading:!1,flag:!1,closable:!1},formValidate:{name:"",mail:"",city:"",gender:"",interest:[],date:"",time:"",desc:""}}},watch:{tableColumnsChecked:{handler:function(e,t){this.changeTableColumns()},deep:!0}},mounted:function(){this.tableData=this.mockTableData2(),this.changeTableColumns()},methods:{mockTableData2:function(){var e=[];function t(){return Math.floor(1e4*Math.random()+1)}for(var a=this.total-this.page*this.size>=0?this.size:this.total-(this.page-1)*this.size,l=0;l<a;l++)e.push({title:"title ".concat(t()+""+this.page)+(l+1),description:"description ".concat(t()+""+this.page)+(l+1),username:"username ".concat(t()+""+this.page)+(l+1),type:"supergroup",tags:["tags ".concat(t()),"tags ".concat(t()),"tags ".concat(t())],member_count:t()+t(),lang:"cn",score:t(),keywords:["keywords ".concat(t()),"keywords ".concat(t()),"keywords ".concat(t())],end_at:t()+t()+t()});return console.log(JSON.stringify(e)),e},getTable2Columns:function(){var e={selection:{type:"selection",align:"center",fixed:"left",width:60},title:{title:"title",key:"title",align:"center",fixed:"left",width:120,sortable:!0},description:{title:"description",key:"description",width:150,sortable:!0},username:{title:"username",key:"username",width:150,sortable:!0},type:{title:"type",key:"type",width:150,sortable:!0},tags:{title:"tags",key:"tags",width:150,sortable:!0},member_count:{title:"member_count",key:"member_count",width:150,sortable:!0},lang:{title:"lang",key:"lang",width:150,sortable:!0},score:{title:"score",key:"score",width:150,sortable:!0},keywords:{title:"keywords",key:"keywords",width:150,sortable:!0},end_at:{title:"end_at",key:"end_at",width:150,sortable:!0},created_at:{title:"created_at",key:"created_at",width:150,sortable:!0},updated_at:{title:"updated_at",key:"updated_at",width:150,sortable:!0},action:{title:"Action",slot:"action",width:120,align:"center"}},t=this.tableColumnsChecked,a=[e.title];return Object.keys(t).forEach((function(l){"selection"==l&&t[l]?a.splice(0,0,e[l]):t[l]&&a.push(e[l])})),a},changeTableColumns:function(){this.tableColumns=this.getTable2Columns()},setStatus:function(e){var t=this,a=this.$refs.selection.getSelection();if(a.length){var l=[];a.forEach((function(e){l.push(e.name)})),console.log(l),this.loading=!0,setTimeout((function(){t.loading=!1}),2e3);var o=this.$refs.selection.data,s=this.$refs.selection.objData;Object.keys(s).forEach((function(t){s[t]._isChecked&&(o[t].status=e)}))}else this.$Message.warning("未选择数据")},changePage:function(e){console.log(e),this.page=e,this.tableData=this.mockTableData2()},changeSize:function(e){this.size=e,this.tableData=this.mockTableData2()},show:function(e){this.modalOpt.index=e,this.modalOpt.name=this.tableData[e].name,this.modalOpt.flag=!0},setTableData:function(e){var t=e.modalOpt,a=e.formValidate;this.modalOpt=t,console.log(a)},modalCancel:function(e){var t=e.modalOpt,a=e.formValidate;this.modalOpt=t,this.formValidate=a}}},h=u,p=(a("53eb"),Object(c["a"])(h,l,o,!1,null,null,null));t["default"]=p.exports}}]);