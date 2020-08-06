import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { Link } from 'react-router-dom'

const HomeGuest = () => {
    return (
        <Layout>
            <h1>Welcome!</h1>
            <div>
                <Link to='/register'><h3>SIGN UP to begin</h3></Link>
                <p>Already have an accout? </p>
                <Link to='/login'><h3>SIGN IN here</h3></Link>
            </div>
        </Layout>

    )
}

export default HomeGuest