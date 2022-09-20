let contador=0
let soma=0

function dividirCategorias(array){
    let categorias={}
    for (produto of array){
        if (Object.keys(categorias).includes(produto.tag[0])){
            categorias[produto.tag].push(produto)
        }
        else{
            categorias[produto.tag]=[produto]
        }
    }
    renderizarCategorias(categorias,array)
}

function renderizarCategorias(obj,array){
    const categorias=document.querySelector('.lista-Produtos')
    for (categoria in obj){
        const ul=document.createElement('ul')
        const h2=document.createElement('h2')
        
        ul.classList.add(`${categoria.toLowerCase()}`)
        h2.innerText=`${categoria}`
        
        categorias.append(h2,ul)
    }
    renderizarProdutos(obj,array)
}

function renderizarProdutos(obj,array){
    for (categoria in obj){
        const ul=document.querySelector(`.${categoria.toLowerCase()}`)
        for (produto of obj[categoria]){
            //console.log(produto)

            const item=document.createElement('li')
            const div=document.createElement('div')
            const imagem=document.createElement('img')
            const produtoNome=document.createElement('h3')
            const produtoCategoria=document.createElement('p')
            const produtoPreco=document.createElement('p')
            const produtoDescricao=document.createElement('p')
            const button=document.createElement('button')

            produtoCategoria.innerText=`${produto.tag}`
            imagem.src=produto.img
            produtoNome.innerText=produto.nameItem
            produtoDescricao.innerText=produto.description
            produtoPreco.innerText=`R$: ${produto.value.toFixed(2)}`
            produtoCategoria.classList.add('cat')
            item.classList.add('produtos')
            div.classList.add('img-produto')
            button.innerText=`${produto.addCart}`
            button.id=(`pro_${produto.id}`)
            button.classList.add('produto')

            div.append(imagem)
            item.append(div,produtoCategoria,produtoNome,produtoDescricao,produtoPreco,button)
            ul.append(item)
            
        }
    }
    eventosDosBotoes(array)
}

function eventosDosBotoes(array){
    let botoesProdutos=document.querySelectorAll('.produto')
    for (let i=0; i<botoesProdutos.length; i++){
        botoesProdutos[i].addEventListener('click',function(event){
            let botao=event.target
            adicionarCarrinho(botao,array)
        })
    }
}

function adicionarCarrinho(obj,array){  
    for (let i=0;i<array.length;i++){
        if (`pro_${array[i].id}`==obj.id){
            item=array[i]
        }     
    }  

    produtoExiste(obj)

    somaProdutos(item)

    let produtoCarrinho=document.querySelector('.cart-list')

    let produto=document.createElement('li')
    let divImagem=document.createElement('div')
    let imagem=document.createElement('img')
    let divProduto=document.createElement('div')
    let nomeProduto=document.createElement('h3')
    let quantidadeProduto=document.createElement('p')
    let valorProduto=document.createElement('p')
    let removerProduto=document.createElement('button')

    produto.classList.add('produtos')
    divImagem.classList.add('img-produto')
    imagem.src=item.img
    divProduto.classList.add('produtos-info')
    nomeProduto.innerText=item.nameItem
    quantidadeProduto.innerText=`Quantidade: ${1}`
    valorProduto.innerText=`R$: ${item.value.toFixed(2)}`
    removerProduto.innerText='Remover produto'
    removerProduto.id=(`${obj.id}`)
    removerProduto.addEventListener('click',subtraiProduto)

    divImagem.append(imagem)
    divProduto.append(nomeProduto,quantidadeProduto,valorProduto,removerProduto)
    produto.append(divImagem,divProduto)
    produtoCarrinho.append(produto)
}

function produtoExiste(obj){
    console.log(obj)
    let botoes=document.querySelectorAll('.carrinho ul button')
    if (botoes.length>0){
        for (botao in botoes){
            console.log(botoes[botao].id)
        }
    }
    else{
        console.log('primeiro produto')
    }
    
}

function somaProdutos(obj){
    contador++

    let carrinhoVazio=document.querySelector('.vazio')

    if (contador>0){
        carrinhoVazio.classList.add('escondido')
    }

    soma+=obj.value
    let quantidade=document.querySelector('.quantidade')
    let total=document.querySelector('.valor')

    quantidade.innerText=contador
    total.innerText=`R$: ${soma.toFixed(2)}`
}

function subtraiProduto(event){
    let idProduto=(event.path[0].id).substring(4)
        for(let i=0;i<data.length; i++){
            if (idProduto==data[i].id){
                soma-=data[i].value
                contador--

                let carrinhoVazio=document.querySelector('.vazio')

                if(contador==0){
                    carrinhoVazio.classList.remove('escondido')
                }

                let quantidade=document.querySelector('.quantidade')
                let total=document.querySelector('.valor')

                quantidade.innerText=contador
                total.innerText=`R$: ${soma.toFixed(2)}`
            }
        }        
        event.path[2].remove()
}

let busca= document.querySelector('.pesquisar')
busca.addEventListener('click',clickBusca)
let input= document.querySelector('form input')

function clickBusca(event){
    let listaDeProdutos=document.querySelector('.lista-Produtos')
    let produtosEncontrados=[]
    listaDeProdutos.innerHTML=''
    event.preventDefault()
    event.stopPropagation()
    let produto=input.value
    for (let i=0; i<data.length ; i++){
        if (data[i].nameItem.toLowerCase().includes(produto.toLowerCase())){
            
            produtosEncontrados.push(data[i])
        }
    }
    if(produtosEncontrados.length==0){
        let h2=document.createElement('h2')

        h2.innerText=(`Nenhum item ${produto} encontrado`)

        listaDeProdutos.append(h2)
    }
    dividirCategorias(produtosEncontrados)
}

let botoesNav=document.querySelectorAll('nav button')
//console.log(botoesNav)
for (let botao of botoesNav){
    botao.addEventListener('click',function(event){
        let listaDeProdutos=document.querySelector('.lista-Produtos')
        listaDeProdutos.innerHTML=''
        let categorias={}
        let categoria=event.currentTarget.innerText
        categorias[categoria]=[]
        if(categoria=='Todos'){
            dividirCategorias(data)
            let input=document.querySelector('form input')
            input.value=''
        }
        else{
            for (let i=0; i<data.length; i++){            
                if (data[i].tag==categoria){
                    categorias[categoria].push(data[i])
                }
                
            }
            renderizarCategorias(categorias,data)
        }
    })
}



dividirCategorias(data)