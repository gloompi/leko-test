import { debounce, lowerCase } from 'lodash'
import { action } from 'mobx'

const Search = superclass => class extends superclass {
  @action fireSearch = (text) => {
    const search = debounce(() => this.handleSearch(text), 500)
    search()
  }

  handleSearch = (value) => {
    this.searchText = `${value}`.toLowerCase()
  }

  @action searching = (data) => {
    this.data.forEach((item) => {
      const { 
        name,
        description,
        death_reason,
        killed_by, 
        weapon,
      } = item
      const lowerText = lowerCase(`${name} ${description} ${death_reason} ${killed_by} ${weapon}`)
      if (lowerText.includes(this.searchText)) {
        data.push(item)
      }
    })
  }
}

export default Search