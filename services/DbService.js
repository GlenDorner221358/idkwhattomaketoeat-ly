import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { collection, addDoc, setDoc, getDoc, getDocs, doc, updateDoc, Timestamp, deleteDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';


// FIREBASE ||||||||||

// Login
export const handleLogin = async (email, password, setErrorMessage) => {
    try {
        // Convert email to lowercase
        const lowerEmail = email.toLowerCase();

        const userCredential = await signInWithEmailAndPassword(auth, lowerEmail, password);
        const user = userCredential.user;

        await AsyncStorage.setItem("loggedUID", user.uid);
        await AsyncStorage.setItem("loggedEmail", lowerEmail);

        // Check if the user Firestore document exists
        const userDocRef = doc(db, "users", lowerEmail);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            // If not, create it to avoid missing data
            await setDoc(userDocRef, { email: lowerEmail });
        }

        console.log("Login successful: " + lowerEmail);
        setErrorMessage('');
    } catch (error) {
        console.log("Login Error:", error.message);
        setErrorMessage(error.message);
    }
};



// Register
export const handleRegister = async (name, email, password, setErrorMessage) => {
    try {
        // Convert email to lowercase
        const lowerEmail = email.toLowerCase();
        
        const userCredential = await createUserWithEmailAndPassword(auth, lowerEmail, password);
        const user = userCredential.user;
        
        // Store UID and lowercase email in AsyncStorage
        await AsyncStorage.setItem("loggedUID", user.uid);
        await AsyncStorage.setItem("loggedEmail", lowerEmail);
        
        setErrorMessage('');

        // Check if the user document already exists
        const userDocRef = doc(db, "users", lowerEmail);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            // Create Firestore document only if it doesn't already exist
            await setDoc(userDocRef, {
                name: name,
                email: lowerEmail,
            });

            // Initial recipe document
            await addDoc(collection(db, "users", lowerEmail, "recipes"), {
                name: "Placeholder Recipe",
                response: "Create a new recipe on the home screen! Or with the camera!",
                dateCreated: new Date()
            });
            console.log("User document and initial recipe created successfully.");
        }

        return true;
    } catch (error) {
        console.log("Registration Error:", error.message);
        setErrorMessage(error.message);
        return false;
    }
};


// FIRESTORE ||||||||||

// Fetch recipes by email
export const getUserRecipes = async () => {
    const lowerEmail = (await AsyncStorage.getItem("loggedEmail"))?.toLowerCase();
    try {
        const recipesRef = collection(db, "users", lowerEmail, "recipes");
        const querySnapshot = await getDocs(recipesRef);
        let recipes = [];

        querySnapshot.forEach((doc) => {
            recipes.push({ id: doc.id, ...doc.data() });
        });

        return recipes.length > 0 ? recipes : [];
    } catch (e) {
        console.error("Error fetching recipes", e);
        return [];
    }
};


// Save new recipe to the db
export const saveRecipeToDB = async (recipeName, gptResponse) => {
    const lowerEmail = (await AsyncStorage.getItem("loggedEmail"))?.toLowerCase();

    try {
        if (!lowerEmail) {
            throw new Error('User is not logged in. Cannot save recipe.');
        }

        const recipesSubcollectionRef = collection(db, "users", lowerEmail, "recipes");

        const docRef = await addDoc(recipesSubcollectionRef, {
            name: recipeName,
            response: gptResponse,
            dateCreated: Timestamp.now(),
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
    const email = await AsyncStorage.getItem("loggedEmail");
    if (!email) throw new Error("User is not logged in.");

    try {
        const recipeRef = doc(db, "users", email, "recipes", recipeId);
        await updateDoc(recipeRef, { name: newTitle });
        console.log(`Recipe title updated successfully: ${recipeId}`);
    } catch (error) {
        console.error("Error updating recipe title:", error);
    }
};

// Delete recipe
export const deleteRecipe = async (recipeId) => {
    const email = await AsyncStorage.getItem("loggedEmail");
    if (!email) throw new Error("User is not logged in.");

    try {
        const recipeRef = doc(db, "users", email, "recipes", recipeId);
        await deleteDoc(recipeRef);
        console.log(`Recipe deleted successfully: ${recipeId}`);
    } catch (error) {
        console.error("Error deleting recipe:", error);
    }
};
