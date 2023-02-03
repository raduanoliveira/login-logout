import React,{useState,useEffect,useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardModerator from './components/BoardModerator';

import { logout } from './actions/auth';
import { clearMessage } from './actions/message';
import BoardAdmin from './components/BoardAdmin';


const App = () => {
  const [showModeratorBoard,setShowModeratorBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)

  const {user: currentUser} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  let location = useLocation()

  useEffect(() => {
    if(['/login','/register'].includes(location.pathname)){
      dispatch(clearMessage())
    }
  }, [dispatch, location]);

  useEffect(() => {
    if(currentUser){
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"))
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"))
    }else{
      setShowModeratorBoard(false)
      setShowAdminBoard(false)
    }
  }, [currentUser]);

  const logOut = useCallback(() => {
    dispatch(logOut())
  },[dispatch])

  return(
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <Link to={'/'} className='navbar-brand'>
          Sistema
        </Link>
        <div className="navbar-nav mr-auto">
          <li className='nav-item'>
            <Link to={'/home'} className='nav-link'>
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className='nav-item'>
              <Link to={'/mod'} className='nav-link'>
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className='nav-item'>
              <Link to={'/admin'} className='nav-link'>
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className='nav-item'>
              <Link to={'/user'} className='nav-link'>
                User
              </Link>
            </li>
          )}

          {currentUser ? (
            <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={'/profile'} className='nav-link'>
                {currentUser.username}
              </Link>
            </li>
            <li className='nav-item'>
              <a href="/login" className='nav-link' onClick={logout}>LogOut</a>
            </li>
            </div>
          ): (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/login'} className='nav-link'>
                  Login
                </Link>
              </li>

              <li className='nav-item'>
                <Link to={'/register'} className='nav-link'>
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/user' element={<BoardUser/>}/>
          <Route path='/mod' element={<BoardModerator/>}/>
          <Route path='/admin' element={<BoardAdmin/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App