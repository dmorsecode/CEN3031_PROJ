import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useContext } from 'react'
import { UserContext, ProfileContext } from 'components/App'

function NavBar() {
  const { user, setUser } = useContext(UserContext)
  const { profile, setProfile } = useContext(ProfileContext)

  const logOut = () => {
    googleLogout()
    setUser(null)
    setProfile(null)
  }

  return (
    <nav className="navbar bg-base-100 border-b border-neutral">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Home</Link>
        {profile && (
          <>
            <Link to="/recipe/create" className="btn btn-ghost text-xl">Create New Recipe</Link>
            <Link to="/recipes" className="btn btn-ghost text-xl">Recipes</Link>
            <Link to="/tracker" className="btn btn-ghost text-xl">Tracker</Link>
          </>
        )}
      </div>
      {profile && (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt={profile.name}
                  src={profile.picture}
                  referrerpolicy="no-referrer" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a onClick={logOut}>Logout</a></li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar
