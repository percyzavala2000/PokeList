import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { PokemonScreen } from '../screens/pokemon/PokemonScreen';
import { SearchScreen } from '../screens/search/SearchScreen';

export type RootStackParams={
  HomeScreen:undefined;
  PokemonScreen:{pokemonId:number};
  SearchScreen:undefined;
}
export const NavigationStack = () => {

  const Stack= createStackNavigator<RootStackParams>();
// render
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  )
}
