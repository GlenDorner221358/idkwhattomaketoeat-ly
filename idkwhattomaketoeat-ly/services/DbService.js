// TODO: Create Firebase Auth Functions
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { collection, addDoc, setDoc, getDocs, getDoc, doc, query, orderBy, where, updateDoc } from "firebase/firestore";

var loggedEmail = "";

var newDuelId = "";


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

// Create new competition
export const createNewCompetition = async (item) => {

    try {
        const docRef = await addDoc(collection(db, "duels"), item);
        console.log("Document written with ID: ", docRef.id);
        newDuelId = docRef.id;
        return true
    } catch (e) {
        console.error("Error adding document", e);
        return false
    }

}

// Get all competitions
export const getAllCompetitions = async () => {

    var allItems = []

    var q = query( collection(db, "duels")
    )
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        allItems.push({... doc.data(), id: doc.id})
    });

    console.log(allItems)
    return allItems
}

// Get all users and sort by wins in descending order
export const getAllUsersByWins = async () => {
    var allUsers = [];
    var q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        allUsers.push({... doc.data(), id: doc.id});
    });

    // Sort users by wins in descending order
    allUsers.sort((a, b) => b.wins - a.wins);
    
    return allUsers;
}

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

// Update user data by username
export const updateUserData = async (userName, updatedData) => {
    try {
        const q = query(collection(db, "users"), where("name", "==", userName));
        const querySnapshot = await getDocs(q);
        let userId = null;

        querySnapshot.forEach((doc) => {
            userId = doc.id;
        });

        if (userId) {
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, updatedData);
            console.log("User data updated for: ", userName);
            return true;
        } else {
            console.log("No such user!");
            return false;
        }
    } catch (e) {
        console.error("Error updating user data", e);
        return false;
    }
};

// Get the logged user's name
export const getUserName = async () => {
    try {
        const q = query(collection(db, "users"), where("email", "==", loggedEmail));
    const querySnapshot = await getDocs(q);
        let userName = null;

    querySnapshot.forEach((doc) => {
            userName = doc.data().name;
        });

        if (userName) {
            console.log("User name: ", userName);
            return userName;
        } else {
            console.log("No user found with the given email.");
            return null;
        }
    } catch (e) {
        console.error("Error fetching user name", e);
        return null;
    }
}

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

// Edit competition by id
export const editCompetitionById = async (id, updatedData) => {
    try {
        const docRef = doc(db, "duels", id);
        await updateDoc(docRef, updatedData);
        console.log("Document updated with ID: ", id);
        return true;
    } catch (e) {
        console.error("Error updating document", e);
        return false;
    }
}

// Get new duels id
export const getNewDuelId = async () => {
    try {
        return newDuelId;
    } catch (e) {
       console.error("Literally how", e);
    }
}