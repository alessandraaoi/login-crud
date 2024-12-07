import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function Gestor() {

  const [usuarios, setUsuarios] = useState([])

  const formularioPost = useRef()

  const formularioPut = useRef()

  let getUsers = async () => {
    let options = {method: 'GET'}

    let peticion = await fetch ('http://localhost:3000/login', options)
    let datos = await peticion.json()
    setUsuarios(datos)
    
  }

  useEffect(() =>  {
    getUsers()
  })

  // -------- DELETE
  let deleteUser = async (_id) => {

    let options = {method: 'DELETE'}

    let peticion = await fetch (`http://localhost:3000/login/id/${_id}`, options)
    let datos = await peticion.json()
    setUsuarios(datos)

    console.log('Usuario eliminado correctamente');
    

  }

  // ------- AÑADIR
  let postUser = async (e) => {
    e.preventDefault()

    const {nombre, password, edad} = formularioPost.current

    const nuevo = {nombre: nombre.value, password: password.value, edad: edad.value}

    nombre.value = nuevo.nombre
    password.value = nuevo.password
    edad.value = nuevo.edad

    console.log(nombre.value);

    let options = {
      method: 'POST', 
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(nuevo)
    }

    let peticion = await fetch ('http://localhost:3000/users', options)
    let datos = await peticion.json()
    setUsuarios(datos)

    formularioPost.current.reset()  
    
  }

  // ------- ACTUALIZAR PARTE 1
  let readUser = async (_id) => {
    const {idInput, nombre, edad} = formularioPut.current

    const buscar = usuarios.find( user => user._id === _id)

    const nuevo = {id: idInput.value, nombre: nombre.value, edad: edad.value}
    
    
    idInput.value = buscar._id
    nombre.value = buscar.nombre
    edad.value = buscar.edad

  }

  // ------- ACTUALIZAR PARTE 2
  let putUser = async (e) => {
    e.preventDefault()

    const {idInput, nombre, edad} = formularioPut.current
    const nuevo = {_id: idInput.value, nombre: nombre.value, edad: edad.value}

    let options = {
      method: 'PUT', 
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(nuevo)
    }

    let peticion = await fetch ('http://localhost:3000/login', options)
    let datos = await peticion.json()
    setUsuarios(datos)

    formularioPut.current.reset()  

    console.log('PUT OK');
    
  }

  return (
    <div>
      
        <h1>Gestor</h1>

        <h2>Tus amigos</h2>
      <ul>
        {usuarios.map (user => 
          <li key = {user._id}>
            
            <p>{user.nombre}</p>
            <button onClick = { () => readUser(user._id)}> Actualizar amigo </button>
            <button onClick = { () => deleteUser(user._id)}> Eliminar amigo </button>
            <p> .................................................................. </p>
            
            </li>

        )}
      </ul>

       {/* ------------ FORM PARA AÑADIR ------- */}
    <form onSubmit={ postUser } ref={formularioPost}>
      <input type="text" name="nombre" placeholder='Nombre'/>
      <input type="text" name="password" placeholder='Password'/>
      <input type="number" name="edad" placeholder='Edad'/>
      <input type="submit" value='Añadir alumno' />
    </form>

    <br></br><br></br>
      
    {/* ------------ FORM PARA ACTUALIZAR ------- */}
    <form onSubmit = {putUser} ref={formularioPut}>
      <input type="text" name = 'idInput' placeholder='idInput' />
      <input type="text" name = 'nombre' placeholder='Nombre' />
      <input type="number" name = 'edad' placeholder='Edad' />
      <input type="submit" value = 'Actualizar Alumno' />
    </form>


    </div>
  )
}

export default Gestor
