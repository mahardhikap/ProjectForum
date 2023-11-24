import { useNavigate } from 'react-router-dom';
export function TopNavbar() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center justify-between font-bold mb-2">
      <div className='flex flex-row gap-5'>
        <div
          onClick={() => {
            navigate('/blog');
          }}
          className="cursor-pointer"
        >
          BLOG
        </div>
        <div
          onClick={() => {
            navigate('/about');
          }}
          className="cursor-pointer"
        >
          ABOUT
        </div>
      </div>
      <div onClick={() => navigate('/login')} className="cursor-pointer">
        LOGIN
      </div>
    </div>
  );
}
