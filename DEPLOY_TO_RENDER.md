# Deploy no Render

Este arquivo explica como implantar este projeto no Render sem alterar o código da aplicação.

Resumo rápido
- Tipo de serviço recomendado: Static Site (aplicação construída com Vite, saída em `dist`).
- Comando de build: `npm ci && npm run build`
- Pasta de publicação: `dist`

Passos (guiado)

1. Confirme que o repositório contém `render.yaml` (já incluído).
   - O `render.yaml` define um serviço do tipo `static` com `buildCommand: npm ci && npm run build` e `staticPublishPath: dist`.
2. Adicione a chave `GEMINI_API_KEY` no painel do Render (Settings > Environment). Não coloque chaves secretas no repositório.
   - O `vite.config.ts` usa `loadEnv` e define `process.env.GEMINI_API_KEY` no bundle durante o build.
3. Crie o Static Site no Render conectando seu repositório (ou faça upload). O Render detectará o `render.yaml` e seguirá a especificação.

Dicas e observações
- O projeto já possui o script `build: "vite build"` no `package.json`.
- Se você quiser que Render faça deploy automático ao push para a branch `main`, confirme que o `branch` em `render.yaml` está correta.
- Ao usar variáveis de ambiente que serão incorporadas ao bundle durante o build, lembre-se de que qualquer chave incluída assim ficará exposta no JavaScript servido ao cliente. Use isso apenas para valores não sensíveis ou quando você aceitar que o valor aparecerá no cliente.

Exemplo mínimo do `render.yaml` (já presente no repositório):

services:
  - type: static
    name: nossa-historia
    env: static
    branch: main
    buildCommand: npm ci && npm run build
    staticPublishPath: dist
    envVars:
      - key: GEMINI_API_KEY
        value: ""

Se quiser, posso também gerar instruções passo-a-passo para criar o site via painel do Render (com screenshots/explicações) ou ajustar o `render.yaml` para outro branch/nome do serviço.
