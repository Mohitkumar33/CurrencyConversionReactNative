import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, TextInput, useTheme, ActivityIndicator } from 'react-native-paper';
import { getLatestRates } from '../api/openExchange';
import { CurrencyCard } from '../components/CurrencyCard';
import { AudInputCard } from '../components/AudInputCard';

const TARGET_CURRENCIES = ['CAD', 'EUR', 'GBP', 'NZD', 'USD'];

const currencyImages: Record<string, any> = {
  CAD: require('../assets/images/cad.png'),
  EUR: require('../assets/images/eur.png'),
  GBP: require('../assets/images/gbp.png'),
  NZD: require('../assets/images/nzd.png'),
  USD: require('../assets/images/usd.png'),
};

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
      setRates(data.rates);
    } catch (err) {
      console.error('Error fetching rates:', err);
    } finally {
      setLoading(false);
    }
  };

  const convertAudTo = (target: string) => {
    if (!rates) return '0.00';
    const audRate = rates['AUD'];
    const targetRate = rates[target];
    if (!audRate || !targetRate) return '0.00';
    return (parseFloat(aud) * (targetRate / audRate)).toFixed(2);
  };

  const rateToAud = (target: string) => {
    if (!rates) return 0;
    const audRate = rates['AUD'];
    const targetRate = rates[target];
    if (!audRate || !targetRate) return 0;
    return audRate / targetRate;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text variant="headlineMedium" style={styles.title}>
        Currency Converter
      </Text>

      {/* AUD Input Card */}
      <AudInputCard
        amount={aud}
        onChangeAmount={setAud}
        imageUri={require('../assets/images/aud.png')}
      />

      {loading && <ActivityIndicator style={{ marginVertical: 20 }} />}

      {/* Target currency cards */}
      {rates &&
        TARGET_CURRENCIES.map(currency => (
          <CurrencyCard
            key={currency}
            currency={currency}
            amount={convertAudTo(currency)}
            rateToAud={rateToAud(currency)}
            imageUri={currencyImages[currency]}
          />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { textAlign: 'center', marginBottom: 20 },
});
