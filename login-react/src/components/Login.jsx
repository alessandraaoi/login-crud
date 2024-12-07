import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import {useNavigate} from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()

    const formulario = useRef()

    const [usuarios, setUsuarios] = useState([])

    const postLogin = async (e) => {
        e.preventDefault()
        console.log('Haciendo click en login');
        
        let {nombreUsu, passwordUsu} = formulario.current

        let final = {nombre: nombreUsu.value, password: passwordUsu.value}

        nombreUsu = final.nombre
        passwordUsu = final.password

        let options = {
            method: 'POST', 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(final)
        }

        let peticion = await fetch ('http://localhost:3000/login', options)
        let datos = await peticion.json()
        setUsuarios(datos)
        
        console.log(datos);

        // .length > 0 porque un Array siempre es truthy (no podemos hacer true/false)
        // si .length es < 0 es porque el Array está vacío
        if (datos.length > 0) {
            navigate('/gestor')
        }
        
        formulario.current.reset()  

    }

  return (
    <div>
      
        <h1>Login</h1>

        <form onSubmit={postLogin} ref={formulario} >
            <input type="text" name = 'nombreUsu' placeholder='Nombre'/>
            <input type="text" name = 'passwordUsu' placeholder='Password'/>
            <input type="submit" value = 'Login' />
        </form>

    </div>
  )
}
