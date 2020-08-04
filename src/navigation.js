import React, { useContext } from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import Login from './Pages/Login/login'
import Search from './Pages/Search/search'
import Register from './Pages/Register/register'
import Details from './Pages/Details/details'
import Watchlist from './Pages/Watchlist/watchlist'
import Seenlist from './Pages/Seenlist/seenlist'
import NotFoundPage from './Pages/NotFound/notfound'
import HomeGuest from './Pages/HomeGuest/home-guest'
import Logout from './Components/Logout/logout'
import userContext from './Context/user-context'

// user ? Search : HomeGuest

const Navigation = () => {
    const context = useContext(userContext)
    let { user } = context

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    {user ? <Search /> : <HomeGuest />}
                </Route>

                <Route path="/login" exact>
                    {!user ? <Login /> : <Redirect to='/' />}
                </Route>

                <Route path="/logout" exact>
                    {user ? <Logout /> : <Redirect to='/' />}
                </Route>

                <Route path="/register" exact>
                    {!user ? <Register /> : <Redirect to='/' />}
                </Route>

                <Route path="/details" exact>
                    {user ? <Details /> : <Redirect to='/' />}
                </Route>

                <Route path="/watchlist" exact>
                    {user ? <Watchlist /> : <Redirect to='/' />}
                </Route>

                <Route path="/seenlist" exact>
                    {user ? <Seenlist /> : <Redirect to='/' />}
                </Route>

                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation