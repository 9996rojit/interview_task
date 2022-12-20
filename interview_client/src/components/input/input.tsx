import { UseFormRegister } from 'react-hook-form';

interface Iinput {
  name: string;
  type: string;
  placeholder: string;
  errors: any;
  isRequired: boolean;
  label: string;
  register: UseFormRegister<any>;
}

const Input = (props: Iinput) => {
  const { name, type, placeholder, errors, label, register } = props;
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          className="input"
          {...register(name)}
          type={type}
          placeholder={placeholder}
        />
      </div>
      {errors?.[name] && (
        <div className="is-size-7 has-text-danger-dark">
          Please Enter {label}
        </div>
      )}
    </div>
  );
};

export default Input;
