import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserRecipes } from '../services/DbService';
import { auth } from '../firebase'; // assume you have this to get the current logged in user

const { width, height } = Dimensions.get('window');

export default function HistoryScreen({ navigation }) {
  // State for saved recipes
  const [savedRecipes, setSavedRecipes] = useState([]);
  
  // Fetch the user's recipes when the screen loads
  useEffect(() => {
    const fetchRecipes = async () => {
      const loggedEmail = auth.currentUser?.email; // Retrieve the current user's email
      if (loggedEmail) {
        const recipes = await getUserRecipes(loggedEmail);
        setSavedRecipes(recipes); // Set the fetched recipes
      }
    };

    fetchRecipes(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Render individual recipe items
  const renderRecipe = ({ item }) => {
    // Convert Firestore Timestamp to a readable date string
    const dateCreated = item.dateCreated?.toDate().toLocaleDateString() || 'Unknown date';
  
    return (
      <View style={styles.recipeItem}>
        <Text style={styles.recipeName}>{item.name}</Text>
        <Text style={styles.recipeText}>{item.response}</Text>
        <Text style={styles.recipeDate}>{dateCreated}</Text>
      </View>
    );
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Saved Recipes</Text>
      
      {/* Display recipes in a FlatList */}
      <FlatList
        data={savedRecipes}
        keyExtractor={item => item.id}
        renderItem={renderRecipe}
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
  recipeItem: {
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
  recipeText: {
    color: '#fff',
    fontSize: width * 0.045,
    marginBottom: 5,
  },
  recipeDate: {
    color: '#aaa',
    fontSize: width * 0.035,
    textAlign: 'right',
  },
  recipeName: {
    color: '#aaa'
  }
});
