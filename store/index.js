import {
  observable,
  action
} from 'mobx'

class Store {
  @observable
  list = []

  @action.bound
  setList(data) {
    this.list = data
  }
}

export default new Store()