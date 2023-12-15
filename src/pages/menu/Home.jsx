import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBiodata } from '../../redux/action/menu';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareFacebook,
  faSquareXTwitter,
  faSquareInstagram,
  faLinkedin,
  faSquareGithub,
} from '@fortawesome/free-brands-svg-icons';
export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.getBiodata);
  useEffect(() => {
    dispatch(getBiodata());
  }, []);

  return (
    <section className="w-11/12 lg:w-1/2 mx-auto container h-screen flex justify-center items-center">
      <div className="w-full">
        <div className="flex flex-row justify-end font-medium cursor-pointer gap-3">
          <div onClick={() => navigate('/blog')} className="hover:underline">
            Blog
          </div>
          <div onClick={() => navigate('/login')} className="hover:underline">
            Login
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white my-5 w-full">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex justify-center items-center w-full">
              <img
                src={data?.biodata?.photo}
                alt="profile"
                className="rounded-full border border-2 w-32 h-32 object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 ms-0 mt-3 lg:ms-5 lg:mt-0">
              <div>
                Hello, I'm{' '}
                <span className="bg-yellow-50 p-1 font-medium rounded-lg">
                  {data?.biodata?.fullname}
                </span>
              </div>
              <div>
                A{' '}
                <span className="bg-yellow-50 p-1 font-medium rounded-lg">
                  Fullstack Web Developer
                </span>
              </div>
              <div className="flex flex-row flex-wrap gap-2">
                {data?.biodata?.skill?.split(',').map((item, index) => {
                  return (
                    <div
                      className="bg-gray-200 p-2 rounded-lg font-medium text-xs"
                      key={index}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-row gap-2 flex-wrap justify-center lg:justify-normal">
                <div>
                  <a
                    href={data?.biodata?.twitter}
                    target="_blank"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FontAwesomeIcon icon={faSquareXTwitter} size="2xl" />
                  </a>
                </div>
                <div>
                  <a
                    href={data?.biodata?.facebook}
                    target="_blank"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FontAwesomeIcon icon={faSquareFacebook} size="2xl" />
                  </a>
                </div>
                <div>
                  <a
                    href={data?.biodata?.instagram}
                    target="_blank"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FontAwesomeIcon icon={faSquareInstagram} size="2xl" />
                  </a>
                </div>
                <div>
                  <a
                    href={data?.biodata?.linkedin}
                    target="_blank"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FontAwesomeIcon icon={faLinkedin} size="2xl" />
                  </a>
                </div>
                <div>
                  <a
                    href={data?.biodata?.other}
                    target="_blank"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FontAwesomeIcon icon={faSquareGithub} size="2xl" />
                  </a>
                </div>
              </div>
              <div className='cursor-pointer font-medium text-blue-300 hover:text-blue-400' onClick={()=> navigate('/biodata')}>more detail &rarr;</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
