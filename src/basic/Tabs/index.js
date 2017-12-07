import React, { Component } from "react";
import { Dimensions, View, Animated, ScrollView, StyleSheet, Platform } from "react-native";
import TimerMixin from "react-timer-mixin";
import ReactMixin from "react-mixin";
import PropTypes from "prop-types";
import { InteractionManager, ViewPropTypes } from "../../Utils";
import _ from "lodash";

import SceneComponent from "./SceneComponent";
import { DefaultTabBar } from "./DefaultTabBar";
import { ScrollableTabBar } from "./ScrollableTabBar";

class ScrollableTabView extends Component {
    static propTypes = {
        tabBarPosition: PropTypes.oneOf(["top", "bottom", "overlayTop", "overlayBottom"]),
        initialPage: PropTypes.number,
        page: PropTypes.number,
        onChangeTab: PropTypes.func,
        onScroll: PropTypes.func,
        renderTabBar: PropTypes.any,
        style: ViewPropTypes.style,
        contentProps: PropTypes.object,
        scrollWithoutAnimation: PropTypes.bool,
        locked: PropTypes.bool,
        prerenderingSiblingsNumber: PropTypes.number,
    };

    static defaultProps = {
        tabBarPosition: "top",
        initialPage: 0,
        page: -1,
        onChangeTab: () => { },
        onScroll: () => { },
        contentProps: {},
        scrollWithoutAnimation: false,
        locked: false,
        prerenderingSiblingsNumber: 0,
    };

    initialRender = Platform.OS === "ios";

    constructor(props) {
        super(props);
        this.state = {
            currentPage: this.props.initialPage,
            scrollValue: new Animated.Value(this.props.initialPage),
            containerWidth: Dimensions.get("window").width,
            sceneKeys: this.newSceneKeys({ currentPage: this.props.initialPage }),
        }
    }

    componentDidMount() {
        this.goToPage(0);
        this.setTimeout(() => this.goToPage(this.props.initialPage), 0);
    }

    componentWillReceiveProps(nextProps) {

        if (this.initialRender) {
            this.initialRender = false;
        }
        if (nextProps.children !== this.props.children) {
            this.updateSceneKeys({
                page: this.state.currentPage,
                children: nextProps.children,
            });
        }
        if (nextProps.page >= 0 && nextProps.page !== this.state.currentPage) {
            this.goToPage(nextProps.page);
        }
    }

    goToPage(pageNumber) {
        const offset = pageNumber * this.state.containerWidth;

        if (this.scrollView) {
            this.scrollView.scrollTo({
                x: offset,
                y: 0,
                animated: !this.props.scrollWithoutAnimation,
            });
        }

        const { currentPage } = this.state;
        this.updateSceneKeys({
            page: pageNumber,
            callback: this._onChangeTab.bind(this, currentPage, pageNumber),
        });


    }

    updateSceneKeys({ page, children = this.props.children, callback = () => { } }) {
        let newKeys = this.newSceneKeys({
            previousKeys: this.state.sceneKeys,
            currentPage: page,
            children,
        });
        this.setState({ currentPage: page, sceneKeys: newKeys }, callback);
    }

    newSceneKeys({ previousKeys = [], currentPage = 0, children = this.props.children }) {
        let newKeys = [];
        this._children(children).forEach((child, idx) => {
            let key = this._makeSceneKey(child, idx);
            if (this._keyExists(previousKeys, key) || this._shouldRenderSceneKey(idx, currentPage)) {
                newKeys.push(key);
            }
        });
        return newKeys;
    }

    _shouldRenderSceneKey(idx, currentPageKey) {
        let numOfSibling = this.props.prerenderingSiblingsNumber;
        return idx < currentPageKey + numOfSibling + 1 && idx > currentPageKey - numOfSibling - 1;
    }

    _keyExists(sceneKeys, key) {
        return sceneKeys.find(sceneKey => key === sceneKey);
    }

    _makeSceneKey(child, idx) {
        return child.props.heading + "_" + idx;
    }

    _composeScenes() {
        return this._children().map((child, idx) => {
            let key = this._makeSceneKey(child, idx);
            return (
                <SceneComponent
                    key={child.key}
                    shouldUpdated={this._shouldRenderSceneKey(idx, this.state.currentPage)}
                    style={{ width: this.state.containerWidth }}
                >
                    {this._keyExists(this.state.sceneKeys, key) ? (
                        child
                    ) : (
                            <View heading={child.props.heading} />
                        )}
                </SceneComponent>
            );
        });
    }
    _onScroll(e) {

        console.log("_onScroll", e.nativeEvent.contentOffset.x);

        if (!this.initialRender) {
            const offsetX = e.nativeEvent.contentOffset.x;
            this._updateScrollValue(offsetX / this.state.containerWidth);
        }
    }

    _updateScrollValue(value) {
        this.state.scrollValue.setValue(value);
        if (this.props.onScroll) {
            this.props.onScroll(value);
        }
    }

