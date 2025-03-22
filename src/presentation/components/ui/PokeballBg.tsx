import React, {useContext} from 'react';
import {StyleProp, ImageStyle} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {Image} from 'react-native';

type PokeballBgProps = {
  style?: StyleProp<ImageStyle>;
};

export const PokeballBg = ({style}: PokeballBgProps) => {
  const {isDark} = useContext(ThemeContext);
  const pokeballImage = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png');
  // render
  return (
    <Image
      source={pokeballImage}
      style={[{width: 300, height: 300, opacity: 0.3}, style]}
    />
  );
};
