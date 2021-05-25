import React, { useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from "react-native";
import {Avatar} from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import {Flag_petite, Icn_arrow, Reaction_petite} from '../assets/icons';
import {styleNewsItem} from '../styles';


const NewsItem = ({newsItem: {avatar = null, author, label, description, dateFormated, important, reactions = []}}) => {

    const [currentlyOpenSwipeable, setCurrentlyOpenSwipeable] = useState(null);

    const itemProps = {
        onOpen: (event, gestureState, swipeable) => {
            if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
                currentlyOpenSwipeable.recenter();
            }

            setCurrentlyOpenSwipeable(swipeable);
        },
        onClose: () => setCurrentlyOpenSwipeable(null)
    };

    const handleScroll = () => {

        if (currentlyOpenSwipeable) {
            currentlyOpenSwipeable.recenter();
        }
    };

    const leftContent = <TouchableOpacity style={styleNewsItem.wrapper}>
        <View style={styleNewsItem.avatar}>
            <Avatar title="MD" rounded size="medium" source={avatar}/>
        </View>
        <View style={styleNewsItem.main}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styleNewsItem.author}>{author}</Text>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styleNewsItem.label}>{label}</Text>
            <Text numberOfLines={1} ellipsizeMode='tail'
                  style={styleNewsItem.description}>{description}</Text>
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
    </TouchableOpacity>;

    return (
        <ScrollView onScroll={handleScroll} style={styles.container}>
            <Swipeable
                leftContent={leftContent}
                rightButtons={[
                    <TouchableOpacity style={[styles.rightSwipeItem, {backgroundColor: 'lightseagreen'}]}>
                        <Text>1</Text>
                    </TouchableOpacity>,
                    <TouchableOpacity style={[styles.rightSwipeItem, {backgroundColor: 'orchid'}]}>
                        <Text>2</Text>
                    </TouchableOpacity>
                ]}
                onRightButtonsOpenRelease={itemProps.onOpen}
                onRightButtonsCloseRelease={itemProps.onClose}>

            </Swipeable>
        </ScrollView>
    )
};

export default NewsItem;