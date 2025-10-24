import React, { useState } from 'react';
import { StyleSheet, View, Switch, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import { darkTheme, lightTheme } from './src/theme';
import { HomeScreen } from './src/screens/HomeScreen';

function App() {
  const systemScheme = useColorScheme(); // 'light' | 'dark' | null
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  // Determine which theme to use
  const theme = isDarkMode === null
    ? systemScheme === 'dark'
      ? darkTheme
      : lightTheme
    : isDarkMode
      ? darkTheme
      : lightTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
          
          {/* Toggle Button */}
          <View style={styles.toggleContainer}>
            <Text style={{ marginRight: 10 }}>
              {theme === darkTheme ? 'Dark' : 'Light'} Mode
            </Text>
            <Switch
              value={theme === darkTheme}
              onValueChange={value => setIsDarkMode(value)}
            />
          </View>

          {/* Main Screen */}
          <HomeScreen />
        </SafeAreaView>
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
