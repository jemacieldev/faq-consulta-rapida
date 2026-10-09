/**
 * Conteúdo da FAQ (versão demonstrativa).
 *
 * ATENÇÃO: "Clube Brota" é uma marca fictícia. Todas as perguntas,
 * respostas, prazos e regras abaixo foram inventados apenas para
 * demonstrar o funcionamento da página.
 *
 * Estrutura de cada categoria:
 *   cat    → nome da categoria (vira título e botão de filtro)
 *   intro  → (opcional) texto curto exibido abaixo do título da categoria
 *   items  → lista de perguntas
 *
 * Estrutura de cada pergunta:
 *   q      → pergunta
 *   a      → resposta. Pode ser um texto ou uma lista de textos (cada um vira
 *            um parágrafo). Trechos que começam com "<" (ex: <ul>) entram como HTML.
 *   notes  → (opcional) orientações para o atendimento, cada uma com:
 *              tipo   → "dica" | "fala" | "atencao" | "evite" | "prefira"
 *              titulo → rótulo exibido (ex: "Gancho comercial")
 *              texto  → conteúdo
 *
 *   Tipos de nota:
 *     dica    → orientação ao consultor (como vender, benefício etc.)
 *     fala    → frase sugerida para usar com o cliente
 *     atencao → ponto de atenção
 *     evite   → o que não dizer
 *     prefira → como dizer no lugar
 */

