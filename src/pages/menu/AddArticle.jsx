import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addArticle, cleanAddArticle } from '../../redux/action/menu';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MenuDashboard } from '../../components/MenuDashboard';


export function AddArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [inputArticle, setInputArticle] = useState({
    title:'',
    article:'',
    post_pass:'',
    pic:'',
  })
  const {data, isError} = useSelector(state =>state.addArticle)

  const postArticle = async (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append('title', inputArticle.title);
    bodyFormData.append('article', editorContent);
    bodyFormData.append('post_pass', inputArticle.post_pass);
    bodyFormData.append('pic', image);

    dispatch(addArticle(bodyFormData));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputArticle({ ...inputArticle, [name]: value });
  };

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
    e.target.files[0] &&
      setInputArticle({
        ...inputArticle,
        pic: URL.createObjectURL(e.target.files[0]),
      });
  };

  useEffect(() => {
    if (data) {
      Swal.fire({
        icon: 'success',
        title: 'Post article success!',
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        navigate('/dashboard');
        dispatch(cleanAddArticle())
      });
    } else if (isError) {
      Swal.fire(
        'Post article failed, check size image not more than 5 MB and format should PNG/JPG!',
        '',
        'error'
      ).then(() => dispatch(cleanAddArticle()));
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
              <div className="font-bold">POST ARTICLE</div>
            </div>
            <form action="" onSubmit={postArticle}>
              <label
                htmlFor="file"
                style={{
                  backgroundImage: `url(${image && inputArticle.pic || 'https://res.cloudinary.com/dxao06apr/image/upload/v1701688202/file-upload/noimage_o1wkux.png'})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  height: '300px',
                }}
                className="w-full flex justify-center items-center rounded border-2 my-5"
              >
                {/* Add Image */}
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
                          'mediaEmbed',
                          "videoInsert",
                          "undo",
                          "redo"
                        ],
                      },
                    }}
                />
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
              <div className='my-5'>
                <button type='submit' className="w-full rounded-lg py-3 bg-blue-500 font-bold text-white">
                  Post Article
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
