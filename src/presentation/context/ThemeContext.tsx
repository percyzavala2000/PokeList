import React, {createContext, PropsWithChildren} from 'react';
import {useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});


/* import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {adaptNavigationTheme, DefaultTheme, PaperProvider} from 'react-native-paper';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
  
}); */


export const ThemeContext = createContext({isDark: false, theme:LightTheme});


export const ThemeContextProvider = ({children}: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const CombinedTheme = {
    ...isDark ? MD3DarkTheme : MD3LightTheme,
    colors: {
      ...(isDark ? DarkTheme.colors : LightTheme.colors),
    },
    fonts: {
      ...(isDark ? MD3DarkTheme.fonts : MD3LightTheme.fonts),
      ...NavigationDarkTheme.fonts, // Asegúrate de incluir esto también
    },
    dark: isDark,
  };
  
  return (
    <PaperProvider theme={CombinedTheme}>
      <NavigationContainer  theme={CombinedTheme} >
        <ThemeContext.Provider value={{isDark, theme:CombinedTheme}}>
        {children}
          </ThemeContext.Provider>
        </NavigationContainer>
    </PaperProvider>
  );
};
