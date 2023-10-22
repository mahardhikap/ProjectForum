import React from 'react';

function NotFound() {
  const videoElement = document.getElementById('root');

  videoElement.addEventListener('mouseover', () => {
    videoElement.play();
  });

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <iframe
        className="w-full h-full object-cover fixed z-0 absolute inset-0"
        src="https://www.youtube.com/embed/t0gxpkL6lL4?autoplay=1&loop=1&controls=1" // Ganti VIDEO_ID dengan ID video YouTube
        title="YouTube Video"
        frameBorder="0"
        allow="autoplay"
        allowFullScreen
      ></iframe>
      <div className="z-10 bg-black bg-opacity-50 p-4 w-screen h-screen rounded-lg flex justify-center items-center flex-col">
        <h2 className="font-extrabold text-3xl text-center text-white">404</h2>
        <p className="text-xl font-medium text-white text-center">
          Halaman Tidak Ditemukan
        </p>
      </div>
    </div>
  );
}

export default NotFound;
