import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { collection, addDoc, setDoc, getDocs, getDoc, doc, query, orderBy, where, updateDoc } from "firebase/firestore";

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
        loggedEmail = user.email;

        // Firestore creation
        try {
            const docRef = await setDoc(doc(db, "users", user.email), {
                name: name,
                email: user.email,
                wins: 0
            });
            console.log("Document written with ID: ", user.email);
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
}


// FIRESTORE ||||||||||

// Get user data by name
export const getUserData = async (userName) => {
    try {
        const q = query(collection(db, "users"), where("name", "==", userName));
        const querySnapshot = await getDocs(q);
        let userData = null;

        querySnapshot.forEach((doc) => {
            userData = { id: doc.id, ...doc.data() };
        });

        if (userData) {
            return userData;
        } else {
            console.log("No such user!");
            return null;
        }
    } catch (e) {
        console.error("Error fetching user data", e);
        return null;
    }
};

// Get user data by email
export const getUserDataByEmail = async () => {
    try {
        const q = query(collection(db, "users"), where("email", "==", loggedEmail));
        const querySnapshot = await getDocs(q);
        let userData = null;

        querySnapshot.forEach((doc) => {
            userData = { id: doc.id, ...doc.data() };
        });

        if (userData) {
            return userData;
        } else {
            console.log("No such user!");
            return null;
        }
    } catch (e) {
        console.error("Error fetching user data", e);
        return null;
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
