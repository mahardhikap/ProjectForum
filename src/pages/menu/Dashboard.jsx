import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPost, deleteArticle } from "../../redux/action/menu";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { compare } from "bcryptjs";
import { MenuDashboard } from "../../components/MenuDashboard";
import {
  faTrash,
  faPenToSquare,
  faCircleRight,
  faCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import lock from "../../assets/lock.jpg";

export function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sortby = "created_at";
  const sort = "DESC";
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data: getPost } = useSelector((state) => state.getUserPost);
  const [inputPassword, setInputPassword] = useState("");

  const onChangePassword = (e) => {
    setInputPassword(e.target.value);
  };

  const handlePassword = async (password, id) => {
    const storedHash = password;
    const isMatch = await compare(inputPassword, storedHash);

    if (isMatch) {
      localStorage.setItem("securearticle_", inputPassword);
      navigate(`/detail/${id}`);
    } else {
      Swal.fire("Password is incorrect!", "", "error");
    }
  };

  const handleDeletePost = (id) => {
    Swal.fire({
      title: "Do you want to delete this post?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Cancel",
      denyButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.close();
      } else if (result.isDenied) {
        dispatch(deleteArticle(id)).then(() => {
          Swal.fire({
            icon: "success",
            title: "Delete success!",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <section>
      <div className="container w-11/12 lg:w-10/12 mx-auto my-5">
        <h3 className="p-0 m-0">
          Hello,{" "}
          <span className="font-medium">{localStorage.getItem("name_")}</span>!
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
          <div className="col-span-1 p-0 md:pe-2">
            <MenuDashboard />
          </div>
          <div className="col-span-2">
            <div className="bg-gray-200 p-2 rounded-lg mt-5 md:mt-0">
              <div className="font-bold">DASHBOARD</div>
            </div>
            {getPost?.rows?.map((item, index) => {
              return item.post_pass !== "undefined" ? (
                <div className="my-2 p-2 rounded-lg bg-white" key={index}>
                  <div className="flex flex-row items-center gap-5">
                    <div
                      className="text-green-400 font-extrabold cursor-pointer text-2xl"
                      onClick={() => navigate(`/edit/${item.id}`)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </div>
                    <div
                      className="text-red-400 font-extrabold cursor-pointer text-2xl"
                      onClick={() => handleDeletePost(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex justify-center items-center col-span-1 rounded-lg m-1 md:m-2 p-1">
                      <img
                        src={lock}
                        style={{
                          height: "250px",
                          objectFit: "cover",
                          width: "250px",
                        }}
                        className="rounded-lg border"
                      />
                    </div>
                    <div className="col-span-1 flex flex-col m-1 md:m-2">
                      <h1 className="font-bold py-1 mb-3">
                        {item.title.slice(0, 30)}
                        {item.title.length > 30 ? (
                          <span className="font-bold">...</span>
                        ) : (
                          ""
                        )}
                      </h1>
                      <div className="flex gap-3">
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
                              className="rounded-full w-[30px] h-[30px] border object-cover"
                            />
                          </div>
                          <div className="font-bold text-black">
                            {item.username}
                          </div>
                        </div>
                        <p>
                          {`${new Intl.DateTimeFormat("id-ID", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(`${item.created_at}`))}`.replace(
                            "pukul",
                            "|"
                          )}{" "}
                          WIB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="my-2 p-2 rounded-lg bg-white" key={index}>
                  <div className="flex flex-row items-center gap-5">
                    <div
                      className="text-green-400 font-extrabold cursor-pointer text-2xl"
                      onClick={() => navigate(`/edit/${item.id}`)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </div>
                    <div
                      className="text-red-400 font-extrabold cursor-pointer text-2xl"
                      onClick={() => handleDeletePost(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
                  <Link to={`/detail/${item.id}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="flex justify-center items-center m-1 md:m-2 rounded-lg p-1">
                        <img
                          src={item.pic}
                          style={{
                            height: "250px",
                            objectFit: "cover",
                            width: "250px",
                          }}
                          className="rounded-lg border"
                        />
                      </div>
                      <div className="col-span-1 flex flex-col justify-center items-center m-1 md:m-2">
                        <div className="w-full">
                          <h1 className="font-bold py-1 mb-3">
                            {item.title.slice(0, 30)}
                            {item.title.length > 30 ? (
                              <span className="font-bold">...</span>
                            ) : (
                              ""
                            )}
                          </h1>
                          <div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.article.slice(0, 100) + "...",
                              }}
                            ></div>
                            {item.article.length > 100 ? (
                              <span className="font-medium text-blue-300">
                                read more &rarr;
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="flex flex-row items-center gap-3 mt-5">
                            <div>
                              <img
                                src={item.photo}
                                alt="photo-profile"
                                className="rounded-full w-[30px] h-[30px] border object-cover"
                              />
                            </div>
                            <div className="font-bold text-black">
                              {item.username}
                            </div>
                          </div>
                          <p>
                            {`${new Intl.DateTimeFormat("id-ID", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }).format(new Date(`${item.created_at}`))}`.replace(
                              "pukul",
                              "|"
                            )}{" "}
                            WIB
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
            <div className="my-5 font-bold flex items-center justify-center">
              <button
                className="rounded p-2 text-gray-300 hover:text-gray-400 border-0 me-3 text-3xl"
                onClick={() => goToPage(page - 1)}
              >
                <FontAwesomeIcon icon={faCircleLeft} />
              </button>
              {getPost?.pages?.pageNow} From {getPost?.pages?.totalPage}
              <button
                className="rounded p-2 text-gray-300 hover:text-gray-400 border-0 ms-3 text-3xl"
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
