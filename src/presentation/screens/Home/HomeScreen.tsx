import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {getPokemons} from '../../../actions/pokemons';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {PokeballBg} from '../../components/ui/PokeballBg';
import {globalTheme} from '../../../config/theme/global-theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../../components/pokemons/PokemonCard';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  //forma tradicional de hacer una peticion
  // const {isLoading, data,isFetching} = useQuery({
  //   queryKey: ['pokemons'],
  //   queryFn: () => getPokemons(0),
  //   staleTime: 1000 * 60 * 60, // 1 hour
  // });
  const {isLoading, data,fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons','infinite'],
    initialPageParam: 0,
    
    queryFn: (params) => getPokemons(params.pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if(lastPage.length<20) return undefined;
      return allPages.length;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // render
  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imgPosition} />
      <FlatList
        data={data?.pages.map(page=>page).flat()}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        style={{paddingTop: top + 20}}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        ListHeaderComponent={() => (
          <Text variant="displaySmall"> PokeList</Text>
        )}
        onEndReachedThreshold={0.6}
        onEndReached={()=>fetchNextPage()}
        showsVerticalScrollIndicator={false}
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
