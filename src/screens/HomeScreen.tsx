import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,
  Animated, Dimensions, RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS, FONTS } from '../constants/theme';
import { fetchFootballStories, FootballStory } from '../services/api';
import { WORLD_CUP_GROUPS } from '../constants/worldcup';

const { width } = Dimensions.get('window');

// World Cup Countdown Component
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('June 11, 2026 00:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) return;
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <View style={styles.timeBox}>
      <LinearGradient colors={['rgba(32,90,40,0.6)', 'rgba(32,90,40,0.3)']} style={styles.timeBoxGradient}>
        <Text style={styles.timeValue}>{value < 10 ? `0${value}` : value}</Text>
      </LinearGradient>
      <Text style={styles.timeLabel}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.countdownContainer}>
      <View style={styles.countdownHeader}>
        <Image source={{ uri: 'https://flagcdn.com/w40/us.png' }} style={styles.miniFlag} />
        <Image source={{ uri: 'https://flagcdn.com/w40/ca.png' }} style={styles.miniFlag} />
        <Image source={{ uri: 'https://flagcdn.com/w40/mx.png' }} style={styles.miniFlag} />
        <FontAwesome5 name="trophy" size={14} color={COLORS.gold} />
        <Text style={styles.countdownTitle}>FIFA World Cup 2026</Text>
      </View>
      <View style={styles.timeRow}>
        <TimeBox value={timeLeft.days} label="JOURS" />
        <Text style={styles.timeSeparator}>:</Text>
        <TimeBox value={timeLeft.hours} label="HEURES" />
        <Text style={styles.timeSeparator}>:</Text>
        <TimeBox value={timeLeft.minutes} label="MIN" />
        <Text style={styles.timeSeparator}>:</Text>
        <TimeBox value={timeLeft.seconds} label="SEC" />
      </View>
    </View>
  );
};

// Story Card
const StoryCard = ({ story, index }: { story: FootballStory; index: number }) => {
  const icons = ['trophy', 'futbol', 'history', 'star'] as const;
  return (
    <View style={styles.storyCard}>
      <LinearGradient colors={COLORS.gradientCard} style={styles.storyCardGradient}>
        <View style={styles.storyIconContainer}>
          <FontAwesome5 name={icons[index % icons.length]} size={22} color={COLORS.secondary} />
        </View>
        <Text style={styles.storyTitle}>{story.title}</Text>
        <Text style={styles.storyText} numberOfLines={4}>{story.story}</Text>
      </LinearGradient>
    </View>
  );
};

// Group Card
const GroupCard = ({ group }: { group: typeof WORLD_CUP_GROUPS[0] }) => (
  <View style={styles.groupCard}>
    <LinearGradient colors={['rgba(32,90,40,0.2)', 'rgba(18,26,20,0.6)']} style={styles.groupCardInner}>
      <Text style={styles.groupTitle}>{group.name}</Text>
      {group.teams.map((team, i) => (
        <View key={i} style={styles.teamRow}>
          {team.flag ? (
            <Image source={{ uri: team.flag }} style={styles.teamFlag} />
          ) : (
            <Ionicons name="globe-outline" size={18} color={COLORS.textMuted} />
          )}
          <Text style={styles.teamName}>{team.name}</Text>
        </View>
      ))}
    </LinearGradient>
  </View>
);

