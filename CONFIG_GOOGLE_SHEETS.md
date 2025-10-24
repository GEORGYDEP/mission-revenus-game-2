# 📊 CONFIGURATION GOOGLE SHEETS - Enregistrement des résultats

## 🎯 Objectif

Cette méthode vous permet d'enregistrer automatiquement tous les résultats des élèves dans une feuille Google Sheets accessible à tout moment. Aucune limite de nombre de soumissions, historique complet, possibilité d'analyse et de création de graphiques.

---

## ✅ Avantages de cette solution

- **Historique complet** : Tous les résultats dans un seul tableau
- **Illimité** : Aucune restriction de nombre d'élèves
- **Analyse facilitée** : Filtres, tris, formules automatiques
- **Graphiques** : Visualisation des performances
- **Partage** : Possibilité de donner accès à d'autres enseignants
- **Export** : Téléchargement en Excel, PDF, etc.
- **Gratuit** : 100% gratuit avec votre compte Google

---

## 📝 CONFIGURATION ÉTAPE PAR ÉTAPE (10 minutes)

### Étape 1 : Créer la feuille Google Sheets

1. Connectez-vous à votre compte Google (Gmail)
2. Allez sur https://sheets.google.com
3. Cliquez sur le bouton "+ Vide" pour créer une nouvelle feuille
4. Renommez la feuille : "Mission Revenus - Résultats Élèves"

### Étape 2 : Créer les en-têtes du tableau

Dans la première ligne, créez ces colonnes (de A à I) :

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Date | Heure | Nom Élève | Email | Mission 1 | Mission 2 | Mission 3 | Mission 4 | Total |

Mettez cette ligne en gras et ajoutez une couleur de fond pour la rendre visible.

### Étape 3 : Créer le script Google Apps Script

1. Dans votre feuille Google Sheets, cliquez sur **Extensions** > **Apps Script**
2. Une nouvelle fenêtre s'ouvre avec un éditeur de code
3. Supprimez le code existant (function myFunction() {...})
4. Copiez-collez le code suivant :

