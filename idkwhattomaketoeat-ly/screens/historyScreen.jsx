import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserRecipes } from '../services/DbService';
import { auth } from '../firebase'; // assume you have this to get the current logged-in user

const { width, height } = Dimensions.get('window');

export default function HistoryScreen({ navigation }) {
  // State for saved recipes
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing
  const [expandedRecipeId, setExpandedRecipeId] = useState(null); // Track which recipe is expanded

  // Function to fetch the user's recipes
  const fetchRecipes = async () => {
    const loggedEmail = auth.currentUser?.email; // Retrieve the current user's email
    if (loggedEmail) {
      const recipes = await getUserRecipes(loggedEmail);
      setSavedRecipes(recipes); // Set the fetched recipes
    }
  };

  // Fetch the user's recipes when the screen loads
  useEffect(() => {
    fetchRecipes(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Handle pull-to-refresh action
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRecipes(); // Re-fetch recipes
    setRefreshing(false); // Stop the refreshing animation
  };

  // Toggle the expanded/collapsed state of a recipe
  const toggleRecipeExpand = (id) => {
    setExpandedRecipeId(prevId => (prevId === id ? null : id));
  };

  // Render individual recipe items
  const renderRecipe = ({ item }) => {
    const isExpanded = expandedRecipeId === item.id;
    const dateCreated = item.dateCreated?.toDate().toLocaleDateString() || 'Unknown date';

    return (
      <TouchableOpacity onPress={() => toggleRecipeExpand(item.id)}>
        <View style={styles.recipeItem}>
          <Text style={styles.recipeName}>{item.name}</Text>
          
          {/* Show a truncated version of the response if not expanded */}
          <Text style={styles.recipeText}>
            {isExpanded ? item.response : `${item.response.slice(0, 50)}...`}
          </Text>

          {/* Display the creation date */}
          <Text style={styles.recipeDate}>{dateCreated}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Saved Recipes</Text>

      {/* Display recipes in a FlatList with pull-to-refresh */}
      <FlatList
        data={savedRecipes}
        keyExtractor={item => item.id}
        renderItem={renderRecipe}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
