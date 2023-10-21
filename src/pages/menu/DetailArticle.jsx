import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetailArticle } from '../../redux/action/menu';
import { compare } from 'bcryptjs';

export function DetailArticle() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: getArticle } = useSelector((state) => state.getDetailArticle);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  useEffect(() => {
    dispatch(getDetailArticle(id));
  }, [id]);

  useEffect(() => {
    const checkPassword = async () => {
      const passwordFromLocalStorage = localStorage.getItem('securearticle_');
      if (passwordFromLocalStorage && getArticle) {
        const result = await compare(
          passwordFromLocalStorage,
          getArticle?.post_pass
        );
        setIsPasswordMatch(result);
      }
    };
    if (getArticle) {
      checkPassword();
    }
  }, [getArticle]);

  return (
    <section className="w-9/12 container mx-auto my-10">
      <h1 className="text-3xl text-center font-bold">{getArticle?.title}</h1>
      <div className="flex justify-center items-center mt-10">
        <img
          src={getArticle?.pic}
          className="w-[400px] h-[250px] object-cover	"
          alt="Article Cover"
        />
      </div>
      <div className="mt-5 mb-10 text-center">
        {getArticle?.created_at}. Author: {getArticle?.username}
      </div>
      <p className="text-justify">
        {isPasswordMatch || getArticle?.post_pass === 'undefined' ? getArticle?.article : 'Password does not match.'}
      </p>
    </section>
  );
}