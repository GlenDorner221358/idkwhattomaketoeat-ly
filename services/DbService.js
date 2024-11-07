import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { collection, addDoc, setDoc, getDocs, doc, updateDoc, Timestamp, deleteDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";

var loggedEmail = "";

// FIREBASE ||||||||||

// Login
export const handleLogin = async (email, password, setErrorMessage) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Login successful: " + user.email);
  
      // Store email for potential future use (avoid storing passwords)
      await AsyncStorage.setItem("loggedEmail", email);
  
      setErrorMessage(''); // Clear any previous error messages
    } catch (error) {
      console.log("Login Error:", error.message);
      setErrorMessage(error.message); // Set the error message from Firebase
    }
};


// Register
export const handleRegister = async (name, email, password, setErrorMessage) => {
    try {
      // Register the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Registered successfully: " + user.email);
  
      // Store email for potential future use
      await AsyncStorage.setItem("savedEmail", email);
  
      setErrorMessage(''); // Clear any previous error messages
  
      // Firestore document creation
      try {
        // Create user document in the 'users' collection
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: user.email,
        });
        console.log("User document created with ID:", user.uid);
  
        // Create an initial document in the 'recipes' collection
        const recipeRef = await addDoc(collection(db, "users", user.uid, "recipes"), {
          name: "Placeholder Recipe",
          response: "Create a new recipe on the home screen! Or with the camera!",
          dateCreated: new Date()
        });
        console.log("Initial recipe added with ID:", recipeRef.id);
  
        return true;
      } catch (e) {
        console.error("Error adding Firestore documents:", e);
        return false;
      }
    } catch (error) {
      console.log("Registration Error:", error.message);
      setErrorMessage(error.message); // Set the error message from Firebase
      return false;
    }
  };

// FIRESTORE ||||||||||

// Fetch recipes by email
export const getUserRecipes = async (loggedEmail) => {
    try {
        // Query the "recipes" subcollection for the user with the specified email
        const recipesRef = collection(db, "users", loggedEmail, "recipes");
        const querySnapshot = await getDocs(recipesRef);
        let recipes = [];

        querySnapshot.forEach((doc) => {
            recipes.push({ id: doc.id, ...doc.data() });
        });

        if (recipes.length > 0) {
            return recipes;
        } else {
            console.log("No recipes found for this user!");
            return [];
        }
    } catch (e) {
        console.error("Error fetching recipes", e);
        return [];
    }
};


// Save new recipe to the db
export const saveRecipeToDB = async (recipeName, gptResponse) => {

    const deepLoggedEmail = await AsyncStorage.getItem("loggedEmail");

    try {
        if (!deepLoggedEmail) {
            throw new Error('User is not logged in. Cannot save recipe.');
        }

        // Create a reference to the "recipes" subcollection under the user's document
        const recipesSubcollectionRef = collection(db, "users", deepLoggedEmail, "recipes");

        // Add a new recipe document
        const docRef = await addDoc(recipesSubcollectionRef, {
            name: recipeName,
            response: gptResponse,
            dateCreated: Timestamp.now(), // Firestore timestamp
        });

        console.log("Recipe saved with ID: ", docRef.id);
        return true;
    } catch (error) {
        console.error("Error saving recipe: ", error);
        return false;
    }
};


// Update recipe title
export const updateRecipeTitle = async (recipeId, newTitle) => {
    try {
        loggedEmail = auth.currentUser?.email;
        const recipeRef = doc(db, "users", loggedEmail, "recipes", recipeId);
        await updateDoc(recipeRef, { name: newTitle });
        console.log(`Recipe title updated successfully: ${recipeId}`);
        return true;
    } catch (error) {
        console.error("Error updating recipe title:", error);
        return false;
    }
};

// Delete recipe
export const deleteRecipe = async (recipeId) => {
    try {
        loggedEmail = auth.currentUser?.email;
        const recipeRef = doc(db, "users", loggedEmail, "recipes", recipeId);
        await deleteDoc(recipeRef);
        console.log(`Recipe deleted successfully: ${recipeId}`);
        return true;
    } catch (error) {
        console.error("Error deleting recipe:", error);
        return false;
    }
};
