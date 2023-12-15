import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { cleanLogin } from '../redux/action/user';
import { useDispatch } from 'react-redux';

export function MenuDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState('');

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

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
        Swal.fire('Logout success!', '', 'success').then(() => {
          localStorage.clear();
          dispatch(cleanLogin());
          navigate('/home');
        });
      }
    });
  };
  return (
    <div className='sticky top-5'>
      <div className="bg-white p-2 rounded-lg cursor-pointer">
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
        <Link to={'/dashboard'}>
          <div
            className={`font-medium my-2 ${
              activeMenu === '/dashboard' ? 'bg-gray-300' : 'bg-gray-100'
            } rounded-md px-2 py-2 my-2 text-black w-full hover:bg-gray-300`}
          >
            Dashboard
          </div>
        </Link>
        <Link to={'/add'}>
          <div
            className={`font-medium my-2 ${
              activeMenu === '/add' ? 'bg-gray-300' : 'bg-gray-100'
            } rounded-md px-2 py-2 my-2 text-black w-full hover:bg-gray-300`}
          >
            Post Article
          </div>
        </Link>
        <Link to={`/profile/${localStorage.getItem('id_')}`}>
          <div
            className={`font-medium my-2 ${
              activeMenu === `/profile/${localStorage.getItem('id_')}` ? 'bg-gray-300' : 'bg-gray-100'
            } rounded-md px-2 py-2 my-2 text-black w-full hover:bg-gray-300`}
          >
            Edit Profile
          </div>
        </Link>
        <Link to={`/updatebiodata`} className={`${localStorage.getItem('roles_') !== 'admin' ? 'hidden' : 'block'}`}>
          <div
            className={`font-medium my-2 ${
              activeMenu === `/updatebiodata` ? 'bg-gray-300' : 'bg-gray-100'
            } rounded-md px-2 py-2 my-2 text-black w-full hover:bg-gray-300`}
          >
            Biodata
          </div>
        </Link>
        <Link to={`/addporto`} className={`${localStorage.getItem('roles_') !== 'admin' ? 'hidden' : 'block'}`}>
          <div
            className={`font-medium my-2 ${
              activeMenu === `/addporto` ? 'bg-gray-300' : 'bg-gray-100'
            } rounded-md px-2 py-2 my-2 text-black w-full hover:bg-gray-300`}
          >
            Post Portfolio
          </div>
        </Link>
        <Link to={`/listporto`} className={`${localStorage.getItem('roles_') !== 'admin' ? 'hidden' : 'block'}`}>
          <div
            className={`font-medium my-2 ${
              activeMenu === `/listporto` ? 'bg-gray-300' : 'bg-gray-100'
            } rounded-md px-2 py-2 my-2 text-black w-full hover:bg-gray-300`}
          >
            List Portfolio
          </div>
        </Link>
        <div
          className="font-medium my-2 bg-gray-100 hover:bg-red-500 rounded-md px-2 py-2 my-2 text-black"
          onClick={() => handleLogOut()}
        >
          Logout
        </div>
      </div>
    </div>
  );
}
