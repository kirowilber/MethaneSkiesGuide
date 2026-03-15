function toggleChapter(btn, subId) {
  const sub = document.getElementById(subId);
  const isOpen = sub.classList.contains('open');
  sub.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
  btn.classList.toggle('active', !isOpen);
}

// Scroll spy - highlight active section and auto-open its chapter
const sections = Array.from(document.querySelectorAll('section[id], h3[id]'));
const chapterMap = {
  'overview': 'sub-overview',
  'earth': 'sub-earth', 'h-why-earth': 'sub-earth', 'h-phosphorus': 'sub-earth',
  'h-solar-system': 'sub-earth', 'h-earth-politics': 'sub-earth',
  'h-rhea-titan': 'sub-earth', 'h-gravity-bodies': 'sub-earth',
  'titan': 'sub-titan', 'h-physical-env': 'sub-titan', 'h-habitats': 'sub-titan',
  'h-hazeport': 'sub-titan', 'h-kraken-mare': 'sub-titan',
  'moons': 'sub-moons', 'moon-mimas': 'sub-moons', 'moon-enceladus': 'sub-moons',
  'moon-tethys': 'sub-moons', 'moon-iapetus': 'sub-moons',
  'moon-rhea': 'sub-moons', 'moon-dione': 'sub-moons',
  'factions': 'sub-factions',
  'history': 'sub-history',
  'full-timeline': 'sub-timeline', 'h-era1': 'sub-timeline', 'h-era2': 'sub-timeline',
  'h-era3': 'sub-timeline', 'h-era4': 'sub-timeline', 'h-era5': 'sub-timeline',
  'daily-life': 'sub-daily', 'h-food': 'sub-daily', 'h-language': 'sub-daily',
  'h-comms': 'sub-daily', 'h-clothing': 'sub-daily', 'h-health': 'sub-daily',
  'culture': 'sub-culture', 'h-haze-born': 'sub-culture', 'h-lang-drift': 'sub-culture',
  'h-markers': 'sub-culture', 'h-religion': 'sub-culture', 'h-culture-forms': 'sub-culture',
  'tech': 'sub-tech', 'h-agriculture': 'sub-tech', 'h-materials': 'sub-tech',
  'h-electronics': 'sub-tech', 'h-energy': 'sub-tech', 'h-medicine': 'sub-tech',
  'h-comms-info': 'sub-tech', 'h-propulsion': 'sub-tech',
  'conflict': 'sub-conflict', 'h-political-conflict': 'sub-conflict',
  'h-conflict-levels': 'sub-conflict', 'h-hab-combat': 'sub-conflict',
  'h-physics': 'sub-conflict', 'h-weapons': 'sub-conflict',
  'h-eva': 'sub-conflict', 'h-enforcement': 'sub-conflict',
  'spacecraft': 'sub-spacecraft', 'h-ship-design': 'sub-spacecraft',
  'h-ship-types': 'sub-spacecraft', 'h-ship-systems': 'sub-spacecraft',
  'h-space-weapons': 'sub-spacecraft', 'h-tfs-fleet': 'sub-spacecraft',
  'h-eca-fleet': 'sub-spacecraft',
  'characters': 'sub-characters', 'h-archetypes': 'sub-characters',
};

let currentChapter = null;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      const subId = chapterMap[id];
      if (!subId) return;

      // highlight sidebar link
      document.querySelectorAll('.sidebar-sub a').forEach(a => {
        a.classList.toggle('active-sub', a.getAttribute('href') === '#' + id);
      });

      // open the chapter if it's a new one
      if (subId !== currentChapter) {
        currentChapter = subId;
        // close all others
        document.querySelectorAll('.sidebar-sub').forEach(sub => {
          if (sub.id !== subId) {
            sub.classList.remove('open');
            const btn = sub.previousElementSibling;
            if (btn) { btn.classList.remove('open', 'active'); }
          }
        });
        // open this one
        const sub = document.getElementById(subId);
        if (sub) {
          sub.classList.add('open');
          const btn = sub.previousElementSibling;
          if (btn) { btn.classList.add('open', 'active'); }
          // scroll sidebar to keep active chapter visible
          const sidebar = document.getElementById('sidebar');
          const btnTop = btn ? btn.offsetTop : 0;
          if (btnTop < sidebar.scrollTop || btnTop > sidebar.scrollTop + sidebar.clientHeight - 60) {
            sidebar.scrollTo({ top: btnTop - 80, behavior: 'smooth' });
          }
        }
      }
    }
  });
}, { rootMargin: '-10% 0px -80% 0px', threshold: 0 });

sections.forEach(el => observer.observe(el));

// Smooth scroll offset to account for any fixed elements
document.querySelectorAll('.sidebar-sub a, .toc-nav a').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});