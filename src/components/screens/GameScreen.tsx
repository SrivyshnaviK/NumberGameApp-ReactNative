import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import TitleText from "../atoms/TitleText/TitleText";
import Card from "../molecules/Card/Card";
import NumberContainer from "../molecules/NumberContainer/NumberContainer";
import StyledButton from "../molecules/StyledButton/StyledButton";
import { Icon } from "react-native-elements";
import BodyText from "../atoms/BodyText/BodyText";

const generateRandomBetween = (
  min: number,
  max: number,
  exclude: number
): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value: number, numOfRound: number) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);
export interface GameScreenProps {
  userChoice: number;
  onGameOver: (rounds: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState<Array<number>>([initialGuess]);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction: string) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
  };
  if (availableDeviceHeight < 400) {

    return (
      <View style={styles.screen}>
        <TitleText>Opponent's Guess</TitleText>
        <View style={styles.controls}>
          <StyledButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Icon name="remove" color="white" />
          </StyledButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <StyledButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Icon name="add" color="white" />
          </StyledButton>
        </View>
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) =>
              renderListItem(guess, pastGuesses.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <TitleText>Opponent's Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <StyledButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Icon name="remove" color="white" />
        </StyledButton>
        <StyledButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Icon name="add" color="white" />
        </StyledButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  controls: {
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 300,
    maxWidth: "80%",
  },
  listContainer: {
    flex: 1,
    width: "80%",
  },
  list: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width > 400 ? "60%" : "80%",
  },
});

export default GameScreen;
