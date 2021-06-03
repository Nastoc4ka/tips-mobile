import React from 'react';

const Loading = () => {
    const loading = useSelector((state) => state.systemReducer.loading);

    return loading
        ? <ActivityIndicator size='large' color='#00A03E' style={styles.loading} />
        : null
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: [{translateY: -20}, {translateX: -20}]
    }
});

export default Loading;