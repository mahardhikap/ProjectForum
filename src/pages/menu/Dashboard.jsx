import React, { useEffect, useState } from 'react';
import { getUser } from '../../redux/action/user';
import { useDispatch, useSelector } from 'react-redux';
import { cleanLogin } from '../../redux/action/user';
import { getUserPost, deleteArticle } from '../../redux/action/menu';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { compare } from 'bcryptjs';

export function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortby, setSortby] = useState('created_at');
  const [sort, setSort] = useState('ASC');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data: getPost } = useSelector((state) => state.getUserPost);
  const [inputPassword, setInputPassword] = useState('');

  const handleLogOut = () => {
    Swal.fire({
      title: 'Do you want to logout?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#50C878',
      cancelButtonColor: '#d33',
      confirmButtonText: 'No, cancel!',
      denyButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isDenied) {
        Swal.fire('Logout success!', '', 'success').then(() => {
          localStorage.clear();
          dispatch(cleanLogin());
          navigate('/login');
        });
      }
    });
  };

  const onChangePassword = (e) => {
    setInputPassword(e.target.value);
  };

  const handlePassword = async (password, id) => {
    const storedHash = password;
    const isMatch = await compare(inputPassword, storedHash);

    if (isMatch) {
      localStorage.setItem('securearticle_', inputPassword)
      navigate(`/detail/${id}`);
    } else {
      Swal.fire('Password is incorrect!', '', 'error');
    }
  };

  const handleDeletePost = (id) => {
    Swal.fire({
      title: 'Do you want to delete this post?',
      showDenyButton: true,
      confirmButtonText: 'Cancel',
      denyButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.close()
      } else if (result.isDenied) {
        dispatch(deleteArticle(id)).then(()=>{
          Swal.fire({
            icon: 'success',
            title: 'Delete success!',
            showConfirmButton: false,
            timer: 1500
          })
          dispatch(getUserPost(sortby, sort, page, limit));
        })
      }
    })
  }

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
        <h1 className="p-0 m-0">
          Hello,{' '}
          <span className="font-medium">{localStorage.getItem('name_')}</span>!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
          <div className="col-span-1 p-0 md:pe-5">
            <div className="bg-white shadow-[2px_2px_10px_rgba(0,0,0,0.2)] p-2 rounded-lg sticky top-5 cursor-pointer">
              <div className="flex items-center justify-center">
                <img
                  src={localStorage.getItem('photo_')}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                  }}
                  className="rounded-full border-2 border-gray-300"
                />
              </div>
              <div className="font-bold">MENU</div>
              <div className="font-medium my-2 bg-blue-500 rounded-md px-2 py-2 my-2 text-white">
                Post Article
              </div>
              <div className="font-medium my-2 bg-blue-500 rounded-md px-2 py-2 my-2 text-white">
                Edit Profile
              </div>
              <div className="font-medium my-2 bg-blue-500 rounded-md px-2 py-2 my-2 text-white">
                Change Password
              </div>
              <div
                className="font-medium my-2 bg-red-500 rounded-md px-2 py-2 my-2 text-white"
                onClick={() => handleLogOut()}
              >
                Logout
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-blue-100 p-2 rounded-lg mt-10 md:mt-0">
              <div className="font-bold">POST</div>
            </div>
            {getPost?.rows?.map((item) => {
              return item.post_pass !== 'undefined' ? (
                <div className="my-5 p-2 bg-gray-100 rounded-lg">
                  <div className="flex flex-row items-center gap-5">
                    <div className="text-green-400 font-extrabold">Edit</div>
                    <div className="text-red-400 font-extrabold" onClick={()=>handleDeletePost(item.id)}>Delete</div>
                  </div>
                  <div className="flex justify-center items-center">
                    <img
                      src={'https://i.ibb.co/RDfWY1Y/pic-removebg-preview.png'}
                      style={{
                        height: '200px',
                        objectFit: 'cover',
                        width: '200px',
                      }}
                      className="rounded-lg"
                    />
                  </div>
                  <h1 className="font-bold border-b-2 py-1 text-center mb-3">
                    {item.title}
                  </h1>
                  <div className="flex items-center justify-center gap-3">
                    <input
                      className="p-3 rounded-lg"
                      placeholder="Input password"
                      onChange={onChangePassword}
                      value={inputPassword}
                    />
                    <div onClick={() => handlePassword(item.post_pass, item.id)} className='p-3 bg-green-400 cursor-pointer rounded-lg font-medium'>OK</div>
                  </div>
                </div>
              ) : (
                <div className="my-5 p-2 bg-gray-100 rounded-lg">
                  <div className="flex flex-row items-center gap-5">
                    <div className="text-green-400 font-extrabold">Edit</div>
                    <div className="text-red-400 font-extrabold" onClick={()=>handleDeletePost(item.id)}>Delete</div>
                  </div>
                  <Link to={`/detail/${item.id}`}>
                    <div className="flex justify-center items-center">
                      <img
                        src={item.pic}
                        style={{
                          height: '150px',
                          objectFit: 'cover',
                          width: '250px',
                        }}
                        className="rounded-lg border-2 border-gray-300"
                      />
                    </div>
                    <h1 className="font-bold border-b-2 py-1 text-center mb-3">
                      {item.title}
                    </h1>
                    <p>
                      {item.article.slice(0, 200)}{' '}
                      {item.article.length > 200 ? (
                        <span className="font-bold text-blue-300">
                          ...READ MORE
                        </span>
                      ) : (
                        ''
                      )}
                    </p>
                    <p>{item.username}</p>
                    <p>{item.created_at}</p>
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
