import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {Avatar} from 'react-native-elements';
import {SwipeRow} from 'react-native-swipe-list-view';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import {Flag_petite, Icn_arrow, Reaction_petite} from '../assets/icons';
import {styleNewsItem} from '../styles';


const NewsItem = ({newsItem: {avatar = null, author, label, description, dateFormated, important, reactions}}) => {

    return (
        //<SwipeRow style={styleNewsItem.wrapper} rightOpenValue={-100}>
            //<TouchableOpacity >
               // <Text>hidden</Text>
            //</TouchableOpacity>
            <TouchableOpacity style={styleNewsItem.wrapper}>
                <View style={styleNewsItem.avatar}>
                    <Avatar title="MD" rounded size="medium" source={avatar}/>
                </View>
                <View style={styleNewsItem.main}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styleNewsItem.author}>{author}</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styleNewsItem.label}>{label}</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styleNewsItem.description}>{description}</Text>
                </View>
                <View style={styleNewsItem.icons}>
                    <View style={styleNewsItem.wrapperIcons}>
                        <Text style={styleNewsItem.date}>{dateFormated}</Text>
                        <TouchableOpacity style={styleNewsItem.icon}><Icn_arrow/></TouchableOpacity>
                    </View>
                    <View style={styleNewsItem.wrapperIcons}>
                        {important ? <Flag_petite/> : null}
                    </View>
                    <View style={styleNewsItem.wrapperIcons}>
                        <Text style={styleNewsItem.reactions}>{reactions.length}</Text>
                        <Reaction_petite/>
                    </View>
                </View>
            </TouchableOpacity>
        // </SwipeRow>
    )
};

export default NewsItem;