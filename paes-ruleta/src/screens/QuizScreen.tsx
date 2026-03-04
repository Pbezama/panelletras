import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { Section, Question } from "../data/questions";

interface QuizScreenProps {
  section: Section;
  onFinish: (score: number, total: number, section: Section) => void;
  onBack: () => void;
}

export default function QuizScreen({
  section,
  onFinish,
  onBack,
}: QuizScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const question: Question = section.questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const isLastQuestion = currentQuestion === section.questions.length - 1;

  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer !== null) return; // Already answered
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === question.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScore = score; // score already updated
      onFinish(finalScore, section.questions.length, section);
    } else {
      setCurrentQuestion((q) => q + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const getOptionStyle = (index: number) => {
    if (selectedAnswer === null) return styles.option;
    if (index === question.correctAnswer) return [styles.option, styles.correctOption];
    if (index === selectedAnswer && !isCorrect)
      return [styles.option, styles.wrongOption];
    return [styles.option, styles.disabledOption];
  };

  const getOptionTextStyle = (index: number) => {
    if (selectedAnswer === null) return styles.optionText;
    if (index === question.correctAnswer)
      return [styles.optionText, styles.correctOptionText];
    if (index === selectedAnswer && !isCorrect)
      return [styles.optionText, styles.wrongOptionText];
    return [styles.optionText, styles.disabledOptionText];
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: section.color + "15" }]}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
        <View
          style={[styles.badge, { backgroundColor: section.color }]}
        >
          <Text style={styles.badgeText}>
            {section.icon} {section.name.replace("\n", " ")}
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        {section.questions.map((_, i) => (
          <View
            key={i}
            style={[
              styles.progressDot,
              {
                backgroundColor:
                  i < currentQuestion
                    ? section.color
                    : i === currentQuestion
                    ? section.color + "99"
                    : "#DDD",
              },
            ]}
          />
        ))}
        <Text style={styles.progressText}>
          {currentQuestion + 1} / {section.questions.length}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Question */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {/* Options */}
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(index)}
            onPress={() => handleSelectAnswer(index)}
            disabled={selectedAnswer !== null}
            activeOpacity={0.7}
          >
            <View style={styles.optionLetter}>
              <Text style={styles.optionLetterText}>
                {String.fromCharCode(65 + index)}
              </Text>
            </View>
            <Text style={getOptionTextStyle(index)}>{option}</Text>
            {selectedAnswer !== null && index === question.correctAnswer && (
              <Text style={styles.checkMark}>✓</Text>
            )}
            {selectedAnswer === index &&
              index !== question.correctAnswer && (
                <Text style={styles.crossMark}>✗</Text>
              )}
          </TouchableOpacity>
        ))}

        {/* Explanation */}
        {showExplanation && (
          <View
            style={[
              styles.explanationCard,
              {
                backgroundColor: isCorrect ? "#D5F5E3" : "#FADBD8",
                borderColor: isCorrect ? "#27AE60" : "#E74C3C",
              },
            ]}
          >
            <Text style={styles.explanationTitle}>
              {isCorrect ? "✅ ¡Correcto!" : "❌ Incorrecto"}
            </Text>
            <Text style={styles.explanationText}>
              {question.explanation}
            </Text>
          </View>
        )}

        {/* Next button */}
        {showExplanation && (
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: section.color }]}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>
              {isLastQuestion ? "Ver Resultados" : "Siguiente Pregunta →"}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 16,
    color: "#2C3E50",
    fontWeight: "600",
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "bold",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    gap: 8,
  },
  progressDot: {
    width: 40,
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    marginLeft: 10,
    color: "#7F8C8D",
    fontSize: 13,
    fontWeight: "600",
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  questionCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  questionText: {
    fontSize: 18,
    color: "#2C3E50",
    lineHeight: 26,
    fontWeight: "500",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#ECF0F1",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  correctOption: {
    borderColor: "#27AE60",
    backgroundColor: "#D5F5E3",
  },
  wrongOption: {
    borderColor: "#E74C3C",
    backgroundColor: "#FADBD8",
  },
  disabledOption: {
    opacity: 0.5,
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ECF0F1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionLetterText: {
    fontWeight: "bold",
    color: "#2C3E50",
    fontSize: 14,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: "#2C3E50",
    lineHeight: 22,
  },
  correctOptionText: {
    color: "#1E8449",
    fontWeight: "600",
  },
  wrongOptionText: {
    color: "#C0392B",
    fontWeight: "600",
  },
  disabledOptionText: {
    color: "#95A5A6",
  },
  checkMark: {
    fontSize: 20,
    color: "#27AE60",
    marginLeft: 8,
  },
  crossMark: {
    fontSize: 20,
    color: "#E74C3C",
    marginLeft: 8,
  },
  explanationCard: {
    borderRadius: 12,
    padding: 18,
    marginTop: 10,
    borderWidth: 1,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#2C3E50",
  },
  explanationText: {
    fontSize: 14,
    color: "#34495E",
    lineHeight: 21,
  },
  nextButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  nextButtonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});
