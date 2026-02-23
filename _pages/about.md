---
permalink: /
title: "About"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

At the intersection of human cognition and artificial systems, I research the foundations of intelligence, reasoning, and decision-making mechanisms.

Biography
------
I am currently pursuing my research as an independent researcher in the Cognitive Science program at Yeditepe University and Computational Intelligence group at Istanbul University.
Prior to that, I worked in industry for 14 years on Machine Learning and Artificial Intelligence; I led teams in Engineering Management and Director of AI Engineering positions and built artificial intelligence systems. In the fast-paced world of industry, my passion for getting to the root of the problem rather than just producing practical solutions led me to academia and independent research.

Publications
------
{% for post in site.publications reversed limit:5 %}<div style="margin-bottom:1.5em;padding-bottom:1.5em;border-bottom:1px solid #eee;">
<h3 style="margin:0 0 0.2em;font-size:1em;"><a href="{{ post.url }}">{{ post.title }}</a></h3>
{% if post.authors %}<p style="margin:0 0 0.15em;font-size:0.85em;">{{ post.authors }}</p>{% endif %}
{% if post.venue %}<p style="margin:0 0 0.4em;font-size:0.8em;font-weight:bold;">{{ post.venue }}{% if post.date %} {{ post.date | date: "%Y" }}{% endif %}</p>{% endif %}
{% if post.tldr %}<p style="margin:0 0 0.5em;font-size:0.85em;"><span style="font-weight:bold;font-variant:small-caps;">tldr</span>&nbsp;&nbsp;{{ post.tldr }}</p>{% endif %}
<p style="margin:0;display:flex;flex-wrap:wrap;gap:0.35em;">{% if post.paperurl and post.paperurl != '' %}<a href="{{ post.paperurl }}" target="_blank" style="display:inline-flex;align-items:center;gap:0.25em;padding:0.15em 0.55em;border:1px solid currentColor;border-radius:4px;font-size:0.78em;text-decoration:none;"><i class="fa fa-file-pdf" aria-hidden="true"></i> PDF</a>{% endif %}{% if post.arxiv and post.arxiv != '' %}<a href="{{ post.arxiv }}" target="_blank" style="display:inline-flex;align-items:center;gap:0.25em;padding:0.15em 0.55em;border:1px solid currentColor;border-radius:4px;font-size:0.78em;text-decoration:none;"><i class="ai ai-arxiv" aria-hidden="true"></i> arXiv</a>{% endif %}{% if post.website and post.website != '' %}<a href="{{ post.website }}" target="_blank" style="display:inline-flex;align-items:center;gap:0.25em;padding:0.15em 0.55em;border:1px solid currentColor;border-radius:4px;font-size:0.78em;text-decoration:none;"><i class="fa fa-globe" aria-hidden="true"></i> Website</a>{% endif %}{% if post.github and post.github != '' %}<a href="{{ post.github }}" target="_blank" style="display:inline-flex;align-items:center;gap:0.25em;padding:0.15em 0.55em;border:1px solid currentColor;border-radius:4px;font-size:0.78em;text-decoration:none;"><i class="fab fa-github" aria-hidden="true"></i> GitHub</a>{% endif %}</p>
</div>{% endfor %}

Posts
------
<ul>
{% for post in site.posts reversed limit:5 %}
<li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>