```javascript
function doPost(e) {
  try {
    // Récupérer la feuille active
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parser les données reçues
    var data = JSON.parse(e.postData.contents);
    
    // Extraire les informations
    var date = new Date();
    var dateStr = Utilities.formatDate(date, "Europe/Brussels", "dd/MM/yyyy");
    var heureStr = Utilities.formatDate(date, "Europe/Brussels", "HH:mm:ss");
    
    // Ajouter une nouvelle ligne avec les données
    sheet.appendRow([
      dateStr,
      heureStr,
      data.student_name,
      data.student_email,
      data.mission1,
      data.mission2,
      data.mission3,
      data.mission4,
      data.total_score
    ]);
    
    // Retourner une réponse de succès
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Résultats enregistrés avec succès'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    // En cas d'erreur, retourner l'erreur
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Le service fonctionne correctement !")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

5. Cliquez sur l'icône **Enregistrer** (disquette) en haut
6. Donnez un nom au projet : "Mission Revenus - Enregistrement"

### Étape 4 : Déployer le script comme application web

1. Dans l'éditeur Apps Script, cliquez sur **Déployer** (en haut à droite) > **Nouveau déploiement**
2. À côté de "Sélectionner le type", cliquez sur l'icône ⚙️ et choisissez **Application Web**
3. Configurez les paramètres suivants :
   - Description : "API Mission Revenus"
   - Exécuter en tant que : **Moi** (votre email)
   - Qui a accès : **Tout le monde**
4. Cliquez sur **Déployer**
5. Une fenêtre apparaît demandant l'autorisation. Cliquez sur **Autoriser l'accès**
6. Sélectionnez votre compte Google
7. Cliquez sur **Paramètres avancés** en bas, puis **Accéder à [nom du projet] (non sécurisé)**
8. Cliquez sur **Autoriser**

### Étape 5 : Récupérer l'URL de votre application web

Après le déploiement, une fenêtre affiche l'URL de votre application web. Elle ressemble à :

```
https://script.google.com/macros/s/AKfycbyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
```

**COPIEZ cette URL** - vous en aurez besoin pour la configuration du jeu.

### Étape 6 : Configurer le jeu

1. Ouvrez le fichier **config.js**
2. Trouvez la ligne :
   ```javascript
   customAPI: ''
   ```
3. Remplacez-la par :
   ```javascript
   customAPI: 'https://script.google.com/macros/s/VOTRE-ID/exec'
   ```
   (Collez votre URL complète entre les guillemets)
4. Sauvegardez le fichier

### Étape 7 : Tester le système

1. Ouvrez le jeu dans votre navigateur
2. Connectez-vous avec un email de test
3. Jouez aux missions (ou utilisez le mode développeur pour aller vite)
4. À la fin, cliquez sur "Envoyer mes résultats au professeur"
5. **Vérifiez votre feuille Google Sheets** → Une nouvelle ligne devrait apparaître avec les résultats !

---

## 📊 À quoi ressemblera votre tableau

Voici un exemple de ce que vous verrez dans votre Google Sheets :

| Date | Heure | Nom Élève | Email | Mission 1 | Mission 2 | Mission 3 | Mission 4 | Total |
|------|-------|-----------|-------|-----------|-----------|-----------|-----------|-------|
| 24/10/2025 | 14:30:25 | Jean Dupont | jean.dupont@istlm.org | 20 | 25 | 20 | 20 | 85 |
| 24/10/2025 | 14:45:12 | Marie Martin | marie.martin@istlm.org | 25 | 25 | 25 | 25 | 100 |
| 24/10/2025 | 15:10:03 | Paul Bernard | paul.bernard@istlm.org | 15 | 20 | 15 | 18 | 68 |

---

## 📈 Analyses possibles

Une fois les données dans Google Sheets, vous pouvez facilement :

### Calculs automatiques

Ajoutez des formules en bas du tableau pour calculer automatiquement les moyennes, les pourcentages de réussite, et identifier les missions les plus difficiles.

### Graphiques

Créez des graphiques pour visualiser la distribution des scores, l'évolution des résultats dans le temps, et la comparaison entre les missions.

### Filtres

Utilisez les filtres pour identifier rapidement les élèves ayant besoin de soutien, ceux qui ont obtenu le certificat, ou les meilleurs scores par mission.

### Export

Téléchargez le tableau en format Excel, PDF, ou CSV pour vos archives ou pour partager avec la direction.

---

## 🔧 Modification du fichier script.js

Je vais également modifier le fichier script.js pour qu'il utilise Google Sheets au lieu de Formspree. Voici la fonction modifiée à intégrer.

Le code sera mis à jour pour détecter automatiquement si vous avez configuré Google Sheets dans le fichier config.js. Si l'URL est présente, le système enverra les données vers votre feuille Google Sheets. Si aucune configuration n'est détectée, un message explicatif s'affichera à l'élève.

---

## 💡 Conseils d'utilisation

### Protection de la feuille

Pour éviter que les données ne soient modifiées par erreur, protégez votre feuille en allant dans Données puis Protéger les feuilles et les plages. Autorisez uniquement vous-même à modifier les données.

### Sauvegarde régulière

Bien que Google Sheets sauvegarde automatiquement, pensez à faire des exports réguliers pour vos archives personnelles.

### Partage avec collègues

Si vous souhaitez partager l'accès avec un collègue, cliquez sur le bouton Partager en haut à droite et ajoutez son email avec les permissions appropriées.

### Notifications

Vous pouvez configurer des notifications dans Google Sheets pour être alerté à chaque nouvelle soumission. Allez dans Outils puis Règles de notification.

---

## ❓ FAQ

**Q: Combien d'élèves peuvent utiliser le système ?**

R: Illimité. Google Sheets peut contenir jusqu'à cinq millions de cellules, ce qui représente plusieurs milliers d'élèves.

**Q: Les élèves peuvent-ils voir les résultats des autres ?**

R: Non, seul vous avez accès à la feuille Google Sheets. Les élèves ne voient que leurs propres résultats à l'écran.

**Q: Que se passe-t-il si deux élèves envoient en même temps ?**

R: Le système gère automatiquement les envois simultanés, chaque résultat est enregistré sur une ligne différente.

**Q: Puis-je modifier le script plus tard ?**

R: Oui, vous pouvez retourner dans Extensions puis Apps Script pour modifier le code. Après modification, il faut refaire un déploiement.

**Q: Comment supprimer une ligne par erreur ?**

R: Sélectionnez la ligne, clic droit, puis Supprimer la ligne. Vous pouvez également utiliser l'historique des versions de Google Sheets pour restaurer une version antérieure.

**Q: Puis-je recevoir aussi un email en plus du Google Sheets ?**

R: Oui, vous pouvez modifier le script Apps Script pour envoyer un email automatique à chaque nouvelle soumission. Ajoutez simplement quelques lignes de code utilisant la fonction MailApp.sendEmail.

---

## ✅ Checklist de configuration

- [ ] Feuille Google Sheets créée
- [ ] En-têtes du tableau configurés
- [ ] Script Apps Script créé et enregistré
- [ ] Application web déployée
- [ ] URL de l'application copiée
- [ ] Fichier config.js modifié avec l'URL
- [ ] Test effectué → Ligne ajoutée dans le tableau ✅

---

## 🚀 Prochaines étapes

Une fois la configuration terminée, le système fonctionnera automatiquement. Chaque fois qu'un élève terminera le jeu et cliquera sur le bouton d'envoi, une nouvelle ligne apparaîtra instantanément dans votre Google Sheets. Vous pourrez consulter les résultats à tout moment en ouvrant simplement votre feuille Google Sheets depuis n'importe quel appareil connecté à internet.

**Date:** 24 octobre 2025  
**Version:** 1.3 (avec Google Sheets)
