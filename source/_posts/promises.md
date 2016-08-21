---
title: "Callbacks From Hell"
article: true
date: 2016-08-21
tags: callback, nodejs, promises, hell, javascript
cover: artigos/promises/cowboy.jpg
---


Olá, pessoal! Nesse artigo vou falar sobre o famoso Callback Hell e como sair dele via Promises.

<!-- more -->

![Cowboys cavalgando num deserto texano](/artigos/promises/cowboy.jpg)

## Antes, uma introdução a callbacks

Em desenvolvimento de software chamamos de *callback* funções que são passadas como argumento para outras funções, geralmente para serem
executadas depois de algum processamento. Esse *callback* pode ser executado de forma síncrona ou assíncrona.

**Síncrono**

```javascript
  function calculaICMS(valor){
    return valor * 0.19;
  }

  function calculaValorFinal(valor, callback){
    return valor + calculaICMS(valor);
  }

  var sacoLaranja = {
    total: 25
  };

  calculaValorFinal(sacoLaranja.total, calculaICMS);
```

https://gist.github.com/raphaklaus/85c6611c36e557d88cdc83e82f87496d

Observe que tudo é feito "ao mesmo tempo". Essa abordagem é interessante do ponto de vista de design, permitindo facilmente
colocar outra função calculadora de impostos.

```javascript
  function calculaIPI(produto){
    return produto.industrializado ? produto.total * 0.10
    	: 0;
  }

  function calculaValorFinal(produto, callback){
    return produto.total + callback(produto);
  }

  var cadeiraExecutiva = {
    total: 100,
    industrializado: true
  };

  calculaValorFinal(cadeiraExecutiva, calculaIPI);
```

https://gist.github.com/raphaklaus/b469f03088b89fde1ba29b90de675179

É evidente que existem formas melhores de resolver esse tipo de problema. A grande questão neste cenário, é que a função
`calculaValorFinal` não precisa conhecer qual função aplicadora de imposto será adicionada.

**Assíncrono**

Um callback do tipo assíncrono tem a ver com eventos que completam-se em um período de tempo *desconhecido*
(leitura e escrita de arquivo, requisições de todos os tipos e processamento dinâmico). Por isso se passa um callback, que será uma função executada quando a tarefa for finalizada, com sucesso ou erro.

```javascript
getAccess(function() {
  getUsers(function() {
    createProduct({name: 'Mesa'}, function() {
      deleteTemporaryUser(function() {
        console.log('Finalmente terminou!');
      });
    });
  });
});

```

https://gist.github.com/raphaklaus/3d97c09c513db61a2ad02e0354e3c373

Esse tipo de abordagem é chamada de *Pyramid of Hell*, ou mais especificamente *Callback Hell*, que é o contínuo aninhamento de funções. Isso é considerado uma má prática que deixa o código com baixa manutenibilidade.

