import {
  observable,
  action,
  computed
} from 'mobx'

class Store {
  @observable
  list = []

  @computed
  get top10() {
    return this.list.slice(0, 10).map((value, index) => {
      return {
        img: value.img,
        all_click: value.all_click,
        favorites: value.favorites,
        name: value.name
      }
    })
  }

  @action.bound
  setList(data) {
    this.list = data
  }
}

export default new Store()