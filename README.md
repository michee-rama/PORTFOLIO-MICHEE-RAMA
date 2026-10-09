# Portfolio Michee Rama | Software Engineer

Site statique (HTML5, CSS3, JavaScript natif). Aucun backend, aucun build, aucune dépendance à installer.

## Structure

```text
portfolio-michee-rama/
├── index.html
├── vercel.json
├── README.md
└── assets/
    ├── css/ (style.css, responsive.css)
    ├── js/  (main.js, theme.js)
    └── images/ (favicon.svg, projects/, profile/michee-rama.webp + .jpg)
```

## Personnaliser

Dans `assets/js/main.js`, renseignez l'objet `CONFIG.project` :

- `github` : lien du dépôt du projet de pointage biométrique
- `demo` : lien de démonstration

Une valeur vide masque simplement le bouton. Pensez à compresser vos images (WebP, moins de 200 Ko).

Vérifiez aussi la liste des technologies du projet de pointage biométrique dans `index.html` (section `#projets`) pour qu'elle reflète exactement ce que vous avez utilisé.

## Tester en local

Ouvrez `index.html` dans un navigateur, ou lancez un serveur statique :

```bash
python3 -m http.server 8000
```

Puis visitez http://localhost:8000.

Liste de contrôle : menu mobile (réduire la fenêtre sous 820 px), bouton de thème, liens WhatsApp / appel / Facebook / TikTok, navigation au clavier.

## Déployer sur Vercel

**Via GitHub**

1. Créez un dépôt et poussez le dossier (`git init`, `git add .`, `git commit`, `git push`).
2. Sur vercel.com : *Add New → Project*, importez le dépôt.
3. Framework Preset : **Other**. Laissez vides *Build Command* et *Output Directory*. Cliquez sur *Deploy*.

**Via la CLI**

```bash
npm i -g vercel
cd portfolio-michee-rama
vercel        # prévisualisation
vercel --prod # production
```

Après publication, ouvrez l'URL et vérifiez que le CSS, le JavaScript et le favicon se chargent.

## Remarques

- Les logos de technologies viennent du CDN Devicon (version fixée, via jsDelivr) ; un logo qui ne se charge pas est simplement retiré, le texte reste.
- Les animations respectent « réduire les animations » du système.
- La police Bricolage Grotesque vient de Google Fonts ; une police système prend le relais si elle ne charge pas.
- Aucun formulaire de contact : les messages passent par WhatsApp ou le téléphone.
- Votre portrait est dans `assets/images/profile/` (WebP + JPEG de secours) ; remplacez-le en gardant les mêmes noms.
- Ajoutez une image `assets/images/og.png` (1200×630) et la balise `og:image` avec l'URL finale du site pour un aperçu riche sur les réseaux.
