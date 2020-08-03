import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'
import Login from './Pages/Login/login'
import Search from './Pages/Search/search'
import Register from './Pages/Register/register'
import Details from './Pages/Details/details'
import Watchlist from './Pages/Watchlist/watchlist'
import Seenlist from './Pages/Seenlist/seenlist'
import NotFoundPage from './Pages/NotFound/notfound'
import HomeGuest from './Pages/HomeGuest/home-guest'

// user ? Search : HomeGuest

const Navigation = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={HomeGuest} /> 
                <Route path="/search" exact component={Search} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/details" exact component={Details} />
                <Route path="/watchlist" exact component={Watchlist} />
                <Route path="/seenlist" exact component={Seenlist} />
                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation