import express  from "express"
import { v4 as uuid } from 'uuid'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors()) //dentro das aspas vai o dominio do front end, * serve para dizer que todos podem acessar

// http://localhost:3333/users

interface User {
    id: string
    name: string
    email: string  
}

const users: User[] = []

app.get('/users', (request, response) => {
    
    return response.json(users) //retornar users
})

app.post('/users', (request, response) => {
    const {name, email} = request.body

    const user = {id: uuid(), name, email} //informações pertencentes ao usuario

    users.push(user) //registrar usuario na base de dados (array) com push

    return response.json(user) //retornar os dados do usuario que foi criado

})

app.put('/users/:id', (request, response) => {  //id depois do users para localizar um user e clicar em send na aba de update
    const {id} = request.params        //linha 33 e 34 recebe os dados dos usuarios
    const {name, email} = request.body 

    const userIndex = users.findIndex((user) => user.id ===id)  //localizar o usuario

    if (userIndex < 0) {
        return response.status(404).json({error: 'User not found.'})    //caso nao encontre o usuario retorna o erro
    }

    const user = {id, name, email}
    users[userIndex] = user  // atualizar os dados na base de dados 

    return response.json(user)  //retornar os dados do usuario atualizado  

})

app.delete('/users/:id', (request, response) => {
    const {id} = request.params   //receber id do usuario

    const userIndex = users.findIndex((user) => user.id ===id)  //localizar o usuario

    if (userIndex < 0) {
        return response.status(404).json({error: 'User not found.'})    //caso nao encontre o usuario retorna o erro
    }

    users.splice(userIndex, 1)  //excluir usuario

    return response.status(204).send()

})




app.listen('3333', () => {
    console.log('Back-end started!')
})

