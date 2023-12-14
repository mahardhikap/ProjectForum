import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { getDetailPorto } from '../../redux/action/menu';
import { useDispatch, useSelector } from 'react-redux';
export function DetailPorto() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getDetailPorto);
  useEffect(() => {
    dispatch(getDetailPorto(id));
  }, []);

  return (
    <section>
      <div className="w-11/12 lg:w-3/5 container mx-auto">
        <div className="shadow-[1px_1px_10px_rgba(0,0,0,0.1)] p-2 rounded-xl bg-white my-5">
          <div className="flex justify-end pb-5 ">
            <Link
              to={-1}
              className="no-underline text-red-900 hover:text-red-500 cursor-pointer text-3xl"
            >
              <FontAwesomeIcon icon={faRectangleXmark} />
            </Link>
          </div>
          <h1 className="text-3xl text-center font-bold">{data?.title}</h1>
          <div className="flex justify-center items-center mt-5">
            <img
              src={data?.photo}
              className="w-[400px] h-[250px] object-cover rounded-lg border"
              alt="Article Cover"
            />
          </div>
          <div className="w-2/3 justify-center mx-auto flex flex-row flex-wrap gap-3 my-5">
            {data?.stack?.split(',').map((item, index) => {
              return (
                <div key={index} className="p-2 bg-yellow-100 rounded-lg">
                  {item}
                </div>
              );
            })}
          </div>
          <div dangerouslySetInnerHTML={{ __html: data?.about }}></div>
        </div>
      </div>
    </section>
  );
}
