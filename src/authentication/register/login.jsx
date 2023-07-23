import { useState } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../lib/customhooks';
import { Axios } from 'axios';
import { APP_ROUTES, API_ROUTES } from '../../utils/constant';
import { storeTokenInLocalStorage } from '../../lib/common';

function RegisterPage() {
  const navigate = useNavigate();
  const { user, authenticated } = useUser();
  if (user || authenticated) {
    navigate(APP_ROUTES.DASHBOARD)
  }
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    try {
      setIsLoading(true);
      const response = await Axios({
        method: 'POST',
        url: API_ROUTES.SIGN_IN,
        data: {
          username,
          password
        }
      });
      if (!response?.data?.token) {
        console.log('Something went wrong during signing in: ', response);
        return;
      }
      storeTokenInLocalStorage(response.data.token);
      navigate(APP_ROUTES.DASHBOARD)
    }
    catch (err) {
      console.log('Some error occured during signing in: ', err);
    }
    finally {
      setIsLoading(false);
    }
  };


  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <>
      <div class="login-box">
        <h2>Login</h2>
        <form>
          <div class="user-box">
            <input type="text" name="" required="" onChange={handleUsernameChange} value={username} />
            <label>Username</label>
          </div>
          <div class="user-box">
            <input type="password" name="" required="" onChange={handlePasswordChange} value={password} />
            <label>Password</label>
          </div>

          {isLoading ? <div className='loader' /> : null}
          <button onClick={signIn}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default RegisterPage;