import { action } from 'mobx'

const Actions = superclass => class extends superclass {
  @action fetch = async () => {
    // const xhr = new XMLHttpRequest()
    // xhr.open('GET', 'http://localhost:3030/', true)
    // xhr.send()
    // xhr.onreadystatechange = () => {
    //   if (xhr.readyState !== 4) return null
    
    //   if (xhr.status !== 200) {
    //     this.loaded = false
    //     this.error = xhr.statusText
    //   } else {
    //     const { data } = JSON.parse(xhr.response)
    //     this.data = data
    //     this.loaded = true
    //   }
    // }
    try {
      const pending = await fetch('http://localhost:3030/')
      const { data } = await pending.json()
      this.data = data
      this.loaded = true
    } catch (error) {
      this.loaded = false
      this.error = true
    }
  }

  @action createCard = async (data) => {
    // const xhr = new XMLHttpRequest()
    // xhr.open('POST', 'http://localhost:3030/', true)
    // xhr.setRequestHeader('Content-Type', 'application/json')
    // xhr.send(JSON.stringify(data))
    // xhr.onreadystatechange = () => {
    //   if (xhr.readyState !== 4) return null
    
    //   if (xhr.status !== 200) {
    //     console.log(xhr.statusText)
    //     alert('Something went wrong')
    //   } else {
    //     const data = JSON.parse(xhr.response)
    //     this.data = data
    //   }
    // }
    try {
      const pending = await fetch('http://localhost:3030/', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const response = await pending.json()
      this.data = response
    } catch (error) {
      console.log('ERROR', error)
      alert('Something went wrong!')
    }
  }

  @action deleteCard = async (id) => {
    // const xhr = new XMLHttpRequest()
    // xhr.open('DELETE', 'http://localhost:3030/', true)
    // xhr.setRequestHeader('Content-Type', 'application/json')
    // xhr.send(JSON.stringify({ id }))
    // xhr.onreadystatechange = () => {
    //   if (xhr.readyState !== 4) return null
    
    //   if (xhr.status !== 200) {
    //     console.log(xhr.statusText)
    //     alert('Something went wrong')
    //   } else {
    //     const data = JSON.parse(xhr.response)
    //     this.data = data
    //   }
    // }
    try {
      const pending = await fetch('http://localhost:3030/', {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const response = await pending.json()
      this.data = response
    } catch (error) {
      console.log('ERROR', error)
      alert('Something went wrong!')
    }
  }
}

export default Actions