import React from "react";
import { View, StyleSheet, Button,Text } from "react-native";
import BodyText from "../atoms/BodyText/BodyText";
import TitleText from "../atoms/TitleText/TitleText";
import { Image } from "react-native";
import colors from "../../constants/colors";

export interface EndScreenProps {
  roundsNumber: number;
  userNumber: number;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = (props) => {
  return (
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
          Your phone needed{' '}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number{' '}
          <Text style={styles.highlight}>{props.userNumber}</Text>.
        </BodyText>
      </View>
      <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 20
  },
  image: {
    width: '100%',
    height: '100%'
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 10
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20
  },
  highlight: {
    color: colors.primary,
    fontFamily: 'open-sans-bold',
  }
});

export default EndScreen;