import React, {useState, useEffect} from 'react';
import { cleanLogin } from '../../redux/action/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { editArticle, cleanEditArticle, getDetailArticle } from '../../redux/action/menu';

export function EditArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [inputArticle, setInputArticle] = useState({
    title:'',
    article:'',
    post_pass:null,
    pic:'',
  })
  const { data:dataArticle } = useSelector(state => state.getDetailArticle);
  const { data, isError, isLoading} = useSelector(state => state.editArticle)

  const postEditArticle = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('title', inputArticle.title);
    formData.append('article', inputArticle.article);
    if (inputArticle.post_pass !== undefined) {
        formData.append('post_pass', inputArticle.post_pass);
    }
    formData.append('pic', inputArticle.pic);

    if (image) {
      formData.append('pic', image);
    } else if (inputArticle.pic) {
      formData.append('pic', inputArticle.pic);
    }
    dispatch(editArticle(id, formData));
  };

    const onChangeInput = (e) => {
    setInputArticle({
      ...inputArticle,
      [e.target.name]: e.target.name === "post_pass" && e.target.value === "" ? undefined : e.target.value,
    });
  };

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
    if (e.target.files[0]) {
      setInputArticle({
        ...inputArticle,
        pic: URL.createObjectURL(e.target.files[0]),
      });
    } else if (dataArticle && dataArticle.pic) {
      setInputArticle({
        ...inputArticle,
        pic: dataArticle?.pic,
      });
    }
  };

  useEffect(() => {
    dispatch(getDetailArticle(id));
  }, []);

  useEffect(() => {
    if (dataArticle) {
      setInputArticle({
        title: dataArticle?.title || '',
        article: dataArticle?.article || '',
        pic: dataArticle?.pic || '',
      });
    }
  }, [dataArticle]);

  useEffect(() => {
    if (data) {
      Swal.fire({
        icon: 'success',
        title: 'Update article success!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate('/dashboard');
        dispatch(cleanEditArticle());
      });
    } else if (isError) {
      Swal.fire({
        icon: 'error',
        title: 'Update article failed!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => dispatch(cleanEditArticle()));
    }
  }, [data, isError]);

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
              <div
                className="font-medium my-2 bg-blue-500 rounded-md px-2 py-2 my-2 text-white"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </div>
              <div className="font-medium my-2 bg-blue-900 rounded-md px-2 py-2 my-2 text-white">
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
              <div className="font-bold">EDIT ARTICLE</div>
            </div>
            <form action="" onSubmit={postEditArticle}>
              <label
                htmlFor="file"
                style={{
                  backgroundImage: `url(${inputArticle.pic})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  height: '300px',
                }}
                className="w-full flex justify-center items-center rounded border-2 my-5"
              >
                Add Image
              </label>
              <input
                className="hidden"
                type="file"
                onChange={onChangeImage}
                name="pic"
                id="file"
              />
              <div className="my-5">
                <label htmlFor="" className="font-medium">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-2 p-3"
                  placeholder="Judul"
                  onChange={onChangeInput}
                  value={inputArticle.title}
                  name='title'
                />
              </div>
              <div className="my-5">
                <label htmlFor="" className="font-medium">
                  Article
                </label>
                <textarea
                  id="article"
                  cols="30"
                  rows="10"
                  className="w-full border-2 rounded-lg p-3"
                  placeholder="Artikelmu"
                  onChange={onChangeInput}
                  value={inputArticle.article}
                  name='article'
                ></textarea>
              </div>
              <div className="my-5">
                <label htmlFor="" className="font-medium">
                  Password
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-2 p-3"
                  placeholder="Password kontenmu atau kosongi (default)"
                  onChange={onChangeInput}
                  value={inputArticle.post_pass}
                  name='post_pass'
                />
              </div>
              <div className='my-10'>
                <button className="w-full rounded-lg py-3 bg-blue-500 font-bold text-white">
                  Post Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}