---
title: "Callbacks From Hell"
article: true
date: 2016-06-04 21:00:00
tags: callback, nodejs, promises, hell, javascript
cover: artigos/troubleshooting/troubleshooting.jpg
---

Olá, pessoal! Nesse artigo vou falar sobre o famoso Callback Hell e diferentes formas de evita-lo.

## Antes, uma introdução a callbacks

Em desenvolvimento de software chamamos de *callback* funções que são passadas como argumento para outras funções, geralmente para serem
executadas depois de algum processamento. Esse *callback* pode ser executado de forma síncrona ou assíncrona.

### Síncrono

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

### Assíncrono

Um callback do tipo assíncrono tem a ver com eventos que completam-se em um período de tempo *desconhecido* 
(leitura e escrita de arquivo, requisições de todos os tipos e processamento dinâmico). Por isso se passa um callback, que será uma função executada quando a tarefa for finalizada, com sucesso ou erro.

```

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

Para melhorar essa abordagem usa-se [Promises](https://promisesaplus.com/)

### Filtered Catching

### Nativo vs Bibliotecas

### ES7 async/await:

https://tonicdev.com/raphaklaus/async-await
