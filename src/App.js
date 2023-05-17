import React from 'react'
import './App.css'


import LayoutAuth from './components/layout-auth'
import LayoutPublic from './components/layout-public'
import DarkMode from './components/dark-mode'
// NOTE: i do not like semi-colons and will NOT use them in this project

function App() {
  const [mode, setMode] = React.useState('dark')
  // const [user, setUser] = React.useState(null)
  const tempUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  console.log(tempUser)
  const [user, setUser] = React.useState(tempUser)


  if(user === null || user.loggedIn === false) {
    return (
      <>
        <LayoutPublic user={user} setUser={setUser}/>
      </>
    )
  }

  return (
    <DarkMode mode={mode} setMode={setMode}>
      <LayoutAuth mode={mode} setMode={setMode} user={user} setUser={setUser} />
    </DarkMode>
  )


}

export default App
