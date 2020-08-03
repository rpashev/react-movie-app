import React, { useContext } from 'react'
import userContext from '../../Context/user-context'
import getNavigation from '../../utils/navigation-links'
import { Link } from 'react-router-dom'
import styles from './header.module.css'


const Header = () => {
    const context = useContext(userContext)
    //const userId = context.user.uid
    let {user} = context;
    const links = getNavigation(user)

        return (
        <header className={styles.header}>

            {
                links.map(el => {
                    return (
                        <Link className={styles.link}
                            key={el.title}
                            to={el.link}
                        >
                            {el.title}
                        </Link>
                    )
                })
            }

        </header>
    )
}
export default Header