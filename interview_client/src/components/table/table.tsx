import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { axiosPrivate } from '../../api/axios';

interface Itable {
  id: string;
  vaccine_name: string;
  vaccine_dose: string;
  vaccine_desc: string;
  vaccine_available: string;
  isMandatory: boolean;
}

const Table = () => {
  const { setVaccineData }: any = useAuth();
  const handelDelete = async (id: string) => {
    const deleteResponse = await axiosPrivate.delete(`/vaccine/${id}`);
    if (deleteResponse.status === 200) {
      const response = await axiosPrivate.get('vaccine');
      if (response.status === 200) {
        setVaccineData(response.data.data.data);
      }
    }
  };
  const { vaccineData }: any = useAuth();
  //handel checkbox check
  const handelCheckboxCheck = async (id: string) => {
    const getSingleData: any = vaccineData.filter(
      (item: Itable) => item.id === id
    );

    const {
      vaccine_name,
      vaccine_dose,
      vaccine_desc,
      vaccine_available,
      ...rest
    } = getSingleData[0];
    const Mandatory = getSingleData[0].isMandatory === false ? true : false;
    const updateData = await axiosPrivate.patch(`/vaccine/${id}`, {
      ...{ vaccine_name, vaccine_dose, vaccine_desc, vaccine_available },
      ...{ isMandatory: Mandatory },
    });
    if (updateData.status === 200) {
      const response = await axiosPrivate.get('vaccine');
      if (response.status === 200) {
        setVaccineData(response.data.data.data);
      }
    }
  };

  return (
    <div>
      <table className="table is-hoverable">
        <thead>
          <tr>
            <th>SN.</th>
            <th>Name</th>
            <th>Dose</th>
            <th>Description</th>
            <th>Available</th>
            <th>Mandatory</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vaccineData?.map((item: Itable, index: number) => (
            <tr key={index}>
              <th className="p-4">{index + 1}</th>
              <td className="p-4">{item.vaccine_name}</td>
              <td className="p-4">{item.vaccine_dose}</td>
              <td className="p-4">{item.vaccine_desc}</td>
              <td className="p-4">{item.vaccine_available}</td>
              <td className="p-4">
                <div>
                  <input
                    type="checkbox"
                    onClick={(e) => {
                      handelCheckboxCheck(item.id);
                    }}
                    checked={item.isMandatory}
                  />
                </div>
              </td>

              <td className="p-4">
                <div className="columns">
                  <div className="column">
                    <Link to={`/edit-vaccine/${item.id}`}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                  </div>
                  <div className="column">
                    <Link to="#">
                      <FontAwesomeIcon
                        onClick={() => handelDelete(item.id)}
                        icon={faTrash}
                      />
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
