// Mobile sidebar
function toggleMobileSidebar() {
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('sidebar-overlay');
  const hamburger = document.getElementById('hamburger');
  const isOpen    = sidebar.classList.contains('mobile-open');
  sidebar.classList.toggle('mobile-open', !isOpen);
  overlay.style.display = isOpen ? 'none' : 'block';
  hamburger.classList.toggle('open', !isOpen);
}

// Chapter accordion
function toggleChapter(btn, subId) {
  const sub = document.getElementById(subId);
  const isOpen = sub.classList.contains('open');
  sub.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
  btn.classList.toggle('active', !isOpen);
}

// Scroll spy
const chapterMap = {
  'overview':           'sub-overview',
  'earth':              'sub-earth',
  'h-why-earth':        'sub-earth',
  'h-phosphorus':       'sub-earth',
  'h-solar-system':     'sub-earth',
  'h-earth-politics':   'sub-earth',
  'h-rhea-titan':       'sub-earth',
  'h-gravity-bodies':   'sub-earth',
  'titan':              'sub-titan',
  'h-physical-env':     'sub-titan',
  'h-habitats':         'sub-titan',
  'h-hazeport':         'sub-titan',
  'h-kraken-mare':      'sub-titan',
  'moons':              'sub-moons',
  'moon-mimas':         'sub-moons',
  'moon-enceladus':     'sub-moons',
  'moon-tethys':        'sub-moons',
  'moon-iapetus':       'sub-moons',
  'moon-rhea':          'sub-moons',
  'moon-dione':         'sub-moons',
  'factions':           'sub-factions',
  'history':            'sub-history',
  'full-timeline':      'sub-timeline',
  'h-era1':             'sub-timeline',
  'h-era2':             'sub-timeline',
  'h-era3':             'sub-timeline',
  'h-era4':             'sub-timeline',
  'h-era5':             'sub-timeline',
  'daily-life':         'sub-daily',
  'h-food':             'sub-daily',
  'h-language':         'sub-daily',
  'h-comms':            'sub-daily',
  'h-clothing':         'sub-daily',
  'h-health':           'sub-daily',
  'culture':            'sub-culture',
  'h-haze-born':        'sub-culture',
  'h-lang-drift':       'sub-culture',
  'h-markers':          'sub-culture',
  'h-religion':         'sub-culture',
  'h-culture-forms':    'sub-culture',
  'tech':               'sub-tech',
  'h-agriculture':      'sub-tech',
  'h-materials':        'sub-tech',
  'h-electronics':      'sub-tech',
  'h-energy':           'sub-tech',
  'h-medicine':         'sub-tech',
  'h-comms-info':       'sub-tech',
  'h-propulsion':       'sub-tech',
  'conflict':           'sub-conflict',
  'h-political-conflict':'sub-conflict',
  'h-conflict-levels':  'sub-conflict',
  'h-hab-combat':       'sub-conflict',
  'h-physics':          'sub-conflict',
  'h-weapons':          'sub-conflict',
  'h-eva':              'sub-conflict',
  'h-enforcement':      'sub-conflict',
  'spacecraft':         'sub-spacecraft',
  'h-ship-design':      'sub-spacecraft',
  'h-ship-types':       'sub-spacecraft',
  'h-ship-systems':     'sub-spacecraft',
  'h-space-weapons':    'sub-spacecraft',
  'h-tfs-fleet':        'sub-spacecraft',
  'h-eca-fleet':        'sub-spacecraft',
  'characters':         'sub-characters',
  'h-archetypes':       'sub-characters',
};

let currentChapter = null;

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (!entry.isIntersecting) return;
    const id    = entry.target.id;
    const subId = chapterMap[id];
    if (!subId) return;

    document.querySelectorAll('.sidebar-sub a').forEach(function(a) {
      a.classList.toggle('active-sub', a.getAttribute('href') === '#' + id);
    });

    if (subId !== currentChapter) {
      currentChapter = subId;
      document.querySelectorAll('.sidebar-sub').forEach(function(sub) {
        if (sub.id !== subId) {
          sub.classList.remove('open');
          var btn = sub.previousElementSibling;
          if (btn) { btn.classList.remove('open', 'active'); }
        }
      });
      var sub = document.getElementById(subId);
      if (sub) {
        sub.classList.add('open');
        var btn = sub.previousElementSibling;
        if (btn) { btn.classList.add('open', 'active'); }
        var sidebar = document.getElementById('sidebar');
        var btnTop  = btn ? btn.offsetTop : 0;
        if (btnTop < sidebar.scrollTop || btnTop > sidebar.scrollTop + sidebar.clientHeight - 60) {
          sidebar.scrollTo({ top: btnTop - 80, behavior: 'smooth' });
        }
      }
    }
  });
}, { rootMargin: '-10% 0px -80% 0px', threshold: 0 });

document.querySelectorAll('section[id], h3[id]').forEach(function(el) {
  observer.observe(el);
});

// Smooth scroll + close mobile sidebar on link click
document.querySelectorAll('.sidebar-sub a').forEach(function(a) {
  a.addEventListener('click', function(e) {
    var href = a.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    var target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    var sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('mobile-open')) {
      toggleMobileSidebar();
    }
  });
});
