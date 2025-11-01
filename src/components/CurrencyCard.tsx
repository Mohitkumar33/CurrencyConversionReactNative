import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType, Pressable } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface Props {
  currency: string;
  amount: string;
  rateToAud: number;
  imageUri: ImageSourcePropType;
}

export const CurrencyCard: React.FC<Props> = ({
  currency,
  amount,
  rateToAud,
  imageUri,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('CurrencyDetail', {
          currency,
          amount,
          rateToAud,
          imageUri,
        })
      }>
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Image source={imageUri} style={styles.image} resizeMode="contain" />
        <View style={styles.center}>
          <Text variant="titleMedium">{currency}</Text>
          <Text variant="bodySmall">
            1 {currency} = {rateToAud.toFixed(2)} AUD
          </Text>
        </View>
        <View style={styles.right}>
          <Text variant="titleMedium">{amount}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 2,
  },
  image: { width: 40, height: 40, marginRight: 12 },
  center: { flex: 1 },
  right: { alignItems: 'flex-end' },
});
