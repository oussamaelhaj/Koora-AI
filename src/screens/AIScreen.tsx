import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, FONTS } from '../constants/theme';
import { askAI } from '../services/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'Qui a gagné la Coupe du Monde 2022 ?',
  'Meilleur buteur de la Champions League ?',
  'Actualités du Wydad AC ?',
  'Classement Botola Pro 2026 ?',
];

export default function AIScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const sendMessage = async (text?: string) => {
    const question = text || input.trim();
    if (!question || loading) return;

    const userMsg: Message = { role: 'user', content: question };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const data = await askAI(question);
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Impossible de contacter l'assistant IA. Réessayez." }]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={COLORS.gradientPrimary} style={styles.header}>
        <View style={styles.headerIcon}>
          <FontAwesome5 name="robot" size={20} color="#fff" />
        </View>
        <Text style={styles.headerTitle}>Assistant IA Football</Text>
        <Text style={styles.headerSub}>Posez vos questions sur le football mondial</Text>
      </LinearGradient>

      <KeyboardAvoidingView
        style={styles.chatArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.messagesScroll}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 && (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <FontAwesome5 name="futbol" size={40} color={COLORS.primary} />
              </View>
              <Text style={styles.emptyTitle}>Bienvenue !</Text>
              <Text style={styles.emptyText}>
                Je suis votre assistant IA football. Posez-moi n'importe quelle question !
              </Text>
              <View style={styles.suggestions}>
                {SUGGESTIONS.map((s, i) => (
                  <TouchableOpacity key={i} style={styles.suggestionChip} onPress={() => sendMessage(s)}>
                    <Ionicons name="chatbubble-outline" size={14} color={COLORS.primary} />
                    <Text style={styles.suggestionText}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {messages.map((msg, i) => (
            <View key={i} style={[styles.msgRow, msg.role === 'user' ? styles.msgRowUser : styles.msgRowBot]}>
              {msg.role === 'assistant' && (
                <View style={styles.botAvatar}>
                  <FontAwesome5 name="robot" size={14} color={COLORS.primary} />
                </View>
              )}
              <View style={[styles.msgBubble, msg.role === 'user' ? styles.userBubble : styles.botBubble]}>
                <Text style={[styles.msgText, msg.role === 'user' && styles.userText]}>{msg.content}</Text>
              </View>
            </View>
          ))}

          {loading && (
            <View style={[styles.msgRow, styles.msgRowBot]}>
              <View style={styles.botAvatar}>
                <FontAwesome5 name="robot" size={14} color={COLORS.primary} />
              </View>
              <View style={styles.botBubble}>
                <ActivityIndicator size="small" color={COLORS.primary} />
                <Text style={styles.typingText}>Recherche en cours...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            placeholder="Ex: Résultats du Real Madrid ?"
            placeholderTextColor={COLORS.textMuted}
            onSubmitEditing={() => sendMessage()}
            returnKeyType="send"
            editable={!loading}
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!input.trim() || loading) && styles.sendBtnDisabled]}
            onPress={() => sendMessage()}
            disabled={!input.trim() || loading}
          >
            <LinearGradient colors={COLORS.gradientSecondary} style={styles.sendBtnGrad}>
              <Ionicons name="send" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  header: { paddingTop: 55, paddingBottom: 20, paddingHorizontal: SPACING.xl, alignItems: 'center' },
  headerIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '900', marginBottom: 4 },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
  chatArea: { flex: 1 },
  messagesScroll: { flex: 1 },
  messagesContent: { padding: SPACING.lg, paddingBottom: 20 },
  // Empty state
  emptyState: { alignItems: 'center', paddingTop: 40 },
  emptyIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(32,90,40,0.15)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  emptyTitle: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 8 },
  emptyText: { color: COLORS.textMuted, fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 24, paddingHorizontal: 20 },
  suggestions: { gap: 8, width: '100%' },
  suggestionChip: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: COLORS.bgCard, paddingHorizontal: 16, paddingVertical: 12, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.bgGlassBorder },
  suggestionText: { color: COLORS.textSecondary, fontSize: 13, flex: 1 },
  // Messages
  msgRow: { flexDirection: 'row', marginBottom: 12, gap: 8 },
  msgRowUser: { justifyContent: 'flex-end' },
  msgRowBot: { justifyContent: 'flex-start', alignItems: 'flex-end' },
  botAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(32,90,40,0.2)', justifyContent: 'center', alignItems: 'center' },
  msgBubble: { maxWidth: '78%', paddingHorizontal: 16, paddingVertical: 12, borderRadius: RADIUS.lg },
  userBubble: { backgroundColor: COLORS.primary, borderBottomRightRadius: 4 },
  botBubble: { backgroundColor: COLORS.bgCard, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: COLORS.bgGlassBorder, flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  msgText: { color: COLORS.textSecondary, fontSize: 14, lineHeight: 22 },
  userText: { color: '#fff' },
  typingText: { color: COLORS.textMuted, fontSize: 13 },
  // Input
  inputBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.lg, paddingVertical: 12, borderTopWidth: 1, borderTopColor: COLORS.bgGlassBorder, backgroundColor: COLORS.bgDark, gap: 10 },
  textInput: { flex: 1, backgroundColor: COLORS.bgCard, borderRadius: RADIUS.full, paddingHorizontal: 18, paddingVertical: 12, color: '#fff', fontSize: 14, borderWidth: 1, borderColor: COLORS.bgGlassBorder },
  sendBtn: { borderRadius: RADIUS.full, overflow: 'hidden' },
  sendBtnDisabled: { opacity: 0.4 },
  sendBtnGrad: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
});
