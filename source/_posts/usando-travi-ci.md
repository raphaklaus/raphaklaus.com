---
title: Usando travis-ci para build e automação de testes contínuo
date: 2016-03-02 21:15:59
article: true
tags:
cover: artigos/usando-travi-ci/construction.jpg
---

Eu já me senti como você quando o assunto era testes... ZZzzzzzZ... 
Com o travis-ci tudo fica muito mais facil. Quanto? Quanto essa linha de código abaixo.

<!-- more -->

> Ahh.. Terei que criar os testes, e depois rodar, grande coisa... Depois tenho que ficar rodando ele no servidor... 

```javascript
  var asd = '';
```


## Configurando o .travis.yrl

Antes de começarmos é **importante** saber qual linguagem está usando, qual sistema de build e se todas as dependências estão apontadas corretamente.

```javascript
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data)
  }

  // Number of active Ajax requests
  $.active = 0

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
  }

```

loremLorem ipsum dolor sit amet, consectetur adipisicing elit. Dare naturales fugiendus late iudex praeclare maestitiam campum. Nulli faciendum maxime faciam theseo novi dicunt beata discidia, summam ait democritea probatum debet. Beatae vi dum negarent, admirer bonas evertitur ultimum scriptum petentium velint collegisti modis, dividendo avocent tradit, invidus persequeris admonitionem.

![](/artigos/usando-travi-ci/construction.jpg)

Nulli faciendum maxime faciam theseo novi dicunt beata discidia, summam ait democritea probatum debet. Beatae vi dum negarent, admirer bonas evertitur ultimum scriptum petentium velint collegisti modis, dividendo avocent tradit, invidus persequeris admonitionem.

<!-- ![Teste](traviscimeme.png) -->