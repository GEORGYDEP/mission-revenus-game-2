# 📧 GUIDE DE CONFIGURATION - Envoi des résultats par email

## 🎯 Objectif

Actuellement, le jeu **ne peut pas envoyer d'emails** sans configuration préalable. Ce guide vous explique comment configurer l'envoi automatique des résultats à votre adresse Gmail.

---

## ⚠️ Situation actuelle

**Sans configuration :**
- Les élèves peuvent jouer normalement
- Ils voient leurs résultats à l'écran
- Ils peuvent cliquer sur "Envoyer mes résultats"
- MAIS → Aucun email n'est envoyé
- Un message d'alerte apparaît expliquant que la configuration est requise

---

## ✅ Solution recommandée : Formspree (Gratuit et Simple)

### Pourquoi Formspree ?

- 100% gratuit jusqu'à 50 emails/mois
- Configuration en 5 minutes
- Aucun code serveur nécessaire
- Emails reçus directement sur votre Gmail

---

## 📝 ÉTAPES DE CONFIGURATION (5 minutes)

### Étape 1 : Créer un compte Formspree

1. Allez sur https://formspree.io
2. Cliquez sur "Get Started"
3. Créez un compte avec votre email Gmail
4. Confirmez votre email

### Étape 2 : Créer un nouveau formulaire

1. Une fois connecté, cliquez sur "+ New Form"
2. Nom du formulaire : `Mission Revenus - Résultats`
3. Email où recevoir les résultats : `votre.email@gmail.com`
4. Cliquez sur "Create Form"

### Étape 3 : Récupérer votre URL Formspree

Après création du formulaire, vous verrez une URL comme :

```
https://formspree.io/f/xpzgkdwv
```

**COPIEZ cette URL** (elle est unique pour vous)

### Étape 4 : Configurer le jeu

1. Ouvrez le fichier **config.js**
2. Trouvez cette ligne :
   ```javascript
   formspreeEndpoint: '',
   ```

3. Remplacez-la par :
   ```javascript
   formspreeEndpoint: 'https://formspree.io/f/VOTRE-ID',
   ```
   (Remplacez `VOTRE-ID` par l'identifiant de votre URL)

4. Sauvegardez le fichier

### Étape 5 : Tester

1. Ouvrez `index.html` dans votre navigateur
2. Jouez au jeu ou allez directement aux résultats
3. Cliquez sur "Envoyer mes résultats au professeur"
4. **Vérifiez votre boîte Gmail** → Vous devriez recevoir un email !

---

## 📧 Format de l'email que vous recevrez

**Objet :** New submission from Mission Revenus - Résultats

**Contenu :**
```
Résultats de Jean Dupont (jean.dupont@istlm.org)

Score Total: 85/100

Détails par mission:
- Mission 1 (Notion de ménage): 20/25
- Mission 2 (Origines des revenus): 25/25
- Mission 3 (Catégories de travailleurs): 20/25
- Mission 4 (Types de rémunération): 20/25

Date: 24/10/2025 14:30:00
```

---

## 🔧 Fichiers modifiés dans cette version

Les fichiers suivants ont été mis à jour pour supporter l'envoi d'emails :

1. **script.js** - Fonction sendResults() améliorée
2. **index.html** - Chargement de config.js ajouté
3. **config.js** - Configuration Formspree à compléter

---

## 📥 Télécharger la version avec envoi d'emails

**Archive complète :**
[mission-revenus-AVEC-EMAIL.zip](computer:///mnt/user-data/outputs/mission-revenus-AVEC-EMAIL.zip)

Cette archive contient :
- index.html (mis à jour)
- script.js (avec envoi d'emails activé)
- config.js (à configurer avec votre URL Formspree)
- style.css
- README.md
- BACKEND_GUIDE.md

---

## ❓ FAQ

### Q: Est-ce vraiment gratuit ?
R: Oui, Formspree offre 50 emails gratuits par mois. Au-delà, il faut payer (~$10/mois).

### Q: Les élèves verront-ils mon email ?
R: Non, votre email est caché. Ils ne verront que leur confirmation d'envoi.

### Q: Puis-je recevoir les emails sur une autre adresse ?
R: Oui, vous pouvez utiliser n'importe quelle adresse email lors de la création du formulaire Formspree.

### Q: Que se passe-t-il si je ne configure pas Formspree ?
R: Le jeu fonctionne normalement, mais les résultats ne sont pas envoyés par email. Un message d'alerte s'affiche à l'élève.

### Q: Puis-je voir l'historique des résultats ?
R: Oui, dans votre boîte Gmail, tous les emails de résultats seront archivés. Vous pouvez aussi voir l'historique dans le dashboard Formspree.

### Q: Combien d'élèves peuvent utiliser le jeu ?
R: Autant que vous voulez ! La limite est de 50 **soumissions** (= envois de résultats) par mois sur le plan gratuit.

---

## 🎓 Exemple de configuration complète

Voici un exemple complet de fichier config.js configuré :

```javascript
const CONFIG = {
    professorEmail: 'jean.professeur@gmail.com',
    schoolName: 'Institut Technique Saint-Laurent de Marche',
    courseName: 'Limites de la Consommation - Revenus du Travail',
    certificateThreshold: 70,
    pointsPerMission: 25,
    totalPoints: 100,
    
    email: {
        formspreeEndpoint: 'https://formspree.io/f/xpzgkdwv',  // ← VOTRE URL ICI
        emailJS: {
            serviceID: '',
            templateID: '',
            userID: ''
        },
        customAPI: ''
    }
};
```

---

## ✅ Checklist de configuration

- [ ] Compte Formspree créé
- [ ] Formulaire "Mission Revenus" créé
- [ ] URL Formspree copiée
- [ ] Fichier config.js modifié avec l'URL
- [ ] Fichiers uploadés sur GitHub
- [ ] Test effectué → Email reçu ✅

---

## 🚀 Après configuration

Une fois configuré :

1. Les élèves jouent normalement
2. À la fin, ils cliquent sur "Envoyer mes résultats"
3. Vous recevez un email automatiquement
4. Vous pouvez archiver/analyser les résultats

**C'est tout ! Le système fonctionne automatiquement !** 🎉

---

## 📞 Support

Si vous avez des questions :
- Consultez le BACKEND_GUIDE.md pour plus de détails
- Visitez https://help.formspree.io pour l'aide Formspree

**Date:** 24 octobre 2025  
**Version:** 1.2 (avec envoi d'emails)
