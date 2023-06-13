import './App.css';

import Main from './page/main';
import Signin from './page/SignIn';
import { Image } from './page/image';
import Register from './page/Register';
import { Store } from './page/catlist';
import { FavoritesProvider } from './context/FavoritesContext';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <FavoritesProvider>
      <div className="App">
        <BrowserRouter>
          <nav>
            <Link to="">Main</Link>
            <br></br>
            <Link to="/Image_upload">Image upload</Link>
            <br></br>

          </nav>
          <Routes>
            <Route element={<Main />} path="" />
            {/* add a route for the registration form */}
            <Route element={<Signin />} path="/login" />
            <Route element={<Image />} path="/Image_upload" />
            <Route element={<Register />} path="/register" />
            <Route element={<Store />} path="/catlist" />
          </Routes>
        </BrowserRouter>
      </div>
    </FavoritesProvider>
  );
};

export default App;