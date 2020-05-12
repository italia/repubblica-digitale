---
layout: page
title: I progetti
lang: it
ref: i-progetti
permalink: /it/i-progetti
order: 6
---

{% assign iniziative = site.data.iniziative | sort: "Data Approvazione" | reverse %}
{% assign aderenti = site.data.aderenti_manifesto_rd.aderenti_manifesto %}

<div class="iniziative-aderenti container mt-4 mb-4">
  <div class="row">
    <div class="col col-lg-10 small">
      <h3 class="mt-2 mb-3">{{ iniziative.size }} progetti </h3>
    </div>
    <div class="col-12">
      <div class="row">
        {%- for iniziativa in iniziative  -%}
        {% assign forloop-index=forloop.index0 %}
        {% include card/iniziativa.html iniziativa=iniziativa forloop-index=forloop-index %}
        {%- endfor -%}
      </div>
    </div>
  </div>
</div>