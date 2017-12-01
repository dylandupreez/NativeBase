Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName="src/basic/Tabs/index.js";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require("react");var _react2=_interopRequireDefault(_react);
var _reactNative=require("react-native");
var _reactTimerMixin=require("react-timer-mixin");var _reactTimerMixin2=_interopRequireDefault(_reactTimerMixin);
var _reactMixin=require("react-mixin");var _reactMixin2=_interopRequireDefault(_reactMixin);
var _propTypes=require("prop-types");var _propTypes2=_interopRequireDefault(_propTypes);
var _Utils=require("../../Utils");
var _lodash=require("lodash");var _lodash2=_interopRequireDefault(_lodash);

var _SceneComponent=require("./SceneComponent");var _SceneComponent2=_interopRequireDefault(_SceneComponent);
var _DefaultTabBar=require("./DefaultTabBar");
var _ScrollableTabBar=require("./ScrollableTabBar");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

ScrollableTabView=function(_Component){_inherits(ScrollableTabView,_Component);


























function ScrollableTabView(props){_classCallCheck(this,ScrollableTabView);var _this=_possibleConstructorReturn(this,(ScrollableTabView.__proto__||Object.getPrototypeOf(ScrollableTabView)).call(this,
props));
_this.state={
currentPage:_this.props.initialPage,
scrollValue:new _reactNative.Animated.Value(_this.props.initialPage),
containerWidth:_reactNative.Dimensions.get("window").width,
sceneKeys:_this.newSceneKeys({currentPage:_this.props.initialPage}),
initialRender:true};return _this;

}_createClass(ScrollableTabView,[{key:"componentDidMount",value:function componentDidMount()

{var _this2=this;
_Utils.InteractionManager.runAfterInteractions(function(){
_this2.goToPage(_this2.props.initialPage);
});
}},{key:"componentWillReceiveProps",value:function componentWillReceiveProps(

nextProps){var _this3=this;
if(nextProps&&nextProps.children!==this.props.children){
this.updateSceneKeys({
page:this.state.currentPage,
children:nextProps.children,
callback:function callback(){
if(nextProps.initialPage>=0&&nextProps.initialPage!==_this3.props.initialPage){
_this3.setState({initialRender:true},function(){return _this3.goToPage(nextProps.initialPage);});
}
}});

}
}},{key:"goToPage",value:function goToPage(

pageNumber){
var offset=pageNumber*this.state.containerWidth;

if(this.scrollView){
this.scrollView.scrollTo({
x:offset,
y:0,
animated:!this.props.scrollWithoutAnimation});

}
if(_reactNative.Platform.OS==="android"){var
currentPage=this.state.currentPage;
this.updateSceneKeys({
page:pageNumber,
callback:this._onChangeTab.bind(this,currentPage,pageNumber)});

}

}},{key:"updateSceneKeys",value:function updateSceneKeys(_ref)

{var page=_ref.page,_ref$children=_ref.children,children=_ref$children===undefined?this.props.children:_ref$children,_ref$callback=_ref.callback,callback=_ref$callback===undefined?function(){}:_ref$callback;
var newKeys=this.newSceneKeys({
previousKeys:this.state.sceneKeys,
currentPage:page,
children:children});

this.setState({currentPage:page,sceneKeys:newKeys},callback);
}},{key:"newSceneKeys",value:function newSceneKeys(_ref2)

{var _this4=this;var _ref2$previousKeys=_ref2.previousKeys,previousKeys=_ref2$previousKeys===undefined?[]:_ref2$previousKeys,_ref2$currentPage=_ref2.currentPage,currentPage=_ref2$currentPage===undefined?0:_ref2$currentPage,_ref2$children=_ref2.children,children=_ref2$children===undefined?this.props.children:_ref2$children;
var newKeys=[];
this._children(children).forEach(function(child,idx){
var key=_this4._makeSceneKey(child,idx);
if(_this4._keyExists(previousKeys,key)||_this4._shouldRenderSceneKey(idx,currentPage)){
newKeys.push(key);
}
});
return newKeys;
}},{key:"_shouldRenderSceneKey",value:function _shouldRenderSceneKey(

idx,currentPageKey){
var numOfSibling=this.props.prerenderingSiblingsNumber;
return idx<currentPageKey+numOfSibling+1&&idx>currentPageKey-numOfSibling-1;
}},{key:"_keyExists",value:function _keyExists(

sceneKeys,key){
return sceneKeys.find(function(sceneKey){return key===sceneKey;});
}},{key:"_makeSceneKey",value:function _makeSceneKey(

child,idx){
return child.props.heading+"_"+idx;
}},{key:"_composeScenes",value:function _composeScenes()

{var _this5=this;
return this._children().map(function(child,idx){
var key=_this5._makeSceneKey(child,idx);
return(
_react2.default.createElement(_SceneComponent2.default,{
key:child.key,
shouldUpdated:_this5._shouldRenderSceneKey(idx,_this5.state.currentPage),
style:{width:_this5.state.containerWidth},__source:{fileName:_jsxFileName,lineNumber:128}},

_this5._keyExists(_this5.state.sceneKeys,key)?
child:

_react2.default.createElement(_reactNative.View,{heading:child.props.heading,__source:{fileName:_jsxFileName,lineNumber:136}})));



});
}},{key:"_onScroll",value:function _onScroll(
e){var _this6=this;
var offsetX=e.nativeEvent.contentOffset.x;
if(this.state.initialRender&&_reactNative.Platform.OS==="ios"){
this.setState({initialRender:false},function(){
_this6._updateScrollValue(_this6.state.currentPage);
});
}else{
this._updateScrollValue(offsetX/this.state.containerWidth);
}


}},{key:"_updateScrollValue",value:function _updateScrollValue(

value){
this.state.scrollValue.setValue(value);
if(this.props.onScroll){
this.props.onScroll(value);
}

}},{key:"_onMomentumScrollEnd",value:function _onMomentumScrollEnd(

e){
var offsetX=e.nativeEvent.contentOffset.x;
if(offsetX<0){
offsetX=offsetX*-1;
}
var page=Math.round(offsetX/this.state.containerWidth);

if(page>=this.props.children.length){
page=this.props.children.length-1;
}
if(this.state.currentPage!==page){
this._updateSelectedPage(page);
}
}},{key:"_updateSelectedPage",value:function _updateSelectedPage(

nextPage){
var localNextPage=nextPage;
if(typeof localNextPage==="object"){
localNextPage=nextPage.nativeEvent.position;
}var

currentPage=this.state.currentPage;

this.updateSceneKeys({
page:localNextPage,
callback:this._onChangeTab.bind(this,currentPage,localNextPage)});

}},{key:"_onChangeTab",value:function _onChangeTab(

prevPage,currentPage){
this.props.onChangeTab({
i:currentPage,
ref:this._children()[currentPage],
from:prevPage});

}},{key:"_handleLayout",value:function _handleLayout(

e){var _this7=this;var
width=e.nativeEvent.layout.width;
if(Math.round(width)!==Math.round(this.state.containerWidth)){
this.setState({containerWidth:width},function(){
_this7.requestAnimationFrame(function(){
_this7.goToPage(_this7.state.currentPage);
});
});

}
}},{key:"_children",value:function _children()

{var children=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.props.children;
return _react2.default.Children.map(children,function(child){return child;});
}},{key:"renderTabBar",value:function renderTabBar(

props){
if(this.props.renderTabBar===false){
return null;
}else if(this.props.renderTabBar){
return _react2.default.cloneElement(this.props.renderTabBar(props),props);
}else{
return _react2.default.createElement(_DefaultTabBar.DefaultTabBar,_extends({},props,{__source:{fileName:_jsxFileName,lineNumber:222}}));
}
}},{key:"renderScrollableContent",value:function renderScrollableContent()

{var _this8=this;
var scenes=this._composeScenes();
return(
_react2.default.createElement(_reactNative.ScrollView,_extends({
horizontal:true,
pagingEnabled:true,
automaticallyAdjustContentInsets:false,
contentOffset:{
x:this.props.initialPage*this.state.containerWidth},

ref:function ref(scrollView){
_this8.scrollView=scrollView;
},
onScroll:function onScroll(e){return _this8._onScroll(e);},
onMomentumScrollEnd:function onMomentumScrollEnd(e){return _this8._onMomentumScrollEnd(e);},
scrollEventThrottle:16,
scrollsToTop:false,
showsHorizontalScrollIndicator:false,
scrollEnabled:!this.props.locked,
directionalLockEnabled:true,
alwaysBounceVertical:false,
keyboardDismissMode:"on-drag"},
this.props.contentProps,{__source:{fileName:_jsxFileName,lineNumber:229}}),

scenes));


}},{key:"render",value:function render()

{var _this9=this;
var overlayTabs=
this.props.tabBarPosition==="overlayTop"||this.props.tabBarPosition==="overlayBottom";

var tabBarProps={
goToPage:function goToPage(pageNumber){return _this9.goToPage(pageNumber);},
tabs:this._children().map(function(child){return child.props.heading;}),
tabStyle:this._children().map(function(child){return child.props.tabStyle;}),
activeTabStyle:this._children().map(function(child){return child.props.activeTabStyle;}),
textStyle:this._children().map(function(child){return child.props.textStyle;}),
activeTextStyle:this._children().map(function(child){return child.props.activeTextStyle;}),
tabHeaderStyle:this._children().map(function(child){return(
_lodash2.default.get(child.props.heading.props,"style",undefined));}),

activeTab:this.state.currentPage,
scrollValue:this.state.scrollValue,
containerWidth:this.state.containerWidth};


if(this.props.tabBarBackgroundColor){
tabBarProps.backgroundColor=this.props.tabBarBackgroundColor;
}
if(this.props.tabBarActiveTextColor){
tabBarProps.activeTextColor=this.props.tabBarActiveTextColor;
}
if(this.props.tabBarInactiveTextColor){
tabBarProps.inactiveTextColor=this.props.tabBarInactiveTextColor;
}
if(this.props.tabBarTextStyle){
tabBarProps.textStyle=this.props.tabBarTextStyle;
}
if(this.props.tabBarUnderlineStyle){
tabBarProps.underlineStyle=this.props.tabBarUnderlineStyle;
}
if(this.props.tabContainerStyle){
tabBarProps.tabContainerStyle=this.props.tabContainerStyle;
}
if(overlayTabs){
tabBarProps.style=_defineProperty({
position:"absolute",
left:0,
right:0},
this.props.tabBarPosition==="overlayTop"?"top":"bottom",0);

}

return(
_react2.default.createElement(_reactNative.View,{style:[styles.container,this.props.style],onLayout:function onLayout(e){return _this9._handleLayout(e);},__source:{fileName:_jsxFileName,lineNumber:302}},
this.props.tabBarPosition==="top"&&this.renderTabBar(tabBarProps),
this.renderScrollableContent(),
(this.props.tabBarPosition==="bottom"||overlayTabs)&&this.renderTabBar(tabBarProps)));


}}]);return ScrollableTabView;}(_react.Component);ScrollableTabView.propTypes={tabBarPosition:_propTypes2.default.oneOf(["top","bottom","overlayTop","overlayBottom"]),initialPage:_propTypes2.default.number,onChangeTab:_propTypes2.default.func,onScroll:_propTypes2.default.func,renderTabBar:_propTypes2.default.any,style:_Utils.ViewPropTypes.style,contentProps:_propTypes2.default.object,scrollWithoutAnimation:_propTypes2.default.bool,locked:_propTypes2.default.bool,prerenderingSiblingsNumber:_propTypes2.default.number};ScrollableTabView.defaultProps={tabBarPosition:"top",initialPage:0,onChangeTab:function onChangeTab(){},onScroll:function onScroll(){},contentProps:{},scrollWithoutAnimation:false,locked:false,prerenderingSiblingsNumber:0};exports.default=


_reactMixin2.default.onClass(ScrollableTabView,_reactTimerMixin2.default);

var styles=_reactNative.StyleSheet.create({
container:{
flex:1},

scrollableContentAndroid:{
flex:1}});
//# sourceMappingURL=index.js.map