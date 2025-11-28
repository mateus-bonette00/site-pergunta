let answers = {
    question1: null,
    question2: null,
    timestamp: null
};

function startQuestions() {
    hideCard('intro-card');
    setTimeout(() => showCard('question1-card'), 300);
}

function answerQuestion1(answer) {
    answers.question1 = answer;
    hideCard('question1-card');
    setTimeout(() => showCard('question2-card'), 300);
}

function answerQuestion2(answer) {
    answers.question2 = answer;
    answers.timestamp = new Date().toISOString();

    hideCard('question2-card');

    // Enviar respostas para o servidor
    submitAnswers();

    setTimeout(() => showCard('thank-you-card'), 300);

    // Adicionar mais confetes
    createConfetti();
}

function hideCard(cardId) {
    const card = document.getElementById(cardId);
    card.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
        card.classList.add('hidden');
    }, 300);
}

function showCard(cardId) {
    const card = document.getElementById(cardId);
    card.classList.remove('hidden');
    card.style.animation = 'slideIn 0.6s ease-out';
}

function submitAnswers() {
    // Enviar para o servidor
    fetch('/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respostas enviadas com sucesso!', data);
    })
    .catch(error => {
        console.error('Erro ao enviar respostas:', error);
        // Fallback: salvar localmente
        localStorage.setItem('tcc-answers', JSON.stringify(answers));
    });
}

function createConfetti() {
    const emojis = ['🎉', '🎊', '💖', '✨', '🌟', '💕', '🎈', '🎁'];
    const confettiContainer = document.querySelector('.confetti');

    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10%';
        confetti.style.fontSize = '2rem';
        confetti.style.animation = `fall ${2 + Math.random() * 2}s linear`;
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confettiContainer.appendChild(confetti);
    }
}

// Adicionar animação de saída
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0) rotateX(0);
        }
        to {
            opacity: 0;
            transform: translateY(50px) rotateX(10deg);
        }
    }
`;
document.head.appendChild(style);
