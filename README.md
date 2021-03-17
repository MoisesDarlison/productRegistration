<h1 align="center">Product Resgistration</h1>

<p align="center"> Uma API simples com um catalogo de produtos em suas categorias especificas</p>

### ✅ Features

- [x] CRUD de Produtos
- [x] CRUD de categorias
- [x] Banco de dados NoSQL
- [x] Testes de Integração


## 🛠 Tecnologias
- [x] NodeJs
- [x] Express
- [x] Mongoose
- [x] Jest
- [x] Yup

### Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com) --> No meu caso utilizei o [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Agora com as ferramentas instaladas, vamos executar o back-end:

```bash
# Clone este repositório
git clone <https://github.com/MoisesDarlison/productRegistration>
```

```bash
# instale as dependências
npm install
```
Renomeie o arquivo `Exemples.env` para `.env`  e preencha as variáveis de ambiente.
- OBS: não inserir  a variável `NODE_ENV` para 'test'

```bash
# Execute a aplicação em modo de desenvolvimento
npm run dev
```
```bash
# Executar testes automatizados  - Integração
npm run test
```

## Rotas

### URL Base
 
 `address:port`
 
Tabela de Rotas
  
   * Rota de Categorias
      
      * Nova categoria - `post/categories/` 
        * Enviar no body (name)
      
      * Listar todas as categorias - `get/categories/list`
      
      * Listar os dados de uma única categoria - `get/categories`
           
      * Editar os dados da categoria - `put/categories/__id da categoria__`
        * Enviar na URL o ID da categoria
        * Enviar no body (name)
      
      * Excluir uma categoria - `delete/categories/__id da categoria__`
        
   * Rota de Produtos
      * Novo produto - `post/products`
        * Enviar no body ( title, description, price, category )
      
      * Listar todos os produtos - `get/products/list`
               
      * Listar os dados de único endereço - `get/products/?title=___title a ser pesquisado___` 
              
      * Editar os dados de um endereço - `put/products/___id do produto___`
        * Enviar no body ( title, description, price, category )
        
      * Excluir um endereço - `delete/products/___id do produto___`
        

### Autor
---

<a href="https://github.com/moisesdarlison/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/73721075?s=460&u=d58132c9cde0aef04930daae15da4eb3144bb11b&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Moises Darlison</b></sub></a> 


Feito por Moises Darlison 👋🏽 Entre em contato!</br>
 [![Linkedin Badge](https://img.shields.io/badge/-MoisesDarlison-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/moises-darlison-12833259//)](https://www.linkedin.com/in/moises-darlison-12833259/)
[![Gmail Badge](https://img.shields.io/badge/-moisesdarlison91@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:moisesdarlison91@gmail.com)](mailto:moisesdarlison91@gmail.com)
