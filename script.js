/* ============================================================
   EcoVoice PH — script.js
   ============================================================ */

/* ── PROGRESS BAR ─────────────────────────────────────────── */
const progressBar = document.getElementById('progress-bar');
function updateProgress() {
  const scrollTop   = document.documentElement.scrollTop;
  const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = totalHeight > 0 ? (scrollTop / totalHeight * 100) + '%' : '0%';
}

/* ── NAV SCROLL & ACTIVE LINKS ────────────────────────────── */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id], article[id]');

let lastScrollY = window.scrollY;

function updateNav() {
  const scrollY = window.scrollY;
  const scrollingUp = scrollY < lastScrollY;
  lastScrollY = scrollY;

  if (scrollY <= 60 || scrollingUp) {
    // At top OR scrolling up — fully transparent
    navbar.classList.remove('scrolled');
    navbar.classList.remove('solid');
  } else {
    // Scrolling down — solid
    navbar.classList.remove('scrolled');
    navbar.classList.add('solid');
  }

  let current = '';
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 160) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

/* ── SMOOTH SCROLL ────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    document.getElementById('mobile-menu').classList.remove('open');
  });
});

/* ── HAMBURGER ────────────────────────────────────────────── */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('open');
});
document.addEventListener('click', e => {
  if (!navbar.contains(e.target))
    document.getElementById('mobile-menu').classList.remove('open');
});

/* ── SCROLL REVEAL ────────────────────────────────────────── */
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i % 4 * 90);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
revealItems.forEach(el => revealObserver.observe(el));

/* ── HERO REVEAL ON LOAD ──────────────────────────────────── */
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal-hero').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 200);
  });
});

/* ── COUNT-UP ANIMATION ───────────────────────────────────── */
const statEls = document.querySelectorAll('.stat-n:not(.no-count)');
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target  = parseInt(el.dataset.target, 10);
    const suffix  = el.dataset.suffix || '';
    const dur     = 1200;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / dur, 1);
      const val  = Math.floor((1 - Math.pow(1 - prog, 3)) * target);
      el.textContent = val + suffix;
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });
statEls.forEach(el => countObserver.observe(el));

