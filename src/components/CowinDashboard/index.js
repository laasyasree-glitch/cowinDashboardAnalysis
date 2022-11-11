import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

class CowinDashboard extends Component {
  state = {
    data1: [],
    data2: [],
    data3: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.last_7_days_vaccination.map(item => ({
        vaccineDate: item.vaccine_date,
        dose1: item.dose_1,
        dose2: item.dose_2,
      }))
      const updatedData2 = fetchedData.vaccination_by_gender.map(item => ({
        count: item.count,
        gender: item.gender,
      }))
      const updatedData3 = fetchedData.vaccination_by_age.map(item => ({
        age: item.age,
        count: item.count,
      }))
      this.setState({
        data1: updatedData,
        data2: updatedData2,
        data3: updatedData3,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGraphs()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderFailureView = () => (
    <div>
      <h1>Something went wrong</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  renderGraphs = () => {
    const {data1, data2, data3} = this.state
    return (
      <div>
        <div>
          <h1>Vaccination Coverage</h1>
          <VaccinationCoverage details={data1} />
        </div>
        <div>
          <h1>Vaccination by gender</h1>
          <VaccinationByGender details={data2} />
        </div>
        <div>
          <h1>Vaccination by age</h1>
          <VaccinationByAge details={data3} />
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div>
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  render() {
    return (
      <div className="bg">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1>Co-WIN</h1>
          <h1>CoWIN Vaccination In India</h1>
        </div>

        {this.renderAllProducts()}
      </div>
    )
  }
}

export default CowinDashboard
