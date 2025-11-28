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

    // Adicionar partículas
    createParticles();
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

function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const colors = [
        'linear-gradient(135deg, #667eea, #764ba2)',
        'linear-gradient(135deg, #43e97b, #38f9d7)',
        'linear-gradient(135deg, #f093fb, #f5576c)',
        'linear-gradient(135deg, #4facfe, #00f2fe)',
        'linear-gradient(135deg, #fa709a, #fee140)',
        'linear-gradient(135deg, #30cfd0, #330867)'
    ];

    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.width = (Math.random() * 10 + 5) + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animation = `particleFloat ${2 + Math.random() * 2}s ease-out`;
        particle.style.animationDelay = Math.random() * 0.5 + 's';
        particle.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        particle.style.opacity = '0';
        particlesContainer.appendChild(particle);
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
