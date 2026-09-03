/* ================= HELPERS ================= */
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const MON=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const MONL=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const dP=s=>{const[a,b,c]=s.split('-').map(Number);return new Date(a,b-1,c)};
const dShort=s=>{const d=dP(s);return d.getDate()+' '+MON[d.getMonth()]};
const dLong=s=>{const d=dP(s);return d.getDate()+' '+MONL[d.getMonth()]+' '+d.getFullYear()};
const daysDiff=(a,b)=>Math.max(1,Math.round((dP(b)-dP(a))/864e5));
const addDays=(s,n)=>{const d=dP(s);d.setDate(d.getDate()+n);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const fmtIDR=n=>'Rp'+Math.round(n).toLocaleString('id-ID');
const fmtK=n=>n>=1e6?'Rp'+(+(n/1e6).toFixed(n%1e6?1:0))+' jt':'Rp'+Math.round(n/1e3)+' rb';
const rnd=x=>{const v=Math.sin(x*127.1+311.7)*43758.5453;return v-Math.floor(v)};
const veh=id=>VEHICLES.find(v=>v.id===id);
const drv=id=>DRIVERS.find(d=>d.id===id);
const TODAY='2026-08-13';
function toast(msg,type='ok'){const c={ok:'border-emerald-500/40 text-emerald-300',err:'border-red-500/40 text-red-300',info:'border-sky-500/40 text-sky-300'}[type];
 const t=document.createElement('div');t.className=`toast-in card px-5 py-3 text-sm font-semibold border ${c} shadow-2xl flex items-center gap-2 max-w-[90vw]`;
 t.innerHTML=(type==='err'?'✕':type==='info'?'ℹ':'✓')+' '+msg;$('toasts').appendChild(t);setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity .4s';setTimeout(()=>t.remove(),400)},3200);}
function modal(html,wide){$('modalRoot').innerHTML=`<div class="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="if(event.target===this)closeModal()"><div class="modal-in card w-full ${wide?'max-w-3xl':'max-w-lg'} max-h-[88vh] overflow-y-auto bg-ink-800">${html}</div></div>`;}
function closeModal(){$('modalRoot').innerHTML='';}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('on');
 if(e.target.dataset.cu){const el=e.target,end=parseFloat(el.dataset.cu),suf=el.dataset.suf||'';let t0=null;
  const step=ts=>{if(!t0)t0=ts;const p=Math.min(1,(ts-t0)/1400);el.textContent=Math.round(end*(1-Math.pow(1-p,3))).toLocaleString('id-ID')+suf;if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step);}
 io.unobserve(e.target)}),{threshold:.15});
function revealInit(){document.querySelectorAll('.rv:not(.on),[data-cu]:not(.on)').forEach(el=>io.observe(el));}
function waLink(txt){return `https://wa.me/${S.cms.wa}?text=${encodeURIComponent(txt)}`;}

