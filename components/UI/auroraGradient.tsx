import React from 'react';
import Svg, {Defs, RadialGradient, Stop, Rect} from 'react-native-svg';
import {StyleSheet, View} from 'react-native';

const GradientBackground = () => {
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%">
        <Defs>
          <RadialGradient
            id="grad"
            cx="50%"
            cy="50%"
            rx="50%"
            ry="50%"
            fx="50%"
            fy="50%"
            gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#ff0" stopOpacity="1" />
            <Stop offset="30%" stopColor="#f0f" stopOpacity="0.8" />
            <Stop offset="70%" stopColor="#0ff" stopOpacity="0.6" />
            <Stop offset="100%" stopColor="#00f" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GradientBackground;
