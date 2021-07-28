const config = {
    verbose: true,
    preset: "react-native",
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
    transformIgnorePatterns: [
        "node_modules/(?!(react-native"
        + "|react-native-calendar-picker"
        + "|@react-native"
        + "|react-native-modal"
        + "|react-native-elements"
        + "|react-native-size-matters"
        + "|react-native-ratings"
        + "|react-native-swipe-list-view"
        + "|@react-native-community"
        + "|react-native-animatable"
        + "|react-native-image-crop-picker"
        + "|react-native-portalize"
        + ")/)",
    ]
};

module.exports = config;