import './App.css';

import Main from './page/main';
import Signin from './page/SignIn';
import Image from './page/image';
import Register from './page/Register';
import catlist from './components/catlist';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link to="">Main</Link>
          <br></br>
          {/* add a navigation link to the registration form */}
          <Link to="/Signin">Sign In</Link>
          <br></br>
          <Link to="/Image_upload">Image upload</Link>
          <br></br>
          <Link to="/catlist">catlist</Link>

        </nav>
        <Routes>
          <Route element={<Main />} path="" />
          {/* add a route for the registration form */}
          <Route element={<Signin />} path="/Signin" />
          <Route element={<Image />} path="/Image_upload" />
          <Route element={<Register />} path="/Register" />
          <Route element={<catlist />} path="/catlist" />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;