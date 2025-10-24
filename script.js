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

// Limites par mission (toutes à 25)
const MISSION_MAX = {
    mission1: 25,
    mission2: 25,
    mission3: 25,
    mission4: 25
};

// Barème spécifique Mission 4 (9 questions = 25 points)
const M4_POINTS = [3,3,3,3,3,3,3,3,1];

// Réponses correctes
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
        // q1 = puzzle (géré à part)
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

// Réponse correcte pour le puzzle Mission 3 (Q1)
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

    // Validation
    if (!email) {
        errorDiv.textContent = '⚠️ Veuillez entrer votre adresse email';
        return;
    }
    if (!email.endsWith('@istlm.org')) {
        errorDiv.textContent = '⚠️ Utilisez votre adresse email de l\'école (@istlm.org)';
        return;
    }

    // Extraction du nom
    const nameParts = email.split('@')[0].split('.');
    if (nameParts.length < 2) {
        errorDiv.textContent = '⚠️ Format incorrect. Utilisez prenom.nom@istlm.org';
        return;
    }

    studentEmail = email;
    studentName = nameParts.map(part =>
        part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    ).join(' ');

    showScreen('menu-screen');
    document.getElementById('student-name').textContent = '👤 ' + studentName;

    // Débloquer M1
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
    if (!card) return;

    card.classList.remove('locked');
    if (status) status.innerHTML = '<span class="status-badge unlocked">▶️ Commencer</span>';
}

function startMission(missionNumber) {
    const card = document.getElementById(`mission-${missionNumber}-card`);
    if (!card || card.classList.contains('locked')) return;

    showScreen(`mission-${missionNumber}`);
    resetMission(missionNumber);
}

function resetMission(missionNumber) {
    const missionKey = `mission${missionNumber}`;

    // Réinitialiser l'état logique (crucial)
    scores[missionKey] = 0;

    // Réinitialiser les cartes/questions
    const qCards = document.querySelectorAll(`#mission-${missionNumber} .question-card`);
    qCards.forEach((q, idx) => {
        q.classList.toggle('active', idx === 0);
        q.dataset.answered = 'false';

        q.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
            btn.disabled = false;
        });

        q.querySelectorAll('.feedback').forEach(fb => fb.classList.remove('show'));
    });

    // Cacher le résultat de mission
    const res = document.getElementById(`result-m${missionNumber}`);
    if (res) res.classList.remove('show');

    // Score affiché = 0
    const scoreEl = document.getElementById(`score-m${missionNumber}`);
    if (scoreEl) scoreEl.textContent = '0';

    // Puzzle zone (si mission 3)
    if (missionNumber === 3) {
        const puzzleAnswer = document.getElementById('puzzle-answer');
        if (puzzleAnswer) {
            puzzleAnswer.innerHTML = '<p class="puzzle-instruction">👆 Glisse les mots ici dans le bon ordre</p>';
        }
        // Réactiver bouton check si présent
        const checkBtn = document.querySelector('#mission-3 .btn-check');
        if (checkBtn) checkBtn.disabled = false;
    }
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
    const correctAnswer = correctAnswers[missionKey]?.[questionKey];

    const feedbackDiv = document.getElementById(`feedback-m${missionNumber}-q${questionNumber}`);
    const questionCard = document.getElementById(`m${missionNumber}-q${questionNumber}`);
    if (!questionCard || !feedbackDiv) return;

    // Anti double-comptage
    if (questionCard.dataset.answered === 'true') return;

    const buttons = questionCard.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);

    // Comparaison
    const isCorrect = selectedAnswer === correctAnswer;

    // Styliser boutons
    buttons.forEach(btn => {
        const onclickVal = btn.getAttribute('onclick') || '';
        const match = onclickVal.match(/'([a-c])'/);
        const btnAnswer = match ? match[1] : null;

        if (btnAnswer === correctAnswer) {
            btn.classList.add('correct');
        } else if (btnAnswer === selectedAnswer && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });

    // Mise à jour score si correct
    if (isCorrect) {
        let pointsToAdd = 5; // défaut

        if (missionNumber === 4) {
            // Barème mission 4
            pointsToAdd = M4_POINTS[questionNumber - 1] || 0;
        }

        // Plafond à 25 pour la mission
        const capped = Math.min(MISSION_MAX[missionKey], scores[missionKey] + pointsToAdd);
        scores[missionKey] = capped;

        const sc = document.getElementById(`score-m${missionNumber}`);
        if (sc) sc.textContent = String(scores[missionKey]);

        feedbackDiv.className = 'feedback correct show';
        feedbackDiv.innerHTML =
            '✅ <strong>Bravo !</strong> C\'est la bonne réponse !<br>' +
            `<button onclick="nextQuestion(${missionNumber}, ${questionNumber})" class="btn-next">Question suivante ➡️</button>`;
    } else {
        feedbackDiv.className = 'feedback incorrect show';
        feedbackDiv.innerHTML =
            '❌ <strong>Pas tout à fait...</strong> Regarde la bonne réponse en vert.<br>' +
            `<button onclick="nextQuestion(${missionNumber}, ${questionNumber})" class="btn-next">Question suivante ➡️</button>`;
    }

    // Verrouiller la question (traitée une fois)
    questionCard.dataset.answered = 'true';
}

