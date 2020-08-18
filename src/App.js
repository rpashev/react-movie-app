import React from 'react';
import userContext from './Context/user-context'
import { useAuth } from './CustomHooks/useAuth'
import Loader from './Components/Loader/loader';
const App = (props) => {
  const { initializing, user } = useAuth()
  if (initializing) {
    return <Loader />
  }

  return (
    <userContext.Provider value={{ user }}> {props.children} </userContext.Provider>)
}

export default App;
