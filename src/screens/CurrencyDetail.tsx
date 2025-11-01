import React, { useEffect, useState } from 'react';
import { ScrollView, View, ActivityIndicator, Image, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, useTheme } from 'react-native-paper';
import { LineChart } from 'react-native-gifted-charts';
import { RouteProp, useRoute } from '@react-navigation/native';

const API_KEY = 'fca_live_kJYwwrthUha9vutdDOarE9ETMt4Nd7wadI2OeEgC';
const BASE_URL = 'https://api.freecurrencyapi.com/v1/historical';

type RouteParams = {
  currency: string;
  amount: string;
  rateToAud: number;
  imageUri: any;
};

const CurrencyDetail = () => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { currency, imageUri } = route.params;

  const [chartData, setChartData] = useState<{ value: number; date: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    fetchLast14Days(currency);
  }, [currency]);

  // -------------------------------
  // Fetch last 14 days historical rates
  // -------------------------------
  const fetchLast14Days = async (currency: string) => {
    setLoading(true);
    try {
      const today = new Date();
      const dates = Array.from({ length: 14 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (13 - i));
        return d.toISOString().split('T')[0];
      });

      // Make 14 API calls in parallel
      const requests = dates.map(async (date) => {
        const url = `${BASE_URL}?apikey=${API_KEY}&date=${date}&base_currency=AUD&currencies=${currency}`;
        const res = await fetch(url);
        const json = await res.json();
        const rate = json?.data?.[date]?.[currency];
        return { value: rate, date };
      });

      const results = await Promise.all(requests);
      const cleaned = results
        .filter((r) => r.value !== undefined)
        .sort((a, b) => (a.date > b.date ? 1 : -1));

      setChartData(cleaned);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Dynamic Y-axis min/max
  // -------------------------------
  // const minValue = chartData.length
  //   ? Math.min(...chartData.map((d) => d.value)) * 0.995 // small padding below
  //   : 0;
  // const maxValue = chartData.length
  //   ? Math.max(...chartData.map((d) => d.value)) * 1.005 // small padding above
  //   : 1;
  // Get min/max from your data
const minValue = chartData.length
  ? Math.min(...chartData.map((d) => d.value)) * 0.995 // slightly below min
  : 0;

const maxValue = chartData.length
  ? Math.max(...chartData.map((d) => d.value)) * 1.005 // slightly above max
  : 1;

  const spacing = chartData.length > 0 ? screenWidth / chartData.length : 20;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={imageUri} style={styles.image} />
          <Text variant="headlineMedium">{currency} - Last 14 Days</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.chartContainer}>
            <LineChart
              areaChart
              data={chartData.map((item) => ({
                value: item.value,
                date: item.date,
                label: item.date.slice(5), // MM-DD
                labelTextStyle: { color: 'gray', width: 50 },
              }))}
              rotateLabel
              hideDataPoints
              spacing={spacing}
              color="#00ff83"
              thickness={2}
              startFillColor="rgba(20,105,81,0.3)"
              endFillColor="rgba(20,85,81,0.01)"
              startOpacity={0.9}
              endOpacity={0.2}
              noOfSections={6}
              minValue={minValue}
              maxValue={maxValue}
              yAxisColor="white"
              rulesType="solid"
              rulesColor="gray"
              yAxisTextStyle={{ color: 'gray' }}
              xAxisColor="lightgray"
              isAnimated
              pointerConfig={{
                pointerStripHeight: 160,
                pointerStripColor: 'lightgray',
                pointerStripWidth: 2,
                pointerColor: 'lightgray',
                radius: 6,
                pointerLabelWidth: 100,
                pointerLabelHeight: 90,
                activatePointersOnLongPress: true,
                autoAdjustPointerLabelPosition: false,
                pointerLabelComponent: (items: any[]) => (
                  <View style={styles.pointerLabel}>
                    <Text style={styles.pointerDate}>{items[0].date}</Text>
                    <View style={styles.pointerValueBox}>
                      <Text style={styles.pointerValue}>{items[0].value?.toFixed(4)}</Text>
                    </View>
                  </View>
                ),
              }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', marginTop: 20 },
  image: { width: 60, height: 60, marginBottom: 10 },
  chartContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    margin: 16,
  },
  pointerLabel: {
    height: 110,
    width: 110,
    justifyContent: 'center',
    marginTop: -10,
    marginLeft: -40,
  },
  pointerDate: {
    color: 'white',
    fontSize: 14,
    marginBottom: 6,
    textAlign: 'center',
  },
  pointerValueBox: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  pointerValue: { fontWeight: 'bold', textAlign: 'center' },
});

export default CurrencyDetail;
