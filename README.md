# 🎮 MISSION REVENUS - Le Parcours Professionnel

## 📚 Description

Jeu éducatif interactif pour les élèves de 3e professionnelle couvrant le cours **"Limites de la Consommation"**, section 1.2.

### Contenu pédagogique

Le jeu couvre l'intégralité de la matière en 4 missions :

#### **Mission 1 : La notion de ménage** (25 points)
- Définition du ménage basée sur la cohabitation
- Différence entre ménage et famille
- Statistiques belges (4,2 millions de ménages)
- Taille moyenne d'un ménage (2,38 personnes)

#### **Mission 2 : Les origines des revenus** (25 points)
- Les 2 facteurs de production : travail et capital
- La rémunération comme contrepartie du travail
- L'épargne et la thésaurisation
- Les intérêts comme revenu du capital

#### **Mission 3 : Les catégories de travailleurs** (25 points)
- Définition du salarié (avec puzzle interactif)
- Définition de l'indépendant
- Le fonctionnaire
- Le contrat de travail

#### **Mission 4 : Les types de rémunération** (25 points)
- Salaire (ouvrier)
- Appointements (secrétaire)
- Commission (représentant)
- Solde (militaire)
- Traitement (fonctionnaire)
- Pourboires (garçon de café)
- Gages (femme de ménage)
- Cachet (chanteur/acteur)
- Honoraires (médecin/avocat)

---

## 🎯 Fonctionnalités

✅ **Authentification** : Connexion avec email @istlm.org obligatoire  
✅ **Progression séquentielle** : Déblocage progressif des missions  
✅ **Feedback immédiat** : Réponses correctes/incorrectes en temps réel  
✅ **Score détaillé** : Suivi du score par mission et score total  
✅ **Certificat de réussite** : Pour les scores ≥ 70%  
✅ **Envoi des résultats** : Au professeur via email  
✅ **Design responsive** : Fonctionne sur PC, tablette et smartphone  
✅ **Animations motivantes** : Interface colorée et engageante  

---

## 📁 Structure du projet

```
mission-revenus-game/
│
├── index.html          # Structure HTML du jeu
├── style.css           # Design et animations
├── script.js           # Logique du jeu
├── config.js           # Configuration (email professeur)
└── README.md           # Ce fichier
```

---

## 🚀 Installation et déploiement

### Option 1 : Hébergement sur GitHub Pages (RECOMMANDÉ)

1. **Créer un dépôt GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Mission Revenus Game"
   ```

2. **Pousser sur GitHub**
   ```bash
   git remote add origin https://github.com/VOTRE-USERNAME/mission-revenus-game.git
   git branch -M main
   git push -u origin main
   ```

3. **Activer GitHub Pages**
   - Aller dans Settings > Pages
   - Source: Deploy from branch
   - Branch: main / (root)
   - Cliquer sur "Save"

4. **Accéder au jeu**
   - URL : `https://VOTRE-USERNAME.github.io/mission-revenus-game/`

### Option 2 : Serveur local (pour tester)

```bash
# Avec Python 3
python -m http.server 8000

# Ouvrir dans le navigateur
http://localhost:8000
```

### Option 3 : Hébergement sur un serveur web

- Télécharger tous les fichiers
- Les placer dans le dossier `public_html` ou `www` de votre serveur
- Accéder via votre nom de domaine

---

## 👨‍🏫 Configuration pour le professeur

### Recevoir les résultats des élèves

Pour recevoir automatiquement les résultats des élèves par email, vous devez créer un fichier `config.js` :

```javascript
// config.js
const CONFIG = {
    professorEmail: 'votre.email@istlm.org',
    apiEndpoint: 'https://votre-api.com/submit-results'
};
```

### Intégration backend (optionnel)

Pour un envoi réel par email, vous pouvez utiliser :

#### **Option A : Formspree (gratuit, simple)**

1. Créer un compte sur https://formspree.io
2. Créer un nouveau formulaire
3. Récupérer l'URL du formulaire
4. Modifier dans `script.js` :

```javascript
fetch('https://formspree.io/f/VOTRE-ID', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(resultsData)
})
```

#### **Option B : EmailJS (gratuit, 200 emails/mois)**

