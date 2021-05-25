import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, TouchableOpacity, View,} from "react-native";
import {SwipeListView} from 'react-native-swipe-list-view';
import {getNews} from '../../services/serviceQueries';
import {Avatar} from 'react-native-elements';
import {Dot, Flag_petite, Icn_arrow, Reaction_petite} from '../../assets/icons';
import {styleNewsItem} from '../../styles';

const News = ({id}) => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        setNews(getNews(id));
    }, []);

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const toggleImportant = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey)
    };

    const reactToNews = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
    };

    const VisibleItem = props => {
        const {
            data,
            rowHeightAnimatedValue,
        } = props;

        return (
            <TouchableHighlight onPress={() => console.log('pressed')}>
                <View style={styleNewsItem.wrapper}>
                    <View style={styleNewsItem.isRead}>
                        {data.isRead ? null : <Dot/>}
                    </View>
                    <View style={styleNewsItem.innerWrapper}>
                        <View style={styleNewsItem.avatar}>
                            <Avatar title="MD" rounded size={45} source={data.avatar}/>
                        </View>
                        <View style={styleNewsItem.main}>
                            <Text numberOfLines={1} ellipsizeMode='tail'
                                  style={styleNewsItem.author}>{data.author}</Text>
                            <Text numberOfLines={1} ellipsizeMode='tail'
                                  style={styleNewsItem.label}>{data.label}</Text>
                            <Text numberOfLines={1} ellipsizeMode='tail'
                                  style={styleNewsItem.description}>{data.description}</Text>
                        </View>
                        <View style={styleNewsItem.icons}>
                            <View style={styleNewsItem.wrapperIcons}>
                                <Text style={styleNewsItem.date}>{data.dateFormated}</Text>
                                <TouchableOpacity style={styleNewsItem.icon}><Icn_arrow/></TouchableOpacity>
                            </View>
                            <View style={styleNewsItem.wrapperIcons}>
                                {data.important ? <Flag_petite/> : null}
                            </View>
                            <View style={styleNewsItem.wrapperIcons}>
                                <Text style={styleNewsItem.reactions}>{data.reactions.length}</Text>
                                <Reaction_petite/>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };

    const renderItem = (data) => {
        //const rowHeightAnimatedValue = new Animated.Value(60);
        return (
            <VisibleItem
                data={data.item}
                //rowHeightAnimatedValue={rowHeightAnimatedValue}
            />
        );
    };

    const HiddenItemWithActions = ({onImportant, onReact}) => {

        return (
            <View style={styles.rowBack}>
                <Text>left</Text>
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnLeft]}
                    onPress={onImportant}>
                    <Text>Флажок</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={onReact}>
                    <Text>Реакция</Text>
                </TouchableOpacity>
            </View>)
    };

    const renderHiddenItem = (data, rowMap) => {

        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                onReact={() => reactToNews(rowMap, data.item.id)}
                onImportant={() => toggleImportant(rowMap, data.item.id)}
            />
        );
    };

    return (
        <>
            {news.length ?
                <SwipeListView
                    style={styles.container}
                    data={news}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-100}
                    disableRightSwipe
                />
                : null}
        </>
    );
};

export default News;

const styles = StyleSheet.create({
    container: {
        overflow: 'visible',
    },
    rowFront: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        margin: 5,
        marginBottom: 15,
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    rowFrontVisible: {
        backgroundColor: '#FFF',
        width: '100%',
        borderRadius: 5,
        height: 60,
        padding: 10,
        marginBottom: 15,
    },
    rowBack: {
        alignItems: 'center',
        position: 'absolute',
        right: 0,
    },
    backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 50,
        height: 76,
    },
    backRightBtnLeft: {
        backgroundColor: '#FFA200',
        right: 50,
    },
    backRightBtnRight: {
        backgroundColor: '#0087CB',
        right: 0,
    },
    trash: {
        height: 25,
        width: 25,
        marginRight: 7,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#666',
    },
    details: {
        fontSize: 12,
        color: '#999',
    },
});