// =================================
// VARIABLES GLOBALES
// =================================
let studentEmail = '';
let studentName = '';
let scores = {
    mission1: 0,
    mission2: 0,
    mission3: 0,
    mission4: 0
};

// Réponses correctes pour chaque mission
const correctAnswers = {
    mission1: {
        q1: 'b', // Cohabitation
        q2: 'a', // Oui, cohabitation
        q3: 'b', // 4,2 millions
        q4: 'a', // Oui, une personne
        q5: 'b'  // 2,38 personnes
    },
    mission2: {
        q1: 'a', // Travail et capital
        q2: 'b', // Rémunération
        q3: 'b', // Partie non dépensée
        q4: 'b', // Mettre de côté sans fructifier
        q5: 'a'  // Intérêts
    },
    mission3: {
        q2: 'b', // Ne dépend d'aucune autorité
        q3: 'b', // Médecin, artisan, photographe
        q4: 'b', // Contrat de travail
        q5: 'b'  // L'agent État
    },
    mission4: {
        q1: 'a', // Maçon - Salaire
        q2: 'b', // Secrétaire - Appointements
        q3: 'b', // Représentant - Commission
        q4: 'a', // Militaire - Solde
        q5: 'b', // Fonctionnaire - Traitement
        q6: 'b', // Garçon de café - Pourboires
        q7: 'c', // Femme de ménage - Gages
        q8: 'a', // Chanteur - Cachet
        q9: 'c'  // Médecin - Honoraires
    }
};

// Réponse correcte pour le puzzle Mission 3
const puzzleCorrectOrder = [
    "le salarié",
    "est celui qui perçoit",
    "sa rémunération",
    "d'un employeur",
    "par un contrat de travail",
    "vis-à-vis duquel",
    "il est lié"
];

// =================================
// FONCTIONS DE CONNEXION
// =================================
function login() {
    const email = document.getElementById('student-email').value.trim();
    const errorDiv = document.getElementById('email-error');
    
    // Validation de l'email
    if (!email) {
        errorDiv.textContent = '⚠️ Veuillez entrer votre adresse email';
        return;
    }
    
    if (!email.endsWith('@istlm.org')) {
        errorDiv.textContent = '⚠️ Utilisez votre adresse email de l\'école (@istlm.org)';
        return;
    }
    
    // Extraction du nom à partir de l'email
    const nameParts = email.split('@')[0].split('.');
    if (nameParts.length < 2) {
        errorDiv.textContent = '⚠️ Format incorrect. Utilisez prenom.nom@istlm.org';
        return;
    }
    
    studentEmail = email;
    studentName = nameParts.map(part => 
        part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    ).join(' ');
    
    // Afficher le menu principal
    showScreen('menu-screen');
    document.getElementById('student-name').textContent = '👤 ' + studentName;
    
    // Débloquer la première mission
    unlockMission(1);
}

// =================================
// GESTION DES ÉCRANS
// =================================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// =================================
// GESTION DES MISSIONS
// =================================
function unlockMission(missionNumber) {
    const card = document.getElementById(`mission-${missionNumber}-card`);
    const status = document.getElementById(`status-${missionNumber}`);
    
    card.classList.remove('locked');
    status.innerHTML = '<span class="status-badge unlocked">▶️ Commencer</span>';
}

function startMission(missionNumber) {
    const card = document.getElementById(`mission-${missionNumber}-card`);
    
    if (card.classList.contains('locked')) {
        return;
    }
    
    showScreen(`mission-${missionNumber}`);
    
    // Réinitialiser les questions de la mission
    resetMission(missionNumber);
}

function resetMission(missionNumber) {
    const questions = document.querySelectorAll(`#mission-${missionNumber} .question-card`);
    questions.forEach((q, index) => {
        q.classList.remove('active');
        if (index === 0) {
            q.classList.add('active');
        }
        
        // Réinitialiser les boutons
        q.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
            btn.disabled = false;
        });
        
        // Cacher les feedbacks
        q.querySelectorAll('.feedback').forEach(fb => {
            fb.classList.remove('show');
        });
    });
    
    // Cacher le résultat
    document.getElementById(`result-m${missionNumber}`).classList.remove('show');
    
    // Réinitialiser le score de la mission
    document.getElementById(`score-m${missionNumber}`).textContent = '0';
}

function backToMenu() {
    showScreen('menu-screen');
    updateTotalScore();
}

