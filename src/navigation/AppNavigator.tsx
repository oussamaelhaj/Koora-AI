import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';

import HomeScreen from '../screens/HomeScreen';
import LiveScreen from '../screens/LiveScreen';
import GroupsScreen from '../screens/GroupsScreen';
import AIScreen from '../screens/AIScreen';
import MoreScreen from '../screens/MoreScreen';

const Tab = createBottomTabNavigator();

function TabBarBackground() {
  return (
    <LinearGradient
      colors={['rgba(10, 14, 15, 0.98)', 'rgba(10, 14, 15, 1)']}
      style={StyleSheet.absoluteFill}
    />
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'rgba(10, 14, 15, 0.98)',
            borderTopWidth: 1,
            borderTopColor: 'rgba(255,255,255,0.06)',
            height: 85,
            paddingBottom: 25,
            paddingTop: 8,
            position: 'absolute',
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textMuted,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.3,
          },
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Accueil',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={22} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="LiveTab"
          component={LiveScreen}
          options={{
            tabBarLabel: 'Direct',
            tabBarIcon: ({ color, focused }) => (
              <View style={{ alignItems: 'center' }}>
                {focused && <View style={styles.liveDot} />}
                <Ionicons name="play-circle" size={22} color={color} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="GroupsTab"
          component={GroupsScreen}
          options={{
            tabBarLabel: 'Groupes',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="trophy" size={18} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="AITab"
          component={AIScreen}
          options={{
            tabBarLabel: 'IA',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="robot" size={18} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="MoreTab"
          component={MoreScreen}
          options={{
            tabBarLabel: 'Plus',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ellipsis-horizontal" size={22} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.live,
    position: 'absolute',
    top: -2,
    right: -2,
    zIndex: 1,
  },
});
