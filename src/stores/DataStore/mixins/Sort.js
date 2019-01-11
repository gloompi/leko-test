import { action } from 'mobx'

const Sort = superclass => class extends superclass {
  @action fireSort = (value) => {
    this.sortValue = `${value}`.toLowerCase()
  }

  @action sorting = (data) => {
    return data.slice().sort((item1, item2) => {
      if (item1[this.sortValue] > item2[this.sortValue]) return 1
      else return -1
    })
  }
}

export default Sort