---
title: "Troubleshooting em programação: Você sabe como está o seu nível nesta habilidade?"
article: true
date: 2016-03-10 23:39:48
tags: troubleshooting, programação, solução
cover: artigos/troubleshooting/troubleshooting.jpg
---

Já aconteceu de você modificar umas linhas de código e mais para frente o teste/funcionalidade quebrar e você não conseguir rastrear bem o que causou?

<!-- more -->

Ou então instalar um novo plugin e não funcionar de jeito nenhum. Mesmo seguindo todos os passos da documentação? Vou deixar algumas dicas uteis nesse artigo.

<!-- ## Construindo cenários -->

Existem diversos cenários em que essa habilidade é valiosa, e para cada um desses uma abordagem diferente deve ser tomada. Vou levantar alguns:

![Rapaz tentando resolver problema em um Mac](/artigos/troubleshooting/troubleshooting.jpg)
<!-- ## 1º cenário: colocando novo recurso para funcionar pela 1ª vez -->

Lá está você instalando aquele novo framework maravilhoso que vai resolver todos os seus problemas. Você segue todos os passos da documentação e dos tutoriais, porém não funciona.

## Entender se o problema é específico do seu ambiente

Por exemplo, no Linux alguns comandos precisam ser executados com **su** na frente. Esse tipo de detalhe pode ser o que faltava na documentação, e para fazer o seu sistema rodar. 

Entender se a documentação/tutorial foi pensada no seu ambiente atual é importante para tentar passar por cima dessas situações.

## Dica de ouro: pesquise no Github

Uma das maneiras mais eficientes de se solucionar um problema é saber como alguém que teve sucesso fez.

![Resultado de pesquisa do GitHub](/artigos/troubleshooting/github-search.png)

Na parte superior esquerda do [GitHub](http://github.com) tem um campo para busca. Use esse campo com os trechos referentes à ferramenta que esta tendo problema e encontre milhares de códigos que também a usam. Assim você poderá ver se tem alguma diferença que faz esse código funcionar e o seu não. Pode até mesmo o repositório e testar em seu ambiente!

## O mais comum: você pode ter mudado algo no código sem perceber

Nessa situação, o melhor a se fazer é voltar a um ponto do código que você **sabe** que tudo funcionava conforme o esperado, e ir adicionando sua funcionalidade linha à linha. Em algum momento seu código vai quebrar e você estará mais perto de saber o porquê.

Se você não entende o motivo da linha que causa o problema fazer seu código parar, é porque provavelmente é uma função que **esconde comportamentos encapsulados**. Você terá que compreender o que a função está fazendo. A melhor forma é abrir essa função e estuda-la, ou se for de terceiros (biblioteca, plugin, etc), procure a documentação na internet.

## Dependência atualizada

99% dos projetos utilizam dependências, e se você for minimamente organizado estará usando um gerenciador de dependências (packages.json, gemfile, etc).

Às vezes a quebra vem de fora. Pode ser uma mudança de API, de parâmetro ou mesmo de estrutura. Recomendo **sempre versionar** o arquivo que guarda as dependências, e guardar a dependência **com a versão citada explicitamente**, assim você terá um histórico de alteração.

Nunca subestime essa possibilidade, você pode perder muito tempo. Esse tipo de problema é muito comum em projetos com mais de 10 dependências.

## Seja um bom debugger

Nem sempre é facil encontrar a causa do problema. Mas fica mais facil quando o desenvolvedor sabe usar as ferramentas certas para a