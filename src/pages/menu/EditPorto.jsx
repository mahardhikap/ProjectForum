import React, {useState, useEffect} from "react";
import { MenuDashboard } from "../../components/MenuDashboard";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch, useSelector } from "react-redux";
import { getDetailPorto, editPorto, cleanEditPorto } from "../../redux/action/menu";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export function EditPorto(){
    const navigate = useNavigate();
    const dispatch = useDispatch()
  const [editorContent, setEditorContent] = useState('');
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const {data:dataPorto} = useSelector(state => state.getDetailPorto)
  const {data, isError} = useSelector(state => state.editPorto)
  const [inputPorto, setInputPorto] = useState({
    title:'',
    about:'',
    stack:'',
    photo:''
  })


  const postEditPorto = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('title', inputPorto.title);
    formData.append('about', editorContent);
    formData.append('stack', inputPorto.stack);

    if (image) {
      formData.append('photo', image);
    } else if (inputPorto.photo) {
      formData.append('photo', inputPorto.photo);
    }
    dispatch(editPorto(id, formData));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputPorto({ ...inputPorto, [name]: value });
  };

  const onChangePhoto = (e) => {
    setImage(e.target.files[0]);
    if (e.target.files[0]) {
      setInputPorto({
        ...inputPorto,
        photo: URL.createObjectURL(e.target.files[0]),
      });
    } else if (dataPorto && dataPorto?.photo) {
      setInputPorto({
        ...inputPorto,
        photo: dataPorto?.photo,
      });
    }
  };

  useEffect(() => {
    dispatch(getDetailPorto(id));
  }, []);

  useEffect(() => {
    if (dataPorto) {
      setInputPorto({
        title: dataPorto?.title || '',
        about: dataPorto?.about || '',
        stack: dataPorto?.stack || '',
        photo: dataPorto?.photo || ''
      });
    }
  }, [dataPorto]);

  useEffect(() => {
    if (data) {
      Swal.fire({
        icon: 'success',
        title: 'Update portfolio success!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate('/listporto');
        dispatch(cleanEditPorto());
      });
    } else if (isError) {
      Swal.fire({
        icon: 'error',
        title: 'Update portfolio failed!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => dispatch(cleanEditPorto()));
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
              <div className="bg-blue-100 p-2 rounded-lg mt-5 md:mt-0">
                <div className="font-bold">UPDATE PORTFOLIO</div>
              </div>
              <form action="" onSubmit={postEditPorto}>
                <div className="flex justify-center items-center">
                <label
                  htmlFor="file"
                  style={{
                    backgroundImage: `url(${inputPorto.photo})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '300px',
                  }}
                  className="w-full flex justify-center items-center rounded-lg border-2 my-5"
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
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-2 p-3"
                    placeholder="Project title"
                    onChange={onChangeInput}
                    value={inputPorto.title}
                    name='title'
                  />
                </div>
                <div className="my-5">
                  <label htmlFor="" className="font-medium">
                    About
                  </label>
                  <CKEditor
                    editor={ ClassicEditor }
                    data={inputPorto.about}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                    } }
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
                    Stack
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-2 p-3"
                    placeholder="HTML, CSS ..."
                    onChange={onChangeInput}
                    value={inputPorto.stack}
                    name='stack'
                  />
                </div>
                <div className='my-5'>
                  <button type="submit" className="w-full rounded-lg py-3 bg-blue-500 font-bold text-white">
                    Update Portfolio
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
}