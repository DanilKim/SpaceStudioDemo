!function(){"use strict";var e,t,r,n={4953:function(e,t,r){var n=r(7378),o=r(1542),a=r(6881),i=r(5809),c=r(9607),l=r(3208),s=r(3760),u=r(1011),d=r(6868),f=r(4547),m=r(3904),h=r(8694),p=r(592),v=r(9665),g=r(5022);function y(e){return n.createElement("div",null,e.value===e.index&&n.createElement(a.Z,{sx:{p:0,m:0,width:"85vw"}},e.children))}var E=r(3326),b=r(8187),w=r(5366);function x(){var e=function(){var e=n.useState(null),t=(0,i.Z)(e,2),r=t[0],o=t[1];return{anchorEl:r,open:Boolean(r),handleClick:function(e){o(e.currentTarget)},handleClose:function(){o(null)}}}(),t=e.anchorEl,r=e.open,o=e.handleClick,c=e.handleClose;return n.createElement(a.Z,null,n.createElement(s.Z,{edge:"start","aria-label":"menu","aria-controls":r?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":r?"true":void 0,onClick:o,sx:{mr:5}},n.createElement(w.Z,{sx:{color:"#7c7c7c"}})),n.createElement(E.Z,{id:"basic-menu",anchorEl:t,open:r,onClose:c,MenuListProps:{"aria-labelledby":"basic-button"}},n.createElement(b.Z,{onClick:c},"undo"),n.createElement(b.Z,{onClick:c},"Redo"),n.createElement(b.Z,{onClick:c},"Exit")))}function F(){return React.createElement(a.Z,{sx:{display:"flex",bgcolor:"white"}})}var Z=r(4141),C=r(1109),S=r(2919),k=r(1942),D=r(7177),j=r(3723),B=r(1111),O=r(7318),P=r(1602),M=r(8633),A=r(4206),R=r.n(A);function z(){var e=n.useState(!1),t=(0,i.Z)(e,2),r=t[0],o=t[1];return{open:r,handleClickOpen:function(){o(!0)},handleClose:function(){o(!1)}}}function L(){var e=new z,t=e.open,r=e.handleClickOpen,o=e.handleClose;return n.createElement(a.Z,null,n.createElement(k.Z,{color:"inherit",sx:{width:1,height:1/3,mt:3,bgcolor:"#dbdbdb",borderRadius:5,display:"flex",flexDirection:"column"},onClick:r},n.createElement(M.Z,{sx:{color:"#5f5f5f",mt:5}}),n.createElement(u.Z,{variant:"body1",sx:{color:"#5f5f5f",mb:5}},"공공데이터로 도시 모델 만들기")),n.createElement(D.Z,{open:t,onClose:o},n.createElement(P.Z,null,"공공데이터 업로드"),n.createElement(B.Z,null,n.createElement(O.Z,null,"Geojson 파일을 직접 업로드하여 도시 모델을 만듭니다.")),n.createElement(j.Z,null,n.createElement(k.Z,{component:"label"},"공간 생성",n.createElement("input",{type:"file",accept:".geojson, .json",onChange:function(e){!function(e,t){for(var r=0;r<e.target.files.length;r++)if(e.target.files[r]){var n=new FormData;switch(t){case"SPACECREATE":n.append("user_id","Reacttester"),n.append("geojsonfile",e.target.files[r],"space.geojson"),R().post("../../data",n).then((function(e){"success"==e.data.checkfrontface?console.log(e.data):console.log("No space data")})).catch((function(e){console.log("failed",e)}));break;case"FACECREATE":n.append("user_id","Reacttester"),n.append("imgfile",e.target.files[r],"imagefile.jpg"),R().post("/local/checkfrontface",n).then((function(e){"success"==e.data.checkfrontface?console.log(e.data):console.log("No front face")})).catch((function(e){console.log("failed",e)}))}}}(e,"SPACECREATE")},hidden:!0})),n.createElement(k.Z,{onClick:o},"취소"))))}var _=r(4260),V=r(4494),N=r(7942),T=r(2577),G=r(2189),H=r(4618),K=r(2386),I=r(7791),J=r(126),U=r(7135),W=r.n(U),X=r(6173),Q=r(4748);function q(e){var t=(0,n.useRef)(),r=(0,n.useState)(!1),o=(0,i.Z)(r,2),a=o[0],c=o[1],l=(0,n.useState)(!1),s=(0,i.Z)(l,2),u=(s[0],s[1],0);return(0,Q.xQ)((function(e,r){a?(t.current.position.y<.01?u=2:u-=.1,t.current.position.y+=u*r):(t.current.position.y=0,u=0)})),n.createElement(n.Fragment,null,n.createElement("mesh",{ref:t,geometry:e.geometry,position:e.position,scale:e.scale,name:e.name,castShadow:!0,receiveShadow:!0,onPointerOver:function(e){e.stopPropagation(),c(!0)},onPointerOut:function(e){e.stopPropagation(),c(!1)},onClick:function(t){t.stopPropagation(),alert(e.name)}},n.createElement("meshStandardMaterial",{attach:"material",color:a?"hotpink":e.color})))}function Y(e){var t,r,n,o=2;for("undefined"!=typeof Symbol&&(r=Symbol.asyncIterator,n=Symbol.iterator);o--;){if(r&&null!=(t=e[r]))return t.call(e);if(n&&null!=(t=e[n]))return new $(t.call(e));r="@@asyncIterator",n="@@iterator"}throw new TypeError("Object is not async iterable")}function $(e){function t(e){if(Object(e)!==e)return Promise.reject(new TypeError(e+" is not an object."));var t=e.done;return Promise.resolve(e.value).then((function(e){return{value:e,done:t}}))}return $=function(e){this.s=e,this.n=e.next},$.prototype={s:null,n:null,next:function(){return t(this.n.apply(this.s,arguments))},return:function(e){var r=this.s.return;return void 0===r?Promise.resolve({value:e,done:!0}):t(r.apply(this.s,arguments))},throw:function(e){var r=this.s.return;return void 0===r?Promise.reject(e):t(r.apply(this.s,arguments))}},new $(e)}var ee=40,te=200,re=.03;function ne(e,t,r,n,o,a,i,c,l,s){var u={depth:50*t,steps:1,material:0,extrudeMaterial:1,bevelEnabled:!1};return new X.ExtrudeGeometry(e,u)}function oe(e){var t=e.map((function(e){return e[0]})),r=e.map((function(e){return e[1]})),n=function(e){var t=Math.floor(e.length/2),r=(0,J.Z)(e).sort((function(e,t){return e-t}));return e.length%2!=0?r[t]:(r[t-1]+r[t])/2};return[n(t),n(r)]}function ae(){return ae=(0,I.Z)(W().mark((function e(t,r,o){var a,i,c,l,s,u,d,f,m,h,p,v,g,y,E,b,w,x,F,Z,C,S,k,D,j,B,O,P;return W().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return D=function(e){var r=C(e),a=new X.MeshPhongMaterial({color:707071}),i=X.BufferGeometry.BufferGeometryUtils.mergeBufferGeometries(r,!0);i.computeBoundingBox(),i.rotateX(-.5*Math.PI);var c=i.boundingBox.getCenter(new X.Vector3);if(i.translate(-c.x,0,-c.z),o)l=o;else{var l=[c.x,c.z];o=l}return n.createElement("mesh",{geometry:i,material:a,position:[.030000000000000002*(c.x-l[0]),0,.030000000000000002*(c.z-l[1])],scale:[.030000000000000002,re,.030000000000000002],key:t+" river",castShadow:!0,receiveShadow:!0})},k=function(e){var r=Z(e),a=new X.MeshPhongMaterial({color:1185062}),i=X.BufferGeometry.BufferGeometryUtils.mergeBufferGeometries(r,!0);i.computeBoundingBox(),i.rotateX(-.5*Math.PI);var c=i.boundingBox.getCenter(new X.Vector3);if(i.translate(-c.x,0,-c.z),o)l=o;else{var l=[c.x,c.z];o=l}return n.createElement("mesh",{geometry:i,material:a,position:[.030000000000000002*(c.x-l[0]),0,.030000000000000002*(c.z-l[1])],scale:[.030000000000000002,re,.030000000000000002],key:t+" road",castShadow:!0,receiveShadow:!0})},S=function(e){var t=F(e),r=[];if(o)a=o;else{var a=oe(f);o=a}for(var i=new Set(d),c=(0,J.Z)(i),l=0;l<c.length;l++)r.push([]);for(var s=0;s<t.length;s++){var m=c.indexOf(d[s]),h=(new X.MeshPhongMaterial({color:b[0][m]}),f[s]);r[m].push(n.createElement(q,{key:s,geometry:t[s],color:b[0][m],position:[.030000000000000002*(h[0]-a[0]),0,.030000000000000002*(h[1]-a[1])],scale:[.030000000000000002,re,.030000000000000002],name:u[s]}))}return n.createElement(n.Fragment,null,c.map((function(e,t){return n.createElement("group",{key:"group"+String(t)},r[t].map((function(e){return e})))})))},C=function(e){if(c=e,console.log("Road buildShape ("+y+"/"+c.features.length+")"),y<c.features.length)for(var t=0,r=y;r<c.features.length&&t<v;r++){t++,y++;for(var n=!0,o=[],a=0;a<c.features[r].geometry.coordinates.length;a++)if(c.features[r].geometry.coordinates[a].length<1||c.features[r].geometry.coordinates[a][0]<1||c.features[r].geometry.coordinates[a][0].length<4)n=!1;else for(var i=0;i<c.features[r].geometry.coordinates[a][0].length;i++)(E=c.features[r].geometry.coordinates[a][0][i])[0]&&E[1]&&E[0]>0&&E[1]>0?o.push(new X.Vector2(E[0],E[1])):n=!1;if(n){var s=c.features[r].properties["층수"];isNaN(parseFloat(c.features[r].properties["층수"]))&&(l&&(n=!1),s=0),(!s||s<0)&&(l&&(n=!1),s=0),s>ee&&(s=ee),0==s&&l&&(n=!1)}if(n){var u=s/ee*te;(!u||u<1)&&(u=0);var d=ne(new X.Shape(o),0);m.push(d)}}return m},Z=function(e){if(i=e,console.log("Road buildShape ("+g+"/"+i.features.length+")"),g<i.features.length)for(var t=0,r=g;r<i.features.length&&t<v;r++){t++,g++;for(var n=!0,o=[],a=0;a<i.features[r].geometry.coordinates.length;a++)if(i.features[r].geometry.coordinates[a].length<1||i.features[r].geometry.coordinates[a][0]<1||i.features[r].geometry.coordinates[a][0].length<4)n=!1;else for(var c=0;c<i.features[r].geometry.coordinates[a][0].length;c++)(E=i.features[r].geometry.coordinates[a][0][c])[0]&&E[1]&&E[0]>0&&E[1]>0?o.push(new X.Vector2(E[0],E[1])):n=!1;if(n){var s=i.features[r].properties["층수"];isNaN(parseFloat(i.features[r].properties["층수"]))&&(l&&(n=!1),s=0),(!s||s<0)&&(l&&(n=!1),s=0),s>ee&&(s=ee),0==s&&l&&(n=!1)}if(n){var u=s/ee*te;(!u||u<1)&&(u=0);var d=ne(new X.Shape(o),0);h.push(d)}}return h},F=function(e){if(a=e,console.log("Building buildShape ("+p+"/"+a.features.length+")"),p<a.features.length)for(var t=0,r=p;r<a.features.length&&t<v;r++){t++,p++;var n=!0,o=[];if(null!=a.features[r].properties.명칭&&"무벽건물"!=a.features[r].properties.종류&&"가건물"!=a.features[r].properties.종류&&"기타"!=a.features[r].properties.종류&&"온실"!=a.features[r].properties.종류)for(var i=0;i<a.features[r].geometry.coordinates.length;i++)if(a.features[r].geometry.coordinates[i].length<1||a.features[r].geometry.coordinates[i][0]<1||a.features[r].geometry.coordinates[i][0].length<4)n=!1;else for(var c=0;c<a.features[r].geometry.coordinates[i][0].length;c++)(E=a.features[r].geometry.coordinates[i][0][c])[0]&&E[1]&&E[0]>0&&E[1]>0?o.push(new X.Vector2(E[0],E[1])):n=!1;else n=!1;if(n){var m=a.features[r].properties["층수"];isNaN(parseFloat(a.features[r].properties["층수"]))&&(l&&(n=!1),m=0),(!m||m<0)&&(l&&(n=!1),m=0),m>ee&&(m=ee),0==m&&l&&(n=!1)}if(n){var h=m;(!h||h<1)&&(h=0);var g=ne(new X.Shape(o),.07*h);g.computeBoundingBox(),g.rotateX(-.5*Math.PI);var y=g.boundingBox.getCenter(new X.Vector3);f.push([y.x,y.z]),s.push(g.translate(-y.x,0,-y.z)),u.push(a.features[r].properties.명칭),d.push(a.features[r].properties.용도)}}return s},x=function(){return(x=(0,I.Z)(W().mark((function e(t){var r,n,o;return W().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={headers:{"Content-Type":"application/json",Accept:"application/json"}},e.prev=1,e.next=4,fetch(t,r);case 4:return n=e.sent,e.next=7,n.json();case 7:return o=e.sent,e.abrupt("return",o);case 11:e.prev=11,e.t0=e.catch(1),console.log("Json Fetch Error!!"),console.error(e.t0);case 15:case"end":return e.stop()}}),e,null,[[1,11]])})))).apply(this,arguments)},w=function(e){return x.apply(this,arguments)},l=!1,s=[],u=[],d=[],f=[],m=[],h=[],p=0,v=5e3,g=0,y=0,b=[["#FF0000","#FF5E00","#FFBB00","#FFE400","#ABF200","#1DDB16","#00D8FF","#0054FF","#0100FF","#5F00FF","#FF00DD","#FF007F","#000000","#FFFFFF"],["#FFD8D8","#FAE0D4","#FAECC5","#FAF4C0","#E4F7BA","#CEFBC9","#D4F4FA","#D9E5FF","#DAD9FF","#E8D9FF","#FFD9FA","#FFD9EC","#F6F6F6","#EAEAEA"],["#FFA7A7","#FFC19E","#FFE08C","#FAED7D","#CEF279","#B7F0B1","#B2EBF4","#B2CCFF","#B5B2FF","#D1B2FF","#FFB2F5","#FFB2D9","#D5D5D5","#BDBDBD"],["#F15F5F","#F29661","#F2CB61","#E5D85C","#BCE55C","#86E57F","#5CD1E5","#6799FF","#6B66FF","#A566FF","#F361DC","#F361A6","#A6A6A6","#8C8C8C"],["#CC3D3D","#CC723D","#CCA63D","#C4B73B","#9FC93C","#47C83E","#3DB7CC","#4374D9","#4641D9","#8041D9","#D941C5","#D9418C","#747474","#5D5D5D"],["#980000","#993800","#997000","#998A00","#6B9900","#2F9D27","#008299","#003399","#050099","#3F0099","#990085","#99004C","#4C4C4C","#353535"],["#670000","#662500","#664B00","#665C00","#476600","#22741C","#005766","#002266","#030066","#2A0066","#660058","#660033","#212121","#191919"]],j="../../data/"+String(t)+"_building.geojson",B="../../data/"+String(t)+"_road.geojson",O="../../data/"+String(t)+"_water.geojson",P=[],e.next=25,(0,I.Z)(W().mark((function e(){var t,n,o,a,i,c,l,s,u;return W().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=!1,n=!1,e.prev=2,a=Y(r);case 4:return e.next=6,a.next();case 6:if(!(t=!(i=e.sent).done)){e.next=30;break}if("건물"!==(c=i.value)){e.next=15;break}return e.next=11,w(j);case 11:l=e.sent,P.push(S(l)),e.next=27;break;case 15:if("도로"!==c){e.next=22;break}return e.next=18,w(B);case 18:s=e.sent,P.push(k(s)),e.next=27;break;case 22:if("강"!==c){e.next=27;break}return e.next=25,w(O);case 25:u=e.sent,P.push(D(u));case 27:t=!1,e.next=4;break;case 30:e.next=36;break;case 32:e.prev=32,e.t0=e.catch(2),n=!0,o=e.t0;case 36:if(e.prev=36,e.prev=37,!t||null==a.return){e.next=41;break}return e.next=41,a.return();case 41:if(e.prev=41,!n){e.next=44;break}throw o;case 44:return e.finish(41);case 45:return e.finish(36);case 46:case"end":return e.stop()}}),e,null,[[2,32,36,46],[37,,41,45]])})))();case 25:return e.abrupt("return",{components:P,firstMed:o});case 26:case"end":return e.stop()}}),e)}))),ae.apply(this,arguments)}var ie=r(1976),ce=r(2951),le=r(4649),se=r(9588),ue=(0,ie.Z)((function e(t){var r=this;(0,ce.Z)(this,e),(0,le.Z)(this,"rootStore",void 0),(0,le.Z)(this,"playMode",!1),(0,le.Z)(this,"pauseState",!1),(0,le.Z)(this,"pause",(function(){r.pauseState=!0})),(0,le.Z)(this,"play",(function(){r.pauseState=!1})),(0,le.Z)(this,"enterPm",(function(){r.playMode=!0})),(0,le.Z)(this,"exitPm",(function(){r.playMode=!1})),(0,se.rC)(this,{playMode:se.LO,pauseState:se.LO,pause:se.aD,play:se.aD,enterPm:se.aD,exitPm:se.aD}),this.rootStore=t})),de=(0,ie.Z)((function e(t){(0,ce.Z)(this,e),(0,le.Z)(this,"rootStore",void 0),(0,le.Z)(this,"controls",null),(0,se.rC)(this,{controls:se.LO}),this.rootStore=t})),fe=(0,ie.Z)((function e(t){var r=this;(0,ce.Z)(this,e),(0,le.Z)(this,"rootStore",void 0),(0,le.Z)(this,"model",[]),(0,le.Z)(this,"firstMed",null),(0,le.Z)(this,"addModel",(function(e){r.model=[].concat((0,J.Z)(r.model),(0,J.Z)(e.components)),r.firstMed=e.firstMed})),(0,se.rC)(this,{model:se.LO,addModel:se.aD}),this.rootStore=t})),me=(0,ie.Z)((function e(){(0,ce.Z)(this,e),(0,le.Z)(this,"PlaymodeStore",void 0),(0,le.Z)(this,"ControlStore",void 0),(0,le.Z)(this,"ModelStore",void 0),this.PlaymodeStore=new ue(this),this.ControlStore=new de(this),this.ModelStore=new fe(this)})),he=n.createContext(new me),pe=he.Provider,ve=function(){return n.useContext(he)},ge=r(649),ye={color:"inherit",width:1,height:1/3,mt:3,bgcolor:"#dbdbdb",borderRadius:5,display:"flex",flexDirection:"row",flexWrap:"wrap",align:"center"},Ee={PaperProps:{style:{maxHeight:224,width:250}}},be=[{city:{name:"성남시",id:1},dong:[{name:"gumi",id:11},{name:"geumgok",id:12}]},{city:{name:"용인시",id:2},dong:[{name:"dongchun",id:21}]}],we=["건물","도로","강"],xe=(0,ge.Pi)((function(){var e=n.useState(""),t=(0,i.Z)(e,2),r=t[0],o=t[1],c=n.useState([]),l=(0,i.Z)(c,2),s=l[0],u=l[1],d=ve().ModelStore;return n.createElement(a.Z,{sx:ye},n.createElement(V.Z,{sx:{m:1,width:120}},n.createElement(_.Z,{htmlFor:"dong-select"},"District"),n.createElement(H.Z,{defaultValue:"",id:"dong-select",label:"District",value:r,onChange:function(e){o(e.target.value)}},be.map((function(e){return function(e){var t=e.dong.map((function(e){return n.createElement(b.Z,{key:e.id,value:e.name},e.name)}));return[n.createElement(K.Z,{key:e.city.id,value:e.city.name},e.city.name),t]}(e)})))),n.createElement(V.Z,{sx:{m:1,width:120}},n.createElement(_.Z,{id:"object-select"},"Object"),n.createElement(H.Z,{labelId:"object-select",id:"object-select",multiple:!0,value:s,onChange:function(e){var t=e.target.value;u("string"==typeof t?t.split(","):t)},input:n.createElement(N.Z,{label:"Tag"}),renderValue:function(e){return e.join(", ")},MenuProps:Ee},we.map((function(e){return n.createElement(b.Z,{key:e,value:e},n.createElement(G.Z,{checked:s.indexOf(e)>-1}),n.createElement(T.Z,{primary:e}))})),n.createElement(b.Z,{value:""},n.createElement(G.Z,{disabled:!0}),n.createElement(T.Z,{primary:"지형 (미구현)"})))),n.createElement(k.Z,{onClick:function(){(function(e,t,r){return ae.apply(this,arguments)})(r,s,d.firstMed).then((function(e){d.addModel(e)}))},sx:{mb:.5,ml:7,width:.5,color:"inherit",border:.7}},"생성"))})),Fe=r(9743),Ze=r(2996),Ce=r(2523),Se={moveForward:!1,moveBackward:!1,moveLeft:!1,moveRight:!1,canJump:!1,velocity:new X.Vector3,direction:new X.Vector3,objects:[],intersectedObject:void 0,arrowHelper:void 0},ke=function(e){var t=(0,Q.Ky)(),r=t.scene,o=t.camera,a=t.raycaster,i=(0,n.useRef)(null),c=i.current,l=o.position.y;(0,n.useEffect)((function(){document.addEventListener("keydown",(function(e){switch(e.code){case"ArrowUp":case"KeyW":Se.moveForward=!0;break;case"ArrowLeft":case"KeyA":Se.moveLeft=!0;break;case"ArrowDown":case"KeyS":Se.moveBackward=!0;break;case"ArrowRight":case"KeyD":Se.moveRight=!0;break;case"Space":!0===Se.canJump&&(Se.velocity.y+=10),Se.canJump=!1}})),document.addEventListener("keyup",(function(e){switch(e.code){case"ArrowUp":case"KeyW":Se.moveForward=!1;break;case"ArrowLeft":case"KeyA":Se.moveLeft=!1;break;case"ArrowDown":case"KeyS":Se.moveBackward=!1;break;case"ArrowRight":case"KeyD":Se.moveRight=!1}})),document.addEventListener("mousedown",(function(){s()})),document.addEventListener("keydown",(function(t){"Escape"===t.key&&e.exit()}))}),[]),(0,Q.xQ)((function(e,t){!0===c.isLocked?(u(),Se.velocity.x-=10*Se.velocity.x*t,Se.velocity.z-=10*Se.velocity.z*t,Se.velocity.y-=49*t,Se.direction.z=Number(Se.moveForward)-Number(Se.moveBackward),Se.direction.x=Number(Se.moveRight)-Number(Se.moveLeft),Se.direction.normalize(),(Se.moveForward||Se.moveBackward)&&(Se.velocity.z-=40*Se.direction.z*t),(Se.moveLeft||Se.moveRight)&&(Se.velocity.x-=40*Se.direction.x*t),c.moveRight(-Se.velocity.x*t),c.moveForward(-Se.velocity.z*t),c.getObject().position.y+=Se.velocity.y*t,c.getObject().position.y<l&&(Se.velocity.y=0,c.getObject().position.y=l,Se.canJump=!0)):c.lock()}));var s=function(){var t=a.intersectObjects(Se.objects);t.length>0?(Se.intersectedObject&&Se.intersectedObject.material.color.setHex(16777215),t[0].object.material.color.setHex(16773120),t[0].object.material.opacity=1,Se.intersectedObject=t[0].object,e.onSelect&&(c.unlock(),Se.intersectedObject&&Se.intersectedObject.material.color.setHex(16777215),Se.intersectedObject=void 0,a.set(new X.Vector3(0,0,0),new X.Vector3(0,0,0)),e.onSelect(t[0].object.userData))):(Se.intersectedObject&&Se.intersectedObject.material.color.setHex(16777215),Se.intersectedObject=void 0)},u=function(){a.set(o.getWorldPosition(new X.Vector3),o.getWorldDirection(new X.Vector3)),r.remove(Se.arrowHelper);var e=a.ray.origin;e.y-=.2,Se.arrowHelper=new X.ArrowHelper(a.ray.direction,e,300,16711680),r.add(Se.arrowHelper)};return n.createElement(Ce.q,{ref:i,onUnlock:function(){e.exit()},camera:o})},De=(0,ge.Pi)((function(){var e=ve(),t=e.ModelStore,r=e.PlaymodeStore,o=r.playMode?{background:"#2f2f2f"}:{background:"white"},a=r.playMode?{position:[0,.1,10],fov:50}:{position:[0,5,10]};return n.createElement(Q.Xz,{style:o,camera:a,id:"canvas"},r.playMode?n.createElement(ke,{exit:r.exitPm}):n.createElement(Fe.z,null),n.createElement("ambientLight",{intensity:.1}),n.createElement(Ze.JO,{receiveShadow:!0,position:[0,-.01,0],rotation:[-Math.PI/2,0,0],args:[1e3,1e3]},n.createElement("meshStandardMaterial",{color:"white"})),n.createElement("directionalLight",{castShadow:!0,"shadow-mapSize-height":10240,"shadow-mapSize-width":10240,"shadow-camera-left":-1e3,"shadow-camera-right":1e3,"shadow-camera-bottom":-1e3,"shadow-camera-top":1e3,"shadow-camera-near":.1,"shadow-camera-far":1e3,"shadow-radius":5,"shadow-blurSamples":5,position:[15,22,10],intensity:1}),t.model)})),je=function(e){return n.createElement(a.Z,{sx:{height:"94vh",display:"flex",bgcolor:"white"}},n.createElement(Z.Z,{variant:"elevation",sx:{width:"20%",height:"97.5%",m:"1.25%",bgcolor:"white",borderRadius:5,border:.5,borderColor:"#dbdbdb"}},n.createElement(C.Z,{title:"City Modeling",sx:{color:"#5f5f5f"}}),n.createElement(S.Z,null,n.createElement(Z.Z,{variant:"elevation",sx:{bgcolor:"#dbdbdb",borderRadius:5,display:"flex",flexDirection:"row",boxShadow:0,mt:-2}},n.createElement(u.Z,{component:"div",variant:"body1",sx:{ml:2,flexGrow:1,color:"#5f5f5f"}},"[도시 모델]"),n.createElement(u.Z,{component:"div",variant:"body1",sx:{mr:2,color:"#5f5f5f"}},"옵션을 선택하세요.")),n.createElement(L,null),n.createElement(xe,null))),n.createElement(a.Z,{sx:{height:"100%",width:"80%"}},n.createElement(De,{key:"studio-mode"})))},Be=(0,r(7172).Pi)((function(e){var t=ve().PlaymodeStore,r=(0,n.useState)(0),o=(0,i.Z)(r,2),E=o[0],b=o[1];return n.createElement(a.Z,{sx:{bgcolor:"white",width:"100vw",height:"100vh"}},n.createElement(c.Z,{position:"absolute",sx:{bgcolor:"#fafafa",borderBottom:1,borderColor:"#eaeaea"}},n.createElement(l.Z,{variant:"dense"},n.createElement(x,null),n.createElement(s.Z,{edge:"start",sx:{mr:2}},n.createElement(m.Z,{sx:{color:"#7c7c7c"}})),n.createElement(s.Z,{edge:"start",sx:{mr:5}},n.createElement(h.Z,{sx:{color:"#7c7c7c"}})),n.createElement(u.Z,{component:"div",variant:"h6",sx:{mr:10,color:"#7c7c7c"}},"Tivine Space Studio"),n.createElement(d.Z,{value:E,onChange:function(e,t){b(t)},sx:{flexGrow:1},textColor:"secondary",indicatorColor:"secondary"},n.createElement(f.Z,{label:"실외 공간 생성",index:"0"}),n.createElement(f.Z,{label:"실내 공간 생성",index:"1"})),n.createElement(s.Z,{edge:"start",sx:{mr:3},onClick:function(){t.enterPm()}},n.createElement(p.Z,{sx:{color:"#7c7c7c"}})),n.createElement(s.Z,{edge:"start",sx:{mr:3}},n.createElement(v.Z,{sx:{color:"#7c7c7c"}})),n.createElement(s.Z,{edge:"start",sx:{mr:1}},n.createElement(g.Z,{sx:{color:"#7c7c7c"}})))),n.createElement(a.Z,{sx:{height:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between",pt:"4.5vh"}},n.createElement(y,{value:E,index:0},n.createElement(u.Z,{component:"div",variant:"body1",sx:{mr:2,color:"#555555"}},n.createElement(je,null))),n.createElement(y,{value:E,index:1},n.createElement(u.Z,{component:"div",variant:"body1",sx:{mr:2,color:"#555555"}},n.createElement(F,null))),n.createElement(a.Z,{direction:"row",justifySelf:"flex-end",sx:{width:"15vw",bgcolor:"#e4ddfa",p:3}},n.createElement(u.Z,{component:"div",variant:"body1",sx:{mr:2,color:"#555555"}},"Design Assets"))))})),Oe=(0,ge.Pi)((function(){var e=ve().PlaymodeStore;return n.createElement(n.Fragment,null,e.playMode?n.createElement(a.Z,{sx:{width:"100vw",height:"100vh"}},n.createElement(De,{key:"play-mode"})):n.createElement(Be,null))})),Pe=new me;o.render(n.createElement(n.StrictMode,null,n.createElement(pe,{value:Pe},n.createElement(Oe,null))),document.getElementById("root"))}},o={};function a(e){var t=o[e];if(void 0!==t)return t.exports;var r=o[e]={id:e,loaded:!1,exports:{}};return n[e](r,r.exports,a),r.loaded=!0,r.exports}a.m=n,e=[],a.O=function(t,r,n,o){if(!r){var i=1/0;for(u=0;u<e.length;u++){r=e[u][0],n=e[u][1],o=e[u][2];for(var c=!0,l=0;l<r.length;l++)(!1&o||i>=o)&&Object.keys(a.O).every((function(e){return a.O[e](r[l])}))?r.splice(l--,1):(c=!1,o<i&&(i=o));if(c){e.splice(u--,1);var s=n();void 0!==s&&(t=s)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[r,n,o]},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,{a:t}),t},r=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},a.t=function(e,n){if(1&n&&(e=this(e)),8&n)return e;if("object"==typeof e&&e){if(4&n&&e.__esModule)return e;if(16&n&&"function"==typeof e.then)return e}var o=Object.create(null);a.r(o);var i={};t=t||[null,r({}),r([]),r(r)];for(var c=2&n&&e;"object"==typeof c&&!~t.indexOf(c);c=r(c))Object.getOwnPropertyNames(c).forEach((function(t){i[t]=function(){return e[t]}}));return i.default=function(){return e},a.d(o,i),o},a.d=function(e,t){for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},function(){var e={143:0};a.O.j=function(t){return 0===e[t]};var t=function(t,r){var n,o,i=r[0],c=r[1],l=r[2],s=0;if(i.some((function(t){return 0!==e[t]}))){for(n in c)a.o(c,n)&&(a.m[n]=c[n]);if(l)var u=l(a)}for(t&&t(r);s<i.length;s++)o=i[s],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(u)},r=self.webpackChunk=self.webpackChunk||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var i=a.O(void 0,[744],(function(){return a(4953)}));i=a.O(i)}();
//# sourceMappingURL=5db840385ab7a3998d04.app.js.map