function nextQuestion(missionNumber, currentQuestion) {
    const currentCard = document.getElementById(`m${missionNumber}-q${currentQuestion}`);
    const nextCard = document.getElementById(`m${missionNumber}-q${currentQuestion + 1}`);
    if (currentCard) currentCard.classList.remove('active');

    if (nextCard) {
        nextCard.classList.add('active');
    } else {
        showMissionResult(missionNumber);
    }
}

function showMissionResult(missionNumber) {
    const resultDiv = document.getElementById(`result-m${missionNumber}`);
    const scoreSpan = document.getElementById(`final-score-m${missionNumber}`);
    const messageP = document.getElementById(`message-m${missionNumber}`);

    const score = scores[`mission${missionNumber}`];
    if (scoreSpan) scoreSpan.textContent = String(score);

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

    if (messageP) messageP.textContent = message;
    if (resultDiv) resultDiv.classList.add('show');

    // Badge sur la carte
    const status = document.getElementById(`status-${missionNumber}`);
    if (status) status.innerHTML = `<span class="status-badge completed">✅ ${score}/25</span>`;

    // Débloquer mission suivante
    if (missionNumber < 4) {
        unlockMission(missionNumber + 1);
    } else {
        // Toutes les missions terminées
        const btn = document.getElementById('results-btn');
        if (btn) btn.style.display = 'block';
    }
}

// =================================
// PUZZLE (Mission 3, Question 1)
// =================================
let draggedElement = null;

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
        // support tactile
        word.addEventListener('click', handleWordClick);
    });

    puzzleAnswer.addEventListener('dragover', handleDragOver);
    puzzleAnswer.addEventListener('drop', handleDrop);
}

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.getAttribute('data-word') || '');
    }
}

