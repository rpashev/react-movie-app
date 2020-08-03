const getNavigation = (user) => {

  const userLinks = [
    {
      title: "Home",
      link: '/search'
    },
    {
      title: "Watchlist",
      link: "/watchlist"
    },
    {
      title: "Already watched",
      link: "/"
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
  
  return user ? userLinks : guestLinks
  
}

export default getNavigation