/* ================= ICONS ================= */
const IC={
car:'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
headset:'<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
wallet:'<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>',
cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
check:'<path d="M20 6L9 17l-5-5"/>',
arrR:'<path d="M5 12h14M13 6l6 6-6 6"/>',
x:'<path d="M18 6L6 18M6 6l12 12"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
dl:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
print:'<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>',
pin:'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
key:'<path d="M21 2l-2 2m-7.6 7.6a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L19 3m-4 4l2 2"/>',
wheel:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.6"/><path d="M12 14.6V21M3.4 10.4l6.1 1.1M20.6 10.4l-6.1 1.1"/>',
chart:'<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>',
file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/>',
globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/>',
gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
tag:'<path d="M20.6 13.4L11 3H3v8l9.6 9.6a2 2 0 0 0 2.8 0l5.2-5.2a2 2 0 0 0 0-2.8z"/><circle cx="7.5" cy="7.5" r="1"/>',
edit:'<path d="M17 3a2.83 2.83 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>',
trash:'<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
fuel:'<path d="M3 22h12M4 9h10M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 0 2-2V8l-3-3"/>',
snow:'<path d="M12 2v20M4 6l16 12M20 6L4 18"/>',
brief:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
alert:'<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>',
eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
award:'<circle cx="12" cy="8" r="6"/><path d="M15.5 13l1.5 9-5-3-5 3 1.5-9"/>',
map:'<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4z"/><path d="M8 2v16M16 6v16"/>',
send:'<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',
seat:'<path d="M6 3v10a3 3 0 0 0 3 3h8"/><path d="M8 16l1.5 5H20"/><path d="M6 8h6"/>',
door:'<rect x="4" y="3" width="16" height="18" rx="1"/><circle cx="15" cy="12" r="1"/>',
card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
plane:'<path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
chevR:'<path d="M9 6l6 6-6 6"/>',
lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
back:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
zap:'<path d="M13 2L3 14h9l-1 8 10-12h-9z"/>'};
const ic=(n,c='w-5 h-5')=>`<svg class="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${IC[n]||''}</svg>`;
const starIc=f=>`<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="${f?'#facc15':'none'}" stroke="#facc15" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>`;

/* ================= BADGES ================= */
function badge(t){const M={'Pending':'text-amber-300 bg-amber-400/10 border-amber-400/30','Confirmed':'text-sky-300 bg-sky-400/10 border-sky-400/30','Ongoing':'text-orange-300 bg-orange-400/10 border-orange-400/30','Completed':'text-emerald-300 bg-emerald-400/10 border-emerald-400/30','Cancelled':'text-red-300 bg-red-400/10 border-red-400/30','Expired':'text-zinc-400 bg-zinc-400/10 border-zinc-400/30','PAID':'text-emerald-300 bg-emerald-400/10 border-emerald-400/30','PENDING':'text-amber-300 bg-amber-400/10 border-amber-400/30','UNPAID':'text-zinc-400 bg-zinc-400/10 border-zinc-400/30','REFUNDED':'text-violet-300 bg-violet-400/10 border-violet-400/30','FAILED':'text-red-300 bg-red-400/10 border-red-400/30','available':'text-emerald-300 bg-emerald-400/10 border-emerald-400/30','rented':'text-red-300 bg-red-400/10 border-red-400/30','maintenance':'text-amber-300 bg-amber-400/10 border-amber-400/30','inactive':'text-zinc-400 bg-zinc-400/10 border-zinc-400/30','Active':'text-emerald-300 bg-emerald-400/10 border-emerald-400/30','VIP':'text-maroon-400 bg-maroon-500/10 border-maroon-500/40','Regular':'text-sky-300 bg-sky-400/10 border-sky-400/30','New':'text-emerald-300 bg-emerald-400/10 border-emerald-400/30','Available':'text-emerald-300 bg-emerald-400/10 border-emerald-400/30','Assigned':'text-sky-300 bg-sky-400/10 border-sky-400/30','On Trip':'text-orange-300 bg-orange-400/10 border-orange-400/30','Off Duty':'text-zinc-400 bg-zinc-400/10 border-zinc-400/30'};
const L={'available':'Available','rented':'Rented','maintenance':'Maintenance','inactive':'Inactive'};
return `<span class="badge ${M[t]||''}">${L[t]||t}</span>`;}

/* ================= ADMIN BUTTON SYNC ================= */
function syncAdminBtns(){
 const h=$('hdrAdminBtn'),m=$('mobAdminBtn');
 if(h){h.innerHTML=S.session
  ?`<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg><span class="hidden md:inline">Dashboard Admin</span>`
  :`<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><span class="hidden md:inline">Login Admin</span>`;}
 if(m){m.innerHTML=S.session
  ?`<span class="flex items-center gap-2.5"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> Buka Dashboard Admin</span><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>`
  :`<span class="flex items-center gap-2.5"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Login Admin Dashboard</span><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>`;}
}
