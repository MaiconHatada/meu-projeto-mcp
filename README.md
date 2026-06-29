# meu-projeto-mcp

Framework de automação de testes E2E construído com **Playwright** + **TypeScript**, seguindo arquitetura em 4 camadas: **Elements → Helper → Fixture → Spec**.

---

## Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| [Playwright](https://playwright.dev) | ^1.61 | Browser automation + test runner |
| TypeScript | latest | Tipagem estática |
| dotenv | ^17 | Variáveis de ambiente |
| Node.js | 18+ | Runtime |

---

## Estrutura do Projeto

```
meu-projeto-mcp/
├── .env                        # Variáveis sensíveis (não sobe pro git)
├── .env.example                # Template público — copie e preencha
├── playwright.config.ts        # Configuração central do Playwright
├── tsconfig.json               # Configuração do TypeScript
│
├── elements/                   # CAMADA 1 — Seletores
│   └── login.elements.ts
│
├── helpers/                    # CAMADA 2 — Ações do usuário
│   └── login.helper.ts
│
├── fixture/                    # CAMADA 3 — Injeção de dependência
│   └── index.ts
│
└── tests/
    └── E2E/                    # CAMADA 4 — Specs
        └── login.spec.ts
```

### Por que 4 camadas?

| Camada | Responsabilidade | Contém |
|---|---|---|
| **Elements** | Onde estão os elementos | Seletores CSS/ID/role |
| **Helper** | O que o usuário faz | Métodos de ação + assertions |
| **Fixture** | Como os helpers chegam ao teste | `test.extend` — instancia e injeta helpers automaticamente |
| **Spec** | O que está sendo testado | `test()` + `beforeEach()` — sem `new`, sem setup manual |

> Se o HTML do site mudar → mexe só no **Elements**.  
> Se a lógica de ação mudar → mexe só no **Helper**.  
> O **Fixture** garante que cada teste receba um helper pronto, com a página já carregada.  
> O **Spec** fica completamente limpo.

---

## Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/MaiconHatada/meu-projeto-mcp.git
cd meu-projeto-mcp
```

### 2. Instale as dependências

```bash
npm install
npx playwright install chromium
```

### 3. Configure o `.env`

```bash
cp .env.example .env
```

Edite o `.env` com seus dados:

```env
BASE_URL=https://www.automationpratice.com.br
HEADLESS=false
USER_EMAIL=seu@email.com
USER_PASSWORD=suasenha
USER_EMAIL_INVALIDO=invalido@teste.com
USER_PASSWORD_INVALIDO=qualquercoisa
```

---

## Rodando os Testes

```bash
# Roda todos os testes (browser visível por padrão)
npm test

# Abre o Playwright Inspector — debug passo a passo
npm run test:debug

# Força o browser visível (ignora HEADLESS do .env)
npm run test:headed

# Abre o relatório HTML após rodar os testes
npm run test:report
```

---

## Testes Implementados

### Login — `tests/E2E/login.spec.ts`

| Teste | Tipo | Fixture usado |
|---|---|---|
| ✅ Deve navegar para a página de Login ao clicar no botão Login | Navegação | `loginHelper` (beforeEach) |
| ✅ Deve realizar login com sucesso e exibir mensagem de boas-vindas | Happy path | `loginHelper` |
| ✅ Deve exibir mensagem de erro ao tentar realizar login com email inválido | Unhappy path | `loginHelper` |

> O `beforeEach` do fixture já navega para `BASE_URL` e entrega o `loginHelper` instanciado — os specs não chamam `new` nem `page.goto()`.

**Site testado:** [automationpratice.com.br](https://www.automationpratice.com.br) — Qazando Shop (site feito para prática de automação)

---

## Evidências de Falha

O `playwright.config.ts` está configurado para capturar automaticamente:

| Artefato | Gatilho | Localização |
|---|---|---|
| Screenshot | Apenas em falha | `test-results/` |
| Vídeo | Retido em falha | `test-results/` |

---

## Decisões de Arquitetura

### Sem Cucumber
Este projeto usa `@playwright/test` puro, sem Cucumber. O motivo:

- Time técnico — QA escreve e mantém os testes
- O nome do `test()` + métodos do Helper já documentam o comportamento
- Cucumber gera overhead sem benefício quando PO/stakeholders não leem os `.feature`

### `docs/` como documentação
A pasta `docs/` contém arquivos `.feature` em Gherkin apenas para **leitura humana** — não executam, servem como especificação para stakeholders.

---

## Problemas Conhecidos e Soluções

| Problema | Solução |
|---|---|
| `a[href="/login"]` resolve 2 elementos (header + menu mobile) | Usar `a[href="/login"]:not(#item4)` |
| `input[type="email"]` preenchia a newsletter do rodapé | Campo de login usa `id="user"` (type="text") — usar `#user` |
| Site tem splash screen de carregamento | Usar `waitForLoadState('networkidle')` após navegação |
| `getByText(email)` buscava o e-mail na tela, não a mensagem de erro | Passar o texto do erro: `getByText('E-mail inválido.')` |

---

## Git Flow

```
master ← PR ← feature/branch
```

```bash
# Criar branch de feature
git checkout -b feature/nome-da-feature

# Commitar e subir
git add .
git commit -m "feat: descrição"
git push -u origin feature/nome-da-feature

# Abrir PR
gh pr create --title "feat: nome" --base master
```

---

## Autor

**Maicon Hatada** — [github.com/MaiconHatada](https://github.com/MaiconHatada)
