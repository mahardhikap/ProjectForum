import { Navigate, Route, Routes, BrowserRouter} from 'react-router-dom';
import AuthChecker from '../components/AuthCheck';
import { LoginUser } from '../pages/auth/LoginUser';
import {Dashboard} from '../pages/menu/Dashboard'
import { DetailArticle } from '../pages/menu/DetailArticle';
import { AddArticle } from '../pages/menu/AddArticle';
import { EditArticle } from '../pages/menu/EditArticle';
import { EditProfile } from '../pages/menu/EditProfile';
import { Blog } from '../pages/menu/Blog';
import { AddBiodata } from '../pages/menu/AddBiodata';
import { DetailBiodata } from '../pages/menu/DetailBiodata';
import { AddPorto } from '../pages/menu/AddPorto';
import { ListPorto } from '../pages/menu/ListPorto';
import { EditPorto } from '../pages/menu/EditPorto';
import { DetailPorto } from '../pages/menu/DetailPorto';
import { Home } from '../pages/menu/Home';
import NotFound from '../components/NotFound';

function App() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace={true} />} />
            <Route path="/login" element={<LoginUser />}/>
            <Route path="/dashboard" element={<AuthChecker><Dashboard /></AuthChecker>}/>
            <Route path="/detail/:id" element={<DetailArticle />}/>
            <Route path="/add" element={<AuthChecker><AddArticle /></AuthChecker>}/>
            <Route path="/edit/:id" element={<AuthChecker><EditArticle /></AuthChecker>}/>
            <Route path="/profile/:id" element={<AuthChecker><EditProfile /></AuthChecker>}/>
            <Route path="/blog" element={<Blog />}/>
            <Route path="/updatebiodata" element={<AuthChecker><AddBiodata /></AuthChecker>}/>
            <Route path="/biodata" element={<DetailBiodata />}/>
            <Route path="/addporto" element={<AuthChecker><AddPorto /></AuthChecker>}/>
            <Route path="/listporto" element={<AuthChecker><ListPorto /></AuthChecker>}/>
            <Route path="/editporto/:id" element={<AuthChecker><EditPorto /></AuthChecker>}/>
            <Route path="/detailporto/:id" element={<DetailPorto />}/>
            <Route path="/home" element={<Home />}/>
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