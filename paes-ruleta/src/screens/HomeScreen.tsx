import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import Roulette from "../components/Roulette";
import { sections, Section } from "../data/questions";

interface HomeScreenProps {
  onSectionSelected: (section: Section) => void;
}

export default function HomeScreen({ onSectionSelected }: HomeScreenProps) {
  const [spinning, setSpinning] = useState(false);

  const handleSpin = () => {
    setSpinning(true);
  };

  const handleResult = (section: Section) => {
    setSpinning(false);
    // Small delay to let user see the result before navigating
    setTimeout(() => {
      onSectionSelected(section);
    }, 600);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>🎯 Ruleta PAES</Text>
        <Text style={styles.subtitle}>
          ¡Gira la ruleta y pon a prueba tus conocimientos!
        </Text>
      </View>

      <View style={styles.wheelContainer}>
        <Roulette
          sections={sections}
          onResult={handleResult}
          spinning={spinning}
          onSpin={handleSpin}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {sections.length} secciones • {sections.length * 3} preguntas
        </Text>
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
  header: {
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#F1C40F",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: "#BDC3C7",
    marginTop: 6,
    textAlign: "center",
  },
  wheelContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  footerText: {
    color: "#7F8C8D",
    fontSize: 13,
  },
});
