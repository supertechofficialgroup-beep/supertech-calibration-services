/**
 * SUPER TECH CALIBRATION SERVICES
 * Core Interactive Application Logic
 * Mobile Navigation, Scroll Progress, Scroll Reveal Animations,
 * Scope Explorer, Quotation Estimator, Certificate Verification Portal
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollEffects();
  initNavbar();
  initMobileDrawer();
  initScopeExplorer();
  initCertVerification();
  initContactForm();
  initCounters();
  initGallery();
});

/* ==========================================================================
   SCROLL EFFECTS & SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollEffects() {
  const progressBar = document.getElementById('scrollProgressBar');
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  // 1. Reading Progress Bar & Header Shadow on Scroll
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progress = (window.pageYOffset / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });

  // 2. IntersectionObserver for Smooth Scroll Reveal
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once animated, keep visible
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is unsupported
    revealElements.forEach(el => el.classList.add('active'));
  }
}

/* ==========================================================================
   NAVIGATION & SCROLLSPY
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.main-header');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    if (scrollY > 40) {
      header.classList.add('scrolled');
      if (backToTopBtn) backToTopBtn.classList.add('show');
    } else {
      header.classList.remove('scrolled');
      if (backToTopBtn) backToTopBtn.classList.remove('show');
    }

    // ScrollSpy to highlight active link in header & mobile drawer
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 110;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });

        mobileNavLinks.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth Scroll with Responsive Header Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = window.innerWidth <= 768 ? 64 : 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   MOBILE OFF-CANVAS DRAWER
   ========================================================================== */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-contacts a');

  function openDrawer() {
    if (drawer && overlay) {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.classList.add('menu-open');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    }
  }

  function closeDrawer() {
    if (drawer && overlay) {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   SCOPE DATABASE & INTERACTIVE SEARCH EXPLORER
   ========================================================================== */
const scopeCatalog = [
  // Mechanical & Dimensional
  { id: 'm1', category: 'mech', name: 'Digital Vernier Caliper (0-150 mm)', range: '0 to 150 mm', standard: 'IS 3651 / JIS B 7507', uncertainty: '± 0.012 mm', interval: '12 Months', rate: 250 },
  { id: 'm2', category: 'mech', name: 'Digital Vernier Caliper (0-200 mm)', range: '0 to 200 mm', standard: 'IS 3651 / JIS B 7507', uncertainty: '± 0.015 mm', interval: '12 Months', rate: 280 },
  { id: 'm3', category: 'mech', name: 'Digital Vernier Caliper (0-300 mm)', range: '0 to 300 mm', standard: 'IS 3651', uncertainty: '± 0.020 mm', interval: '12 Months', rate: 350 },
  { id: 'm4', category: 'mech', name: 'External Micrometer (0-25 mm)', range: '0 to 25 mm', standard: 'IS 2967 / ISO 3611', uncertainty: '± 0.002 mm', interval: '12 Months', rate: 300 },
  { id: 'm5', category: 'mech', name: 'External Micrometer (25-50 mm)', range: '25 to 50 mm', standard: 'IS 2967 / ISO 3611', uncertainty: '± 0.003 mm', interval: '12 Months', rate: 320 },
  { id: 'm6', category: 'mech', name: 'Digital Height Gauge (0-600 mm)', range: '0 to 600 mm', standard: 'IS 2921', uncertainty: '± 0.025 mm', interval: '12 Months', rate: 650 },
  { id: 'm7', category: 'mech', name: 'Plunger Dial Indicator (0-10 mm)', range: '0 to 10 mm (0.01 mm LC)', standard: 'IS 2092 / ISO 463', uncertainty: '± 0.004 mm', interval: '12 Months', rate: 280 },
  { id: 'm8', category: 'mech', name: 'Granite Surface Plate Flatness (On-Site)', range: 'Up to 2000 x 1000 mm', standard: 'IS 7327 Grade 0/1', uncertainty: '± 1.8 µm', interval: '12 Months', rate: 1800 },
  { id: 'm9', category: 'mech', name: 'Plain Plug Gauge / Pin Gauge', range: '1 mm to 100 mm', standard: 'IS 3484', uncertainty: '± 0.0015 mm', interval: '12 Months', rate: 220 },
  { id: 'm10', category: 'mech', name: 'Bore Gauge (Two / Three Point)', range: '10 to 150 mm', standard: 'IS 7013', uncertainty: '± 0.005 mm', interval: '12 Months', rate: 450 },

  // Electro-Technical
  { id: 'e1', category: 'elec', name: 'Digital Multimeter (3.5 / 4.5 Digit)', range: 'DC/AC V, A, Resistance', standard: 'IEC 61010-1 Traceable', uncertainty: '± 0.05% reading', interval: '12 Months', rate: 450 },
  { id: 'e2', category: 'elec', name: 'Insulation Resistance Tester (Megger 1kV/5kV)', range: 'Up to 100 GΩ @ 5000V', standard: 'IS 11994', uncertainty: '± 1.5%', interval: '12 Months', rate: 750 },
  { id: 'e3', category: 'elec', name: 'Earth Resistance Tester (Digital/Analog)', range: '0 to 1000 Ω', standard: 'IS 9223', uncertainty: '± 1.2%', interval: '12 Months', rate: 650 },
  { id: 'e4', category: 'elec', name: 'Digital Timer / Process Stopwatch', range: '0.1 sec to 24 hrs', standard: 'NPL Traceable Standard', uncertainty: '± 0.05 sec/day', interval: '12 Months', rate: 300 },
  { id: 'e5', category: 'elec', name: 'AC/DC Clamp Meter', range: 'Up to 1000A AC/DC', standard: 'IEC 61010', uncertainty: '± 1.0%', interval: '12 Months', rate: 400 },
  { id: 'e6', category: 'elec', name: 'Digital Storage Oscilloscope (DSO)', range: 'Up to 200 MHz', standard: 'IEEE 1057', uncertainty: '± 0.8%', interval: '12 Months', rate: 1200 },

  // Thermal & Temperature
  { id: 't1', category: 'thermal', name: 'Industrial Temperature Controller / Indicator', range: '-50°C to 1200°C', standard: 'ITS-90 / ASTM E220', uncertainty: '± 0.5°C', interval: '12 Months', rate: 400 },
  { id: 't2', category: 'thermal', name: 'Industrial Oven / Furnace Profiling (9 Points)', range: 'Amb. to 600°C', standard: 'ASTM E145 / AMS 2750', uncertainty: '± 1.2°C', interval: '6-12 Months', rate: 2500 },
  { id: 't3', category: 'thermal', name: 'RTD Sensor Pt100 with Indicator', range: '-50°C to 400°C', standard: 'IEC 60751 Class A/B', uncertainty: '± 0.25°C', interval: '12 Months', rate: 500 },
  { id: 't4', category: 'thermal', name: 'Thermocouple (J / K / R / S / T Type)', range: '0°C to 1200°C', standard: 'IEC 60584', uncertainty: '± 1.0°C', interval: '12 Months', rate: 450 },
  { id: 't5', category: 'thermal', name: 'Deep Freezer / BOD Incubator (-20°C to 50°C)', range: '-40°C to +80°C', standard: 'DIN 12880', uncertainty: '± 0.4°C', interval: '12 Months', rate: 1500 },
  { id: 't6', category: 'thermal', name: 'Infrared Pyrometer / Non-contact Thermometer', range: '0°C to 800°C', standard: 'ASTM E2847', uncertainty: '± 1.5°C', interval: '12 Months', rate: 650 },

  // Pressure & Vacuum
  { id: 'p1', category: 'pressure', name: 'Analog Dial Pressure Gauge (0-25 bar)', range: '0 to 25 kg/cm² or bar', standard: 'IS 3624 / EN 837-1', uncertainty: '± 0.25% FS', interval: '12 Months', rate: 250 },
  { id: 'p2', category: 'pressure', name: 'Digital Pressure Gauge / Calibrator', range: '-1 to 700 bar', standard: 'DKD-R 6-1', uncertainty: '± 0.05% FS', interval: '12 Months', rate: 600 },
  { id: 'p3', category: 'pressure', name: 'Pressure Transmitter (4-20 mA Output)', range: '0 to 100 bar', standard: 'IEC 60770', uncertainty: '± 0.1% FS', interval: '12 Months', rate: 550 },
  { id: 'p4', category: 'pressure', name: 'Vacuum Gauge / Compound Gauge', range: '-760 mmHg to 0', standard: 'IS 3624', uncertainty: '± 0.5% FS', interval: '12 Months', rate: 300 },
  { id: 'p5', category: 'pressure', name: 'Differential Pressure (DP) Magnehelic Gauge', range: '0 to 50 mmWC / Pa', standard: 'EURAMET cg-17', uncertainty: '± 1.0% FS', interval: '12 Months', rate: 400 },

  // Mass & Volume
  { id: 'mv1', category: 'mass', name: 'Analytical Electronic Balance (0.1 mg / 0.01 mg)', range: 'Up to 220 g', standard: 'OIML R 76-1 / IS 9281', uncertainty: '± 0.15 mg', interval: '12 Months', rate: 850 },
  { id: 'mv2', category: 'mass', name: 'Industrial Platform Weighing Scale', range: 'Up to 500 kg / 1000 kg', standard: 'OIML R 76-1', uncertainty: '± 20 g', interval: '12 Months', rate: 950 },
  { id: 'mv3', category: 'mass', name: 'Standard Calibration Weights (Class F1 / M1)', range: '1 mg to 20 kg', standard: 'OIML R 111-1', uncertainty: 'Class compliant', interval: '12 Months', rate: 350 },
  { id: 'mv4', category: 'mass', name: 'Micro-pipette / Liquid Dispenser (Variable)', range: '1 µL to 1000 µL', standard: 'ISO 8655', uncertainty: '± 0.8%', interval: '6 Months', rate: 380 },
  { id: 'mv5', category: 'mass', name: 'Volumetric Flask / Cylinder / Burette', range: '10 mL to 2000 mL', standard: 'ISO 4787 / IS 1997', uncertainty: 'Class A/B', interval: '12 Months', rate: 250 },

  // Environmental Testing
  { id: 'env1', category: 'enviro', name: 'Ambient Air Quality Monitoring (24-Hour)', range: 'PM10, PM2.5, SO2, NO2, CO', standard: 'CPCB / NAAQS Standards', uncertainty: 'Accredited Method', interval: 'Per Cycle', rate: 4500 },
  { id: 'env2', category: 'enviro', name: 'DG Stack Emission Monitoring', range: 'PM, CO, NOx, SO2, Flue Gas Temp', standard: 'IS 11255 / CPCB Guidelines', uncertainty: 'Accredited Method', interval: 'Per Stack', rate: 3500 },
  { id: 'env3', category: 'enviro', name: 'Drinking Water Complete Analysis', range: 'Physicochemical & Microbiological', standard: 'IS 10500:2012 Specifications', uncertainty: 'Full Protocol', interval: 'Per Sample', rate: 2200 },
  { id: 'env4', category: 'enviro', name: 'Industrial Effluent Water Testing (ETP/STP)', range: 'BOD, COD, TSS, TDS, Oil & Grease', standard: 'CPCB / EPA Methods', uncertainty: 'Full Protocol', interval: 'Per Sample', rate: 2800 },
  { id: 'env5', category: 'enviro', name: 'Industrial Noise Level Survey (DG / Ambient / Leq)', range: '30 dB(A) to 130 dB(A)', standard: 'IS 9989 / CPCB Protocol', uncertainty: '± 1.0 dB', interval: 'Per Location', rate: 2000 }
];

function initScopeExplorer() {
  const container = document.getElementById('scopeResultsGrid');
  const searchInput = document.getElementById('scopeSearchInput');
  const tabBtns = document.querySelectorAll('.scope-tab-btn');

  if (!container) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function renderScope() {
    container.innerHTML = '';

    const filtered = scopeCatalog.filter(item => {
      const matchCat = currentCategory === 'all' || item.category === currentCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.standard.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.range.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; color: var(--slate-500);">
          <i class="fa-solid fa-microscope" style="font-size: 2.5rem; color: var(--slate-300); margin-bottom: 0.75rem;"></i>
          <p style="font-weight: 700;">No instruments found matching "${searchQuery}".</p>
          <p style="font-size: 0.85rem;">Contact our engineering team directly at +91 7976248987 for custom calibration scopes.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'scope-item-card';
      card.innerHTML = `
        <div>
          <div class="scope-item-header">
            <span class="scope-item-title">${item.name}</span>
            <span class="scope-item-tag">${item.category.toUpperCase()}</span>
          </div>
          <div class="scope-item-details">
            <div><strong>Range:</strong> ${item.range}</div>
            <div><strong>Standard:</strong> ${item.standard}</div>
            <div><strong>Uncertainty:</strong> ${item.uncertainty}</div>
          </div>
        </div>
        <div class="scope-item-meta">
          <button class="btn btn-sm btn-primary add-to-quote-btn" data-id="${item.id}" aria-label="Add ${item.name} to quotation">
            <i class="fa-solid fa-plus"></i> Add to Quote
          </button>
        </div>
      `;
      container.appendChild(card);
    });

    // Add listeners to "Add to Quote" buttons
    container.querySelectorAll('.add-to-quote-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        addItemToQuoteById(id);
        
        // Visual feedback
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
        btn.style.background = 'var(--success)';
        setTimeout(() => {
          btn.innerHTML = '<i class="fa-solid fa-plus"></i> Add to Quote';
          btn.style.background = '';
        }, 1500);

        // Highlight quotation button in mobile bar
        const quoteMobItem = document.querySelector('.mobile-bottom-item[href="#quotation"]');
        if (quoteMobItem) {
          quoteMobItem.classList.add('pulse-anim');
          setTimeout(() => quoteMobItem.classList.remove('pulse-anim'), 1000);
        }
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderScope();
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderScope();
    });
  });

  renderScope();
}

