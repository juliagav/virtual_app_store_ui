import {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom"

export default function Edit() {
  const {id} = useParams(); // <- Aqui você pega o id da URL
  const navigate = useNavigate(); 
  const[user,setUser] = useState({
    name:"",
    email:"",
    password:""
  });
  const[isLoading, setIsLoading] = useState(true)
  const[error, setError] = useState("")

//useEffect serve para carregar os dados do usuário e não para editá-lo (com o método GET)
    useEffect(()=>{
      getUser();
     
    }, [])

    const getUser = () => {
      fetch(`http://localhost:3000/api/users/${id}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro ao buscar usuários');
          }
          return response.json();
      }).then(user => {
          setUser(user) //<- Atualiza o formulário com os dados atuais
          setIsLoading(false)
      }).catch((error) => {
        console.error('Erro:', error);
        setError("Erro ao carregar dados do usuário");
      });
    }

const handleEdit = (e)=> {
  e.preventDefault()
  if(!user.name || !user.email || !user.password) {
    alert("todos os campos devem ser preenchidos")
    return;
  }
  fetch(`http://localhost:3000/api/users/${id}`,{
    method:"PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)})
          .then((response) =>{
            if (!response.ok) {
              throw new Error('Erro ao salvar alterações')
            }
            return response.json();
          })
          .then((updatedUser) => {
            console.log("usuário editado com sucesso:",updatedUser);
            alert("usuário editado com sucesso")
          //  handleEdit()
           navigate("/users") // Redireciona para a página inicial ou outra página
          })
          .catch((error) => {console.error("erro:",error);
            setError("Erro ao salvar as alterações. Tente novamente");
        })
        
}
  if (isLoading) 
    return <p>
      Carregando...
      </p>;

  return(
    <div>
      <h1>
      Editar usuário
      </h1>
      {error && <p style={{color: "red"}}>{error}</p>}
    <form onSubmit={handleEdit}>
        <input onChange={(e)=>setUser({...user,name:e.target.value})} type="text" value={user.name} placeholder="digite seu nome"/>
        {user.name}
        <input onChange={(e)=>setUser({...user,email:e.target.value})} type="text"  value={user.email}placeholder="digite seu email"/>
        {user.email}
        <input onChange={(e)=>setUser({...user,password:e.target.value})} type="password" value={user.password} placeholder="digite sua senha"/>
        {user.password}
        <button type="submit">Salvar alterações</button>
    </form>
    </div>
  )

}