    _onMomentumScrollBeginAndEnd(e) {
        console.log("_onMomentumScrollBeginAndEnd");
        const offsetX = e.nativeEvent.contentOffset.x;
        const page = Math.round(offsetX / this.state.containerWidth);
        if (this.state.currentPage !== page) {
            this._updateSelectedPage(page);
        }
        if (this.initialRender) {
            this.initialRender = false;
        }
    }

    _updateSelectedPage(nextPage) {
        let localNextPage = nextPage;
        if (typeof localNextPage === "object") {
            localNextPage = nextPage.nativeEvent.position;
        }
        const { currentPage } = this.state;

        this.updateSceneKeys({
            page: localNextPage,
            callback: this._onChangeTab.bind(this, currentPage, localNextPage),
        });
    }

    _onChangeTab(prevPage, currentPage) {
        this.props.onChangeTab({
            i: currentPage,
            ref: this._children()[currentPage],
            from: prevPage,
        });
    }

    _handleLayout(e) {
        const { width } = e.nativeEvent.layout;
        if (Math.round(width) !== Math.round(this.state.containerWidth)) {
            this.setState({ containerWidth: width }, () => {
                this.requestAnimationFrame(() => {
                    this.goToPage(this.state.currentPage);
                });
            });

        }
    }

    _children(children = this.props.children) {
        return React.Children.map(children, child => child);
    }

    renderTabBar(props) {
        if (this.props.renderTabBar === false) {
            return null;
        } else if (this.props.renderTabBar) {
            return React.cloneElement(this.props.renderTabBar(props), props);
        } else {
            return <DefaultTabBar {...props} />;
        }
    }

    renderScrollableContent() {
        const scenes = this._composeScenes();
        return (
            <ScrollView
                horizontal
                pagingEnabled
                automaticallyAdjustContentInsets={false}
                // contentOffset={{
                //     x: this.props.initialPage * this.state.containerWidth
                // }}
                ref={scrollView => {
                    this.scrollView = scrollView;
                }}
                onScroll={e => this._onScroll(e)}
                onMomentumScrollBegin={(e) => this._onMomentumScrollBeginAndEnd(e)}
                onMomentumScrollEnd={(e) => this._onMomentumScrollBeginAndEnd(e)}
                scrollEventThrottle={16}
                scrollsToTop={false}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={!this.props.locked}
                directionalLockEnabled
                alwaysBounceVertical={false}
                keyboardDismissMode="on-drag"
                {...this.props.contentProps}
            >
                {scenes}
            </ScrollView>
        );
    }

    render() {
        let overlayTabs =
            this.props.tabBarPosition === "overlayTop" || this.props.tabBarPosition === "overlayBottom";

        let tabBarProps = {
            goToPage: (pageNumber) => this.goToPage(pageNumber),
            tabs: this._children().map(child => child.props.heading),
            tabStyle: this._children().map(child => child.props.tabStyle),
            activeTabStyle: this._children().map(child => child.props.activeTabStyle),
            textStyle: this._children().map(child => child.props.textStyle),
            activeTextStyle: this._children().map(child => child.props.activeTextStyle),
            tabHeaderStyle: this._children().map(child =>
                _.get(child.props.heading.props, "style", undefined)
            ),
            activeTab: this.state.currentPage,
            scrollValue: this.state.scrollValue,
            containerWidth: this.state.containerWidth,
        };

        if (this.props.tabBarBackgroundColor) {
            tabBarProps.backgroundColor = this.props.tabBarBackgroundColor;
        }
        if (this.props.tabBarActiveTextColor) {
            tabBarProps.activeTextColor = this.props.tabBarActiveTextColor;
        }
        if (this.props.tabBarInactiveTextColor) {
            tabBarProps.inactiveTextColor = this.props.tabBarInactiveTextColor;
        }
        if (this.props.tabBarTextStyle) {
            tabBarProps.textStyle = this.props.tabBarTextStyle;
        }
        if (this.props.tabBarUnderlineStyle) {
            tabBarProps.underlineStyle = this.props.tabBarUnderlineStyle;
        }
        if (this.props.tabContainerStyle) {
            tabBarProps.tabContainerStyle = this.props.tabContainerStyle;
        }
        if (overlayTabs) {
            tabBarProps.style = {
                position: "absolute",
                left: 0,
                right: 0,
                [this.props.tabBarPosition === "overlayTop" ? "top" : "bottom"]: 0,
            };
        }

        return (
            <View style={[styles.container, this.props.style]} onLayout={(e) => this._handleLayout(e)}>
                {this.props.tabBarPosition === "top" && this.renderTabBar(tabBarProps)}
                {this.renderScrollableContent()}
                {(this.props.tabBarPosition === "bottom" || overlayTabs) && this.renderTabBar(tabBarProps)}
            </View>
        );
    }
}

export default ReactMixin.onClass(ScrollableTabView, TimerMixin);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollableContentAndroid: {
        flex: 1,
    },
});