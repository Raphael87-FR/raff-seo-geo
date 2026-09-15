# Contexte produit et décisions du propriétaire

Atlas est une application gratuite de prise de notes. Public francophone ; objectif du site : permettre de comprendre le fonctionnement puis télécharger l'application. Pages importantes : `/`, `/download/`, `/help/`. Moteurs dans le périmètre : Google Search et ChatGPT Search.

Les fichiers de `public/` sont le code local au 15 septembre 2026. Le site utilise des répertoires avec `index.html` pour les URL terminées par `/`. Aucun accès à la production, aux journaux, ni aux données d'indexation ou de trafic n'est disponible. Les captures sous `evidence/` sont les seuls éléments sur la production.

Faits produit fournis par le responsable : Atlas 2 fonctionne entièrement hors ligne après installation pour écrire et consulter ses notes. Aucune connexion permanente n'est nécessaire. La route de téléchargement est `/download/`. Aucune route `/install/` n'existe et aucune redirection ne la remplace.

Décisions du 2 septembre 2026 :

- RSG-003 : proposition de trente pages par variante de requête refusée ; pas de besoins différents identifiés. Ce choix reste en vigueur.
- RSG-005 : blog reporté jusqu'à la fin de la correction de la documentation existante. Cette condition n'est pas encore remplie.

`public/llms.txt` a été créé après le précédent audit. Le lecteur interne de documentation de l'équipe l'utilise maintenant comme index de liens ; cet usage non-Search doit être préservé. Nous n'avons mesuré aucun effet SEO/GEO de ce fichier.
