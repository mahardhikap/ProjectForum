import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByToken, editProfile, cleanEditProfile } from "../../redux/action/user";
import Swal from "sweetalert2";
import { MenuDashboard } from "../../components/MenuDashboard";


export function EditProfile() {
const navigate = useNavigate()
const dispatch = useDispatch()
const [photo, setPhoto] = useState(null);
const {data:userData} = useSelector(state => state.getUserByToken)
const {data:editData, isError:editError, isLoading:editLoading} = useSelector(state => state.editProfile)
const [inputUser, setInputUser] = useState({
    username:'',
    password:'',
    photo:''
})

const updateProfile = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('username', inputUser.username);
    if (inputUser.password) {
      formData.append('password', inputUser.password);
    } 
    if (photo) {
      formData.append('photo', photo);
    } else if (inputUser.photo) {
      formData.append('photo', inputUser.photo);
    }
    dispatch(editProfile(formData));
  };

  console.log(inputUser)

  const onChangeInput = (e) => {
    setInputUser({ ...inputUser, [e.target.name]: e.target.value });
  };

  const onChangePhoto = (e) => {
    setPhoto(e.target.files[0]);
    if (e.target.files[0]) {
      setInputUser({
        ...inputUser,
        photo: URL.createObjectURL(e.target.files[0]),
      });
    } else if (userData && userData.photo) {
      setInputUser({
        ...inputUser,
        photo: userData.photo,
      });
    }
  };

useEffect(()=>{
    dispatch(getUserByToken())
}, [])

useEffect(() => {
    if (userData) {
      setInputUser({
        username: userData?.username || '',
        photo: userData?.photo || '',
      });
    }
  }, [userData]);

  useEffect(() => {
    if (editData) {
      Swal.fire('Profile updated!', '', 'success').then(() => {
        localStorage.setItem('photo_', editData?.photo);
        localStorage.setItem('token_', editData?.token);
        localStorage.setItem('name_', editData?.username);
        window.location.reload();
      });
    } else if (editError) {
      Swal.fire(
        'Update profile failed, check image size no more than 5 MB and must PNG/JPG!',
        '',
        'error'
      ).then(() => dispatch(cleanEditProfile()));
    }
  }, [editData, editError]);

  return (
    <section>
      <div className="container w-11/12 lg:w-10/12 mx-auto my-5">
        <h3 className="p-0 m-0">
          Hello,{' '}
          <span className="font-medium">{localStorage.getItem('name_')}</span>!
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
          <div className="col-span-1 p-0 md:pe-2">
            <MenuDashboard/>
          </div>
          <div className="col-span-2">
            <div className="bg-gray-200 p-2 rounded-lg mt-5 md:mt-0">
              <div className="font-bold">EDIT PROFILE</div>
            </div>
            <form action="" onSubmit={updateProfile}>
              <div className="flex justify-center items-center">
              <label
                htmlFor="file"
                style={{
                  backgroundImage: `url(${inputUser.photo})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  height: '250px',
                  width:'250px',
                  borderRadius:'75%'
                }}
                className="w-full flex justify-center items-center rounded border-2 my-5"
              >
                {/* Add Image */}
              </label>
              </div>
              <input
                className="hidden"
                type="file"
                onChange={onChangePhoto}
                name="photo"
                id="file"
              />
              <div className="my-5">
                <label htmlFor="" className="font-medium">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-2 p-3"
                  placeholder="Username kamu"
                  onChange={onChangeInput}
                  value={inputUser.username}
                  name='username'
                />
              </div>
              <div className="my-5">
                <label htmlFor="" className="font-medium">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full rounded-lg border-2 p-3"
                  placeholder="Ganti password atau kosongi (default)"
                  onChange={onChangeInput}
                  value={inputUser.password}
                  name='password'
                />
              </div>
              <div className='my-5'>
                <button type="submit" className="w-full rounded-lg py-3 bg-blue-500 font-bold text-white">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
