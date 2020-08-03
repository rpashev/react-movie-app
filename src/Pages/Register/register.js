import React, { useState } from "react"
import Layout from "../../Components/Layout/Layout"
import { useHistory } from "react-router-dom"
import styles from "./register.module.css"
import db from '../../firebase'
import firebase from "firebase/app";
require("firebase/auth");


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    let history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();
        let userId = ""
        try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password);
    
            let user = await firebase.auth().currentUser;
            userId = user.uid;
    
            let userList = {
              watchlist: [],
              seenlist: []
            };
    
            await db
              .collection("userData")
              .doc(userId)
              .set(userList)
              .catch(err => console.log(err));
    
            setEmail("")
            setPassword("")
            setRepeatPassword("")
            history.push("/");
          } catch (err) {
            alert(err);
          }
    }

   
    return (
        <Layout>
            <form className={styles.register}>
                <div className={styles.formcontrol}>
                    <label htmlFor="email" >Email</label>
                    <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className={styles.formcontrol}>
                    <label htmlFor="password">Password</label>
                    <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className={styles.formcontrol}>
                    <label htmlFor="repeatPassword" >Repeat password</label>
                    <input className={styles.input} type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                </div>

                <div className={styles.formcontrol}>
                    <button type="button" onClick={submitHandler}>Register</button>
                </div>
            </form>;
        </Layout>

    )
}


export default Register