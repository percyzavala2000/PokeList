import React, { useMemo, useState } from 'react';
import {View,FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalTheme} from '../../../config/theme/global-theme';
import {TextInput,Text} from 'react-native-paper';
import { ActivityIndicator } from 'react-native';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNameWithId, getPokemonsByIds } from '../../../actions/pokemons';
import { Pokemon } from '../../../domain/entities/pokemon';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const [term, setTerm] = useState('')

  const debouncedValue=useDebouncedValue(term)

  const {isLoading,data=[]}=useQuery({
    queryKey:['pokemons','all'],
    queryFn:()=>getPokemonNameWithId(),
    
  })
//aplicar debounce
  const pokemonNameIdList = useMemo(() => {
    if(!isNaN(Number(debouncedValue))){
      const pokemon = data.find(pokemon=>pokemon.id===Number(debouncedValue)) 
      return pokemon ? [pokemon]:[]
      
    }
    if(debouncedValue.trim().length===0){
      return []
    }
    if(debouncedValue.length<3){
      return []
    }

    return data.filter(pokemon=>pokemon.name.includes(debouncedValue.toLocaleLowerCase()))  
   
     
  }, [debouncedValue]);

  const {isLoading:isLoadingPokemon,data:dataPokemons=[]}=useQuery({
    queryKey:['pokemons','by',pokemonNameIdList],
    queryFn:()=>getPokemonsByIds(pokemonNameIdList.map(pokemon=>pokemon.id)),
 staleTime:1000*60*5,
    enabled:term.length>2
  })

  if(isLoading){
    return <FullScreenLoader />
  }
  // render
  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10}]}>
      <TextInput
        placeholder="Buscar Pokemon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={setTerm}
        value={term}
      />
      {
        isLoadingPokemon && <ActivityIndicator style={{padding:20}} />
      }

      <FlatList
        data={dataPokemons}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        style={{paddingTop: top + 20}}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: 100}} />}
      />
   
    </View> 

  );

};

