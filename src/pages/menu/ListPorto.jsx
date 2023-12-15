import React, { useDeferredValue, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import { MenuDashboard } from '../../components/MenuDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { deletePorto, getPorto } from '../../redux/action/menu';
import Swal from 'sweetalert2';

export function ListPorto() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getPorto);
  useEffect(() => {
    dispatch(getPorto());
  }, []);

  const handleDeletePorto = (id) => {
    Swal.fire({
      title: 'Do you want to delete this portfolio?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Cancel',
      denyButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.close();
      } else if (result.isDenied) {
        dispatch(deletePorto(id)).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Delete success!',
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(getPorto());
        });
      }
    });
  };
  return (
    <section>
      <div className="container w-11/12 lg:w-10/12 mx-auto my-5">
        <h3 className="p-0 m-0">
          Hello,{' '}
          <span className="font-medium">{localStorage.getItem('name_')}</span>!
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
          <div className="col-span-1 p-0 md:pe-2">
            <MenuDashboard />
          </div>
          <div className="col-span-2">
            <div className="bg-gray-200 p-2 rounded-lg mt-5 md:mt-0">
              <div className="font-bold">LIST PORTFOLIO</div>
            </div>
            {data?.map((item, index) => {
              return (
                <div className="my-2 p-2 rounded-lg bg-white" key={index}>
                  <div className="flex flex-row items-center gap-5">
                    <div
                      className="text-green-400 font-extrabold cursor-pointer text-2xl"
                      onClick={() => navigate(`/editporto/${item.id}`)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </div>
                    <div
                      className="text-red-400 font-extrabold cursor-pointer text-2xl"
                        onClick={() => handleDeletePorto(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
                  <Link to={`/detailporto/${item.id}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="flex justify-center items-center m-1 md:m-2 border rounded-lg">
                        <img
                          src={item.photo}
                          style={{
                            height: '280px',
                            objectFit: 'cover',
                            width: '450px',
                          }}
                          className="rounded-lg"
                        />
                      </div>
                      <div className="col-span-1 flex flex-col justify-center items-center m-1 md:m-2">
                        <div className="w-full">
                          <h1 className="font-bold py-1 mb-3">
                            {item.title.slice(0, 30)}
                            {item.title.length > 30 ? (
                              <span className="font-bold">...</span>
                            ) : (
                              ''
                            )}
                          </h1>
                          <div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.about.slice(0, 100) + '...',
                              }}
                            ></div>
                            {item.about.length > 100 ? (
                              <span className="font-medium text-blue-300">
                                read more &rarr;
                              </span>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
