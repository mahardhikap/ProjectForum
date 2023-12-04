import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { editArticle, cleanEditArticle, getDetailArticle } from '../../redux/action/menu';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MenuDashboard } from '../../components/MenuDashboard';

export function EditArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editorContent, setEditorContent] = useState('');
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
    formData.append('article', editorContent);
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

  return (
    <section className='bg-gray-50 p-1'>
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
                    data={inputArticle.article}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setEditorContent(data)
                        console.log( { event, editor, data } );
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