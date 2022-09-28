import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import PostTitles from './PostTitles';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Posts from './Posts';
import './Main.css'


function Main() {

    const [profile, setProfile ] = useState([]);
    const clientId = '307690102093-cpfchn571pi33ate7osl9dpno87kiin4.apps.googleusercontent.com';

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        setProfile(res.profileObj);
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setProfile(null);
    };

    return (
        <div className='main'>
            {profile? (
                <div>
                    <GoogleLogout  clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
                    <BrowserRouter>
                        <Routes>
                        <Route path='/task2/:id' element={<Posts />}/>
                        <Route path='/task2' element={<PostTitles />}/>        
                        </Routes>
                    </BrowserRouter>
                </div>
            ) : (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            )}
        </div>
    );
}
export default Main;