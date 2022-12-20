import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterApi } from '../apiRequest/authRequest';
import { ToastPopup } from '../components/toast';


interface IRegister {
  email: string;
  password: string;
  confirm_password:string
}

const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues
  } = useForm();
  const onSubmit: any = async(data: IRegister) => {
    try{
      const {confirm_password,...rest} = data
      const registerData:any = await RegisterApi(rest)
      console.log("🚀 ~ file: register.tsx:25 ~ constonSubmit:any=async ~ registerData", registerData)
      if(registerData.status === 201){
        ToastPopup(registerData.data)
        navigate('/signin')
      }
      else{
        ToastPopup(registerData.response
          .data)
      }
    }catch(err){
      
      console.log(err)
    }
    
    
  };
 
  console.log(errors);
  return (
    <div className="columns is-vcentered full-height">
      <div className="column">
        <div className="is-flex is-justify-content-center">
          <h1 className="is-size-3 has-text-centered">
            Welcome
            <br /> to Vaccine Management
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
              <div className="is-size-7 has-text-danger-dark">
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
              <div className="is-size-7 has-text-danger-dark">
                Please Enter Password
              </div>
            )}
          </div>
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                className="input"
                {...register('confirm_password', {
                  required: true,
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Passwords should match!";
                  }
                })}
                type={'password'}
                placeholder={'Please enter password'}
              />
            </div>
            {/* {errors?.['password'] && (
              <div className="is-size-7 has-text-danger-dark">
                Please Enter Password
              </div>
            )} */}
          </div>
          <div className="is-flex is-justify-content-center">
            <input
              className="button is-primary width-full"
              value={'Sign up'}
              type="submit"
            />
          </div>
          <div className="has-text-centered pt-4">
            <h2><Link to="/signin">Login</Link></h2>

          </div>
        </form>
      </div>
      <div className="column p-0">
        <img src="vaccine.jpeg" className="image-content" />
      </div>
    </div>
  );
};

export default Register;
