import {useState, useEffect} from "react";
import { MenuDashboard } from "../../components/MenuDashboard";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch, useSelector } from "react-redux";
import { addPorto, cleanAddPorto } from "../../redux/action/menu";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export function AddPorto(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [image, setImage] = useState(null);
    const [editorContent, setEditorContent] = useState('');
    const [inputPorto, setInputPorto] = useState({
        title:'',
        about:'',
        stack:'',
        photo:''
    })

    const {data, isError} = useSelector(state =>state.addPorto)

  const postPorto = async (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append('title', inputPorto.title);
    bodyFormData.append('about', editorContent);
    bodyFormData.append('stack', inputPorto.stack);
    bodyFormData.append('photo', image);

    dispatch(addPorto(bodyFormData));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputPorto({ ...inputPorto, [name]: value });
  };

  const onChangePhoto = (e) => {
    setImage(e.target.files[0]);
    e.target.files[0] &&
      setInputPorto({
        ...inputPorto,
        photo: URL.createObjectURL(e.target.files[0]),
      });
  };

  useEffect(() => {
    if (data) {
      Swal.fire({
        icon: 'success',
        title: 'Post portfolio success!',
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        dispatch(cleanAddPorto())
        navigate('/listporto')
      });
    } else if (isError) {
      Swal.fire(
        'Post portfolio failed!',
        'image should png/jpg (no more than 5 MB) or you not allowed to edit this page!',
        'error'
      ).then(() => dispatch(cleanAddPorto()));
    }
  }, [data, isError]);
    return(
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
                <div className="font-bold">POST PORTFOLIO</div>
              </div>
              <form action="" onSubmit={postPorto}>
                <div className="flex justify-center items-center">
                <label
                  htmlFor="file"
                  style={{
                    backgroundImage: `url(${image && inputPorto.photo || 'https://res.cloudinary.com/dxao06apr/image/upload/v1701688202/file-upload/noimage_o1wkux.png'})`,
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
                    data={editorContent}
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
                      link: {
                        decorators: {
                          toggleDownloadable: {
                            mode: "manual",
                            label: "Downloadable",
                            attributes: {
                              download: "file",
                            },
                          },
                          openInNewTab: {
                            mode: "manual",
                            label: "Open in a new tab",
                            defaultValue: true,
                            attributes: {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            },
                          },
                        },
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
                    Post Portfolio
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
}