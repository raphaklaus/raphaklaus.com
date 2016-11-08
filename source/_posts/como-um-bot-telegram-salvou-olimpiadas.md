---
title: "Como um Bot de Telegram salvou as Olimpíadas Rio 2016"
article: true
date: 2016-11-05
tags: rio2016, rio, telegram, nodejs, javascript, bot, 2016, olimpiadas, olympics, sportv
cover: artigos/como-um-bot-telegram-salvou-olimpiadas/sportv.png
---

Na postagem de hoje vou falar sobre a importância que um Bot de Telegram teve para as Olimpíadas Rio 2016 e os bastidores de seu desenvolvimento.

<!--more -->

![Um celular com o Telegram aberto mostrando o Bot que rodou nas Olimpíadas](/artigos/como-um-bot-telegram-salvou-olimpiadas/sportv.png)

Era Maio de 2016 e [nós](http://lab21k.com.br) recebemos um requisito do Comitê Olímpico Brasileiro (COB) para criação de um sistema automatizado de distribuição de informações usando dados dos Centro de Operações do Rio (COR) e do Centro Integrado de Comando e Controle (CICC) para as Olimpíadas Rio 2016 com as API's Telegram Messenger e Telegram Bot.

Bom, eu nunca tinha mexido com APIs do Telegram. Muito menos com bots. Mas o resultado foi isso aqui: [Link da matéria do SporTV onde o bot aparece](http://sportv.globo.com/videos/sportv-news/t/ultimos/v/tecnologia-auxilia-nos-treinos-do-time-brasil/5111617/)

Usamos [essa](https://github.com/Lab21k/node-telegram-bot-api) biblioteca em NodeJS, que é um fork com algumas melhorias que fiz para trabalhar com múltiplos usuários. Esse cara serve para fazer a comunicação com o bot.

Internamente criamos uma biblioteca com métodos promisificados, encapsulamentos, ES6 compatibility, que facilitou trabalhar com bots. Posteriormente iremos publicar no GitHub.

## Como era

A equipe do COB precisava ter uma plataforma para consultar informações relevantes sobre sua operação, facilitar sua equipe a se
conectar rapidamente com grupos específicos de pessoas (criando pequenas e rápidas reuniões a fim de acertar decisões), enviar
avisos globais para todos inscritos, consulta de incidentes abertos enviando coordenadas geográficas, entre outras coisas.

* Permitir pessoas criarem grupos com grupos de pessoas específicas. Ex.: Quero falar com a área médica. Bastava clicar nessa opção e você era inserido no grupo de Telegram só com os médicos a serviço do COB.
(GIF)
* Consulta de resultados de medalhas. Nessa função era consultada a base oficial do COB permitindo escolher qual modalidade e dia.
(GIF)
* Consulta da programação por modalidade e dia.
(GIF)

## Algumas estatísticas

* Número total de usuário que usaram o sistema e o Bot para coordenar seus trabalhos diariamente: **268**

* Grupos criados usando a interface do Bot: **89**

* Total de mensagens trocadas nos grupos: **23985**

## Limitações do Telegram e Desafios enfrentados

Assim como qualquer API, com o Telegram não seria diferente.

Nós precisávamos criar os grupos para conectar as pessoas toda hora que fosse solicitado, porém, em nosso ambiente de testes começamos a tomar um erro chamado `FLOOD_AWAIT` que é um clássico e já era de se esperar.

Se esse erro desse em produção, toda a operação do COB seria arruinada.

A solução foi criarmos um pool de grupos, e conforme o servidor recebesse o comando de "Criar grupo" ele ia nesse pool e pegava o grupo já criado previamente e adicionava as pessoas dentro dele.

Havia também um broadcast de mensagens para todos os envolvidos via Bot. Os Ids dos usuários do Telegram ficavam guardados em outra aplicação. Portanto, usamos a técnica de Pub/Sub tendo o Redis como middleware para comunicar processos diferentes. Na prática, isso era útil para serem tomadas as medidas certas como divulgar para a imprensa quando uma medalha havia entrado, por exemplo.

Tivemos problemas quando muitas Promises ficavam em aberto esperando serem respondidas pelos usuários. Isso fazia com que a performance do Bot caísse de forma impactante. Para resolver isso, criei um gerenciador de Promises em aberto usando `.isPending`. Se tivesse uma Promise aberta por mais de 10 minutos, ele matava. Caso o usuário respondesse a uma Promise morta, o Bot redirecionava o fluxo para o início.

## Quantidade mínima em grupo, integração com chat externo e proteções

Um grupo dentro do pool tinha de ser criado obrigatoriamente com no mínimo 3 usuários. Um usuário Inviter que seria responsável por convidar os participantes para o grupo (esse usuário precisa ter todos os operadores na sua lista de contato, caso contrário não funciona), um bot para pegar as mensagens e mandar para um sistema de mensageria externo e um usuário responsável pela moderação do grupo.

A Integração do que era falado nos grupos com o sistema de mensageria externa ao Telegram só foi possível graças a uma configuração que tem nos bots que se chama `/setprivacy` onde você permite que o bot processe todas as mensagens enviadas.

A autenticação/autorização foi feita toda via backend, onde só liberavamos acesso aos comandos do telegram (`/programacao`, `/resultado`, etc) após verificação do número de celular no banco de dados do sistema externo administrativo. Caso recusado, os **callbacks não eram registrados** para o usuário.

## Stack tecnológica

Feito em NodeJS com banco de dados PostgreSQL e Redis como cache. A aplicação conseguiu responder rapidamente às requisições. Sem gargalos.

Configurações da máquina de produção: 4 cpus e 8gb de RAM.

## Considerações finais

O projeto foi um sucesso.

A velocidade desse projeto (feito praticamente às vésperas dos jogos) é fruto do fato dos Bots solucionarem um tipo específico de problema: Aquele que você precisa processar input e responder para o usuário a informação que ele espera, sem perder tempo e dinheiro projetando UI.
