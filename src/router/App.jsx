import { Navigate, Route, Routes, BrowserRouter} from 'react-router-dom';
import AuthChecker from '../components/AuthCheck';
import { LoginUser } from '../pages/auth/LoginUser';
import {Dashboard} from '../pages/menu/Dashboard'
import { DetailArticle } from '../pages/menu/DetailArticle';
import { AddArticle } from '../pages/menu/AddArticle';
import { EditArticle } from '../pages/menu/EditArticle';
import { EditProfile } from '../pages/menu/EditProfile';
import { Homepage } from '../pages/menu/Homepage';
import NotFound from '../components/NotFound';

function App() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/homepage" replace={true} />} />
            <Route path="/login" element={<LoginUser />}/>
            <Route path="/dashboard" element={<AuthChecker><Dashboard /></AuthChecker>}/>
            <Route path="/detail/:id" element={<DetailArticle />}/>
            <Route path="/add" element={<AuthChecker><AddArticle /></AuthChecker>}/>
            <Route path="/edit/:id" element={<AuthChecker><EditArticle /></AuthChecker>}/>
            <Route path="/profile/:id" element={<AuthChecker><EditProfile /></AuthChecker>}/>
            <Route path="/homepage" element={<Homepage />}/>
            <Route path="*" element={<NotFound/>} />
            {/* <Route path="/bookmarked" element={<AuthChecker><Bookmarked /></AuthChecker>} />
            <Route path="/liked" element={<AuthChecker><Liked /></AuthChecker>} />
            <Route path="/update-menu/:id" element={<AuthChecker><UpdateMenu /></AuthChecker>} /> */}
          </Routes>
        </BrowserRouter>
      </>
    );
  }
  
  export default App;