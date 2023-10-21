import { Navigate, Route, Routes, BrowserRouter} from 'react-router-dom';
import AuthChecker from '../components/AuthCheck';
import { LoginUser } from '../pages/auth/LoginUser';
import {Dashboard} from '../pages/menu/Dashboard'
import { DetailArticle } from '../pages/menu/DetailArticle';
import { AddArticle } from '../pages/menu/AddArticle';
import { EditArticle } from '../pages/menu/EditArticle';

function App() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace={true} />} />
            <Route path="/login" element={<LoginUser />}/>
            <Route path="/dashboard" element={<AuthChecker><Dashboard /></AuthChecker>}/>
            <Route path="/detail/:id" element={<DetailArticle />}/>
            <Route path="/add" element={<AuthChecker><AddArticle /></AuthChecker>}/>
            <Route path="/edit/:id" element={<AuthChecker><EditArticle /></AuthChecker>}/>
            {/* <Route path="/bookmarked" element={<AuthChecker><Bookmarked /></AuthChecker>} />
            <Route path="/liked" element={<AuthChecker><Liked /></AuthChecker>} />
            <Route path="/update-menu/:id" element={<AuthChecker><UpdateMenu /></AuthChecker>} /> */}
          </Routes>
        </BrowserRouter>
      </>
    );
  }
  
  export default App;