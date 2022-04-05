(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{100:function(t,e,n){t.exports={error:"Login_error__22fPE"}},155:function(t,e,n){},156:function(t,e,n){},185:function(t,e,n){"use strict";n.r(e);var a=n(0),c=n.n(a),i=n(23),o=n.n(i);n(155),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(156);var r,s,l=n(30),u=n(21),d=n(17),j=n(120),b=n.n(j).a.create(Object(d.a)({baseURL:"https://social-network.samuraijs.com/api/1.1/"},{withCredentials:!0,headers:{"API-KEY":"3ffd8bee-6a2a-4b2d-9367-b8070697f4c5"}})),O=function(){return b.get("todo-lists")},f=function(t){return b.post("todo-lists",{title:t})},h=function(t){return b.delete("todo-lists/".concat(t))},m=function(t,e){return b.put("todo-lists/".concat(t),{title:e})},p=function(t){return b.get("todo-lists/".concat(t,"/tasks"))},T=function(t,e){return b.post("todo-lists/".concat(t,"/tasks"),{title:e})},g=function(t,e,n){return b.put("todo-lists/".concat(t,"/tasks/").concat(e),n)},v=function(t,e){return b.delete("todo-lists/".concat(t,"/tasks/").concat(e))},x=function(t){return b.post("auth/login",t)},I=function(){return b.get("auth/me")},S=function(){return b.delete("auth/login")};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(r||(r={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(s||(s={}));var k=function(t,e){t(w(e)),t(A("failed"))},D=function(t,e){e.messages.length?t(w(e.messages[0])):t(w("Some error occurred")),t(A("failed"))},y={isLoggedIn:!1},C=function(t){return{type:"login/SET-IS-LOGGED-IN",value:t}},E={status:"loading",error:null,isInitialized:!1},A=function(t){return{type:"APP/SET-STATUS",status:t}},w=function(t){return{type:"APP/SET-ERROR",error:t}},L=[],N=n(5),P={},R=n(16),B=n(270),G=n(282),K=n(256),U=n(1),H=c.a.memo((function(t){var e=Object(a.useState)(""),n=Object(R.a)(e,2),c=n[0],i=n[1],o=Object(a.useState)(null),r=Object(R.a)(o,2),s=r[0],l=r[1];return Object(U.jsxs)("div",{children:[Object(U.jsx)(B.a,{id:"outlined-basic",label:"Title",variant:"outlined",size:"small",helperText:s,error:!!s,value:c,onChange:function(t){i(t.currentTarget.value)},onKeyPress:function(e){null!==s&&l(""),"Enter"===e.key&&""!==c.trim()&&(t.callBack(c),i(""))},className:s?"error":"",disabled:t.entityStatus}),Object(U.jsx)(G.a,{color:"primary",onClick:function(){return function(e){""!==e.trim()?(t.callBack(e),i("")):l("Title is required")}(c)},disabled:t.entityStatus,children:Object(U.jsx)(K.a,{})})]})})),M=n(260),F=n(261),z=n(252),V=c.a.memo((function(t){var e=Object(a.useState)(!1),n=Object(R.a)(e,2),c=n[0],i=n[1],o=Object(a.useState)(t.title),r=Object(R.a)(o,2),s=r[0],l=r[1];return c?Object(U.jsx)("input",{value:s,onChange:function(t){l(t.currentTarget.value)},autoFocus:!0,onBlur:function(){i(!1),t.callBack(s)},onKeyPress:function(e){"Enter"===e.key&&(t.callBack(s),i(!1))}}):Object(U.jsx)("span",{onDoubleClick:function(){i(!0)},children:t.title})})),Z=n(258),_=n(257),q=c.a.memo((function(t){var e=t.task,n=t.removeTask,a=t.changeStatus,c=t.updateTask;return Object(U.jsxs)("li",{children:[Object(U.jsx)("input",{className:e.status===r.Completed?"is-done":"",type:"checkbox",checked:e.status===r.Completed,onChange:function(t){return function(t,e){var n=t.currentTarget.checked;a(n?r.Completed:r.New,e)}(t,e.id)}}),Object(U.jsx)(V,{title:e.title,callBack:function(t){return function(t,e){c(t,e)}(e.id,t)}}),Object(U.jsx)(_.a,{"aria-label":"delete",children:Object(U.jsx)(Z.a,{onClick:function(){return t=e.id,void n(t);var t}})})]},e.id)})),Y=n(259),J=c.a.memo((function(t){var e=Object(l.b)();Object(a.useEffect)((function(){var n;e((n=t.todolistID,function(t){t(A("loading")),p(n).then((function(e){t(A("succeeded"));var a=e.data.items;t(function(t,e){return{type:"SET-TASKS",todolistId:t,tasks:e}}(n,a))})).catch((function(e){k(t,e.message)}))}))}),[]);var n=Object(a.useCallback)((function(e,n){t.changeFilter(e,n)}),[t.changeFilter]),c=Object(a.useCallback)((function(e){t.addTask(e,t.todolistID)}),[t.addTask,t.todolistID]),i=Object(a.useCallback)((function(e){t.removeTask(e,t.todolistID)}),[]),o=Object(a.useCallback)((function(e,n){t.changeStatus(t.todolistID,n,e)}),[]),s=Object(a.useCallback)((function(e,n){t.updateTask(t.todolistID,e,n)}),[]),u=t.tasks;return"active"===t.filter&&(u=u.filter((function(t){return t.status===r.New}))),"completed"===t.filter&&(u=u.filter((function(t){return t.status===r.Completed}))),Object(U.jsxs)("div",{children:[Object(U.jsxs)("h3",{children:[Object(U.jsx)(V,{title:t.title,callBack:function(e){t.updateTitleTodolist(e,t.todolistID)}}),Object(U.jsx)(_.a,{"aria-label":"delete",disabled:"loading"===t.entityStatus,children:Object(U.jsx)(Z.a,{onClick:function(){t.removeTodolist(t.todolistID)}})})]}),Object(U.jsx)(H,{callBack:c,entityStatus:"loading"===t.entityStatus}),Object(U.jsx)("ul",{children:u.map((function(t){return Object(U.jsx)(q,{task:t,removeTask:i,changeStatus:o,updateTask:s},t.id)}))}),Object(U.jsxs)("div",{children:[Object(U.jsx)(Y.a,{variant:"all"===t.filter?"contained":"outlined",onClick:function(){return n("all",t.todolistID)},children:"All"}),Object(U.jsx)(Y.a,{variant:"active"===t.filter?"contained":"outlined",onClick:function(){return n("active",t.todolistID)},children:"Active"}),Object(U.jsx)(Y.a,{variant:"completed"===t.filter?"contained":"outlined",onClick:function(){return n("completed",t.todolistID)},children:"Completed"})]})]})})),W=n(18),$=function(){var t=Object(l.c)((function(t){return t.todolists})),e=Object(l.c)((function(t){return t.login.isLoggedIn})),n=Object(l.c)((function(t){return t.tasks})),c=Object(l.b)();Object(a.useEffect)((function(){e&&c((function(t,e){t(A("loading")),O().then((function(e){t(A("succeeded")),t({type:"SET-TODOLISTS",todolists:e.data})}))}))}),[]);var i=Object(a.useCallback)((function(t,e){var n,a;c((n=e,a=t,function(t){t(A("loading")),v(n,a).then((function(e){0===e.data.resultCode?(t(A("succeeded")),t({type:"REMOVE-TASK",id:a,todolistID:n})):D(t,e.data)})).catch((function(e){k(t,e.message)}))}))}),[c]),o=Object(a.useCallback)((function(t,e){c(function(t,e){return function(n){n(A("loading")),T(t,e).then((function(t){if(0===t.data.resultCode){n(A("succeeded"));var e=t.data.data.item;n(function(t){return{type:"ADD-TASK",task:t}}(e))}else D(n,t.data)})).catch((function(t){k(n,t.message)}))}}(e,t))}),[c]),r=Object(a.useCallback)((function(t,e,n){c(function(t,e,n){return function(a,c){var i=c().tasks[t].find((function(t){return t.id===e?e:""}));if(i){var o={title:i.title,description:i.description,status:n,priority:i.priority,deadline:i.deadline,startDate:i.startDate};a(A("loading")),g(t,e,o).then((function(c){0===c.data.resultCode?(a(A("succeeded")),a(function(t,e,n){return{type:"CHANGE-STATUS-TASK",status:n,id:e,todolistID:t}}(t,e,n))):D(a,c.data)})).catch((function(t){k(a,t.message)}))}}}(t,e,n))}),[c]),s=Object(a.useCallback)((function(t,e,n){c(function(t,e,n){return function(a,c){var i=c().tasks[t].find((function(t){return t.id===e?e:""}));if(i){var o={title:n,description:i.description,status:i.status,priority:i.priority,deadline:i.deadline,startDate:i.startDate};a(A("loading")),g(t,e,o).then((function(c){0===c.data.resultCode?(a(A("succeeded")),a(function(t,e,n){return{type:"CHANGE-TITLE-TASK",todolistID:t,id:e,title:n}}(t,e,n))):D(a,c.data)})).catch((function(t){k(a,t.message)}))}}}(t,e,n))}),[c]),u=Object(a.useCallback)((function(t,e){c(function(t,e){return{type:"CHANGE-FILTER-TODOLIST",value:t,todolistID:e}}(t,e))}),[c]),d=Object(a.useCallback)((function(t){c(function(t){return function(e){e(A("loading")),f(t).then((function(t){0===t.data.resultCode?(e(A("succeeded")),e({type:"ADD-TODOLIST",todolist:t.data.data.item})):D(e,t.data)})).catch((function(t){k(e,t.message)}))}}(t))}),[c]),j=Object(a.useCallback)((function(t,e){c(function(t,e){return function(n){n(A("loading")),m(e,t).then((function(a){0===a.data.resultCode?(n(A("succeeded")),n(function(t,e){return{type:"UPDATE-TITLE-TODOLIST",title:e,todolistID:t}}(e,t))):D(n,a.data)})).catch((function(t){k(n,t.message)}))}}(t,e))}),[c]),b=Object(a.useCallback)((function(t){var e;c((e=t,function(t){t(A("loading")),t({type:"CHANGE-TODOLIST-ENTITY-STATUS",todolistID:e,entityStatus:"loading"}),h(e).then((function(n){0===n.data.resultCode?(t(A("succeeded")),t(function(t){return{type:"REMOVE-TODOLIST",todolistID:t}}(e))):D(t,n.data)})).catch((function(e){k(t,e.message)}))}))}),[c]);return e?Object(U.jsx)("div",{className:"App",children:Object(U.jsxs)(M.a,{fixed:!0,children:[Object(U.jsx)(F.a,{container:!0,style:{padding:"20px"},children:Object(U.jsx)(H,{callBack:d})}),Object(U.jsx)(F.a,{container:!0,spacing:3,children:t.map((function(t){return Object(U.jsx)(F.a,{item:!0,children:Object(U.jsx)(z.a,{style:{padding:"10px",width:"300px",display:"flex-row",margin:"20px"},children:Object(U.jsx)(J,{todolistID:t.id,title:t.title,entityStatus:t.entityStatus,tasks:n[t.id],removeTask:i,changeFilter:u,addTask:o,changeStatus:r,filter:t.filter,updateTask:s,updateTitleTodolist:j,removeTodolist:b},t.id)})},t.id)}))})]})}):Object(U.jsx)(W.a,{to:"login"})},Q=n(265),X=n(278),tt=n(272),et=c.a.forwardRef((function(t,e){return Object(U.jsx)(tt.a,Object(d.a)({elevation:6,ref:e,variant:"filled"},t))}));function nt(){var t=Object(l.b)(),e=Object(l.c)((function(t){return t.app.error})),n=function(e,n){"clickaway"!==n&&t(w(null))};return Object(U.jsx)(X.a,{open:!!e,autoHideDuration:6e3,onClose:n,children:Object(U.jsx)(et,{onClose:n,severity:"error",sx:{width:"100%"},children:e})})}var at=n(283),ct=n(266),it=n(268),ot=n(267),rt=n(280),st=n(279),lt=n(273),ut=n(274),dt=n(275),jt=n(286),bt=n(263),Ot=n(269),ft=n(131),ht=n(100),mt=n.n(ht),pt=function(){var t=Object(l.b)(),e=Object(l.c)((function(t){return t.login.isLoggedIn})),n=Object(ft.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password?t.password.length<3&&(e.password="Password must be 3 or more characters"):e.password="Required",e},onSubmit:function(e){var n;t((n=e,function(t){t(A("loading")),x(n).then((function(e){0===e.data.resultCode?(t(A("succeeded")),t(C(!0))):D(t,e.data)})).catch((function(e){k(t,e.message)}))}))}});return e?Object(U.jsx)(W.a,{to:"/"}):Object(U.jsx)(st.a,{container:!0,justifyContent:"center",children:Object(U.jsx)(st.a,{item:!0,justifyContent:"center",children:Object(U.jsx)("form",{onSubmit:n.handleSubmit,children:Object(U.jsxs)(ut.a,{children:[Object(U.jsxs)(bt.a,{children:[Object(U.jsxs)("p",{children:["To log in get registered",Object(U.jsx)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",children:" here"})]}),Object(U.jsx)("p",{children:"or use common test account credentials:"}),Object(U.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(U.jsx)("p",{children:"Password: free"})]}),Object(U.jsxs)(jt.a,{children:[Object(U.jsx)(Ot.a,{label:"Email",margin:"normal",name:"email",onChange:n.handleChange,value:n.values.email,onBlur:n.handleBlur}),n.touched.email&&n.errors.email&&Object(U.jsx)("div",{className:mt.a.error,children:n.errors.email}),Object(U.jsx)(Ot.a,{type:"password",label:"Password",margin:"normal",name:"password",onChange:n.handleChange,value:n.values.password,onBlur:n.handleBlur}),n.touched.password&&n.errors.password&&Object(U.jsx)("div",{className:mt.a.error,children:n.errors.password}),Object(U.jsx)(dt.a,{label:"Remember me",control:Object(U.jsx)(lt.a,{onChange:n.handleChange,checked:n.values.rememberMe,name:"rememberMe"})}),Object(U.jsx)(rt.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})]})})})})},Tt=function(){var t=Object(l.c)((function(t){return t.app.status})),e=Object(l.b)(),n=Object(l.c)((function(t){return t.app.isInitialized})),c=Object(l.c)((function(t){return t.login.isLoggedIn}));return Object(a.useEffect)((function(){e((function(t){t(A("loading")),I().then((function(e){0===e.data.resultCode?(t(A("succeeded")),t(C(!0))):D(t,e.data)})).catch((function(e){k(t,e.message)})).finally((function(){t({type:"APP/SET-INITIALIZED",isInitialized:!0})}))}))}),[]),n?Object(U.jsxs)("div",{children:[Object(U.jsx)(nt,{}),Object(U.jsx)(at.a,{position:"static",children:Object(U.jsxs)(ct.a,{children:[Object(U.jsx)(G.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(U.jsx)(ot.a,{})}),Object(U.jsx)(it.a,{variant:"h6"}),c?Object(U.jsx)(rt.a,{color:"inherit",onClick:function(){e((function(t){t(A("loading")),S().then((function(e){0===e.data.resultCode?(t(A("succeeded")),t(C(!1))):D(t,e.data)})).catch((function(e){k(t,e.message)}))}))},children:"LogOut"}):Object(U.jsx)(rt.a,{color:"inherit",children:"Login"})]})}),"loading"===t&&Object(U.jsx)(Q.a,{color:"secondary"}),Object(U.jsx)(M.a,{fixed:!0,children:Object(U.jsxs)(W.d,{children:[Object(U.jsx)(W.b,{path:"/",element:Object(U.jsx)($,{})}),Object(U.jsx)(W.b,{path:"/login",element:Object(U.jsx)(pt,{})}),Object(U.jsx)(W.b,{path:"/404",element:Object(U.jsx)("h1",{children:"404: PAGE NOT FOUND"})}),Object(U.jsx)(W.b,{path:"*",element:Object(U.jsx)(W.a,{to:"/404"})})]})})]}):Object(U.jsx)(Q.a,{color:"secondary"})},gt=n(89),vt=n(130),xt=Object(gt.b)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":return Object(d.a)(Object(d.a)({},t),{},Object(N.a)({},e.todolistID,t[e.todolistID].filter((function(t){return t.id!==e.id}))));case"ADD-TASK":return Object(d.a)(Object(d.a)({},t),{},Object(N.a)({},e.task.todoListId,[e.task].concat(Object(u.a)(t[e.task.todoListId]))));case"CHANGE-STATUS-TASK":return Object(d.a)(Object(d.a)({},t),{},Object(N.a)({},e.todolistID,t[e.todolistID].map((function(t){return t.id===e.id?Object(d.a)(Object(d.a)({},t),{},{status:e.status}):t}))));case"CHANGE-TITLE-TASK":return Object(d.a)(Object(d.a)({},t),{},Object(N.a)({},e.todolistID,t[e.todolistID].map((function(t){return t.id===e.id?Object(d.a)(Object(d.a)({},t),{},{title:e.title}):t}))));case"ADD-TODOLIST":return Object(d.a)(Object(d.a)({},t),{},Object(N.a)({},e.todolist.id,[]));case"REMOVE-TODOLIST":var n=Object(d.a)({},t);return delete n[e.todolistID],n;case"SET-TODOLISTS":var a=Object(d.a)({},t);return e.todolists.forEach((function(t){return a[t.id]=[]})),a;case"SET-TASKS":var c=Object(d.a)({},t);return c[e.todolistId]=e.tasks,c;default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.todolistID}));case"ADD-TODOLIST":var n=Object(d.a)(Object(d.a)({},e.todolist),{},{filter:"all",entityStatus:"idle"});return[n].concat(Object(u.a)(t));case"CHANGE-FILTER-TODOLIST":return t.map((function(t){return t.id===e.todolistID?Object(d.a)(Object(d.a)({},t),{},{filter:e.value}):t}));case"UPDATE-TITLE-TODOLIST":return t.map((function(t){return t.id===e.todolistID?Object(d.a)(Object(d.a)({},t),{},{title:e.title}):t}));case"SET-TODOLISTS":return e.todolists.map((function(t){return Object(d.a)(Object(d.a)({},t),{},{filter:"all",entityStatus:"idle"})}));case"CHANGE-TODOLIST-ENTITY-STATUS":return t.map((function(t){return t.id===e.todolistID?Object(d.a)(Object(d.a)({},t),{},{entityStatus:e.entityStatus}):t}));default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"APP/SET-STATUS":return Object(d.a)(Object(d.a)({},t),{},{status:e.status});case"APP/SET-ERROR":return Object(d.a)(Object(d.a)({},t),{},{error:e.error});case"APP/SET-INITIALIZED":return Object(d.a)(Object(d.a)({},t),{},{isInitialized:e.isInitialized});default:return t}},login:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"login/SET-IS-LOGGED-IN":return Object(d.a)(Object(d.a)({},t),{},{isLoggedIn:e.value});default:return t}}}),It=Object(gt.c)(xt,Object(gt.a)(vt.a));window.store=It;var St=n(67);o.a.render(Object(U.jsx)(St.a,{children:Object(U.jsx)(l.a,{store:It,children:Object(U.jsx)(Tt,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[185,1,2]]]);
//# sourceMappingURL=main.abe9c9ab.chunk.js.map