// =================================
// VÉRIFICATION DES RÉPONSES
// =================================
function checkAnswer(missionNumber, questionNumber, selectedAnswer) {
    const missionKey = `mission${missionNumber}`;
    const questionKey = `q${questionNumber}`;
    const correctAnswer = correctAnswers[missionKey][questionKey];
    
    const feedbackDiv = document.getElementById(`feedback-m${missionNumber}-q${questionNumber}`);
    const questionCard = document.getElementById(`m${missionNumber}-q${questionNumber}`);
    const buttons = questionCard.querySelectorAll('.option-btn');
    
    // Désactiver tous les boutons
    buttons.forEach(btn => btn.disabled = true);
    
    // Vérifier la réponse
    const isCorrect = selectedAnswer === correctAnswer;
    
    // Appliquer les classes aux boutons
    buttons.forEach(btn => {
        const btnAnswer = btn.getAttribute('onclick').match(/'([a-c])'/)[1];
        if (btnAnswer === correctAnswer) {
            btn.classList.add('correct');
        } else if (btnAnswer === selectedAnswer && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Afficher le feedback
    if (isCorrect) {
        feedbackDiv.className = 'feedback correct show';
        feedbackDiv.innerHTML = '✅ <strong>Bravo !</strong> C\'est la bonne réponse !<br><button onclick="nextQuestion(' + missionNumber + ', ' + questionNumber + ')" class="btn-next">Question suivante ➡️</button>';
        
        // Ajouter des points - Mission 4 a 9 questions
        let pointsPerQuestion = 5;
        if (missionNumber === 4) {
            // Distribution des points pour Mission 4 (9 questions = 25 points)
            // Questions 1-8 : 3 points chacune = 24 points
            // Question 9 : 1 point = 25 points au total
            const pointsDistribution = [3, 3, 3, 3, 3, 3, 3, 3, 1];
            pointsPerQuestion = pointsDistribution[questionNumber - 1];
        }
        
        scores[missionKey] += pointsPerQuestion;
        document.getElementById(`score-m${missionNumber}`).textContent = scores[missionKey];
    } else {
        feedbackDiv.className = 'feedback incorrect show';
        feedbackDiv.innerHTML = '❌ <strong>Pas tout à fait...</strong> Regarde la bonne réponse en vert.<br><button onclick="nextQuestion(' + missionNumber + ', ' + questionNumber + ')" class="btn-next">Question suivante ➡️</button>';
    }
}

function nextQuestion(missionNumber, currentQuestion) {
    const currentCard = document.getElementById(`m${missionNumber}-q${currentQuestion}`);
    const nextCard = document.getElementById(`m${missionNumber}-q${currentQuestion + 1}`);
    
    currentCard.classList.remove('active');
    
    if (nextCard) {
        nextCard.classList.add('active');
    } else {
        // Toutes les questions terminées, afficher le résultat
        showMissionResult(missionNumber);
    }
}

function showMissionResult(missionNumber) {
    const resultDiv = document.getElementById(`result-m${missionNumber}`);
    const scoreSpan = document.getElementById(`final-score-m${missionNumber}`);
    const messageP = document.getElementById(`message-m${missionNumber}`);
    
    const score = scores[`mission${missionNumber}`];
    scoreSpan.textContent = score;
    
    // Message selon le score
    let message = '';
    if (score >= 20) {
        message = '🌟 Excellent ! Tu maîtrises parfaitement cette notion !';
    } else if (score >= 15) {
        message = '👍 Très bien ! Tu as bien compris l\'essentiel.';
    } else if (score >= 10) {
        message = '💪 Pas mal, mais tu peux encore progresser.';
    } else {
        message = '📚 Continue à étudier, tu vas y arriver !';
    }
    
    messageP.textContent = message;
    resultDiv.classList.add('show');
    
    // Marquer la mission comme complétée
    const card = document.getElementById(`mission-${missionNumber}-card`);
    const status = document.getElementById(`status-${missionNumber}`);
    status.innerHTML = `<span class="status-badge completed">✅ ${score}/25</span>`;
    
    // Débloquer la mission suivante
    if (missionNumber < 4) {
        unlockMission(missionNumber + 1);
    } else {
        // Toutes les missions terminées
        document.getElementById('results-btn').style.display = 'block';
    }
}

// =================================
// PUZZLE (Mission 3, Question 1)
// =================================
let draggedElement = null;

// Initialiser le drag and drop
document.addEventListener('DOMContentLoaded', function() {
    initPuzzle();
});

function initPuzzle() {
    const puzzleWords = document.querySelectorAll('.puzzle-word');
    const puzzleAnswer = document.getElementById('puzzle-answer');
    
    if (!puzzleAnswer) return;
    
    puzzleWords.forEach(word => {
        word.addEventListener('dragstart', handleDragStart);
        word.addEventListener('dragend', handleDragEnd);
    });
    
    puzzleAnswer.addEventListener('dragover', handleDragOver);
    puzzleAnswer.addEventListener('drop', handleDrop);
    
    // Support tactile pour mobile
    puzzleWords.forEach(word => {
        word.addEventListener('click', handleWordClick);
    });
}

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    e.preventDefault();
    
    if (draggedElement) {
        const clone = draggedElement.cloneNode(true);
        clone.draggable = true;
        clone.addEventListener('dragstart', handleDragStart);
        clone.addEventListener('dragend', handleDragEnd);
        clone.addEventListener('click', handleWordRemove);
        
        // Retirer l'instruction si elle existe
        const instruction = this.querySelector('.puzzle-instruction');
        if (instruction) {
            instruction.remove();
        }
        
        this.appendChild(clone);
    }
    
    return false;
}

function handleWordClick() {
    const puzzleAnswer = document.getElementById('puzzle-answer');
    const instruction = puzzleAnswer.querySelector('.puzzle-instruction');
    
    if (instruction) {
        instruction.remove();
    }
    
    const clone = this.cloneNode(true);
    clone.addEventListener('click', handleWordRemove);
    puzzleAnswer.appendChild(clone);
}

function handleWordRemove() {
    this.remove();
    
    // Remettre l'instruction si la zone est vide
    const puzzleAnswer = document.getElementById('puzzle-answer');
    if (puzzleAnswer.children.length === 0) {
        puzzleAnswer.innerHTML = '<p class="puzzle-instruction">👆 Glisse les mots ici dans le bon ordre</p>';
    }
}

function checkPuzzle(missionNumber, questionNumber) {
    const puzzleAnswer = document.getElementById('puzzle-answer');
    const words = Array.from(puzzleAnswer.querySelectorAll('.puzzle-word'));
    const userOrder = words.map(word => word.getAttribute('data-word'));
    
    const feedbackDiv = document.getElementById(`feedback-m${missionNumber}-q${questionNumber}`);
    const checkBtn = document.querySelector('.btn-check');
    
    // Vérifier si tous les mots sont placés
    if (userOrder.length !== puzzleCorrectOrder.length) {
        feedbackDiv.className = 'feedback incorrect show';
        feedbackDiv.innerHTML = '⚠️ Place tous les mots dans la zone de réponse avant de vérifier !';
        return;
    }
    
    // Vérifier l'ordre
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(puzzleCorrectOrder);
    
    checkBtn.disabled = true;
    
    if (isCorrect) {
        feedbackDiv.className = 'feedback correct show';
        feedbackDiv.innerHTML = '✅ <strong>Parfait !</strong> Tu as reconstitué correctement la définition de "salarié" !<br><button onclick="nextQuestion(3, 1)" class="btn-next">Question suivante ➡️</button>';
        
        scores.mission3 += 5;
        document.getElementById('score-m3').textContent = scores.mission3;
        
        checkBtn.disabled = true;
    } else {
        feedbackDiv.className = 'feedback incorrect show';
        feedbackDiv.innerHTML = '❌ <strong>Pas tout à fait...</strong> Réessaie en changeant l\'ordre des mots.';
        checkBtn.disabled = false;
    }
}

// =================================
// RÉSULTATS FINAUX
// =================================
function updateTotalScore() {
    const total = scores.mission1 + scores.mission2 + scores.mission3 + scores.mission4;
    document.getElementById('total-score').textContent = total;
}

function showResults() {
    showScreen('results-screen');
    
    const total = scores.mission1 + scores.mission2 + scores.mission3 + scores.mission4;
    const percentage = total;
    
    document.getElementById('final-student-name').textContent = studentName;
    document.getElementById('percentage-score').textContent = percentage;
    document.getElementById('points-score').textContent = total;
    
    // Message de performance
    const perfMsg = document.getElementById('performance-message');
    if (percentage >= 80) {
        perfMsg.className = 'performance-message excellent';
        perfMsg.textContent = '🌟 Félicitations ! Tu maîtrises parfaitement le cours !';
    } else if (percentage >= 60) {
        perfMsg.className = 'performance-message good';
        perfMsg.textContent = '👍 Très bon travail ! Tu as bien assimilé la matière.';
    } else if (percentage >= 40) {
        perfMsg.className = 'performance-message average';
        perfMsg.textContent = '💪 C\'est un bon début, continue à étudier !';
    } else {
        perfMsg.className = 'performance-message needs-improvement';
        perfMsg.textContent = '📚 Il faut revoir le cours plus attentivement.';
    }
    
    // Détails par mission
    document.getElementById('breakdown-m1').textContent = `${scores.mission1}/25`;
    document.getElementById('breakdown-m2').textContent = `${scores.mission2}/25`;
    document.getElementById('breakdown-m3').textContent = `${scores.mission3}/25`;
    document.getElementById('breakdown-m4').textContent = `${scores.mission4}/25`;
    
    // Certificat si score >= 70%
    if (percentage >= 70) {
        document.getElementById('certificate-section').style.display = 'block';
        document.getElementById('cert-student-name').textContent = studentName;
        document.getElementById('cert-score').textContent = total;
        document.getElementById('cert-date').textContent = new Date().toLocaleDateString('fr-BE', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
}

// =================================
// ENVOI DES RÉSULTATS
// =================================
function sendResults() {
    const total = scores.mission1 + scores.mission2 + scores.mission3 + scores.mission4;
    const sendBtn = document.getElementById('send-btn');
    
    // Préparer les données à envoyer
    const resultsData = {
        student_email: studentEmail,
        student_name: studentName,
        total_score: total,
        mission1: scores.mission1,
        mission2: scores.mission2,
        mission3: scores.mission3,
        mission4: scores.mission4,
        date: new Date().toLocaleString('fr-BE')
    };
    
    // Afficher dans la console (pour le débogage)
    console.log('=== RÉSULTATS DE L\'ÉLÈVE ===');
    console.log(JSON.stringify(resultsData, null, 2));
    
    // Vérifier si Google Sheets ou Formspree est configuré
    const hasGoogleSheets = CONFIG.email.customAPI && CONFIG.email.customAPI !== '';
    const hasFormspree = CONFIG.email.formspreeEndpoint && CONFIG.email.formspreeEndpoint !== '';
    
    if (!hasGoogleSheets && !hasFormspree) {
        alert(`⚠️ CONFIGURATION REQUISE\n\n` +
              `L'enregistrement des résultats n'est pas encore configuré.\n\n` +
              `Vos résultats:\n` +
              `Élève: ${studentName}\n` +
              `Email: ${studentEmail}\n` +
              `Score Total: ${total}/100\n\n` +
              `Détails:\n` +
              `- Mission 1: ${scores.mission1}/25\n` +
              `- Mission 2: ${scores.mission2}/25\n` +
              `- Mission 3: ${scores.mission3}/25\n` +
              `- Mission 4: ${scores.mission4}/25\n\n` +
              `Pour que votre professeur reçoive automatiquement vos résultats,\n` +
              `il doit configurer le système (voir CONFIG_GOOGLE_SHEETS.md ou CONFIG_EMAIL_GUIDE.md)`);
        
        sendBtn.disabled = true;
        sendBtn.textContent = '⚠️ Configuration requise';
        return;
    }
    
    // Désactiver le bouton pendant l'envoi
    sendBtn.disabled = true;
    sendBtn.textContent = '⏳ Envoi en cours...';
    
    // Choisir Google Sheets en priorité, puis Formspree
    const endpoint = hasGoogleSheets ? CONFIG.email.customAPI : CONFIG.email.formspreeEndpoint;
    const method = hasGoogleSheets ? 'Google Sheets' : 'Formspree';
    
    // Envoi des données
    fetch(endpoint, {
        method: 'POST',
        mode: hasGoogleSheets ? 'no-cors' : 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resultsData)
    })
    .then(response => {
        // En mode no-cors (Google Sheets), on ne peut pas lire la réponse
        // On considère donc que c'est un succès si aucune erreur n'est levée
        if (hasGoogleSheets || response.ok) {
            alert(`✅ Résultats envoyés avec succès !\n\n` +
                  `Élève: ${studentName}\n` +
                  `Email: ${studentEmail}\n` +
                  `Score Total: ${total}/100\n\n` +
                  `Détails:\n` +
                  `- Mission 1: ${scores.mission1}/25\n` +
                  `- Mission 2: ${scores.mission2}/25\n` +
                  `- Mission 3: ${scores.mission3}/25\n` +
                  `- Mission 4: ${scores.mission4}/25\n\n` +
                  `Votre professeur a reçu vos résultats.`);
            
            sendBtn.textContent = '✅ Résultats envoyés';
            sendBtn.style.opacity = '0.6';
        } else {
            throw new Error('Erreur lors de l\'envoi');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`❌ Erreur lors de l'envoi\n\n` +
              `Impossible d'enregistrer les résultats.\n` +
              `Vérifiez votre connexion internet.\n\n` +
              `Vos résultats:\n` +
              `Score Total: ${total}/100\n\n` +
              `Contactez votre professeur si le problème persiste.`);
        
        sendBtn.disabled = false;
        sendBtn.textContent = '🔄 Réessayer l\'envoi';
    });
}

// =================================
// GESTION DU CLAVIER
// =================================
document.addEventListener('keydown', function(e) {
    // Touche Entrée sur l'écran de connexion
    if (e.key === 'Enter' && document.getElementById('login-screen').classList.contains('active')) {
        login();
    }
});

// =================================
// INITIALISATION
// =================================
window.addEventListener('load', function() {
    console.log('🎮 Jeu Mission Revenus chargé avec succès !');
    console.log('📚 Cours: Limites de la Consommation - Revenus du Travail');
});
