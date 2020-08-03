import React, { useState } from "react"
import Layout from "../../Components/Layout/Layout"
import { useHistory } from "react-router-dom"
import styles from './login.module.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    let history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        const data = { email, password }
        console.log(data)
    }
    return (
        <Layout>
            <form className={styles.login}>
                <div className={styles.formcontrol}>
                    <label htmlFor="email" >Email</label>
                    <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className={styles.formcontrol}>
                    <label htmlFor="password">Password</label>
                    <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className={styles.formcontrol}>
                    <button type="button" onClick={submitHandler}>Login</button>
                </div>
            </form>;
        </Layout>

    )
}


export default Login