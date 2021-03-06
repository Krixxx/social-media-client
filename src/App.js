import { Home, Login, Signup, User } from './pages';
import { Navbar, PrivateRoute } from './components';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='container'>
        <Routes>
          <PrivateRoute exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Signup />} />
          <Route exact path='/users/:id' element={<User />} />
          <Route exact path='/users/:id/post/:postId' element={<User />} />
          {/* <Route path='*' element={<Error />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