1. Créer un compte sur https://www.emailjs.com
2. Configurer un service email
3. Créer un template
4. Intégrer le SDK dans `index.html`

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

#### **Option C : Backend personnalisé (Node.js + Express)**

Voir exemple dans le dossier `backend-example/` (à créer séparément)

---

## 📊 Suivi des résultats

Les résultats sont affichés dans la console JavaScript lors de l'envoi. Pour les consulter :

1. Ouvrir le jeu dans un navigateur
2. Appuyer sur F12 (outils développeur)
3. Aller dans l'onglet "Console"
4. Les résultats s'affichent au format JSON

Format des données :

```json
{
  "student_email": "prenom.nom@istlm.org",
  "student_name": "Prenom Nom",
  "total_score": 85,
  "mission1": 20,
  "mission2": 25,
  "mission3": 20,
  "mission4": 20,
  "date": "2025-10-24T10:30:00.000Z"
}
```

---

## 🎓 Utilisation pour les élèves

### Étapes de jeu

1. **Connexion**
   - Entrer l'adresse email de l'école : `prenom.nom@istlm.org`
   - Cliquer sur "Commencer la Mission"

2. **Mission 1 - La notion de ménage**
   - 5 questions à choix multiples
   - Score : 5 points par bonne réponse

3. **Mission 2 - Les origines des revenus**
   - 5 questions sur travail, capital, épargne
   - Score : 5 points par bonne réponse

4. **Mission 3 - Les catégories de travailleurs**
   - 1 puzzle interactif + 4 questions
   - Score : 5 points par bonne réponse

5. **Mission 4 - Les types de rémunération**
   - 9 questions (une par type de rémunération)
   - Score : ~3 points par bonne réponse

6. **Résultats finaux**
   - Score total sur 100
   - Détail par mission
   - Certificat si score ≥ 70%
   - Envoi des résultats au professeur

### Conseils pour réussir

- 📖 Lire attentivement chaque question
- 🤔 Prendre le temps de réfléchir avant de répondre
- ✅ Les réponses correctes sont affichées en vert
- 🔄 Possibilité de recommencer le jeu pour s'améliorer

---

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Design moderne avec animations
- **JavaScript Vanilla** : Logique du jeu (pas de framework)
- **Responsive Design** : Compatible mobile, tablette, desktop

---

## 🎨 Personnalisation

### Modifier les couleurs

Dans `style.css`, section `:root` :

```css
:root {
    --primary-color: #4A90E2;    /* Bleu principal */
    --secondary-color: #50C878;  /* Vert secondaire */
    --warning-color: #F39C12;    /* Orange */
    --danger-color: #E74C3C;     /* Rouge */
    --dark: #2C3E50;             /* Texte foncé */
}
```

### Modifier les questions

Dans `script.js`, section `correctAnswers` :

```javascript
const correctAnswers = {
    mission1: {
        q1: 'b',
        q2: 'a',
        // ...
    }
};
```

---

## 📱 Compatibilité

- ✅ Chrome/Edge (recommandé)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile iOS/Android

---

## 🐛 Dépannage

### Problème : L'email ne s'envoie pas

**Solution** : Actuellement, le système affiche les résultats dans la console. Pour un envoi réel, configurez un backend (voir section Configuration).

### Problème : Le puzzle ne fonctionne pas sur mobile

**Solution** : Utilisez le mode "clic" au lieu du glisser-déposer. Cliquez sur les mots pour les placer.

### Problème : Le jeu ne se charge pas

**Solution** : Vérifiez que tous les fichiers (index.html, style.css, script.js) sont dans le même dossier.

---

## 📝 Licence

Ce projet est développé à des fins pédagogiques pour l'Institut Technique Saint-Laurent de Marche (ISTLM).

© 2025 - Tous droits réservés

---

## 👨‍💻 Support

Pour toute question ou problème :
- 📧 Email : votre.email@istlm.org
- 💬 GitHub Issues : https://github.com/VOTRE-USERNAME/mission-revenus-game/issues

---

## 🔄 Versions

### v1.0.0 (Octobre 2025)
- ✅ 4 missions complètes
- ✅ 24 questions au total
- ✅ Système de score et progression
- ✅ Certificat de réussite
- ✅ Interface responsive

---

**Bon jeu à tous ! 🎮📚🎓**
