import React, { useEffect, useState } from 'react';
import { getUser } from '../../redux/action/user';
import { useDispatch } from 'react-redux';
import { cleanLogin } from '../../redux/action/user';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogOut = () => {
    Swal.fire({
      title: 'Do you want to logout?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#50C878',
      cancelButtonColor: '#d33',
      confirmButtonText: 'No, cancel!',
      denyButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isDenied) {
        Swal.fire('Logout success!', '', 'success').then(()=>{
          localStorage.clear()
          dispatch(cleanLogin())
          navigate('/login')
        })
      }
    });
  };

  return (
    <section>
      <div className="container w-10/12 mx-auto my-10">
        <h1 className='p-0 m-0'>Hello, <span className='font-medium'>{localStorage.getItem('name_')}</span>!</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
          <div className="col-span-1 p-0 md:pe-5">
            <div className="bg-white shadow-[2px_2px_10px_rgba(0,0,0,0.2)] p-2 rounded-lg sticky top-5 cursor-pointer">
              <div className="flex items-center justify-center">
                <img
                  src={localStorage.getItem('photo_')}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                  }}
                  className="rounded-full border-2 border-gray-300"
                />
              </div>
              <div className="font-bold">MENU</div>
              <div className="font-medium my-2 bg-blue-500 rounded-md px-2 py-2 my-2 text-white">Post Article</div>
              <div className="font-medium my-2 bg-blue-500 rounded-md px-2 py-2 my-2 text-white">Edit Profile</div>
              <div className="font-medium my-2 bg-blue-500 rounded-md px-2 py-2 my-2 text-white">Change Password</div>
              <div className="font-medium my-2 bg-red-500 rounded-md px-2 py-2 my-2 text-white" onClick={() => handleLogOut()}>
                Logout
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-blue-100 p-2 rounded-lg mt-10 md:mt-0">
              <div className="font-bold">POST</div>
            </div>
            <div className="my-5 p-2 bg-gray-400 rounded-lg">
              <div className="flex justify-center items-center">
                <img
                  src="https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png"
                  style={{
                    height: '150px',
                    objectFit: 'cover',
                    width: '150px',
                  }}
                  className="rounded-lg border-2 border-gray-300"
                />
              </div>
              <h1 className="font-bold border-b-2 py-1">Title</h1>
              <p>Hello</p>
              <p>Author</p>
              <p>Date</p>
              <p>Password</p>
            </div>
            <div className="my-5 p-2 bg-gray-400 rounded-lg">
              <div className="flex justify-center items-center">
                <img
                  src="https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png"
                  style={{
                    height: '150px',
                    objectFit: 'cover',
                    width: '150px',
                  }}
                  className="rounded-lg border-2 border-gray-300"
                />
              </div>
              <h1 className="font-bold border-b-2 py-1">Title</h1>
              <p>Hello</p>
              <p>Author</p>
              <p>Date</p>
              <p>Password</p>
            </div>
            <div className="my-5 p-2 bg-gray-400 rounded-lg">
              <div className="flex justify-center items-center">
                <img
                  src="https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png"
                  style={{
                    height: '150px',
                    objectFit: 'cover',
                    width: '150px',
                  }}
                  className="rounded-lg border-2 border-gray-300"
                />
              </div>
              <h1 className="font-bold border-b-2 py-1">Title</h1>
              <p>Hello</p>
              <p>Author</p>
              <p>Date</p>
              <p>Password</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
