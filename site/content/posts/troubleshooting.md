---
title: "Troubleshooting - A valuable skill"
date: 2016-03-10 23:39:48
cover: /troubleshooting.jpg
summary: "Somewhere in time, you changed a line of code and then your feature or test just broke and you couldn't manage to trace the problem? Or maybe you've installed a plugin and it didn't work as intended. I'll bring you some useful tips."
---

Somewhere in time, you changed a line of code and then your feature or test just broke and you couldn't manage to trace the problem? Or maybe you've installed a plugin and it didn't work as intended. I'll bring you some useful tips.

There are some scenarios when this skill is valuable and for each, there is a different approach. Let's put up some:

You're installing that new awesome framework. You've just followed all the steps in the documentation, but it doesn't work!

## Understand if there is an environment problem

In Linux, some commands must be run as super user, using **su** in front of them. It can sound silly, but sometimes it's not mentioned in the docs.

Entender se a documentação/tutorial foi pensada no seu ambiente atual é importante para tentar passar por cima dessas situações.

## Dica de ouro: pesquise no GitHub

Uma das maneiras mais eficientes de se solucionar um problema é saber como alguém que teve sucesso fez.

{{< figure src="/github-search.png" alt="Resultado de uma pesquisa do GitHub" >}}

Na parte superior esquerda do [GitHub](http://github.com) tem um campo para busca. Use esse campo com os trechos referentes à ferramenta que está tendo problema e encontre milhares de códigos que também a usam. Assim você poderá ver se tem alguma diferença que faz esse código funcionar e o seu não. Pode até mesmo baixar o repositório e testar em seu ambiente!

## O mais comum: você pode ter mudado algo no código sem perceber

Nessa situação, o melhor a se fazer é voltar a um ponto do código que você **sabe** que tudo funcionava conforme o esperado, e ir adicionando sua funcionalidade linha à linha. Em algum momento seu código vai quebrar e você estará mais perto de saber o porquê.

Se você não entende o motivo da linha que causa o problema fazer seu código parar, é porque provavelmente é uma função que **esconde comportamentos encapsulados**. Você terá que compreender o que a função está fazendo. A melhor forma é abrir essa função e estudá-la, ou se for de terceiros (biblioteca, plugin, etc), procure a documentação na internet.

## Dependência atualizada

99% dos projetos utilizam dependências, e se você for minimamente organizado estará usando um gerenciador de dependências (packages.json, gemfile, etc).

Às vezes a quebra vem de fora. Pode ser uma mudança de API, de parâmetro ou mesmo de estrutura. Recomendo **sempre versionar** o arquivo que guarda as dependências, e guardar a dependência **com a versão citada explicitamente**, assim você terá um histórico de alteração.

Nunca subestime essa possibilidade, você pode perder muito tempo. Esse tipo de problema é muito comum em projetos com mais de 10 dependências.

## Seja um bom debugger

Nem sempre é facil encontrar a causa do problema. Mas fica mais simples quando o desenvolvedor sabe usar as ferramentas certas. Use **breakpoints** em conjunto com **watches** e monitore o fluxo do código. É fundamental entender o que no seu sistema acontece **em paralelo** para poder monitorar esta área também.

Se você se sente confiante em debugar com ``alert`` ou ``console.log``, vá em frente. Mas sempre há a possibilidade disso sem querer subir para produção. Além do mais, uma ferramenta de debug dá ao desenvolvedor um ambiente muito mais preciso para localização de bugs e situações, como **breakpoint condicional** e visualização da **call stack**.

## Comece do zero

Uma técnica que já me ajudou muito foi a de começar do zero. Ela consiste em pegar o grupo de código/ferramentas que está tentando fazer funcionar, abrir um projeto do zero e codificar de forma mais **unitária** possível, sem dependências desnecessárias, e usando só uma função.

Dessa forma você estará mais seguro que não há conflitos externos ao **conjunto mínimo funcional** e consequentemente encontrará o problema.

## Não fique preso dentro da caixa

Se você não consegue resolver, por que não muda para outra ferramenta? Não pode? Peça ajuda a algum amigo, pergunte no [stackoverflow](http://stackoverflow.com/), nos grupos de Facebook, ou no lindo [Forum Front-End](https://github.com/frontendbr/forum/issues).

O que não pode é enlouquecer.

