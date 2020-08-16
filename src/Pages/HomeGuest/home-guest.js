import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { Link } from 'react-router-dom'
import styles from './home-guest.module.css'
const HomeGuest = () => {
    return (
        <Layout>
            <div className={styles.homeguest}>
                <h1>Welcome!</h1>
                <div>
                    <Link className={styles.link} to='/register'><h3>SIGN UP to begin</h3></Link>
                    <p>Already have an account? </p>
                    <Link className={styles.link} to='/login'><h3>SIGN IN here</h3></Link>
                </div>
                <img className={styles.image} alt="pic" src='./superheroes.png' />
            </div>

        </Layout>

    )
}

export default HomeGuest