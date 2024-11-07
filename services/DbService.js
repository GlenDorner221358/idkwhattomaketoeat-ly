import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { collection, addDoc, setDoc, getDocs, doc, updateDoc, Timestamp, deleteDoc } from "firebase/firestore";

var loggedEmail = "";


// FIREBASE ||||||||||

// Login
export const handleLogin = (email, password) => {

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Login from: " + user.email)
        loggedEmail = user.email;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage)
    });

}

// Register
export const handleRegister = async (name, email, password) => {
    try {
        // Register the user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Registered: " + user.email);
        loggedEmail = user.email; // Set loggedEmail after registration

        // Firestore document creation
        try {
            // Create user document in the 'users' collection
            await setDoc(doc(db, "users", loggedEmail), {
                name: name,
                email: loggedEmail,
            });
            console.log("User document written with ID: ", loggedEmail);

            // Create an initial document in the 'recipes' collection
            const recipeRef = await addDoc(collection(db, "users", loggedEmail, "recipes"), {
                name: "First Recipe",
                response: "This is a placeholder for your first recipe! You can delete me whenever you want to!",
                dateCreated: new Date()
            });
            console.log("Recipes collection created with initial document, ID: ", recipeRef.id);

            // Sign in the user automatically after successful registration
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in: " + loggedEmail);
            
            return true;
        } catch (e) {
            console.error("Error adding document", e);
            return false;
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
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
    try {
        if (!loggedEmail) {
            throw new Error('User is not logged in. Cannot save recipe.');
        }

        // Create a reference to the "recipes" subcollection under the user's document
        const recipesSubcollectionRef = collection(db, "users", loggedEmail, "recipes");

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
