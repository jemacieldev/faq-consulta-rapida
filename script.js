/**
 * script.js
 * ---------------------------------------------------------------
 * Lógica de exibição da FAQ de consulta rápida (versão demonstrativa)
 *
 * Depende de:
 *  - faq-data.js  → deve ser carregado ANTES deste arquivo, pois
 *                   define as variáveis globais FAQ_DATA e CODIGO_DATA.
 *
 * Responsabilidades deste arquivo:
 *  1. Montar o bloco "Código do atendimento" (buildCodigo)
 *  2. Construir os botões de filtro por categoria (buildFilters)
 *  3. Renderizar as perguntas/respostas filtradas por categoria,
 *     termo de busca e/ou mensagem do código (render)
 *  4. Abrir/fechar cada pergunta em estilo acordeão
 * ---------------------------------------------------------------
 */

// ---------- Referências aos elementos da página ----------
const main = document.getElementById('main');
const filtersEl = document.getElementById('filters');
const counterEl = document.getElementById('counter');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const clearFiltersBtn = document.getElementById('clearFilters');
const codigoEl = document.getElementById('codigo');
const refsNotice = document.getElementById('refsNotice');

// ---------- Estado atual da tela ----------
let activeCat = 'all';  // categoria selecionada no filtro ('all' = todas)
let activeRefs = null;  // mensagem do código selecionada: { texto, perguntas: Set }

/**
 * Transforma a resposta (texto ou lista de textos) em HTML.
 * Trechos que começam com "<" (ex: <ul>) entram como estão;
 * os demais viram parágrafos.
 */
function answerHTML(a){
  if (!a) return '';
  const parts = Array.isArray(a) ? a : [a];
  return parts.map(p => p.trim().startsWith('<') ? p : `<p>${p}</p>`).join('');
}

/**
 * Monta os blocos de orientação comercial (dica, fala, atenção,
 * evite, prefira) definidos no campo "notes" de cada pergunta.
 */
function notesHTML(notes){
  if (!notes || !notes.length) return '';
  return '<div class="qa-notes">' + notes.map(n => `
    <div class="note note-${n.tipo}">
      <span class="note-label">${n.titulo}</span>
      <div class="note-text">${n.texto}</div>
    </div>`).join('') + '</div>';
}

/** Texto usado na busca: pergunta + resposta + orientações, sem HTML. */
function searchableText(it){
  const a = Array.isArray(it.a) ? it.a.join(' ') : (it.a || '');
  const n = (it.notes || []).map(x => x.titulo + ' ' + x.texto).join(' ');
  return (it.q + ' ' + a + ' ' + n).replace(/<[^>]+>/g, ' ').toLowerCase();
}

/**
 * Renderiza a lista de perguntas/respostas na tela, respeitando:
 *  - o termo digitado na busca (searchInput)
 *  - a categoria ativa (activeCat)
 *  - a mensagem do código selecionada (activeRefs)
 * A numeração exibida é fixa (a mesma do documento de origem), mesmo
 * quando há filtros aplicados.
 */
