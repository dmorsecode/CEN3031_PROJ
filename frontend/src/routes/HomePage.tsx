import Avatar from 'components/Avatar'
import logo from 'assets/logo.svg'
import React, { useState, useEffect } from 'react'
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useContext } from 'react';
import { UserContext, ProfileContext } from 'components/App';

function HomePage() {
  const { user, setUser } = useContext(UserContext);
  const { profile, setProfile } = useContext(ProfileContext);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      setUser(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error)
  })

  useEffect(
    () => {
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile(res.data)
            console.log(res.data);
          })
          .catch((err) => console.log(err))
      }
    },
    [user]
  )

  const logOut = () => {
    googleLogout()
    setProfile(null)
  }

  if (!user) {
    return (
      <div className="w-full h-full flex items-center">
        {profile ? (
          <div>
            <img src={profile.picture} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <button onClick={logOut}>Log out</button>
          </div>
        ) : (
          <button className="btn btn-lg btn-neutral m-auto" onClick={() => login()}>SIGN IN WITH GOOGLE</button>
        )}
      </div>
    )
  }

  return (
    <div className="relative overflow-y-auto h-screen bg-white">
      <div className="sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">

          {/* header section w/ logo + welcome message */}
          <div className="sm:max-w-lg">
            <div className="my-4">
              <Avatar size="large" src={logo} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to Your Food Carbon Emission Tracker
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Track your daily carbon footprint and make sustainable food choices.
            </p>
          </div>
          {/* widgets w/ user statistics */}
          <div className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-100 rounded-lg shadow">
                <h2 className="text-xl font-bold">Total Carbon Emissions Today</h2>
                <p className="text-2xl font-bold text-green-600">300 grams</p>
              </div>
              <div className="p-4 bg-blue-100 rounded-lg shadow">
                <h2 className="text-xl font-bold">Daily Average Carbon Emissions</h2>
                <p className="text-2xl font-bold text-blue-600">280 grams</p>
              </div>
              <div className="p-4 bg-yellow-100 rounded-lg shadow">
                <h2 className="text-xl font-bold">Weekly Average Carbon Emissions</h2>
                <p className="text-2xl font-bold text-yellow-600">250 grams</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
