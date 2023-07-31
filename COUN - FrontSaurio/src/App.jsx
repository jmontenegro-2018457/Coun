import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import { Outlet } from 'react-router-dom'
import NavBar from './components/Navbar.jsx'

function App() {
  return(
    //REACT FRAGMENT
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </>
  )
}

export default App
