import React, { useState } from "react"
import Layout from "../../Components/Layout/Layout"
import { useHistory } from "react-router-dom"
import styles from './login.module.css'
import firebase from "firebase/app";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")


    let history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!passwordError && !emailError) {
            try {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password);

                history.push("/");
            } catch (err) {
                alert(err);
            }
        } else {
            alert("Fill in all the data correctly!")
        }

    }

    const validateEmail = () => {
        let regex = /\S+@\S+\.\S+/
        if (regex.test(email) === false || email === '') {
            setEmailError("Please enter a valid email!")
        } else {
            setEmailError("")
        }
    }

    const validatePassword = () => {
        if (password.length < 6) {
            setPasswordError("Password should be at least 6 symbols!")
        } else {
            setPasswordError("")
        }
    }

    return (
        <Layout>
            <form className={styles.login}>
                <div className={styles.formcontrol}>
                    <label htmlFor="email" >Email</label>
                    <input className={styles.input} value={email} type="email" onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail} />
                    {emailError ? <p className={styles.error}>{emailError}</p> : null}
                </div>

                <div className={styles.formcontrol}>
                    <label htmlFor="password">Password</label>
                    <input className={styles.input} onBlur={validatePassword} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {passwordError ? <p className={styles.error}>{passwordError}</p> : null}
                </div>

                <div className={styles.formcontrol}>
                    <button className={styles.button} type="button" onClick={submitHandler}>Login</button>
                </div>
            </form>;
        </Layout>

    )
}


export default Login