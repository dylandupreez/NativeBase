import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Animated, Platform } from "react-native";
import { connectStyle, StyleProvider } from "native-base-shoutem-theme";
import mapPropsToStyleNames from "../../Utils/mapPropsToStyleNames";
import variable from "./../../theme/variables/platform";
import { TabHeading, Text, TabContainer } from "./../../index";
import _ from "lodash";

import { ViewPropTypes } from "../../Utils";
import { Button } from "./Button";

class DefaultTabBar extends Component {
    static propTypes = {
        goToPage: PropTypes.func,
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
        backgroundColor: PropTypes.string,
        activeTextColor: PropTypes.string,
        inactiveTextColor: PropTypes.string,
        tabStyle: ViewPropTypes.style,
        renderTab: PropTypes.func,
        underlineStyle: ViewPropTypes.style,
        tabContainerStyle: ViewPropTypes.style,
    }
    static contextTypes = {
        theme: PropTypes.object,
    }
    static defaultProps = {
        activeTextColor: variable.topTabBarActiveTextColor,
        inactiveTextColor: variable.topTabBarTextColor,
        backgroundColor: null,
    }

    constructor(props) {
        super(props);
    }

    renderTab(name, page, isTabActive, onPressHandler, tabStyle, activeTabStyle, textStyle, activeTextStyle, tabHeaderStyle) {
        const headerContent = typeof name !== "string" ? name.props.children : undefined;
        const { activeTextColor, inactiveTextColor } = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? "bold" : "normal";
        if (typeof name === "string") {
            return (
                <Button style={{ flex: 1 }} key={name} onPress={() => onPressHandler(page)}>
                    <TabHeading style={isTabActive ? activeTabStyle : tabStyle} active={isTabActive}>
                        <Text style={isTabActive ? activeTextStyle : textStyle}>{name}</Text>
                    </TabHeading>
                </Button>
            );
        } else {
            return (
                <Button style={{ flex: 1 }} key={_.random(1.2, 5.2)} onPress={() => onPressHandler(page)}>
                    <TabHeading style={tabHeaderStyle} active={isTabActive}>
                        {headerContent}
                    </TabHeading>
                </Button>
            );
        }
    }

    render() {
        const variables = this.context.theme
            ? this.context.theme["@@shoutem.theme/themeStyle"].variables
            : variable;
        const platformStyle = variables.platformStyle;
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;
        const tabUnderlineStyle = {
            position: "absolute",
            width: containerWidth / numberOfTabs,
            height: 4,
            backgroundColor: variables.topTabBarActiveBorderColor,
            bottom: 0,
        };
        const left = this.props.scrollValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, containerWidth / numberOfTabs],
        });
        return (
            <TabContainer style={this.props.tabContainerStyle ? this.props.tabContainerStyle : {}}>
                {this.props.tabs.map((name, page) => {
                    
                    const isTabActive = this.props.activeTab === page;

                    if (!this.props.renderTab) {
                        return this.renderTab(
                            name,
                            page,
                            isTabActive,
                            this.props.goToPage,
                            this.props.tabStyle[page],
                            this.props.activeTabStyle[page],
                            this.props.textStyle[page],
                            this.props.activeTextStyle[page],
                            this.props.tabHeaderStyle[page]
                        );
                    }
                    else {
                        return this.props.renderTab(
                            name,
                            page,
                            isTabActive,
                            this.props.goToPage,
                            this.props.tabStyle[page],
                            this.props.activeTabStyle[page],
                            this.props.textStyle[page],
                            this.props.activeTextStyle[page],
                            this.props.tabHeaderStyle[page]);
                    }
                })}
                <Animated.View style={[tabUnderlineStyle, { left }, this.props.underlineStyle]} />
            </TabContainer>
        );
    }

}

// module.exports = DefaultTabBar;
const StyledTab = connectStyle("NativeBase.DefaultTabBar", {}, mapPropsToStyleNames)(DefaultTabBar);
export { StyledTab as DefaultTabBar };