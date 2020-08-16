import db from '../firebase'
import firebase from "firebase/app";

export const addToList = async (data, userID, listname) => {
    try {
        await db
            .collection("userData")
            .doc(userID)
            .update({
                [listname]: firebase.firestore.FieldValue.arrayUnion(data)
            });
        
    } catch (err) {
        alert(err);
    }
}

export const getUserLists = async (userID, listname) => {
    try {
        const doc = await db.collection("userData")
            .doc(userID)
            .get()
        if (doc.exists) {
            return doc.data()[listname]
        } else {
            alert("Not found")
        }
    } catch (err) {
        alert(err)
    }

}

export const removeFromList = async (userID, listname, movieID) => {
    try {
        let currentList = await getUserLists(userID, [listname])
        currentList = currentList.filter(movie => movie.movieID !== movieID)
        await db
            .collection("userData")
            .doc(userID)
            .update({
                [listname]: currentList
            });
        
    } catch (err) {
        alert(err)
    }

}

export const logout = async () => {
    try {
        await firebase.auth().signOut();

    } catch (err) {
        alert(err);
    }
}