import { Link } from "react-router-dom"


const Missing = () => {
  return (
    <div className="container is-flex is-justify-content-center is-align-items-center" style={{height:'100vh'}}>
      <div className="box">
        <img src="404.jpg"/>
        <div className="has-text-centered is-size-2">
          Page Not Found
          </div>
          <div>
        <Link to="/signin">
          <div className="is-flex is-justify-content-center pt-4">
        <button className="button is-info">
        Login to view more
        </button>
        </div>

      </Link>
      </div>
      </div>
      
    </div>
  )
}

export default Missing
