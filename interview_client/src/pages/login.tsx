import { useForm } from 'react-hook-form';
import { login } from '../apiRequest/authRequest';
import useAuth from '../hooks/useAuth';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/input/input';
import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { ToastPopup } from '../components/toast';

interface ILogin {
  email: string;
  password: string;
}
const Login = () => {
  const { auth, setAuth }: any = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: any = async (data: ILogin) => {
    const loginResponse: any = await login(data);

    if (loginResponse.status === 200) {
      ToastPopup(loginResponse.data);
      setAuth({ accessToken: loginResponse.data.token });
      navigate('/dashboard');
    } else {
      ToastPopup(loginResponse.response.data);
    }
  };

  return (
    <div className="columns is-vcentered full-height">
      <div className="column">
        <div className="is-flex is-justify-content-center">
          <h1 className="is-size-3 has-text-centered">
            <span className="has-text-info has-text-weight-bold ">Welcome</span>{' '}
            <br />
            to Vaccine Management
          </h1>
        </div>
        <form className={'formWrapper mt-4'} onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                {...register('email', { required: true })}
                type={'email'}
                placeholder={'Please enter email'}
              />
            </div>
            {errors?.['email'] && (
              <div className="is-size-7 pt-2 has-text-danger-dark">
                Please Enter Email
              </div>
            )}
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                {...register('password', { required: true })}
                type={'password'}
                placeholder={'Please enter password'}
              />
            </div>
            {errors?.['password'] && (
              <div className="is-size-7 pt-2 has-text-danger-dark">
                Please Enter Password
              </div>
            )}
          </div>
          <div className="is-flex is-justify-content-center mt-4">
            <input
              className="button is-primary width-full"
              value={'Login'}
              type="submit"
            />
          </div>

          <div className="has-text-centered pt-4 has-text-info-dark">
            <h2>
              <Link to="/signup">Register</Link>
            </h2>
          </div>
        </form>
      </div>
      <div className="column p-0">
        <img src="vaccine.jpeg" className="image-content" />
      </div>
    </div>
  );
};

export default Login;
