import './App.css';

import Main from './page/main';
import Signin from './page/SignIn';
import { Image } from './page/image';
import Register from './page/Register';
import { Store } from './page/catlist';
import UserHomePage from './page/user-main';
import WorkerHomepage from './page/charity-worker-homepage';
import SendDirectMessage from './page/SendDirectMessage';
import GetDirectMessagesForCat from './page/getDirectMessagesForCat';
import { FavoritesProvider } from './context/FavoritesContext';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <FavoritesProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<Main />} path="" />
            {/* add a route for the registration form */}
            <Route element={<Signin />} path="/login" />
            <Route element={<Image />} path="/Image_upload" />
            <Route element={<Register />} path="/register" />
            <Route element={<Store />} path="/catlist" />
            <Route element={<UserHomePage />} path='/user-homepage' />
            <Route element={<WorkerHomepage />} path='/charity-worker-homepage' />
            <Route element={<SendDirectMessage />} path='/send-direct-message/:catId'/>
            <Route element={<GetDirectMessagesForCat />} path='/direct-messages/:catId'/>
          </Routes>
        </BrowserRouter>
      </div>
    </FavoritesProvider>
  );
};

export default App;