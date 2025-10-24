// =================================
// CONFIGURATION DU JEU
// =================================

const CONFIG = {
    // Email du professeur qui recevra les résultats
    professorEmail: 'votre.email@istlm.org',
    
    // Nom de l'établissement
    schoolName: 'Institut Technique Saint-Laurent de Marche',
    
    // Titre du cours
    courseName: 'Limites de la Consommation - Revenus du Travail',
    
    // Score minimum pour obtenir le certificat
    certificateThreshold: 70,
    
    // Points par mission
    pointsPerMission: 25,
    
    // Nombre total de points
    totalPoints: 100,
    
    // Messages de performance selon le score
    performanceMessages: {
        excellent: {
            threshold: 80,
            message: '🌟 Félicitations ! Tu maîtrises parfaitement le cours !',
            class: 'excellent'
        },
        good: {
            threshold: 60,
            message: '👍 Très bon travail ! Tu as bien assimilé la matière.',
            class: 'good'
        },
        average: {
            threshold: 40,
            message: '💪 C\'est un bon début, continue à étudier !',
            class: 'average'
        },
        needsImprovement: {
            threshold: 0,
            message: '📚 Il faut revoir le cours plus attentivement.',
            class: 'needs-improvement'
        }
    },
    
    // Configuration pour l'envoi d'emails (optionnel)
    email: {
        // Option 1 : Formspree
        formspreeEndpoint: '', // Ex: 'https://formspree.io/f/VOTRE-ID'
        
        // Option 2 : EmailJS
        emailJS: {
            serviceID: '',
            templateID: '',
            userID: ''
        },
        
        // Option 3 : Backend personnalisé
        customAPI: '' // Ex: 'https://votre-api.com/submit-results'
    }
};

// Export pour utilisation dans script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
