import firebase from "firebase/app";
const logout = async () => {
    try {
        await firebase.auth().signOut();

    } catch (err) {
        alert(err);
    }
}

export default logout