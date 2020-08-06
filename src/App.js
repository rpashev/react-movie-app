import React from 'react';
import userContext from './Context/user-context'
import { useAuth } from './CustomHooks/useAuth'
import './App.css'
const App = (props) => {
  const { initializing, user } = useAuth()
  if (initializing) {
    return <div>Loading</div>
  }

  return (
    <userContext.Provider value={{ user }}> {props.children} </userContext.Provider>)
}

export default App;
