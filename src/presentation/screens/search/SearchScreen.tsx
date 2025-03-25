import React, { useMemo, useState } from 'react';
import {View,FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalTheme} from '../../../config/theme/global-theme';
import {TextInput,Text} from 'react-native-paper';
import { ActivityIndicator } from 'react-native';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNameWithId } from '../../../actions/pokemons';
import { Pokemon } from '../../../domain/entities/pokemon';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const [term, setTerm] = useState('')

  const {isLoading,data=[]}=useQuery({
    queryKey:['pokemons','all'],
    queryFn:()=>getPokemonNameWithId(),
    
  })
//aplicar debounce
  const pokemonNameIdList = useMemo(() => {
    if(!isNaN(Number(term))){
      const pokemon = data.find(pokemon=>pokemon.id===Number(term)) 
      return pokemon ? [pokemon]:[]
      
    }
    if(term.trim().length===0){
      return []
    }
    if(term.length<3){
      return []
    }

    return data.filter(pokemon=>pokemon.name.includes(term.toLocaleLowerCase()))  
   
     
  }, [term]);
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
      <ActivityIndicator style={{padding:20}} />
      <Text >{JSON.stringify(pokemonNameIdList,null,2)}</Text>

      <FlatList
        data={[] as Pokemon[]}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        style={{paddingTop: top + 20}}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