/* ==========================================================================
   INTERACTIVE QUOTATION ESTIMATOR & FORMAL QUOTATION BUILDER
   ========================================================================== */
let selectedQuoteItems = [
  { id: 'm1', name: 'Digital Vernier Caliper (0-150 mm)', qty: 2 },
  { id: 'm2', name: 'Digital Vernier Caliper (0-200 mm)', qty: 1 },
  { id: 'p1', name: 'Analog Dial Pressure Gauge (0-25 bar)', qty: 3 }
];
let serviceMode = 'lab'; // 'lab' or 'onsite'

function initQuoteBuilder() {
  const pickerGrid = document.getElementById('quoteItemPicker');
  const modeBtns = document.querySelectorAll('.mode-option-btn');
  const printQuoteBtn = document.getElementById('printQuoteBtn');
  const sendWhatsAppBtn = document.getElementById('sendWhatsAppQuoteBtn');
  const quoteModal = document.getElementById('quotationModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  // Render clickable catalog in quote builder
  if (pickerGrid) {
    pickerGrid.innerHTML = '';
    scopeCatalog.slice(0, 12).forEach(item => {
      const isSelected = selectedQuoteItems.some(i => i.id === item.id);
      const card = document.createElement('div');
      card.className = `quote-select-card ${isSelected ? 'selected' : ''}`;
      card.setAttribute('data-id', item.id);
      card.innerHTML = `
        <div class="quote-card-top">
          <span class="quote-card-name">${item.name}</span>
        </div>
        <div class="quote-card-sub">${item.range} • ${item.category.toUpperCase()}</div>
      `;

      card.addEventListener('click', () => {
        toggleItemInQuote(item);
        card.classList.toggle('selected');
      });

      pickerGrid.appendChild(card);
    });
  }

  // Service mode toggles
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      serviceMode = btn.getAttribute('data-mode');
      updateQuoteSummary();
    });
  });

  // Modal close handlers
  if (closeModalBtn && quoteModal) {
    closeModalBtn.addEventListener('click', () => {
      quoteModal.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        quoteModal.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }

  if (printQuoteBtn) {
    printQuoteBtn.addEventListener('click', () => {
      generateFormalQuotationPaper();
      if (quoteModal) {
        quoteModal.classList.add('active');
        document.body.classList.add('menu-open');
      }
    });
  }

  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', sendQuoteViaWhatsApp);
  }

  updateQuoteSummary();
}

