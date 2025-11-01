import React, { useState } from 'react';
import { StyleSheet, View, Switch, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { darkTheme, lightTheme } from './src/theme';
import { HomeScreen } from './src/screens/HomeScreen';
import CurrencyDetail from './src/screens/CurrencyDetail';

const Stack = createNativeStackNavigator();

function App() {
  const systemScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  const theme =
    isDarkMode === null
      ? systemScheme === 'dark'
        ? darkTheme
        : lightTheme
      : isDarkMode
      ? darkTheme
      : lightTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <SafeAreaView
            style={[
              styles.container,
              { backgroundColor: theme.colors.background },
            ]}
          >
            {/* Theme toggle */}
            <View style={styles.toggleContainer}>
              <Text style={{ marginRight: 10 }}>
                {theme === darkTheme ? 'Dark' : 'Light'} Mode
              </Text>
              <Switch
                value={theme === darkTheme}
                onValueChange={setIsDarkMode}
              />
            </View>

            {/* Navigation Stack */}
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Currency Converter' }}
              />
              <Stack.Screen
                name="CurrencyDetail"
                component={CurrencyDetail}
                options={{ title: 'Currency Details' }}
              />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
});

export default App;
