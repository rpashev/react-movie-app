import React from 'react'
import Layout from '../../Components/Layout/Layout'
import styles from './notfound.module.css'

const NotFound = () => {
    return (
        <Layout>
            <div className={styles.notfound}>
                <img alt="pic" src="./notfound.png"></img>
            </div>
        </Layout>

    )
}

export default NotFound