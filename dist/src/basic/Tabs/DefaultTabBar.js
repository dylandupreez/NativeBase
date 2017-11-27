Object.defineProperty(exports,"__esModule",{value:true});exports.DefaultTabBar=undefined;var _jsxFileName="src/basic/Tabs/DefaultTabBar.js";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require("react");var _react2=_interopRequireDefault(_react);
var _propTypes=require("prop-types");var _propTypes2=_interopRequireDefault(_propTypes);
var _reactNative=require("react-native");
var _nativeBaseShoutemTheme=require("native-base-shoutem-theme");
var _mapPropsToStyleNames=require("../../Utils/mapPropsToStyleNames");var _mapPropsToStyleNames2=_interopRequireDefault(_mapPropsToStyleNames);
var _platform=require("./../../theme/variables/platform");var _platform2=_interopRequireDefault(_platform);
var _index=require("./../../index");
var _lodash=require("lodash");var _lodash2=_interopRequireDefault(_lodash);

var _Utils=require("../../Utils");
var _Button=require("./Button");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var








































































































DefaultTabBar=function(_Component){_inherits(DefaultTabBar,_Component);function DefaultTabBar(){_classCallCheck(this,DefaultTabBar);return _possibleConstructorReturn(this,(DefaultTabBar.__proto__||Object.getPrototypeOf(DefaultTabBar)).apply(this,arguments));}_createClass(DefaultTabBar,[{key:"renderTab",value:function renderTab(





















name,page,isTabActive,onPressHandler,tabStyle,activeTabStyle,textStyle,activeTextStyle,tabHeaderStyle){
var headerContent=typeof name!=="string"?name.props.children:undefined;var _props=
this.props,activeTextColor=_props.activeTextColor,inactiveTextColor=_props.inactiveTextColor;
var textColor=isTabActive?activeTextColor:inactiveTextColor;
var fontWeight=isTabActive?"bold":"normal";
if(typeof name==="string"){
return(
_react2.default.createElement(_Button.Button,{style:{flex:1},key:name,onPress:function onPress(){return onPressHandler(page);},__source:{fileName:_jsxFileName,lineNumber:145}},
_react2.default.createElement(_index.TabHeading,{style:isTabActive?activeTabStyle:tabStyle,active:isTabActive,__source:{fileName:_jsxFileName,lineNumber:146}},
_react2.default.createElement(_index.Text,{style:isTabActive?activeTextStyle:textStyle,__source:{fileName:_jsxFileName,lineNumber:147}},name))));



}else{
return(
_react2.default.createElement(_Button.Button,{style:{flex:1},key:_lodash2.default.random(1.2,5.2),onPress:function onPress(){return onPressHandler(page);},__source:{fileName:_jsxFileName,lineNumber:153}},
_react2.default.createElement(_index.TabHeading,{style:tabHeaderStyle,active:isTabActive,__source:{fileName:_jsxFileName,lineNumber:154}},
headerContent)));



}
}},{key:"render",value:function render()

{var _this2=this;
var variables=this.context.theme?
this.context.theme["@@shoutem.theme/themeStyle"].variables:_platform2.default;

var platformStyle=variables.platformStyle;
var containerWidth=this.props.containerWidth;
var numberOfTabs=this.props.tabs.length;
var tabUnderlineStyle={
position:"absolute",
width:containerWidth/numberOfTabs,
height:4,
backgroundColor:variables.topTabBarActiveBorderColor,
bottom:0};


var left=this.props.scrollValue.interpolate({
inputRange:[0,1],
outputRange:[0,containerWidth/numberOfTabs]});

return(
_react2.default.createElement(_index.TabContainer,{style:this.props.tabContainerStyle?this.props.tabContainerStyle:{},__source:{fileName:_jsxFileName,lineNumber:182}},
this.props.tabs.map(function(name,page){
var isTabActive=_this2.props.activeTab===page;
var renderTab=_this2.props.renderTab||_this2.renderTab;
return renderTab(
name,
page,
isTabActive,
_this2.props.goToPage,
_this2.props.tabStyle[page],
_this2.props.activeTabStyle[page],
_this2.props.textStyle[page],
_this2.props.activeTextStyle[page],
_this2.props.tabHeaderStyle[page]);

}),
_react2.default.createElement(_reactNative.Animated.View,{style:[tabUnderlineStyle,{left:left},this.props.underlineStyle],__source:{fileName:_jsxFileName,lineNumber:198}})));


}}]);return DefaultTabBar;}(_react.Component);DefaultTabBar.propTypes={goToPage:_propTypes2.default.func,activeTab:_propTypes2.default.number,tabs:_propTypes2.default.array,backgroundColor:_propTypes2.default.string,activeTextColor:_propTypes2.default.string,inactiveTextColor:_propTypes2.default.string,tabStyle:_Utils.ViewPropTypes.style,renderTab:_propTypes2.default.func,underlineStyle:_Utils.ViewPropTypes.style,tabContainerStyle:_Utils.ViewPropTypes.style};DefaultTabBar.contextTypes={theme:_propTypes2.default.object};DefaultTabBar.defaultProps={activeTextColor:_platform2.default.topTabBarActiveTextColor,inactiveTextColor:_platform2.default.topTabBarTextColor,backgroundColor:null};




var StyledTab=(0,_nativeBaseShoutemTheme.connectStyle)("NativeBase.DefaultTabBar",{},_mapPropsToStyleNames2.default)(DefaultTabBar);exports.
DefaultTabBar=StyledTab;
//# sourceMappingURL=DefaultTabBar.js.map