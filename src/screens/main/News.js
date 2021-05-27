import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { getNews, toggleImportantNews } from '../../services/serviceQueries';
import { Avatar } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Dot, Flag_petite, Icn_arrow, Reaction_petite, Reaction_huge, Flag_huge } from '../../assets/icons';
import { styleNewsItem } from '../../styles';

const News = ({id: userId}) => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        setNews(getNews(userId));
    }, []);

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const toggleImportant = (rowMap, rowKey, id) => {
        toggleImportantNews(id);
        setNews(getNews(userId));
        return closeRow(rowMap, rowKey)
    };

    const reactToNews = (rowMap, rowKey, id) => {
        console.log(id);
        return closeRow(rowMap, rowKey);
    };

    const VisibleItem = ({data}) => {

        return (
            <TouchableHighlight onPress={() => console.log('pressed')}>
                <View style={styleNewsItem.wrapper}>
                    <View style={styleNewsItem.isRead}>
                        {data.isRead ? null : <Dot/>}
                    </View>
                    <View style={styleNewsItem.innerWrapper}>
                        <View style={styleNewsItem.avatar}>
                            <Avatar title={data.author[0]} rounded containerStyle={{backgroundColor: 'lightgrey'}}size={45} source={data.avatar}/>
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

        return (
            <VisibleItem data={data.item}/>
        );
    };

    const HiddenItemWithActions = ({onImportant, onReact}) => {

        return (
            <View style={styles.rowBack}>
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnLeft]}
                    onPress={onImportant}>
                    <Flag_huge />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={onReact}>
                    <Reaction_huge />
                </TouchableOpacity>
            </View>
        )
    };

    const renderHiddenItem = (data, rowMap) => {
        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                onReact={() => reactToNews(rowMap, data.item.key, data.item.id)}
                onImportant={() => toggleImportant(rowMap, data.item.key, data.item.id)}
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
<<<<<<< HEAD
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
=======
>>>>>>> 678659e327cf0e40871a68c958898d76d5e90a27
    },
    rowBack: {
        alignItems: 'center',
        position: 'absolute',
        right: 0,
<<<<<<< HEAD
        //flex: 1,
        //flexDirection: 'row',
        //justifyContent: 'space-between',
=======
>>>>>>> 678659e327cf0e40871a68c958898d76d5e90a27
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
});