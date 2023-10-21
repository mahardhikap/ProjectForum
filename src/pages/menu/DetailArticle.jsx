import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetailArticle } from '../../redux/action/menu';

export function DetailArticle() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: getArticle } = useSelector((state) => state.getDetailArticle);

  useEffect(() => {
    dispatch(getDetailArticle(id));
  }, []);
  return (
    <section className="w-9/12 container mx-auto my-10">
      <h1 className="text-3xl text-center font-bold">{getArticle.title}</h1>
      <div className="flex justify-center items-center mt-10">
        <img
          src="https://i.ibb.co/M2JSRmW/noimage.png"
          className="w-[400px] h-[250px] object-cover	"
        />
      </div>
      <div className="mt-5 mb-10 text-center">
        {getArticle.created_at}. Author: {getArticle.username}
      </div>
      <p className="text-justify">{getArticle.article}</p>
    </section>
  );
}
