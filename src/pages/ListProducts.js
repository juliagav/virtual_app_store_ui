import React, {useEffect, useState} from "react"
import  {Link}  from "react-router-dom";

export default function ListProducts() {
  const[products, setProducts] = useState([])
  const[Loading, setLoading]= useState(true)

    useEffect(()=> { 
      getProducts()
    },[])
    
    const getProducts = () => {
      fetch('http://localhost:3000/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar usuários');
        }
        return response.json();
      }).then(products => {
        setProducts(products)
        setLoading(false)
      }).catch(error => console.error('Erro:', error));
    }
    const handleDelete = (id)=>{
      fetch(`'http://localhost:3000/api/products'${id}`, {
        method: "delete",
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if(!response.ok) {
          throw new Error('Erro ao buscar produto');
        }
        return response.json();
      })
      .then(()=> {
        alert("produto removido com sucesso");
        getProducts()
      })
    }

    if(Loading){
      return(
        <p>
          loading...
        </p>
      )
    }
  
  
  return(
    <div className="p-4">
      <h1 className="text x1 font bold mb-4">Lista de Produtos</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border">Price</th>

          </tr>
        </thead>
        <tbody>
        {products.map((product)=> (
          <tr key={product._id} className="text-center">
           <td className="py-2 px-4 border">{product._id}</td>
           <td className="py-2 px-4 border">{product.description}</td>
           <td className="py-2 px-4 border">{product.image}</td>
           <td className="py-2 px-4 border">{product.price}</td>
           <td className="py-2 px-4 border"><button type="button" onClick={()=> handleDelete(product._id)}>remover</button></td>
           <td className="py-2 px-4 border"><Link to={`/edit-product/${product._id}`}> <button type="button">Editar</button></Link></td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
