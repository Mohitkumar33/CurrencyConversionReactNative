import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text, TextInput, DataTable, useTheme } from 'react-native-paper';
import { getLatestRates } from '../api/openExchange';

const TARGET_CURRENCIES = ['CAD', 'EUR', 'GBP', 'NZD', 'USD'];

export const HomeScreen = () => {
  const [aud, setAud] = useState('100');
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();


  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      setLoading(true);
      const data = await getLatestRates();
      //   const data = await res.json();
      setRates(data.rates);
    } catch (err) {
      console.error('Error fetching rates:', err);
    } finally {
      setLoading(false);
    }
  };

  // Convert AUD → target currency
  const convertAudTo = (target: string) => {
    if (!rates) return '0.00';
    const audRate = rates['AUD'];
    const targetRate = rates[target];
    if (!audRate || !targetRate) return '0.00';
    return (parseFloat(aud) * (targetRate / audRate)).toFixed(2);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text variant="headlineMedium" style={styles.title}>
        Currency Converter
      </Text>

      <TextInput
        label="Amount in AUD"
        mode="outlined"
        keyboardType="numeric"
        value={aud}
        onChangeText={setAud}
        style={styles.input}
      />

      {loading && <ActivityIndicator style={{ marginVertical: 20 }} />}

      {rates && (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Currency</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
          </DataTable.Header>

          {TARGET_CURRENCIES.map(currency => (
            <DataTable.Row key={currency}>
              <DataTable.Cell>{currency}</DataTable.Cell>
              <DataTable.Cell numeric>{convertAudTo(currency)}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 24,
  },
});
