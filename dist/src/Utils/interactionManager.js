Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _reactNative=require("react-native");exports.default=_extends({},_reactNative.InteractionManager,{


<<<<<<< HEAD

=======
>>>>>>> ed4cc170b4b458b207825eadc9b8afa744b87130
runAfterInteractions:function runAfterInteractions(f){


var called=false;
<<<<<<< HEAD
var timeout=setTimeout(function(){called=true;f();},10);
=======
var timeout=setTimeout(function(){
called=true;
f();
},10);
>>>>>>> ed4cc170b4b458b207825eadc9b8afa744b87130
_reactNative.InteractionManager.runAfterInteractions(function(){
if(called)return;
clearTimeout(timeout);
f();
});
}});
//# sourceMappingURL=interactionManager.js.map