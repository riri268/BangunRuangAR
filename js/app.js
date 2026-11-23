const toast = document.getElementById('toast');
let toastTimer;
function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.classList.remove('show'),2300);
}

document.querySelectorAll('[data-page]').forEach(button=>{
  button.addEventListener('click',()=>{
    const page = button.dataset.page;
    document.querySelectorAll('.nav-link').forEach(link=>link.classList.toggle('active',link.dataset.page===page));
    if(page==='Beranda') showToast('Kamu sedang berada di Beranda BangunRuang.');
    else showToast(`Menu ${page} siap dibuka. Konten halaman dapat ditambahkan pada tahap berikutnya.`);
    document.getElementById('sidebar').classList.remove('open');
  });
});

document.querySelectorAll('[data-material]').forEach(card=>{
  card.addEventListener('click',()=>showToast(`Materi ${card.dataset.material} dipilih. Selamat belajar!`));
});

const searchInput=document.getElementById('searchInput');
const materialCards=[...document.querySelectorAll('.material-card')];
const emptyState=document.getElementById('emptyState');
searchInput.addEventListener('input',()=>{
  const query=searchInput.value.trim().toLowerCase();
  let visible=0;
  materialCards.forEach(card=>{
    const match=card.dataset.material.toLowerCase().includes(query);
    card.hidden=!match;
    if(match) visible++;
  });
  emptyState.hidden=visible!==0;
});

document.getElementById('themeToggle').addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  showToast(document.body.classList.contains('dark')?'Mode gelap diaktifkan.':'Mode terang diaktifkan.');
});
document.getElementById('mobileMenu').addEventListener('click',()=>{
  document.getElementById('sidebar').classList.toggle('open');
});
document.getElementById('profileButton').addEventListener('click',()=>showToast('Halo! Selamat belajar di BangunRuang.'));
document.querySelector('.notification').addEventListener('click',()=>showToast('Belum ada notifikasi baru.'));
document.addEventListener('keydown',event=>{
  if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){
    event.preventDefault();searchInput.focus();
  }
  if(event.key==='Escape')document.getElementById('sidebar').classList.remove('open');
});
