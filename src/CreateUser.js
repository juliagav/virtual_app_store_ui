import { useState } from "react"

export default function CreateUser() {
  const[user,setUser] = useState({
    name:"",
    email:"",
    password:""
  })
  /*a função handleSubmit será chamada no envio do formulário por causa deste trecho no JSX do formulário:
      <form onSubmit={(e) => handleSubmit(e)}>*/
  const handleSubmit = (e)=>{
    e.preventDefault()
    fetch('http://localhost:3000/api/users',{
      method:"post",  
      headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)})
        .then(response => {
          if (!response.ok) {
              throw new Error('Erro ao buscar usuários');
          }
          return response.json();
      })
      .then(user => {
          setUser({ 
            name:"",
            email:"",
            password:""})
          //setIsLoading(false)
          alert("usuário criado com sucesso")
      })

      

  }

  return(
    <div>
      <h1>
        Create user
      </h1>

      <form onSubmit={(e)=>handleSubmit(e)}>
        <input onChange={(e)=>setUser({...user,name:e.target.value})} type="text" placeholder="digite seu nome"/>
        {user.name}
        <input onChange={(e)=>setUser({...user,email:e.target.value})} type="text" placeholder="digite seu email"/>
        {user.email}
        <input onChange={(e)=>setUser({...user,password:e.target.value})} type="password" placeholder="digite sua senha"/>
        {user.password}
        <button type="submit">enviar</button>
      </form>
    </div>
  )

}
