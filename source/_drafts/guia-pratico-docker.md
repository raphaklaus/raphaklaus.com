---
title: "Guia prático de Docker"
article: true
date: 2017-04-19
tags: docker, container, moby, devops, deploy, guia, tutorial, git
cover: artigos/guia-pratico-docker/whale.jpg
---

É hora de aprender Docker.

<!--more -->

![Uma baleia no oceano](/artigos/guia-pratico-docker/whale.jpg)

## Conceito

Docker é uma solução completa para gerenciamento de containers.

Imagine um container como um separador de serviços. Cada container roda seu próprio conjuntos de bibliotecas e especificações de sistema operacional. A ideia é permitir rodar múltiplos sub sistemas Linux de forma que sejam leves e portáveis em um único host.

Esses containers são baseados em imagens que são como instalações bases para containers (vamos falar disso melhor mais abaixo).

A partir desse ponto, conseguimos ter um container rodando apenas um servidor Apache, outro rodando apenas uma aplicação NodeJS e por aí vai...

Mas aí você pergunta: ** qual a real vantagem de se trabalhar dessa forma? **

* Multiplataforma; roda em Windows 10 (usando Hyper-V ou Virtual Box), MacOS e Linux.

* Efêmero; evitando que manipulações incorretas do container sejam feitas e cause comportamentos inesperados aos serviços em execução, essa característica vem à tona. Toda vez que um container é construído, ele remove todos os dados para instalar a versão original da imagem escolhida.

* Portável; você não fica refém de uma hospedagem ou VPS por já ter tudo configurado. Com containers basta você configurar os arquivos de serviços que seu sistema depende e ele rodará em todos os lugares (SIM, até em Windows Server).

* Velocidade de configuração de ambiente; basta rodar 1 comando para ter todo ambiente pronto para desenvolvimento, teste ou produção.

* Segurança, se um dos seus serviços for comprometido os outros não serão se quer tocados devido a natureza de isolação dos containers

* Variedade de imagens; você pode rodar um NGINX, uma VPN e até um aplicativo desktop. Pra qualquer coisa existe uma imagem de Docker hoje em dia.

* Apoio massivo das empresas e comunidade; com mais de U$ 150.000.000,00 em investimento e mais de 8 Bilhões de pulls no seu registry. Nem preciso dizer mais nada, né?

## Awareness

Eu comecei a me interessar por Docker quando tava trabalhando num projeto que para funcionar corretamente precisava de NodeJS, NGINX, Redis, Java, Elastic Search, PostgreSQL e Postgis... Ufa!

Toda vez que chegava alguém novo na equipe, a pessoa perdia pelo menos 1 dia pra configurar tudo. Ou pior, se aconcetesse algo de ruim com a máquina dela ela perderia metade de um dia para reconfigurar tudo.

Esse foi o ponto inicial que comecei a ver o Docker como uma solução prática para esse tipo de problema. Eu queria com 1 comando ter tudo isso configurado e pronto para começar a desenvolver.

Mais pra frente notei que precisaria pegar essa minha configuração e jogar pro servidor... E aí mais um trabalho chat... Não com o Docker!

Instalei um servidor com Docker e passei as configurações pro meu projeto poder subir e pronto! Tudo online e funcionando.

Outro dia eu e uns amigos estavamos querendo jogar CS em LAN aqui em casa... E advinha :P Subi um servidor de CS usando Docker. Com literalmente uma linha, já tava tudo configurado e rodado... Ah, esse tal de Docker... =)

## Primeiros passos

Vamos fazer de conta que você tem um projeto que rode um backend em Ruby on Rails, com banco de dados em MySQL e um NGINX para servir o conteúdo estático.

Primeiro de tudo você terá de achar as imagens desses serviços no
[Docker Hub](https://hub.docker.com/) um registry para imagens de Docker.

Usando a busca desse site, você conseguirá para cada, achar a imagem oficial.

* [Ruby](https://hub.docker.com/_/ruby/) (através dele instalaremos o Rails)

* [NGINX](https://hub.docker.com/_/nginx/)

* [MySQL](https://hub.docker.com/_/mysql/)

Repare que em todos as 3 páginas tem escrito em cima "OFFICIAL REPOSITORY". Priorize imagens oficiais pois elas são otimizadas e mantidas pelos criadores dos respectivos serviços.

### Dockerfile

### Docker Compose

<br/>
---Part2

## Gerenciamento

### Monitoramento

### Deploy

### Backup

## Clusterização com Docker Swarm

## Segurança

## IPv6