Para melhorar essa abordagem usa-se [Promises](https://promisesaplus.com/), que nada mais é do que o retorno de um valor futuro.

Em uma requisição HTTP por exemplo, não se sabe quando o retorno acontecerá. Então, para não bloquear o fluxo da aplicação, a Promise adia a execução da função `.then()` que é quando a Promise é *resolvida*.

Criar uma Promise é muito facil, basta envolver o código que deseja adiar a execução com o bloco:

```javascript
return new Promise(function(resolve, reject) {
  // Use a função resolve() quando quiser dizer que a Promise foi resolvida, ou reject() quando quiser explicitar
  // um erro no fluxo
});
```

Um exemplo na prática:

```javascript
function numeroPar(numero) {
  return new Promise(function(resolve, reject)  {
    setTimeout(function() {
      if (numero % 2 === 0)
        resolve();
      else
        reject(new Error('Não é um número par');
    }, 2000);
  });
}
```

https://gist.github.com/raphaklaus/c2ed229685380358e1cc9f5fb795b1c2

Imagine que essa função `numeroPar` é chamada quando alguém realiza um *GET* num servidor hipotético (por isso uso timeOut para simular uma demora na resposta).

Se o número passado por parametro for par, causará a Promise *resolução*, caso contrário, retornará um erro, que cairá no `catch`:


```javascript
// localhost/numeroPar&numero=2
function getNumeroPar(res, req, next) {
  numerpPar(req.params.numero).then(function(){
    res.send('É par!');
  })
  .catch(function(){
    res.send('É ímpar!');
  });
}

```

## Nativo vs Bibliotecas

Existem formas diferentes de se criar Promises. A Nativa do ES6 que mostrei acima e usando bibliotecas que estendem e melhoram funcionalidades. **Recomendo** o [Bluebird](http://bluebirdjs.com/) com toda a força porque tem uma abordagem mais direta e é muito poderoso, além de ser usado pela maioria dos grandes e pequenos projetos.

Existe também a [q](https://github.com/kriskowal/q).

## Filtered Catching

Existe um recurso muito interessante que permite tratar os erros das promises da mesma forma que se trata exceções e de *forma controlada*! Essa funcionalidade pode ser usada com o bluebird.

```javascript
  // Suponha que temos uma função que tenta realizar um POST
  criaUsuario()
    .then(function(usuario){
      console.log('Usuário criado:', usuario);
    })
    .catch(PermissionDeniedError, function(error){
      console.log('Credenciais incorretas');
      // Faz tratamento para permissão negada...
    })
    .catch(UserAlreadyExists, function(error){
      console.log(error.message);
      // Faz tratamento específico para usuário já existe...
    });
```

E as classes de erro ficam mais ou menos assim:

```javascript
class PermissionDeniedError extends Error {
  constructor() {
    super('Credenciais incorretas');
    this.name = 'PermissionDeniedError';
  }

class UserAlreadyExists extends Error {
  constructor() {
    super('Usuário já existe');
    this.name = 'UserAlreadyExists';
  }
```

## Promisify

É uma técnica incrível para transformar funções com assinatura de callback `function(error, data)` em promises.

```javascript
fs.readFile('example.json', function(error, data){
  if (error) console.log(error.message);
  console.log(data);
})
```

Agora promisificado usando o bluebird:

```javascript
  var readFile = Promise.promisify(require("fs").readFile);

  readFile('example.json')
    .then(function(data){
      console.log(data);
    })
    .catch(function(error){
      console.log(error.message);
      // E trata o erro...
    });
```

## Rodando promises em série e obtendo output final

Há cenários que se precisa rodar x tarefas em série, ou seja, uma depois da outra. Vou usar a notação de [Arrow Functions](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions) do ES6 que faz as coisas menos verbosas.

```javascript
  // Faça de conta que as funções abaixo existem. Elas são auto explicativas
  uploadFile()
    .then(result => getUploadedInfo(result))
    .then(info => sendToAnalytics(info));
```

E também cenários que é necessário rodar tudo em paralelo, mas fazer algo no final, vá com o `Promise.all(array)`

```javascript
  // Imagine que exista uma função promise que faz upload de
  // arquivos chamada fazUpload()

  var promiseArray = [];

  for (var arquivo of arquivos) {
    promiseArray.push(fazUpload(arquivo.data));
  }

  Promise.all(promiseArray).then(function(result){
    console.log('Todos os arquivos foram enviados com sucesso!');
  })
```

Simples, não? :)

## Performance

Promises se mal gerenciadas podem causar um gargalo absurdo na aplicação já que são mais custosas para processar do que callbacks puros. É bom ter cuidado com o número de promises pendentes no sistema.

Uma forma facil de detectar esse tipo de problema em sua aplicação é observar o status de todas as promises, quais estão pendentes por mais tempo através da propriedade `isPending()` caso esteja usando o bluebird.


### ES7 async/await:

Pense nestas funcionalidades numa forma de escrever uma Promise mais inline. Isso faz parte do conjuntos de features das especificações do EcmaScript 7 e só está disponível usando [Babel](https://babeljs.io/). VEjam como fica uma requisição usando async/await

```javascript
  // É necessário marcar que a função é do tipo async
  async getPosts() {
    let posts = await request('/posts');
    console.log('Aqui estão os posts', posts);
  }
```

Explicando: Quando e onde essa função for invocada, no seu escopo interno ela ficará "bloqueada"
por causa do await, esperando ele terminar para poder logar os posts. Já escopo externo, o fluxo não é interrompido e tudo continua correndo independente do que está acontecendo dentro da função async.

Vou deixar um exemplo prático também: https://tonicdev.com/raphaklaus/async-await
