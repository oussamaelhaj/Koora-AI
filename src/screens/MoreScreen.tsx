import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../constants/theme';

const BENEFITS = [
  { icon: 'users', title: 'Réseau International', text: 'Connectez-vous avec des clubs du monde entier' },
  { icon: 'bullseye', title: 'Opportunités Variées', text: 'Des postes pour tous les profils et niveaux' },
  { icon: 'rocket', title: 'Carrière Rapide', text: "Accélérez votre progression dans l'industrie" },
];

const FEDERATIONS = [
  { name: 'Fédération Française', jobs: 'Entraîneurs, Analystes, Scouts', flag: 'fr' },
  { name: 'FA Premier League', jobs: 'Managers, Physios, Agents', flag: 'gb' },
  { name: 'RFEF La Liga', jobs: 'Techniciens, Recruteurs, Médias', flag: 'es' },
  { name: 'FIGC Serie A', jobs: 'Directeurs, Formateurs, Médecins', flag: 'it' },
];

const JOBS = ['Entraîneur', 'Joueur Pro', 'Scout', 'Analyste', 'Physiothérapeute', 'Nutritionniste', 'Manager', 'Agent'];

export default function MoreScreen() {
  const openSportsJobs = () => {
    Linking.openURL('https://www.sportsjobs.online?via=koorazone&ref=oussama');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={COLORS.gradientPrimary} style={styles.header}>
        <Text style={styles.headerTitle}>Plus</Text>
        <Text style={styles.headerSub}>Opportunités & Informations</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Sports Jobs Section */}
        <View style={styles.section}>
          <View style={styles.sectionBadge}>
            <FontAwesome5 name="briefcase" size={12} color="#fff" />
            <Text style={styles.badgeText}>OPPORTUNITÉS EXCLUSIVES</Text>
          </View>
          <Text style={styles.sectionTitle}>FAITES CARRIÈRE DANS LE SPORT</Text>

          <View style={styles.affiliateCard}>
            <LinearGradient colors={['rgba(32,90,40,0.2)', 'rgba(18,26,20,0.6)']} style={styles.affiliateInner}>
              <FontAwesome5 name="trophy" size={28} color={COLORS.gold} style={{ marginBottom: 12 }} />
              <Text style={styles.affiliateTitle}>SportsJobs</Text>
              <Text style={styles.affiliateSub}>Votre porte d'entrée vers une carrière passionnante</Text>
              <Text style={styles.affiliateDesc}>
                Découvrez des centaines d'opportunités d'emploi dans le monde du sport !
              </Text>

              {/* Benefits */}
              <View style={styles.benefitsGrid}>
                {BENEFITS.map((b, i) => (
                  <View key={i} style={styles.benefitCard}>
                    <FontAwesome5 name={b.icon} size={18} color={COLORS.secondary} />
                    <Text style={styles.benefitTitle}>{b.title}</Text>
                    <Text style={styles.benefitText}>{b.text}</Text>
                  </View>
                ))}
              </View>

              {/* Federations */}
              <Text style={styles.subHeader}>Fédérations qui Recrutent</Text>
              <View style={styles.fedGrid}>
                {FEDERATIONS.map((f, i) => (
                  <View key={i} style={styles.fedCard}>
                    <Image source={{ uri: `https://flagcdn.com/w40/${f.flag}.png` }} style={styles.fedFlag} />
                    <Text style={styles.fedName}>{f.name}</Text>
                    <Text style={styles.fedJobs}>{f.jobs}</Text>
                  </View>
                ))}
              </View>

              {/* Jobs */}
              <Text style={styles.subHeader}>Postes Disponibles</Text>
              <View style={styles.jobsGrid}>
                {JOBS.map((j, i) => (
                  <View key={i} style={styles.jobChip}>
                    <Text style={styles.jobText}>{j}</Text>
                  </View>
                ))}
              </View>

              {/* CTA */}
              <TouchableOpacity onPress={openSportsJobs} activeOpacity={0.8}>
                <LinearGradient colors={COLORS.gradientSecondary} style={styles.ctaBtn}>
                  <Ionicons name="open-outline" size={18} color="#fff" />
                  <Text style={styles.ctaText}>POSTULEZ MAINTENANT →</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <View style={[styles.sectionBadge, { backgroundColor: COLORS.accent }]}>
            <Ionicons name="information-circle" size={14} color="#fff" />
            <Text style={styles.badgeText}>À PROPOS</Text>
          </View>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>KOORAZONE FOOT</Text>
            <Text style={styles.aboutText}>
              Votre destination ultime pour suivre le football en direct. Scores, résultats et actualités du football mondial.
            </Text>
            <View style={styles.contactRow}>
              <Ionicons name="location" size={16} color={COLORS.primary} />
              <Text style={styles.contactText}>Casablanca, Maroc</Text>
            </View>
            <View style={styles.contactRow}>
              <Ionicons name="mail" size={16} color={COLORS.primary} />
              <Text style={styles.contactText}>oussamaelhajouji989@gmail.com</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 KOORAZONE FOOT</Text>
          <Text style={styles.footerText}>Tous droits réservés</Text>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  header: { paddingTop: 55, paddingBottom: 20, paddingHorizontal: SPACING.xl },
  headerTitle: { color: '#fff', fontSize: 26, fontWeight: '900' },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 2 },
  scroll: { padding: SPACING.lg },
  section: { marginBottom: SPACING.xxxl },
  sectionBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingHorizontal: 14, paddingVertical: 6, borderRadius: RADIUS.full, alignSelf: 'flex-start', gap: 6, marginBottom: 12 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: '900', marginBottom: 16 },
  // Affiliate
  affiliateCard: { borderRadius: RADIUS.xl, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.bgGlassBorder },
  affiliateInner: { padding: SPACING.xl, alignItems: 'center' },
  affiliateTitle: { color: '#fff', fontSize: 24, fontWeight: '900', marginBottom: 4 },
  affiliateSub: { color: COLORS.secondary, fontSize: 14, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  affiliateDesc: { color: COLORS.textMuted, fontSize: 13, textAlign: 'center', lineHeight: 22, marginBottom: 20 },
  benefitsGrid: { width: '100%', gap: 10, marginBottom: 20 },
  benefitCard: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: RADIUS.lg, borderLeftWidth: 3, borderLeftColor: COLORS.secondary, gap: 6 },
  benefitTitle: { color: '#fff', fontSize: 14, fontWeight: '700' },
  benefitText: { color: COLORS.textMuted, fontSize: 12 },
  subHeader: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 12, marginTop: 8, alignSelf: 'flex-start' },
  fedGrid: { width: '100%', gap: 8, marginBottom: 20 },
  fedCard: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 14, borderRadius: RADIUS.md, flexDirection: 'row', alignItems: 'center', gap: 10 },
  fedFlag: { width: 28, height: 18, borderRadius: 2 },
  fedName: { color: '#fff', fontSize: 13, fontWeight: '700', flex: 1 },
  fedJobs: { color: COLORS.textMuted, fontSize: 11 },
  jobsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24, width: '100%' },
  jobChip: { backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.bgGlassBorder },
  jobText: { color: COLORS.textSecondary, fontSize: 12, fontWeight: '600' },
  ctaBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 28, paddingVertical: 16, borderRadius: RADIUS.full },
  ctaText: { color: '#fff', fontWeight: '900', fontSize: 14, letterSpacing: 0.5 },
  // About
  aboutCard: { backgroundColor: COLORS.bgCard, borderRadius: RADIUS.xl, padding: SPACING.xl, borderWidth: 1, borderColor: COLORS.bgGlassBorder },
  aboutTitle: { color: '#fff', fontSize: 18, fontWeight: '900', marginBottom: 8 },
  aboutText: { color: COLORS.textMuted, fontSize: 13, lineHeight: 22, marginBottom: 16 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  contactText: { color: COLORS.textSecondary, fontSize: 13 },
  footer: { alignItems: 'center', paddingVertical: 20, borderTopWidth: 1, borderTopColor: COLORS.bgGlassBorder },
  footerText: { color: COLORS.textMuted, fontSize: 11 },
});
