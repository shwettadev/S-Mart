import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './routes/ProtectedRoutes';
import Home from './components/common/Home';
import { authActions } from './redux/reducer/auth.reducer';
import { checkUserToken } from './utility/common';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    checkUserToken((res) => {
      if (res) {
        dispatch(authActions.login());
      } else {
        dispatch(authActions.logout());
      }
    });
  }, []);

  return (
    <Fragment>
      <Router>
        {!isAuth ?
          (<Routes>
            <Route exact path='/' element={<Dashboard/>} />
          </Routes>)
          :
          (<ProtectedRoute Component={Home} />)
        }
      </Router>
    </Fragment>
  );
}

export default App;