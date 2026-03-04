import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { Section } from "../data/questions";

const { width } = Dimensions.get("window");
const WHEEL_SIZE = width * 0.85;

interface RouletteProps {
  sections: Section[];
  onResult: (section: Section) => void;
  spinning: boolean;
  onSpin: () => void;
}

export default function Roulette({
  sections,
  onResult,
  spinning,
  onSpin,
}: RouletteProps) {
  const spinValue = useRef(new Animated.Value(0)).current;
  const currentRotation = useRef(0);

  useEffect(() => {
    if (spinning) {
      const randomSection = Math.floor(Math.random() * sections.length);
      const degreesPerSection = 360 / sections.length;
      // Spin several full rotations plus land on the random section
      const targetDegrees =
        currentRotation.current +
        360 * 5 +
        degreesPerSection * randomSection;

      spinValue.setValue(currentRotation.current);

      Animated.timing(spinValue, {
        toValue: targetDegrees,
        duration: 3500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        currentRotation.current = targetDegrees % 360;
        // Calculate which section the pointer lands on
        const normalizedDeg = targetDegrees % 360;
        const index =
          (sections.length -
            Math.floor(normalizedDeg / degreesPerSection)) %
          sections.length;
        onResult(sections[index]);
      });
    }
  }, [spinning]);

  const spin = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const degreesPerSection = 360 / sections.length;

  return (
    <View style={styles.container}>
      {/* Pointer */}
      <View style={styles.pointerContainer}>
        <View style={styles.pointer} />
      </View>

      <Animated.View
        style={[
          styles.wheel,
          { transform: [{ rotate: spin }] },
        ]}
      >
        {sections.map((section, index) => {
          const rotation = degreesPerSection * index;
          return (
            <View
              key={section.id}
              style={[
                styles.section,
                {
                  transform: [
                    { rotate: `${rotation}deg` },
                    { translateY: -WHEEL_SIZE / 4 },
                  ],
                  backgroundColor: section.color,
                },
              ]}
            >
              <Text style={styles.sectionIcon}>{section.icon}</Text>
              <Text style={styles.sectionText}>{section.name}</Text>
            </View>
          );
        })}
        {/* Wheel border segments */}
        {sections.map((section, index) => {
          const rotation = degreesPerSection * index;
          return (
            <View
              key={`border-${section.id}`}
              style={[
                styles.sectionBorder,
                {
                  transform: [{ rotate: `${rotation}deg` }],
                  backgroundColor: section.color,
                },
              ]}
            />
          );
        })}
      </Animated.View>

      {/* Spin button */}
      <TouchableOpacity
        style={[styles.spinButton, spinning && styles.spinButtonDisabled]}
        onPress={onSpin}
        disabled={spinning}
        activeOpacity={0.8}
      >
        <Text style={styles.spinText}>{spinning ? "⏳" : "¡GIRAR!"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  pointerContainer: {
    position: "absolute",
    top: -15,
    zIndex: 10,
    alignItems: "center",
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 30,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#2C3E50",
  },
  wheel: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    backgroundColor: "#ECF0F1",
    borderWidth: 6,
    borderColor: "#2C3E50",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  section: {
    position: "absolute",
    width: WHEEL_SIZE * 0.4,
    height: WHEEL_SIZE / 2.5,
    alignItems: "center",
    justifyContent: "center",
    top: WHEEL_SIZE / 2 - WHEEL_SIZE / 5,
    left: WHEEL_SIZE / 2 - WHEEL_SIZE * 0.2 - 3,
    borderRadius: 8,
    paddingVertical: 4,
  },
  sectionIcon: {
    fontSize: 24,
    marginBottom: 2,
  },
  sectionText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  sectionBorder: {
    position: "absolute",
    width: 3,
    height: WHEEL_SIZE / 2,
    top: 0,
    left: WHEEL_SIZE / 2 - 4.5,
    transformOrigin: "center bottom",
  },
  spinButton: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#2C3E50",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    borderWidth: 4,
    borderColor: "#F1C40F",
  },
  spinButtonDisabled: {
    backgroundColor: "#7F8C8D",
    borderColor: "#95A5A6",
  },
  spinText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
