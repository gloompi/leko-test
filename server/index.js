const express = require('express')
const cors = require('cors')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
const jsonParser = bodyParser.json()

// CORS for react app, assuming port 3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.get('/', (req, res) => {
  // getting data from data.json
  const fileContents = fs.readFileSync('./data.json', 'utf-8')
  const data = fileContents && JSON.parse(fileContents)

  // return the response
  console.log('GET---', data)
  res.send(data)
})

app.post('/', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400)
  console.log('POST---')
  const fileContents = fs.readFileSync('./data.json', 'utf-8')
  const { data } = fileContents && JSON.parse(fileContents)
  const newCard = req.body
  data.push(newCard)
  try {
    fs.writeFileSync('./data.json', JSON.stringify({ data }), { encoding: 'utf8' })
    res.send(data)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.delete('/', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400)
  console.log('DELETE---')
  const fileContents = fs.readFileSync('./data.json', 'utf-8')
  const { data } = fileContents && JSON.parse(fileContents)
  const current = data.find(({ id }) => id === req.body.id)
  data.splice(data.indexOf(current), 1)
  try {
    fs.writeFileSync('./data.json', JSON.stringify({ data }), { encoding: 'utf8' })
    res.send(data)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.listen(3030, () => console.log('server listening on port 3030!'))

module.exports = app