import './index.css'

const RepositoryItem = props => {
  const {repo} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = repo
  return (
    <li className="repo-item-container">
      <img src={avatarUrl} alt={name} className="repo-logo" />
      <h1 className="repo-name">{name}</h1>
      <div className="count-container">
        <div className="repo-count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="repo-count-img"
          />
          <p className="repo-count">{starsCount} stars</p>
        </div>
        <div className="repo-count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="repo-count-img"
          />
          <p className="repo-count">{forksCount} forks</p>
        </div>
        <div className="repo-count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="repo-count-img"
          />
          <p className="repo-count">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
