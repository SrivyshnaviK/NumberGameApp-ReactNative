import React from 'react';
import {Button as RNButton} from 'react-native-elements';

export type ButtonProps = {
  title: string;
  onPress?: () => void;
  buttonStyle?: object;
};

const Button: React.FC<ButtonProps> = ({title, onPress, buttonStyle}) => {
  return <RNButton title={title} onPress={onPress} buttonStyle={buttonStyle} />;
};
export default Button;
