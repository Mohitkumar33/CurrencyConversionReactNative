import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TextInput as RNTextInput,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';

interface Props {
  amount: string;
  onChangeAmount: (value: string) => void;
  imageUri: ImageSourcePropType;
}

export const AudInputCard: React.FC<Props> = ({
  amount,
  onChangeAmount,
  imageUri,
}) => {
  const { colors } = useTheme();
  const CalculatorIcon = require('../assets/images/calculator.png');

  return (
    <View style={[styles.card, { backgroundColor: colors.primaryContainer }]}>
      <Image source={imageUri} style={styles.image} resizeMode="contain" />

      <RNTextInput
        value={amount}
        onChangeText={onChangeAmount}
        keyboardType="numeric"
        placeholder="Enter AUD"
        style={[styles.input, { color: colors.onPrimaryContainer }]}
      />

      <TouchableOpacity style={styles.iconContainer}>
        <Image source={CalculatorIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 40, // more spacing under card
    elevation: 6, // more shadow
  },
  image: { width: 40, height: 40, marginRight: 12 },
  input: { flex: 1, fontSize: 18, textAlign: 'right' }, // bigger font
  iconContainer: { marginLeft: 12 },
  icon: { width: 28, height: 28 },
});
