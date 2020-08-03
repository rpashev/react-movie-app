const getNavigation = (user) => {

    const userLinks = [
      {
        title: "Watchlist",
        link: "/watchlist"
      },
      {
        title: "Already watched",
        link: "/"
      },
      {
        title: "Home",
        link: '/search'
      },
      {
        title: "Logout",
        link: '/logout'
      } 
    ]
  
    const guestLinks = [
      {
        title: "Home",
        link: "/"
      },
      {
        title: "Sign up",
        link: "/register"
      },
      {
        title: "Login",
        link: "/login"
      }
    ]
    //const loggedIn = user && user.loggedIn
    //return loggedIn ? userLinks : guestLinks
    return user ? userLinks : guestLinks
  }
  
  export default getNavigation