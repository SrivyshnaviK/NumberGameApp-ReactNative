import React from 'react';
import { Text, StyleSheet } from 'react-native';

export interface TitleTextProps{
    style?: object;
}

const TitleText:React.FC<TitleTextProps> = props => (
  <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  }
});

export default TitleText;
