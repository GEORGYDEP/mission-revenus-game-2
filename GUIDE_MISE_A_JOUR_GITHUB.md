# 🔄 GUIDE : Mettre à jour les fichiers sur GitHub

## 📋 Récapitulatif des modifications

Cette version 1.3 inclut TOUTES les corrections et améliorations :

✅ **Corrections V1.1**
- Mission 3 : Puzzle avec mots mélangés (plus de défi)
- Bouton "Question suivante" (l'élève contrôle le rythme)
- Mission 4 : Score corrigé (25 points max au lieu de 27)

✅ **Nouvelle fonctionnalité V1.3**
- Enregistrement automatique dans Google Sheets
- Support alternatif de Formspree (email)
- Configuration flexible

---

## 📥 ÉTAPE 1 : Télécharger les fichiers mis à jour

**Téléchargez cette archive complète :**
[MISSION-REVENUS-FINAL-V1.3.zip](computer:///mnt/user-data/outputs/MISSION-REVENUS-FINAL-V1.3.zip)

**Contient :**
- ✅ index.html (corrigé)
- ✅ style.css (avec nouveau bouton)
- ✅ script.js (toutes corrections + Google Sheets)
- ✅ config.js (configuration)
- ✅ README.md (documentation)
- ✅ CONFIG_GOOGLE_SHEETS.md (guide Google Sheets)
- ✅ CONFIG_EMAIL_GUIDE.md (guide Formspree alternatif)
- ✅ Autres fichiers de documentation

**Extraction :**
1. Double-cliquez sur le fichier ZIP
2. Extrayez tous les fichiers dans un dossier
3. Notez l'emplacement du dossier

---

## 🔄 ÉTAPE 2 : Mettre à jour sur GitHub (Méthode simple)

### Option A : Via l'interface web GitHub (RECOMMANDÉ - 5 minutes)

#### 1. Aller sur votre dépôt

Allez sur : https://github.com/GEORGYDEP/mission-revenus-game

#### 2. Supprimer les anciens fichiers

Pour chaque fichier à mettre à jour (index.html, style.css, script.js) :

1. Cliquez sur le nom du fichier
2. Cliquez sur l'icône **poubelle** 🗑️ en haut à droite
3. Scrollez vers le bas
4. Dans "Commit changes", écrivez : `Suppression ancienne version`
5. Cliquez sur **"Commit changes"**

**Fichiers à supprimer :**
- index.html
- style.css  
- script.js
- config.js (si existant)

#### 3. Ajouter les nouveaux fichiers

1. Retournez sur la page principale de votre dépôt
2. Cliquez sur **"Add file"** > **"Upload files"**
3. Glissez TOUS les fichiers du dossier extrait :
   - index.html
   - style.css
   - script.js
   - config.js
   - README.md
   - CONFIG_GOOGLE_SHEETS.md
   - CONFIG_EMAIL_GUIDE.md
   - DEMARRAGE_RAPIDE.md (optionnel)
   - CONTENU_PEDAGOGIQUE.md (optionnel)
   - CORRECTIONS_V1.1.md (optionnel)

4. Dans "Commit changes", écrivez :
   ```
   Version 1.3 - Corrections + Google Sheets
   
   - Puzzle mélangé (Mission 3)
   - Bouton Question suivante
   - Score Mission 4 corrigé (25 pts)
   - Enregistrement Google Sheets
   - Support Formspree
   ```

5. Cliquez sur **"Commit changes"**

#### 4. Vérifier la mise à jour

1. Attendez 1-2 minutes
2. Allez sur : `https://georgydep.github.io/mission-revenus-game/`
3. Testez le jeu pour vérifier les corrections

---

## 🔄 ÉTAPE 3 : Activer GitHub Pages (si pas déjà fait)

Si votre jeu n'est pas encore en ligne :

1. Dans votre dépôt, cliquez sur **Settings**
2. Dans le menu de gauche, cliquez sur **Pages**
3. Sous "Source" :
   - Branch : **main**
   - Folder : **/ (root)**
4. Cliquez sur **"Save"**
5. Attendez 1-2 minutes
6. Votre jeu sera accessible à : `https://georgydep.github.io/mission-revenus-game/`

---

## 📊 ÉTAPE 4 : Configurer Google Sheets (IMPORTANT)

Maintenant que les fichiers sont en ligne, vous devez configurer Google Sheets pour recevoir les résultats.

### Configuration rapide (10 minutes)

Suivez le guide complet : **CONFIG_GOOGLE_SHEETS.md**

**Résumé des étapes :**

1. **Créer Google Sheets**
   - Aller sur https://sheets.google.com
   - Créer une nouvelle feuille
   - Ajouter les en-têtes : Date | Heure | Nom | Email | Mission 1 | Mission 2 | Mission 3 | Mission 4 | Total

2. **Créer le script**
   - Extensions > Apps Script
   - Copier le code fourni dans CONFIG_GOOGLE_SHEETS.md
   - Enregistrer

3. **Déployer**
   - Déployer > Nouveau déploiement
   - Type : Application Web
   - Accès : Tout le monde
   - Copier l'URL obtenue

4. **Mettre à jour config.js sur GitHub**
   - Aller sur votre dépôt GitHub
   - Cliquer sur **config.js**
   - Cliquer sur l'icône **crayon** ✏️ (Edit)
   - Trouver la ligne : `customAPI: ''`
   - Remplacer par : `customAPI: 'VOTRE-URL-GOOGLE-SHEETS'`
   - Commit changes

5. **Tester**
   - Jouer au jeu
   - Envoyer les résultats
   - Vérifier votre Google Sheets → Une ligne devrait apparaître !

---

## ✅ Checklist complète

**Mise à jour GitHub :**
- [ ] Archive téléchargée et extraite
- [ ] Anciens fichiers supprimés sur GitHub
- [ ] Nouveaux fichiers uploadés sur GitHub
- [ ] Commit effectué avec message descriptif
- [ ] GitHub Pages activé
- [ ] Site accessible à l'URL

**Configuration Google Sheets :**
- [ ] Feuille Google Sheets créée
- [ ] En-têtes configurés
- [ ] Script Apps Script créé
- [ ] Application web déployée
- [ ] URL copiée
- [ ] config.js mis à jour avec l'URL
- [ ] Test effectué → Résultats reçus ✅

**Test final :**
- [ ] Jeu accessible en ligne
- [ ] Connexion avec email @istlm.org fonctionne
- [ ] Mission 3 : Puzzle bien mélangé
- [ ] Bouton "Question suivante" présent
- [ ] Mission 4 : Score max = 25 points
- [ ] Envoi des résultats → Ligne ajoutée dans Google Sheets

---

## 🎯 URLs importantes

**Votre dépôt GitHub :**
https://github.com/GEORGYDEP/mission-revenus-game

**Votre jeu en ligne :**
https://georgydep.github.io/mission-revenus-game/

**Google Sheets :**
https://sheets.google.com

---

## 💡 Conseils

### Pour modifier un fichier directement sur GitHub

Au lieu de supprimer/réuploader, vous pouvez éditer directement :
1. Cliquer sur le fichier
2. Cliquer sur l'icône **crayon** ✏️
3. Modifier le contenu
4. Commit changes

### Pour voir l'historique des versions

1. Dans votre dépôt, cliquez sur un fichier
2. Cliquez sur **History** en haut à droite
3. Vous verrez toutes les modifications

### Sauvegarde locale

Gardez toujours une copie des fichiers sur votre ordinateur. Si vous devez recommencer, vous aurez la bonne version.

---

## ❓ Questions fréquentes

**Q: Combien de temps pour que les modifications apparaissent en ligne ?**
R: 1-2 minutes après le commit. Rafraîchissez la page avec Ctrl+F5.

**Q: Puis-je tester en local avant de mettre sur GitHub ?**
R: Oui ! Double-cliquez sur index.html pour ouvrir le jeu dans votre navigateur.

**Q: Comment revenir à une version précédente ?**
R: Dans GitHub, cliquez sur "History", trouvez la version, cliquez sur "...", puis "Revert".

**Q: Les élèves verront-ils les changements automatiquement ?**
R: Oui, dès que vous committez sur GitHub. Ils devront juste rafraîchir la page (F5).

**Q: Dois-je reconfigurer Google Sheets à chaque mise à jour ?**
R: Non ! Une fois configuré, Google Sheets continuera à fonctionner même après les mises à jour.

---

## 🚀 Vous êtes prêt !

Suivez ces étapes dans l'ordre et votre jeu sera parfaitement mis à jour avec toutes les corrections et la nouvelle fonctionnalité Google Sheets.

**Bon courage ! 🎓**

---

**Version du guide :** 1.3  
**Date :** 24 octobre 2025
