document.addEventListener('DOMContentLoaded', init);


const tracks = [
  { id: 't1', title: 'Within Time', length: '5:01', preview: 'audio/track1-demo.mp3' },
  { id: 't2', title: 'See ya | Demo', length: '3:05', preview: 'audio/track2-demo.mp3' },
  { id: 't3', title: 'Standby | Demo', length: '1:44', preview: 'audio/track3-demo.mp3' }
];

const shows = [
  { id:'s1', date:'01-03-2026', city:'Harrisonburg, VA', venue:'The Warehouse', soldOut:false, tickets:'' },
  { id:'s2', date:'02-14-2026', city:'Charlottesville, VA', venue:'House show', soldOut:true, tickets:'' },
  { id:'s3', date:'03-13-2026', city:'Fredericksburg, VA', venue:'Bumrush Vinyl', soldOut:false, tickets:'' }
];

const galleryImages = [
  { id:'g1', src:'images/gallery1-600.jpg', alt:'Live shot 1' },
  { id:'g2', src:'images/gallery2-600.jpg', alt:'Live shot 2' },
  { id:'g3', src:'images/gallery3-600.jpg', alt:'Live shot 3' },
  { id:'g4', src:'images/gallery4-600.jpg', alt:'Backstage' }
];


function init(){
  setYearElements();
  setupMenuToggle();
  renderLatestTracks();
  renderHomeShows();
  renderAllShows();
  renderMusicPage();
  renderGallery();
  setupFormHandling();
  observeHeroLazy();
}

function setYearElements(){
  const year = new Date().getFullYear();
  document.querySelectorAll('[id^="year"]').forEach(el => el.textContent = `${year}`);
}


function setupMenuToggle(){
  const btn = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if(!btn || !nav) return;

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}


function renderLatestTracks(){
  const container = document.getElementById('tracksContainer');
  if(!container) return;


  const latest = tracks.slice(0,2);
  container.innerHTML = latest.map(track => {
    const previewButton = track.preview ? `<button class="preview" data-src="${track.preview}">Preview</button>` : `<span class="no-preview">No preview</span>`;
    return `
      <article class="card" id="${track.id}">
        <h3>${track.title}</h3>
        <p>Length: ${track.length}</p>
        <div>${previewButton}</div>
      </article>
    `;
  }).join('');


  container.querySelectorAll('.preview').forEach(btn => {
    btn.addEventListener('click', (e) => {
      handlePreviewClick(e.currentTarget.getAttribute('data-src'));
    });
  });
}


function handlePreviewClick(src){
  let player = document.querySelector('#audioPreview');
  if(player){
    player.remove();
    return;
  }
  player = document.createElement('audio');
  player.id = 'audioPreview';
  player.controls = true;
  player.src = src;
  player.setAttribute('aria-label', 'Track preview player');

  document.body.appendChild(player);
  player.play().catch(()=>{});
}


function renderHomeShows(){
  const container = document.getElementById('homeShows');
  if(!container) return;


  const today = new Date();
  const upcoming = shows.filter(s => new Date(s.date) >= today).slice(0,2);

  container.innerHTML = upcoming.map(s => {
    const soldLabel = s.soldOut ? `<strong class="sold">Sold Out</strong>` : `<a href="${s.tickets || '#'}" target="_blank" rel="noopener">Tickets</a>`;
    return `
      <article class="card" id="${s.id}">
        <h3>${s.venue} — ${s.city}</h3>
        <p>${formatDate(s.date)}</p>
        <p>${soldLabel}</p>
      </article>
    `;
  }).join('');
}


function renderAllShows(){
  const container = document.getElementById('showsList');
  if(!container) return;


  const sorted = [...shows].sort((a,b) => new Date(a.date) - new Date(b.date));

  container.innerHTML = sorted.map(s => {
    const availability = s.soldOut ? 'Sold out' : 'Tickets available';
    const bookBtn = `<button class="bookBtn" data-venue="${s.venue}" data-date="${s.date}">Book</button>`;
    return `
      <article class="card" id="${s.id}">
        <h3>${s.venue}</h3>
        <p>${s.city} • ${formatDate(s.date)}</p>
        <p>${availability}</p>
        <div>${s.soldOut ? `<em>No action available</em>` : `${bookBtn}`}</div>
      </article>
    `;
  }).join('');

  
  container.querySelectorAll('.bookBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const venue = e.currentTarget.getAttribute('data-venue');
      const date = e.currentTarget.getAttribute('data-date');
      
      localStorage.setItem('prefillBooking', JSON.stringify({ venue, date }));
      window.location.href = 'contact.html';
    });
  });

  
  container.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('click', (e)=>{
      if(e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'a') return;
      const existing = card.querySelector('.more');
      if(existing){ existing.remove(); return; }
      const id = card.id;
      const showObj = shows.find(s => s.id === id);
      if(!showObj) return;
      const extra = document.createElement('div');
      extra.className = 'more';
      extra.innerHTML = `
        <p>Further details: ${showObj.venue} in ${showObj.city} on ${formatDate(showObj.date)}</p>
      `;
      card.appendChild(extra);
    });
  });
}


