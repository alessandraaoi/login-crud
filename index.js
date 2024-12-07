console.clear()
console.log('Iniciando login-express');

const express = require ('express')
const cors = require ('cors')
const mongoose = require ('mongoose')

const app = express ()

app.use(cors())
app.use (express.json())
app.use(express.urlencoded({extended:false}))

// conexión MONGO

const conection = async () => await mongoose.connect ('mongodb://localhost:27017/proyecto')
.then (res => console.log('OK CONECTANDO MONGO'))
.catch ( err => console.log(err.message))

conection()

// Schema usuarios 
const usuarioSchema = new mongoose.Schema (
    { nombre: String, password: String, email: String, edad: Number, musica: String} , 
    { collection: 'login', versionKey: false})

// Modelo
const Usuario = mongoose.model ('Usuario', usuarioSchema)

// buscar todos los usuarios GET
app.get ('/login', async (req, res, next) => {
    try {
    const buscar = await Usuario.find()
    res.status(200).json(buscar)
    } catch (error) {
        console.log(error)
        next()
    }
    
})
console.log('hola')
// añadir un usuario POST 
app.post ('/users', async (req, res, next) => {
console.log('otro')
    try {
        const {nombre, password, email, edad, musica } = req.body

        const nuevo = new Usuario({nombre, password, email, edad, musica})
        console.log(nombre)
        await nuevo.save()

        // devuelve Array actualizado con el nuevo dato
        const buscarTodos = await Usuario.find()

        res.json(buscarTodos) 

        console.log('USUARIO CAMBIADO CORRECTAMENTE');
        

    } catch (error) {
        console.log(error)
        next()
    }
    
})

// login POST 
app.post ('/login', async (req, res, next) => {
    try {
        const {nombre, password} = req.body

        const buscar = await Usuario.find({nombre: nombre, password : password })
        console.log(buscar);
        
        if (buscar) {
            res.json(buscar) 
        } else {
            res.json('ERROR')
            
        }

    } catch (error) {
        console.log(error)
        next()
    }
})

// actualizar los datos de un usuario PUT
app.put ('/login', async (req, res, next) => {
    try {

        const {_id, ...datos} = req.body

        await Usuario.findByIdAndUpdate(_id, datos)

        // igual que POST
        const buscar = await Usuario.find()
        res.json(buscar)

    } catch (error) {
        console.log(error)
        next()
    }
})

// borrar alumno DELETE 
app.delete ('/login/id/:_id', async (req, res, next) => {
    try {

        const {_id} = req.params

        await Usuario.findByIdAndDelete(_id)

        // devuelve Array actualizado con el dato eliminado
        const buscar = await Usuario.find()
        
        res.json(buscar)

    } catch (error) {
        console.log(error)
        next()
    }
})


app.listen (3000, (req, res) => console.log('PUERTO OK'))
