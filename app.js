const express = require('express')

const app = express()

app.use(express.json())

const crudUsers = [
{
    id: 1,
    firstName:'Tatiana',
    lastName: 'Diaz',
    email:'ctdc_3101@hotmail.com',
    password:'root',
    age:26
},
{
    id: 2,
    firstName:'Karen',
    lastName: 'Moran',
    email:'karencita@hotmail.com',
    password:'root',
    age:22
}
]
let baseId = 3

app.get('/', (req, res) => {
    res.json({
        message:'My server is ok!'
    })
})

//ruta que muestre los usuarios

app.get('/users', (req, res) => {
    res.json(crudUsers)
})

//usuario con el ID en especifico que se recibe desde parametros

app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id)

    const data = crudUsers.find((item) => id === item.id)

    if (data){
        res.json(data)
    }else {
        res.status(404).json({
           message: 'Invalid ID'
        })
    }
    
    })

//ruta que agregue un usuario nuevo

app.post('/users', (req, res) => {
    const data = req.body

    const newUser = {
        id: baseId++,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password:data.password,
        age:data.age
    }
    crudUsers.push(newUser)
    res.json(newUser)
})

app.listen(9000, () => {
    console.log('Server started at port 9000')
})
module.exports = app
