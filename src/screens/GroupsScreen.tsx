import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../constants/theme';
import { WORLD_CUP_GROUPS } from '../constants/worldcup';

export default function GroupsScreen() {
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <LinearGradient colors={COLORS.gradientPrimary} style={styles.header}>
        <Text style={styles.headerTitle}>Groupes 2026</Text>
        <Text style={styles.headerSub}>FIFA World Cup • USA / Canada / Mexico</Text>
        <View style={styles.flagRow}>
          {['us', 'ca', 'mx'].map(c => (
            <Image key={c} source={{ uri: `https://flagcdn.com/w40/${c}.png` }} style={styles.hdrFlag} />
          ))}
        </View>
      </LinearGradient>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {WORLD_CUP_GROUPS.map((group, gi) => (
          <TouchableOpacity
            key={gi}
            activeOpacity={0.85}
            onPress={() => setExpandedGroup(expandedGroup === gi ? null : gi)}
          >
            <View style={[styles.card, expandedGroup === gi && styles.cardExpanded]}>
              <LinearGradient
                colors={expandedGroup === gi ? ['rgba(32,90,40,0.25)', 'rgba(18,26,20,0.8)'] : COLORS.gradientCard}
                style={styles.cardInner}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.groupBadge}>
                    <Text style={styles.groupBadgeText}>{group.name.replace('Groupe ', '')}</Text>
                  </View>
                  <Text style={styles.groupName}>{group.name}</Text>
                  <Ionicons
                    name={expandedGroup === gi ? 'chevron-up' : 'chevron-down'}
                    size={18} color={COLORS.textMuted}
                  />
                </View>
                <View style={styles.teamsContainer}>
                  {group.teams.map((team, ti) => (
                    <View key={ti} style={[styles.teamRow, expandedGroup === gi && styles.teamRowExpanded]}>
                      <View style={styles.teamLeft}>
                        <Text style={styles.teamIndex}>{ti + 1}</Text>
                        {team.flag ? (
                          <Image source={{ uri: team.flag }} style={styles.teamFlag} />
                        ) : (
                          <View style={styles.tbdFlag}>
                            <Ionicons name="globe-outline" size={14} color={COLORS.textMuted} />
                          </View>
                        )}
                        <Text style={styles.teamName}>{team.name}</Text>
                      </View>
                      {expandedGroup === gi && (
                        <View style={styles.teamStats}>
                          <Text style={styles.statText}>0</Text>
                          <Text style={styles.statText}>0</Text>
                          <Text style={styles.statText}>0</Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
                {expandedGroup === gi && (
                  <View style={styles.statsHeader}>
                    <View style={styles.teamLeft}><Text style={styles.statsLabel}>Équipe</Text></View>
                    <View style={styles.teamStats}>
                      <Text style={styles.statsLabel}>V</Text>
                      <Text style={styles.statsLabel}>N</Text>
                      <Text style={styles.statsLabel}>D</Text>
                    </View>
                  </View>
                )}
              </LinearGradient>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  header: { paddingTop: 55, paddingBottom: 24, paddingHorizontal: SPACING.xl, alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 26, fontWeight: '900', marginBottom: 4 },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 12 },
  flagRow: { flexDirection: 'row', gap: 8 },
  hdrFlag: { width: 32, height: 20, borderRadius: 3 },
  scroll: { padding: SPACING.lg, gap: 10 },
  card: { borderRadius: RADIUS.lg, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.bgGlassBorder, ...SHADOWS.subtle },
  cardExpanded: { borderColor: 'rgba(32,90,40,0.4)' },
  cardInner: { padding: SPACING.lg },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  groupBadge: { width: 32, height: 32, borderRadius: RADIUS.sm, backgroundColor: 'rgba(255,152,0,0.2)', justifyContent: 'center', alignItems: 'center' },
  groupBadgeText: { color: COLORS.accent, fontWeight: '900', fontSize: 13 },
  groupName: { flex: 1, color: '#fff', fontSize: 16, fontWeight: '700' },
  teamsContainer: { gap: 2 },
  teamRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  teamRowExpanded: { paddingVertical: 10 },
  teamLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  teamIndex: { color: COLORS.textMuted, fontSize: 11, fontWeight: '600', width: 16 },
  teamFlag: { width: 24, height: 16, borderRadius: 2 },
  tbdFlag: { width: 24, height: 16, justifyContent: 'center', alignItems: 'center' },
  teamName: { color: COLORS.textSecondary, fontSize: 13, fontWeight: '500' },
  teamStats: { flexDirection: 'row', gap: 16 },
  statText: { color: COLORS.textMuted, fontSize: 13, fontWeight: '600', width: 20, textAlign: 'center' },
  statsHeader: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
  statsLabel: { color: COLORS.textMuted, fontSize: 10, fontWeight: '700' },
});
