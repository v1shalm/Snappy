import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';


import { client } from '../client'

const Login = () => {
    const navigate = useNavigate();


    const responseGoogle = (response) => {
        localStorage.setItem('user', JSON.stringify(response.profileObj))


        let { name, googleId, imageUrl } = response.profileObj


        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: imageUrl,
        };
        client.createIfNotExists(doc).then(() => {
            navigate('/', { replace: true });
        });
    };

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className=" relative w-full h-full bg-violet-500">
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
                    <div className="p-5">
                        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600">SNAPPY</h1>
                    </div>

                    <div className="shadow-2xl">
                        <GoogleLogin
                            clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                            render={(renderProps) => (
                                <button
                                    type="button"
                                    className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    <FcGoogle className="mr-4" /> Sign in with google
                                </button>
                            )}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy="single_host_origin"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
