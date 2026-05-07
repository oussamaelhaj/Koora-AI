import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/constants/theme';

// Splash Screen Component
function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Spin the football
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Scale in
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Fade out after delay
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 2200);
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.splash, { opacity: fadeAnim }]}>
      <LinearGradient colors={COLORS.gradientPrimary} style={styles.splashGradient}>
        <Animated.View style={[styles.splashContent, { transform: [{ scale: scaleAnim }] }]}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <FontAwesome5 name="futbol" size={50} color="#fff" />
          </Animated.View>
          <View style={styles.splashTitleRow}>
            <Text style={styles.splashTitle}>KOORAZONE</Text>
            <Text style={styles.splashTitleAccent}> FOOT</Text>
          </View>
          <Text style={styles.splashSubtitle}>Football Live • Scores • Actualités</Text>
        </Animated.View>
        <View style={styles.splashSpinner}>
          <View style={styles.spinnerTrack}>
            <Animated.View style={[styles.spinnerDot, { transform: [{ rotate: spin }] }]}>
              <View style={styles.dot} />
            </Animated.View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <AppNavigator />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  splash: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  splashGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    alignItems: 'center',
    gap: 16,
  },
  splashTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  splashTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 3,
  },
  splashTitleAccent: {
    fontSize: 36,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 3,
  },
  splashSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    letterSpacing: 1,
  },
  splashSpinner: {
    position: 'absolute',
    bottom: 80,
  },
  spinnerTrack: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.15)',
    borderTopColor: COLORS.secondary,
  },
  spinnerDot: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: -3,
    left: -3,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -4,
  },
});
