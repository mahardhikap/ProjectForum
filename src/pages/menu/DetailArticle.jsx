import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getDetailArticle } from '../../redux/action/menu';
import { compare } from 'bcryptjs';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function DetailArticle() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: getArticle } = useSelector((state) => state.getDetailArticle);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  useEffect(() => {
    dispatch(getDetailArticle(id));
    window.scrollTo(0,0)
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
    <section>
      <div className="w-11/12 lg:w-3/5 container mx-auto">
        <div className="shadow-[1px_1px_10px_rgba(0,0,0,0.1)] p-2 rounded-xl bg-white my-5">
          <div className="flex justify-end pb-5 ">
            <Link
              to={-1}
              className="no-underline text-red-900 hover:text-red-500 cursor-pointer text-3xl"
            >
              <FontAwesomeIcon icon={faRectangleXmark} />
            </Link>
          </div>
          <h1 className="text-3xl text-center font-bold">
            {getArticle?.title}
          </h1>
          <div className="flex justify-center items-center mt-5">
            <img
              src={
                isPasswordMatch || getArticle?.post_pass === 'undefined'
                  ? getArticle?.pic
                  : 'https://i.ibb.co/RDfWY1Y/pic-removebg-preview.png'
              }
              className="w-[400px] h-[250px] object-cover rounded-lg border"
              alt="Article Cover"
            />
          </div>
          <div className='mt-3 mb-14'>
            <div className="flex flex-row items-center justify-center gap-3 font-bold">
              <img
                src={getArticle?.photo}
                alt="photo-profile"
                className="rounded-full max-w-[30px] max-h-[30px]"
              />{' '}
              {getArticle?.username}
            </div>
            <div className="text-center">
              {getArticle
                ? new Intl.DateTimeFormat('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                    .format(new Date(getArticle.created_at))
                    .replace('pukul', '|')
                : null}{' '}
              WIB
            </div>
          </div>
          <div>
            {isPasswordMatch || getArticle?.post_pass === 'undefined' ? (
              <div
                dangerouslySetInnerHTML={{ __html: getArticle?.article }}
              ></div>
            ) : (
              'Password does not match.'
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
