import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { collection, addDoc, setDoc, getDocs, getDoc, doc, query, orderBy, where, updateDoc, Timestamp } from "firebase/firestore";

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
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Signed up 
        const user = userCredential.user;
        console.log("Registered: " + user.email);
        const loggedEmail = user.email;

        // Firestore creation
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
                response: "This is a placeholder for your first recipe!",
                dateCreated: new Date()
            });
            console.log("Recipes collection created with initial document, ID: ", recipeRef.id);

            // Create an initial document in the 'macros' collection
            const macroRef = await addDoc(collection(db, "users", loggedEmail, "macros"), {
                protein: 0,
                carbs: 0,
                fats: 0,
                dateCreated: new Date()
            });
            console.log("Macros collection created with initial document, ID: ", macroRef.id);

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
export const saveRecipeToDB = async (loggedEmail, recipeName, gptResponse) => {
    try {
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


// Edit USER by id
export const editUserById = async (id, updatedData) => {
    try {
        const docRef = doc(db, "users", id);
        await updateDoc(docRef, updatedData);
        console.log("Document updated with ID: ", id);
        return true;
    } catch (e) {
        console.error("Error updating document", e);
        return false;
    }
}
