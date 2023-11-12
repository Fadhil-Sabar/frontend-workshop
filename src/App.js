import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignInPage from './pages/Auth/SignInPage';
import Dashboard from './pages/Dashboard';
import BasePage from './pages/BasePage';
import User from './pages/User';
import axios from 'axios';

axios.interceptors.request.use(
  config => {
    const authToken = localStorage.getItem('token')

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  err => Promise.reject(err)
)

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route exact path='/' element={<SignInPage />} />
          <Route exact path='/dashboard' element={<BasePage><Dashboard /></BasePage>} />
          <Route exact path='/user' element={<BasePage><User /></BasePage>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