function renderMusicPage(){
  const container = document.getElementById('musicList');
  if(!container) return;

  container.innerHTML = tracks.map(track => {
    const preview = track.preview ? `<button class="preview" data-src="${track.preview}">Preview</button>` : `<span class="no-preview">No preview</span>`;
    return `
      <article class="card" id="${track.id}">
        <h3>${track.title}</h3>
        <p>Length: ${track.length}</p>
        <div>${preview}</div>
      </article>
    `;
  }).join('');

  container.querySelectorAll('.preview').forEach(btn=>{
    btn.addEventListener('click', e => handlePreviewClick(e.currentTarget.getAttribute('data-src')));
  });
}


function renderGallery(){
  const container = document.getElementById('galleryGrid');
  if(!container) return;

  container.innerHTML = galleryImages.map(img => {
    return `
      <figure class="card">
        <img data-src="${img.src}" alt="${img.alt}" class="lazy" loading="lazy">
        <figcaption>${img.alt}</figcaption>
      </figure>
    `;
  }).join('');

  
  container.querySelectorAll('img.lazy').forEach(img=>{
    img.addEventListener('click', () => {
      const src = img.getAttribute('data-src') || img.src;
      window.open(src, '_blank');
    });
  });

  
  const lazyImgs = [...container.querySelectorAll('img.lazy')];
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries, observer)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const im = entry.target;
          im.src = im.dataset.src;
          im.classList.remove('lazy');
          observer.unobserve(im);
        }
      });
    }, {rootMargin:'100px'});
    lazyImgs.forEach(i => io.observe(i));
  } else {
    
    lazyImgs.forEach(i => i.src = i.dataset.src);
  }
}



function setupFormHandling(){
  const form = document.getElementById('bookingForm');
  if(!form) return;

  
  const prefillRaw = localStorage.getItem('prefillBooking');
  if(prefillRaw){
    try{
      const { venue, date } = JSON.parse(prefillRaw);
      const venueInput = document.getElementById('venue');
      const dateInput = document.getElementById('date');
      if(venueInput) venueInput.value = venue || '';
      if(dateInput) dateInput.value = date || '';
      
      localStorage.removeItem('prefillBooking');
    } catch(e){}
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valid = validateForm(form);
    if(!valid) return;
    const payload = {
      id: `req_${Date.now()}`,
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      date: form.date.value,
      venue: form.venue.value.trim(),
      message: form.message.value.trim(),
      created: new Date().toISOString()
    };
    saveRequest(payload);
    renderSavedRequests();
    form.reset();
    const feedback = document.getElementById('formFeedback');
    if(feedback) feedback.innerHTML = `<p class="card">Thanks, ${payload.name}. Your request was saved locally.</p>`;
  });

  const clearBtn = document.getElementById('clearStorage');
  if(clearBtn){
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem('undertowBookings');
      renderSavedRequests();
    });
  }

  
  renderSavedRequests();
}


function validateForm(form){
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const date = form.date.value;
  const venue = form.venue.value.trim();

 
  if(!name || !email || !date || !venue){
    const feedback = document.getElementById('formFeedback');
    if(feedback) feedback.innerHTML = `<p class="card">Please fill in your name, email, date, and venue before submitting.</p>`;
    return false;
  }

 
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if(!emailOk){
    const feedback = document.getElementById('formFeedback');
    if(feedback) feedback.innerHTML = `<p class="card">Please enter a valid email address.</p>`;
    return false;
  }

  return true;
}


function saveRequest(req){
  const key = 'undertowBookings';
  const raw = localStorage.getItem(key);
  const list = raw ? JSON.parse(raw) : [];
  list.push(req);
  localStorage.setItem(key, JSON.stringify(list));
}


function renderSavedRequests(){
  const container = document.getElementById('savedRequests');
  if(!container) return;
  const raw = localStorage.getItem('undertowBookings');
  const list = raw ? JSON.parse(raw) : [];
  if(list.length === 0){
    container.innerHTML = `<div class="card"><p>No saved booking requests.</p></div>`;
    return;
  }

  
  container.innerHTML = list.map(item => {
    return `
      <article class="card" id="${item.id}">
        <h3>${item.name} — ${item.venue}</h3>
        <p><strong>Date:</strong> ${formatDate(item.date)} • <strong>Email:</strong> ${item.email}</p>
        <p>${item.message ? item.message : '<em>No additional details</em>'}</p>
        <p class="muted">Saved: ${new Date(item.created).toLocaleString()}</p>
      </article>
    `;
  }).join('');
}


function formatDate(iso){
  const d = new Date(iso);
  if(isNaN(d)) return iso;
  return d.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
}


function observeHeroLazy(){
  const heroImg = document.querySelector('.hero-img');
  if(!heroImg) return;
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          heroImg.classList.add('visible');
          obs.unobserve(heroImg);
        }
      });
    }, { rootMargin:'200px' });
    io.observe(heroImg);
  } else {
    heroImg.classList.add('visible');
  }
}
