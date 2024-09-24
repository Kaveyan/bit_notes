import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import defaultImage from '../img/image.png'; 

export default function Card({ uploads, error, handleLike }) {
  return (
    <div className="dash p-4">
      <div className="dash-main-admin">
        {error && <p className="text-red-500">{`Error: ${error}`}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {uploads.map((upload) => (
            <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href={upload.link} target="_blank" rel="noopener noreferrer">
              <img
                className="object-cover w-full h-48 rounded-t-lg"
                src={upload.image || defaultImage}
                alt={upload.subject}
              />
            </a>
            <div className="p-4 flex flex-col flex-grow">
              <h5 className="text-lg  text-white font-semibold">{upload.subject}</h5>
              <p className="flex-grow text-white">{upload.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-white">Author: {upload.user.firstName}</p>
                <a className="text-blue-500 hover:underline">Inspect</a>
              </div>
            </div>
          </div>
          
          ))}
        </div>
      </div>
    </div>
  );
}
