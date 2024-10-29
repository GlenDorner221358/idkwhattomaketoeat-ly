import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, Button, Dimensions, RefreshControl, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserRecipes, updateRecipeTitle, deleteRecipe } from '../services/DbService';
import { auth } from '../firebase'; 

// icons
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default function HistoryScreen() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [refreshing, setRefreshing] = useState(false); 
  const [expandedRecipeId, setExpandedRecipeId] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  // Function to fetch the user's recipes
  const fetchRecipes = async () => {
    setIsLoading(true); // Start loading
    const loggedEmail = auth.currentUser?.email; // Retrieve the current user's email
    if (loggedEmail) {
      const recipes = await getUserRecipes(loggedEmail);
      setSavedRecipes(recipes); // Set the fetched recipes
    }
    setIsLoading(false); // End loading
  };

  // Fetch the user's recipes when the screen loads
  useEffect(() => {
    fetchRecipes();
  }, []); 

  // Pull-to-refresh action
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRecipes(); 
    setRefreshing(false); 
  };

  // Toggle the expanded/collapsed state of a recipe
  const toggleRecipeExpand = (id) => {
    setExpandedRecipeId(prevId => (prevId === id ? null : id));
  };

  // Filter recipes based on search text
  const filteredRecipes = savedRecipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Update a recipe's title
  const handleUpdate = async () => {
    if (selectedRecipe) {
      const success = await updateRecipeTitle(selectedRecipe.id, newTitle);
      if (success) {
        setEditModalVisible(false);
        fetchRecipes(); // Refresh recipes
      }
    }
  };

  // Delete a recipe
  const handleDelete = async (id) => {
    const success = await deleteRecipe(id);
    if (success) {
      fetchRecipes(); // Refresh recipes
    }
  };


  // Render individual recipe items
  const renderRecipe = ({ item }) => {
    const isExpanded = expandedRecipeId === item.id;
    const dateCreated = item.dateCreated?.toDate().toLocaleDateString() || 'Unknown date';

    return (
      <TouchableOpacity onPress={() => toggleRecipeExpand(item.id)}>
        <View style={styles.recipeItem}>
          <Text style={styles.recipeName}>{item.name}</Text>
          <Text style={styles.recipeText}>
            {isExpanded ? item.response : `${item.response.slice(0, 50)}...`}
          </Text>

          {/* Conditional display of Edit and Delete buttons when expanded */}
          {isExpanded && (
            <View style={styles.buttonContainer}>
                {/* Delete Button */}
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <MaterialIcons name="delete" size={32} color="red" />
                </TouchableOpacity>

                {/* Update Button */}
                <TouchableOpacity onPress={() => {
                    setSelectedRecipe(item);
                    setNewTitle(item.name);
                    setEditModalVisible(true);
                }}>
                    <Feather name="edit" size={30} color="#e8f17f" />
                </TouchableOpacity> 
            </View>
          )}

          <Text style={styles.recipeDate}>{item.dateCreated?.toDate().toLocaleDateString()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Saved Recipes</Text>

      

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <FontAwesome name="search" size={20} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search recipes..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View> 

      {isLoading ? (
        // Show loading indicator when loading data
        <ActivityIndicator size="large" color="#e8f17f" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={filteredRecipes}
          keyExtractor={item => item.id}
          renderItem={renderRecipe}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {/* Edit Modal for Updating Recipe Title */}
      <Modal visible={editModalVisible} animationType="slide" transparent={true}>
        <SafeAreaView style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Recipe Title</Text>
            <TextInput
              style={styles.modalInput}
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <View style={styles.modalButtons}>
              <Button title="Confirm" onPress={handleUpdate} />
              <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
            </View>

          </SafeAreaView>
        </SafeAreaView>
      </Modal>
      
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
    marginBottom: 10,
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
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "gray"
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#01172f',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    color: "white"
  }, 
  modalButtons: {
    flexDirection: "row",
    gap: 71,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1', 
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 7, 
  },
  searchBar: {
    flex: 1, 
    fontSize: 15,
    paddingVertical: 0,
  },
});
