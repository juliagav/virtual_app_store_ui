import { useState } from "react"


export default  function CreateProduct() {
  const[product, setProduct] = useState({
    description:"",
    image:"",
    price:""
  })
  const handleSubmit = (e)=>{
    e.preventDefault()
    fetch('http://localhost:3000/api/products',{
      method:"post",
      headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(product)})
      .then(response=> {
        if(!response.ok){
           throw new Error('Erro ao buscar produto');
        }
        return response.json();
      })
      .then(product=> {
        setProduct({
        description:"",
        image:"",
        price:""})
      alert("produto criado com sucesso")
      })
  }

  return(
    <div>
      <h1>
        Create product
      </h1>

    <form onSubmit={(e)=> handleSubmit(e)}>
      <input onChange={(e)=>setProduct({...product,description:e.target.value})} type="text" placeholder="digite a descrição do produto" />
      {product.description}
      <input onChange={(e)=>setProduct({...product,image:e.target.value})} type="text" placeholder="insira a imagem do produto" />
      {product.image}
      <input onChange={(e)=>setProduct({...product,price:e.target.value})} type="number" placeholder="digite opreço do produto" />
      {product.price}
      <button type="submit">enviar</button>
    </form>
  </div>
  )


  }

  /*
  No HTML, o tipo de campo <input> para inserir um link de imagem realmente costuma ser type="text", 
  porque o usuário vai digitar ou colar uma URL da imagem (por exemplo: https://meusite.com/imagem.jpg). 
  Não existe um tipo type="link" para inputs HTML.

Resumindo:
Se você quer que o usuário forneça um endereço de uma imagem na internet (URL), use:
<input
  type="text"
  placeholder="insira o link da imagem do produto"
  onChange={e => setProduct({ ...product, image: e.target.value })}
/>
E o usuário deve colar um link, como: https://....

Se você quer que o usuário faça upload de um arquivo de imagem do próprio computador, 
aí sim, o ideal é usar:
<input
  type="file"
  accept="image/*"
  onChange={e => setProduct({ ...product, image: e.target.files[0] })}
/>
Atenção: nesse caso, e.target.files é uma lista de arquivos e você provavelmente vai precisar de lógica extra para enviar a imagem para um servidor.

Conclusão:
Para link de imagem: type="text"
Para upload de imagem: type="file"

  */
  

