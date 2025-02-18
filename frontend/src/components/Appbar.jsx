import { Button } from "./Button";
import React from 'react';

export const Appbar = ({ onClick, name, username }) => {
    return (
        <div className="shadow h-16 flex justify-between items-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
            <div className="flex items-center h-full ml-4">
            <span className="size-8 m-5"> <img src="./public/image.png"/> </span>  
                <span className="text-2xl font-bold ">EZpay  </span>
            </div>
            <div className="flex items-center">
                <div className="flex flex-col justify-center h-full mr-4">
                    <span className="text-lg font-medium">{username.split('@')[0]}</span>
                </div>
                <div className="rounded-full h-12 w-12 bg-white flex justify-center items-center mt-1 mr-2">
                    <span className="text-xl text-purple-500 font-bold">
                        {name[0].toUpperCase()}
                    </span>
                </div>
                <div className="mr-4">
                    <Button label={"Logout"} onClick={onClick} className="bg-white text-purple-500 hover:bg-purple-500 hover:text-white transition duration-300"/>
                </div>
            </div>
        </div>
    );
}