function render(){
  main.innerHTML = '';
  const term = searchInput.value.trim().toLowerCase();
  let total = 0;     // total de perguntas no conteúdo inteiro
  let shown = 0;     // quantas perguntas estão sendo exibidas agora
  let globalNum = 0; // numeração fixa de cada pergunta

  FAQ_DATA.forEach(group => {
    // Numera todas as perguntas do grupo antes de filtrar
    const numbered = group.items.map(it => ({ it, n: ++globalNum }));
    total += group.items.length;

    // Pula o grupo inteiro se não for a categoria ativa
    if (activeCat !== 'all' && activeCat !== group.cat) return;

    // Filtra por termo de busca e por mensagem do código
    const groupMatches = numbered.filter(({ it, n }) =>
      searchableText(it).includes(term) &&
      (!activeRefs || activeRefs.perguntas.has(n))
    );
    if (groupMatches.length === 0) return;

    // Cria o bloco da categoria (título + perguntas)
    const wrap = document.createElement('div');
    wrap.className = 'category-group';

    const title = document.createElement('div');
    title.className = 'category-title';
    title.innerHTML = '<span class="dot"></span>' + group.cat;
    wrap.appendChild(title);

    // Texto de introdução da categoria (opcional)
    if (group.intro){
      const intro = document.createElement('p');
      intro.className = 'category-intro';
      intro.innerHTML = group.intro;
      wrap.appendChild(intro);
    }

    // Cria cada cartão de pergunta/resposta (acordeão)
    groupMatches.forEach(({ it, n }) => {
      shown++;

      const item = document.createElement('div');
      item.className = 'qa-item';
      item.innerHTML = `
        <div class="qa-question">
          <div class="q-left">
            <span class="q-num">${n}</span>
            <span class="q-text">${it.q}</span>
          </div>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="qa-answer"><div class="qa-answer-inner">${answerHTML(it.a)}${notesHTML(it.notes)}</div></div>
      `;

      // Alterna abrir/fechar ao clicar na pergunta
      const qEl = item.querySelector('.qa-question');
      const aEl = item.querySelector('.qa-answer');
      qEl.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        item.classList.toggle('open', !isOpen);
        // max-height dinâmico = altura real do conteúdo (permite transição suave)
        aEl.style.maxHeight = isOpen ? null : aEl.scrollHeight + 'px';
      });

      wrap.appendChild(item);
    });

    main.appendChild(wrap);
  });

  // Aviso "Perguntas ligadas a: ..." quando uma mensagem está selecionada
  if (activeRefs){
    refsNotice.innerHTML = `<span>Perguntas ligadas a: <strong>“${activeRefs.texto}”</strong></span>`;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'refs-clear';
    btn.textContent = 'Mostrar todas';
    btn.addEventListener('click', clearRefs);
    refsNotice.appendChild(btn);
    refsNotice.hidden = false;
  } else {
    refsNotice.hidden = true;
    refsNotice.innerHTML = '';
  }

  // Marca a mensagem ativa no bloco do código
  document.querySelectorAll('.msg-card').forEach(card => {
    card.classList.toggle('active', !!activeRefs && card.dataset.texto === activeRefs.texto);
  });

  // Atualiza o contador e a mensagem de "nenhum resultado"
  const filtering = term || activeCat !== 'all' || activeRefs;
  counterEl.textContent = filtering
    ? `Exibindo ${shown} de ${total} perguntas`
    : `${total} perguntas no total`;
  noResults.style.display = shown === 0 ? 'block' : 'none';
  clearFiltersBtn.disabled = !filtering;
}

/**
 * Monta o bloco "Código do atendimento": mensagens clicáveis
 * e tabela característica → benefício. O bloco pode ser recolhido,
 * e a escolha fica salva no navegador.
 */
