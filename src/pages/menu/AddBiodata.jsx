import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuDashboard } from "../../components/MenuDashboard"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { addBiodata, cleanAddBiodata, getBiodata } from '../../redux/action/menu';
import Swal from 'sweetalert2';

export function AddBiodata(){
    const dispatch = useDispatch()
    
    const [image, setImage] = useState(null);
    const [editorContent, setEditorContent] = useState('');
    const [inputBiodata, setInputBiodata] = useState({
        fullname:'',
        about:'',
        skill:'',
        photo:'',
        twitter:'',
        facebook:'',
        instagram:'',
        linkedin:'',
        other:''
    })

    const {data, isError} = useSelector(state =>state.addBiodata)
    const {data:dataBio} = useSelector(state =>state.getBiodata)

  const postBiodata = async (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append('fullname', inputBiodata.fullname);
    bodyFormData.append('about', editorContent);
    bodyFormData.append('skill', inputBiodata.skill);
    bodyFormData.append('photo', image);
    bodyFormData.append('twitter', inputBiodata.twitter);
    bodyFormData.append('facebook', inputBiodata.facebook);
    bodyFormData.append('instagram', inputBiodata.instagram);
    bodyFormData.append('linkedin', inputBiodata.linkedin);
    bodyFormData.append('other', inputBiodata.other);

    dispatch(addBiodata(bodyFormData));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputBiodata({ ...inputBiodata, [name]: value });
  };

  const onChangePhoto = (e) => {
    setImage(e.target.files[0]);
    e.target.files[0] &&
      setInputBiodata({
        ...inputBiodata,
        photo: URL.createObjectURL(e.target.files[0]),
      });
  };

  useEffect(()=>{
    dispatch(getBiodata())
  },[])

  useEffect(() => {
    if (data) {
      Swal.fire({
        icon: 'success',
        title: 'Post biodata success!',
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        dispatch(cleanAddBiodata())
      });
    } else if (isError) {
      Swal.fire(
        'Post biodata failed!',
        'image should png/jpg (no more than 5 MB) or you not allowed to edit this page!',
        'error'
      ).then(() => dispatch(cleanAddBiodata()));
    }
  }, [data, isError]);
    
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
                <div className="font-bold">UPDATE BIODATA</div>
              </div>
              <form action="" onSubmit={postBiodata}>
                <div className="flex justify-center items-center">
                <label
                  htmlFor="file"
                  style={{
                    backgroundImage: `url(${image && inputBiodata.photo || dataBio?.biodata?.photo})`,
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
                    Fullname
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-2 p-3"
                    placeholder="Your fullname"
                    onChange={onChangeInput}
                    value={inputBiodata.fullname || dataBio?.biodata?.fullname}
                    name='fullname'
                  />
                </div>
                <div className="my-5">
                  <label htmlFor="" className="font-medium">
                    About
                  </label>
                  <CKEditor
                    editor={ ClassicEditor }
                    data={editorContent || dataBio?.biodata?.about}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setEditorContent(data)
                    } }
                    config={{
                      toolbar: {
                        items: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "link",
                          "bulletedList",
                          "numberedList",
                          "blockQuote",
                          "insertTable",
                          "|",
                          "undo",
                          "redo"
                        ],
                      },
                    }}
                />
                </div>
                <div className="my-5">
                  <label htmlFor="" className="font-medium">
                    Skill
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-2 p-3"
                    placeholder="Your present skill"
                    onChange={onChangeInput}
                    value={inputBiodata.skill || dataBio?.biodata?.skill}
                    name='skill'
                  />
                </div>
                <div className="my-5">
                  <label htmlFor="" className="font-medium">
                    Twitter
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-2 p-3"
                    placeholder="Your twitter account"
                    onChange={onChangeInput}
                    value={inputBiodata.twitter || dataBio?.biodata?.twitter}
                    name='twitter'
                  />
                </div>
                <div className="my-5">
                  <label htmlFor="" className="font-medium">
                    Facebook
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-2 p-3"
                    placeholder="Your facebook account"
                    onChange={onChangeInput}
                    value={inputBiodata.facebook || dataBio?.biodata?.facebook}
                    name='facebook'
                  />
                </div>
                <div className="my-5">
                  <label htmlFor="" className="font-medium">
                    Instagram
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-2 p-3"
                    placeholder="Your instagram account"
                    onChange={onChangeInput}
                    value={inputBiodata.instagram || dataBio?.biodata?.instagram}
                    name='instagram'
                  />
                </div>
                <div className="my-5">
                  <label htmlFor="" className="font-medium">
                    Linkedin
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-2 p-3"
                    placeholder="Your linkedin account"
                    onChange={onChangeInput}
                    value={inputBiodata.linkedin || dataBio?.biodata?.linkedin}
                    name='linkedin'
                  />
                </div>
                <div className="my-5">
                  <label htmlFor="" className="font-medium">
                    Other account
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-2 p-3"
                    placeholder="Your other account"
                    onChange={onChangeInput}
                    value={inputBiodata.other || dataBio?.biodata?.other}
                    name='other'
                  />
                </div>
                <div className='my-5'>
                  <button type="submit" className="w-full rounded-lg py-3 bg-blue-500 font-bold text-white">
                    Update Biodata
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
}