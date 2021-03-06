import React from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView } from "react-native";
import BodyText from "../atoms/BodyText/BodyText";
import TitleText from "../atoms/TitleText/TitleText";
import { Image } from "react-native";
import colors from "../../constants/colors";
import StyledButton from "../molecules/StyledButton/StyledButton";

export interface EndScreenProps {
  roundsNumber: number;
  userNumber: number;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = (props) => {
  return (
    <ScrollView>
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          // source={require('../assets/success.png')}
          source={{
            uri: "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg",
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>.
        </BodyText>
      </View>
      <StyledButton onPress={props.onRestart}>START GAME</StyledButton>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: Dimensions.get("window").width *0.7,
    height: Dimensions.get("window").width *0.7,
    borderRadius: Dimensions.get("window").width *0.7/2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height/30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    marginHorizontal: Dimensions.get("window").height/30,
    marginVertical: 10,
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height > 300 ?20: 16,
  },
  highlight: {
    color: colors.primary,
    fontFamily: "open-sans-bold",
  },
});

export default EndScreen;
