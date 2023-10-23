import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPost } from '../../redux/action/menu';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { compare } from 'bcryptjs';
import { faCircleRight, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ParticleComponent } from '../../components/ParticleComponent';

export function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchby, setSearchby] = useState('title');
  const [search, setSearch] = useState('');
  const [sortby, setSortby] = useState('created_at');
  const [sort, setSort] = useState('DESC');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [inputPassword, setInputPassword] = useState('');
  const { data: getPost } = useSelector((state) => state.getAllPost);

  const handlePassword = async (password, id) => {
    const storedHash = password;
    const isMatch = await compare(inputPassword, storedHash);

    if (isMatch) {
      localStorage.setItem('securearticle_', inputPassword);
      navigate(`/detail/${id}`);
    } else {
      Swal.fire('Password is incorrect!', '', 'error');
    }
  };

  const onChangePassword = (e) => {
    setInputPassword(e.target.value);
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= getPost?.pages?.totalPage) {
      setPage(pageNumber);
    }
  };

  useEffect(() => {
    dispatch(getAllPost(searchby, search, sortby, sort, page, limit));
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <section>
      <div className="container mx-auto w-11/12 lg:w-3/5">
        <div className="mt-10 p-2 rounded-xl">
          <div className="flex flex-row items-center justify-between font-bold">
            <div>HOMEPAGE</div>
            <div onClick={() => navigate('/login')} className="cursor-pointer">
              LOGIN
            </div>
          </div>
        </div>
        <div className="mt-5 mb-10 p-2 rounded-xl">
          <div>
            {getPost?.rows?.map((item, index) => {
              return item.post_pass !== 'undefined' ? (
                <div
                  className="my-5 p-2 rounded-lg bg-white shadow-[1px_1px_10px_rgba(0,0,0,0.1)]"
                  key={index}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex justify-center items-center col-span-1 border rounded-lg m-1 md:m-2">
                      <img
                        src={
                          'https://i.ibb.co/RDfWY1Y/pic-removebg-preview.png'
                        }
                        style={{
                          height: '280px',
                          objectFit: 'cover',
                          width: '450px',
                        }}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="col-span-1 flex flex-col justify-center items-center m-1 md:m-2">
                      <h1 className="font-bold py-1 mb-3">{item.title}</h1>
                      <div className="flex items-center justify-center gap-3">
                        <input
                          className="p-3 rounded-lg border outline-none"
                          placeholder="Input password"
                          onChange={onChangePassword}
                          value={inputPassword}
                        />
                        <div
                          onClick={() =>
                            handlePassword(item.post_pass, item.id)
                          }
                          className="p-3 bg-blue-100 cursor-pointer rounded-lg font-medium hover:bg-blue-300"
                        >
                          OK
                        </div>
                      </div>
                      <div className="w-full">
                        <p className="font-bold mt-10">{item.username}</p>
                        <p>
                          {`${new Intl.DateTimeFormat('id-ID', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          }).format(new Date(`${item.created_at}`))}`.replace(
                            'pukul',
                            '|'
                          )}{' '}
                          WIB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="my-5 p-2 rounded-lg bg-white shadow-[1px_1px_10px_rgba(0,0,0,0.1)]"
                  key={index}
                >
                  <Link to={`/detail/${item.id}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="flex justify-center items-center m-1 md:m-2 border rounded-lg">
                        <img
                          src={item.pic}
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
                            {item.title.length > 100 ? (
                              <span className="font-bold text-blue-300">
                                ...
                              </span>
                            ) : (
                              ''
                            )}
                          </h1>
                          <div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.article.slice(0, 100),
                              }}
                            ></div>
                            {item.article.length > 100 ? (
                              <span className="font-bold text-blue-300">
                                Read more
                              </span>
                            ) : (
                              ''
                            )}
                          </div>
                          <p className="font-bold mt-10">{item.username}</p>
                          <p>
                            {`${new Intl.DateTimeFormat('id-ID', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }).format(new Date(`${item.created_at}`))}`.replace(
                              'pukul',
                              '|'
                            )}{' '}
                            WIB
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
            <div className="my-5 text-center font-bold">
              <button
                className="rounded p-2 text-blue-100 hover:text-blue-300 border-0 me-3 text-3xl"
                onClick={() => goToPage(page - 1)}
              >
                <FontAwesomeIcon icon={faCircleLeft} />
              </button>
              {getPost?.pages?.pageNow} From {getPost?.pages?.totalPage}
              <button
                className="rounded p-2 text-blue-100 hover:text-blue-300 border-0 ms-3 text-3xl"
                onClick={() => goToPage(page + 1)}
              >
                <FontAwesomeIcon icon={faCircleRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <ParticleComponent /> */}
    </section>
  );
}