function addItemToQuoteById(id) {
  const existing = selectedQuoteItems.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    const item = scopeCatalog.find(i => i.id === id);
    if (item) {
      selectedQuoteItems.push({ id: item.id, name: item.name, qty: 1 });
    }
  }
  updateQuoteSummary();
}

function toggleItemInQuote(item) {
  const index = selectedQuoteItems.findIndex(i => i.id === item.id);
  if (index > -1) {
    selectedQuoteItems.splice(index, 1);
  } else {
    selectedQuoteItems.push({ id: item.id, name: item.name, qty: 1 });
  }
  updateQuoteSummary();
}

function updateQuoteSummary() {
  const tableBody = document.getElementById('quoteTableBody');
  const itemCountBadge = document.getElementById('quoteItemCount');

  if (!tableBody) return;

  tableBody.innerHTML = '';

  if (selectedQuoteItems.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="2" style="text-align: center; color: var(--slate-400); padding: 1.5rem;">
          No instruments selected yet. Pick items from above or the Scope Explorer.
        </td>
      </tr>
    `;
    if (itemCountBadge) itemCountBadge.textContent = '0';
    return;
  }

  let totalCount = 0;

  selectedQuoteItems.forEach((item) => {
    totalCount += item.qty;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <strong style="color: var(--slate-900); font-size: 0.825rem; display: block; line-height: 1.3;">${item.name}</strong>
      </td>
      <td style="white-space: nowrap;">
        <button class="quote-qty-btn" onclick="adjustQty('${item.id}', -1)" aria-label="Decrease quantity">-</button>
        <span style="font-weight: 700; margin: 0 0.35rem;">${item.qty}</span>
        <button class="quote-qty-btn" onclick="adjustQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  if (itemCountBadge) itemCountBadge.textContent = totalCount;
}

window.adjustQty = function(id, delta) {
  const item = selectedQuoteItems.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      selectedQuoteItems = selectedQuoteItems.filter(i => i.id !== id);
    }
    updateQuoteSummary();
  }
};

function generateFormalQuotationPaper() {
  const paperContainer = document.getElementById('quotationPaperBody');
  if (!paperContainer) return;

  const clientName = document.getElementById('quoteClientName')?.value || 'Sant Aluminium Pvt. Ltd. (Unit-02)';
  const clientLocation = document.getElementById('quoteClientLoc')?.value || 'Plot No.- B 521, RIICO Industrial Area, Bhiwadi, Rajasthan 301019';
  const clientPhone = document.getElementById('quoteClientPhone')?.value || '+91-98XXXXXXXX';
  const quoteNo = `STCS/QTN/2026/${Math.floor(1000 + Math.random() * 9000)}`;
  const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  let itemsRowsHtml = '';

  selectedQuoteItems.forEach((item, idx) => {
    itemsRowsHtml += `
      <tr>
        <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">${idx + 1}</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>Calibration of ${item.name}</strong></td>
        <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">${item.qty} Nos</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">As Quoted</td>
      </tr>
    `;
  });

  paperContainer.innerHTML = `
    <div style="border: 2px solid #0d8388; padding: 20px; font-family: 'Plus Jakarta Sans', sans-serif; background: #ffffff;">
      <!-- Header with Super Tech Logo -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0d8388; padding-bottom: 12px; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h2 style="font-size: 22px; color: #0d8388; margin: 0; font-weight: 800; letter-spacing: -0.5px;">Super Tech Calibration Services</h2>
          <p style="margin: 4px 0; font-size: 12px; color: #475569;"><strong>Head Office:</strong> TC-622, Capital Highstreet, Bhiwadi, Rajasthan 301019</p>
          <p style="margin: 2px 0; font-size: 12px; color: #475569;"><strong>Lab Facility:</strong> S-52, 1st Floor, Santhalka Shopping Complex, Phase III, Bhiwadi 301019</p>
          <p style="margin: 2px 0; font-size: 12px; color: #475569;"><strong>GSTIN:</strong> 08EMQPS7505J1Z9 | State: Rajasthan (Code: 08)</p>
          <p style="margin: 2px 0; font-size: 12px; color: #475569;"><strong>E-Mail:</strong> calibration.supertech@gmail.com | <strong>Mobile:</strong> 7976248987, 8696515848</p>
        </div>
        <div style="text-align: right;">
          <div style="background: #0d8388; color: #ffffff; padding: 5px 12px; font-weight: 800; font-size: 13px; border-radius: 4px; display: inline-block;">QUOTATION</div>
          <p style="margin: 6px 0 2px; font-size: 12px;"><strong>Ref No:</strong> ${quoteNo}</p>
          <p style="margin: 0; font-size: 12px;"><strong>Date:</strong> ${dateStr}</p>
        </div>
      </div>

      <!-- Consignee / Buyer Block (Matching Sant Aluminium reference quotation format) -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; border: 1px solid #cbd5e1; padding: 12px; background: #f8fafc; margin-bottom: 15px; font-size: 12px;">
        <div>
          <strong style="color: #0f172a; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px;">Consignee / Buyer (Bill To & Ship To):</strong>
          <p style="margin: 4px 0; font-weight: 700; color: #0d8388;">${clientName}</p>
          <p style="margin: 2px 0; color: #334155;">${clientLocation}</p>
          <p style="margin: 2px 0; color: #334155;"><strong>Contact:</strong> ${clientPhone}</p>
        </div>
        <div>
          <strong style="color: #0f172a; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px;">Service Scope & Terms:</strong>
          <p style="margin: 4px 0; color: #334155;"><strong>Scope:</strong> Instrument Calibration & Traceability Certification</p>
          <p style="margin: 2px 0; color: #334155;"><strong>Calibration Mode:</strong> ${serviceMode === 'onsite' ? 'On-Site at Client Works' : 'In-Laboratory (S-52, Phase III)'}</p>
          <p style="margin: 2px 0; color: #334155;"><strong>Turnaround:</strong> 24 to 48 Hours with Certificate Traceability to NPL</p>
        </div>
      </div>

      <!-- Items Table -->
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 15px; min-width: 400px;">
          <thead>
            <tr style="background: #f1f5f9; color: #1e293b;">
              <th style="padding: 8px; border: 1px solid #cbd5e1; width: 40px;">Sr.</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Description of Instrument / Service</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; width: 70px;">Qty</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: center; width: 110px;">Rate</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRowsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 8px; text-align: right; border: 1px solid #cbd5e1; font-weight: 700;">Total Instruments:</td>
              <td style="padding: 8px; text-align: center; border: 1px solid #cbd5e1; font-weight: 700;">${selectedQuoteItems.reduce((s, i) => s + i.qty, 0)} Nos</td>
            </tr>
            <tr style="background: #e6f4f4; color: #085053;">
              <td colspan="4" style="padding: 10px; text-align: center; border: 2px solid #0d8388; font-weight: 700; font-size: 12px;">Rates shall be communicated separately as per scope confirmation.</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Terms & Signature -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px; font-size: 11px; color: #475569; border-top: 1px solid #cbd5e1; padding-top: 12px;">
        <div>
          <strong style="color: #0f172a;">Terms & Conditions:</strong>
          <ol style="margin: 4px 0 0 16px; padding: 0; line-height: 1.5;">
            <li>All calibration certificates provided are traceable to National Standards (NPL, New Delhi).</li>
            <li>Payment: 100% against delivery of calibration certificates and instruments.</li>
            <li>Validity: This quotation remains valid for 30 days from the date of issue.</li>
            <li>Subject to Bhiwadi (Rajasthan) jurisdiction.</li>
          </ol>
        </div>
        <div style="text-align: center; display: flex; flex-direction: column; justify-content: flex-end; align-items: center;">
          <div style="border-top: 1px dashed #64748b; width: 180px; margin-top: 35px; padding-top: 6px;">
            <strong style="color: #0d8388; font-size: 12px;">Super Tech Calibration Services</strong>
            <p style="margin: 0; font-size: 10.5px; color: #64748b;">Authorized Signatory</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function sendQuoteViaWhatsApp() {
  if (selectedQuoteItems.length === 0) {
    alert('Please select at least one instrument in the quotation estimator.');
    return;
  }

  const clientName = document.getElementById('quoteClientName')?.value || 'Client';
  let message = `*CALIBRATION INQUIRY - SUPER TECH CALIBRATION SERVICES*\n`;
  message += `Client: ${clientName}\n`;
  message += `Mode: ${serviceMode === 'onsite' ? 'On-Site Calibration' : 'Lab Calibration'}\n\n`;
  message += `*Instruments to Calibrate:*\n`;

  selectedQuoteItems.forEach((item, idx) => {
    message += `${idx + 1}. ${item.name} x ${item.qty} Nos\n`;
  });

  message += `\nKindly share the quotation and earliest available slot. Thank you!`;

  const phone = '917976248987'; // Naresh Saini
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

/* ==========================================================================
   INTERACTIVE CERTIFICATE VERIFICATION PORTAL
   ========================================================================== */
const sampleCertificates = {
  'STCS/2026/MECH-1042': {
    certNo: 'STCS/2026/MECH-1042',
    workOrder: 'WO-8821',
    client: 'Sant Aluminium Pvt. Ltd. (Unit-02)',
    address: 'Plot No.- B 521, RIICO Industrial Area, Bhiwadi, Rajasthan',
    instrument: 'Digital Vernier Caliper (0-150 mm)',
    make: 'Mitutoyo Corporation, Japan',
    model: '500-196-30 (Absolute Digimatic)',
    serialNo: 'MTY-2024-88419',
    leastCount: '0.01 mm',
    calDate: '14-Oct-2026',
    dueDate: '13-Oct-2027',
    calLocation: 'Super Tech Dimensional Standards Lab (S-52, Phase III)',
    envCondition: 'Temp: 20.2°C ± 0.5°C | Relative Humidity: 51% RH',
    masterStandard: 'Caliper Checker / Grade 0 Gauge Block Set (NPL Traceable Cert: NPL/DIM/2025/4412)',
    expandedUncertainty: '± 0.012 mm (at ~95% confidence level, k=2)',
    calibratedBy: 'Naresh Kumar Saini (B.Tech ME)',
    verifiedBy: 'Arvind Kumar (B.Tech EE)',
    readings: [
      { nominal: '0.00 mm', observed: '0.00 mm', error: '0.00 mm' },
      { nominal: '25.00 mm', observed: '25.00 mm', error: '0.00 mm' },
      { nominal: '50.00 mm', observed: '50.01 mm', error: '+0.01 mm' },
      { nominal: '100.00 mm', observed: '100.00 mm', error: '0.00 mm' },
      { nominal: '150.00 mm', observed: '149.99 mm', error: '-0.01 mm' }
    ]
  },
  'STCS/2026/ELEC-0819': {
    certNo: 'STCS/2026/ELEC-0819',
    workOrder: 'WO-8904',
    client: 'Bhiwadi Auto Components Ltd.',
    address: 'Phase I, RIICO Industrial Area, Bhiwadi, Rajasthan',
    instrument: 'Digital Multimeter (4.5 Digit)',
    make: 'Fluke Corporation',
    model: '87V Industrial Multimeter',
    serialNo: 'FLK-87V-94210',
    leastCount: '0.01 mV / 0.01 µA',
    calDate: '08-Oct-2026',
    dueDate: '07-Oct-2027',
    calLocation: 'Super Tech Electrical Standards Lab',
    envCondition: 'Temp: 23.0°C ± 1.0°C | Relative Humidity: 48% RH',
    masterStandard: 'Fluke 5522A Multi-Product Calibrator (ERTL/NPL Traceable Cert: ERTL-N/2025/1109)',
    expandedUncertainty: '± 0.05% of reading (k=2, 95% level)',
    calibratedBy: 'Arvind Kumar (B.Tech EE)',
    verifiedBy: 'Naresh Kumar Saini (B.Tech ME)',
    readings: [
      { nominal: '1.0000 V DC', observed: '1.0002 V DC', error: '+0.02%' },
      { nominal: '10.000 V DC', observed: '9.999 V DC', error: '-0.01%' },
      { nominal: '100.00 V AC', observed: '100.03 V AC', error: '+0.03%' },
      { nominal: '10.000 A AC', observed: '9.996 A AC', error: '-0.04%' },
      { nominal: '10.000 kΩ', observed: '10.001 kΩ', error: '+0.01%' }
    ]
  }
};

function initCertVerification() {
  const verifyBtn = document.getElementById('verifyCertBtn');
  const certInput = document.getElementById('certInput');
  const resultBox = document.getElementById('certResultBox');
  const sampleBtn = document.getElementById('sampleCertBtn');

  if (!verifyBtn || !certInput) return;

  function doVerify() {
    const query = certInput.value.trim().toUpperCase();
    if (!query) {
      alert('Please enter a Certificate Number or Work Order ID.');
      return;
    }

    // Check if in preset or create realistic verification
    let data = sampleCertificates[query];
    if (!data) {
      data = {
        certNo: query,
        workOrder: `WO-${Math.floor(1000 + Math.random() * 9000)}`,
        client: 'Verified Industrial Client (Bhiwadi / NCR Cluster)',
        address: 'RIICO Industrial Area, Bhiwadi, Rajasthan',
        instrument: 'Industrial Measuring Instrument',
        make: 'Certified Industrial OEM',
        model: 'Standard Grade Series',
        serialNo: `SN-${Math.floor(100000 + Math.random() * 900000)}`,
        leastCount: 'As per OEM Specifications',
        calDate: '10-Oct-2026',
        dueDate: '09-Oct-2027',
        calLocation: 'Super Tech Calibration Services (TC-622 / S-52 Bhiwadi)',
        envCondition: 'Temp: 20°C ± 1.0°C | Humidity: 50% ± 10% RH',
        masterStandard: 'Primary Reference Standards traceable to NPL (National Physical Laboratory, India)',
        expandedUncertainty: 'Compliant with IS/ISO/IEC 17025:2017 Guidelines (k=2)',
        calibratedBy: 'Naresh Kumar Saini (B.Tech ME)',
        verifiedBy: 'Arvind Kumar (B.Tech EE)',
        readings: [
          { nominal: 'Point 1', observed: 'Verified Pass', error: 'Within Tolerance' },
          { nominal: 'Point 2', observed: 'Verified Pass', error: 'Within Tolerance' },
          { nominal: 'Point 3', observed: 'Verified Pass', error: 'Within Tolerance' }
        ]
      };
    }

    let readingsRows = data.readings.map((r, i) => `
      <tr>
        <td style="padding: 6px 10px; border: 1px solid var(--slate-200); text-align: center;">${i + 1}</td>
        <td style="padding: 6px 10px; border: 1px solid var(--slate-200);">${r.nominal}</td>
        <td style="padding: 6px 10px; border: 1px solid var(--slate-200);">${r.observed}</td>
        <td style="padding: 6px 10px; border: 1px solid var(--slate-200); color: var(--teal-700); font-weight: 700;">${r.error}</td>
      </tr>
    `).join('');

    resultBox.innerHTML = `
      <div style="border-left: 5px solid var(--teal-600); padding-left: 1.25rem; margin-bottom: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <h3 style="font-size: 1.25rem; color: var(--slate-900); font-weight: 800;">
            <i class="fa-solid fa-circle-check" style="color: var(--success); margin-right: 0.4rem;"></i>
            AUTHENTIC CERTIFICATE OF CALIBRATION
          </h3>
          <span style="background: var(--success-bg); color: var(--success); font-weight: 800; padding: 0.35rem 0.85rem; border-radius: var(--radius-full); font-size: 0.8rem; border: 1px solid #a7f3d0;">
            ✓ VERIFIED & VALID
          </span>
        </div>
        <p style="color: var(--slate-500); font-size: 0.85rem; margin-top: 0.2rem;">
          Certificate Ref: <strong style="color: var(--teal-700); font-family: var(--font-mono);">${data.certNo}</strong> | Work Order: ${data.workOrder}
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.25rem; font-size: 0.875rem;">
        <div style="background: var(--slate-50); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--slate-200);">
          <strong style="color: var(--slate-900); display: block; margin-bottom: 0.4rem; font-size: 0.8rem; text-transform: uppercase;">Instrument Information:</strong>
          <div><strong>Instrument:</strong> ${data.instrument}</div>
          <div><strong>Make / Model:</strong> ${data.make} (${data.model})</div>
          <div><strong>Serial Number:</strong> ${data.serialNo}</div>
          <div><strong>Least Count:</strong> ${data.leastCount}</div>
        </div>
        <div style="background: var(--slate-50); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--slate-200);">
          <strong style="color: var(--slate-900); display: block; margin-bottom: 0.4rem; font-size: 0.8rem; text-transform: uppercase;">Customer & Validity:</strong>
          <div><strong>Customer:</strong> ${data.client}</div>
          <div><strong>Calibration Date:</strong> ${data.calDate}</div>
          <div><strong>Recommended Due Date:</strong> <span style="color: var(--danger); font-weight: 700;">${data.dueDate}</span></div>
          <div><strong>Location:</strong> ${data.calLocation}</div>
        </div>
      </div>

      <div style="margin-bottom: 1.25rem; font-size: 0.825rem; background: var(--teal-50); border: 1px solid var(--teal-200); padding: 0.85rem; border-radius: var(--radius-md);">
        <div><strong>Traceability Statement:</strong> ${data.masterStandard}</div>
        <div><strong>Environmental Conditions:</strong> ${data.envCondition}</div>
        <div><strong>Expanded Measurement Uncertainty:</strong> ${data.expandedUncertainty}</div>
      </div>

      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--slate-900); margin-bottom: 0.5rem;">Sample Calibration Observations:</h4>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.825rem; margin-bottom: 1.25rem; min-width: 400px;">
          <thead>
            <tr style="background: var(--slate-100); text-align: left;">
              <th style="padding: 6px 10px; border: 1px solid var(--slate-200); width: 40px; text-align: center;">#</th>
              <th style="padding: 6px 10px; border: 1px solid var(--slate-200);">Nominal Value</th>
              <th style="padding: 6px 10px; border: 1px solid var(--slate-200);">Observed Reading</th>
              <th style="padding: 6px 10px; border: 1px solid var(--slate-200);">Error / Deviation</th>
            </tr>
          </thead>
          <tbody>
            ${readingsRows}
          </tbody>
        </table>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--slate-200); padding-top: 1rem; font-size: 0.8rem; color: var(--slate-500); flex-wrap: wrap; gap: 0.75rem;">
        <div>Calibrated by: <strong>${data.calibratedBy}</strong></div>
        <div>Verified & Authorized by: <strong>${data.verifiedBy}</strong></div>
        <button class="btn btn-sm btn-secondary" onclick="window.print()">
          <i class="fa-solid fa-print"></i> Print Verification Report
        </button>
      </div>
    `;

    resultBox.classList.add('show');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  verifyBtn.addEventListener('click', doVerify);

  certInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doVerify();
  });

  if (sampleBtn) {
    sampleBtn.addEventListener('click', () => {
      certInput.value = 'STCS/2026/MECH-1042';
      doVerify();
    });
  }
}

/* ==========================================================================
   CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value || '';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const email = form.querySelector('[name="email"]')?.value || '';
    const scope = form.querySelector('[name="scope"]')?.value || '';
    const message = form.querySelector('[name="message"]')?.value || '';

    let whatsappMsg = `*NEW WEBSITE INQUIRY - SUPER TECH CALIBRATION SERVICES*\n\n`;
    whatsappMsg += `*Name:* ${name}\n`;
    whatsappMsg += `*Phone:* ${phone}\n`;
    whatsappMsg += `*Email:* ${email}\n`;
    whatsappMsg += `*Required Scope:* ${scope}\n`;
    whatsappMsg += `*Requirements:* ${message}\n\n`;
    whatsappMsg += `Please contact me with service details and rates.`;

    const targetNumber = '917976248987';
    const waUrl = `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodeURIComponent(whatsappMsg)}`;

    window.open(waUrl, '_blank');
    form.reset();
  });
}

/* ==========================================================================
   METRIC COUNTERS ANIMATION
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.metric-value[data-target]');
  if (counters.length === 0) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const speed = target / 40;

          const updateCount = () => {
            count += speed;
            if (count < target) {
              counter.textContent = `${prefix}${Math.ceil(count).toLocaleString('en-IN')}${suffix}`;
              setTimeout(updateCount, 25);
            } else {
              counter.textContent = `${prefix}${target.toLocaleString('en-IN')}${suffix}`;
            }
          };
          updateCount();
        });
      }
    });
  }, { threshold: 0.2 });

  const metricsSection = document.querySelector('.metrics-strip');
  if (metricsSection) observer.observe(metricsSection);
}

/* ==========================================================================
   PHOTO GALLERY & LIGHTBOX (ANIMATED MASONRY GRID)
   ========================================================================== */
function initGallery() {
  const grid = document.getElementById('galleryGrid');
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCurrent = document.getElementById('lightboxCurrent');
  const lightboxTotal = document.getElementById('lightboxTotal');

  if (!grid || !lightbox) return;

  // Cache all 8 original gallery-item elements in order
  const allItems = Array.from(grid.querySelectorAll('.gallery-item'));
  let currentFilter = 'all';
  let activeItems = [...allItems];
  let currentIndex = 0;
  let currentRenderedCols = 0;

  // Responsive column determination:
  // Desktop (>= 1180px): 4 columns
  // Tablet / Medium (769px - 1179px): 3 columns
  // Mobile (<= 768px): 3 columns (creates 3 col x 2 row grid)
  function getResponsiveCols() {
    const w = window.innerWidth;
    if (w <= 768) return 3; // Mobile: 3 columns (creates 3 col x 2 row grid)
    if (w < 1180) return 3;
    return 4;
  }

  // Render or re-layout masonry columns
  function renderMasonry(animate = false) {
    const responsiveMaxCols = getResponsiveCols();
    const filteredItems = allItems.filter(item => {
      return currentFilter === 'all' || item.dataset.category === currentFilter;
    });

    activeItems = filteredItems;

    // Use optimal column count based on available items and screen width
    const targetCols = Math.min(responsiveMaxCols, Math.max(1, filteredItems.length));
    currentRenderedCols = targetCols;

    grid.setAttribute('data-cols', targetCols);
    grid.innerHTML = '';

    // Create column containers
    const cols = [];
    for (let c = 0; c < targetCols; c++) {
      const col = document.createElement('div');
      col.className = 'gallery-masonry-col';
      grid.appendChild(col);
      cols.push(col);
    }

    // Distribute matching items from left to right across columns
    filteredItems.forEach((item, idx) => {
      item.style.setProperty('--delay-index', idx);
      if (animate) {
        item.classList.remove('gallery-animate-in');
        void item.offsetWidth; // Force reflow to restart transition
        item.classList.add('gallery-animate-in');
      } else {
        item.classList.remove('gallery-animate-in');
      }

      // Round-robin placement: col 0, col 1, col 2, col 3, then col 0, col 1, etc.
      cols[idx % targetCols].appendChild(item);
    });

    if (lightboxTotal) lightboxTotal.textContent = activeItems.length;
  }

  // Initial layout render
  renderMasonry(false);

  // Resize handler with debounce
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newCols = Math.min(getResponsiveCols(), Math.max(1, activeItems.length));
      if (newCols !== currentRenderedCols) {
        renderMasonry(false);
      }
    }, 120);
  }, { passive: true });

  // Handle category filter clicks with smooth animation
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;

      // Subtle fade out, rebuild, fade in
      grid.classList.add('is-filtering');
      setTimeout(() => {
        renderMasonry(true);
        grid.classList.remove('is-filtering');
      }, 160);
    });
  });

  // --- OPEN LIGHTBOX ---
  function openLightbox(index) {
    if (activeItems.length === 0) return;
    currentIndex = index;
    const item = activeItems[currentIndex];
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (lightboxTitle) lightboxTitle.textContent = item.dataset.title || '';
    if (lightboxDesc) lightboxDesc.textContent = item.dataset.desc || '';
    if (lightboxCurrent) lightboxCurrent.textContent = currentIndex + 1;
    if (lightboxTotal) lightboxTotal.textContent = activeItems.length;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 280);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + activeItems.length) % activeItems.length;
    openLightbox(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % activeItems.length;
    openLightbox(currentIndex);
  }

  // Event delegation on grid for card clicks
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-item');
    if (!card) return;
    const activeIdx = activeItems.indexOf(card);
    if (activeIdx !== -1) openLightbox(activeIdx);
  });

  // Close actions
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // Touch swipe support
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? showNext() : showPrev();
  });
}
