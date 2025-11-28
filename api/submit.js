// Vercel Serverless Function para salvar as respostas
// Este arquivo será executado na Vercel como uma função serverless

const fs = require('fs');
const path = require('path');

// Esta função salva as respostas em um arquivo JSON no /tmp
// Na Vercel, você precisará usar um banco de dados real ou serviço de armazenamento
// Para desenvolvimento/teste, vamos usar um sistema simples

module.exports = async (req, res) => {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Lidar com requisições OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const answers = req.body;

        // Adicionar timestamp se não existir
        if (!answers.timestamp) {
            answers.timestamp = new Date().toISOString();
        }

        // Adicionar ID único
        answers.id = Date.now();

        // Na Vercel, você pode usar:
        // - Vercel KV (Redis)
        // - Vercel Postgres
        // - Firebase
        // - Supabase
        // - Ou qualquer outro serviço de banco de dados

        // Por enquanto, vamos usar variáveis de ambiente da Vercel
        // Você pode ver as respostas nos logs da Vercel
        console.log('=================================');
        console.log('NOVA RESPOSTA RECEBIDA:');
        console.log('=================================');
        console.log('Pergunta 1 (Aventura e conhecer):', answers.question1 ? 'SIM ✅' : 'NÃO ❌');
        console.log('Pergunta 2 (Sair comigo):', answers.question2 ? 'SIM ✅' : 'NÃO ❌');
        console.log('Data/Hora:', new Date(answers.timestamp).toLocaleString('pt-BR'));
        console.log('=================================');

        // Salvar em arquivo temporário (apenas para teste local)
        try {
            const filePath = path.join('/tmp', 'tcc-answers.json');
            let allAnswers = [];

            // Ler respostas existentes
            if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath, 'utf8');
                allAnswers = JSON.parse(data);
            }

            // Adicionar nova resposta
            allAnswers.push(answers);

            // Salvar todas as respostas
            fs.writeFileSync(filePath, JSON.stringify(allAnswers, null, 2));
        } catch (fileError) {
            console.error('Erro ao salvar em arquivo:', fileError);
            // Não falhar se não conseguir salvar em arquivo
        }

        res.status(200).json({
            success: true,
            message: 'Respostas recebidas com sucesso!',
            data: answers
        });

    } catch (error) {
        console.error('Erro ao processar respostas:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao processar respostas'
        });
    }
};
