import { isEmpty } from 'lodash'
import { observable, computed } from 'mobx'

class Store {
  @observable data = []
  @observable loaded = false
  @observable error = null
  @observable searchText = ''
  @observable sortValue = ''

  @computed get list() {
    let data = []

    switch (true) {
      case !isEmpty(this.searchText) && !isEmpty(this.sortValue):
        this.searching(data)
        data = this.sorting(data)
        break
      case !isEmpty(this.searchText):
        this.searching(data)
        break
      case !isEmpty(this.sortValue):
        data = this.sorting(this.data)
        break
      default:
        data = this.data
    }

    return data
  }
}

export default Store