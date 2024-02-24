import { useEffect } from 'react';
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
  }, [dispatch]);

  return (
    <section className="w-11/12 lg:w-1/2 mx-auto container h-screen flex justify-center items-center">
      <div className="w-full">
        <div className="px-2 py-5 rounded-xl bg-white flex items-center my-5 w-full">
          <div className="flex flex-col lg:flex-row items-center w-full">
            <div className="flex justify-center items-center w-full">
              <img
                src={data?.biodata?.photo}
                alt="profile"
                className="rounded-full border border-2 w-36 h-36 object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 ms-0 mt-3 lg:ms-5 lg:mt-0">
              <div>
                Hello, I&apos;m{' '}
                <span className="px-1 font-medium rounded-lg">
                  {data?.biodata?.fullname}
                </span>
              </div>
              <div>
                A{' '}
                <span className="px-1 font-medium rounded-lg">
                  Fullstack Web Developer
                </span>
              </div>
              <div className="flex flex-row flex-wrap gap-2 my-2">
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
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faSquareXTwitter} size="2xl" />
                  </a>
                </div>
                <div>
                  <a
                    href={data?.biodata?.facebook}
                    target="_blank"
                    className="text-gray-400 hover:text-gray-500"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faSquareFacebook} size="2xl" />
                  </a>
                </div>
                <div>
                  <a
                    href={data?.biodata?.instagram}
                    target="_blank"
                    className="text-gray-400 hover:text-gray-500"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faSquareInstagram} size="2xl" />
                  </a>
                </div>
                <div>
                  <a
                    href={data?.biodata?.linkedin}
                    target="_blank"
                    className="text-gray-400 hover:text-gray-500"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faLinkedin} size="2xl" />
                  </a>
                </div>
                <div>
                  <a
                    href={data?.biodata?.other}
                    target="_blank"
                    className="text-gray-400 hover:text-gray-500"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faSquareGithub} size="2xl" />
                  </a>
                </div>
              </div>
              <div className="flex flex-row justify-between mt-10">
                <div
                  className="cursor-pointer font-medium text-blue-300 hover:text-blue-400"
                  onClick={() => navigate('/blog')}
                >
                  &larr;my blog
                </div>
                <div
                  className="cursor-pointer font-medium text-blue-300 hover:text-blue-400"
                  onClick={() => navigate('/biodata')}
                >
                  my self &rarr;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
