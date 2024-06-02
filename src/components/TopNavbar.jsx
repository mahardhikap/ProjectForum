import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
export function TopNavbar() {
  return (
    <div className="flex flex-row items-center justify-end font-bold mb-2">
      <Link
        to={-1}
        className="no-underline text-red-900 hover:text-red-500 cursor-pointer text-3xl"
      >
        <FontAwesomeIcon icon={faRectangleXmark} />
      </Link>
    </div>
  );
}
