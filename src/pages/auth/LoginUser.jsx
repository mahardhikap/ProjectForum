import React, { useEffect, useState, useCallback } from 'react';
import { login, cleanLogin } from '../../redux/action/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

export function LoginUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isError, errorMessage } = useSelector((state) => state.login);
  const [inputUser, setInputUser] = useState({
    email: '',
    password: '',
  });
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);
  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

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
    <section className="h-screen flex flex-col justify-center items-center container mx-auto">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: '#ffffff',
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: '#000000',
            },
            links: {
              color: '#000000',
              distance: 150,
              enable: true,
              opacity: 1,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="z-10 w-full flex justify-center items-center flex-col">
        <h1 className="text-2xl mb-4 font-bold text-[#808080]">
          LOGIN PROJECT13
        </h1>
        <form
          className="w-10/12 sm:w-1/3 bg-white shadow-[2px_2px_10px_rgba(0,0,0,0.5)] rounded-lg p-3"
          onSubmit={postData}
        >
          <div>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full p-3 outline-none border-2 my-2 rounded-lg"
              placeholder="Email"
              onChange={onChangeInput}
              defaultValue={inputUser.email}
            />
            <input
              id="password"
              name="password"
              type="password"
              className="w-full p-3 outline-none border-2 my-2 rounded-lg"
              placeholder="Password"
              onChange={onChangeInput}
              defaultValue={inputUser.password}
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="px-3 py-2 bg-gray-200 rounded-lg font-bold mt-2 text-[#808080]"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      {/* <div className="mt-4 font-medium text-[#808080]">Register? forget password</div> */}
    </section>
  );
}