const FAQ_DATA = [
  {
    cat: "Conhecendo o Clube",
    items: [
      {
        q: "O que é o Clube Brota?",
        a: "É uma assinatura mensal de plantas. Todo mês o assinante recebe em casa uma planta escolhida para o perfil dele, com vaso, substrato e um guia de cuidados.",
        notes: [
          { tipo: "dica", titulo: "Como transformar isso em valor", texto: "O cliente não precisa pesquisar qual planta comprar nem onde encontrar. A curadoria e a entrega já resolvem a parte mais difícil de começar." },
          { tipo: "fala", titulo: "Abordagem sugerida", texto: "“A ideia é que ter plantas em casa seja simples: a gente escolhe, entrega e ainda te acompanha nos cuidados.”" }
        ]
      },
      {
        q: "Para quem o Clube é indicado?",
        a: [
          "Para quem quer ter plantas em casa, mas não sabe por onde começar, e também para quem já gosta e quer ampliar a coleção com espécies diferentes.",
          "No cadastro, o assinante informa a iluminação da casa, se tem pets e quanto tempo dedica aos cuidados. A seleção considera essas respostas."
        ],
        notes: [
          { tipo: "fala", titulo: "Pergunta de abertura", texto: "“Você já tem plantas em casa ou está pensando em começar agora?”" },
          { tipo: "dica", titulo: "Ordem recomendada da conversa", texto: "Objetivo → benefício → diferencial → funcionamento → condição comercial." }
        ]
      },
      {
        q: "Quais são os diferenciais do Clube?",
        a: [
          "A assinatura combina diferentes elementos em uma mesma experiência:",
          "<ul><li>seleção de plantas de acordo com o perfil da casa;</li><li>vaso e substrato inclusos em todos os envios;</li><li>guia de cuidados ilustrado para cada espécie;</li><li>canal de dúvidas com especialistas;</li><li>garantia de troca se a planta chegar danificada.</li></ul>"
        ],
        notes: [
          { tipo: "dica", titulo: "Mensagem-chave", texto: "Não venda apenas “uma planta por mês”. Venda a tranquilidade de receber a planta certa e ter com quem tirar dúvidas." },
          { tipo: "evite", titulo: "Evite", texto: "Começar a conversa apenas por preço ou por quantidade de plantas." }
        ]
      }
    ]
  },
  {
    cat: "Planos e pagamento",
    items: [
      {
        q: "Quais planos estão disponíveis?",
        a: [
          "São três planos:",
          "<ul><li><strong>Semente:</strong> uma planta pequena por mês;</li><li><strong>Broto:</strong> uma planta média por mês, com vaso decorativo;</li><li><strong>Jardim:</strong> duas plantas por mês e acesso prioritário ao canal de especialistas.</li></ul>"
        ],
        notes: [
          { tipo: "dica", titulo: "Como indicar o plano", texto: "Pergunte sobre o espaço disponível antes de sugerir. Quem mora em apartamento pequeno costuma se adaptar melhor ao Semente." }
        ]
      },
      {
        q: "Quais são as formas de pagamento?",
        a: "Cartão de crédito e Pix recorrente. A cobrança acontece sempre no mesmo dia do mês em que a assinatura foi feita."
      },
      {
        q: "É possível trocar de plano depois de assinar?",
        a: "Sim. A troca pode ser feita a qualquer momento pela área do assinante e passa a valer no ciclo seguinte.",
        notes: [
          { tipo: "fala", titulo: "Como apresentar", texto: "“Você pode começar pelo plano menor e mudar quando quiser, sem multa.”" }
        ]
      },
      {
        q: "Existe desconto para pagamento anual?",
        a: "Sim, o plano anual tem condição diferenciada em relação ao mensal. <br><span class=\"pill-confirm\">⚠ A confirmar: percentual vigente</span>",
        notes: [
          { tipo: "atencao", titulo: "Atenção", texto: "Não informe percentual de desconto sem consultar a tabela vigente. As condições mudam a cada campanha." }
        ]
      }
    ]
  },
  {
    cat: "Entrega e logística",
    items: [
      {
        q: "Quando a primeira planta chega?",
        a: "O primeiro envio sai em até 5 dias úteis após a confirmação do pagamento. Os envios seguintes saem sempre na primeira semana de cada mês.",
        notes: [
          { tipo: "dica", titulo: "Benefício", texto: "O cliente não precisa esperar a virada do mês para começar: o primeiro envio é imediato." }
        ]
      },
      {
        q: "Para quais regiões o Clube entrega?",
        a: "As entregas são feitas em capitais e regiões metropolitanas. Para outras cidades, a disponibilidade é verificada pelo CEP no momento da assinatura.",
        notes: [
          { tipo: "atencao", titulo: "Atenção", texto: "Sempre valide o CEP antes de confirmar a entrega. Nem todas as espécies viajam bem em trajetos longos." }
        ]
      },
      {
        q: "Como a planta é embalada para o transporte?",
        a: "Cada planta viaja em uma caixa com suporte interno que mantém o vaso fixo e protege as folhas. O substrato é selado para não espalhar durante o trajeto."
      },
      {
        q: "O que acontece se não houver ninguém para receber?",
        a: [
          "A transportadora faz até duas tentativas de entrega em dias diferentes.",
          "Se nenhuma for concluída, a planta retorna ao centro de distribuição e o atendimento entra em contato para combinar um novo envio."
        ],
        notes: [
          { tipo: "fala", titulo: "Como orientar", texto: "“Se você souber que não vai estar em casa, dá para indicar um vizinho ou a portaria na área do assinante.”" }
        ]
      }
    ]
  },
  {
    cat: "Cuidados com as plantas",
    intro: "Um dos principais motivos de permanência na assinatura.",
    items: [
      {
        q: "Como o assinante sabe cuidar de cada planta?",
        a: "Todo envio acompanha um guia ilustrado com frequência de rega, iluminação ideal e sinais de atenção. O mesmo conteúdo fica disponível na área do assinante.",
        notes: [
          { tipo: "dica", titulo: "Como transformar isso em valor", texto: "O guia reduz a insegurança de quem nunca cuidou de plantas, que é a principal barreira para assinar." }
        ]
      },
      {
        q: "E se o cliente tiver dúvidas durante os cuidados?",
        a: "O canal de especialistas responde dúvidas por mensagem em dias úteis. Assinantes do plano Jardim têm atendimento prioritário.",
        notes: [
          { tipo: "fala", titulo: "Abordagem sugerida", texto: "“Você não fica sozinho depois que a planta chega. Se uma folha amarelar, é só mandar uma foto.”" },
          { tipo: "evite", titulo: "Nunca diga", texto: "“Essa planta não morre.” Nenhuma espécie é imune a falta ou excesso de cuidados." },
          { tipo: "prefira", titulo: "Prefira", texto: "“É uma espécie resistente e indicada para quem está começando.”" }
        ]
      },
      {
        q: "As plantas são seguras para quem tem pets?",
        a: "Quem informa no cadastro que tem animais em casa recebe apenas espécies classificadas como seguras para cães e gatos.",
        notes: [
          { tipo: "atencao", titulo: "Atenção", texto: "Confirme com o cliente se o cadastro está atualizado. A seleção depende dessa informação." }
        ]
      }
    ]
  },
  {
    cat: "Cancelamento e trocas",
    items: [
      {
        q: "Como funciona o cancelamento?",
        a: "O cancelamento pode ser solicitado a qualquer momento pela área do assinante, sem multa no plano mensal. Ele passa a valer no ciclo seguinte ao pedido.",
        notes: [
          { tipo: "evite", titulo: "Evite", texto: "Dificultar o caminho ou insistir depois que o cliente já decidiu." },
          { tipo: "prefira", titulo: "Prefira", texto: "Entender o motivo e, se fizer sentido, apresentar a pausa da assinatura como alternativa." }
        ]
      },
      {
        q: "É possível pausar a assinatura?",
        a: "Sim. A assinatura pode ser pausada por até três meses seguidos, por exemplo em períodos de viagem ou mudança.",
        notes: [
          { tipo: "fala", titulo: "Abordagem de retenção", texto: "“Se o problema é o momento, você pode pausar e voltar quando for melhor, sem perder o histórico.”" }
        ]
      },
      {
        q: "O que fazer se a planta chegar danificada?",
        a: [
          "O cliente envia uma foto pelo canal de atendimento em até 7 dias após o recebimento.",
          "Confirmado o dano, uma nova planta é enviada sem custo no ciclo seguinte ou em envio avulso, conforme a disponibilidade."
        ],
        notes: [
          { tipo: "dica", titulo: "Gancho de confiança", texto: "A garantia de troca é um bom argumento para quem tem receio de comprar plantas pela internet." }
        ]
      }
    ]
  },
  {
    cat: "Objeções comuns",
    intro: "Não rebata a objeção imediatamente. Siga três passos: <strong>acolher → investigar → conectar</strong>.",
    items: [
      {
        q: "“Eu não levo jeito com plantas.”",
        a: "É a objeção mais frequente. O perfil informado no cadastro existe justamente para indicar espécies compatíveis com a rotina e a experiência de cada pessoa.",
        notes: [
          { tipo: "fala", titulo: "Resposta sugerida", texto: "“Muita gente começa assim. Por isso a primeira planta é sempre uma espécie resistente, e o guia mostra o passo a passo.”" }
        ]
      },
      {
        q: "“Está caro para uma planta.”",
        a: "O valor inclui a planta, o vaso, o substrato, o guia de cuidados, a entrega e o canal de especialistas.",
        notes: [
          { tipo: "dica", titulo: "Como conduzir", texto: "Apresente o que está incluso antes de falar de valores, mas responda o preço com clareza quando o cliente perguntar." },
          { tipo: "evite", titulo: "Evite", texto: "Comparar diretamente com o preço de floriculturas ou desviar da pergunta sobre preço." }
        ]
      },
      {
        q: "“Não tenho espaço em casa.”",
        a: "O plano Semente trabalha com espécies pequenas, pensadas para prateleiras, mesas e janelas. Também é possível pausar a assinatura quando o espaço estiver completo.",
        notes: [
          { tipo: "fala", titulo: "Resposta sugerida", texto: "“Tem plantas que ocupam o espaço de uma xícara. A gente seleciona pensando no tamanho da sua casa.”" }
        ]
      }
    ]
  }
];

