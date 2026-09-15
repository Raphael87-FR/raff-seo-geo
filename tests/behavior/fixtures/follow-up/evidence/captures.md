# Captures synthétiques fournies

Ces réponses sont des fixtures, pas le résultat d'une visite actuelle par l'agent. Aucun état d'indexation n'est connu.

## 2026-09-01 10:00 UTC — https://atlas-followup.test/help/

HTTP 200, Content-Type: text/html. Extrait :

```html
<link rel="canonical" href="https://atlas-followup.test/help/">
```

## 2026-09-15 08:00 UTC — https://atlas-followup.test/help/

HTTP 200, Content-Type: text/html. Extrait :

```html
<link rel="canonical" href="https://atlas-followup.test/archive/">
<a href="/install/">Installer Atlas</a>
<p>Une connexion Internet permanente est obligatoire pour écrire et lire vos notes.</p>
```

## 2026-09-15 08:01 UTC — https://atlas-followup.test/download/

HTTP 200, Content-Type: text/html. Extrait :

```html
<meta name="robots" content="noindex">
<h1>Télécharger Atlas 2</h1>
```

## 2026-09-15 08:02 UTC — https://atlas-followup.test/install/

HTTP 404, pas de redirection. Corps : page introuvable.

## 2026-09-15 08:03 UTC — https://atlas-followup.test/

HTTP 200, Content-Type: text/html. Même contenu que public/index.html. Pas de X-Robots-Tag observé.
