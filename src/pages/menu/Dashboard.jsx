import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPost, deleteArticle } from '../../redux/action/menu';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { compare } from 'bcryptjs';
import { MenuDashboard } from '../../components/MenuDashboard';

export function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortby, setSortby] = useState('created_at');
  const [sort, setSort] = useState('DESC');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data: getPost } = useSelector((state) => state.getUserPost);
  const [inputPassword, setInputPassword] = useState('');

  const onChangePassword = (e) => {
    setInputPassword(e.target.value);
  };

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

  const handleDeletePost = (id) => {
    Swal.fire({
      title: 'Do you want to delete this post?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Cancel',
      denyButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.close();
      } else if (result.isDenied) {
        dispatch(deleteArticle(id)).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Delete success!',
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(getUserPost(sortby, sort, page, limit));
        });
      }
    });
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= getPost?.pages?.totalPage) {
      setPage(pageNumber);
    }
  };

  useEffect(() => {
    dispatch(getUserPost(sortby, sort, page, limit));
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <section>
      <div className="container w-10/12 mx-auto my-10">
        <h3 className="p-0 m-0">
          Hello,{' '}
          <span className="font-medium">{localStorage.getItem('name_')}</span>!
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
          <div className="col-span-1 p-0 md:pe-5">
            <MenuDashboard />
          </div>
          <div className="col-span-2">
            <div className="bg-blue-100 p-2 rounded-lg mt-10 md:mt-0">
              <div className="font-bold">DASHBOARD</div>
            </div>
            {getPost?.rows?.map((item, index) => {
              return item.post_pass !== 'undefined' ? (
                <div
                  className="my-5 p-10 rounded-lg shadow-[1px_1px_10px_rgba(0,0,0,0.1)]"
                  key={index}
                >
                  <div className="flex flex-row items-center gap-5">
                    <div
                      className="text-green-400 font-extrabold cursor-pointer"
                      onClick={() => navigate(`/edit/${item.id}`)}
                    >
                      Edit
                    </div>
                    <div
                      className="text-red-400 font-extrabold cursor-pointer"
                      onClick={() => handleDeletePost(item.id)}
                    >
                      Delete
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex justify-center items-center col-span-1 border rounded-lg m-2">
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
                    <div className="col-span-1 flex flex-col justify-center items-center m-2">
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
                          className="p-3 bg-green-400 cursor-pointer rounded-lg font-medium"
                        >
                          OK
                        </div>
                      </div>
                      <div>
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
                  className="my-5 p-10 rounded-lg shadow-[1px_1px_10px_rgba(0,0,0,0.1)]"
                  key={index}
                >
                  <div className="flex flex-row items-center gap-5">
                    <div
                      className="text-green-400 font-extrabold cursor-pointer"
                      onClick={() => navigate(`/edit/${item.id}`)}
                    >
                      Edit
                    </div>
                    <div
                      className="text-red-400 font-extrabold cursor-pointer"
                      onClick={() => handleDeletePost(item.id)}
                    >
                      Delete
                    </div>
                  </div>
                  <Link to={`/detail/${item.id}`}>
                    <div className="grid grid-cols-2">
                      <div className="flex justify-center items-center m-2 border rounded-lg">
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
                      <div className="col-span-1 flex flex-col justify-center items-center m-2">
                        <div>
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
                className="rounded p-2 text-black border-0 bg-blue-200 me-3 font-bold"
                onClick={() => goToPage(page - 1)}
              >
                Prev
              </button>
              {getPost?.pages?.pageNow} From {getPost?.pages?.totalPage}
              <button
                className="rounded p-2 text-black border-0 bg-blue-200 ms-3 font-bolf"
                onClick={() => goToPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
