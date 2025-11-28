// Vercel Serverless Function para recuperar as respostas
// Página administrativa para você ver as respostas

const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Lidar com requisições OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const filePath = path.join('/tmp', 'tcc-answers.json');
        let allAnswers = [];

        // Ler respostas existentes
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            allAnswers = JSON.parse(data);
        }

        res.status(200).json({
            success: true,
            count: allAnswers.length,
            answers: allAnswers
        });

    } catch (error) {
        console.error('Erro ao recuperar respostas:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao recuperar respostas',
            answers: []
        });
    }
};
