import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function HistoryScreen({ navigation }) {
  // State for saved messages
  const [savedMessages, setSavedMessages] = useState([
    { id: '1', text: 'Pasta recipe: Ingredients: pasta, tomatoes, garlic...', date: '2024-10-16' },
    { id: '2', text: 'Salad recipe: Ingredients: lettuce, cucumber, olive oil...', date: '2024-10-15' },
  ]);

  const renderMessage = ({ item }) => (
    <View style={styles.messageItem}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageDate}>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Saved Recipes</Text>
      
      <FlatList
        data={savedMessages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363D45',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#e8f17f',
    marginBottom: 20,
  },
  messageItem: {
    backgroundColor: '#01172f',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  messageText: {
    color: '#fff',
    fontSize: width * 0.045,
    marginBottom: 5,
  },
  messageDate: {
    color: '#aaa',
    fontSize: width * 0.035,
    textAlign: 'right',
  },
  navigationContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  navText: {
    color: '#D1AC00',
    fontSize: width * 0.04,
  },
});
