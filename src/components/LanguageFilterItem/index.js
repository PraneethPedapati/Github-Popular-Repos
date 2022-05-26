import './index.css'

const LanguageFilterItem = props => {
  const {filterItem, activeTab, changeActiveState} = props
  const {language, id} = filterItem

  const addClassName = () => {
    changeActiveState(id)
  }

  const highlightedTabClass = activeTab === id ? 'selected-tab-button' : ''

  return (
    <li className="tab-list-item">
      <button
        type="button"
        className={`tab-button ${highlightedTabClass}`}
        onClick={addClassName}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
