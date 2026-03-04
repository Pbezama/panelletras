import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { Section } from "../data/questions";

interface ResultScreenProps {
  score: number;
  total: number;
  section: Section;
  onPlayAgain: () => void;
}

export default function ResultScreen({
  score,
  total,
  section,
  onPlayAgain,
}: ResultScreenProps) {
  const percentage = Math.round((score / total) * 100);

  const getMessage = () => {
    if (percentage === 100) return { emoji: "🏆", text: "¡Perfecto! ¡Excelente dominio!" };
    if (percentage >= 66) return { emoji: "💪", text: "¡Muy bien! Vas por buen camino" };
    if (percentage >= 33) return { emoji: "📚", text: "¡Sigue practicando! Puedes mejorar" };
    return { emoji: "🔄", text: "¡No te rindas! Inténtalo de nuevo" };
  };

  const message = getMessage();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{message.emoji}</Text>

        <Text style={styles.title}>Resultados</Text>

        <View
          style={[styles.sectionBadge, { backgroundColor: section.color }]}
        >
          <Text style={styles.sectionText}>
            {section.icon} {section.name.replace("\n", " ")}
          </Text>
        </View>

        {/* Score circle */}
        <View
          style={[styles.scoreCircle, { borderColor: section.color }]}
        >
          <Text style={[styles.scoreNumber, { color: section.color }]}>
            {score}/{total}
          </Text>
          <Text style={styles.scorePercent}>{percentage}%</Text>
        </View>

        <Text style={styles.message}>{message.text}</Text>

        {/* Score breakdown */}
        <View style={styles.breakdown}>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownNumber}>{score}</Text>
            <Text style={styles.breakdownLabel}>Correctas</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: section.color }]} />
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownNumber}>{total - score}</Text>
            <Text style={styles.breakdownLabel}>Incorrectas</Text>
          </View>
        </View>

        {/* Action buttons */}
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: section.color }]}
          onPress={onPlayAgain}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>🎯 Girar Ruleta de Nuevo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 16,
  },
  sectionBadge: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 30,
  },
  sectionText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    marginBottom: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: "bold",
  },
  scorePercent: {
    fontSize: 18,
    color: "#7F8C8D",
    fontWeight: "600",
  },
  message: {
    fontSize: 18,
    color: "#BDC3C7",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 26,
  },
  breakdown: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 40,
  },
  breakdownItem: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  breakdownNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },
  breakdownLabel: {
    fontSize: 13,
    color: "#95A5A6",
    marginTop: 4,
  },
  divider: {
    width: 2,
    height: 40,
    opacity: 0.5,
  },
  primaryButton: {
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 40,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
