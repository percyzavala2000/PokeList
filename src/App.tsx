// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationStack } from './presentation/navigator/NavigationStack';

export const App = () => {


// render
  return (
    <NavigationContainer>
      <NavigationStack/>
    </NavigationContainer>
  )
}


