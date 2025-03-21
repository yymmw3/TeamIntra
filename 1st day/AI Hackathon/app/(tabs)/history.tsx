import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';

export default function HistoryScreen() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <ScrollView style={styles.historyList}>
        <Text style={styles.emptyText}>No calculations yet</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    padding: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontFamily: 'Inter-Bold',
    marginBottom: 20,
    marginTop: 60,
  },
  historyList: {
    flex: 1,
  },
  emptyText: {
    color: '#8E8E93',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
});