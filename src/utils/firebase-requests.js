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