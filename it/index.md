---
layout: default
title: Homepage
description: Questo è un esempio di homepage con utilizzo del componente "hero"
lang: it
ref: homepage
permalink: /
---

{% include hero.html %}

<main class="container my-4" markdown="1">

{% include posts.html %}



<ul>
{% for iniziative in site.data.iniziative %}
    <li><a href="{{  iniziative["Titolo dell'iniziativa"] | datapage_url: 'iniziativa' }}">{{iniziative["Titolo dell'iniziativa"]}}</a></li>
{% endfor %}
</ul>

</main>

