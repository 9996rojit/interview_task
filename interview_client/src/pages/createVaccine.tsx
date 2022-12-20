import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { handelFileChange } from '../utils/fileUpload';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { ToastPopup } from '../components/toast';

interface IvaccineInfo {
  vaccine_name: string | undefined;
  vaccine_dose: number | undefined;
  vaccine_desc: string | undefined;
  vaccine_available: string | undefined;
}

const CreateVaccine = () => {
  const axiosPrivate = useAxiosPrivate();
  const [file, setFileName] = useState<string | undefined>('Choose a photo...');
  const [uploadedFile, setUploadedFile] = useState<any>();

  const [allergies, setAddAllergies] = useState<boolean>(false);
  const [vaccineInfo, setVaccineInfo] = useState<IvaccineInfo>({
    vaccine_name: undefined,
    vaccine_dose: undefined,
    vaccine_desc: undefined,
    vaccine_available: undefined,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    if (location.pathname.includes('/edit-vaccine')) {
      const getSingleVacineData = async () => {
        const getSingleVaccineData = await axiosPrivate.get(
          `/vaccine?id=${id}`
        );
        if (getSingleVaccineData.status) {
          setVaccineInfo(getSingleVaccineData.data.data);
        }
      };
      getSingleVacineData();
    } else {
      setVaccineInfo({
        vaccine_name: '',
        vaccine_available: '',
        vaccine_desc: '',
        vaccine_dose: 0,
      });
    }
  }, [location]);

  const onSubmit = async (data: any) => {
    if (id) {
      const {
        vaccine_name,
        vaccine_dose,
        vaccine_desc,
        vaccine_available,
        ...rest
      } = vaccineInfo;
      const { vaccine_allergies, ...newData } = data;
      const updateData = await axiosPrivate.patch(`/vaccine/${id}`, {
        ...{ vaccine_name, vaccine_dose, vaccine_desc, vaccine_available },
        ...newData,
      });
      if (updateData.status === 200) {
        if (!isEmpty(data.vaccine_allergies)) {
          const allergiesDataUpdate = await axiosPrivate.post(
            `/vaccineAllergies/${id}`,
            data['vaccine_allergies']
          );
          if (allergiesDataUpdate.status === 201) {
            navigate('/dashboard');
          }
        } else {
          navigate('/dashboard');
        }
      }
    } else {
      const {
        vaccine_name,
        vaccine_available,
        vaccine_desc,
        vaccine_dose,
        ...rest
      } = data;

      const formData = new FormData();
      formData.append('vaccine_name', vaccine_name),
        formData.append('vaccine_available', vaccine_available),
        formData.append('vaccine_desc', vaccine_desc),
        formData.append('vaccine_dose', vaccine_dose),
        formData.append('image', uploadedFile);

      const response: any = await axiosPrivate.post('/vaccine', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        ToastPopup(response.data);
        navigate('/dashboard');
      } else {
        ToastPopup(response.response.data);
      }
    }
  };
  return (
    <div>
      <form className="box" onSubmit={handleSubmit(onSubmit)}>
        <div className="container is-flex is-justify-content-center">
          <h1 className="is-size-3">{`${id ? 'Edit' : 'Add'} Vaccine Data`}</h1>
        </div>
        <div className="field">
          <label className="label">Vaccine Name:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              defaultValue={vaccineInfo.vaccine_name}
              placeholder="Please enter vaccine name"
              {...register('vaccine_name', { required: true })}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Vaccine Dose:</label>
          <div className="control">
            <input
              className="input"
              type="number"
              defaultValue={vaccineInfo.vaccine_dose}
              {...register('vaccine_dose', { required: true })}
              placeholder="Please enter vaccine dose"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Vaccine Description:</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Please enter description"
              {...register('vaccine_desc', { required: true })}
              defaultValue={vaccineInfo.vaccine_desc}
              rows={3}
            ></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label">Vaccine Available</label>
          <div className="control">
            <input
              className="input"
              type="text"
              defaultValue={vaccineInfo.vaccine_available}
              {...register('vaccine_available', { required: true })}
              placeholder="Please enter available unit of vaccine"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Vaccine Image</label>
          <div className="file has-name is-boxed">
            <label className="file-label">
              <input
                // {...register('image')}
                className="file-input"
                type="file"
                name="resume"
                onChange={(e) => {
                  setFileName(handelFileChange(e.target.value));
                  setUploadedFile(e.target.files?.[0]);
                }}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choose a file…</span>
              </span>
              <span className="file-name">{file}</span>
            </label>
          </div>
        </div>

        <div className="columns">
          <div className="column is-2">
            <button className="button is-primary" type="submit">
              {id ? `Update Vaccine Data` : `Create new vaccine`}
            </button>
          </div>
          <div className="column is-1"></div>
          {id && (
            <div className="column is-3">
              <button
                className="button is-primary"
                type="button"
                onClick={() => setAddAllergies(true)}
              >
                {' '}
                Add Allergies
              </button>
            </div>
          )}
        </div>

        {allergies && (
          <div className="box">
            <div className="field">
              <label className="label">Vaccine Available</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  {...register('vaccine_allergies')}
                  placeholder="Please enter available unit of vaccine"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateVaccine;