/**
 * Bloco "Código do atendimento".
 *   mensagens → ideias-chave. Cada uma aponta para os números das
 *               perguntas relacionadas (numeração fixa, de 1 em diante,
 *               na ordem em que aparecem em FAQ_DATA).
 *   tabela    → pares característica → benefício.
 */
const CODIGO_DATA = {
  titulo: "Código do atendimento Clube Brota",
  subtitulo: "Ideias-chave para guiar qualquer atendimento. Clique em uma mensagem para ver as perguntas relacionadas.",
  mensagens: [
    { texto: "Primeiro entenda a casa e a rotina do cliente. Depois indique o plano.", perguntas: [2, 4, 20] },
    { texto: "Não venda uma planta por mês. Venda a tranquilidade de receber a planta certa.", perguntas: [1, 3, 18] },
    { texto: "O assinante nunca fica sozinho nos cuidados.", perguntas: [12, 13, 18] },
    { texto: "Valor antes de preço, mas nunca fuja da pergunta sobre preço.", perguntas: [7, 19] },
    { texto: "Flexibilidade é argumento: trocar de plano, pausar ou cancelar é simples.", perguntas: [6, 15, 16] },
    { texto: "Não prometa o que depende de cuidado ou de logística.", perguntas: [9, 13, 14] }
  ],
  tabelaTitulo: "Da característica ao benefício",
  tabelaIntro: "Não apresente características isoladas. Traduza cada uma em benefício, de acordo com o que o cliente procura.",
  tabela: [
    { caracteristica: "Seleção por perfil", beneficio: "Receber plantas que combinam com a casa e a rotina." },
    { caracteristica: "Guia de cuidados", beneficio: "Segurança para cuidar, mesmo sem experiência." },
    { caracteristica: "Canal de especialistas", beneficio: "Ter a quem recorrer quando surgir uma dúvida." },
    { caracteristica: "Pausa da assinatura", beneficio: "Manter o plano sem pagar por meses em que não faz sentido receber." }
  ]
};
