// css

import 'bootstrap/dist/css/bootstrap.min.css';

//

import { FC, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

// components

import MyInput from './components/ui/MyInput'
import MyButton from './components/ui/MyButton'

//

import { Container, Col, Row } from 'react-bootstrap'

//

import { messageType } from './components/types/types'

//


const App: FC = () => {





  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState<messageType>({
    name: '',
    text: '',
    date: new Date().toString()
  })


  useEffect(() => {getDBmessage()}, [message])





  const id = (messages.length < 1) ? 1 :messages.length + 1





  const getDBmessage = async () => {
    try {

      const responce = await fetch('http://localhost:9000/api/v1/message', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await responce.json()

      if (data !== Array) {
        setMessages([])
      }
      console.log(data)
      setMessages(data)


    } catch (error) {

    }
  }

  const postTGMessage = async () => {
    try {



      const messageToTg = `\n${id}\n\n КАРТОЧКА #${id}\n\n\nАвтор:${message.name}\n\nСообщение:${message.text}`

      const TOKEN = '7385085516:AAGFFQJ6us6CB8Dxx87ULocjQt3C0nSM-Kw'
      const CHAT_ID = '85252645'

      const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({chat_id: CHAT_ID, text: messageToTg, reply_markup: {inline_keyboard: [[{text: 'Согласовать', callback_data: 'agree'}], [{text: 'Отклонить', callback_data: 'disagree'}]]}})
      })


      if (response.ok) {
        const data = await response.json()
        return data
      }

    } catch (error) {
      console.log(`ОШИБКА ${error}`)
    }
  }

  const postDBMessage = async () => {
    try {
      const responce = await fetch('http://localhost:9000/api/v1/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)

      })

        if (responce.ok) {
          const data = await responce.json()
          postTGMessage()

          setMessage({
            name: '',
            text: '',
            date: new Date().toString()
          })
          return data
        }

      throw new Error(responce.statusText)

    } catch (error) {
      console.log(`ОШИБКА ${error}`)
    }
  }



  return (

    <Container>
      <Col md={12}>


          <Col md={12} style={{width: '100%'}}><MyInput type='text' placeholder='введите имя' value={message.name} onChange={(e) =>{setMessage({...message, name: e.target.value})}}></MyInput></Col>
          <Col md={12} style={{width: '100%'}}><MyInput type='text' placeholder='введите имя' value={message.text} onChange={(e) => {
            setMessage({...message, text: e.target.value})
          }}></MyInput></Col>

          <Col md={6}><MyButton onClick={() => {postDBMessage()}} text='Отправить' /></Col>


      </Col>
    </Container>
  )
}

export default App

