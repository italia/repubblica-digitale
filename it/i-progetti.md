---
layout: page
title: I Progetti
lang: it
ref: i-progetti
description: I progetti aderenti al manifesto
order: 6
redirect_from:
  - /i-progetti
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
