// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TARGET_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'NZD'];

export const HomeScreen = () => {
  const [amountAud, setAmountAud] = useState('100');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
});
