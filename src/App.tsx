// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import {NavigationStack} from './presentation/navigator/NavigationStack';
import {ThemeContextProvider} from './presentation/context/ThemeContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// Create a client
const queryClient = new QueryClient();

export const App = () => {
  // render
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <NavigationStack />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};