/* ── FILTER BUTTONS ───────────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.post-card').forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

/* ── READ MORE TOGGLE ─────────────────────────────────────── */
function togglePost(btn) {
  const content = btn.closest('.post-card-body').querySelector('.post-full-content');
  const isOpen  = content.classList.toggle('open');
  btn.textContent = isOpen ? 'Show Less ↑' : 'Read Full Post →';
  if (isOpen) {
    setTimeout(() => {
      const top = content.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 100);
  }
}

/* ── MASTER SCROLL HANDLER ────────────────────────────────── */
window.addEventListener('scroll', () => {
  updateProgress();
  updateNav();
}, { passive: true });

updateProgress();
updateNav();
/* ── ARTICLE MODAL ────────────────────────────────────────── */
const POSTS = {
  'post-1': {
    badge:    'GLOBAL WARMING',
    img:      'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&q=85',
    title:    'The Causes of Global Warming',
    subtitle: 'Understanding the Human and Natural Forces Heating Our Planet',
    author:   'IT Student Team',
    date:     'March 2025',
    read:     '7 min read',
    tags:     ['#Fossil Fuels', '#Greenhouse Gases', '#Carbon Emissions'],
    body: `
      <p>Global warming refers to the long-term rise in Earth's average surface temperature caused by the accumulation of greenhouse gases in the atmosphere. While natural factors such as volcanic eruptions and solar variation have historically influenced Earth's climate, scientists have reached overwhelming consensus that the current warming trend is driven primarily by human activities. Since the Industrial Revolution, atmospheric CO₂ concentrations have risen from around 280 ppm to over 420 ppm — a level not seen in at least 800,000 years.</p>
      <h4>Burning of Fossil Fuels</h4>
      <p>The single largest cause of global warming is the combustion of fossil fuels — coal, oil, and natural gas — for energy. When burned, these fuels release carbon dioxide (CO₂) and other greenhouse gases that have been locked underground for millions of years. Power plants, vehicles, aircraft, and industrial facilities collectively release over 36 billion metric tons of CO₂ annually.</p>
      <h4>Main Human Causes</h4>
      <ul>
        <li><strong>Burning Fossil Fuels:</strong> Coal, oil, and natural gas release massive amounts of CO₂ when burned for electricity, transportation, and industry — the single largest contributor to global warming.</li>
        <li><strong>Deforestation:</strong> Trees absorb CO₂. When forests are cleared — as in Palawan or the Amazon — that stored carbon is released back into the atmosphere.</li>
        <li><strong>Agriculture:</strong> Livestock farming produces methane, while rice paddies and synthetic fertilizers release nitrous oxide — both potent greenhouse gases.</li>
        <li><strong>Industrial Processes:</strong> Cement, steel, and chemical manufacturing emit CO₂ and other greenhouse gases as direct byproducts of production.</li>
        <li><strong>Waste & Landfills:</strong> Decomposing organic waste in landfills produces methane — a gas 25× more potent than CO₂ over a 100-year period.</li>
      </ul>
      <div class="post-example">
        <span class="example-tag">🇵🇭 Philippine Context</span>
        <p>Metro Manila's millions of jeepneys, tricycles, and private vehicles contribute significantly to urban air pollution and CO₂ emissions. The Philippines, while a minor global emitter, is considered among the most climate-vulnerable nations in the world.</p>
      </div>
      <div class="post-summary">
        <strong>Quick Summary:</strong> Human activities → increased greenhouse gases → trapped heat → rising global temperatures → cascading environmental and humanitarian consequences.
      </div>`
  },
  'post-2': {
    badge:    'CLIMATE IMPACT',
    img:      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=85',
    title:    'Climate Change and Its Impact',
    subtitle: 'How a Warming Planet is Reshaping Life on Earth',
    author:   'IT Student Team',
    date:     'March 2025',
    read:     '8 min read',
    tags:     ['#Sea Level Rise', '#Extreme Weather', '#Food Security'],
    body: `
      <p>Rising seas, intensifying storms, prolonged droughts, and shifting seasons — climate change is no longer a future threat. Its impacts are being felt right now, across every region of the globe.</p>
      <h4>A Planet Under Stress</h4>
      <p>The IPCC warns that if global warming exceeds 1.5°C above pre-industrial levels, consequences for ecosystems and human societies will be severe and widespread. We are currently at approximately 1.1°C of warming — and rising faster than at any point in human history.</p>
      <h4>Key Impacts</h4>
      <ul>
        <li><strong>Rising Sea Levels:</strong> Melting glaciers and ice sheets raise ocean levels, threatening coastal cities, low-lying farmland, and island nations like the Maldives and parts of the Philippines.</li>
        <li><strong>Stronger Typhoons:</strong> Warmer ocean temperatures give more energy to tropical storms. The Philippines, in the typhoon belt, now faces increasingly powerful and erratic typhoons annually.</li>
        <li><strong>Food Insecurity:</strong> Shifting rainfall patterns and extreme heat damage crop yields, threatening food security for billions of people — particularly in Southeast Asia and sub-Saharan Africa.</li>
        <li><strong>Health Risks:</strong> Heat waves, expanding disease vectors like dengue mosquitoes, and worsening air quality increase mortality and illness globally.</li>
        <li><strong>Climate Displacement:</strong> The Internal Displacement Monitoring Centre reports millions of people are displaced annually by floods, droughts, and extreme weather events.</li>
      </ul>
      <div class="post-example">
        <span class="example-tag">🇵🇭 Philippine Context</span>
        <p>Super Typhoon Haiyan (Yolanda) struck on November 8, 2013 with winds exceeding 315 km/h — one of the strongest tropical cyclones ever recorded. It killed over 6,000 Filipinos and displaced 4 million. Scientists link the intensification of such storms directly to warming ocean temperatures.</p>
      </div>
      <div class="post-summary">
        <strong>Quick Summary:</strong> Rising temperatures → more extreme weather events → damage to infrastructure, food systems, public health, and coastal communities worldwide.
      </div>`
  },
  'post-3': {
    badge:    'BIODIVERSITY LOSS',
    img:      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=85',
    title:    'Effect of Biodiversity Loss',
    subtitle: 'The Sixth Mass Extinction and What It Means for Humanity',
    author:   'IT Student Team',
    date:     'March 2025',
    read:     '7 min read',
    tags:     ['#Extinction', '#Ecosystem Services', '#Conservation'],
    body: `
      <p>We are living through Earth's sixth mass extinction event, with species vanishing 1,000 times faster than natural rates. The loss of biodiversity doesn't just impoverish nature — it destabilizes the systems that keep us alive.</p>
      <h4>What Is Biodiversity?</h4>
      <p>Biodiversity encompasses the variety of all living organisms — genes, species, habitats, and ecosystems — and the complex interactions between them. It is the foundation of ecosystem services that sustain human civilization: clean air, fresh water, fertile soil, and climate stability.</p>
      <h4>Five Major Effects of Biodiversity Loss</h4>
      <ul>
        <li><strong>Ecosystem Collapse:</strong> Every species plays a role in its ecosystem. Losing even one species can trigger chain reactions — the extinction of a key pollinator can devastate entire food webs.</li>
        <li><strong>Food System Failure:</strong> Around 75% of global food crops depend on animal pollinators. Declining bee populations pose a direct and measurable threat to agricultural productivity worldwide.</li>
        <li><strong>Loss of Medicine:</strong> Over 50% of modern pharmaceuticals are derived from or inspired by natural organisms. Each extinction permanently erases potential cures for diseases we haven't yet faced.</li>
        <li><strong>Accelerated Climate Change:</strong> Forests and wetlands regulate climate by absorbing carbon. Their destruction removes critical carbon sinks and accelerates global warming.</li>
        <li><strong>Cultural & Spiritual Loss:</strong> Many indigenous communities in the Philippines have deep, centuries-old cultural ties to biodiversity that are irreplaceable once lost.</li>
      </ul>
      <div class="post-example">
        <span class="example-tag">🇵🇭 Philippine Context</span>
        <p>The Philippines is one of the world's 17 megadiverse countries, home to over 52,000 species — many found nowhere else on Earth. Yet it also has one of the highest deforestation rates in Southeast Asia. The Philippine Eagle, the Tamaraw, and thousands of endemic plant species are now critically endangered.</p>
      </div>
      <div class="post-summary">
        <strong>Quick Summary:</strong> Habitat destruction → species extinction → broken ecosystem services → direct threats to food supply, medicine, climate stability, and human well-being.
      </div>`
  }
};

const modalOverlay = document.getElementById('article-modal');
const modalClose   = document.getElementById('modal-close');

function openModal(postId) {
  const p = POSTS[postId];
  if (!p) return;

  document.getElementById('modal-hero-img').style.backgroundImage = `url('${p.img}')`;
  document.getElementById('modal-badge').textContent = p.badge;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-subtitle').textContent = p.subtitle;
  document.getElementById('modal-meta').innerHTML = `
    <span class="meta-item">👤 ${p.author}</span>
    <span class="meta-item">📅 ${p.date}</span>
    <span class="meta-item">⏱ ${p.read}</span>
    <span class="meta-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</span>`;
  document.getElementById('modal-body').innerHTML = p.body;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  // scroll modal to top
  modalOverlay.querySelector('.modal-box').scrollTop = 0;
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});