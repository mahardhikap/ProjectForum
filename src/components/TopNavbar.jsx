import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
export function TopNavbar() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center justify-between font-bold mb-2">
      <div className="flex flex-row gap-5">
        <div
          onClick={() => {
            navigate('/blog');
          }}
          className="cursor-pointer"
        >
          BLOG
        </div>
      </div>
      <Link
        to={-1}
        className="no-underline text-red-900 hover:text-red-500 cursor-pointer text-3xl"
      >
        <FontAwesomeIcon icon={faRectangleXmark} />
      </Link>
    </div>
  );
}
