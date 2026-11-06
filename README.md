# Matheus Araújo Personal Trainer

Landing page desenvolvida para apresentar o trabalho do Matheus Araújo como personal trainer, com foco em conversão, autoridade e clareza para captar novos alunos.

## O que estamos fazendo

O projeto está sendo construído como uma página premium para divulgar o acompanhamento presencial e a consultoria online. A proposta é permitir que o visitante entenda rapidamente quem é o Matheus, quais resultados ele entrega e qual plano combina melhor com a sua rotina.

Principais áreas trabalhadas:

- Hero com imagem do Matheus, chamada comercial, CTAs e indicadores de autoridade.
- Seção "Quem sou" com texto mais objetivo, diferenciais e chamada para evolução.
- Seção "Resultados Reais do #TEAMMA" com 3 evoluções, fotos de antes/depois, prova social e CTA.
- Seção "Meus Planos" organizada em Básico, Intermediário e Premium, com benefícios e valores sob consulta.
- Botão flutuante de WhatsApp para facilitar o contato direto.

## Tecnologias

- React
- Vite
- Framer Motion
- CSS responsivo customizado

## Como rodar

Instale as dependências:

```bash
npm install
```

Rode em ambiente de desenvolvimento:

```bash
npm run dev
```

Gere a versão de produção:

```bash
npm run build
```

Visualize o build localmente:

```bash
npm run preview
```

## Estrutura principal

- `src/components/sections/Hero.jsx`: primeira dobra da página.
- `src/components/sections/Sobre.jsx`: apresentação do Matheus.
- `src/components/sections/Evolucao.jsx`: resultados e evoluções reais.
- `src/components/sections/Planos.jsx`: planos de acompanhamento.
- `src/data/siteData.js`: textos e dados reutilizados nas seções.
- `src/styles/global.css`: identidade visual e responsividade.

## Campanha Black November

A campanha está ativa em `src/data/blackNovember.js`, com `blackNovemberCampaign.enabled: true`. O controle é manual; a data registrada no arquivo não altera o estado da campanha automaticamente.

Para ativar, altere apenas `enabled` para `true` e publique a atualização. Para desativar, volte para `false`. Quando ativa, a campanha abre assim que a landing page é renderizada, inclusive a cada recarregamento, sem atraso ou bloqueio por sessão.

Os valores e mensagens ficam no mesmo arquivo; o componente e os estilos estão em `src/components/common/BlackNovemberModal.*`. O modal permanece independente dos planos, das animações e do fundo do site.

## Fundo de ondas

O componente enviado foi adaptado ao React/Vite em JavaScript e CSS, sem novas dependências. O shader reutilizável fica em `src/components/ui/adisyon-shader.jsx` e a composição do fundo em `src/styles/shaderBackground.css`.

A paleta usa preto, grafite e a variável `--neon` da marca. O canvas cobre apenas a janela, com resolução e frequência limitadas no celular. A animação pausa durante a campanha e quando a aba fica oculta; com movimento reduzido, o fundo fica estático. Um gradiente em CSS aparece caso WebGL não esteja disponível.

## Assets

As imagens ficam em `public/images`. A seção de evoluções usa os arquivos `antes1.png`, `depois1.png`, `antes2.png`, `depois2.png`, `antes3.png` e `depois3.png`.