function handleDragEnd() {
    this.classList.remove('dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();

    if (draggedElement) {
        const clone = draggedElement.cloneNode(true);
        clone.draggable = true;
        clone.addEventListener('dragstart', handleDragStart);
        clone.addEventListener('dragend', handleDragEnd);
        clone.addEventListener('click', handleWordRemove);

        const answerZone = this;
        const instruction = answerZone.querySelector('.puzzle-instruction');
        if (instruction) instruction.remove();

        answerZone.appendChild(clone);
    }
    return false;
}

function handleWordClick() {
    const puzzleAnswer = document.getElementById('puzzle-answer');
    if (!puzzleAnswer) return;

    const instruction = puzzleAnswer.querySelector('.puzzle-instruction');
    if (instruction) instruction.remove();

    const clone = this.cloneNode(true);
    clone.addEventListener('click', handleWordRemove);
    puzzleAnswer.appendChild(clone);
}

function handleWordRemove() {
    this.remove();
    const puzzleAnswer = document.getElementById('puzzle-answer');
    if (puzzleAnswer && puzzleAnswer.children.length === 0) {
        puzzleAnswer.innerHTML = '<p class="puzzle-instruction">👆 Glisse les mots ici dans le bon ordre</p>';
    }
}

function checkPuzzle(missionNumber, questionNumber) {
    const missionKey = `mission${missionNumber}`;
    const puzzleAnswer = document.getElementById('puzzle-answer');
    const feedbackDiv = document.getElementById(`feedback-m${missionNumber}-q${questionNumber}`);
    const checkBtn = document.querySelector(`#mission-${missionNumber} .btn-check`);
    const questionCard = document.getElementById(`m${missionNumber}-q${questionNumber}`);

    if (!puzzleAnswer || !feedbackDiv || !questionCard) return;

    // Anti double-comptage
    if (questionCard.dataset.answered === 'true') return;

    const words = Array.from(puzzleAnswer.querySelectorAll('.puzzle-word'));
    const userOrder = words.map(word => word.getAttribute('data-word'));

    if (userOrder.length !== puzzleCorrectOrder.length) {
        feedbackDiv.className = 'feedback incorrect show';
        feedbackDiv.innerHTML = '⚠️ Place tous les mots dans la zone de réponse avant de vérifier !';
        return;
    }

    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(puzzleCorrectOrder);

    if (checkBtn) checkBtn.disabled = true;

    if (isCorrect) {
        feedbackDiv.className = 'feedback correct show';
        feedbackDiv.innerHTML =
            '✅ <strong>Parfait !</strong> Tu as reconstitué correctement la définition de "salarié" !<br>' +
            `<button onclick="nextQuestion(${missionNumber}, ${questionNumber})" class="btn-next">Question suivante ➡️</button>`;

        // +5 points, plafonné à 25
        const newScore = Math.min(MISSION_MAX[missionKey], scores[missionKey] + 5);
        scores[missionKey] = newScore;

        const sc = document.getElementById(`score-m${missionNumber}`);
        if (sc) sc.textContent = String(scores[missionKey]);

        // Verrouille la question
        questionCard.dataset.answered = 'true';
    } else {
        feedbackDiv.className = 'feedback incorrect show';
        feedbackDiv.innerHTML = '❌ <strong>Pas tout à fait...</strong> Réessaie en changeant l\'ordre des mots.';
        if (checkBtn) checkBtn.disabled = false;
    }
}

// =================================
// RÉSULTATS FINAUX
// =================================
function updateTotalScore() {
    const total = scores.mission1 + scores.mission2 + scores.mission3 + scores.mission4;
    const el = document.getElementById('total-score');
    if (el) el.textContent = String(total);
}

function showResults() {
    showScreen('results-screen');

    const total = scores.mission1 + scores.mission2 + scores.mission3 + scores.mission4;
    const percentage = total; // /100 * 100 => déjà en points sur 100

    const nameEl = document.getElementById('final-student-name');
    if (nameEl) nameEl.textContent = studentName;

    const pctEl = document.getElementById('percentage-score');
    if (pctEl) pctEl.textContent = String(percentage);

    const ptsEl = document.getElementById('points-score');
    if (ptsEl) ptsEl.textContent = String(total);

    const perfMsg = document.getElementById('performance-message');
    if (perfMsg) {
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
    }

    const b1 = document.getElementById('breakdown-m1');
    const b2 = document.getElementById('breakdown-m2');
    const b3 = document.getElementById('breakdown-m3');
    const b4 = document.getElementById('breakdown-m4');
    if (b1) b1.textContent = `${scores.mission1}/25`;
    if (b2) b2.textContent = `${scores.mission2}/25`;
    if (b3) b3.textContent = `${scores.mission3}/25`;
    if (b4) b4.textContent = `${scores.mission4}/25`;

    if (percentage >= 70) {
        const cert = document.getElementById('certificate-section');
        if (cert) cert.style.display = 'block';
        const nm = document.getElementById('cert-student-name');
        const sc = document.getElementById('cert-score');
        const dt = document.getElementById('cert-date');
        if (nm) nm.textContent = studentName;
        if (sc) sc.textContent = String(total);
        if (dt) dt.textContent = new Date().toLocaleDateString('fr-BE', {
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

    console.log('=== RÉSULTATS DE L\'ÉLÈVE ===');
    console.log(JSON.stringify(resultsData, null, 2));

    const hasGoogleSheets = CONFIG?.email?.customAPI && CONFIG.email.customAPI !== '';
    const hasFormspree = CONFIG?.email?.formspreeEndpoint && CONFIG.email.formspreeEndpoint !== '';

    if (!hasGoogleSheets && !hasFormspree) {
        alert(
            `⚠️ CONFIGURATION REQUISE\n\n` +
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
            `il doit configurer le système (voir CONFIG_GOOGLE_SHEETS.md ou CONFIG_EMAIL_GUIDE.md)`
        );
        if (sendBtn) {
            sendBtn.disabled = true;
            sendBtn.textContent = '⚠️ Configuration requise';
        }
        return;
    }

    if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.textContent = '⏳ Envoi en cours...';
    }

    const endpoint = hasGoogleSheets ? CONFIG.email.customAPI : CONFIG.email.formspreeEndpoint;

    fetch(endpoint, {
        method: 'POST',
        mode: hasGoogleSheets ? 'no-cors' : 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultsData)
    })
    .then(response => {
        if (hasGoogleSheets || response.ok) {
            alert(
                `✅ Résultats envoyés avec succès !\n\n` +
                `Élève: ${studentName}\n` +
                `Email: ${studentEmail}\n` +
                `Score Total: ${total}/100\n\n` +
                `Détails:\n` +
                `- Mission 1: ${scores.mission1}/25\n` +
                `- Mission 2: ${scores.mission2}/25\n` +
                `- Mission 3: ${scores.mission3}/25\n` +
                `- Mission 4: ${scores.mission4}/25\n\n` +
                `Votre professeur a reçu vos résultats.`
            );
            if (sendBtn) {
                sendBtn.textContent = '✅ Résultats envoyés';
                sendBtn.style.opacity = '0.6';
            }
        } else {
            throw new Error('Erreur lors de l\'envoi');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(
            `❌ Erreur lors de l'envoi\n\n` +
            `Impossible d'enregistrer les résultats.\n` +
            `Vérifiez votre connexion internet.\n\n` +
            `Vos résultats:\n` +
            `Score Total: ${total}/100\n\n` +
            `Contactez votre professeur si le problème persiste.`
        );
        if (sendBtn) {
            sendBtn.disabled = false;
            sendBtn.textContent = '🔄 Réessayer l\'envoi';
        }
    });
}

// =================================
// GESTION DU CLAVIER
// =================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.getElementById('login-screen')?.classList.contains('active')) {
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
