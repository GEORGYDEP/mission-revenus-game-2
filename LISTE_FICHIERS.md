# 📦 LISTE DES FICHIERS À UPLOADER SUR GITHUB

## Version 1.3 - Finale et complète

---

## ✅ FICHIERS OBLIGATOIRES (à uploader sur GitHub)

Ces 4 fichiers sont **ESSENTIELS** pour que le jeu fonctionne :

### 1. **index.html** (34 KB)
- Structure HTML du jeu
- Les 4 missions avec toutes les questions
- Interface complète
- **MODIFICATIONS :** Puzzle mélangé, chargement de config.js

### 2. **style.css** (15 KB)
- Design moderne et responsive
- Animations
- Styles pour tous les éléments
- **MODIFICATIONS :** Ajout style bouton .btn-next

### 3. **script.js** (18 KB)
- Logique du jeu
- Calcul des scores
- Gestion des missions
- Envoi des résultats (Google Sheets + Formspree)
- **MODIFICATIONS :** 
  - Bouton "Question suivante"
  - Score Mission 4 corrigé (25 pts)
  - Fonction sendResults() avec Google Sheets
  - Détection automatique de la configuration

### 4. **config.js** (2 KB)
- Configuration du jeu
- URL Google Sheets (à remplir)
- URL Formspree (optionnel)
- **IMPORTANT :** Vous devrez modifier ce fichier après configuration

---

## 📚 FICHIERS DE DOCUMENTATION (recommandés)

Ces fichiers aident à comprendre et configurer le jeu :

### 5. **README.md** (8 KB)
- Documentation technique complète
- Installation et utilisation
- Toutes les fonctionnalités
- FAQ

### 6. **CONFIG_GOOGLE_SHEETS.md** (11 KB) ⭐ IMPORTANT
- Guide complet pour Google Sheets
- Code du script Apps Script à copier
- Instructions étape par étape
- Exemples et FAQ

### 7. **CONFIG_EMAIL_GUIDE.md** (4 KB)
- Alternative avec Formspree (email)
- Si vous préférez recevoir des emails
- Plus simple mais limité (50/mois)

### 8. **GUIDE_MISE_A_JOUR_GITHUB.md** (nouveau)
- Ce guide que vous lisez actuellement
- Comment mettre à jour sur GitHub
- Pas à pas détaillé

---

## 📄 FICHIERS OPTIONNELS (pour référence)

Ces fichiers sont utiles mais pas obligatoires :

### 9. **DEMARRAGE_RAPIDE.md**
- Guide rapide en 5 minutes
- Pour démarrer vite

### 10. **CONTENU_PEDAGOGIQUE.md**
- Détail de toutes les questions
- Correspondance avec le cours
- Validation pédagogique

### 11. **CORRECTIONS_V1.1.md**
- Liste des corrections apportées
- Explications des changements

---

## 🎯 CE QUE VOUS DEVEZ FAIRE

### ÉTAPE 1 : Télécharger l'archive

[Télécharger MISSION-REVENUS-FINAL-V1.3.zip](computer:///mnt/user-data/outputs/MISSION-REVENUS-FINAL-V1.3.zip)

### ÉTAPE 2 : Extraire les fichiers

Double-cliquez sur le ZIP et extrayez tous les fichiers.

### ÉTAPE 3 : Uploader sur GitHub

**MINIMUM (jeu fonctionnel) :**
- index.html
- style.css
- script.js
- config.js

**RECOMMANDÉ (avec documentation) :**
- Tous les fichiers ci-dessus +
- README.md
- CONFIG_GOOGLE_SHEETS.md

**COMPLET (tout) :**
- Tous les fichiers du ZIP

---

## 📊 Récapitulatif des modifications

### Version 1.3 (actuelle)

**Corrections de bugs :**
- ✅ Mission 3 : Puzzle mélangé (pas dans le bon ordre)
- ✅ Bouton "Question suivante" (contrôle du rythme)
- ✅ Mission 4 : Score corrigé (25 pts max)

**Nouvelles fonctionnalités :**
- ✅ Enregistrement Google Sheets
- ✅ Support Formspree (alternatif)
- ✅ Détection automatique de configuration
- ✅ Messages d'erreur explicites

**Améliorations UX :**
- ✅ Meilleur feedback visuel
- ✅ Contrôle élève sur progression
- ✅ Instructions claires

---

## 🔧 Configuration après upload

Après avoir uploadé les fichiers sur GitHub, vous devrez :

### 1. Configurer Google Sheets (RECOMMANDÉ)

Suivez CONFIG_GOOGLE_SHEETS.md :
1. Créer feuille Google Sheets
2. Ajouter script Apps Script
3. Déployer et récupérer URL
4. Modifier config.js avec l'URL

**Temps nécessaire :** 10 minutes

### 2. OU Configurer Formspree (Alternative)

Suivez CONFIG_EMAIL_GUIDE.md :
1. Créer compte Formspree
2. Créer formulaire
3. Récupérer URL
4. Modifier config.js avec l'URL

**Temps nécessaire :** 5 minutes

---

## ✅ Checklist upload GitHub

**Avant upload :**
- [ ] Archive téléchargée
- [ ] Fichiers extraits
- [ ] Fichiers vérifiés (4 minimum)

**Upload :**
- [ ] Aller sur https://github.com/GEORGYDEP/mission-revenus-game
- [ ] Supprimer anciens fichiers (si existants)
- [ ] Upload nouveaux fichiers
- [ ] Commit avec message : "Version 1.3 - Corrections + Google Sheets"

**Après upload :**
- [ ] Attendre 1-2 minutes
- [ ] Tester : https://georgydep.github.io/mission-revenus-game/
- [ ] Vérifier que le jeu fonctionne
- [ ] Configurer Google Sheets
- [ ] Tester l'envoi des résultats

---

## 🎮 Test final

Pour vérifier que tout fonctionne :

1. **Ouvrir le jeu** : https://georgydep.github.io/mission-revenus-game/
2. **Se connecter** : test.eleve@istlm.org
3. **Jouer** : Faire au moins la Mission 3 et 4
4. **Vérifier** : 
   - Mission 3 : Puzzle mélangé ✅
   - Après réponse : Bouton "Question suivante" ✅
   - Mission 4 : Score max 25 pts ✅
5. **Terminer** : Voir les résultats finaux
6. **Envoyer** : Cliquer "Envoyer mes résultats"
7. **Vérifier Google Sheets** : Ligne ajoutée ✅

---

## 📞 Support

Si vous avez des questions :

**Documentation disponible :**
- GUIDE_MISE_A_JOUR_GITHUB.md (ce fichier)
- CONFIG_GOOGLE_SHEETS.md (configuration)
- README.md (documentation technique)

**Problèmes courants :**
- Jeu ne se charge pas → Vérifier GitHub Pages activé
- Résultats non envoyés → Vérifier config.js avec URL
- Puzzle pas mélangé → Vider cache navigateur (Ctrl+F5)

---

## 🎉 C'est tout !

Vous avez maintenant **tous les fichiers nécessaires** et **toutes les instructions** pour mettre à jour votre jeu sur GitHub.

**Version du jeu :** 1.3  
**Date :** 24 octobre 2025  
**Status :** ✅ Prêt pour production