export default function HomeScreen({ navigation }: any) {
  const [stories, setStories] = useState<FootballStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const loadData = async () => {
    try {
      const data = await fetchFootballStories();
      setStories(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      >
        {/* Hero Section */}
        <LinearGradient colors={COLORS.gradientHero} style={styles.hero}>
          <Animated.View style={[styles.heroContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveBadgeText}>SCORES EN TEMPS RÉEL</Text>
            </View>
            <Text style={styles.heroTitle}>FOOTBALL{'\n'}LIVE</Text>
            <Text style={styles.heroSubtitle}>
              Suivez tous les matchs en direct, résultats et actualités du football mondial
            </Text>
            <View style={styles.heroButtons}>
              <TouchableOpacity style={styles.heroBtnPrimary} onPress={() => navigation.navigate('LiveTab')}>
                <LinearGradient colors={COLORS.gradientPrimary} style={styles.heroBtnGradient}>
                  <Ionicons name="play" size={18} color="#fff" />
                  <Text style={styles.heroBtnText}>MATCHS LIVE</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.heroBtnSecondary} onPress={() => navigation.navigate('AITab')}>
                <LinearGradient colors={COLORS.gradientSecondary} style={styles.heroBtnGradient}>
                  <Ionicons name="chatbubble-ellipses" size={18} color="#fff" />
                  <Text style={styles.heroBtnText}>ASSISTANT IA</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </LinearGradient>

        {/* Countdown */}
        <CountdownTimer />

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          {[
            { icon: 'football', label: 'Matchs Live', color: COLORS.live },
            { icon: 'trophy-outline', label: 'Groupes 2026', color: COLORS.gold },
            { icon: 'newspaper-outline', label: 'Histoires', color: COLORS.accent },
          ].map((item, i) => (
            <TouchableOpacity key={i} style={styles.quickStatItem}>
              <View style={[styles.quickStatIcon, { backgroundColor: `${item.color}20` }]}>
                <Ionicons name={item.icon as any} size={24} color={item.color} />
              </View>
              <Text style={styles.quickStatLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* World Cup Groups Preview */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionBadge}>
              <FontAwesome5 name="users" size={12} color="#fff" />
              <Text style={styles.sectionBadgeText}>GROUPES 2026</Text>
            </View>
            <Text style={styles.sectionTitle}>Tirage au Sort</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.groupsScroll}>
            {WORLD_CUP_GROUPS.slice(0, 6).map((group, i) => (
              <GroupCard key={i} group={group} />
            ))}
          </ScrollView>
        </View>

        {/* Stories Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionBadge, { backgroundColor: COLORS.secondary }]}>
              <FontAwesome5 name="history" size={12} color="#fff" />
              <Text style={styles.sectionBadgeText}>HISTOIRES DU FOOT</Text>
            </View>
            <Text style={styles.sectionTitle}>Moments Légendaires</Text>
            <Text style={styles.sectionDescription}>Découvrez des histoires fascinantes du football</Text>
          </View>
          {loading ? (
            <View style={styles.loadingContainer}>
              {[0, 1, 2].map(i => (
                <View key={i} style={styles.skeletonCard}>
                  <View style={styles.skeletonLine} />
                  <View style={[styles.skeletonLine, { width: '70%' }]} />
                  <View style={[styles.skeletonLine, { width: '85%' }]} />
                </View>
              ))}
            </View>
          ) : (
            stories.map((story, i) => <StoryCard key={i} story={story} index={i} />)
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  // Hero
  hero: { paddingTop: 60, paddingBottom: 40, paddingHorizontal: SPACING.xl, minHeight: 420 },
  heroContent: { alignItems: 'center' },
  liveBadge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.secondary,
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: RADIUS.full, marginBottom: 20,
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff', marginRight: 8 },
  liveBadgeText: { color: '#fff', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  heroTitle: {
    fontSize: FONTS.sizes.display, fontWeight: '900', color: '#fff',
    textAlign: 'center', lineHeight: 48, letterSpacing: 2, marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: FONTS.sizes.lg, color: 'rgba(255,255,255,0.85)', textAlign: 'center',
    lineHeight: 24, marginBottom: 28, paddingHorizontal: 20,
  },
  heroButtons: { flexDirection: 'row', gap: 12 },
  heroBtnPrimary: { borderRadius: RADIUS.full, overflow: 'hidden' },
  heroBtnSecondary: { borderRadius: RADIUS.full, overflow: 'hidden' },
  heroBtnGradient: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22, paddingVertical: 14,
    borderRadius: RADIUS.full, gap: 8,
  },
  heroBtnText: { color: '#fff', fontWeight: '800', fontSize: 13, letterSpacing: 0.5 },
  // Countdown
  countdownContainer: {
    marginHorizontal: SPACING.lg, marginTop: -20, borderRadius: RADIUS.xl,
    backgroundColor: 'rgba(32,90,40,0.15)', borderWidth: 1, borderColor: COLORS.bgGlassBorder,
    padding: SPACING.lg, ...SHADOWS.card,
  },
  countdownHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 14 },
  miniFlag: { width: 24, height: 16, borderRadius: 2 },
  countdownTitle: { color: '#fff', fontWeight: '800', fontSize: 13, marginLeft: 4 },
  timeRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 },
  timeBox: { alignItems: 'center' },
  timeBoxGradient: { width: 56, height: 56, borderRadius: RADIUS.md, justifyContent: 'center', alignItems: 'center' },
  timeValue: { color: '#fff', fontSize: 22, fontWeight: '900' },
  timeLabel: { color: COLORS.textMuted, fontSize: 9, fontWeight: '700', marginTop: 4, letterSpacing: 0.5 },
  timeSeparator: { color: COLORS.primary, fontSize: 24, fontWeight: '900', marginTop: -12 },
  // Quick Stats
  quickStats: {
    flexDirection: 'row', justifyContent: 'space-around', paddingVertical: SPACING.xl,
    marginHorizontal: SPACING.lg, marginTop: SPACING.xl,
  },
  quickStatItem: { alignItems: 'center', gap: 8 },
  quickStatIcon: {
    width: 52, height: 52, borderRadius: RADIUS.lg, justifyContent: 'center', alignItems: 'center',
  },
  quickStatLabel: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '600' },
  // Sections
  sectionContainer: { marginTop: SPACING.xxxl, paddingHorizontal: SPACING.lg },
  sectionHeader: { marginBottom: SPACING.xl },
  sectionBadge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary,
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: RADIUS.full, alignSelf: 'flex-start',
    gap: 6, marginBottom: 12,
  },
  sectionBadgeText: { color: '#fff', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  sectionTitle: { color: '#fff', fontSize: FONTS.sizes.xxl, fontWeight: '900', marginBottom: 6 },
  sectionDescription: { color: COLORS.textMuted, fontSize: FONTS.sizes.md },
  // Groups
  groupsScroll: { paddingRight: SPACING.lg, gap: 12 },
  groupCard: {
    width: 180, borderRadius: RADIUS.lg, overflow: 'hidden', borderWidth: 1,
    borderColor: COLORS.bgGlassBorder,
  },
  groupCardInner: { padding: SPACING.lg },
  groupTitle: {
    color: COLORS.accent, fontWeight: '800', fontSize: 14, textAlign: 'center',
    marginBottom: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)',
    paddingBottom: 8,
  },
  teamRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  teamFlag: { width: 22, height: 15, borderRadius: 2 },
  teamName: { color: COLORS.textSecondary, fontSize: 12, fontWeight: '500' },
  // Stories
  storyCard: {
    marginBottom: SPACING.md, borderRadius: RADIUS.lg, overflow: 'hidden',
    borderWidth: 1, borderColor: COLORS.bgGlassBorder, ...SHADOWS.subtle,
  },
  storyCardGradient: { padding: SPACING.xl },
  storyIconContainer: {
    width: 44, height: 44, borderRadius: RADIUS.md, backgroundColor: 'rgba(199,43,50,0.15)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  storyTitle: { color: '#fff', fontSize: FONTS.sizes.lg, fontWeight: '700', marginBottom: 8 },
  storyText: { color: COLORS.textMuted, fontSize: FONTS.sizes.md, lineHeight: 22 },
  // Loading
  loadingContainer: { gap: 12 },
  skeletonCard: {
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.lg, padding: SPACING.xl, gap: 10,
  },
  skeletonLine: {
    height: 14, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 4, width: '100%',
  },
});
