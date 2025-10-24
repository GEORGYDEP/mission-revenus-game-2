# 🚀 DÉMARRAGE RAPIDE - Mission Revenus

## ⚡ En 5 minutes chrono !

### Option 1 : Test immédiat en local

1. **Télécharger les fichiers**
   - Télécharger `mission-revenus-game-complet.zip`
   - Extraire dans un dossier

2. **Ouvrir le jeu**
   - Double-cliquer sur `index.html`
   - Le jeu s'ouvre dans votre navigateur

3. **Tester**
   - Email de test : `test.eleve@istlm.org`
   - Jouer aux 4 missions
   - Voir les résultats

✅ **C'est prêt ! Le jeu fonctionne immédiatement !**

---

### Option 2 : Mise en ligne sur GitHub (10 minutes)

#### Prérequis
- Compte GitHub (gratuit) : https://github.com/join

#### Étapes

1. **Créer un nouveau dépôt**
   - Aller sur https://github.com/new
   - Nom : `mission-revenus-game`
   - Public ✅
   - Cliquer "Create repository"

2. **Télécharger les fichiers**
   - Cliquer "uploading an existing file"
   - Glisser tous les fichiers (sauf le .zip)
   - Commit : "Premier commit - Jeu Mission Revenus"

3. **Activer GitHub Pages**
   - Aller dans Settings > Pages
   - Source: Deploy from a branch
   - Branch: main → / (root)
   - Save

4. **Obtenir l'URL**
   - Attendre 1-2 minutes
   - L'URL sera : `https://VOTRE-USERNAME.github.io/mission-revenus-game/`

5. **Partager avec les élèves**
   - Copier l'URL
   - L'envoyer aux élèves
   - Ils peuvent jouer directement !

---

## 📧 Recevoir les résultats (optionnel)

### Configuration simplifiée avec Formspree (2 minutes)

1. **Créer un compte** : https://formspree.io/create

2. **Créer un formulaire**
   - New Form
   - Nom : "Mission Revenus"
   - Email : votre.email@istlm.org

3. **Copier l'URL** 
   - Ex: `https://formspree.io/f/xpzgkdwv`

4. **Modifier config.js**
   ```javascript
   formspreeEndpoint: 'https://formspree.io/f/VOTRE-ID'
   ```

5. **Modifier script.js** (ligne ~337, fonction sendResults)
   - Décommenter le code Formspree
   - Remplacer l'URL

6. **Tester**
   - Jouer au jeu
   - Cliquer "Envoyer résultats"
   - Vérifier votre email !

✅ **Vous recevez maintenant les résultats par email !**

---

## 🎮 Utilisation par les élèves

### Consignes à donner

**Bonjour à tous,**

Voici le jeu éducatif sur le cours "Limites de la Consommation" :

🔗 **Lien du jeu** : [VOTRE-URL-ICI]

**Comment jouer ?**
1. Ouvrir le lien
2. Entrer votre email de l'école : `prenom.nom@istlm.org`
3. Compléter les 4 missions
4. Envoyer vos résultats

**Objectif** : Obtenir au moins 70/100 pour le certificat !

Bon jeu ! 🎓

---

## 🎯 Ce que vous DEVEZ faire

✅ **Indispensable**
- [x] Télécharger les fichiers
- [x] Tester le jeu en local
- [x] Vérifier que tout fonctionne

✅ **Recommandé**
- [ ] Mettre en ligne sur GitHub Pages
- [ ] Configurer Formspree pour recevoir les résultats
- [ ] Tester l'envoi d'email

✅ **Optionnel**
- [ ] Personnaliser les couleurs (style.css)
- [ ] Modifier l'email du professeur (config.js)
- [ ] Ajouter d'autres questions

---

## ❓ Questions fréquentes

**Q: Le jeu fonctionne-t-il sans internet ?**
R: Oui, en local. Mais pour l'envoi des résultats, internet est nécessaire.

**Q: Combien ça coûte ?**
R: Tout est 100% gratuit !

**Q: Puis-je modifier les questions ?**
R: Oui, dans `script.js` et `index.html`.

**Q: Les élèves peuvent-ils tricher ?**
R: Ils peuvent recommencer, mais c'est pour apprendre 😊

**Q: Combien de temps dure le jeu ?**
R: 15-20 minutes pour un élève moyen.

---

## 🆘 Besoin d'aide ?

- 📖 Lire le README.md complet
- 📧 Lire le BACKEND_GUIDE.md pour l'envoi d'emails
- 🌐 Consulter https://docs.github.com pour GitHub Pages

---

**Félicitations ! Votre jeu est prêt ! 🎉**
