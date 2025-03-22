import React from 'react';
import { FlatList, StyleSheet, View} from 'react-native';
import { Text} from 'react-native-paper';
import {getPokemons} from '../../../actions/pokemons';
import {useQuery} from '@tanstack/react-query';
import {PokeballBg} from '../../components/ui/PokeballBg';
import { globalTheme } from '../../../config/helpers/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';


export const HomeScreen = () => {

  const {top}=useSafeAreaInsets();
  const {isLoading, data} = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(0),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // render
  return (
    <View style={globalTheme.globalMargin} >
      <PokeballBg style={styles.imgPosition} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        style={{paddingTop: top + 20}}
        renderItem={({item}) => (
          <PokemonCard pokemon={item} />
        )}
        ListHeaderComponent={() => (
          <Text variant="displaySmall"> PokeList</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
