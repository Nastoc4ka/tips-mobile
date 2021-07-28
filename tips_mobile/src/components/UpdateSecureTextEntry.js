import React from 'react';
import { TouchableOpacity } from 'react-native';
import {VisibilityHide, VisibilityShow} from '../assets/icons';
import IconInInputView from "./IconInInputView";

const UpdateSecureTextEntry = ({secureTextEntry, updateSecureTextEntry}) => {
    return (
        <TouchableOpacity onPress={updateSecureTextEntry}>
            <IconInInputView>
                {secureTextEntry ? <VisibilityHide/> : <VisibilityShow/>}
            </IconInInputView>
        </TouchableOpacity>
    )
};

export default UpdateSecureTextEntry;