# Pergunta Pro TCC

Um site moderno, bonito e divertido para fazer perguntas importantes!

## Recursos

- Design moderno com gradientes e animações
- Estrelas animadas no fundo
- Transições suaves entre perguntas
- Efeitos de confete na conclusão
- Sistema de backend para salvar respostas
- Painel administrativo para visualizar respostas
- Totalmente responsivo

## Estrutura do Projeto

```
site-pergunta/
├── index.html          # Página principal com as perguntas
├── admin.html          # Painel administrativo para ver respostas
├── styles.css          # Estilos modernos com animações
├── script.js           # Lógica do frontend
├── api/
│   ├── submit.js       # API para salvar respostas
│   └── get-answers.js  # API para recuperar respostas
├── package.json        # Configuração do projeto
├── vercel.json         # Configuração da Vercel
├── .gitignore          # Arquivos ignorados pelo Git
└── README.md           # Este arquivo
```

## Como Usar

### Desenvolvimento Local

1. Clone o repositório
2. Instale a Vercel CLI globalmente:
   ```bash
   npm install -g vercel
   ```
3. Execute o projeto localmente:
   ```bash
   vercel dev
   ```
4. Abra no navegador:
   - Site principal: http://localhost:3000
   - Painel admin: http://localhost:3000/admin.html

### Deploy na Vercel

1. Instale a Vercel CLI (se ainda não tiver):
   ```bash
   npm install -g vercel
   ```

2. Faça login na Vercel:
   ```bash
   vercel login
   ```

3. Faça o deploy:
   ```bash
   vercel --prod
   ```

4. Siga as instruções no terminal

**OU**

### Deploy via GitHub (Recomendado)

1. Crie um repositório no GitHub
2. Faça push do código:
   ```bash
   git init
   git add .
   git commit -m "Primeiro commit - Site Pergunta Pro TCC"
   git branch -M main
   git remote add origin SEU_REPOSITORIO_GITHUB
   git push -u origin main
   ```

3. Acesse [vercel.com](https://vercel.com)
4. Clique em "New Project"
5. Importe seu repositório do GitHub
6. Clique em "Deploy"

Pronto! Seu site estará online em poucos segundos.

## Como Ver as Respostas

Depois do deploy, você pode ver as respostas de duas formas:

1. **Painel Admin**: Acesse `seu-site.vercel.app/admin.html`
2. **Logs da Vercel**:
   - Acesse seu projeto na Vercel
   - Vá em "Deployments" > "Functions"
   - Clique em "submit" para ver os logs
   - As respostas aparecem formatadas nos logs

## Melhorias Futuras (Opcional)

Para um sistema de produção mais robusto, você pode adicionar:

1. **Banco de Dados Real**:
   - Vercel KV (Redis)
   - Vercel Postgres
   - Firebase Firestore
   - Supabase

2. **Autenticação no Admin**:
   - Senha para acessar /admin.html
   - Vercel Password Protection

3. **Notificações**:
   - Email quando houver nova resposta
   - Telegram/WhatsApp notification

## Tecnologias Utilizadas

- HTML5
- CSS3 (com animações e gradientes)
- JavaScript (Vanilla)
- Node.js (Serverless Functions)
- Vercel (Hosting e Functions)

## Personalização

Você pode personalizar facilmente:

- Cores: Edite os gradientes em `styles.css`
- Perguntas: Modifique o texto em `index.html`
- Nome: Altere "Camila Souza Andrade" em `index.html`
- Animações: Ajuste as animações em `styles.css`

## Suporte

Se tiver dúvidas sobre deploy na Vercel, consulte:
- [Documentação da Vercel](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)

Boa sorte com seu TCC!
