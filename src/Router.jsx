import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App'
import Login from './Pages/Auth/Login'
import Registration from './Pages/Auth/Registration'
import Newsfeed from './Pages/Users/Newsfeed/Newsfeed'
import Findfriend from './Pages/Users/Findfriend/Findfriend'
import Friend from './Pages/Users/Newsfeed/Connection/Friend'
import AuthProfile from './Pages/Users/Profile/AuthProfile'
import ProfileID from './Pages/Users/Profile/ProfileID'
import SinglePostID from './Pages/Users/Post/SinglePostID'
import axios from 'axios'
import Dashboard from './Pages/Admin/Dashboard'
import Users from './Pages/Admin/Users'
import Posts from './Pages/Admin/Posts'
import Reports from './Pages/Admin/Reports'


function Router() {

    axios.defaults.headers.common['token'] = localStorage.getItem('token')

    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        //if (!localStorage.getItem('token') && window.location.pathname !== "/login" && window.location.pathname !== "/register") window.location.pathname = "/login"
        
        switch (window.location.pathname) {
            case "/login":
            case "/registration":
                if (localStorage.getItem('token') && window.atob(localStorage.getItem('usertype')) !== 'users') window.location.pathname = "/newsfeed"
                else if (localStorage.getItem('token') && window.atob(localStorage.getItem('usertype')) !== 'admin') window.location.pathname = "/dashboard"
                else return config;
                break;
            
            case "/newsfeed":
            case "/friend":
            case "/findfriend":
            case "/profile":
                if (!localStorage.getItem('token') && window.atob(localStorage.getItem('usertype')) !== 'users') window.location.pathname = "/login"
                else if (window.atob(localStorage.getItem('usertype')) === 'admin') window.location.pathname = "/dashboard"
                else return config;
                break;
            
            case "/dashboard":
            case "/users":
            case "/comments":
            case "/posts":
            case "/reacts":
                if (!localStorage.getItem('token') && window.atob(localStorage.getItem('usertype')) !== 'admin') window.location.pathname = "/login"
                else if (window.atob(localStorage.getItem('usertype')) === 'users') window.location.pathname = "/newsfeed"
                else return config;
                break;
                
            default:
                break;
        }

        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // if (!localStorage.getItem('token')) window.location.pathname = "/login"
        
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });


    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<App />} />

                {/* Auth */}
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/registration' element={<Registration />} />


                
                {/* Users */}
                <Route exact path='/newsfeed' element={<Newsfeed />} />
                <Route exact path='/findfriend' element={<Findfriend />} />
                <Route exact path='/friend' element={<Friend />} />
                {/* Profile */}
                <Route exact path='/profile' element={<AuthProfile />} />
                <Route exact path="/profile/:id" element={<ProfileID />} />

                {/* Post */}
                <Route exact path='/posts/:id' element={<SinglePostID />} />

                

                {/* Admin routes */}
                <Route exact path='/dashboard' element={<Dashboard />} />
                <Route exact path='/users' element={<Users />} />
                <Route exact path='/posts' element={<Posts />} />
                <Route exact path='/reports' element={ <Reports />} />


            </Routes>
        </BrowserRouter>
    )
}

export default Router