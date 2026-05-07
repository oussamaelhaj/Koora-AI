import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, FONTS } from '../constants/theme';
import { SCOREBAT } from '../constants/api';

const { width } = Dimensions.get('window');
type TabType = 'goals' | 'live';

export default function LiveScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('goals');
  const [loading, setLoading] = useState(true);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const switchTab = (tab: TabType) => {
    if (tab === activeTab) return;
    Animated.timing(slideAnim, { toValue: tab === 'goals' ? 0 : 1, duration: 300, useNativeDriver: false }).start();
    setActiveTab(tab);
    setLoading(true);
  };

  const indicatorLeft = slideAnim.interpolate({ inputRange: [0, 1], outputRange: [0, (width - 40) / 2] });

  return (
    <View style={styles.container}>
      <LinearGradient colors={COLORS.gradientPrimary} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitleRow}>
            <View style={styles.liveIndicator}>
              <View style={styles.livePulse} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
            <Text style={styles.headerTitle}>Buts & Matchs</Text>
          </View>
          <Text style={styles.headerSub}>Regardez en direct • Plein écran</Text>
        </View>
        <View style={styles.tabContainer}>
          <Animated.View style={[styles.tabIndicator, { left: indicatorLeft }]} />
          <TouchableOpacity style={styles.tab} onPress={() => switchTab('goals')}>
            <FontAwesome5 name="futbol" size={14} color={activeTab === 'goals' ? '#fff' : 'rgba(255,255,255,0.5)'} />
            <Text style={[styles.tabText, activeTab === 'goals' && styles.tabTextActive]}>Vidéos Buts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => switchTab('live')}>
            <Ionicons name="videocam" size={16} color={activeTab === 'live' ? '#fff' : 'rgba(255,255,255,0.5)'} />
            <Text style={[styles.tabText, activeTab === 'live' && styles.tabTextActive]}>Matchs Live</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.webviewWrap}>
        {loading && (
          <View style={styles.loader}>
            <LinearGradient colors={COLORS.gradientPrimary} style={styles.loaderCard}>
              <Ionicons name="football" size={32} color="#fff" />
              <Text style={styles.loaderText}>Chargement...</Text>
            </LinearGradient>
          </View>
        )}
        <WebView
          key={activeTab}
          source={{ uri: activeTab === 'goals' ? SCOREBAT.goalsVideoFeed : SCOREBAT.livescoreFeed }}
          style={{ flex: 1, backgroundColor: COLORS.bgDark }}
          onLoadEnd={() => setLoading(false)}
          allowsFullscreenVideo javaScriptEnabled domStorageEnabled
          mediaPlaybackRequiresUserAction={false} allowsInlineMediaPlayback
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  header: { paddingTop: 50, paddingBottom: 16, paddingHorizontal: SPACING.xl },
  headerContent: { marginBottom: 16 },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  liveIndicator: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.live, paddingHorizontal: 10, paddingVertical: 4, borderRadius: RADIUS.full, gap: 5 },
  livePulse: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff' },
  liveText: { color: '#fff', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  headerTitle: { color: '#fff', fontSize: FONTS.sizes.xxl, fontWeight: '900' },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
  tabContainer: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: RADIUS.full, padding: 3, position: 'relative' },
  tabIndicator: { position: 'absolute', top: 3, bottom: 3, width: (width - 40) / 2 - 3, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: RADIUS.full },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, gap: 6, borderRadius: RADIUS.full },
  tabText: { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: '700' },
  tabTextActive: { color: '#fff' },
  webviewWrap: { flex: 1, position: 'relative' },
  loader: { ...StyleSheet.absoluteFillObject, zIndex: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.bgDark },
  loaderCard: { width: 160, height: 120, borderRadius: RADIUS.xl, justifyContent: 'center', alignItems: 'center', gap: 12 },
  loaderText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
