import {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom"

export default function EditProduct() {
  const{id}=useParams();
  const navigate = useNavigate();
  const[product,setProduct]= useState({
    description:"",
    image:"",
    price:""
  });
  const[isLoading, setIsLoading]= useState(true)
  const[error,setError] = useState("")


  useEffect(()=> { //1
    getProduct();                                     // executa a função getProduct
  },[])

  const getProduct = () => {                          // declara uma função e atribui a variável getProduct
    fetch(`http://localhost:3000/api/products/${id}`) //fetch(...): Faz uma requisição GET para o endpoint da API.
    .then(response => {                               //Verifica se a resposta foi bem-sucedida:
      if(!response.ok) {                              //!response.ok: Se a resposta for um erro HTTP (ex: 404, 500), lança um erro.
        throw new Error('Erro ao buscar produtos');   
      }
      return response.json();                         //Converte a resposta para JSON.
    }).then(product => {                              // Quando o JSON é recebido com sucesso:
      setProduct(product)                             // Atualiza o estado do produto no componente.
      setIsLoading(false)                             // Indica que o carregamento terminou.
    }).catch((error)=> {                              // Se qualquer erro ocorrer (na requisição ou parsing), exibe o erro no console e define a mensagem de erro no estado.
      console.error('Erro:',error);
      setError("Erro ao carregar dados do produto");
    })
  }

  const handleEdit = (e)=> {
    e.preventDefault()                                //Evita que o formulário seja enviado pelo comportamento padrão do navegador (recarregar a página).
    if(!product.description || !product.image || !product.price) {      //Se algum campo estiver vazio, mostra um alert e interrompe a execução da função.
      alert("todos os campos devem ser preenchidos")
      return;
    }
    fetch(`http://localhost:3000/api/products/${id}`,{
      method:"PUT",
      headers: {
        'Content-Type': 'application/json'            //Define que o corpo da requisição está em formato JSON.
      },
      body: JSON.stringify(product)})                 // Envia os dados atualizados convertidos para string JSON.
      .then((response)=>{
        if(!response.ok) {                            // Verifica se a resposta da requisição PUT foi bem-sucedida.
          throw new Error('Erro ao salvar alterações')
        }
        return response.json();
      })
      .then((updatedUser)=> {
        console.log("produto editado com sucesso")
        alert("produto editado com sucesso")
        navigate("/users")
      })
      .catch((error) => {console.error("erro:",error);
        setError("Erro ao salvar as alterações")
      })
  }
    if(isLoading)
      return <p>
        Carregando...
      </p>
  
  
  return(
    <div>
      <h1>
        Editar Produto
      </h1>
      {error && <p style={{color: "red"}}>{error}</p>}
    <form onSubmit={handleEdit}>
        <input onChange={(e)=>setProduct({...product,description:e.target.value})} type="text" value={product.description} placeholder="digite a descrição"/>
        {product.description}
        <input onChange={(e)=>setProduct({...product,image:e.target.value})} type="text"  value={product.image}placeholder="insira a imagem"/>
        {product.image}
        <input onChange={(e)=>setProduct({...product,price:e.target.value})} type="number" value={product.price} placeholder="digite o preço"/>
        {product.price}
        <button type="submit">Salvar alterações</button>
    </form>
    </div>
  )
}
 
/* 1
useEffect é usado para manipular o ciclo de vida de um componente


*/

//EXECUÇÃO:
/*
✅ O que está acontecendo nessas duas linhas?
    setProduct(product)
    setIsLoading(false)

1. setProduct(product)
Essa linha atualiza o estado React do componente com os dados do produto que vieram da API.
product é o resultado de response.json(), ou seja, os dados do produto que vieram do backend.
    setProduct(...) salva esses dados no estado local do componente (provavelmente criado com useState):
   const [product, setProduct] = useState({});
2. setIsLoading(false)
Essa linha diz ao React: "terminamos de carregar, pode parar de mostrar o loading".
 isLoading é outro estado, provavelmente assim:

   const [isLoading, setIsLoading] = useState(true);
Ele controla se o componente ainda está esperando os dados da API.
Enquanto isLoading for true, o componente mostra apenas:
   If (isLoading) return <p>Carregando...</p>
🔁 Mas como isso "atualiza" o componente?
React funciona com renderização baseada em estado.

Fluxo completo:
Componente carrega pela primeira vez com:
   product = {} (vazio)
   isLoading = true

Chama getProduct() → faz o fetch().
Quando os dados chegam:
   setProduct(...) → salva os dados recebidos.
   setIsLoading(false) → muda o estado que estava bloqueando a exibição.

O React detecta que o estado mudou (chamadas de setState) e re-renderiza o componente.

Agora o componente mostra:
O formulário com os dados preenchidos do produto.
Nada de <p>Carregando...</p>, porque isLoading é false.

📌 Em resumo:
Linha	Efeito no Componente
 setProduct(product)	Atualiza o conteúdo do formulário
 setIsLoading(false)	Faz o componente parar de mostrar “Carregando...” e renderizar o formulário com os dados


*/