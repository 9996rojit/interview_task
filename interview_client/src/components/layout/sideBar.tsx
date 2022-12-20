import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './sidebar.css';
interface Iprops {
  children: ReactElement | React.ReactNode;
}

const SideBar = (props: Iprops) => {
  const {vaccineData}:any = useAuth()
  return (
    <section className="columns">
      <div className="column has-background-info is-2 mt-3 ">
        <Link to="/dashboard">
          <div className="button has-text-left is-justify-content-left is-info is-medium is-fullwidth">
            Dashboard
          </div>
        </Link>
        <Link to="/create-vaccine">
          <div className="button has-text-left is-justify-content-left is-info is-medium is-fullwidth">
            Add Vaccine
          </div>
        </Link>
        <div className="button has-text-left is-justify-content-left is-info is-medium is-fullwidth">
          View Vaccine
        </div>
        <div className="side-bar-height"></div>
        <div className="button has-text-left is-justify-content-left is-info is-medium is-fullwidth is-position-absolute">
          Logout
        </div>
      </div>
      <div className="column mt-3 is-three-fifths">{props.children}</div>
      <div className="column mt-3 ">
        <div className='is-flex is-justify-content-center p-2 has-text-info has-text-weight-bold'>Latest Added Vaccine</div>
        {vaccineData?.slice(0,5).map(( item:{vaccine_name:string,vaccine_image:null|string,vaccine_dose:number},index:number) =>(
        <div key={index}className='box'>
          <div className='is-flex is-justify-content-space-evenly is-align-items-center'>
        <figure className="image is-64x64 ">
          <img className="is-rounded" src={item.vaccine_image ?`${item.vaccine_image}`:'no-pictures.png'}/>
        </figure>
        <div>
          <h3 className="is-size-6 has-text-weight-semibold">{item.vaccine_name}</h3>
          <h4>{item.vaccine_dose}</h4>
        </div>
        </div>

        </div>))}
        
      </div>
    </section>
  );
};

export default SideBar;
