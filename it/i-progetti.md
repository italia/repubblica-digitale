---
layout: page
title: I Progetti
lang: it
ref: i-progetti
permalink: /it/i-progetti
order: 6
---

{% assign iniziative = site.data.iniziative | sort: "Data Approvazione" | reverse %}
{% assign aderenti = site.data.aderenti.aderenti_manifesto %}

{% include search.html %}

<div class="iniziative-aderenti container mt-4 mb-4">
  <div class="row">
    <div class="col-12">
      <div id="grid" class="row container-iniziative">
        {%- for iniziativa in iniziative  -%}
        {% assign forloop-index=forloop.index0 %}
        {% include card/iniziativa.html iniziativa=iniziativa forloop-index=forloop-index %}
        {%- endfor -%}
      </div>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    window.iniziative = new Iniziative(document.getElementById('grid'));
});
</script>