import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const statusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeTab: languageFiltersData[0].id,
    languagesList: [],
    responseStatus: statusConstants.loading,
  }

  componentDidMount() {
    this.getLanguagesList()
  }

  getLanguagesList = async () => {
    const {activeTab} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTab}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok === true) {
      const dataList = data.popular_repos
      const convertedList = dataList.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        languagesList: convertedList,
        responseStatus: statusConstants.success,
      })
    } else {
      this.setState({responseStatus: statusConstants.failure})
    }
  }

  changeActiveState = id => {
    this.setState(
      {activeTab: id, responseStatus: statusConstants.loading},
      this.getLanguagesList,
    )
  }

  renderLoader = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getRepoItems = () => {
    const {languagesList} = this.state
    return (
      <ul className="repo-list-container">
        {languagesList.map(eachRepo => (
          <RepositoryItem repo={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  showFailureResponse = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  getResponseStatus = () => {
    const {responseStatus} = this.state

    switch (responseStatus) {
      case statusConstants.success:
        return this.getRepoItems()
      case statusConstants.failure:
        return this.showFailureResponse()
      default:
        return this.renderLoader()
    }
  }

  render() {
    const {activeTab} = this.state
    return (
      <div className="bg-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="filter-tab-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              filterItem={eachItem}
              key={eachItem.id}
              activeTab={activeTab}
              changeActiveState={this.changeActiveState}
            />
          ))}
        </ul>
        {this.getResponseStatus()}
      </div>
    )
  }
}

export default GithubPopularRepos
