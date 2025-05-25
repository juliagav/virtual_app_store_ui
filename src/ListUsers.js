import React, {useEffect, useState} from "react"
import  {Link}  from "react-router-dom";


export default function ListUsers() {
  const [data, setData] = useState([])
   const [isLoading, setIsLoading] = useState(true) 
    useEffect(()=>{
      getUsers();
     
    }, [])

    const getUsers = () => {
      fetch('http://localhost:3000/api/users')
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro ao buscar usuários');
          }
          return response.json();
      }).then(users => {
          setData(users)
          setIsLoading(false)
      }).catch(error => console.error('Erro:', error));
    }
    const handleDelete = (id)=>{
      fetch('http://localhost:3000/api/users/'+id,{
          method:"delete",  
          headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
          if (!response.ok) {
              throw new Error('Erro ao buscar usuário');
          }
          return response.json();
      })
      .then(() => {
          alert("usuário removido com sucesso");
          getUsers();
          
      })
    }
      
    if(isLoading){
      return(
        <p>
          loading...
        </p>
      )
    }
    
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Lista de Usuários</h1>
        
        <input type="text" placeholder="buscar por nome"/>
       

       
        <table className="min-w-full bg-white border border-gray-200">   
        <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Nome</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">remover</th>
              <th className="py-2 px-4 border">editar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="py-2 px-4 border">{user._id}</td>
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                 {/*<td className="py-2 px-4 border"><button type="button">editar</button></td>*/}
                <td className="py-2 px-4 border">
                  <button type="button" onClick={()=> handleDelete(user._id)}>remover</button></td>
                <td className="py-2 px-4 border">
                  <Link to={`/edit/${user._id}`}>
                  <button type="button">Editar</button></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
} 

