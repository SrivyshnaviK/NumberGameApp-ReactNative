import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../../../constants/colors';
import TitleText from '../../atoms/TitleText/TitleText';

export type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.headerTitle}>{title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
  },
});

export default Header;
