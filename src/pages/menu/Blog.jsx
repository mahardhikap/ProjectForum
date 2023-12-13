import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPost } from '../../redux/action/menu';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { compare } from 'bcryptjs';
import { faCircleRight, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchBox } from '../../components/SearchBox';
import { ErrorGetData } from '../../components/ErrorGetData';
import { TopNavbar } from '../../components/TopNavbar';
import AOS from 'aos';
import 'aos/dist/aos.css';

export function Blog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchby, setSearchby] = useState('title');
  const [search, setSearch] = useState('');
  const [sortby, setSortby] = useState('created_at');
  const [sort, setSort] = useState('DESC');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [inputPassword, setInputPassword] = useState('');
  const { data: getPost, isError: getPostError } = useSelector(
    (state) => state.getAllPost
  );

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

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const searchToggle = () => {
    dispatch(getAllPost(searchby, search, sortby, sort, page, limit));
    setSearch('');
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
    AOS.init();
    dispatch(getAllPost(searchby, search, sortby, sort, page, limit));
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <section>
      <div className="container mx-auto w-11/12 lg:w-3/5">
        <div className="mt-5 rounded-xl shadow-[1px_1px_10px_rgba(0,0,0,0.1)] p-3 bg-white">
          <div onClick={() => searchToggle()}>
            <TopNavbar />
          </div>
          <SearchBox
            onchanges={onChangeSearch}
            values={search}
            names={'search'}
            clicks={(e) => (e.key === 'Enter' ? searchToggle() : '')}
          />
        </div>
        <div className="mb-5 rounded-xl">
          <div>
            {getPostError ? (
              <ErrorGetData
                errorTitle={'DATA NOT FOUND'}
                errorNote={'Try another search'}
              />
            ) : (
              getPost?.rows?.map((item, index) => {
                return item.post_pass !== 'undefined' ? (
                  <div
                    className="my-2 p-2 rounded-lg shadow-[1px_1px_10px_rgba(0,0,0,0.1)] bg-white"
                    key={index}
                    data-aos="zoom-in"
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
                        <h1 className="font-bold py-1 mb-3">
                          {item.title.slice(0, 30)}
                          {item.title.length > 30 ? (
                            <span className="font-bold">...</span>
                          ) : (
                            ''
                          )}
                        </h1>
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
                        <div className="flex flex-row items-center gap-3 mt-5">
                              <div>
                                <img
                                  src={item.photo}
                                  alt="photo-profile"
                                  className="rounded-full max-w-[30px] max-h-[30px]"
                                />
                              </div>
                              <div className="font-bold">
                                {item.username}
                              </div>
                            </div>
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
                    className="my-2 p-2 rounded-lg shadow-[1px_1px_10px_rgba(0,0,0,0.1)] bg-white"
                    key={index}
                    data-aos="zoom-in"
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
                              {item.title.length > 30 ? (
                                <span className="font-bold">...</span>
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
                                  read more
                                </span>
                              ) : (
                                ''
                              )}
                            </div>
                            <div className="flex flex-row items-center gap-3 mt-5">
                              <div>
                                <img
                                  src={item.photo}
                                  alt="photo-profile"
                                  className="rounded-full max-w-[30px] max-h-[30px]"
                                />
                              </div>
                              <div className="font-bold text-black">
                                {item.username}
                              </div>
                            </div>
                            <p>
                              {`${new Intl.DateTimeFormat('id-ID', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              }).format(
                                new Date(`${item.created_at}`)
                              )}`.replace('pukul', '|')}{' '}
                              WIB
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
            )}
            <div className="my-5 font-bold flex items-center justify-center">
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
    </section>
  );
}