function buildCodigo(){
  if (typeof CODIGO_DATA === 'undefined' || !codigoEl) return;
  const d = CODIGO_DATA;

  codigoEl.innerHTML = `
    <div class="codigo-head">
      <div>
        <h2 class="codigo-title">${d.titulo}</h2>
        <p class="codigo-sub">${d.subtitulo}</p>
      </div>
      <button type="button" class="codigo-toggle" aria-expanded="true" aria-controls="codigoBody">Recolher</button>
    </div>
    <div class="codigo-body" id="codigoBody">
      <div class="msg-grid"></div>
      <h3 class="table-title">${d.tabelaTitulo}</h3>
      <p class="table-intro">${d.tabelaIntro}</p>
      <div class="table-wrap">
        <table class="benefit-table">
          <thead><tr><th scope="col">Característica</th><th scope="col">Benefício para o cliente</th></tr></thead>
          <tbody>
            ${d.tabela.map(r => `<tr><td>${r.caracteristica}</td><td>${r.beneficio}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Cartões das mensagens
  const grid = codigoEl.querySelector('.msg-grid');
  d.mensagens.forEach(m => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'msg-card';
    card.dataset.texto = m.texto;
    const qtd = m.perguntas.length;
    card.innerHTML = `
      <span class="msg-text">${m.texto}</span>
      <span class="msg-link">Ver ${qtd} ${qtd === 1 ? 'pergunta relacionada' : 'perguntas relacionadas'}</span>
    `;
    card.addEventListener('click', () => selectMensagem(m));
    grid.appendChild(card);
  });

  // Recolher / expandir
  const toggle = codigoEl.querySelector('.codigo-toggle');
  const body = codigoEl.querySelector('.codigo-body');
  function setCollapsed(collapsed){
    body.hidden = collapsed;
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.textContent = collapsed ? 'Expandir' : 'Recolher';
    codigoEl.classList.toggle('collapsed', collapsed);
  }
  try { setCollapsed(localStorage.getItem('faqCodigoRecolhido') === '1'); } catch (e) {}
  toggle.addEventListener('click', () => {
    const collapsed = !body.hidden;
    setCollapsed(collapsed);
    try { localStorage.setItem('faqCodigoRecolhido', collapsed ? '1' : '0'); } catch (e) {}
  });
}

/**
 * Seleciona uma mensagem do código: mostra só as perguntas
 * ligadas a ela (em todas as categorias) e rola até a lista.
 * Clicar de novo na mesma mensagem desfaz a seleção.
 */
function selectMensagem(m){
  if (activeRefs && activeRefs.texto === m.texto){
    clearRefs();
    return;
  }
  activeRefs = { texto: m.texto, perguntas: new Set(m.perguntas) };
  searchInput.value = '';
  resetCategoryButtons();
  render();
  refsNotice.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Remove a seleção de mensagem do código. */
function clearRefs(){
  activeRefs = null;
  render();
}

/**
 * Monta os botões de filtro ("Todas" + uma por categoria)
 * a partir das categorias presentes em FAQ_DATA.
 */
function buildFilters(){
  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn active';
  allBtn.textContent = 'Todas';
  allBtn.addEventListener('click', () => setActive(allBtn, 'all'));
  filtersEl.appendChild(allBtn);

  FAQ_DATA.forEach(group => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.textContent = group.cat;
    btn.addEventListener('click', () => setActive(btn, group.cat));
    filtersEl.appendChild(btn);
  });
}

/** Volta os botões de categoria para "Todas". */
function resetCategoryButtons(){
  activeCat = 'all';
  document.querySelectorAll('.filter-btn').forEach((btn, index) => {
    btn.classList.toggle('active', index === 0);
  });
}

/**
 * Marca o botão de filtro clicado como ativo, atualiza a
 * categoria selecionada e redesenha a lista de perguntas.
 * Trocar de categoria desfaz a seleção de mensagem do código.
 */
function setActive(btn, cat){
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeCat = cat;
  activeRefs = null;
  render();
}

/** Remove busca, categoria e mensagem selecionadas. */
function clearFilters(){
  searchInput.value = '';
  activeRefs = null;
  resetCategoryButtons();
  render();
  searchInput.focus();
}

/**
 * Atualiza as "pílulas" do cabeçalho com o total de perguntas
 * e de categorias, para não precisar editar o HTML a cada mudança.
 */
function updateHeaderCounts(){
  const totalQ = FAQ_DATA.reduce((sum, g) => sum + g.items.length, 0);
  const qEl = document.getElementById('countQuestions');
  const cEl = document.getElementById('countCategories');
  if (qEl) qEl.textContent = `${totalQ} perguntas`;
  if (cEl) cEl.textContent = `${FAQ_DATA.length} categorias`;
}

// Re-renderiza a cada tecla digitada na busca
searchInput.addEventListener('input', render);
clearFiltersBtn.addEventListener('click', clearFilters);

// ---------- Inicialização ----------
updateHeaderCounts();
buildCodigo();
buildFilters();
render();
