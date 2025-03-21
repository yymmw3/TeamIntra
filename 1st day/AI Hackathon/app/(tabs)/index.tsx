import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SplashScreen } from 'expo-router';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const buttons = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export default function CalculatorScreen() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    const current = parseFloat(display);

    if (op === 'C') {
      setDisplay('0');
      setPreviousValue(null);
      setOperator(null);
      return;
    }

    if (op === '±') {
      setDisplay(String(-parseFloat(display)));
      return;
    }

    if (op === '%') {
      setDisplay(String(parseFloat(display) / 100));
      return;
    }

    if (op === '=') {
      if (previousValue !== null && operator) {
        let result;
        switch (operator) {
          case '+':
            result = previousValue + current;
            break;
          case '-':
            result = previousValue - current;
            break;
          case '×':
            result = previousValue * current;
            break;
          case '÷':
            result = previousValue / current;
            break;
          default:
            return;
        }
        setDisplay(String(result));
        setPreviousValue(null);
        setOperator(null);
      }
      return;
    }

    setPreviousValue(current);
    setOperator(op);
    setShouldResetDisplay(true);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handlePress = (button: string) => {
    if (button === '.') {
      handleDecimal();
    } else if ('0123456789'.includes(button)) {
      handleNumber(button);
    } else {
      handleOperator(button);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        entering={FadeIn}
        style={styles.displayContainer}
      >
        <Text style={styles.display}>{display}</Text>
      </Animated.View>
      <View style={styles.buttonContainer}>
        {buttons.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((button) => (
              <Pressable
                key={button}
                style={[
                  styles.button,
                  button === '0' && styles.zeroButton,
                  ['÷', '×', '-', '+', '='].includes(button) && styles.operatorButton,
                  ['C', '±', '%'].includes(button) && styles.functionButton,
                ]}
                onPress={() => handlePress(button)}
              >
                <Text style={[
                  styles.buttonText,
                  ['÷', '×', '-', '+', '='].includes(button) && styles.operatorText,
                  ['C', '±', '%'].includes(button) && styles.functionText,
                ]}>
                  {button}
                </Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    padding: 20,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  display: {
    color: '#FFFFFF',
    fontSize: 64,
    textAlign: 'right',
    fontFamily: 'Inter-Bold',
  },
  buttonContainer: {
    flex: 2,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 40,
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  zeroButton: {
    flex: 2.2,
    aspectRatio: undefined,
  },
  operatorButton: {
    backgroundColor: '#FF9500',
  },
  functionButton: {
    backgroundColor: '#D4D4D2',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: 'Inter-Regular',
  },
  operatorText: {
    color: '#FFFFFF',
  },
  functionText: {
    color: '#1C1C1E',
  },
});