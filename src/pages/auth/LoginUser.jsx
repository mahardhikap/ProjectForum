import React, { useEffect, useState, useCallback } from 'react';
import { login, cleanLogin } from '../../redux/action/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function LoginUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isError, errorMessage } = useSelector((state) => state.login);
  const [inputUser, setInputUser] = useState({
    email: '',
    password: '',
  });

  const postData = (e) => {
    e.preventDefault();
    dispatch(login(inputUser));
  };

  const onChangeInput = (e) => {
    setInputUser({ ...inputUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isError) {
      Swal.fire(`${errorMessage?.message}`, '', 'error').then(() =>
        dispatch(cleanLogin())
      );
    } else if (data) {
      Swal.fire(`${data?.message}`, '', 'success').then(() =>
        navigate('/dashboard')
      );
    }
  }, [data, isError, errorMessage]);

  return (
    <section className="h-screen flex flex-col justify-center items-center container mx-auto bg-gray-50">
      <div className="z-10 w-full flex justify-center items-center flex-col">
        <h1 className="text-2xl mb-4 font-bold">SIGN IN</h1>
        <form
          className="w-11/12 sm:w-3/5 lg:w-1/3 bg-white rounded-lg p-3"
          onSubmit={postData}
        >
          <div>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full p-3 outline-none border my-2 rounded-lg"
              placeholder="Email"
              onChange={onChangeInput}
              defaultValue={inputUser.email}
            />
            <input
              id="password"
              name="password"
              type="password"
              className="w-full p-3 outline-none border my-2 rounded-lg"
              placeholder="Password"
              onChange={onChangeInput}
              defaultValue={inputUser.password}
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="px-3 py-3 w-full bg-gray-300 hover:bg-gray-400 rounded-lg font-bold mt-2"
            >
              LOGIN
            </button>
          </div>
        </form>
        <div className='cursor-pointer font-medium text-blue-300 hover:text-blue-400' onClick={()=>navigate('/home')}>&larr; back to home</div>
      </div>
      {/* <div className="mt-4 font-medium text-[#808080]">Register? forget password</div> */}
    </section>
  );
}
