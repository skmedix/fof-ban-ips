module.exports=function(t){var n={};function a(s){if(n[s])return n[s].exports;var e=n[s]={i:s,l:!1,exports:{}};return t[s].call(e.exports,e,e.exports,a),e.l=!0,e.exports}return a.m=t,a.c=n,a.d=function(t,n,s){a.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:s})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,n){if(1&n&&(t=a(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var e in t)a.d(s,e,function(n){return t[n]}.bind(null,e));return s},a.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(n,"a",n),n},a.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},a.p="",a(a.s=23)}([function(t,n){t.exports=flarum.core.compat.Model},function(t,n){t.exports=flarum.core.compat["components/Button"]},function(t,n,a){"use strict";function s(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n}a.d(n,"a",function(){return s})},function(t,n){t.exports=flarum.core.compat["components/Alert"]},function(t,n){t.exports=flarum.core.compat["helpers/punctuateSeries"]},function(t,n){t.exports=flarum.core.compat["helpers/username"]},function(t,n){t.exports=flarum.core.compat.extend},function(t,n){t.exports=flarum.core.compat["components/Modal"]},function(t,n,a){"use strict";a.d(n,"a",function(){return h});var s=a(2),e=a(7),i=a.n(e),r=a(1),o=a.n(r),p=a(3),d=a.n(p),l=a(4),u=a.n(l),h=(a(5),function(t){function n(){return t.apply(this,arguments)||this}Object(s.a)(n,t);var a=n.prototype;return a.init=function(){if(this.address=this.props.address,this.post=this.props.post,this.user=this.props.user||this.post&&this.post.user(),!this.user&&this.address){var t=app.store.getBy("banned_ips","address",this.address);t&&(this.user=t.user())}this.banOptions=[],(this.post||this.address)&&this.banOptions.push("only"),this.user&&this.banOptions.push("all"),this.banOption=m.prop(this.banOptions[0]),this.reason=m.prop(""),this.otherUsers={},this.loading=!1},a.className=function(){return"Modal--medium"},a.title=function(){return app.translator.trans("fof-ban-ips.lib.modal.title")},a.content=function(){var t=this,n=this.otherUsers[this.banOption()],a=n&&n.map(function(t){return t&&t.displayName()||app.translator.trans("core.lib.username.deleted_text")});return m("div",{className:"Modal-body"},m("p",null,app.translator.trans("fof-ban-ips.lib.modal.ban_ip_confirmation")),m("div",{className:"Form-group"},this.banOptions.map(function(n){return m("div",null,m("input",{type:"radio",name:"ban-option",id:"ban-option-"+n,checked:t.banOption()===n,onclick:t.banOption.bind(t,n)})," ",m("label",{htmlFor:"ban-option-"+n},app.translator.trans("fof-ban-ips.forum.modal.ban_options_"+n+"_ip",{user:t.user,ip:t.address||t.post&&t.post.ipAddress()})))})),m("div",{className:"Form-group"},m("label",{className:"label"},app.translator.trans("fof-ban-ips.lib.modal.reason_label")),m("input",{type:"text",className:"FormControl",bidi:this.reason})),n?n.length?d.a.component({children:app.translator.transChoice("fof-ban-ips.lib.modal.ban_ip_users",a.length,{users:u()(a)}),dismissible:!1}):d.a.component({children:app.translator.trans("fof-ban-ips.forum.modal.ban_ip_no_users"),dismissible:!1,type:"success"}):"",n&&m("br",null),m("div",{className:"Form-group"},m(o.a,{className:"Button Button--primary",type:"submit",loading:this.loading},a?app.translator.trans("fof-ban-ips.lib.modal.ban_button"):app.translator.trans("fof-ban-ips.lib.modal.check_button"))))},a.onsubmit=function(t){var n=this;if(t.preventDefault(),this.loading=!0,void 0===this.otherUsers[this.banOption()])return this.getOtherUsers();var a={reason:this.reason(),userId:this.user.id()};"only"===this.banOption()?(a.address=this.post.ipAddress(),app.store.createRecord("banned_ips").save(a).then(this.done.bind(this)).then(this.hide.bind(this),this.onerror.bind(this),this.loaded.bind(this))):"all"===this.banOption()&&app.request({data:{data:{attributes:a}},url:""+app.forum.attribute("apiUrl")+this.user.apiEndpoint()+"/ban",method:"POST",errorHandler:this.onerror.bind(this)}).then(function(t){return app.store.pushPayload(t).forEach(n.done.bind(n))}).then(this.hide.bind(this)).catch(function(){}).then(this.loaded.bind(this))},a.getOtherUsers=function(){var t=this,n={};"only"===this.banOption()&&(n.ip=this.address||this.post.ipAddress()),app.request({data:n,url:app.forum.attribute("apiUrl")+"/fof/ban-ips/check-users/"+this.user.id(),method:"GET",errorHandler:this.onerror.bind(this)}).then(function(n){t.otherUsers[t.banOption()]=n.data.map(function(t){return app.store.pushObject(t)}).filter(function(t){return 0===t.bannedIPs().length}),t.loading=!1}).catch(function(){}).then(this.loaded.bind(this))},a.done=function(t){var n={type:"banned_ips",id:t.id()};this.post&&(this.post.data.relationships.banned_ip={data:n}),this.user.data.relationships.banned_ips||(this.user.data.relationships.banned_ips={data:[]}),this.user.data.relationships.banned_ips.data.push(n),this.user.data.attributes.isBanned=!0,app.store.pushObject(this.user.data)},n}(i.a))},function(t,n,a){"use strict";a.d(n,"a",function(){return l});var s=a(2),e=a(1),i=a.n(e),r=a(3),o=a.n(r),p=a(4),d=a.n(p),l=(a(5),function(t){function n(){return t.apply(this,arguments)||this}Object(s.a)(n,t);var a=n.prototype;return a.title=function(){return app.translator.trans("fof-ban-ips.lib.modal.unban_title")},a.content=function(){var t=this,n=this.otherUsers[this.banOption()],a=n&&n.map(function(t){return t&&t.displayName()||app.translator.trans("core.lib.username.deleted_text")});return this.bannedIPs?m("div",{className:"Modal-body"},o.a.component({children:app.translator.trans("fof-ban-ips.lib.modal.unbanned_ips",{ips:d()(this.bannedIPs)}),dismissible:!1,type:"success"})):m("div",{className:"Modal-body"},m("p",null,app.translator.trans("fof-ban-ips.lib.modal.unban_ip_confirmation")),m("div",{className:"Form-group"},this.banOptions.map(function(n){return m("div",null,m("input",{type:"radio",name:"ban-option",id:"ban-option-"+n,checked:t.banOption()===n,onclick:t.banOption.bind(t,n)})," ",m("label",{htmlFor:"ban-option-"+n},app.translator.trans("fof-ban-ips.lib.modal.unban_options_"+n+"_ip",{user:t.user,ip:t.address||t.post&&t.post.ipAddress()})))})),n?n.length?o.a.component({children:app.translator.transChoice("fof-ban-ips.lib.modal.unban_ip_users",a.length,{users:d()(a)}),dismissible:!1}):o.a.component({children:app.translator.trans("fof-ban-ips.lib.modal.unban_ip_no_users"),dismissible:!1,type:"success"}):"",n&&m("br",null),m("div",{className:"Form-group"},m(i.a,{className:"Button Button--primary",type:"submit",loading:this.loading},a?app.translator.trans("fof-ban-ips.lib.modal.unban_button"):app.translator.trans("fof-ban-ips.lib.modal.check_button"))))},a.onsubmit=function(t){if(t.preventDefault(),this.loading=!0,void 0===this.otherUsers[this.banOption()])return this.getOtherUsers();var n={};if("only"===this.banOption()){n.address=this.address||this.post.ipAddress();var a=this.post?this.post.bannedIP():app.store.getBy("banned_ips","address",this.address);a.delete().then(this.done.bind(this,a)).catch(this.onerror.bind(this)).then(this.hide.bind(this))}else"all"===this.banOption()&&app.request({data:{data:{attributes:n}},url:""+app.forum.attribute("apiUrl")+this.user.apiEndpoint()+"/unban",method:"POST",errorHandler:this.onerror.bind(this)}).then(this.done.bind(this)).catch(this.onerror.bind(this)).then(this.hide.bind(this))},a.getOtherUsers=function(){var t=this,n={};"only"===this.banOption()&&(n.ip=this.address||this.post.ipAddress(),n.skipValidation=!0);var a=app.forum.attribute("apiUrl")+"/fof/ban-ips/check-users";this.user&&(a+="/"+this.user.id()),app.request({data:n,url:a,method:"GET",errorHandler:this.onerror.bind(this)}).then(function(n){var a=app.store.pushPayload(n);t.otherUsers[t.banOption()]=a.filter(function(t){return 1===t.bannedIPs().length}),t.loading=!1,m.lazyRedraw()}).catch(function(){}).then(this.loaded.bind(this))},a.done=function(t){this.loading=!1,this.post&&delete this.post.data.relationships.banned_ip,this.user&&!this.user.data.relationships&&(t instanceof app.store.models.banned_ips?(this.user.data.relationships.banned_ips={data:this.user.data.relationships.banned_ips.data.filter(function(n){return n.id!==t.id()})},this.user.data.attributes.isBanned=0!==this.user.data.relationships.banned_ips.data.length):t||(this.user.data.relationships.banned_ips.data=[],this.user.data.attributes.isBanned=!1)),t&&Array.isArray(t.data)&&(this.bannedIPs=t.data.map(function(t){return t.attributes.address}),this.loading=!1,m.lazyRedraw())},a.hide=function(){t.prototype.hide.call(this),this.props.redraw||location.reload()},n}(a(8).a))},function(t,n,a){"use strict";a.d(n,"a",function(){return o});var s=a(2),e=a(0),i=a.n(e),r=a(11),o=function(t){function n(){return t.apply(this,arguments)||this}return Object(s.a)(n,t),n.prototype.apiEndpoint=function(){return"/fof/ban-ips"+(this.exists?"/"+this.id():"")},n}(a.n(r)()(i.a,{creator:i.a.hasOne("creator"),user:i.a.hasOne("user"),address:i.a.attribute("address"),reason:i.a.attribute("reason"),createdAt:i.a.attribute("createdAt",i.a.transformDate),deletedAt:i.a.attribute("deletedAt",i.a.transformDate)}))},function(t,n){t.exports=flarum.core.compat["utils/mixin"]},,,,,function(t,n){t.exports=flarum.core.compat["components/PermissionGrid"]},function(t,n){t.exports=flarum.core.compat["components/AdminNav"]},function(t,n){t.exports=flarum.core.compat["components/AdminLinkButton"]},function(t,n){t.exports=flarum.core.compat["components/LoadingIndicator"]},function(t,n){t.exports=flarum.core.compat["components/Placeholder"]},function(t,n){t.exports=flarum.core.compat["components/Page"]},function(t,n){t.exports=flarum.core.compat.Component},function(t,n,a){"use strict";a.r(n);var s=a(0),e=a.n(s),i=a(10),r=a(6),o=a(16),p=a.n(o),d=a(17),l=a.n(d),u=a(18),h=a.n(u),c=a(2),f=a(1),b=a.n(f),g=a(19),v=a.n(g),_=a(20),y=a.n(_),O=a(21),N=a.n(O),A=a(7),x=a.n(A),B=a(3),F=a.n(B),P=a(4),j=a.n(P),w=a(5),k=a.n(w),I=function(t){function n(){return t.apply(this,arguments)||this}Object(c.a)(n,t);var a=n.prototype;return a.init=function(){this.address=m.prop(""),this.reason=m.prop(""),this.usersBanned={},this.loading=!1},a.className=function(){return"Modal--medium"},a.title=function(){return app.translator.trans("fof-ban-ips.lib.modal.title")},a.content=function(){var t=this.usersBanned[this.address()],n=t&&t.map(k.a);return m("div",{className:"Modal-body"},m("p",null,app.translator.trans("fof-ban-ips.lib.modal.ban_ip_confirmation")),m("div",{className:"Form-group"},m("label",{className:"label"},app.translator.trans("fof-ban-ips.lib.modal.address_label")),m("input",{type:"text",className:"FormControl",bidi:this.address,required:!0,pattern:"^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\\-]*[A-Za-z0-9])$|^\\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))(%.+)?\\s*$"})),m("div",{className:"Form-group"},m("label",{className:"label"},app.translator.trans("fof-ban-ips.lib.modal.reason_label")),m("input",{type:"text",className:"FormControl",bidi:this.reason})),t?t.length?F.a.component({children:app.translator.transChoice("fof-ban-ips.lib.modal.ban_ip_users",n.length,{users:j()(n)}),dismissible:!1}):F.a.component({children:app.translator.trans("fof-ban-ips.admin.modal.ban_ip_no_users"),dismissible:!1,type:"success"}):"",t&&m("br",null),m("div",{className:"Form-group"},m(b.a,{className:"Button Button--primary",type:"submit",loading:this.loading,disabled:app.store.getBy("banned_ips","address",this.address())},n?app.translator.trans("fof-ban-ips.lib.modal.ban_button"):app.translator.trans("fof-ban-ips.lib.modal.check_button"))))},a.onsubmit=function(t){if(t.preventDefault(),this.address()){if(this.loading=!0,void 0===this.usersBanned[this.address()])return this.getOtherUsers();var n={address:this.address(),reason:this.reason()};app.store.createRecord("banned_ips").save(n).then(this.hide.bind(this),this.onerror.bind(this),this.loaded.bind(this))}},a.getOtherUsers=function(){var t=this,n={ip:this.address()};app.request({data:n,url:app.forum.attribute("apiUrl")+"/fof/ban-ips/check-users",method:"GET"}).then(function(n){t.usersBanned[t.address()]=n.data.map(function(t){return app.store.pushObject(t)}),m.lazyRedraw()}).then(this.loaded.bind(this)).catch(function(n){t.onerror(n),t.loading=!1})},n}(x.a),U=a(22),z=a.n(U),R=a(9),M=function(t){function n(){return t.apply(this,arguments)||this}Object(c.a)(n,t);var a=n.prototype;return a.init=function(){this.item=this.props.item,this.reason=m.prop(this.item.reason())},a.className=function(){return"Modal--medium"},a.title=function(){return app.translator.trans("fof-ban-ips.admin.modal.update_title")},a.content=function(){return m("div",{className:"Modal-body"},m("div",{className:"Form-group"},m("label",{className:"label"},app.translator.trans("fof-ban-ips.lib.modal.reason_label")),m("input",{type:"text",className:"FormControl",bidi:this.reason})),m("div",{className:"Form-group"},m(b.a,{className:"Button Button--primary",type:"submit",loading:this.loading,disabled:this.reason()===this.item.reason()},app.translator.trans("fof-ban-ips.lib.modal.save_button"))))},a.onsubmit=function(t){t.preventDefault(),this.reason()&&(this.loading=!0,this.item.save({reason:this.reason()}).then(this.hide.bind(this)).catch(this.onerror.bind(this)).then(this.loaded.bind(this)))},n}(x.a),S=function(t){function n(){return t.apply(this,arguments)||this}Object(c.a)(n,t);var a=n.prototype;return a.init=function(){this.item=this.props.bannedIP},a.view=function(){var t=this;return m("tr",null,m("td",null,this.item.id()),m("td",null,k()(this.item.creator())),m("td",null,this.item.user()&&k()(this.item.user())),m("td",null,this.item.address()),m("td",null,this.item.reason()),m("td",null,this.item.createdAt().toLocaleDateString()),m("td",null,m("div",{className:"Button--group"},b.a.component({className:"Button Button--warning",icon:"fas fa-pencil-alt",disabled:this.item.creator()!==app.session.user,onclick:function(){return app.modal.show(new M({item:t.item}))}}),b.a.component({className:"Button Button--danger",icon:"fas fa-times",onclick:function(){return app.modal.show(new R.a({address:t.item.address(),redraw:!0}))}}))))},n}(z.a),C=function(t){function n(){return t.apply(this,arguments)||this}Object(c.a)(n,t);var a=n.prototype;return a.init=function(){t.prototype.init.call(this),this.loading=!0,this.page=0,this.pageSize=20},a.config=function(n){t.prototype.config.apply(this,arguments),n||this.refresh()},a.view=function(){var t,n;return!0===this.nextResults&&(t=b.a.component({className:"Button Button--PageList-next",icon:"fas fa-angle-right",onclick:this.loadNext.bind(this)})),!0===this.prevResults&&(n=b.a.component({className:"Button Button--PageList-prev",icon:"fas fa-angle-left",onclick:this.loadPrev.bind(this)})),m("div",{className:"BannedIPsPage"},m("div",{className:"BannedIPsPage-header"},m("div",{className:"container"},m("p",null,app.translator.trans("fof-ban-ips.admin.nav.desc")),b.a.component({className:"Button Button--primary",icon:"fas fa-plus",children:app.translator.trans("fof-ban-ips.admin.page.create_button"),onclick:function(){return app.modal.show(new I)}}))),m("br",null),m("div",{className:"BannedIpsPage-table"},m("div",{className:"container"},this.loading?v.a.component():app.store.all("banned_ips").length?m("table",{style:{width:"100%",textAlign:"left"},className:"table"},m("thead",null,m("tr",null,m("th",null,"#"),m("th",null,app.translator.trans("fof-ban-ips.admin.page.creator_label")),m("th",null,app.translator.trans("fof-ban-ips.admin.page.user_label")),m("th",null,app.translator.trans("fof-ban-ips.admin.page.address_label")),m("th",null,app.translator.trans("fof-ban-ips.admin.page.reason_label")),m("th",null,app.translator.trans("fof-ban-ips.admin.page.date_label")),m("th",null))),m("tbody",null,app.store.all("banned_ips").slice(this.page,this.page+this.pageSize).map(function(t){return S.component({bannedIP:t})}))):m("div",null,y.a.component({text:app.translator.trans("fof-ban-ips.admin.empty_text")})))),m("div",null,t,n))},a.refresh=function(){return this.loadResults().then(this.parseResults.bind(this))},a.loadResults=function(){var t=this.page*this.pageSize;return app.store.find("fof/ban-ips",{page:{offset:t,limit:this.pageSize}})},a.loadNext=function(){!0===this.nextResults&&(this.page++,this.refresh())},a.loadPrev=function(){!0===this.prevResults&&(this.page--,this.refresh())},a.parseResults=function(t){this.loading=!1,this.nextResults=!!t.payload.links.next,this.prevResults=!!t.payload.links.prev,m.lazyRedraw()},n}(N.a);app.initializers.add("fof/ban-ips",function(){app.store.models.banned_ips=i.a,app.store.models.users.prototype.bannedIPs=e.a.hasMany("banned_ips"),Object(r.extend)(p.a.prototype,"moderateItems",function(t){t.add("viewBannedIPList",{icon:"fas fa-gavel",label:app.translator.trans("fof-ban-ips.admin.permissions.view_banned_ip_list_label"),permission:"fof.ban-ips.viewBannedIPList"}),t.add("banIP",{icon:"fas fa-gavel",label:app.translator.trans("fof-ban-ips.admin.permissions.ban_ip_label"),permission:"fof.ban-ips.banIP"})}),app.routes["fof-ban-ips"]={path:"/fof/ban-ips",component:C.component()},app.extensionSettings["fof-ban-ips"]=function(){return m.route(app.route("fof-ban-ips"))},Object(r.extend)(l.a.prototype,"items",function(t){t.add("fof-ban-ips",h.a.component({href:app.route("fof-ban-ips"),icon:"fas fa-gavel",children:app.translator.trans("fof-ban-ips.admin.nav.title"),description:app.translator.trans("fof-ban-ips.admin.nav.desc")}))})})}]);
//# sourceMappingURL=admin.js.map