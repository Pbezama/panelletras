import React, { useState } from "react";
import HomeScreen from "./src/screens/HomeScreen";
import QuizScreen from "./src/screens/QuizScreen";
import ResultScreen from "./src/screens/ResultScreen";
import { Section } from "./src/data/questions";

type Screen = "home" | "quiz" | "result";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const handleSectionSelected = (section: Section) => {
    setSelectedSection(section);
    setScreen("quiz");
  };

  const handleQuizFinish = (
    finalScore: number,
    totalQuestions: number,
    section: Section
  ) => {
    setScore(finalScore);
    setTotal(totalQuestions);
    setSelectedSection(section);
    setScreen("result");
  };

  const handlePlayAgain = () => {
    setScreen("home");
    setSelectedSection(null);
    setScore(0);
    setTotal(0);
  };

  const handleBackToHome = () => {
    setScreen("home");
    setSelectedSection(null);
  };

  switch (screen) {
    case "quiz":
      return (
        <QuizScreen
          section={selectedSection!}
          onFinish={handleQuizFinish}
          onBack={handleBackToHome}
        />
      );
    case "result":
      return (
        <ResultScreen
          score={score}
          total={total}
          section={selectedSection!}
          onPlayAgain={handlePlayAgain}
        />
      );
    default:
      return <HomeScreen onSectionSelected={handleSectionSelected} />;
  }
}
