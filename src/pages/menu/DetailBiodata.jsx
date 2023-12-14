import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBiodata } from '../../redux/action/menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareFacebook,
  faSquareXTwitter,
  faSquareInstagram,
  faLinkedin,
  faSquareGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export function DetailBiodata() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getBiodata);
  useEffect(() => {
    dispatch(getBiodata());
  }, []);
  return (
    <section className="mx-auto w-11/12 lg:w-3/5 my-5 bg-white shadow-[1px_1px_10px_rgba(0,0,0,0.1)] rounded-lg">
      <div className="p-2">
        <div className="flex justify-end">
          <Link
            to={-1}
            className="no-underline text-red-900 hover:text-red-500 cursor-pointer text-3xl"
          >
            <FontAwesomeIcon icon={faRectangleXmark} />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="col-span-1 flex flex-col justify-center items-center lg:flex-none lg:justify-normal lg:items-start">
            <img
              src={data?.biodata?.photo}
              alt=""
              className="rounded-lg border w-40 h-40 object-cover"
            />
            <div className="flex flex-row gap-2 my-5 flex-wrap">
              <div>
                <a href={data?.biodata?.twitter} target="_blank">
                  <FontAwesomeIcon icon={faSquareXTwitter} size="2xl" />
                </a>
              </div>
              <div>
                <a href={data?.biodata?.facebook} target="_blank">
                  <FontAwesomeIcon icon={faSquareFacebook} size="2xl" />
                </a>
              </div>
              <div>
                <a href={data?.biodata?.instagram} target="_blank">
                  <FontAwesomeIcon icon={faSquareInstagram} size="2xl" />
                </a>
              </div>
              <div>
                <a href={data?.biodata?.linkedin} target="_blank">
                  <FontAwesomeIcon icon={faLinkedin} size="2xl" />
                </a>
              </div>
              <div>
                <a href={data?.biodata?.other} target="_blank">
                  <FontAwesomeIcon icon={faSquareGithub} size="2xl" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-span-3 ps-0 lg:ps-2">
            <div className="font-bold mb-2">Name:</div>
            <div>{data?.biodata?.fullname}</div>
            <div className="font-bold my-2">About</div>
            <div
              dangerouslySetInnerHTML={{ __html: data?.biodata?.about }}
            ></div>
            <div className="font-bold my-2">Skill</div>
            <div className="w-full flex flex-row flex-wrap gap-3">
              {data?.biodata?.skill?.split(',').map((item, index) => {
                return (
                  <div className="bg-yellow-100 p-2 rounded-lg" key={index}>
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-5 font-bold my-2">Portfolio</div>
        <div className="flex flex-row gap-2 flex-wrap">
          {data?.portfolio?.map((item, index) => {
            return (
              <Link to={`/detailporto/${item.id}`} key={index}>
                <div className="border p-2 rounded-lg w-60">
                  <div className="flex items-center justify-center">
                    <img
                      src={item.photo}
                      alt="portfolio-picture"
                      className="max-h-36"
                    />
                  </div>
                  <div className="font-bold text-black">
                    {item.title.slice(0, 30)}
                    {item.title.length > 30 ? <span>...</span> : ''}
                  </div>
                  <div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.about.slice(0, 100),
                      }}
                    ></div>
                    {item.about.length > 100 ? (
                      <span className="font-bold text-blue-300">read more</span>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
