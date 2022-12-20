import { useEffect } from 'react';
// import { getVaccineData } from '../apiRequest/vaccineRequest';
import CreatePieChart from '../components/chart/piechart';
import Table from '../components/table/table';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import './dashboard.css'

const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate() 
  const {setVaccineData}:any = useAuth()
  useEffect(()=>{
      const dashboard = async ()=>{
        try{
        const response = await axiosPrivate.get('vaccine');
        if(response.status===200){
          setVaccineData(response.data.data.data)
        }
        
      }catch(err){
        console.log(err)
      }}
      dashboard()
   
  },[])
  return (
    <div>
      <div className="container pt-4">
        <div className="columns">
          <div className="column is-4">
            <div className="box">
              <div className="columns">
                <div className="column">
                  <img src="vaccinated.png" className="box-image-content" alt="" />
                </div>
                <div className="column is-flex is-justify-content-right is-align-items-center">
                    40+ <span className='has-text-info has-text-weight-semibold'>Vaccinated</span>
                </div>
              </div>
            </div>


          </div>
          <div className="column is-4">
          <div className="box">
              <div className="columns">
                <div className="column">Available</div>
                <div className="column is-flex is-justify-content-right is-align-items-center">30+</div>
                </div> 

            </div>
          </div> 
          <div className="column is-4">
          <div className="box">
          <div className="columns">
                <div className="column">Available</div>
                <div className="column is-flex is-justify-content-right is-align-items-center">30+</div>
                </div> 

            </div>
          </div>


        </div>
        {/* section for table and chart data in dashboard */}
        <div className="columns">
          <div className="column">
          <div className='has-text-centered has-text-info has-text-weight-medium'>Vaccine Data</div>
          <Table />
         
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Dashboard;
