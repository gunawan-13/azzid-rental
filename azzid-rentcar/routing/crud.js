/* ================= CUSTOMER AUTH (booking step) ================= */
function openAuth(tab){
 modal(`<div class="p-7">
 <div class="flex justify-between items-center mb-5"><div><h3 class="font-display font-bold text-lg">Akun Penyewa</h3><p class="text-[12px] text-muted mt-0.5">Booking lebih cepat & riwayat tersimpan.</p></div><button onclick="closeModal()" class="text-muted hover:text-white">${ic('x')}</button></div>
 <div class="grid grid-cols-2 gap-2 mb-5">
  <button id="atIn" onclick="showTabAuth('in')" class="chip justify-center">Masuk</button>
  <button id="atReg" onclick="showTabAuth('reg')" class="chip justify-center">Daftar Baru</button>
 </div>
 <div id="mAuthIn">
  <div id="mErrIn" class="hidden mb-3 rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 text-[12px] px-3.5 py-2.5">Email atau password salah.</div>
  <label class="lbl">Email</label><input id="cAuthE" class="inp mb-3" placeholder="email@anda.com">
  <label class="lbl">Password</label><input id="cAuthP" type="password" class="inp mb-4" placeholder="••••••••" onkeydown="if(event.key==='Enter')doCustLogin()">
  <button onclick="doCustLogin()" class="btn btn-m w-full">Masuk</button>
  <button onclick="openForgotPassword('user')" class="btn btn-g w-full mt-2.5 text-[12.5px]">Lupa Password?</button>
  <div class="flex items-center gap-2.5 text-[11px] text-muted my-4"><span class="h-px bg-white/10 grow"></span>atau<span class="h-px bg-white/10 grow"></span></div>
  <button onclick="doGoogleLogin()" class="btn !bg-white !text-ink-950 hover:!bg-zinc-100 w-full font-semibold">Lanjutkan dengan Google</button>
  <div class="flex items-center gap-2 text-[11px] text-muted mt-4 flex-wrap justify-center"><button onclick="showTabAuth('reg')" class="text-maroon-400 hover:underline">Daftar Baru</button></div>
  <button onclick="$('cAuthE').value='penyewa@demo.id';$('cAuthP').value='demo123';toast('Kredensial demo terisi','info')" class="btn btn-g w-full mt-3 text-[11.5px]">Demo: penyewa@demo.id / demo123</button>
 </div>
 <div id="mAuthReg" class="hidden">
  <div id="mErrReg" class="hidden mb-3 rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 text-[12px] px-3.5 py-2.5"></div>
  <label class="lbl">Nama Lengkap</label><input id="rNama" class="inp mb-3" placeholder="Sesuai KTP">
  <div class="grid grid-cols-2 gap-3 mb-3"><div><label class="lbl">Email</label><input id="rEmail" class="inp" placeholder="email@anda.com"></div>
  <div><label class="lbl">No. WhatsApp</label><input id="rWa" class="inp" placeholder="08xx…"></div></div>
  <label class="lbl">Password (min. 6 karakter)</label><input id="rPass" type="password" class="inp mb-4" placeholder="••••••••">
  <button onclick="doCustReg()" class="btn btn-m w-full">Buat Akun & Masuk</button>
  <div class="flex items-center gap-2.5 text-[11px] text-muted my-4"><span class="h-px bg-white/10 grow"></span>atau<span class="h-px bg-white/10 grow"></span></div>
  <button onclick="doGoogleSignup()" class="btn !bg-white !text-ink-950 hover:!bg-zinc-100 w-full font-semibold">Daftar dengan Google</button>
  <p class="text-[10px] text-muted text-center mt-4">Sudah punya akun? <button onclick="showTabAuth('in')" class="text-maroon-400 hover:underline">Masuk</button></p>
 </div>
 <p class="text-[10.5px] text-zinc-500 text-center mt-5">Dengan masuk, Anda menyetujui syarat & ketentuan AZZID RENTCAR.</p>
 </div>`);
 showTabAuth(tab||'in');}
function showTabAuth(t){
 const i=$('mAuthIn')||$('uAuthIn');
 const r=$('mAuthReg')||$('uAuthReg');
 const a=$('atIn')||$('uTabIn');
 const b=$('atReg')||$('uTabReg');
 if(!i||!r) return;
 i.classList.toggle('hidden',t!=='in');
 r.classList.toggle('hidden',t!=='reg');
 if(a) a.classList.toggle('on',t==='in');
 if(b) b.classList.toggle('on',t==='reg');
}
function doCustLogin(){const e=($('cAuthE').value||'').trim().toLowerCase(),p=$('cAuthP').value;
 const acc=ACCOUNTS.find(a=>a.email.toLowerCase()===e&&a.pass===p);
 if(!acc){const err=$('mErrIn')||$('uErrIn');if(err)err.classList.remove('hidden');const m=($('modalRoot').firstChild)||document.querySelector('#mAuthIn');if(m&&m.classList){m.classList.remove('shake');void m.offsetWidth;m.classList.add('shake');}return;}
 S.custSession={email:acc.email,nama:acc.nama};localStorage.setItem(LS_CUST,JSON.stringify(S.custSession));
 closeModal();toast('Selamat datang kembali, '+acc.nama.split(' ')[0]+'!');
 if(location.hash.startsWith('#/booking')||location.hash.startsWith('#/user')||location.hash.startsWith('#/akun')||location.hash.startsWith('#/customer')) renderC();
 else location.hash='#/user';
}
function doCustReg(){const n=$('rNama').value.trim(),e=$('rEmail').value.trim().toLowerCase(),w=$('rWa').value.trim(),p=$('rPass').value;
 const err=$('mErrReg')||$('uErrReg');err.classList.add('hidden');
 if(!n||!e||!w||p.length<6){err.textContent='Lengkapi semua field. Password minimal 6 karakter.';err.classList.remove('hidden');return;}
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)){err.textContent='Format email tidak valid.';err.classList.remove('hidden');return;}
 if(ACCOUNTS.some(a=>a.email.toLowerCase()===e)){err.textContent='Email sudah terdaftar. Silakan masuk.';err.classList.remove('hidden');return;}
 const acc={id:'USR-'+Date.now(),nama:n,email:e,wa:w,pass:p,alamat:'',ktp:'',ttl:'',joined:TODAY};
 ACCOUNTS.push(acc);S.custSession={email:e,nama:n};localStorage.setItem(LS_CUST,JSON.stringify(S.custSession));
 addLog('Akun penyewa baru terdaftar: '+e);persist();closeModal();toast('Akun berhasil dibuat. Selamat datang, '+n.split(' ')[0]+'!');
 if(location.hash.startsWith('#/booking')||location.hash.startsWith('#/user')||location.hash.startsWith('#/akun')||location.hash.startsWith('#/customer')) renderC();
 else location.hash='#/user';
}
function doGoogleLogin(){
  const existing = ACCOUNTS.find(a => a.email === 'google-user@azzidrentcar.id');
  if(existing){
    S.custSession={email:existing.email,nama:existing.nama};
    localStorage.setItem(LS_CUST,JSON.stringify(S.custSession));
    closeModal();
    toast('Selamat datang kembali, '+existing.nama.split(' ')[0]+'!');
    if(location.hash.startsWith('#/booking')||location.hash.startsWith('#/user')||location.hash.startsWith('#/akun')||location.hash.startsWith('#/customer')) renderC();
    else location.hash='#/user';
  }else{
    modal(`<div class="p-7 w-[min(90vw,420px)]" style="text-align:center">
      <div class="mb-6"><div style="font-size:3em;margin-bottom:1rem">🔐</div><h3 class="font-display font-bold text-lg mb-1">Login dengan Google</h3><p class="text-[12px] text-muted">Akun Google baru akan dibuat otomatis di sistem kami.</p></div>
      <div class="bg-ink-900 rounded-lg p-4 mb-6 text-[13px] text-left space-y-1.5">
        <div><b>📧 Email:</b> google-user@azzidrentcar.id</div>
        <div><b>👤 Nama:</b> Google User</div>
        <div><b>📱 WhatsApp:</b> 0812-1111-0000</div>
      </div>
      <div class="flex gap-3"><button onclick="closeModal()" class="btn btn-g flex-1">Batal</button><button onclick="createGoogleAccount()" class="btn btn-m flex-1">Setujui & Masuk</button></div>
    </div>`);
  }
}
function createGoogleAccount(){
  const googleAcc = {id:'USR-G-'+Date.now(),nama:'Google User',email:'google-user@azzidrentcar.id',wa:'0812-1111-0000',pass:'google123',alamat:'',ktp:'',ttl:'',joined:TODAY};
  ACCOUNTS.push(googleAcc);
  S.custSession={email:googleAcc.email,nama:googleAcc.nama};
  localStorage.setItem(LS_CUST,JSON.stringify(S.custSession));
  addLog('Akun penyewa terdaftar via Google: google-user@azzidrentcar.id');
  persist();
  closeModal();
  toast('Selamat datang, '+googleAcc.nama.split(' ')[0]+'! Akun Google berhasil terdaftar.');
  location.hash='#/user';
}
function doGoogleSignup(){
  modal(`<div class="p-7 w-[min(90vw,420px)]" style="text-align:center">
    <div class="mb-6"><div style="font-size:3em;margin-bottom:1rem">🎉</div><h3 class="font-display font-bold text-lg mb-1">Daftar dengan Google</h3><p class="text-[12px] text-muted">Akun Anda akan dibuat secara instant.</p></div>
    <div class="bg-ink-900 rounded-lg p-4 mb-6 text-[13px] text-left space-y-1.5">
      <div><b>📧 Email:</b> google-user@azzidrentcar.id</div>
      <div><b>👤 Nama:</b> Google User</div>
      <div><b>📱 WhatsApp:</b> 0812-1111-0000</div>
      <div><b>🔐 Password:</b> google123</div>
    </div>
    <p class="text-[11px] text-muted mb-5">Anda dapat mengubah detail akun setelah login ke dashboard penyewa.</p>
    <div class="flex gap-3"><button onclick="closeModal();showTabAuth('in')" class="btn btn-g flex-1">Kembali</button><button onclick="createGoogleAccount()" class="btn btn-m flex-1">Buat Akun Google</button></div>
  </div>`);
}
function openForgotPassword(mode='user'){
  const isAdmin = mode === 'admin';
  const emailKey = isAdmin ? 'emailAdmin' : 'emailUser';
  const title = isAdmin ? 'Reset Password Admin' : 'Reset Password Penyewa';
  modal(`<div class="p-7 w-[min(90vw,420px)]">
   <div class="flex justify-between items-center mb-5">
    <div><h3 class="font-display font-bold text-lg">${title}</h3><p class="text-[12px] text-muted mt-0.5">Masukkan email dan password baru.</p></div>
    <button onclick="closeModal()" class="text-muted hover:text-white">${ic('x')}</button>
   </div>
   <div id="fpErr" class="hidden mb-3 rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 text-[12px] px-3.5 py-2.5"></div>
   <label class="lbl">Email</label>
   <input id="${emailKey}" class="inp mb-3" placeholder="email@anda.com">
   <label class="lbl">Password Baru</label>
   <input id="fpNewPass" type="password" class="inp mb-3" placeholder="Minimal 6 karakter">
   <label class="lbl">Konfirmasi Password</label>
   <input id="fpConfirmPass" type="password" class="inp mb-4" placeholder="Ulangi password baru">
   <button onclick="submitForgotPassword('${mode}')" class="btn btn-m w-full">${ic('lock','w-4 h-4')} Reset Password</button>
  </div>`);
}
function submitForgotPassword(mode='user'){
  const isAdmin = mode === 'admin';
  const emailInput = $(isAdmin ? 'emailAdmin' : 'emailUser');
  const email = (emailInput ? emailInput.value : '').trim().toLowerCase();
  const newPass = $('fpNewPass').value;
  const confirmPass = $('fpConfirmPass').value;
  const err = $('fpErr');
  err.classList.add('hidden');
  if(!email || !newPass || !confirmPass){err.textContent='Semua field wajib diisi.';err.classList.remove('hidden');return;}
  if(newPass.length < 6){err.textContent='Password baru minimal 6 karakter.';err.classList.remove('hidden');return;}
  if(newPass !== confirmPass){err.textContent='Konfirmasi password tidak cocok.';err.classList.remove('hidden');return;}
  const list = isAdmin ? USERS : ACCOUNTS;
  const target = list.find((item)=>((isAdmin ? item.e : item.email).toLowerCase()) === email);
  if(!target){err.textContent='Akun dengan email tersebut tidak ditemukan.';err.classList.remove('hidden');return;}
  if(isAdmin){target.p = newPass;}else{target.pass = newPass;}
  persist();
  if(isAdmin && $('lgE') && $('lgE').value.toLowerCase() === email){$('lgP').value = newPass;}
  if(!isAdmin && $('cAuthE') && $('cAuthE').value.toLowerCase() === email){$('cAuthP').value = newPass;}
  closeModal();
  toast(isAdmin ? 'Password admin berhasil diperbarui.' : 'Password akun penyewa berhasil diperbarui.');
}
function custLogout(){S.custSession=null;localStorage.removeItem(LS_CUST);closeModal();toast('Anda telah keluar dari akun','info');if(location.hash.startsWith('#/booking')||location.hash.startsWith('#/user')||location.hash.startsWith('#/akun')||location.hash.startsWith('#/customer')) renderC();}
function openAccount(){const acc=curAccount();if(!acc){openAuth('in');return;}
 const hist=BOOKINGS.filter(b=>b.user===acc.email||b.cust===acc.nama);
 const spend=hist.filter(b=>b.pay.s==='PAID').reduce((a,b)=>a+b.total,0);
 modal(`<div class="p-7">
 <div class="flex items-start gap-4 mb-6"><span class="w-14 h-14 rounded-2xl bg-gradient-to-br from-maroon-500 to-maroon-800 grid place-items-center font-display font-extrabold text-xl shrink-0">${esc(acc.nama[0])}</span>
 <div class="grow min-w-0"><h3 class="font-display font-bold text-xl truncate">${esc(acc.nama)}</h3><p class="text-[12.5px] text-muted break-words">${acc.email} · ${acc.wa||'-'}</p><span class="badge bg-emerald-400/10 border-emerald-400/30 text-emerald-300 mt-2">Member sejak ${dLong(acc.joined)}</span></div>
 <button onclick="closeModal()" class="text-muted hover:text-white shrink-0">${ic('x')}</button></div>
 <div class="grid grid-cols-2 gap-3 mb-5 text-center">
  <div class="card !bg-ink-900 p-4"><div class="font-display font-extrabold text-xl text-maroon-400">${hist.length}</div><div class="text-[10px] uppercase tracking-wider text-muted mt-1">Total Booking</div></div>
  <div class="card !bg-ink-900 p-4"><div class="font-display font-extrabold text-xl text-maroon-400">${fmtK(spend)}</div><div class="text-[10px] uppercase tracking-wider text-muted mt-1">Total Pengeluaran</div></div>
 </div>
 <h4 class="lbl">Booking Saya</h4>
 <div class="max-h-48 overflow-y-auto space-y-2 mb-5">${hist.length?hist.slice().reverse().map(b=>`<div class="flex items-center justify-between gap-2 text-[12.5px] bg-ink-900 rounded-lg px-3.5 py-2.5"><div class="min-w-0"><span class="font-mono text-maroon-400">${b.id.slice(-9)}</span><span class="text-muted"> · ${esc((veh(b.veh)||{name:'—'}).name)} · ${dShort(b.start)}</span></div>${badge(b.status)}</div>`).join(''):'<p class="text-[12.5px] text-muted">Belum ada booking. Yuk mulai booking pertama Anda!</p>'}</div>
 <div class="grid grid-cols-2 gap-2.5">
  <a href="#/booking" onclick="closeModal()" class="btn btn-m btn-sm">${ic('cal','w-4 h-4')} Booking Lagi</a>
  <button onclick="custLogout()" class="btn btn-d btn-sm">${ic('logout','w-4 h-4')} Logout</button>
 </div></div>`,1);}

function getCustomerBookings(){
  if(!S.custSession) return [];
  const email=(S.custSession.email||'').toLowerCase();
  const name=(S.custSession.nama||'').trim();
  return BOOKINGS.filter(b => {
    if(b.user && b.user.toLowerCase()===email) return true;
    if(b.cust === name) return true;
    const acc=ACCOUNTS.find(a => a.email.toLowerCase()===email);
    return !!(acc && b.cust===acc.nama);
  }).sort((a,b)=>b.start.localeCompare(a.start));
}

function buildCustomerNotifications(list){
  return list.slice(0,4).map(b => {
    const v=veh(b.veh) || {name:'Mobil'};
    if(b.status==='Pending') return {kind:'pending', title:`Booking ${b.id} menunggu konfirmasi admin`, meta:'Admin akan mengecek data penyewaan Anda', tone:'text-amber-300'};
    if(b.status==='Confirmed') return {kind:'confirmed', title:`Booking ${b.id} sudah dikonfirmasi admin`, meta:`Mobil ${v.name} siap dipersiapkan untuk tanggal ${dShort(b.start)}`, tone:'text-sky-300'};
    if(b.status==='Ongoing') return {kind:'ongoing', title:`Sewa sedang berjalan`, meta:`Unit ${v.name} saat ini sudah diterima dan aktif`, tone:'text-orange-300'};
    if(b.status==='Completed') return {kind:'completed', title:`Sewa ${b.id} sudah selesai`, meta:'Terima kasih, semoga perjalanan Anda menyenangkan', tone:'text-emerald-300'};
    if(b.status==='Cancelled') return {kind:'cancelled', title:`Booking ${b.id} dibatalkan`, meta:'Silakan hubungi admin untuk opsi berikutnya', tone:'text-red-300'};
    return {kind:'default', title:`Status booking ${b.id} adalah ${b.status}`, meta:`Periode ${dShort(b.start)} - ${dShort(b.end)}`, tone:'text-zinc-300'};
  });
}

function vUserPortal(){
  const acc = curAccount();
  const bookings = getCustomerBookings();
  const notifications = buildCustomerNotifications(bookings);
  const totalSpend = bookings.filter(b => b.pay.s === 'PAID').reduce((sum, b) => sum + b.total, 0);

  if(!acc){
    return `
      <section class="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div class="card overflow-hidden bg-ink-800/90 border-white/10">
          <div class="grid lg:grid-cols-[1fr_1.1fr]">
            <div class="bg-gradient-to-br from-maroon-800 via-maroon-700 to-ink-900 p-8 lg:p-10">
              <span class="badge bg-white/10 border-white/20 text-red-100 mb-5">USER LOGIN</span>
              <h1 class="font-display font-extrabold text-3xl sm:text-4xl leading-tight">Login penyewa untuk cek status sewa</h1>
              <p class="mt-4 text-[14px] leading-relaxed text-red-100/80">Pantau booking Anda, cek status konfirmasi admin, dan lihat riwayat sewa dari satu halaman.</p>
              <div class="mt-8 space-y-3 text-[13px] text-red-100/85">
                <div class="flex gap-3"><span class="mt-1">✓</span><span>Riwayat sewa tersimpan otomatis</span></div>
                <div class="flex gap-3"><span class="mt-1">✓</span><span>Status diperbarui setelah admin mengonfirmasi</span></div>
                <div class="flex gap-3"><span class="mt-1">✓</span><span>Notifikasi sewa langsung terlihat di dashboard user</span></div>
              </div>
            </div>
            <div class="p-7 sm:p-8 lg:p-10">
              <div class="mb-6">
                <h2 class="font-display font-bold text-2xl">Masuk ke akun penyewa</h2>
                <p class="text-[12.5px] text-muted mt-1">Gunakan akun yang sudah terdaftar atau daftar baru.</p>
              </div>
              <div class="grid grid-cols-2 gap-2 mb-5">
                <button id="uTabIn" onclick="showTabAuth('in')" class="chip on justify-center">Masuk</button>
                <button id="uTabReg" onclick="showTabAuth('reg')" class="chip justify-center">Daftar</button>
              </div>
              <div id="mAuthIn">
                <div id="mErrIn" class="hidden mb-3 rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 text-[12px] px-3.5 py-2.5">Email atau password salah.</div>
                <label class="lbl">Email</label><input id="cAuthE" class="inp mb-3" placeholder="email@anda.com" value="penyewa@demo.id">
                <label class="lbl">Password</label><input id="cAuthP" type="password" class="inp mb-4" placeholder="••••••••" value="demo123" onkeydown="if(event.key==='Enter')doCustLogin()">
                <button onclick="doCustLogin()" class="btn btn-m w-full">Masuk</button>
                <button onclick="openForgotPassword('user')" class="btn btn-g w-full mt-2.5 text-[12.5px]">Lupa Password?</button>
                <div class="flex items-center gap-2.5 text-[11px] text-muted my-4"><span class="h-px bg-white/10 grow"></span>atau<span class="h-px bg-white/10 grow"></span></div>
                <button onclick="doGoogleLogin()" class="btn !bg-white !text-ink-950 hover:!bg-zinc-100 w-full font-semibold">Lanjutkan dengan Google</button>
                <button onclick="$('cAuthE').value='penyewa@demo.id';$('cAuthP').value='demo123';toast('Akun demo siap digunakan','info')" class="btn btn-g w-full mt-3 text-[12px]">Isi akun demo</button>
              </div>
              <div id="mAuthReg" class="hidden">
                <div id="mErrReg" class="hidden mb-3 rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 text-[12px] px-3.5 py-2.5"></div>
                <label class="lbl">Nama Lengkap</label><input id="rNama" class="inp mb-3" placeholder="Sesuai KTP">
                <div class="grid sm:grid-cols-2 gap-3 mb-3">
                  <div><label class="lbl">Email</label><input id="rEmail" class="inp" placeholder="email@anda.com"></div>
                  <div><label class="lbl">No. WhatsApp</label><input id="rWa" class="inp" placeholder="08xx…"></div>
                </div>
                <label class="lbl">Password</label><input id="rPass" type="password" class="inp mb-4" placeholder="Minimal 6 karakter">
                <button onclick="doCustReg()" class="btn btn-m w-full">Buat akun</button>
                <div class="flex items-center gap-2.5 text-[11px] text-muted my-4"><span class="h-px bg-white/10 grow"></span>atau<span class="h-px bg-white/10 grow"></span></div>
                <button onclick="doGoogleSignup()" class="btn !bg-white !text-ink-950 hover:!bg-zinc-100 w-full font-semibold">Daftar dengan Google</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  return `
    <section class="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-[11px] uppercase tracking-[.25em] text-maroon-400 font-bold">USER PORTAL</p>
          <h1 class="font-display font-extrabold text-3xl mt-2">Halo, ${esc(acc.nama)}</h1>
        </div>
        <div class="flex gap-2 flex-wrap">
          <a href="#/booking" class="btn btn-m btn-sm">${ic('cal','w-4 h-4')} Booking Baru</a>
          <button onclick="custLogout();renderC()" class="btn btn-g btn-sm">${ic('logout','w-4 h-4')} Logout</button>
        </div>
      </div>

      <div class="grid lg:grid-cols-[1.1fr_.9fr] gap-6 mb-6">
        <div class="card p-6">
          <div class="flex items-start justify-between gap-3 mb-5">
            <div>
              <p class="text-[11px] uppercase tracking-[.2em] text-muted">Status akun</p>
              <h2 class="font-display font-bold text-xl mt-2">Data penyewa</h2>
            </div>
            <span class="badge bg-emerald-400/10 border-emerald-400/30 text-emerald-300">Aktif</span>
          </div>
          <div class="grid sm:grid-cols-2 gap-4 text-[13px]">
            <div class="bg-ink-900 rounded-xl p-3"><div class="text-[10px] uppercase tracking-wider text-muted mb-1">Nama</div><div class="font-semibold">${esc(acc.nama)}</div></div>
            <div class="bg-ink-900 rounded-xl p-3"><div class="text-[10px] uppercase tracking-wider text-muted mb-1">Email</div><div class="font-semibold break-all">${acc.email}</div></div>
            <div class="bg-ink-900 rounded-xl p-3"><div class="text-[10px] uppercase tracking-wider text-muted mb-1">WhatsApp</div><div class="font-semibold">${acc.wa || '-'}</div></div>
            <div class="bg-ink-900 rounded-xl p-3"><div class="text-[10px] uppercase tracking-wider text-muted mb-1">Total spending</div><div class="font-semibold text-maroon-400">${fmtIDR(totalSpend)}</div></div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between gap-3 mb-4">
            <h2 class="font-display font-bold text-xl">Notifikasi sewa</h2>
            <span class="badge bg-maroon-500/10 border-maroon-500/30 text-maroon-300">${notifications.length}</span>
          </div>
          <div class="space-y-3">
            ${notifications.length ? notifications.map(item => `
              <div class="flex gap-3 bg-ink-900 rounded-xl p-3 border border-white/5">
                <span class="w-8 h-8 rounded-lg bg-maroon-500/10 grid place-items-center ${item.tone} shrink-0">${ic('bell','w-4 h-4')}</span>
                <div class="min-w-0">
                  <p class="text-[13px] font-semibold leading-snug">${item.title}</p>
                  <p class="text-[11.5px] text-muted mt-1">${item.meta}</p>
                </div>
              </div>
            `).join('') : '<p class="text-[12.5px] text-muted">Belum ada notifikasi terbaru.</p>'}
          </div>
        </div>
      </div>

      <div class="card overflow-x-auto">
        <div class="flex items-center justify-between gap-3 p-5 pb-0">
          <h2 class="font-display font-bold text-xl">Riwayat sewa</h2>
          <span class="badge bg-white/5 border-white/10 text-zinc-300">${bookings.length} booking</span>
        </div>
        <table class="tbl min-w-[820px]">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mobil</th>
              <th>Periode</th>
              <th>Total</th>
              <th>Status</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            ${bookings.length ? bookings.map(b => {
              const v = veh(b.veh) || {name:'—'};
              return `
                <tr>
                  <td class="font-mono text-maroon-400">${b.id}</td>
                  <td>${esc(v.name)}</td>
                  <td>${dShort(b.start)} - ${dShort(b.end)}</td>
                  <td>${fmtIDR(b.total)}</td>
                  <td>${badge(b.status)}</td>
                  <td>${b.status === 'Confirmed' ? 'Dikonfirmasi' : b.status === 'Pending' ? 'Menunggu' : b.status === 'Ongoing' ? 'Sedang berjalan' : b.status === 'Completed' ? 'Selesai' : '—'}</td>
                </tr>
              `;
            }).join('') : `<tr><td colspan="6" class="text-center py-10 text-muted">Belum ada riwayat sewa. Silakan buat booking baru.</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

/* ================= CUSTOMER VIEWS ================= */
function vehCard(v,i){
return `<div class="veh-card rv card overflow-hidden group flex flex-col" style="transition-delay:${(i%4)*90}ms">
 <div class="relative h-52 overflow-hidden">
  <img src="${v.img}" alt="${esc(v.name)}" class="veh-img w-full h-full object-cover" loading="lazy">
  <div class="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-transparent to-transparent"></div>
  <span class="absolute top-3 left-3">${badge(v.status)}</span>
  <span class="absolute top-3 right-3 badge bg-black/50 border-white/15 text-zinc-200 backdrop-blur">${v.cat}</span>
  <span class="absolute bottom-3 left-4 font-display font-semibold text-[15px]">${esc(v.name)}</span>
 </div>
 <div class="p-4 flex flex-col gap-3 grow">
  <div class="flex flex-wrap gap-x-4 gap-y-1.5 text-[11.5px] text-muted">
   <span class="flex items-center gap-1.5">${ic('gear','w-3.5 h-3.5 text-maroon-400')}${v.trans}</span>
   <span class="flex items-center gap-1.5">${ic('seat','w-3.5 h-3.5 text-maroon-400')}${v.seats} Seats</span>
   <span class="flex items-center gap-1.5">${ic('snow','w-3.5 h-3.5 text-maroon-400')}AC</span>
   <span class="flex items-center gap-1.5">${ic('brief','w-3.5 h-3.5 text-maroon-400')}Bagasi</span>
  </div>
  <div class="mt-auto pt-3 border-t border-white/5 flex items-center justify-between gap-2 flex-wrap">
   <div><span class="font-display font-bold text-maroon-400 text-lg">${fmtIDR(v.priceLK)}</span><span class="text-[11px] text-muted"> / hari</span></div>
   <div class="flex gap-2">
    <a href="#/armada/${v.id}" class="btn btn-g btn-sm">Detail</a>
    <button onclick="openBooking('${v.id}')" class="btn btn-m btn-sm">Booking</button>
   </div>
  </div>
 </div></div>`;}

function vHome(){
const feat=VEHICLES.filter(v=>v.status!=='inactive').slice(0,4);
return `
<section class="relative min-h-[94vh] flex items-center overflow-hidden">
 <div class="absolute inset-0"><img src="${IMG.hero}" alt="Armada AZZID RENTCAR" class="w-full h-full object-cover kenburns opacity-60">
  <div class="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/75 to-maroon-800/30"></div>
  <div class="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/70"></div></div>
 <div class="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 grid lg:grid-cols-[1.15fr_.85fr] gap-12 items-center w-full">
  <div class="min-w-0">
   <span class="inline-flex items-center gap-2 badge bg-maroon-500/15 border-maroon-500/40 text-red-300 mb-6">${ic('shield','w-3.5 h-3.5')} PREMIUM & RELIABLE CAR RENTAL</span>
   <h1 class="font-display font-extrabold text-4xl sm:text-5xl xl:text-[62px] leading-[1.05] tracking-tight">
    <span class="hline"><span style="animation-delay:.15s">${esc(S.cms.head1)}</span></span>
    <span class="hline"><span style="animation-delay:.32s" class="text-transparent bg-clip-text bg-gradient-to-r from-maroon-400 to-red-500">${esc(S.cms.head2)}</span></span>
   </h1>
   <p class="mt-5 text-zinc-300 max-w-xl text-[15px] sm:text-base leading-relaxed">${esc(S.cms.sub)}</p>
   <div class="mt-8 flex flex-wrap gap-4">
    <a href="#/booking" class="btn btn-m">${ic('cal')} Booking Sekarang</a>
    <a href="#/armada" class="btn btn-g">${ic('car')} Lihat Armada</a>
   </div>
   <div class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-lg">
    ${[['1200','+','Pelanggan'],['3500','+','Perjalanan'],['4.9','','Rating /5'],['5','+','Tahun']].map((s,i)=>`<div class="rv" style="transition-delay:${i*100}ms"><div class="font-display font-extrabold text-2xl text-white"><span data-cu="${s[0]}" data-suf="${s[1]}">0</span></div><div class="text-[11px] uppercase tracking-widest text-muted mt-1">${s[2]}</div></div>`).join('')}
   </div>
  </div>
  <div class="rv card bg-ink-800/85 backdrop-blur-xl p-6 sm:p-7 border-white/10 shadow-card min-w-0">
   <div class="flex items-center gap-2 mb-5"><span class="w-8 h-8 rounded-lg bg-maroon-500/20 text-maroon-400 grid place-items-center">${ic('zap','w-4 h-4')}</span>
   <h3 class="font-display font-bold">Quick Booking</h3><span class="ml-auto badge bg-emerald-400/10 border-emerald-400/30 text-emerald-300"><i class="w-1.5 h-1.5 rounded-full bg-emerald-400 dot-live"></i>Real-time</span></div>
   <form onsubmit="qbSubmit(event)" class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
    <div class="col-span-full"><label class="lbl">Lokasi</label><select id="qbLoc" class="inp"><option>Kantor AZZID — Kemang</option><option>Bandara Soekarno-Hatta</option><option>Bandara Halim Perdanakusuma</option><option>Stasiun Gambir</option><option>Antar ke Alamat (Jabodetabek)</option></select></div>
    <div><label class="lbl">Tanggal Mulai</label><input type="date" id="qbStart" class="inp" value="2026-08-14" min="2026-08-13" required></div>
    <div><label class="lbl">Tanggal Selesai</label><input type="date" id="qbEnd" class="inp" value="2026-08-16" min="2026-08-14" required></div>
    <div><label class="lbl">Jenis Rental</label><select id="qbType" class="inp"><option>Lepas Kunci</option><option>Dengan Driver</option></select></div>
    <div><label class="lbl">Mobil</label><select id="qbVeh" class="inp"><option value="">Semua kendaraan</option>${VEHICLES.filter(v=>v.status!=='inactive').map(v=>`<option value="${v.id}">${esc(v.name)}</option>`).join('')}</select></div>
    <button class="col-span-full btn btn-m mt-1">${ic('search','w-4 h-4')} Cek Ketersediaan</button>
   </form>
   <p class="text-[11px] text-muted mt-3 text-center">Konfirmasi instan via WhatsApp · Tanpa biaya tersembunyi</p>
  </div>
 </div>
</section>
<div class="bg-ink-900 border-y border-white/5 py-4 overflow-hidden">
 <div class="marquee-track text-[12px] font-bold tracking-[.25em] text-zinc-500 uppercase">
  ${[0,1].map(()=>`<span class="flex items-center gap-12">${['Lepas Kunci','Dengan Driver','Antar-Jemput Bandara','Sewa Bulanan','Paket Wisata','Wedding & Event','Armada Terawat','Support 24/7'].map(x=>`<span class="flex items-center gap-3"><i class="w-1.5 h-1.5 bg-maroon-500 rotate-45 inline-block"></i>${x}</span>`).join('')}</span>`).join('')}
 </div></div>
<section class="max-w-7xl mx-auto px-4 sm:px-6 py-20">
 <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
  ${[['shield','Armada Terawat','Servis berkala & inspeksi 21 titik sebelum unit diserahkan kepada Anda.'],['tag','Harga Transparan','Semua biaya tampil di depan. Tanpa biaya tersembunyi, tanpa kejutan di akhir.'],['zap','Proses Cepat','Booking online 3 menit, konfirmasi instan, mobil siap jalan sesuai jadwal.'],['headset','Support 24/7','Tim siaga penuh untuk rescue, pertanyaan, dan perpanjangan rental kapan saja.']]
  .map((t,i)=>`<div class="rv card p-6 hover:border-maroon-500/40 transition group" style="transition-delay:${i*90}ms">
   <div class="w-11 h-11 rounded-xl bg-maroon-500/15 text-maroon-400 grid place-items-center mb-4 group-hover:scale-110 transition">${ic(t[0])}</div>
   <h3 class="font-display font-semibold mb-1.5">${t[1]}</h3><p class="text-[13px] text-muted leading-relaxed">${t[2]}</p></div>`).join('')}
 </div></section>
<section class="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
 <div class="flex items-end justify-between mb-8 rv"><div class="min-w-0"><span class="text-[11px] font-bold tracking-[.3em] text-maroon-400 uppercase">Armada Unggulan</span>
 <h2 class="font-display font-bold text-3xl mt-2">Pilihan Mobil Terbaik</h2></div>
 <a href="#/armada" class="hidden sm:flex items-center gap-2 text-sm font-semibold text-maroon-400 hover:text-red-400 transition shrink-0">Lihat Semua ${ic('arrR','w-4 h-4')}</a></div>
 <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">${feat.map((v,i)=>vehCard(v,i)).join('')}</div>
 <a href="#/armada" class="sm:hidden btn btn-g w-full mt-6">Lihat Semua Armada</a>
</section>
<section class="bg-ink-900 border-y border-white/5 py-20">
 <div class="max-w-7xl mx-auto px-4 sm:px-6">
 <div class="text-center mb-12 rv"><span class="text-[11px] font-bold tracking-[.3em] text-maroon-400 uppercase">Layanan Rental</span>
 <h2 class="font-display font-bold text-3xl mt-2">Solusi Lengkap Setiap Perjalanan</h2></div>
 <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">${SERVICES.map((s,i)=>`<div class="rv card p-6 bg-ink-800 hover:-translate-y-1.5 hover:border-maroon-500/40 transition duration-300" style="transition-delay:${i*80}ms">
  <div class="flex items-start justify-between gap-2"><div class="w-11 h-11 rounded-xl bg-maroon-500/15 text-maroon-400 grid place-items-center shrink-0">${ic(s.ic)}</div>
  <span class="badge bg-white/5 border-white/10 text-zinc-300">${s.p}</span></div>
  <h3 class="font-display font-semibold mt-4 mb-1.5">${s.t}</h3><p class="text-[13px] text-muted leading-relaxed">${s.d}</p></div>`).join('')}
 </div></div></section>
<section class="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
 <div class="rv relative"><img src="${IMG.fleet}" alt="Garasi AZZID RENTCAR" class="rounded-2xl border border-white/10 w-full object-cover h-[420px]">
  <div class="absolute bottom-6 right-4 card bg-maroon-600 border-maroon-500/50 px-6 py-4 floaty shadow-glow"><div class="font-display font-extrabold text-2xl">21 Titik</div><div class="text-[11px] tracking-widest uppercase text-red-200">Inspeksi Setiap Unit</div></div></div>
 <div class="min-w-0"><span class="text-[11px] font-bold tracking-[.3em] text-maroon-400 uppercase">Keunggulan AZZID</span>
 <h2 class="font-display font-bold text-3xl mt-2 mb-6">Bukan Sekadar Rental, <span class="text-maroon-400">Partner Perjalanan.</span></h2>
 <ul class="space-y-3.5 text-[14.5px]">${['Unit tahun muda (2022–2024), interior selalu detail & wangi','Driver bersertifikat, seragam rapi, dan hafal rute Jabodetabek','Asuransi all-risk di setiap perjalanan','Reschedule gratis hingga H-2','Unit pengganti maksimal 3 jam jika kendala','Harga final di depan — sudah termasuk layanan antar'].map((x,i)=>`<li class="rv flex gap-3" style="transition-delay:${i*70}ms"><span class="w-5 h-5 rounded-full bg-maroon-500/20 text-maroon-400 grid place-items-center shrink-0 mt-0.5">${ic('check','w-3 h-3')}</span>${x}</li>`).join('')}</ul></div>
</section>
<section class="bg-ink-900 border-y border-white/5 py-20">
 <div class="max-w-7xl mx-auto px-4 sm:px-6">
 <div class="text-center mb-14 rv"><span class="text-[11px] font-bold tracking-[.3em] text-maroon-400 uppercase">Cara Booking</span>
 <h2 class="font-display font-bold text-3xl mt-2">4 Langkah, Mobil Siap Jalan</h2></div>
 <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">${[['01','Pilih Mobil','Jelajahi katalog armada dan temukan mobil yang cocok dengan kebutuhan Anda.'],['02','Tentukan Tanggal','Atur tanggal mulai–selesai serta jenis rental: lepas kunci atau dengan driver.'],['03','Login, Isi Data & Bayar','Masuk akun penyewa, lengkapi data, bayar via QRIS/VA/e-wallet.'],['04','Mobil Siap Jalan','Konfirmasi instan, mobil diantar atau diambil di lokasi pilihan Anda.']]
 .map((s,i)=>`<div class="rv relative text-center px-2" style="transition-delay:${i*100}ms">
  <div class="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-maroon-500 to-maroon-800 grid place-items-center font-display font-extrabold text-lg shadow-glow">${s[0]}</div>
  <h3 class="font-display font-semibold mt-4 mb-1.5">${s[1]}</h3><p class="text-[12.5px] text-muted leading-relaxed">${s[2]}</p></div>`).join('')}
 </div></div></section>
<section class="max-w-7xl mx-auto px-4 sm:px-6 py-20">
 <div class="text-center mb-12 rv"><span class="text-[11px] font-bold tracking-[.3em] text-maroon-400 uppercase">Testimonial</span>
 <h2 class="font-display font-bold text-3xl mt-2">Kata Mereka yang Sudah Berkendara</h2></div>
 <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">${TESTIMONIALS.map((t,i)=>`<div class="rv card p-6 hover:border-maroon-500/40 transition" style="transition-delay:${i*70}ms">
  <div class="flex gap-1 mb-3">${[1,1,1,1,1].map(x=>starIc(x)).join('')}</div>
  <p class="text-[13.5px] text-zinc-300 leading-relaxed mb-5">“${t.t}”</p>
  <div class="flex items-center gap-3"><span class="w-10 h-10 rounded-full bg-maroon-500/20 text-maroon-400 grid place-items-center font-display font-bold">${t.n[0]}</span>
  <div class="min-w-0"><div class="font-semibold text-sm">${t.n}</div><div class="text-[11px] text-muted">${t.r}</div></div></div></div>`).join('')}
 </div></section>
<section class="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
 <div class="text-center mb-10 rv"><span class="text-[11px] font-bold tracking-[.3em] text-maroon-400 uppercase">FAQ</span>
 <h2 class="font-display font-bold text-3xl mt-2">Pertanyaan yang Sering Diajukan</h2></div>
 <div class="space-y-3">${FAQS.slice(0,6).map((f,i)=>`<div class="acc rv card overflow-hidden" style="transition-delay:${i*60}ms">
  <button onclick="this.parentElement.classList.toggle('open')" class="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-[14.5px]"><span>${f.q}</span><span class="acc-ic text-maroon-400 text-xl leading-none shrink-0">+</span></button>
  <div class="acc-body"><p class="px-6 pb-5 text-[13.5px] text-muted leading-relaxed">${f.a}</p></div></div>`).join('')}
 </div>
 <div class="text-center mt-6"><a href="#/faq" class="text-sm font-semibold text-maroon-400 hover:text-red-400">Lihat semua FAQ →</a></div>
</section>
<section class="relative overflow-hidden py-20 bg-gradient-to-br from-maroon-800 via-maroon-600 to-maroon-800">
 <div class="relative max-w-4xl mx-auto px-4 text-center rv">
 <h2 class="font-display font-extrabold text-3xl sm:text-4xl leading-tight">Mobil Siap Jalan,<br>Perjalanan Lebih Nyaman.</h2>
 <p class="mt-4 text-red-100/90">Booking sekarang dan rasakan standar baru rental mobil premium.</p>
 <div class="mt-8 flex flex-wrap justify-center gap-4">
  <a href="#/booking" class="btn bg-white text-maroon-700 font-bold hover:bg-zinc-100">${ic('cal')} Booking Sekarang</a>
  <a href="${waLink('Halo AZZID RENTCAR, saya ingin bertanya tentang layanan rental.')}" target="_blank" class="btn btn-g border-white/40">${ic('phone')} Chat WhatsApp</a>
 </div></div></section>`;}

function filteredVeh(){
const f=S.filters;let list=VEHICLES.filter(v=>v.status!=='inactive');
if(f.cat!=='Semua')list=list.filter(v=>v.cat===f.cat);
if(f.trans!=='Semua')list=list.filter(v=>v.trans.includes(f.trans));
if(f.seats)list=list.filter(v=>v.seats>=f.seats);
if(f.maxPrice)list=list.filter(v=>v.priceLK<=f.maxPrice);
if(f.avail)list=list.filter(v=>v.status==='available');
if(f.q)list=list.filter(v=>(v.name+v.brand+v.cat).toLowerCase().includes(f.q.toLowerCase()));
if(f.sort==='low')list.sort((a,b)=>a.priceLK-b.priceLK);
if(f.sort==='high')list.sort((a,b)=>b.priceLK-a.priceLK);
return list;}

function vArmada(){
const list=filteredVeh();const f=S.filters;
return `<section class="relative py-16 bg-ink-900 border-b border-white/5 overflow-hidden">
 <img src="${IMG.fleet}" class="absolute inset-0 w-full h-full object-cover opacity-15">
 <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
 <span class="text-[11px] font-bold tracking-[.3em] text-maroon-400 uppercase">Katalog Armada</span>
 <h1 class="font-display font-extrabold text-4xl mt-2">Pilih Mobil Anda</h1>
 <p class="text-muted mt-2 text-sm">Semua unit terawat, diasuransikan, dan siap jalan. Harga per 24 jam.</p></div></section>
<section class="max-w-7xl mx-auto px-4 sm:px-6 py-10">
 <div class="card p-5 mb-8 rv">
  <div class="flex flex-wrap gap-2 mb-4">${['Semua','City Car','MPV','SUV','Premium','Commercial'].map(c=>`<button class="chip ${f.cat===c?'on':''}" onclick="setFilter('cat','${c}')">${c}</button>`).join('')}</div>
  <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
   <div class="relative"><span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted">${ic('search','w-4 h-4')}</span>
    <input class="inp pl-9" placeholder="Cari mobil…" value="${esc(f.q)}" oninput="setFilter('q',this.value)"></div>
   <select class="inp" onchange="setFilter('trans',this.value)"><option ${f.trans==='Semua'?'selected':''}>Semua</option><option ${f.trans==='Automatic'?'selected':''}>Automatic</option><option ${f.trans==='Manual'?'selected':''}>Manual</option></select>
   <select class="inp" onchange="setFilter('seats',+this.value)"><option value="0">Semua kursi</option><option value="5" ${f.seats===5?'selected':''}>≥ 5 kursi</option><option value="7" ${f.seats===7?'selected':''}>≥ 7 kursi</option><option value="15" ${f.seats===15?'selected':''}>≥ 15 kursi</option></select>
   <select class="inp" onchange="setFilter('maxPrice',+this.value)"><option value="0">Semua harga</option><option value="400000" ${f.maxPrice===400000?'selected':''}>≤ Rp400rb</option><option value="700000" ${f.maxPrice===700000?'selected':''}>≤ Rp700rb</option><option value="1500000" ${f.maxPrice===1500000?'selected':''}>≤ Rp1,5jt</option><option value="3000000" ${f.maxPrice===3000000?'selected':''}>≤ Rp3jt</option></select>
   <select class="inp" onchange="setFilter('sort',this.value)"><option value="pop" ${f.sort==='pop'?'selected':''}>Terpopuler</option><option value="low" ${f.sort==='low'?'selected':''}>Harga terendah</option><option value="high" ${f.sort==='high'?'selected':''}>Harga tertinggi</option></select>
  </div>
  <label class="flex items-center gap-2 mt-4 text-[13px] text-muted cursor-pointer w-fit"><input type="checkbox" class="accent-[#991B1B]" ${f.avail?'checked':''} onchange="setFilter('avail',this.checked)"> Hanya tampilkan yang tersedia hari ini</label>
 </div>
 <div class="flex items-center justify-between mb-5"><p class="text-sm text-muted"><b class="text-white">${list.length}</b> kendaraan ditemukan</p></div>
 <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">${list.length?list.map((v,i)=>vehCard(v,i)).join(''):`<div class="col-span-full card p-14 text-center text-muted">${ic('car','w-10 h-10 mx-auto mb-3 text-zinc-600')}<p class="font-semibold">Tidak ada kendaraan yang cocok dengan filter.</p></div>`}</div>
</section>`;}

function vDetail(slug){
const v=veh(slug);if(!v)return `<div class="py-32 text-center">Mobil tidak ditemukan. <a class="text-maroon-400" href="#/armada">Kembali</a></div>`;
const gal=[{s:v.img,l:'Depan'},{s:IMG.interior,l:'Interior'},{s:IMG.dash,l:'Dashboard'},{s:v.img,l:'Eksterior',f:'hue-rotate(-25deg) brightness(.9)'}];
const sim=VEHICLES.filter(x=>x.cat===v.cat&&x.id!==v.id&&x.status!=='inactive').concat(VEHICLES.filter(x=>x.cat!==v.cat&&x.id!==v.id&&x.status!=='inactive')).slice(0,3);
return `<section class="max-w-7xl mx-auto px-4 sm:px-6 py-10">
 <nav class="text-[12px] text-muted mb-6 rv"><a href="#/" class="hover:text-white">Beranda</a> / <a href="#/armada" class="hover:text-white">Armada</a> / <span class="text-zinc-300">${esc(v.name)}</span></nav>
 <div class="grid lg:grid-cols-[1.2fr_.8fr] gap-8">
  <div class="rv min-w-0">
   <div class="relative rounded-2xl overflow-hidden border border-white/10 h-[300px] sm:h-[440px]"><img id="galMain" src="${gal[0].s}" class="w-full h-full object-cover transition duration-500" alt="${esc(v.name)}">
    <span class="absolute top-4 left-4">${badge(v.status)}</span><span class="absolute top-4 right-4 badge bg-black/50 border-white/15 text-zinc-200">${v.cat}</span></div>
   <div class="grid grid-cols-4 gap-2 sm:gap-3 mt-3">${gal.map((g,i)=>`<button onclick="galSwap(${i},'${slug}')" class="gal-th rounded-xl overflow-hidden border border-white/10 h-16 sm:h-24 hover:border-maroon-500 transition ${i===0?'!border-maroon-500':''}"><img src="${g.s}" style="${g.f?`filter:${g.f}`:''}" class="w-full h-full object-cover" alt="${g.l}"></button>`).join('')}</div>
   <div class="card p-6 mt-6">
    <h3 class="font-display font-semibold mb-3">Tentang Unit Ini</h3>
    <p class="text-[14px] text-muted leading-relaxed">${esc(v.desc)}</p>
    <h3 class="font-display font-semibold mt-6 mb-3">Fasilitas</h3>
    <div class="flex flex-wrap gap-2">${(v.feats||[]).map(x=>`<span class="chip cursor-default">${ic('check','w-3.5 h-3.5 text-maroon-400')}${x}</span>`).join('')}</div>
   </div>
  </div>
  <div class="min-w-0">
   <div class="rv card p-6">
    <div class="flex items-start justify-between gap-3"><div class="min-w-0"><h1 class="font-display font-bold text-2xl">${esc(v.name)}</h1><p class="text-muted text-[13px] mt-1">${v.brand} · ${v.year} · ${v.plate}</p></div>
    <span class="w-11 h-11 rounded-xl bg-maroon-500/15 text-maroon-400 grid place-items-center shrink-0">${ic('car')}</span></div>
    <div class="grid grid-cols-2 gap-3 mt-5 text-[13px]">
     ${[['gear','Transmisi',v.trans],['seat','Kapasitas',v.seats+' Seats'],['fuel','Bahan Bakar',v.fuel],['snow','AC','Double Blower'],['door','Pintu',v.doors+' Pintu'],['brief','Bagasi',v.bag]].map(x=>`<div class="bg-ink-900 rounded-lg px-3.5 py-3 border border-white/5 flex items-center gap-2.5 min-w-0">${ic(x[0],'w-4 h-4 text-maroon-400 shrink-0')}<span class="min-w-0"><span class="block text-[10px] uppercase tracking-wider text-muted">${x[1]}</span>${x[2]}</span></div>`).join('')}
    </div>
   </div>
   <div class="rv card p-6 mt-5 border-maroon-500/30 sticky top-24">
    <h3 class="font-display font-semibold mb-4">Harga Rental / Hari</h3>
    <div class="grid grid-cols-2 gap-3 mb-5">
     <div class="rounded-xl border border-white/10 p-4 text-center"><div class="text-[10px] uppercase tracking-widest text-muted mb-1">Lepas Kunci</div><div class="font-display font-extrabold text-maroon-400 text-lg">${fmtIDR(v.priceLK)}</div></div>
     <div class="rounded-xl border border-maroon-500/40 bg-maroon-500/10 p-4 text-center"><div class="text-[10px] uppercase tracking-widest text-red-200 mb-1">Dengan Driver</div><div class="font-display font-extrabold text-white text-lg">${fmtIDR(v.priceDrv||v.priceLK+150000)}</div></div>
    </div>
    <div class="grid grid-cols-2 gap-3 mb-4">
     <div><label class="lbl">Mulai</label><input type="date" id="dtStart" class="inp" value="2026-08-14"></div>
     <div><label class="lbl">Selesai</label><input type="date" id="dtEnd" class="inp" value="2026-08-16"></div>
    </div>
    <select id="dtType" class="inp mb-4"><option>Lepas Kunci</option><option>Dengan Driver</option></select>
    <button onclick="openBookingFromDetail('${v.id}')" class="btn btn-m w-full">${ic('cal')} Booking Mobil Ini</button>
    <p class="text-[11px] text-muted text-center mt-3">Gratis antar-jemput radius 10 km · Asuransi termasuk</p>
   </div>
  </div>
 </div>
 <div class="mt-16"><h2 class="font-display font-bold text-2xl mb-6 rv">Mobil Serupa</h2>
 <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">${sim.map((x,i)=>vehCard(x,i)).join('')}</div></div>
</section>`;}

function vLayanan(){return `<section class="relative py-16 bg-ink-900 border-b border-white/5"><div class="max-w-7xl mx-auto px-4 sm:px-6"><span class="text-[11px] font-bold tracking-[.3em] text-maroon-400 uppercase">Layanan</span><h1 class="font-display font-extrabold text-4xl mt-2">Layanan Rental Kami</h1><p class="text-muted mt-2 text-sm max-w-2xl">Dari perjalanan harian hingga event premium — semua dilayani dengan standar yang sama: tepat waktu, terawat, transparan.</p></div></section>
<section class="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">${SERVICES.map((s,i)=>`<div class="rv card p-7 hover:-translate-y-1.5 hover:border-maroon-500/40 transition" style="transition-delay:${i*70}ms"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-maroon-500 to-maroon-800 text-white grid place-items-center mb-5 shadow-glow">${ic(s.ic)}</div><h3 class="font-display font-semibold text-lg mb-2">${s.t}</h3><p class="text-[13.5px] text-muted leading-relaxed mb-4">${s.d}</p><span class="badge bg-white/5 border-white/10 text-zinc-300">${s.p}</span><button onclick="openBooking()" class="btn btn-g btn-sm mt-5 w-full">Booking Layanan</button></div>`).join('')}
</section>`;}

function vTentang(){return `<section class="relative py-16 bg-ink-900 border-b border-white/5 overflow-hidden"><img src="${IMG.hero}" class="absolute inset-0 w-full h-full object-cover opacity-20"><div class="relative max-w-7xl mx-auto px-4 sm:px-6"><span class="text-[11px] font-bold tracking-[.3em] text-maroon-400 uppercase">Tentang Kami</span><h1 class="font-display font-extrabold text-4xl mt-2">Drive Comfort. Travel Better.</h1></div></section>
<section class="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
 <div class="rv"><img src="${IMG.fleet}" class="rounded-2xl border border-white/10 h-[420px] w-full object-cover" alt="Garasi AZZID"></div>
 <div class="rv min-w-0"><h2 class="font-display font-bold text-3xl mb-5">Nyaman Berkendara, <span class="text-maroon-400">Tenang Bepergian.</span></h2>
 <p class="text-muted text-[14.5px] leading-relaxed mb-4">AZZID RENTCAR berdiri sejak 2021 di Jakarta Selatan, dimulai dari 3 unit mobil dan satu keyakinan sederhana: rental mobil seharusnya mudah, transparan, dan bisa dipercaya.</p>
 <p class="text-muted text-[14.5px] leading-relaxed mb-6">Kini kami melayani lebih dari 1.200 pelanggan — keluarga, pebisnis, perusahaan, hingga event organizer — dengan armada tahun muda yang diinspeksi 21 titik sebelum setiap perjalanan.</p>
 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${[['Visi','Menjadi standar rental mobil premium paling terpercaya di Indonesia.'],['Misi','Layanan transparan, armada prima, dan respons tercepat di industri.']].map(x=>`<div class="card p-5 border-maroon-500/25"><h4 class="font-display font-semibold text-maroon-400 mb-2">${x[0]}</h4><p class="text-[12.5px] text-muted leading-relaxed">${x[1]}</p></div>`).join('')}</div></div>
</section>
<section class="bg-ink-900 border-y border-white/5 py-14"><div class="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
 ${[['1200','+','Pelanggan Terlayani'],['3500','+','Perjalanan Selesai'],['8','','Unit Armada Premium'],['24','/7','Jam Siaga Bantuan']].map((s,i)=>`<div class="rv" style="transition-delay:${i*90}ms"><div class="font-display font-extrabold text-4xl text-maroon-400"><span data-cu="${s[0]}" data-suf="${s[1]}">0</span></div><div class="text-[11px] uppercase tracking-widest text-muted mt-2">${s[2]}</div></div>`).join('')}
</div></section>`;}

function vFaq(){return `<section class="relative py-16 bg-ink-900 border-b border-white/5"><div class="max-w-7xl mx-auto px-4 sm:px-6"><span class="text-[11px] font-bold tracking-[.3em] text-maroon-400 uppercase">FAQ</span><h1 class="font-display font-extrabold text-4xl mt-2">Butuh Jawaban Cepat?</h1></div></section>
<section class="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-3">${FAQS.map((f,i)=>`<div class="acc rv card overflow-hidden" style="transition-delay:${i*50}ms"><button onclick="this.parentElement.classList.toggle('open')" class="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-[14.5px]"><span>${f.q}</span><span class="acc-ic text-maroon-400 text-xl leading-none shrink-0">+</span></button><div class="acc-body"><p class="px-6 pb-5 text-[13.5px] text-muted leading-relaxed">${f.a}</p></div></div>`).join('')}
<div class="card p-8 text-center mt-8 rv"><h3 class="font-display font-semibold text-lg mb-2">Masih ada pertanyaan?</h3><p class="text-sm text-muted mb-5">Tim kami siap membantu 24/7.</p><a href="${waLink('Halo AZZID RENTCAR, saya punya pertanyaan.')}" target="_blank" class="btn btn-m">Chat WhatsApp</a></div></section>`;}

function vKontak(){return `<section class="relative py-16 bg-ink-900 border-b border-white/5"><div class="max-w-7xl mx-auto px-4 sm:px-6"><span class="text-[11px] font-bold tracking-[.3em] text-maroon-400 uppercase">Kontak</span><h1 class="font-display font-extrabold text-4xl mt-2">Hubungi Kami</h1></div></section>
<section class="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid lg:grid-cols-2 gap-8">
 <div class="space-y-4 rv min-w-0">${[['pin','Kantor Pusat','Jl. Raya Kemang No. 88, Jakarta Selatan 12730'],['phone','Telepon / WhatsApp','+62 812-3456-7890 · 24/7'],['mail','Email','halo@azzidrentcar.id · booking@azzidrentcar.id'],['clock','Jam Operasional','Booking online 24 jam · Kantor 07.00–22.00 WIB']].map(x=>`<div class="card p-5 flex gap-4 items-start hover:border-maroon-500/40 transition"><span class="w-11 h-11 rounded-xl bg-maroon-500/15 text-maroon-400 grid place-items-center shrink-0">${ic(x[0])}</span><div class="min-w-0"><h3 class="font-display font-semibold text-sm">${x[1]}</h3><p class="text-[13px] text-muted mt-1 break-words">${x[2]}</p></div></div>`).join('')}
 <div class="card overflow-hidden h-56 relative"><img src="${IMG.fleet}" class="w-full h-full object-cover opacity-40"><div class="absolute inset-0 grid place-items-center"><span class="badge bg-black/70 border-maroon-500/50 text-white px-4 py-2">${ic('pin','w-4 h-4')} Kemang, Jakarta Selatan</span></div></div></div>
 <form class="card p-7 rv" onsubmit="event.preventDefault();toast('Pesan terkirim! Kami akan segera menghubungi Anda.');this.reset()">
  <h3 class="font-display font-semibold text-lg mb-5">Kirim Pesan</h3>
  <div class="grid sm:grid-cols-2 gap-4 mb-4"><div><label class="lbl">Nama</label><input class="inp" required placeholder="Nama Anda"></div><div><label class="lbl">No. WhatsApp</label><input class="inp" required placeholder="08xx-xxxx-xxxx"></div></div>
  <div class="mb-4"><label class="lbl">Email</label><input type="email" class="inp" placeholder="email@anda.com"></div>
  <div class="mb-5"><label class="lbl">Pesan</label><textarea class="inp" rows="5" required placeholder="Ceritakan kebutuhan rental Anda…"></textarea></div>
  <button class="btn btn-m w-full">${ic('send','w-4 h-4')} Kirim Pesan</button></form>
</section>`;}

/* ================= BOOKING FLOW ================= */
function openBooking(vid){S.draft={veh:vid||null,start:'2026-08-14',end:'2026-08-16',type:'Lepas Kunci',pickup:'Kantor AZZID — Kemang',drop:'Kantor AZZID — Kemang',cust:{},promo:null,method:''};S.step=vid?1:0;location.hash='#/booking';}
function openBookingFromDetail(vid){S.draft.veh=vid;S.draft.start=$('dtStart').value;S.draft.end=$('dtEnd').value;S.draft.type=$('dtType').value;S.step=1;renderC();window.scrollTo({top:0});}
function qbSubmit(e){e.preventDefault();S.draft.start=$('qbStart').value;S.draft.end=$('qbEnd').value;S.draft.type=$('qbType').value;S.draft.pickup=$('qbLoc').value;S.draft.drop=$('qbLoc').value;const vv=$('qbVeh').value;S.draft.veh=vv||null;S.step=vv?1:0;location.hash='#/booking';}
function setFilter(k,v){S.filters[k]=v;renderC();}
function bkGo(n){S.step=n;renderC();window.scrollTo({top:0});}
function pickVeh(id){S.draft.veh=id;renderC();}
function isClash(vid,s,e){return BOOKINGS.some(b=>b.veh===vid&&['Confirmed','Ongoing'].includes(b.status)&&s<b.end&&e>b.start);}
function bkCalc(){const v=veh(S.draft.veh);if(!v)return null;const dur=daysDiff(S.draft.start,S.draft.end);const rental=dur*v.priceLK;const drv=S.draft.type==='Dengan Driver'?dur*150000:0;let disc=0,promo=null;
 if(S.draft.promo){promo=PROMOS.find(p=>p.code===S.draft.promo&&p.status==='Active');if(promo&&dur>=promo.minDays){disc=promo.type==='percent'?Math.min(promo.cap||1e9,rental*promo.value/100):promo.value;}else disc=0;}
 return {v,dur,rental,drv,disc,total:rental+drv-disc,promo};}
function applyPromo(){const c=$('promoInp').value.trim().toUpperCase();const dur=daysDiff(S.draft.start,S.draft.end);const p=PROMOS.find(x=>x.code===c);
 if(!p||p.status!=='Active'){toast('Kode promo tidak valid / kedaluwarsa','err');return;}
 if(dur<p.minDays){toast(`Promo butuh minimal ${p.minDays} hari rental`,'err');return;}
 S.draft.promo=c;toast('Promo '+c+' diterapkan!');renderC();}
function bkAuthTab(t){const i=$('bkAuthIn'),r=$('bkAuthReg'),a=$('btIn'),b=$('btReg');if(!i)return;
 i.classList.toggle('hidden',t!=='in');r.classList.toggle('hidden',t!=='reg');
 a.classList.toggle('on',t==='in');b.classList.toggle('on',t==='reg');}
function bkNext(){const d=S.draft;
 if(S.step===0&&!d.veh){toast('Pilih mobil terlebih dahulu','err');return;}
 if(S.step===1){if(!d.start||!d.end||d.end<d.start){toast('Tanggal tidak valid','err');return;}
  if(isClash(d.veh,d.start,d.end)){toast('Mobil sedang terbooking pada tanggal tersebut','err');return;}}
 if(S.step===2){const req=['nama','wa','email','alamat','ktp','ttl','tujuan'];const ok=req.every(k=>$('cf_'+k)&&$('cf_'+k).value.trim());if(!ok){toast('Lengkapi semua data wajib','err');return;}
  d.cust={nama:$('cf_nama').value,wa:$('cf_wa').value,email:$('cf_email').value,alamat:$('cf_alamat').value,ktp:$('cf_ktp').value,ttl:$('cf_ttl').value,tujuan:$('cf_tujuan').value,catatan:$('cf_catatan')?$('cf_catatan').value:''};
  if(S.custSession){const acc=curAccount();if(acc){acc.nama=d.cust.nama;acc.wa=d.cust.wa;acc.email=d.cust.email;acc.alamat=d.cust.alamat;acc.ktp=d.cust.ktp;acc.ttl=d.cust.ttl;persist();}}}
 bkGo(S.step+1);}
function chooseMethod(m){S.draft.method=m;renderC();}
function upsertCustomer(name,wa,email){let c=CUSTOMERS.find(x=>x.name===name);if(!c){c={id:'CST-'+String(CUSTOMERS.length+1).padStart(3,'0'),name,wa:wa||'',email:email||'',addr:'',total:0,spend:0,last:'—',status:'New'};CUSTOMERS.push(c);}c.total++;return c;}
function doPay(){if(!S.draft.method){toast('Pilih metode pembayaran','err');return;}
 modal(`<div class="p-10 text-center"><div class="w-12 h-12 mx-auto rounded-full border-2 border-maroon-500 border-t-transparent spin mb-5"></div><h3 class="font-display font-semibold text-lg">Memproses Pembayaran…</h3><p class="text-sm text-muted mt-2">Menghubungi payment gateway · ${esc(S.draft.method)}</p></div>`);
 setTimeout(()=>{closeModal();const c=bkCalc();const seq=String(BOOKINGS.length+15).padStart(3,'0');
  const id=`AZR-${TODAY.replaceAll('-','')}-${seq}`;
  const b={id,cust:S.draft.cust.nama,veh:S.draft.veh,start:S.draft.start,end:S.draft.end,type:S.draft.type,pickup:S.draft.pickup,drop:S.draft.drop,driver:null,sub:c.rental,drv:c.drv,disc:c.disc,total:c.total,status:'Confirmed',pay:{m:S.draft.method,s:'PAID',tx:'TRX-'+Math.floor(88350+Math.random()*900),at:TODAY},user:S.custSession?S.custSession.email:null};
  BOOKINGS.push(b);
  const cu=upsertCustomer(S.draft.cust.nama,S.draft.cust.wa,S.draft.cust.email);cu.spend+=c.total;cu.last=c.v.name;if(cu.total>3)cu.status='VIP';else if(cu.total>1)cu.status='Regular';
  addLog(`Booking baru ${id} · ${c.v.name} · ${fmtK(c.total)}`);persist();
  S.lastBooking=b;S.step=5;renderC();window.scrollTo({top:0});},1800);}
function qrSVG(seed){let s=0;for(const ch of seed)s+=ch.charCodeAt(0);let cells='';for(let y=0;y<21;y++)for(let x=0;x<21;x++){const inF=(x<7&&y<7)||(x>13&&y<7)||(x<7&&y>13);if(inF)continue;if(rnd(x*31+y*57+s)>.52)cells+=`<rect x="${x}" y="${y}" width="1" height="1"/>`;}
 const f=(fx,fy)=>`<rect x="${fx}" y="${fy}" width="7" height="7" fill="none" stroke="#111" stroke-width="1"/><rect x="${fx+2}" y="${fy+2}" width="3" height="3"/>`;
 return `<svg viewBox="-1 -1 23 23" class="w-44 h-44 bg-white rounded-lg" fill="#111">${cells}${f(0,0)}${f(14,0)}${f(0,14)}</svg>`;}

function vBooking(){
const d=S.draft;const steps=['Pilih Mobil','Jadwal & Jenis','Akun & Data','Ringkasan','Pembayaran','Selesai'];
const c=bkCalc();const acc=curAccount();
let body='';
if(S.step===0){body=`<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">${VEHICLES.filter(v=>v.status!=='inactive').map(v=>`<button onclick="pickVeh('${v.id}')" class="card overflow-hidden text-left transition hover:border-maroon-500/50 ${d.veh===v.id?'!border-maroon-500 ring-2 ring-maroon-500/40':''}"><div class="h-32 overflow-hidden"><img src="${v.img}" class="w-full h-full object-cover"></div><div class="p-4 flex justify-between items-center gap-2"><div class="min-w-0"><div class="font-semibold text-sm truncate">${esc(v.name)}</div><div class="text-[11px] text-muted">${v.trans} · ${v.seats} seats</div></div><div class="font-display font-bold text-maroon-400 text-sm shrink-0">${fmtK(v.priceLK)}</div></div>${d.veh===v.id?`<div class="bg-maroon-600 text-white text-center text-[11px] font-bold py-1.5 tracking-widest">✓ TERPILIH</div>`:''}</button>`).join('')}</div>`;}
else if(S.step===1){const v=veh(d.veh);const clash=isClash(d.veh,d.start,d.end);
 body=`<div class="grid lg:grid-cols-[.9fr_1.1fr] gap-6">
 <div class="card p-5 flex gap-4 items-center"><img src="${v.img}" class="w-24 h-16 object-cover rounded-lg shrink-0"><div class="min-w-0"><div class="font-display font-semibold truncate">${esc(v.name)}</div><div class="text-[12px] text-muted">${v.year} · ${v.trans} · ${v.seats} seats</div><button onclick="bkGo(0)" class="text-[12px] text-maroon-400 font-semibold mt-1">Ganti mobil</button></div></div>
 <div class="card p-6">
  <div class="grid sm:grid-cols-2 gap-4 mb-4"><div><label class="lbl">Tanggal Mulai</label><input type="date" class="inp" value="${d.start}" min="2026-08-13" onchange="S.draft.start=this.value;renderC()"></div><div><label class="lbl">Tanggal Selesai</label><input type="date" class="inp" value="${d.end}" min="${d.start}" onchange="S.draft.end=this.value;renderC()"></div></div>
  <div class="grid sm:grid-cols-2 gap-3 mb-4">${['Lepas Kunci','Dengan Driver'].map(t=>`<button onclick="S.draft.type='${t}';renderC()" class="rounded-xl border p-4 text-left transition ${d.type===t?'border-maroon-500 bg-maroon-500/10':'border-white/10 hover:border-white/25'}"><div class="flex items-center gap-2 font-semibold text-sm">${ic(t==='Lepas Kunci'?'key':'wheel','w-4 h-4 text-maroon-400')}${t}</div><div class="text-[11px] text-muted mt-1">${t==='Lepas Kunci'?'Kendarai sendiri, lebih bebas':'Driver profesional +Rp150rb/hari'}</div></button>`).join('')}</div>
  <div class="grid sm:grid-cols-2 gap-4"><div><label class="lbl">Lokasi Pickup</label><select class="inp" onchange="S.draft.pickup=this.value">${['Kantor AZZID — Kemang','Bandara Soekarno-Hatta','Bandara Halim Perdanakusuma','Stasiun Gambir','Antar ke Alamat (Jabodetabek)'].map(x=>`<option ${d.pickup===x?'selected':''}>${x}</option>`).join('')}</select></div>
  <div><label class="lbl">Lokasi Drop-off</label><select class="inp" onchange="S.draft.drop=this.value">${['Kantor AZZID — Kemang','Bandara Soekarno-Hatta','Bandara Halim Perdanakusuma','Stasiun Gambir','Antar ke Alamat (Jabodetabek)'].map(x=>`<option ${d.drop===x?'selected':''}>${x}</option>`).join('')}</select></div></div>
  ${clash?`<div class="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 text-[12.5px] px-4 py-3 flex gap-2">${ic('alert','w-4 h-4 shrink-0')} Unit ini sudah terbooking pada rentang tanggal pilihan Anda. Silakan ubah tanggal.</div>`:''}
 </div></div>`;}
else if(S.step===2){
 const src=acc?{nama:acc.nama,wa:acc.wa,email:acc.email,alamat:acc.alamat,ktp:acc.ktp,ttl:acc.ttl}:d.cust;
 const cu=Object.keys(d.cust).length?d.cust:src;
 body=`<div class="max-w-3xl mx-auto">
 ${acc?`<div class="card p-5 mb-5 border-emerald-500/30 bg-emerald-500/5 flex flex-wrap items-center gap-3">
  <span class="w-10 h-10 rounded-full bg-maroon-600 grid place-items-center font-display font-bold shrink-0">${esc(acc.nama[0])}</span>
  <div class="grow min-w-0"><div class="text-[13px] font-semibold">Masuk sebagai ${esc(acc.nama)}</div><div class="text-[11.5px] text-muted truncate">${acc.email} · riwayat booking tersimpan otomatis</div></div>
  <button onclick="custLogout();renderC()" class="btn btn-g btn-sm">Ganti Akun</button>
 </div>`:
 `<div class="card p-6 mb-5">
  <div class="flex items-center gap-2.5 mb-1">${ic('lock','w-5 h-5 text-maroon-400')}<h3 class="font-display font-semibold text-lg">Login Penyewa</h3></div>
  <p class="text-[12.5px] text-muted mb-4">Masuk agar data terisi otomatis & riwayat booking tersimpan. Bisa juga lanjut sebagai tamu di bawah.</p>
  <div class="grid grid-cols-2 gap-2 mb-4 max-w-xs">
   <button id="btIn" onclick="bkAuthTab('in')" class="chip on justify-center">Masuk</button>
   <button id="btReg" onclick="bkAuthTab('reg')" class="chip justify-center">Daftar Baru</button>
  </div>
  <div id="bkAuthIn">
   <div class="grid sm:grid-cols-2 gap-3 mb-3">
    <div><label class="lbl">Email</label><input id="bAuthE" class="inp" placeholder="email@anda.com"></div>
    <div><label class="lbl">Password</label><input id="bAuthP" type="password" class="inp" placeholder="••••••••"></div>
   </div>
   <div class="flex flex-wrap gap-2.5">
    <button onclick="bkLogin()" class="btn btn-m btn-sm">${ic('lock','w-4 h-4')} Masuk</button>
    <button onclick="$('bAuthE').value='penyewa@demo.id';$('bAuthP').value='demo123';toast('Kredensial demo terisi','info')" class="btn btn-g btn-sm text-[11.5px]">Akun demo: penyewa@demo.id / demo123</button>
   </div>
   <p id="bkAuthErr" class="hidden text-[12px] text-red-300 mt-2.5">Email atau password salah.</p>
  </div>
  <div id="bkAuthReg" class="hidden">
   <div class="grid sm:grid-cols-2 gap-3 mb-3">
    <div><label class="lbl">Nama Lengkap</label><input id="bRegN" class="inp" placeholder="Sesuai KTP"></div>
    <div><label class="lbl">No. WhatsApp</label><input id="bRegW" class="inp" placeholder="08xx…"></div>
    <div><label class="lbl">Email</label><input id="bRegE" class="inp" placeholder="email@anda.com"></div>
    <div><label class="lbl">Password (min. 6)</label><input id="bRegP" type="password" class="inp" placeholder="••••••••"></div>
   </div>
   <button onclick="bkReg()" class="btn btn-m btn-sm">${ic('plus','w-4 h-4')} Buat Akun & Masuk</button>
   <p id="bkRegErr" class="hidden text-[12px] text-red-300 mt-2.5"></p>
  </div>
 </div>`}
 <div class="card p-6 sm:p-8"><div class="flex items-center justify-between gap-3 mb-1 flex-wrap"><h3 class="font-display font-semibold text-lg">Data Penyewa</h3>${acc?'<span class="badge bg-emerald-400/10 border-emerald-400/30 text-emerald-300">Terisi dari akun</span>':''}</div>
 <p class="text-[12.5px] text-muted mb-6">Data sensitif (identitas) disimpan terenkripsi dan hanya dapat diakses admin berwenang.</p>
 <div class="grid sm:grid-cols-2 gap-4">
  <div><label class="lbl">Nama Lengkap *</label><input id="cf_nama" class="inp" value="${esc(cu.nama||'')}" placeholder="Sesuai KTP"></div>
  <div><label class="lbl">No. WhatsApp *</label><input id="cf_wa" class="inp" value="${esc(cu.wa||'')}" placeholder="08xx-xxxx-xxxx"></div>
  <div><label class="lbl">Email *</label><input id="cf_email" type="email" class="inp" value="${esc(cu.email||'')}" placeholder="email@anda.com"></div>
  <div><label class="lbl">Nomor Identitas (KTP/SIM) *</label><input id="cf_ktp" class="inp" value="${esc(cu.ktp||'')}" placeholder="16 digit"></div>
  <div class="sm:col-span-2"><label class="lbl">Alamat *</label><input id="cf_alamat" class="inp" value="${esc(cu.alamat||'')}" placeholder="Alamat domisili"></div>
  <div><label class="lbl">Tanggal Lahir *</label><input id="cf_ttl" type="date" class="inp" value="${esc(cu.ttl||'')}"></div>
  <div><label class="lbl">Alamat Tujuan *</label><input id="cf_tujuan" class="inp" value="${esc(cu.tujuan||'')}" placeholder="Contoh: Bandung / dalam kota"></div>
  <div class="sm:col-span-2"><label class="lbl">Catatan Tambahan</label><textarea id="cf_catatan" class="inp" rows="3" placeholder="Opsional: permintaan kursi bayi, jam penjemputan, dll.">${esc(cu.catatan||'')}</textarea></div>
 </div></div></div>`;}
else if(S.step===3){const v=c.v;
 body=`<div class="grid lg:grid-cols-[1fr_380px] gap-6 max-w-5xl mx-auto">
 <div class="card p-6 min-w-0">
  <h3 class="font-display font-semibold text-lg mb-5">Detail Booking</h3>
  <div class="flex gap-4 items-center pb-5 border-b border-white/5"><img src="${v.img}" class="w-28 h-20 object-cover rounded-lg shrink-0 hidden sm:block"><div class="min-w-0"><div class="font-display font-semibold">${esc(v.name)}</div><div class="text-[12px] text-muted">${dLong(d.start)} → ${dLong(d.end)}</div><div class="text-[12px] text-muted mt-0.5">${c.dur} hari · ${d.type} · ${esc(d.pickup)}</div></div></div>
  <div class="py-5 space-y-2.5 text-[14px] border-b border-white/5">
   <div class="flex justify-between gap-3 text-muted"><span>Rental ${c.dur} hari × ${fmtIDR(v.priceLK)}</span><span class="text-zinc-200">${fmtIDR(c.rental)}</span></div>
   ${c.drv?`<div class="flex justify-between gap-3 text-muted"><span>Driver ${c.dur} hari × Rp150.000</span><span class="text-zinc-200">${fmtIDR(c.drv)}</span></div>`:''}
   ${c.disc?`<div class="flex justify-between gap-3 text-emerald-300"><span>Diskon ${d.promo}</span><span>−${fmtIDR(c.disc)}</span></div>`:''}
  </div>
  <div class="flex justify-between items-center pt-5 flex-wrap gap-2"><span class="font-display font-semibold">TOTAL</span><span class="font-display font-extrabold text-2xl text-maroon-400">${fmtIDR(c.total)}</span></div>
 </div>
 <div class="card p-6 h-fit min-w-0">
  <h4 class="font-display font-semibold mb-3">Kode Promo</h4>
  <div class="flex gap-2"><input id="promoInp" class="inp uppercase" placeholder="MERDEKA2026" value="${d.promo||''}"><button onclick="applyPromo()" class="btn btn-g btn-sm shrink-0">Pakai</button></div>
  <p class="text-[11px] text-muted mt-2">Coba: MERDEKA2026 (10%, maks Rp100rb, min 2 hari)</p>
  <div class="mt-5 pt-5 border-t border-white/5 space-y-2 text-[12.5px] text-muted">
   <div class="flex gap-2 min-w-0">${ic('user','w-4 h-4 text-maroon-400 shrink-0')}<span class="truncate">${esc(d.cust.nama||'')} · ${esc(d.cust.wa||'')}</span></div>
   ${S.custSession?`<div class="flex gap-2 text-emerald-300">${ic('check','w-4 h-4 shrink-0')}Booking terhubung ke akun ${esc(S.custSession.email)}</div>`:''}
   <div class="flex gap-2">${ic('shield','w-4 h-4 text-maroon-400 shrink-0')}Asuransi all-risk termasuk</div>
   <div class="flex gap-2">${ic('check','w-4 h-4 text-maroon-400 shrink-0')}Reschedule gratis s/d H-2</div>
  </div>
 </div></div>`;}
else if(S.step===4){const m=d.method;
 body=`<div class="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
 <div class="card p-6"><h3 class="font-display font-semibold text-lg mb-5">Pilih Metode Pembayaran</h3>
 <div class="grid grid-cols-2 gap-3">${[['QRIS','Scan semua e-wallet & m-banking'],['VA BCA','Virtual Account BCA'],['VA Mandiri','Virtual Account Mandiri'],['GoPay','E-wallet GoPay'],['OVO','E-wallet OVO'],['Transfer Bank','Transfer manual BJB']].map(x=>`<button onclick="chooseMethod('${x[0]}')" class="rounded-xl border p-4 text-left transition ${m===x[0]?'border-maroon-500 bg-maroon-500/10':'border-white/10 hover:border-white/25'}"><div class="flex items-center gap-2 font-semibold text-[13px]">${ic('card','w-4 h-4 text-maroon-400')}${x[0]}</div><div class="text-[11px] text-muted mt-1">${x[1]}</div></button>`).join('')}</div>
 <div class="mt-5 rounded-xl bg-ink-900 border border-white/5 p-4 flex justify-between items-center gap-3 flex-wrap"><span class="text-sm text-muted">Total tagihan</span><span class="font-display font-extrabold text-xl text-maroon-400">${fmtIDR(c.total)}</span></div>
 </div>
 <div class="card p-6 flex flex-col items-center justify-center text-center min-h-[320px]">
 ${!m?`<div class="text-muted">${ic('card','w-10 h-10 mx-auto mb-3 text-zinc-600')}<p class="text-sm">Pilih metode untuk melihat detail pembayaran.</p></div>`:
 m==='QRIS'?`<div class="mb-4">${qrSVG(d.veh+c.total)}</div><p class="text-sm font-semibold mb-1">Scan dengan aplikasi apapun</p><p class="text-[11px] text-muted mb-5">NMID: AZZID RENTCAR · QRIS GPN</p>`:
 m.startsWith('VA')?`<p class="text-[12px] text-muted mb-2">Nomor Virtual Account</p><div class="font-display font-extrabold text-xl sm:text-2xl tracking-wider mb-2 break-all">8808 2608 1313 8899</div><button onclick="copyTxt('8808260813138899')" class="btn btn-g btn-sm mb-5">${ic('copy','w-4 h-4')} Salin Nomor</button>`:
 m==='Transfer Bank'?`<p class="text-[12px] text-muted mb-2">Rekening BJB a.n. AZZID RENTCAR</p><div class="font-display font-extrabold text-xl sm:text-2xl tracking-wider mb-2">0123 4567 89</div><button onclick="copyTxt('0123456789')" class="btn btn-g btn-sm mb-5">${ic('copy','w-4 h-4')} Salin Rekening</button>`:
 `<p class="text-sm mb-5">Anda akan diarahkan ke ${m} untuk menyelesaikan pembayaran.</p>`}
 ${m?`<button onclick="doPay()" class="btn btn-m w-full max-w-xs">${ic('zap','w-4 h-4')} Bayar ${fmtIDR(c.total)}</button>`:''}
 </div></div>`;}
else{const b=S.lastBooking;const v=veh(b.veh);
 body=`<div class="max-w-xl mx-auto text-center card p-8 sm:p-10">
 <svg viewBox="0 0 100 100" class="w-24 h-24 mx-auto mb-6"><circle cx="50" cy="50" r="45" fill="none" stroke="#991B1B" stroke-width="4" class="check-circle"/><path d="M30 52l14 14 26-30" fill="none" stroke="#34d399" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" class="check-path"/></svg>
 <h2 class="font-display font-extrabold text-3xl mb-2">BOOKING BERHASIL</h2>
 <p class="text-muted text-sm mb-6">Konfirmasi & invoice telah dikirim ke WhatsApp dan email Anda.${S.custSession?' Booking tersimpan di akun Anda.':''}</p>
 <div class="rounded-xl bg-ink-900 border border-maroon-500/30 p-5 text-left space-y-2 text-[13.5px] mb-3">
  <div class="flex justify-between gap-2"><span class="text-muted">Booking ID</span><b class="font-mono text-maroon-400">${b.id}</b></div>
  <div class="flex justify-between gap-2"><span class="text-muted">Mobil</span><b>${esc(v.name)}</b></div>
  <div class="flex justify-between gap-2"><span class="text-muted">Tanggal</span><b>${dShort(b.start)} – ${dShort(b.end)} 2026</b></div>
  <div class="flex justify-between gap-2"><span class="text-muted">Total</span><b>${fmtIDR(b.total)}</b></div>
  <div class="flex justify-between items-center gap-2"><span class="text-muted">Status</span>${badge('PAID')}</div>
 </div>
 <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
  <button onclick="openInvoice('${b.id}')" class="btn btn-g">${ic('dl','w-4 h-4')} Download Invoice</button>
  <a target="_blank" href="${waLink(`Halo AZZID RENTCAR,\nSaya ingin melakukan booking:\nMobil: ${v.name}\nTanggal: ${dLong(b.start)} – ${dLong(b.end)}\nBooking ID: ${b.id}`)}" class="btn btn-m">WhatsApp</a>
 </div>
 ${S.custSession?`<button onclick="openAccount()" class="btn btn-g btn-sm w-full mt-3">${ic('user','w-4 h-4')} Lihat di Akun Saya</button>`:''}
 <a href="#/" class="inline-block text-sm text-muted hover:text-white mt-6">← Kembali ke Beranda</a>
 </div>`;}
return `<section class="max-w-7xl mx-auto px-4 sm:px-6 py-10">
 <div class="flex items-center justify-start sm:justify-center gap-0 mb-10 overflow-x-auto pb-2">${steps.map((s,i)=>`<div class="flex items-center shrink-0">
 <button onclick="${i<S.step&&S.step<5?`bkGo(${i})`:''}" class="flex items-center gap-2 ${i<=S.step?'':'opacity-40'}">
 <span class="w-8 h-8 rounded-full grid place-items-center text-[12px] font-bold shrink-0 ${i<S.step?'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40':i===S.step?'bg-gradient-to-br from-maroon-500 to-maroon-800 text-white shadow-glow':'bg-ink-700 border border-white/10 text-muted'}">${i<S.step?'✓':i+1}</span>
 <span class="text-[12px] font-semibold hidden md:block ${i===S.step?'text-white':'text-muted'}">${s}</span></button>
 ${i<steps.length-1?'<div class="w-5 sm:w-10 h-px bg-white/10 mx-2 shrink-0"></div>':''}</div>`).join('')}</div>
 ${body}
 ${S.step<4&&S.step>0?`<div class="flex justify-between max-w-5xl mx-auto mt-8 gap-3"><button onclick="bkGo(${S.step-1})" class="btn btn-g">← Kembali</button><button onclick="bkNext()" class="btn btn-m">Lanjutkan ${ic('arrR','w-4 h-4')}</button></div>`:''}
 ${S.step===0?`<div class="flex justify-center mt-8"><button onclick="bkNext()" class="btn btn-m">Lanjutkan ${ic('arrR','w-4 h-4')}</button></div>`:''}
 ${S.step===3?`<div class="flex justify-between max-w-5xl mx-auto mt-8 gap-3"><button onclick="bkGo(2)" class="btn btn-g">← Kembali</button><button onclick="bkGo(4)" class="btn btn-m">${ic('card','w-4 h-4')} Lanjut Pembayaran</button></div>`:''}
</section>`;}
function bkLogin(){const e=($('bAuthE').value||'').trim().toLowerCase(),p=$('bAuthP').value;
 const acc=ACCOUNTS.find(a=>a.email.toLowerCase()===e&&a.pass===p);
 if(!acc){$('bkAuthErr').classList.remove('hidden');return;}
 S.custSession={email:acc.email,nama:acc.nama};localStorage.setItem(LS_CUST,JSON.stringify(S.custSession));
 toast('Selamat datang, '+acc.nama.split(' ')[0]+'! Data Anda terisi otomatis.');renderC();}
function bkReg(){const n=$('bRegN').value.trim(),w=$('bRegW').value.trim(),e=($('bRegE').value||'').trim().toLowerCase(),p=$('bRegP').value;
 const err=$('bkRegErr');err.classList.add('hidden');
 if(!n||!w||!e||p.length<6){err.textContent='Lengkapi semua field. Password minimal 6 karakter.';err.classList.remove('hidden');return;}
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)){err.textContent='Format email tidak valid.';err.classList.remove('hidden');return;}
 if(ACCOUNTS.some(a=>a.email.toLowerCase()===e)){err.textContent='Email sudah terdaftar. Silakan masuk di tab Masuk.';err.classList.remove('hidden');return;}
 ACCOUNTS.push({id:'USR-'+Date.now(),nama:n,email:e,wa:w,pass:p,alamat:'',ktp:'',ttl:'',joined:TODAY});
 S.custSession={email:e,nama:n};localStorage.setItem(LS_CUST,JSON.stringify(S.custSession));
 addLog('Akun penyewa baru terdaftar: '+e);persist();toast('Akun berhasil dibuat!');renderC();}

/* ================= TRACK ================= */
function openTrack(){modal(`<div class="p-7"><div class="flex justify-between items-center mb-5"><h3 class="font-display font-semibold text-lg">Lacak Booking</h3><button onclick="closeModal()" class="text-muted hover:text-white">${ic('x')}</button></div>
 <div class="flex gap-2"><input id="trkInp" class="inp" placeholder="Contoh: AZR-20260812-014"><button onclick="doTrack()" class="btn btn-m btn-sm shrink-0">Cari</button></div><div id="trkRes" class="mt-5"></div></div>`);}
function doTrack(){const id=$('trkInp').value.trim().toUpperCase();const b=BOOKINGS.find(x=>x.id===id);
 if(!b){$('trkRes').innerHTML=`<div class="text-sm text-red-300">Booking ID tidak ditemukan.</div>`;return;}
 const flow=['Pending','Confirmed','Ongoing','Completed'];const idx=flow.indexOf(b.status);
 $('trkRes').innerHTML=`<div class="rounded-xl bg-ink-900 border border-white/10 p-5">
 <div class="flex justify-between items-center mb-4 gap-2 flex-wrap"><b class="font-mono text-maroon-400 text-sm">${b.id}</b>${badge(b.status)}</div>
 <div class="text-sm mb-1">${esc((veh(b.veh)||{name:'—'}).name)} · ${dShort(b.start)}–${dShort(b.end)} 2026</div>
 <div class="text-[12px] text-muted mb-4 flex items-center gap-2">Pembayaran: ${badge(b.pay.s)}</div>
 ${b.status==='Cancelled'?'<p class="text-[12px] text-red-300">Booking dibatalkan.</p>':b.status==='Expired'?'<p class="text-[12px] text-zinc-400">Booking kedaluwarsa (belum dibayar).</p>':`<div class="flex items-center gap-1.5">${flow.map((s,i)=>`<div class="flex-1 min-w-0"><div class="h-1.5 rounded-full ${i<=idx?'bg-maroon-500':'bg-white/10'}"></div><div class="text-[9.5px] mt-1.5 text-muted ${i===idx?'!text-white font-bold':''}">${s}</div></div>`).join('')}</div>`}
 </div>`;}
function copyTxt(t){if(navigator.clipboard)navigator.clipboard.writeText(t);toast('Disalin ke clipboard','info');}
function galSwap(i,slug){const v=veh(slug);const gal=[v.img,IMG.interior,IMG.dash,v.img];const m=$('galMain');m.style.opacity=.3;setTimeout(()=>{m.src=gal[i];m.style.filter=i===3?'hue-rotate(-25deg) brightness(.9)':'';m.style.opacity=1;},180);document.querySelectorAll('.gal-th').forEach((t,j)=>t.classList.toggle('!border-maroon-500',i===j));}
function toggleMobNav(forceClose){const n=$('mobNav');if(forceClose){n.classList.remove('mob-nav-open');n.setAttribute('aria-hidden','true');return;}const open=n.classList.toggle('mob-nav-open');n.setAttribute('aria-hidden',String(!open));}

/* ================= ADMIN ================= */
function fillDemo(i){const u=USERS[i];$('lgE').value=u.e;$('lgP').value=u.p;toast('Kredensial '+u.r+' terisi','info');}
function enterDashboard(u){S.session={name:u.n,email:u.e,role:u.r};
 if($('lgR')&&$('lgR').checked)localStorage.setItem(LS_SES,JSON.stringify(S.session));
 S.adminView='overview';renderA();syncAdminBtns();toast('Selamat datang, '+u.n+' — Dashboard Admin AZZID RENTCAR aktif.');}
function doLogin(){const e=($('lgE').value||'').trim().toLowerCase(),p=$('lgP').value;
 const u=USERS.find(x=>x.e.toLowerCase()===e&&x.p===p);
 const box=$('loginCard');
 if(!u){box.classList.remove('shake');void box.offsetWidth;box.classList.add('shake');$('lgErr').classList.remove('hidden');return;}
 enterDashboard(u);}
function quickLogin(){enterDashboard(USERS[0]);}
function adminLogout(){S.session=null;localStorage.removeItem(LS_SES);renderA();syncAdminBtns();toast('Anda telah logout','info');}
function setAdminView(v){S.adminView=v;renderA();}
/* Struktur sidebar sesuai PRD + Kelola Sewa */
const AMENU=[
['overview','Overview','grid'],
['rental','Kelola Sewa','key'],
['booking','Booking','file'],
['calendar','Calendar','cal'],
['armada','Armada','car'],
['customers','Customer','users'],
['drivers','Driver','wheel'],
['payments','Payment','card'],
['promo','Promo','tag'],
['reports','Reports','chart'],
['cms','CMS Website','globe'],
['users','Users & Roles','shield'],
['settings','Settings','gear']];

function renderA(){
const app=$('adminApp');
if(!S.session){
app.innerHTML=`<div class="min-h-screen grid place-items-center relative overflow-hidden bg-ink-950 px-4 py-10">
 <div class="absolute inset-0 opacity-25"><img src="${IMG.hero}" class="w-full h-full object-cover"></div>
 <div class="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/90 to-ink-950"></div>
 <div class="relative w-full max-w-4xl grid lg:grid-cols-2 card overflow-hidden bg-ink-800/90 backdrop-blur-xl rv on" id="loginCard">
  <div class="hidden lg:flex flex-col justify-between p-9 bg-gradient-to-br from-maroon-800 via-maroon-700 to-ink-900 relative overflow-hidden">
   <img src="${IMG.fleet}" class="absolute inset-0 w-full h-full object-cover opacity-20">
   <div class="relative"><div class="flex items-center gap-3 mb-10"><img src="./images/logo.png" alt="AZZID RENTCAR" class="w-12 h-12 object-contain">
   <div><div class="font-display font-bold">AZZID RENTCAR</div><div class="text-[10px] tracking-[.3em] text-red-200">ADMIN DASHBOARD</div></div></div>
   <h2 class="font-display font-extrabold text-3xl leading-tight">Dashboard Operasional Rental.</h2></div>
   <ul class="relative space-y-2.5 text-[13px] text-red-100">${['Overview · Booking · Calendar · Armada','Customer · Driver · Payment · Promo','Reports · CMS Website · Users & Roles · Settings','Kelola Sewa: mulai, perpanjang, pengembalian'].map(x=>`<li class="flex gap-2.5"><span class="mt-1">${ic('check','w-4 h-4')}</span>${x}</li>`).join('')}</ul>
  </div>
  <div class="p-7 sm:p-9">
   <div class="lg:hidden flex items-center gap-2.5 mb-6"><img src="./images/logo.png" alt="AZZID RENTCAR" class="w-11 h-11 object-contain">
   <div><div class="font-display font-bold">AZZID RENTCAR</div><div class="text-[9px] tracking-[.28em] text-muted">ADMIN DASHBOARD</div></div></div>
   <h3 class="font-display font-bold text-xl mb-1">Login Admin</h3>
   <p class="text-[12.5px] text-muted mb-6">Masuk untuk membuka dashboard pengelolaan rental.</p>
   <div id="lgErr" class="hidden mb-4 rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 text-[12.5px] px-4 py-2.5">Email atau password salah. Coba lagi.</div>
   <button onclick="quickLogin()" class="btn btn-m w-full mb-4">${ic('zap','w-4 h-4')} ⚡ Masuk Cepat — Dashboard Admin (Demo)</button>
   <div class="flex items-center gap-3 text-[11px] text-muted mb-4"><span class="h-px bg-white/10 grow"></span>atau masuk manual<span class="h-px bg-white/10 grow"></span></div>
   <label class="lbl">Email</label><input id="lgE" class="inp mb-4" value="admin@azzidrentcar.id" onkeydown="if(event.key==='Enter')doLogin()">
   <label class="lbl">Password</label><input id="lgP" type="password" class="inp mb-4" value="admin123" onkeydown="if(event.key==='Enter')doLogin()">
   <label class="flex items-center gap-2 text-[12.5px] text-muted mb-5 cursor-pointer"><input id="lgR" type="checkbox" class="accent-[#991B1B]" checked> Ingat saya di perangkat ini</label>
   <button onclick="doLogin()" class="btn btn-g w-full">${ic('lock','w-4 h-4')} Masuk Dashboard</button>
   <button onclick="openForgotPassword('admin')" class="btn btn-g w-full mt-2.5 text-[12.5px]">Lupa Password?</button>
   <div class="mt-6 pt-5 border-t border-white/10">
    <p class="text-[10.5px] uppercase tracking-widest text-muted font-bold mb-3">Akun Demo — klik untuk mengisi</p>
    <div class="grid grid-cols-2 gap-2">${USERS.map((u,i)=>`<button onclick="fillDemo(${i})" class="card !bg-ink-900 p-3 text-left hover:border-maroon-500/50 transition min-w-0"><div class="text-[12px] font-bold">${u.r}</div><div class="text-[10px] text-muted mt-0.5 truncate">${u.e}</div><div class="text-[10px] text-maroon-400 mt-0.5">pass: ${u.p}</div></button>`).join('')}</div>
   </div>
   <div class="flex justify-between items-center mt-6 text-[12px]"><a href="#/" class="text-muted hover:text-white">← Kembali ke Website</a><button onclick="resetDemo()" class="text-zinc-500 hover:text-red-300">Reset Data Demo</button></div>
  </div>
 </div></div>`;return;}
const menu=AMENU.filter(m=>(ROLE_MENU[S.session.role]||FULL_MENU).includes(m[0]));
if(!menu.find(m=>m[0]===S.adminView))S.adminView=menu[0][0];
const pend=BOOKINGS.filter(b=>b.status==='Pending').length;
const ong=ongoingCount();
app.innerHTML=`<div class="min-h-screen bg-ink-950 flex">
 <aside id="aSb" class="fixed lg:static z-40 inset-y-0 left-0 w-64 bg-ink-900 border-r border-white/5 flex flex-col -translate-x-full lg:translate-x-0 transition-transform">
  <div class="flex items-center gap-2.5 px-5 h-16 border-b border-white/5 shrink-0"><img src="./images/logo.png" alt="AZZID RENTCAR" class="w-10 h-10 object-contain">
  <div class="min-w-0"><div class="font-display font-bold text-sm leading-none truncate">AZZID RENTCAR</div><div class="text-[9px] tracking-[.28em] text-muted mt-1">ADMIN PANEL</div></div></div>
  <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1">${menu.map(m=>`<button onclick="setAdminView('${m[0]}');closeSb()" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-medium transition ${S.adminView===m[0]?'bg-gradient-to-r from-maroon-600 to-maroon-800 text-white shadow-glow':'text-zinc-400 hover:bg-white/5 hover:text-white'}">${ic(m[2],'w-[18px] shrink-0')}<span class="grow text-left">${m[1]}</span>${m[0]==='rental'&&ong?`<span class="badge bg-orange-400/20 border-orange-400/40 text-orange-300">${ong}</span>`:''}${m[0]==='booking'&&pend?`<span class="badge bg-amber-400/20 border-amber-400/40 text-amber-300">${pend}</span>`:''}</button>`).join('')}</nav>
  <div class="p-4 border-t border-white/5 space-y-1">
   <a href="#/" class="flex items-center gap-3 px-3.5 py-2 rounded-lg text-[13px] text-zinc-400 hover:bg-white/5 hover:text-white">${ic('globe','w-[18px]')} Lihat Website</a>
   <button onclick="adminLogout()" class="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-[13px] text-red-300 hover:bg-red-500/10">${ic('logout','w-[18px]')} Logout</button>
  </div></aside>
 <div class="flex-1 flex flex-col min-w-0">
  <header class="h-16 bg-ink-900/80 backdrop-blur border-b border-white/5 flex items-center gap-3 px-4 sm:px-6 sticky top-0 z-30">
   <button class="lg:hidden p-2" onclick="document.getElementById('aSb').classList.toggle('-translate-x-full')">${ic('grid')}</button>
   <h1 class="font-display font-bold text-lg truncate">${(AMENU.find(m=>m[0]===S.adminView)||[])[1]||''}</h1>
   <div class="relative ml-auto"><button onclick="document.getElementById('bellD').classList.toggle('hidden')" class="p-2 relative text-zinc-400 hover:text-white">${ic('bell')}<span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-maroon-500 dot-live"></span></button>
   <div id="bellD" class="hidden absolute right-0 top-12 w-[300px] max-w-[88vw] card bg-ink-800 p-2 z-50 shadow-card"><div class="px-3 py-2 text-[12px] font-bold text-muted uppercase tracking-wider">Notifikasi</div>${NOTIFS.map(n=>`<div class="flex gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5"><span class="${n.cl} mt-0.5 shrink-0">${ic(n.ic,'w-4 h-4')}</span><div class="min-w-0"><p class="text-[12.5px] leading-snug">${n.t}</p><p class="text-[10.5px] text-muted mt-0.5">${n.w}</p></div></div>`).join('')}</div></div>
   <div class="flex items-center gap-2.5 pl-3 border-l border-white/10"><span class="w-9 h-9 rounded-full bg-maroon-600 grid place-items-center font-display font-bold text-sm shrink-0">${(S.session.name[0]||'A').toUpperCase()}</span>
   <div class="hidden sm:block min-w-0"><div class="text-[13px] font-semibold leading-none capitalize truncate">${esc(S.session.name)}</div><div class="text-[10px] text-maroon-400 font-bold tracking-wider mt-0.5 uppercase">${S.session.role}</div></div></div>
  </header>
  <main id="aBody" class="p-4 sm:p-6 flex-1 min-w-0"></main>
 </div></div>`;
renderAdminBody();}
function closeSb(){if(window.innerWidth<1024)$('aSb').classList.add('-translate-x-full');}

function revSeries(days){const out=[];const t=dP(TODAY);for(let i=days-1;i>=0;i--){const d=new Date(t);d.setDate(d.getDate()-i);const sd=d.getDate()+d.getMonth()*31;let v=900000+rnd(sd)*1700000;if(d.getDay()===5||d.getDay()===6)v+=600000;out.push({d,v:Math.round(v/50000)*50000});}return out;}
function areaChart(data,h=210){const W=720,max=Math.max(...data.map(x=>x.v))*1.15;const px=i=>i*(W/(data.length-1)),py=v=>h-14-(v/max)*(h-40);
 let line='',area=`M0 ${h-14} `;data.forEach((p,i)=>{line+=(i?'L':'M')+px(i).toFixed(1)+' '+py(p.v).toFixed(1)+' ';area+=`L${px(i).toFixed(1)} ${py(p.v).toFixed(1)} `;});area+=`L${W} ${h-14} Z`;
 const step=Math.max(1,Math.ceil(data.length/12));
 const dots=data.map((p,i)=>i%step===0?`<circle cx="${px(i)}" cy="${py(p.v)}" r="3.5" fill="#0B0B0D" stroke="#c53030" stroke-width="2"><title>${p.d.getDate()} ${MON[p.d.getMonth()]} · ${fmtIDR(p.v)}</title></circle>`:'').join('');
 return `<svg viewBox="0 0 ${W} ${h}" class="w-full"><defs><linearGradient id="gv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#991B1B" stop-opacity=".45"/><stop offset="1" stop-color="#991B1B" stop-opacity="0"/></linearGradient></defs>
 ${[.25,.5,.75].map(g=>`<line x1="0" x2="${W}" y1="${h-14-g*(h-40)}" y2="${h-14-g*(h-40)}" stroke="rgba(255,255,255,.06)"/>`).join('')}
 <path d="${area}" fill="url(#gv)"/><path d="${line}" fill="none" stroke="#c53030" stroke-width="2.5" class="chart-line"/>${dots}</svg>`;}

function renderAdminBody(){const v=S.adminView;const el=$('aBody');if(!el)return;
el.innerHTML=({overview:aOverview,rental:aRental,booking:aBookings,calendar:aCalendar,armada:aArmada,customers:aCustomers,drivers:aDrivers,payments:aPayments,promo:aPromo,reports:aReports,cms:aCms,users:aUsers,settings:aSettings}[v]||aOverview)();
revealInit();
if(v==='booking')refreshBk();
if(v==='armada')refreshVeh();}

function aOverview(){const series=revSeries(S.revRange);const tot=series.reduce((a,b)=>a+b.v,0);
const avail=VEHICLES.filter(v=>v.status==='available').length;
const pendAmt=BOOKINGS.filter(b=>['PENDING','UNPAID'].includes(b.pay.s)).reduce((a,b)=>a+b.total,0);
return `<div class="space-y-6">
 <div class="rv card p-5 !bg-gradient-to-r !from-maroon-800/70 !to-ink-800 flex flex-wrap items-center gap-4">
  <span class="w-12 h-12 rounded-xl bg-white/10 text-white grid place-items-center shrink-0">${ic('key')}</span>
  <div class="min-w-0 grow"><h2 class="font-display font-bold text-lg">Kelola Sewa Mobil — ${ongoingCount()} sewa aktif</h2>
  <p class="text-[12.5px] text-muted">Mulai sewa, perpanjang, dan proses pengembalian dari satu layar.</p></div>
  <div class="flex gap-2 flex-wrap"><button onclick="setAdminView('rental')" class="btn btn-m btn-sm">${ic('key','w-4 h-4')} Buka Kelola Sewa</button>
  <button onclick="bookingForm()" class="btn btn-g btn-sm">${ic('plus','w-4 h-4')} Buat Booking</button></div>
 </div>
 <div class="rv flex flex-wrap items-center justify-between gap-3"><div class="min-w-0"><h2 class="font-display font-bold text-xl">Selamat datang, <span class="text-maroon-400 capitalize">${esc(S.session.name)}</span> 👋</h2><p class="text-[12.5px] text-muted mt-1">Kamis, 13 Agustus 2026 · Ringkasan operasional hari ini.</p></div></div>
 <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
  <div class="rv card p-5 hover:border-maroon-500/40 transition"><div class="flex items-center justify-between mb-3"><span class="w-10 h-10 rounded-xl bg-maroon-500/15 text-maroon-400 grid place-items-center">${ic('file')}</span></div><div class="font-display font-extrabold text-[22px] leading-none"><span data-cu="128">0</span></div><div class="text-[11px] uppercase tracking-widest text-muted mt-2">Total Booking</div><div class="text-[11px] text-emerald-300 mt-1">↑ 12% vs bulan lalu</div></div>
  <div class="rv card p-5 hover:border-maroon-500/40 transition" style="transition-delay:80ms"><div class="flex items-center justify-between mb-3"><span class="w-10 h-10 rounded-xl bg-maroon-500/15 text-maroon-400 grid place-items-center">${ic('clock')}</span></div><div class="font-display font-extrabold text-[22px] leading-none"><span data-cu="32">0</span></div><div class="text-[11px] uppercase tracking-widest text-muted mt-2">Booking Aktif</div><div class="text-[11px] text-emerald-300 mt-1">↑ 8% vs bulan lalu</div></div>
  <div class="rv card p-5 hover:border-maroon-500/40 transition" style="transition-delay:160ms"><div class="flex items-center justify-between mb-3"><span class="w-10 h-10 rounded-xl bg-maroon-500/15 text-maroon-400 grid place-items-center">${ic('wallet')}</span></div><div class="font-display font-extrabold text-[22px]">${fmtK(tot)}</div><div class="text-[11px] uppercase tracking-widest text-muted mt-2">Pendapatan (${S.revRange} hari)</div><div class="text-[11px] text-emerald-300 mt-1">↑ 18% vs periode sebelumnya</div></div>
  <div class="rv card p-5 hover:border-maroon-500/40 transition" style="transition-delay:240ms"><div class="flex items-center justify-between mb-3"><span class="w-10 h-10 rounded-xl bg-maroon-500/15 text-maroon-400 grid place-items-center">${ic('car')}</span></div><div class="font-display font-extrabold text-[22px] leading-none">${avail}<span class="text-muted text-base">/${VEHICLES.length}</span></div><div class="text-[11px] uppercase tracking-widest text-muted mt-2">Armada Tersedia</div><div class="text-[11px] text-emerald-300 mt-1">Siap disewakan hari ini</div></div>
 </div>
 <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
  ${[['PENDING PAYMENT',fmtK(pendAmt),'bg-amber-400'],['BOOKING HARI INI','2','bg-sky-400'],['MOBIL DISEWA',String(VEHICLES.filter(v=>v.status==='rented').length),'bg-orange-400'],['MOBIL MAINTENANCE',String(VEHICLES.filter(v=>v.status==='maintenance').length),'bg-red-400']].map((x,i)=>`<div class="rv card !bg-ink-800 px-5 py-4 flex items-center justify-between" style="transition-delay:${i*70}ms"><div class="min-w-0"><div class="text-[10px] tracking-widest text-muted uppercase truncate">${x[0]}</div><div class="font-display font-bold text-lg mt-1 truncate">${x[1]}</div></div><span class="w-2 h-2 rounded-full ${x[2]} dot-live shrink-0"></span></div>`).join('')}
 </div>
 <div class="grid xl:grid-cols-[1.6fr_1fr] gap-6">
  <div class="rv card p-6 min-w-0"><div class="flex flex-wrap items-center justify-between gap-3 mb-5"><h3 class="font-display font-semibold">Revenue Analytics</h3>
   <div class="flex gap-1.5">${[['7','7 Hari'],['30','30 Hari'],['90','3 Bulan']].map(r=>`<button onclick="S.revRange=${r[0]};renderAdminBody()" class="chip !py-1.5 text-[11px] ${S.revRange==+r[0]?'on':''}">${r[1]}</button>`).join('')}</div></div>
   ${areaChart(series)}
   <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-5 pt-5 border-t border-white/5 text-center">
    ${[['Total Revenue',fmtK(tot)],['Paid Booking',BOOKINGS.filter(b=>b.pay.s==='PAID').length],['Pending',BOOKINGS.filter(b=>b.pay.s==='PENDING').length],['Refund',BOOKINGS.filter(b=>b.pay.s==='REFUNDED').length],['Avg Booking',fmtK(tot/22)]].map(x=>`<div class="min-w-0"><div class="font-display font-bold text-[15px] text-maroon-400 truncate">${x[1]}</div><div class="text-[10px] uppercase tracking-wider text-muted mt-1">${x[0]}</div></div>`).join('')}
   </div></div>
  <div class="rv card p-6 min-w-0"><h3 class="font-display font-semibold mb-4">Aktivitas Terbaru</h3>
   <div class="space-y-4">${NOTIFS.map(n=>`<div class="flex gap-3"><span class="w-8 h-8 rounded-lg bg-ink-700 grid place-items-center ${n.cl} shrink-0">${ic(n.ic,'w-4 h-4')}</span><div class="min-w-0"><p class="text-[12.5px] leading-snug">${n.t}</p><p class="text-[10.5px] text-muted mt-0.5">${n.w}</p></div></div>`).join('')}</div>
   <h3 class="font-display font-semibold mt-6 mb-3">Status Armada</h3>
   <div class="space-y-2">${VEHICLES.slice(0,5).map(v=>`<div class="flex items-center justify-between gap-2 text-[12.5px] bg-ink-900 rounded-lg px-3 py-2"><span class="truncate">${esc(v.name)}</span>${badge(v.status)}</div>`).join('')}</div>
  </div></div>
 <div class="rv card overflow-x-auto"><div class="flex items-center justify-between p-5 pb-0 gap-3"><h3 class="font-display font-semibold">Booking Terbaru</h3><button onclick="setAdminView('booking')" class="text-[12px] font-semibold text-maroon-400 shrink-0">Kelola Semua →</button></div>
  <table class="tbl min-w-[720px]"><thead><tr><th>Booking ID</th><th>Customer</th><th>Mobil</th><th>Tanggal</th><th>Total</th><th>Status</th></tr></thead><tbody>
  ${BOOKINGS.slice(-6).reverse().map(b=>`<tr class="cursor-pointer" onclick="openBookingDetail('${b.id}')"><td class="font-mono text-maroon-400">${b.id.slice(-9)}</td><td>${esc(b.cust)}</td><td>${esc((veh(b.veh)||{name:'—'}).name)}</td><td>${dShort(b.start)}–${dShort(b.end)}</td><td>${fmtK(b.total)}</td><td>${badge(b.status)}</td></tr>`).join('')}
  </tbody></table></div>
</div>`;}

/* ================= KELOLA SEWA ================= */
function aRental(){
 const ongoing=BOOKINGS.filter(b=>b.status==='Ongoing');
 const upcoming=BOOKINGS.filter(b=>b.status==='Confirmed').sort((a,b)=>a.start.localeCompare(b.start));
 const dueSoon=ongoing.filter(b=>b.end<=addDays(TODAY,1));
 const overdue=ongoing.filter(b=>b.end<TODAY);
 const revActive=ongoing.reduce((a,b)=>a+b.total,0);
 return `<div class="space-y-5">
 <div class="rv card p-4 !bg-gradient-to-r !from-maroon-800/60 !to-ink-800 flex flex-wrap items-center gap-3"><span class="w-10 h-10 rounded-xl bg-white/10 text-white grid place-items-center shrink-0">${ic('key')}</span>
  <div class="min-w-0 grow"><h2 class="font-display font-bold">Pusat Pengelolaan Sewa Mobil</h2><p class="text-[12px] text-muted">Mulai sewa, perpanjang, dan proses pengembalian — status armada & log diperbarui otomatis.</p></div>
  <button onclick="bookingForm()" class="btn btn-m btn-sm">${ic('plus','w-4 h-4')} Buat Booking</button></div>
 <div class="grid grid-cols-2 xl:grid-cols-4 gap-4">
  ${[['wheel','SEWA BERJALAN',ongoing.length,'text-orange-300'],['cal','AKAN DATANG',upcoming.length,'text-sky-300'],['clock','JATUH TEMPO ≤24 JAM',dueSoon.length,'text-amber-300'],['alert','OVERDUE',overdue.length,'text-red-300']].map((x,i)=>`<div class="rv card p-4 flex items-center gap-3" style="transition-delay:${i*60}ms"><span class="w-10 h-10 rounded-xl bg-maroon-500/15 text-maroon-400 grid place-items-center shrink-0">${ic(x[0])}</span><div class="min-w-0"><div class="font-display font-extrabold text-xl ${x[3]}">${x[2]}</div><div class="text-[10px] uppercase tracking-widest text-muted truncate">${x[1]}</div></div></div>`).join('')}
 </div>
 <div class="rv card p-4 flex flex-wrap items-center gap-3 !bg-ink-800"><span class="text-[12px] text-muted">Nilai sewa berjalan:</span><b class="font-display text-maroon-400">${fmtIDR(revActive)}</b><span class="ml-auto text-[11.5px] text-muted">Semua aksi tercatat di log perubahan.</span></div>
 ${overdue.length?`<div class="rv rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-[13px] text-red-300 flex gap-2.5">${ic('alert','w-5 h-5 shrink-0')}<div><b>${overdue.length} sewa melewati tanggal pengembalian.</b> Segera hubungi customer atau proses perpanjangan.</div></div>`:''}
 <div class="rv card overflow-x-auto">
  <div class="p-5 pb-0 flex items-center justify-between gap-3"><h3 class="font-display font-semibold">Sedang Berjalan (Ongoing)</h3><span class="badge bg-orange-400/10 border-orange-400/30 text-orange-300">${ongoing.length}</span></div>
  <table class="tbl min-w-[900px]"><thead><tr><th>Booking</th><th>Customer</th><th>Unit</th><th>Periode</th><th>Driver</th><th>Total</th><th>Aksi</th></tr></thead><tbody>
  ${ongoing.length?ongoing.map(b=>{const v=veh(b.veh)||{name:'—'};return `<tr>
   <td class="font-mono text-maroon-400 whitespace-nowrap">${b.id.slice(-9)}</td><td class="whitespace-nowrap">${esc(b.cust)}</td>
   <td class="whitespace-nowrap"><div class="flex items-center gap-2"><img src="${v.img||IMG.fleet}" class="w-9 h-7 rounded object-cover">${esc(v.name)}</div></td>
   <td class="whitespace-nowrap">${dShort(b.start)} → <b class="${b.end<TODAY?'text-red-300':b.end<=addDays(TODAY,1)?'text-amber-300':''}">${dShort(b.end)}</b></td>
   <td class="whitespace-nowrap text-muted">${b.driver&&drv(b.driver)?drv(b.driver).name:'—'}</td>
   <td class="font-semibold whitespace-nowrap">${fmtK(b.total)}</td>
   <td><div class="flex gap-1.5 whitespace-nowrap">
    <button onclick="extendRental('${b.id}')" class="btn btn-g btn-sm !py-1" title="Perpanjang 1 hari">${ic('plus','w-3.5 h-3.5')} 1 Hari</button>
    <button onclick="returnRental('${b.id}')" class="btn btn-m btn-sm !py-1">${ic('back','w-3.5 h-3.5')} Pengembalian</button>
   </div></td></tr>`;}).join(''):`<tr><td colspan="7" class="text-center py-10 text-muted">Tidak ada sewa yang sedang berjalan.</td></tr>`}
  </tbody></table></div>
 <div class="rv card overflow-x-auto">
  <div class="p-5 pb-0 flex items-center justify-between gap-3"><h3 class="font-display font-semibold">Akan Datang (Confirmed) — jadwal pickup</h3><span class="badge bg-sky-400/10 border-sky-400/30 text-sky-300">${upcoming.length}</span></div>
  <table class="tbl min-w-[900px]"><thead><tr><th>Booking</th><th>Customer</th><th>Unit</th><th>Mulai</th><th>Pickup</th><th>Total</th><th>Aksi</th></tr></thead><tbody>
  ${upcoming.length?upcoming.map(b=>{const v=veh(b.veh)||{name:'—'};return `<tr>
   <td class="font-mono text-maroon-400 whitespace-nowrap">${b.id.slice(-9)}</td><td class="whitespace-nowrap">${esc(b.cust)}</td>
   <td class="whitespace-nowrap"><div class="flex items-center gap-2"><img src="${v.img||IMG.fleet}" class="w-9 h-7 rounded object-cover">${esc(v.name)}</div></td>
   <td class="whitespace-nowrap">${dShort(b.start)} ${b.start===TODAY?'<span class="badge bg-maroon-500/20 border-maroon-500/40 text-red-300">HARI INI</span>':''}</td>
   <td class="text-muted max-w-[180px] truncate">${esc(b.pickup)}</td>
   <td class="font-semibold whitespace-nowrap">${fmtK(b.total)}</td>
   <td><div class="flex gap-1.5 whitespace-nowrap">
    <button onclick="openBookingDetail('${b.id}')" class="btn btn-g btn-sm !py-1">${ic('eye','w-3.5 h-3.5')}</button>
    <button onclick="startRental('${b.id}')" class="btn btn-m btn-sm !py-1">${ic('key','w-3.5 h-3.5')} Mulai Sewa</button>
   </div></td></tr>`;}).join(''):`<tr><td colspan="7" class="text-center py-10 text-muted">Tidak ada jadwal yang akan datang.</td></tr>`}
  </tbody></table></div>
 <div class="rv card p-5"><h3 class="font-display font-semibold mb-3">Jadwal Pengembalian Terdekat</h3>
 <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">${ongoing.slice().sort((a,b)=>a.end.localeCompare(b.end)).slice(0,6).map(b=>{const v=veh(b.veh)||{name:'—'};return `<div class="bg-ink-900 rounded-xl px-4 py-3 border border-white/5 flex items-center gap-3 min-w-0"><span class="w-9 h-9 rounded-lg bg-orange-400/10 text-orange-300 grid place-items-center shrink-0">${ic('back','w-4 h-4')}</span><div class="min-w-0"><div class="text-[12.5px] font-semibold truncate">${esc(v.name)} · ${esc(b.cust)}</div><div class="text-[11px] text-muted">Kembali ${dLong(b.end)}</div></div></div>`;}).join('')||'<p class="text-[12.5px] text-muted">Tidak ada jadwal pengembalian.</p>'}</div></div>
</div>`;}
function startRental(id){const b=BOOKINGS.find(x=>x.id===id);if(!b)return;b.status='Ongoing';const v=veh(b.veh);if(v)v.status='rented';
 addLog(`Sewa dimulai: ${id} · ${v?v.name:''} (${b.cust})`);persist();toast('Sewa '+id+' dimulai — unit ditandai Rented');renderAdminBody();}
function returnRental(id){const b=BOOKINGS.find(x=>x.id===id);if(!b)return;b.status='Completed';
 const v=veh(b.veh);const still=BOOKINGS.some(x=>x.veh===b.veh&&x.id!==id&&['Ongoing','Confirmed'].includes(x.status));
 if(v&&!still&&v.status==='rented')v.status='available';
 addLog(`Pengembalian diproses: ${id} · ${v?v.name:''} — unit kembali Available`);persist();toast('Pengembalian '+id+' selesai. Terima kasih!');renderAdminBody();}
function extendRental(id){const b=BOOKINGS.find(x=>x.id===id);if(!b)return;const v=veh(b.veh);
 const per=v?(b.type==='Dengan Driver'?v.priceDrv:v.priceLK):500000;
 b.end=addDays(b.end,1);b.total+=per;if(b.type==='Dengan Driver'){b.sub+=v?v.priceLK:350000;b.drv+=150000;}else b.sub+=per;
 addLog(`Sewa diperpanjang: ${id} s/d ${dShort(b.end)} (+${fmtK(per)})`);persist();toast('Sewa diperpanjang s/d '+dShort(b.end)+' · +'+fmtK(per));renderAdminBody();}

/* ================= BOOKING CRUD ================= */
function calcBf(){const v=veh($('bf_veh').value);const s=$('bf_start').value,e=$('bf_end').value;const el=$('bfTotal');if(!el)return;
 if(!v||!s||!e||e<s){el.textContent='—';return;}
 const dur=daysDiff(s,e);el.textContent=fmtIDR(dur*v.priceLK+($('bf_type').value==='Dengan Driver'?dur*150000:0));}
function bookingForm(id){const b=id?BOOKINGS.find(x=>x.id===id):null;
modal(`<div class="p-7"><div class="flex justify-between items-center mb-5 gap-3"><h3 class="font-display font-semibold text-lg">${b?'Edit Booking':'Buat Booking Manual'}</h3><button onclick="closeModal()" class="text-muted hover:text-white shrink-0">${ic('x')}</button></div>
 <div class="grid sm:grid-cols-2 gap-4">
  <div><label class="lbl">Nama Customer *</label><input id="bf_nama" class="inp" value="${esc(b?b.cust:'')}" placeholder="Nama penyewa" list="custList"><datalist id="custList">${CUSTOMERS.map(c=>`<option value="${esc(c.name)}">`).join('')}</datalist></div>
  <div><label class="lbl">No. WhatsApp</label><input id="bf_wa" class="inp" value="${esc(b?(CUSTOMERS.find(c=>c.name===b.cust)||{}).wa||'':'')}" placeholder="08xx…"></div>
  <div><label class="lbl">Kendaraan *</label><select id="bf_veh" class="inp" onchange="calcBf()">${VEHICLES.map(v=>`<option value="${v.id}" ${b&&b.veh===v.id?'selected':''}>${esc(v.name)} — ${fmtK(v.priceLK)}/hari</option>`).join('')}</select></div>
  <div><label class="lbl">Jenis Rental</label><select id="bf_type" class="inp" onchange="calcBf()"><option ${b&&b.type==='Lepas Kunci'?'selected':''}>Lepas Kunci</option><option ${b&&b.type==='Dengan Driver'?'selected':''}>Dengan Driver</option></select></div>
  <div><label class="lbl">Tanggal Mulai *</label><input id="bf_start" type="date" class="inp" value="${b?b.start:'2026-08-14'}" onchange="calcBf()"></div>
  <div><label class="lbl">Tanggal Selesai *</label><input id="bf_end" type="date" class="inp" value="${b?b.end:'2026-08-16'}" onchange="calcBf()"></div>
  <div class="sm:col-span-2"><label class="lbl">Lokasi Pickup</label><input id="bf_pickup" class="inp" value="${esc(b?b.pickup:'Kantor AZZID — Kemang')}"></div>
  <div><label class="lbl">Status Booking</label><select id="bf_status" class="inp">${['Pending','Confirmed','Ongoing','Completed','Cancelled','Expired'].map(s=>`<option ${b&&b.status===s?'selected':''}>${s}</option>`).join('')}</select></div>
  <div><label class="lbl">Status Pembayaran</label><select id="bf_pay" class="inp">${['UNPAID','PENDING','PAID','REFUNDED'].map(s=>`<option ${b&&b.pay.s===s?'selected':''}>${s}</option>`).join('')}</select></div>
  <div class="sm:col-span-2 rounded-xl bg-ink-900 border border-maroon-500/30 px-4 py-3 flex justify-between items-center gap-3"><span class="text-[12px] text-muted">Estimasi total (otomatis)</span><b id="bfTotal" class="font-display text-maroon-400">—</b></div>
 </div>
 <button onclick="saveBooking('${id||''}')" class="btn btn-m w-full mt-6">${ic('check','w-4 h-4')} Simpan Booking</button></div>`,1);
calcBf();}
function saveBooking(id){const nama=$('bf_nama').value.trim(),vid=$('bf_veh').value,s=$('bf_start').value,e=$('bf_end').value;
 if(!nama||!s||!e||e<s){toast('Nama & tanggal valid wajib diisi','err');return;}
 const v=veh(vid);const dur=daysDiff(s,e);const type=$('bf_type').value;
 const rental=dur*v.priceLK;const drvC=type==='Dengan Driver'?dur*150000:0;const total=rental+drvC;
 const st=$('bf_status').value;const ps=$('bf_pay').value;
 if(id){const b=BOOKINGS.find(x=>x.id===id);Object.assign(b,{cust:nama,veh:vid,start:s,end:e,type,pickup:$('bf_pickup').value,status:st,sub:rental,drv:drvC,total});b.pay.s=ps;if(ps==='PAID'&&!b.pay.at)b.pay.at=TODAY;
  addLog(`Booking ${id} diperbarui (${nama} · ${v.name})`);toast('Booking diperbarui');}
 else{const nid=`AZR-${TODAY.replaceAll('-','')}-${String(BOOKINGS.length+15).padStart(3,'0')}`;
  BOOKINGS.push({id:nid,cust:nama,veh:vid,start:s,end:e,type,pickup:$('bf_pickup').value,drop:$('bf_pickup').value,driver:null,sub:rental,drv:drvC,disc:0,total,status:st,pay:{m:'Manual / Kantor',s:ps,tx:'TRX-M'+Math.floor(1000+Math.random()*9000),at:ps==='PAID'?TODAY:null},user:null});
  upsertCustomer(nama,$('bf_wa').value,'');addLog(`Booking manual dibuat: ${nid} · ${v.name} · ${nama}`);toast('Booking '+nid+' dibuat');}
 persist();closeModal();renderAdminBody();}
function delBooking(id){const b=BOOKINGS.find(x=>x.id===id);if(!b)return;
modal(`<div class="p-7 text-center"><span class="w-14 h-14 mx-auto rounded-full bg-red-500/15 border border-red-500/40 text-red-300 grid place-items-center mb-4">${ic('alert')}</span>
 <h3 class="font-display font-bold text-lg">Hapus Booking?</h3>
 <p class="text-[13.5px] text-muted mt-2">${id} · ${esc(b.cust)} · ${esc((veh(b.veh)||{name:'—'}).name)}</p>
 <p class="text-[12.5px] text-muted mt-2">Data booking akan dihapus permanen & tercatat di log.</p>
 <div class="grid grid-cols-2 gap-2.5 mt-6"><button onclick="closeModal()" class="btn btn-g btn-sm">Batal</button>
 <button onclick="hardDelBooking('${id}')" class="btn btn-d btn-sm">${ic('trash','w-4 h-4')} Hapus</button></div></div>`);}
function hardDelBooking(id){const b=BOOKINGS.find(x=>x.id===id);BOOKINGS=BOOKINGS.filter(x=>x.id!==id);
 const v=veh(b.veh);const still=BOOKINGS.some(x=>x.veh===b.veh&&['Ongoing','Confirmed'].includes(x.status));
 if(v&&!still&&v.status==='rented')v.status='available';
 addLog(`Booking dihapus permanen: ${id} (${b.cust})`);persist();closeModal();toast('Booking dihapus','err');renderAdminBody();}

function bkRow(b){const v=veh(b.veh);return `<tr class="cursor-pointer" onclick="openBookingDetail('${b.id}')"><td class="font-mono text-maroon-400 whitespace-nowrap">${b.id}</td><td class="whitespace-nowrap">${esc(b.cust)}${b.user?`<span class="block text-[9.5px] text-emerald-300">via akun</span>`:''}</td><td class="whitespace-nowrap">${esc(v?v.name:'—')}</td><td class="whitespace-nowrap">${dShort(b.start)}–${dShort(b.end)} Agu</td><td class="font-semibold whitespace-nowrap">${fmtK(b.total)}</td><td>${badge(b.pay.s)}</td><td>${badge(b.status)}</td>
<td><div class="flex gap-1 whitespace-nowrap" onclick="event.stopPropagation()">
 <button onclick="bookingForm('${b.id}')" class="p-1.5 text-zinc-400 hover:text-white" title="Edit">${ic('edit','w-4 h-4')}</button>
 <button onclick="delBooking('${b.id}')" class="p-1.5 text-red-400/70 hover:text-red-300" title="Hapus">${ic('trash','w-4 h-4')}</button>
</div></td></tr>`;}
function refreshBk(){const tb=$('bkTbody');if(!tb)return;const q=S._q.toLowerCase();
 let list=[...BOOKINGS].reverse();
 if(q)list=list.filter(b=>(b.id+b.cust+(veh(b.veh)?veh(b.veh).name:'')).toLowerCase().includes(q));
 if(S._bst)list=list.filter(b=>b.status===S._bst);
 if(S._bps)list=list.filter(b=>b.pay.s===S._bps);
 tb.innerHTML=list.length?list.map(bkRow).join(''):`<tr><td colspan="8" class="text-center py-10 text-muted">Tidak ada booking yang cocok.</td></tr>`;
 const cnt=$('bkCnt');if(cnt)cnt.textContent=list.length+' booking';}
function aBookings(){return `<div class="space-y-5">
 <div class="rv card p-4 flex flex-wrap gap-3 items-center">
  <div class="relative w-full sm:w-60"><span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted">${ic('search','w-4 h-4')}</span>
  <input class="inp pl-9" placeholder="Cari ID / customer / mobil…" value="${esc(S._q)}" oninput="S._q=this.value;refreshBk()"></div>
  <select class="inp !w-44" onchange="S._bst=this.value;refreshBk()"><option value="">Semua Status</option>${['Pending','Confirmed','Ongoing','Completed','Cancelled','Expired'].map(x=>`<option ${S._bst===x?'selected':''}>${x}</option>`).join('')}</select>
  <select class="inp !w-48" onchange="S._bps=this.value;refreshBk()"><option value="">Semua Pembayaran</option>${['PAID','PENDING','UNPAID','REFUNDED'].map(x=>`<option ${S._bps===x?'selected':''}>${x}</option>`).join('')}</select>
  <span id="bkCnt" class="text-[12px] text-muted"></span>
  <button onclick="bookingForm()" class="btn btn-m btn-sm ml-auto">${ic('plus','w-4 h-4')} Buat Booking</button></div>
 <div class="rv card overflow-x-auto"><table class="tbl min-w-[900px]"><thead><tr><th>Booking ID</th><th>Customer</th><th>Mobil</th><th>Tanggal</th><th>Total</th><th>Payment</th><th>Status</th><th>Aksi</th></tr></thead><tbody id="bkTbody"></tbody></table></div></div>`;}

function openBookingDetail(id){const b=BOOKINGS.find(x=>x.id===id);const v=veh(b.veh)||{name:'—'};const cu=CUSTOMERS.find(c=>c.name===b.cust)||{};
modal(`<div class="p-7">
 <div class="flex items-start justify-between mb-6 gap-3"><div class="min-w-0"><div class="font-mono text-maroon-400 text-[13px]">${b.id}</div><h3 class="font-display font-bold text-xl mt-1 truncate">${esc(v.name)}</h3><div class="flex gap-2 mt-2 flex-wrap">${badge(b.status)}${badge(b.pay.s)}${b.user?'<span class="badge bg-emerald-400/10 border-emerald-400/30 text-emerald-300">Akun Penyewa</span>':''}</div></div>
 <button onclick="closeModal()" class="text-muted hover:text-white shrink-0">${ic('x')}</button></div>
 <div class="grid sm:grid-cols-2 gap-4 mb-6 text-[13px]">
  <div class="card !bg-ink-900 p-4 min-w-0"><h4 class="lbl !mb-3">Customer</h4><p class="font-semibold truncate">${esc(b.cust)}</p><p class="text-muted mt-1 truncate">${cu.wa||'0812-0000-0000'} · ${cu.email||b.user||'-'}</p><p class="text-muted text-[11px] mt-1">KTP: •••• •••• ${String(Math.abs((b.id.charCodeAt(6)||4)*731)%9000+1000)} <span class="badge bg-white/5 border-white/10 ml-1">TERBATAS</span></p></div>
  <div class="card !bg-ink-900 p-4 min-w-0"><h4 class="lbl !mb-3">Rental</h4><p>${dLong(b.start)} → ${dLong(b.end)}</p><p class="text-muted mt-1">${daysDiff(b.start,b.end)} hari · ${b.type}</p><p class="text-muted mt-1 break-words">${esc(b.pickup)}</p><p class="text-muted">Driver: <b class="text-zinc-200">${b.driver&&drv(b.driver)?drv(b.driver).name:'—'}</b></p></div>
  <div class="card !bg-ink-900 p-4 sm:col-span-2"><h4 class="lbl !mb-3">Payment</h4><div class="flex flex-wrap justify-between gap-2"><span class="text-muted">Metode: <b class="text-zinc-200">${b.pay.m}</b> · TX: <b class="text-zinc-200">${b.pay.tx}</b></span><span class="font-display font-bold text-maroon-400">${fmtIDR(b.total)}</span></div></div>
 </div>
 <div class="grid grid-cols-2 gap-2.5">
  ${b.status==='Pending'?`<button onclick="bAct('${b.id}','confirm')" class="btn btn-m btn-sm">${ic('check','w-4 h-4')} Confirm Booking</button>`:''}
  ${b.status==='Confirmed'?`<button onclick="closeModal();startRental('${b.id}')" class="btn btn-m btn-sm">${ic('key','w-4 h-4')} Mulai Sewa</button>`:''}
  ${b.status==='Ongoing'?`<button onclick="closeModal();returnRental('${b.id}')" class="btn btn-m btn-sm">${ic('back','w-4 h-4')} Pengembalian</button>`:''}
  <button onclick="closeModal();bookingForm('${b.id}')" class="btn btn-g btn-sm">${ic('edit','w-4 h-4')} Edit</button>
  <button onclick="openAssignDriver('${b.id}')" class="btn btn-g btn-sm">${ic('wheel','w-4 h-4')} Assign Driver</button>
  <select class="inp !py-2 text-[12px]" onchange="bAct('${b.id}','status',this.value)">${['Pending','Confirmed','Ongoing','Completed','Cancelled','Expired'].map(s=>`<option ${b.status===s?'selected':''}>${s}</option>`).join('')}</select>
  <button onclick="openInvoice('${b.id}')" class="btn btn-g btn-sm">${ic('print','w-4 h-4')} Print Invoice</button>
  ${b.status!=='Cancelled'?`<button onclick="bAct('${b.id}','cancel')" class="btn btn-d btn-sm">${ic('x','w-4 h-4')} Cancel</button>`:''}
  <button onclick="closeModal();delBooking('${b.id}')" class="btn btn-d btn-sm">${ic('trash','w-4 h-4')} Hapus</button>
 </div></div>`,1);}
function bAct(id,act,val){const b=BOOKINGS.find(x=>x.id===id);
 if(act==='confirm'){b.status='Confirmed';if(b.pay.s!=='PAID')b.pay.s='PENDING';toast('Booking '+id+' dikonfirmasi');addLog('Booking '+id+' dikonfirmasi');}
 if(act==='cancel'){b.status='Cancelled';if(b.pay.s==='PAID')b.pay.s='REFUNDED';toast('Booking dibatalkan'+(b.pay.s==='REFUNDED'?' & refund diproses':''),'err');addLog('Booking '+id+' dibatalkan');}
 if(act==='status'){b.status=val;toast('Status diperbarui → '+val);addLog('Booking '+id+' → '+val);}
 persist();closeModal();renderAdminBody();}
function openAssignDriver(id){const b=BOOKINGS.find(x=>x.id===id);
modal(`<div class="p-7"><h3 class="font-display font-semibold text-lg mb-1">Assign Driver</h3><p class="text-[12px] text-muted mb-5">Untuk booking <b class="font-mono text-maroon-400">${id}</b></p>
 <div class="space-y-2.5">${DRIVERS.map(d=>`<button onclick="assignDrv('${id}','${d.id}')" class="w-full card !bg-ink-900 p-4 flex items-center gap-3 hover:border-maroon-500/50 transition text-left ${b.driver===d.id?'!border-maroon-500':''}"><span class="w-10 h-10 rounded-full bg-maroon-500/20 text-maroon-400 grid place-items-center font-bold shrink-0">${d.name[0]}</span><span class="grow min-w-0"><span class="block text-sm font-semibold truncate">${d.name}</span><span class="text-[11px] text-muted">★ ${d.rating} · ${d.trips} perjalanan</span></span>${badge(d.status)}</button>`).join('')}</div></div>`);}
function assignDrv(id,did){const b=BOOKINGS.find(x=>x.id===id);b.driver=did;addLog('Driver '+drv(did).name+' ditugaskan ke '+id);persist();toast('Driver '+drv(did).name+' ditugaskan');closeModal();renderAdminBody();}

function aCalendar(){const y=S.calY,m=S.calM;const dim=new Date(y,m+1,0).getDate();const first=(new Date(y,m,1).getDay()+6)%7;
const names=['JAN','FEB','MAR','APR','MEI','JUN','JUL','AGU','SEP','OKT','NOV','DES'];
let head='';for(let d=1;d<=dim;d++){const wd=(first+d-1)%7;const isT=y===2026&&m===7&&d===13;head+=`<div class="w-9 shrink-0 text-center"><div class="text-[9px] text-muted">${['M','S','S','R','K','J','S'][wd]}</div><div class="text-[11px] font-semibold ${isT?'w-6 h-6 mx-auto rounded-full bg-maroon-600 grid place-items-center text-white':'text-zinc-300'}">${d}</div></div>`;}
const rows=VEHICLES.filter(v=>v.status!=='inactive').map(v=>{
 const bars=BOOKINGS.filter(b=>b.veh===v.id&&['Confirmed','Ongoing','Completed'].includes(b.status)).map(b=>{const s=dP(b.start),e=dP(b.end);if(s>new Date(y,m+1,0)||e<new Date(y,m,1))return '';const sD=s.getFullYear()===y&&s.getMonth()===m?s.getDate():1;const eD=e.getFullYear()===y&&e.getMonth()===m?e.getDate():dim;return `<button onclick="openBookingDetail('${b.id}')" class="gantt-bar absolute top-1/2 -translate-y-1/2 h-7 rounded-md bg-gradient-to-r from-maroon-600 to-maroon-500 border border-maroon-400/40 flex items-center px-1.5 text-[9px] font-bold truncate" style="left:${(sD-1)*36+2}px;width:${Math.max(1,eD-sD+1)*36-4}px" title="${b.id} · ${b.cust} · ${dShort(b.start)}–${dShort(b.end)}">${b.cust.split(' ')[0].toUpperCase()}</button>`;}).join('');
 const maint=v.status==='maintenance'?`<div class="absolute top-1/2 -translate-y-1/2 h-7 rounded-md bg-amber-400/20 border border-amber-400/40 text-[9px] font-bold text-amber-300 flex items-center px-2" style="left:${9*36}px;width:${9*36}px" title="Maintenance s/d 18 Agu">SERVICE</div>`:'';
 return `<div class="flex items-center border-t border-white/5"><div class="w-40 sm:w-44 shrink-0 sticky left-0 bg-ink-800 z-10 px-3 sm:px-4 py-3 flex items-center gap-2.5 border-r border-white/5"><img src="${v.img}" class="w-9 h-7 rounded object-cover shrink-0"><div class="min-w-0"><div class="text-[12px] font-semibold leading-none truncate">${esc(v.name)}</div><div class="text-[9.5px] text-muted mt-0.5 truncate">${v.plate}</div></div></div>
 <div class="relative h-12 shrink-0" style="width:${dim*36}px">${Array.from({length:dim},(_,i)=>`<div class="absolute top-0 bottom-0 w-9 ${ (first+i)%7>4?'bg-white/[.025]':''} ${y===2026&&m===7&&i+1===13?'bg-maroon-500/10':''}" style="left:${i*36}px"></div>`).join('')}${bars}${maint}</div></div>`;}).join('');
return `<div class="space-y-5">
 <div class="rv card p-4 flex flex-wrap items-center gap-3">
  <button onclick="S.calM--;if(S.calM<0){S.calM=11;S.calY--}renderAdminBody()" class="btn btn-g btn-sm">←</button>
  <h3 class="font-display font-bold text-lg w-40 text-center">${names[m]} ${y}</h3>
  <button onclick="S.calM++;if(S.calM>11){S.calM=0;S.calY++}renderAdminBody()" class="btn btn-g btn-sm">→</button>
  <div class="ml-auto flex flex-wrap gap-4 text-[11px] text-muted"><span class="flex items-center gap-1.5"><i class="w-3 h-3 rounded bg-maroon-600 inline-block"></i>Disewa</span><span class="flex items-center gap-1.5"><i class="w-3 h-3 rounded bg-amber-400/40 inline-block"></i>Maintenance</span><span class="flex items-center gap-1.5"><i class="w-3 h-3 rounded bg-maroon-500/20 inline-block"></i>Hari ini</span></div></div>
 <div class="rv card overflow-auto max-h-[62vh]"><div class="flex border-b border-white/10 sticky top-0 bg-ink-800 z-20"><div class="w-40 sm:w-44 shrink-0 px-3 sm:px-4 py-2 text-[10px] font-bold text-muted uppercase tracking-wider border-r border-white/5 bg-ink-800">Kendaraan</div><div class="flex">${head}</div></div>${rows}</div>
 <p class="rv text-[12px] text-muted">Klik bar untuk detail booking · Jadwal pickup & pengembalian tampil sebagai rentang tanggal.</p></div>`;}

/* ================= ARMADA CRUD ================= */
const FAC_OPTS=['AC Double Blower','AC Digital','USB Charging','USB-C Charging','Bluetooth Audio','Dual Airbag','Airbag 6 Titik','Sensor Parkir','Camera 360','Cruise Control','Keyless Start','Captain Seat','Sunroof','Ambient Light','Power Sliding Door','Hybrid Irit','4x4 Ready'];
const PHOTO_OPTS=[['avanza','Avanza'],['innova','Innova'],['brio','Brio'],['xpander','Xpander'],['fortuner','Fortuner'],['alphard','Alphard'],['hrv','HR-V'],['hiace','Hiace'],['fleet','Garasi']];
function vehStats(){return {total:VEHICLES.length,av:VEHICLES.filter(v=>v.status==='available').length,rt:VEHICLES.filter(v=>v.status==='rented').length,mt:VEHICLES.filter(v=>v.status==='maintenance').length};}
function aArmada(){const st=vehStats();
return `<div class="space-y-5">
 <div class="grid grid-cols-2 xl:grid-cols-4 gap-4">
  ${[['car','TOTAL ASET',st.total,''],['check','AVAILABLE',st.av,'text-emerald-300'],['clock','RENTED',st.rt,'text-red-300'],['alert','MAINTENANCE',st.mt,'text-amber-300']].map((x,i)=>`<div class="rv card p-4 flex items-center gap-3" style="transition-delay:${i*60}ms"><span class="w-10 h-10 rounded-xl bg-maroon-500/15 text-maroon-400 grid place-items-center shrink-0">${ic(x[0])}</span><div class="min-w-0"><div class="font-display font-extrabold text-xl ${x[3]}">${x[2]}</div><div class="text-[10px] uppercase tracking-widest text-muted truncate">${x[1]}</div></div></div>`).join('')}
 </div>
 <div class="rv card p-4 flex flex-wrap gap-3 items-center">
  <div class="relative w-full sm:w-56"><span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted">${ic('search','w-4 h-4')}</span>
  <input class="inp pl-9" placeholder="Cari nama / plat…" value="${esc(S._vq)}" oninput="S._vq=this.value;refreshVeh()"></div>
  <select class="inp !w-40" onchange="S._vst=this.value;refreshVeh()"><option value="">Semua Status</option>${['available','rented','maintenance','inactive'].map(s=>`<option ${S._vst===s?'selected':''} value="${s}">${s}</option>`).join('')}</select>
  <select class="inp !w-40" onchange="S._vc=this.value;refreshVeh()"><option value="">Semua Kategori</option>${['City Car','MPV','SUV','Premium','Commercial'].map(s=>`<option ${S._vc===s?'selected':''}>${s}</option>`).join('')}</select>
  <button onclick="vehForm()" class="btn btn-m btn-sm ml-auto">${ic('plus','w-4 h-4')} Tambah Mobil</button>
 </div>
 <div class="rv card overflow-x-auto"><table class="tbl min-w-[960px]"><thead><tr><th>Unit</th><th>Plate</th><th>Kategori</th><th>Tahun</th><th>Harga LK</th><th>Harga +Driver</th><th>Booking</th><th>Status</th><th>Aksi</th></tr></thead><tbody id="vehTbody"></tbody></table></div>
 <div class="rv card p-5"><h3 class="font-display font-semibold mb-4">${ic('file','w-4 h-4 inline mr-2 text-maroon-400')}Log Perubahan Aset</h3>
 <div class="space-y-2 max-h-56 overflow-y-auto">${LOGS.slice(0,12).map(l=>`<div class="flex gap-3 text-[12.5px] bg-ink-900 rounded-lg px-4 py-2.5"><span class="text-muted shrink-0 font-mono text-[11px]">${l.t}</span><span class="min-w-0">${esc(l.txt)}</span></div>`).join('')||'<p class="text-muted text-[13px]">Belum ada aktivitas.</p>'}</div></div>
</div>`;}
function vehRowHtml(v){const cnt=BOOKINGS.filter(b=>b.veh===v.id).length;
return `<tr>
 <td><div class="flex items-center gap-3 min-w-0"><img src="${v.img}" class="w-12 h-9 rounded-lg object-cover shrink-0"><div class="min-w-0"><div class="font-semibold truncate">${esc(v.name)}</div><div class="text-[10.5px] text-muted truncate">${v.brand} ${esc(v.model||'')} · ${v.trans} · ${v.seats} seats</div></div></div></td>
 <td class="font-mono text-[12px] whitespace-nowrap">${v.plate}</td><td>${v.cat}</td><td>${v.year}</td>
 <td class="whitespace-nowrap">${fmtK(v.priceLK)}</td><td class="whitespace-nowrap">${fmtK(v.priceDrv||v.priceLK+150000)}</td>
 <td><span class="text-[12px] text-muted">${cnt}×</span></td>
 <td><select class="inp !w-[130px] !py-1.5 text-[11px]" onchange="setVehStatus('${v.id}',this.value)">${['available','rented','maintenance','inactive'].map(s=>`<option value="${s}" ${v.status===s?'selected':''}>${s}</option>`).join('')}</select></td>
 <td><div class="flex gap-1 whitespace-nowrap">
  <button onclick="vehDetail('${v.id}')" class="p-1.5 text-zinc-400 hover:text-white" title="Lihat">${ic('eye','w-4 h-4')}</button>
  <button onclick="vehForm('${v.id}')" class="p-1.5 text-zinc-400 hover:text-white" title="Edit">${ic('edit','w-4 h-4')}</button>
  <button onclick="dupVeh('${v.id}')" class="p-1.5 text-zinc-400 hover:text-white" title="Duplikat">${ic('copy','w-4 h-4')}</button>
  <button onclick="delVeh('${v.id}')" class="p-1.5 text-red-400/70 hover:text-red-300" title="Hapus">${ic('trash','w-4 h-4')}</button>
 </div></td></tr>`;}
function refreshVeh(){const tb=$('vehTbody');if(!tb)return;
 let list=[...VEHICLES];const q=S._vq.toLowerCase();
 if(q)list=list.filter(v=>(v.name+v.plate+v.brand).toLowerCase().includes(q));
 if(S._vst)list=list.filter(v=>v.status===S._vst);
 if(S._vc)list=list.filter(v=>v.cat===S._vc);
 tb.innerHTML=list.length?list.map(vehRowHtml).join(''):`<tr><td colspan="9" class="text-center py-10 text-muted">Tidak ada aset yang cocok.</td></tr>`;}
function setVehStatus(id,val){const v=veh(id);v.status=val;addLog(`Status aset ${v.name} (${v.plate}) → ${val}`);persist();toast('Status '+v.name+' → '+val);renderAdminBody();}
function vehForm(id){const v=id?veh(id):null;
const f=(k,val,lbl)=>`<div><label class="lbl">${lbl}</label><input id="vf_${k}" class="inp" value="${esc(val??'')}"></div>`;
modal(`<div class="p-7"><div class="flex justify-between items-center mb-5 gap-3"><h3 class="font-display font-semibold text-lg">${v?'Edit Aset':'Tambah Aset Baru'}</h3><button onclick="closeModal()" class="text-muted hover:text-white shrink-0">${ic('x')}</button></div>
 <div class="grid sm:grid-cols-2 gap-4">
  <div class="sm:col-span-2"><label class="lbl">Nama Mobil *</label><input id="vf_nama" class="inp" value="${esc(v?v.name:'')}" placeholder="Contoh: Toyota Avanza 1.5 G"></div>
  ${f('brand',v?v.brand:'Toyota','Brand')}${f('model',v?v.model:'Avanza','Model')}
  <div><label class="lbl">Tahun</label><input id="vf_tahun" type="number" class="inp" value="${v?v.year:2024}"></div>
  ${f('plate',v?v.plate:'B 1000 AZD','Nomor Polisi')}
  <div><label class="lbl">Transmisi</label><select id="vf_trans" class="inp"><option ${v&&v.trans==='Automatic'?'selected':''}>Automatic</option><option ${v&&v.trans==='Manual'?'selected':''}>Manual</option></select></div>
  <div><label class="lbl">Kapasitas (seats)</label><input id="vf_seats" type="number" class="inp" value="${v?v.seats:7}"></div>
  ${f('warna',v?v.color:'Black','Warna')}
  <div><label class="lbl">Bahan Bakar</label><select id="vf_fuel" class="inp">${['Bensin','Diesel','Hybrid','Listrik'].map(x=>`<option ${v&&v.fuel===x?'selected':''}>${x}</option>`).join('')}</select></div>
  <div><label class="lbl">Kategori</label><select id="vf_cat" class="inp">${['City Car','MPV','SUV','Premium','Commercial'].map(x=>`<option ${v&&v.cat===x?'selected':''}>${x}</option>`).join('')}</select></div>
  <div><label class="lbl">Harga Lepas Kunci (Rp/hari) *</label><input id="vf_harga" type="number" class="inp" value="${v?v.priceLK:400000}"></div>
  <div><label class="lbl">Harga Dengan Driver (Rp/hari)</label><input id="vf_hargadrv" type="number" class="inp" value="${v?(v.priceDrv||v.priceLK+150000):450000}"><p class="text-[10px] text-muted mt-1">Umumnya harga LK + Rp150.000</p></div>
  <div class="sm:col-span-2"><label class="lbl">Foto Unit — pilih dari galeri</label>
   <div class="flex gap-2 flex-wrap">${PHOTO_OPTS.map(p=>`<button type="button" onclick="document.querySelectorAll('.ph-opt').forEach(x=>x.classList.remove('on'));this.classList.add('on')" data-img="${IMG[p[0]]}" class="ph-opt rounded-lg overflow-hidden w-16 h-12 ${(v?v.img:IMG.avanza)===IMG[p[0]]?'on':''}"><img src="${IMG[p[0]]}" class="w-full h-full object-cover"></button>`).join('')}</div></div>
  <div class="sm:col-span-2"><label class="lbl">Fasilitas</label>
   <div class="flex flex-wrap gap-2">${FAC_OPTS.map(x=>`<label class="chip cursor-pointer ${v&&v.feats&&v.feats.includes(x)?'on':''}"><input type="checkbox" class="hidden fac-chk" value="${x}" ${v&&v.feats&&v.feats.includes(x)?'checked':''} onchange="this.parentElement.classList.toggle('on')">${x}</label>`).join('')}</div></div>
  <div class="sm:col-span-2"><label class="lbl">Deskripsi</label><textarea id="vf_desc" class="inp" rows="2" placeholder="Deskripsi singkat unit untuk halaman detail…">${esc(v?v.desc:'')}</textarea></div>
  <div><label class="lbl">Status</label><select id="vf_status" class="inp">${['available','rented','maintenance','inactive'].map(s=>`<option value="${s}" ${v&&v.status===s?'selected':''}>${s}</option>`).join('')}</select></div>
 </div>
 <button onclick="saveVeh('${id||''}')" class="btn btn-m w-full mt-6">${ic('check','w-4 h-4')} Simpan Aset</button></div>`,1);}
function saveVeh(id){const g=k=>{const e=$('vf_'+k);return e?e.value.trim():''};
 const nama=g('nama'),harga=+($('vf_harga')?$('vf_harga').value:0);
 if(!nama||!harga){toast('Nama mobil & harga wajib diisi','err');return;}
 const feats=Array.from(document.querySelectorAll('.fac-chk:checked')).map(x=>x.value);
 const imgSel=document.querySelector('.ph-opt.on');const img=imgSel?imgSel.dataset.img:IMG.avanza;
 const data={name:nama,brand:g('brand'),model:g('model'),year:+g('tahun')||2024,plate:g('plate'),trans:$('vf_trans').value,seats:+$('vf_seats').value||7,color:g('warna'),fuel:$('vf_fuel').value,cat:$('vf_cat').value,priceLK:harga,priceDrv:+($('vf_hargadrv').value)||harga+150000,feats,desc:g('desc'),status:$('vf_status').value,img};
 if(id){const v=veh(id);const oldPlate=v.plate;Object.assign(v,data);if(!v.plate)v.plate=oldPlate;addLog(`Aset diperbarui: ${v.name} (${v.plate})`);toast('Perubahan aset tersimpan');}
 else{const nid='v'+Date.now();VEHICLES.push(Object.assign({id:nid,doors:5,bag:'2 Koper'},data));addLog(`Aset baru ditambahkan: ${data.name}`);toast('Aset baru berhasil ditambahkan');}
 persist();closeModal();renderAdminBody();}
function vehDetail(id){const v=veh(id);const hist=BOOKINGS.filter(b=>b.veh===id);
 const rev=hist.filter(b=>b.pay.s==='PAID').reduce((a,b)=>a+b.total,0);
modal(`<div class="p-7">
 <div class="flex justify-between items-start gap-3 mb-5"><div class="min-w-0"><h3 class="font-display font-bold text-xl truncate">${esc(v.name)}</h3><p class="text-[12.5px] text-muted mt-1">${v.brand} ${esc(v.model||'')} · ${v.year} · ${v.plate} · ${v.color}</p><div class="mt-2">${badge(v.status)}</div></div>
 <button onclick="closeModal()" class="text-muted hover:text-white shrink-0">${ic('x')}</button></div>
 <div class="grid sm:grid-cols-[200px_1fr] gap-5">
  <img src="${v.img}" class="rounded-xl object-cover h-32 sm:h-full w-full border border-white/10">
  <div class="min-w-0">
   <div class="grid grid-cols-2 gap-2.5 text-[12.5px] mb-4">
    ${[['Transmisi',v.trans],['Kapasitas',v.seats+' seats'],['Bahan Bakar',v.fuel],['Pintu',v.doors],['Bagasi',v.bag],['Kategori',v.cat]].map(x=>`<div class="bg-ink-900 rounded-lg px-3 py-2 border border-white/5"><span class="text-[9.5px] uppercase tracking-wider text-muted block">${x[0]}</span>${x[1]}</div>`).join('')}
   </div>
   <div class="grid grid-cols-2 gap-2.5 text-center mb-4">
    <div class="rounded-lg border border-white/10 p-3"><div class="text-[9.5px] uppercase tracking-widest text-muted">Lepas Kunci</div><div class="font-display font-bold text-maroon-400">${fmtIDR(v.priceLK)}</div></div>
    <div class="rounded-lg border border-maroon-500/40 bg-maroon-500/10 p-3"><div class="text-[9.5px] uppercase tracking-widest text-red-200">Dengan Driver</div><div class="font-display font-bold">${fmtIDR(v.priceDrv||v.priceLK+150000)}</div></div>
   </div>
   <div class="flex flex-wrap gap-1.5 mb-1">${(v.feats||[]).map(x=>`<span class="badge bg-white/5 border-white/10 text-zinc-300">${x}</span>`).join('')}</div>
  </div></div>
 <div class="grid grid-cols-3 gap-3 mt-5 text-center">
  ${[['Total Booking',hist.length],['Revenue Unit',fmtK(rev)],['Utilisasi',Math.min(99,Math.round(hist.length*9+rev/3e5))+'%']].map(x=>`<div class="card !bg-ink-900 p-3 min-w-0"><div class="font-display font-bold text-maroon-400 truncate">${x[1]}</div><div class="text-[9.5px] uppercase tracking-wider text-muted mt-1">${x[0]}</div></div>`).join('')}
 </div>
 <h4 class="lbl mt-5">Riwayat Booking Unit Ini</h4>
 <div class="max-h-40 overflow-y-auto space-y-2">${hist.length?hist.slice().reverse().map(b=>`<div class="flex items-center justify-between gap-2 text-[12px] bg-ink-900 rounded-lg px-3.5 py-2"><span class="font-mono text-maroon-400 shrink-0">${b.id.slice(-9)}</span><span class="text-muted truncate">${esc(b.cust)} · ${dShort(b.start)}</span>${badge(b.status)}</div>`).join(''):'<p class="text-[12.5px] text-muted">Belum ada booking untuk unit ini.</p>'}</div>
 <div class="grid grid-cols-2 gap-2.5 mt-5">
  <button onclick="closeModal();vehForm('${v.id}')" class="btn btn-g btn-sm">${ic('edit','w-4 h-4')} Edit Aset</button>
  <button onclick="closeModal();delVeh('${v.id}')" class="btn btn-d btn-sm">${ic('trash','w-4 h-4')} Hapus Aset</button>
 </div></div>`,1);}
function dupVeh(id){const v=veh(id);const cp=JSON.parse(JSON.stringify(v));cp.id='v'+Date.now();cp.name=v.name+' (Copy)';cp.plate='';cp.status='inactive';VEHICLES.push(cp);addLog(`Aset diduplikasi: ${v.name} → ${cp.name}`);persist();toast('Aset diduplikasi (status inactive)');renderAdminBody();}
function delVeh(id){const v=veh(id);const act=BOOKINGS.filter(b=>b.veh===id&&['Pending','Confirmed','Ongoing'].includes(b.status)).length;
modal(`<div class="p-7 text-center">
 <span class="w-14 h-14 mx-auto rounded-full bg-red-500/15 border border-red-500/40 text-red-300 grid place-items-center mb-4">${ic('alert')}</span>
 <h3 class="font-display font-bold text-lg">Hapus Aset?</h3>
 <p class="text-[13.5px] text-muted mt-2">${esc(v.name)} · ${v.plate}</p>
 ${act?`<div class="mt-4 rounded-lg border border-amber-400/40 bg-amber-400/10 text-amber-300 text-[12.5px] px-4 py-3">⚠ Unit memiliki <b>${act} booking aktif</b>. Hapus permanen diblokir — gunakan Nonaktifkan.</div>`:`<p class="text-[12.5px] text-muted mt-3">Tindakan ini permanen dan tercatat di log perubahan.</p>`}
 <div class="grid grid-cols-2 gap-2.5 mt-6">
  <button onclick="closeModal()" class="btn btn-g btn-sm">Batal</button>
  <button onclick="softDel('${v.id}')" class="btn btn-g btn-sm">Nonaktifkan</button>
  <button onclick="hardDel('${v.id}')" class="btn btn-d btn-sm col-span-2 ${act?'opacity-40 pointer-events-none':''}">${ic('trash','w-4 h-4')} Hapus Permanen</button>
 </div></div>`);}
function softDel(id){const v=veh(id);v.status='inactive';addLog(`Aset dinonaktifkan: ${v.name}`);persist();closeModal();toast('Aset dinonaktifkan','info');renderAdminBody();}
function hardDel(id){const v=veh(id);VEHICLES=VEHICLES.filter(x=>x.id!==id);addLog(`Aset dihapus permanen: ${v.name} (${v.plate})`);persist();closeModal();toast('Aset dihapus permanen','err');renderAdminBody();}

/* ================= CUSTOMER / DRIVER / PAYMENT / PROMO / REPORTS / CMS / USERS / SETTINGS ================= */
function aCustomers(){return `<div class="rv card overflow-x-auto"><table class="tbl min-w-[860px]"><thead><tr><th>ID</th><th>Nama</th><th>Kontak</th><th>Total Booking</th><th>Total Spending</th><th>Last Rental</th><th>Status</th><th></th></tr></thead><tbody>
 ${CUSTOMERS.map(c=>`<tr class="cursor-pointer" onclick="custDetail('${c.id}')"><td class="font-mono text-[11px] text-muted whitespace-nowrap">${c.id}</td><td class="font-semibold whitespace-nowrap">${esc(c.name)}</td><td class="text-muted whitespace-nowrap">${c.wa}</td><td>${c.total}</td><td class="font-semibold text-maroon-400 whitespace-nowrap">${fmtK(c.spend)}</td><td class="text-muted whitespace-nowrap">${esc(c.last)}</td><td>${badge(c.status)}</td><td class="text-muted">${ic('chevR','w-4 h-4')}</td></tr>`).join('')}
 </tbody></table></div>
 <div class="rv card p-5 mt-5"><h3 class="font-display font-semibold mb-3">Akun Penyewa Terdaftar (${ACCOUNTS.length})</h3>
 <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">${ACCOUNTS.map(a=>`<div class="bg-ink-900 rounded-xl px-4 py-3 border border-white/5 flex items-center gap-3 min-w-0"><span class="w-9 h-9 rounded-full bg-maroon-500/20 text-maroon-400 grid place-items-center font-bold shrink-0">${esc(a.nama[0])}</span><div class="min-w-0"><div class="text-[13px] font-semibold truncate">${esc(a.nama)}</div><div class="text-[11px] text-muted truncate">${a.email} · sejak ${dShort(a.joined)} ${a.joined.slice(0,4)}</div></div></div>`).join('')}</div></div>`;}
function custDetail(id){const c=CUSTOMERS.find(x=>x.id===id);const hist=BOOKINGS.filter(b=>b.cust===c.name);
modal(`<div class="p-7"><div class="flex items-start gap-4 mb-6"><span class="w-14 h-14 rounded-2xl bg-maroon-600 grid place-items-center font-display font-extrabold text-xl shrink-0">${c.name[0]}</span>
 <div class="grow min-w-0"><h3 class="font-display font-bold text-xl truncate">${c.name}</h3><p class="text-[12.5px] text-muted break-words">${c.wa} · ${c.email||'-'} · ${c.addr||'-'}</p><div class="mt-2">${badge(c.status)}</div></div>
 <button onclick="closeModal()" class="text-muted hover:text-white shrink-0">${ic('x')}</button></div>
 <div class="grid grid-cols-3 gap-3 mb-6 text-center">${[['Total Booking',c.total],['Total Spending',fmtK(c.spend)],['Last Rental',esc(c.last)]].map(x=>`<div class="card !bg-ink-900 p-4 min-w-0"><div class="font-display font-bold text-maroon-400 truncate">${x[1]}</div><div class="text-[10px] uppercase tracking-wider text-muted mt-1">${x[0]}</div></div>`).join('')}</div>
 <h4 class="lbl">Booking History</h4>
 ${hist.length?hist.map(b=>`<div class="flex justify-between items-center gap-2 text-[12.5px] bg-ink-900 rounded-lg px-4 py-2.5 mb-2"><span class="font-mono text-maroon-400 shrink-0">${b.id.slice(-9)}</span><span class="text-muted truncate">${esc((veh(b.veh)||{name:'—'}).name)} · ${dShort(b.start)}</span>${badge(b.status)}</div>`).join(''):'<p class="text-[12.5px] text-muted">Belum ada booking tercatat.</p>'}
 <a href="${waLink('Halo '+c.name+', terima kasih telah menjadi pelanggan AZZID RENTCAR.')}" target="_blank" class="btn btn-m btn-sm w-full mt-4">Hubungi via WhatsApp</a></div>`,1);}

function aDrivers(){return `<div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">${DRIVERS.map((d,i)=>`<div class="rv card p-6" style="transition-delay:${i*70}ms">
 <div class="flex items-center gap-4 mb-4"><span class="w-14 h-14 rounded-2xl bg-gradient-to-br from-maroon-500 to-maroon-800 grid place-items-center font-display font-extrabold text-xl shrink-0">${d.name[0]}</span>
 <div class="min-w-0"><h3 class="font-display font-semibold truncate">${d.name}</h3><div class="flex items-center gap-1 text-[12px] text-amber-300">${starIc(1)} ${d.rating} · ${d.trips} perjalanan</div></div></div>
 <div class="text-[12px] text-muted space-y-1 mb-4"><p>${ic('phone','w-3.5 h-3.5 inline mr-1')}${d.wa}</p><p>${ic('card','w-3.5 h-3.5 inline mr-1')}${d.sim}</p></div>
 <div class="flex gap-2 items-center"><select class="inp !py-1.5 text-[12px]" onchange="setDrvStatus('${d.id}',this.value)">${['Available','Assigned','On Trip','Off Duty'].map(s=>`<option ${d.status===s?'selected':''}>${s}</option>`).join('')}</select>${badge(d.status)}</div></div>`).join('')}
</div>`;}
function setDrvStatus(id,val){drv(id).status=val;persist();toast('Status '+drv(id).name+' → '+val);renderAdminBody();}

function aPayments(){const paid=BOOKINGS.filter(b=>b.pay.s==='PAID').reduce((a,b)=>a+b.total,0);const pend=BOOKINGS.filter(b=>b.pay.s==='PENDING').reduce((a,b)=>a+b.total,0);const ref=BOOKINGS.filter(b=>b.pay.s==='REFUNDED').reduce((a,b)=>a+b.total,0);const tot=paid+pend+ref;
return `<div class="space-y-5">
 <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
 ${[['card','TOTAL PAYMENT',fmtIDR(tot),''],['check','PAID',fmtIDR(paid),'text-emerald-300'],['clock','PENDING',fmtIDR(pend),'text-amber-300'],['logout','REFUND',fmtIDR(ref),'text-violet-300']].map((x,i)=>`<div class="rv card p-5" style="transition-delay:${i*70}ms"><div class="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted mb-2">${ic(x[0],'w-4 h-4 text-maroon-400')}${x[1]}</div><div class="font-display font-extrabold text-lg sm:text-xl ${x[3]} break-all">${x[2]}</div></div>`).join('')}</div>
 <div class="rv card overflow-x-auto"><table class="tbl min-w-[820px]"><thead><tr><th>Transaction</th><th>Booking</th><th>Customer</th><th>Amount</th><th>Method</th><th>Status</th><th>Aksi</th></tr></thead><tbody>
 ${[...BOOKINGS].reverse().map(b=>`<tr><td class="font-mono text-[12px] whitespace-nowrap">${b.pay.tx}</td><td class="font-mono text-maroon-400 text-[12px] whitespace-nowrap">${b.id.slice(-9)}</td><td class="whitespace-nowrap">${esc(b.cust)}</td><td class="font-semibold whitespace-nowrap">${fmtK(b.total)}</td><td class="whitespace-nowrap">${b.pay.m}</td><td>${badge(b.pay.s)}</td>
 <td>${['PENDING','UNPAID'].includes(b.pay.s)?`<button onclick="markPaid('${b.id}')" class="btn btn-m btn-sm !py-1">Tandai Lunas</button>`:'<span class="text-muted text-[11px] whitespace-nowrap">'+(b.pay.at||'—')+'</span>'}</td></tr>`).join('')}
 </tbody></table></div></div>`;}
function markPaid(id){const b=BOOKINGS.find(x=>x.id===id);b.pay.s='PAID';b.pay.at=TODAY;if(b.status==='Pending')b.status='Confirmed';addLog(`Pembayaran ${id} diverifikasi lunas (${fmtK(b.total)})`);persist();toast('Pembayaran '+id+' lunas · '+fmtIDR(b.total));renderAdminBody();}

function aPromo(){return `<div class="space-y-5">
 <div class="rv card p-4 flex justify-end"><button onclick="promoForm()" class="btn btn-m btn-sm">${ic('plus','w-4 h-4')} Buat Promo</button></div>
 <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-5">${PROMOS.map((p,i)=>`<div class="rv card p-6 ${p.status!=='Active'?'opacity-60':''}" style="transition-delay:${i*70}ms">
 <div class="flex justify-between items-start gap-2 mb-4"><span class="font-mono font-bold text-lg text-maroon-400 border border-dashed border-maroon-500/50 rounded-lg px-3 py-1 break-all">${p.code}</span>${badge(p.status==='Active'?'Active':'Expired')}</div>
 <div class="text-[12.5px] text-muted space-y-1.5"><p>${p.type==='percent'?'Diskon '+p.value+'% (maks '+fmtK(p.cap)+')':'Potongan '+fmtK(p.value)}</p><p>Min. rental ${p.minDays} hari</p><p>${dShort(p.start)} – ${dShort(p.end)} ${p.end.slice(0,4)}</p></div>
 <button onclick="togglePromo('${p.id}')" class="btn btn-g btn-sm mt-4 w-full">${p.status==='Active'?'Nonaktifkan':'Aktifkan'}</button></div>`).join('')}
 </div></div>`;}
function togglePromo(id){const p=PROMOS.find(x=>x.id===id);p.status=p.status==='Active'?'Expired':'Active';addLog('Promo '+p.code+' → '+p.status);persist();toast('Promo '+p.code+' → '+p.status);renderAdminBody();}
function promoForm(){modal(`<div class="p-7"><h3 class="font-display font-semibold text-lg mb-5">Buat Promo Baru</h3>
 <div class="grid sm:grid-cols-2 gap-4"><div><label class="lbl">Promo Name</label><input id="pf0" class="inp uppercase" placeholder="MERDEKA2026"></div><div><label class="lbl">Tipe</label><select id="pf1" class="inp"><option value="percent">Percent %</option><option value="flat">Flat Rp</option></select></div>
 <div><label class="lbl">Discount Value</label><input id="pf2" class="inp" type="number" value="10"></div><div><label class="lbl">Maximum Discount</label><input id="pf3" class="inp" type="number" value="100000"></div>
 <div><label class="lbl">Minimum Rental (hari)</label><input id="pf4" class="inp" type="number" value="2"></div><div><label class="lbl">Status</label><select id="pf5" class="inp"><option>Active</option><option>Expired</option></select></div>
 <div><label class="lbl">Start Date</label><input id="pf6" type="date" class="inp" value="2026-08-13"></div><div><label class="lbl">End Date</label><input id="pf7" type="date" class="inp" value="2026-09-30"></div></div>
 <button onclick="savePromo()" class="btn btn-m w-full mt-5">Simpan Promo</button></div>`);}
function savePromo(){const code=$('pf0').value.trim().toUpperCase();if(!code){toast('Nama promo wajib diisi','err');return;}
 PROMOS.push({id:'P-'+Date.now(),code,type:$('pf1').value,value:+$('pf2').value,cap:+$('pf3').value,minDays:+$('pf4').value,status:$('pf5').value,start:$('pf6').value,end:$('pf7').value});
 addLog('Promo baru dibuat: '+code);persist();closeModal();toast('Promo dibuat');renderAdminBody();}

function aReports(){const t=S.repTab;
const tabs=[['rev','Revenue Report'],['ren','Rental Report'],['cus','Customer Report'],['fin','Financial']];
let body='';
if(t==='rev'){const rows=[['Februari 2026',38500000],['Maret 2026',41200000],['April 2026',39800000],['Mei 2026',44600000],['Juni 2026',46900000],['Juli 2026',51300000],['Agustus 2026 (berjalan)',24800000]];
 body=`<div class="card p-6 min-w-0">${areaChart(revSeries(30))}</div><div class="card overflow-x-auto mt-5"><table class="tbl"><thead><tr><th>Periode</th><th>Pendapatan</th><th>Trend</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r[0]}</td><td class="font-semibold text-maroon-400 whitespace-nowrap">${fmtIDR(r[1])}</td><td class="text-emerald-300">↑</td></tr>`).join('')}</tbody></table></div><button onclick="exportCSV(${JSON.stringify(rows).replace(/"/g,'&quot;')})" class="btn btn-g btn-sm mt-4">${ic('dl','w-4 h-4')} Export CSV</button>`;}
if(t==='ren'){const util=VEHICLES.map(v=>({n:v.name,u:v.status==='inactive'?18:55+Math.floor(rnd(v.name.length*7)*40)}));
 body=`<div class="card p-6 min-w-0"><h4 class="font-display font-semibold mb-5">Utilisasi Kendaraan (Agustus)</h4><div class="space-y-4">${util.map(u=>`<div><div class="flex justify-between text-[12px] mb-1.5 gap-3"><span class="truncate">${u.n}</span><b class="text-maroon-400 shrink-0">${u.u}%</b></div><div class="h-2.5 rounded-full bg-white/5"><div class="h-full rounded-full bg-gradient-to-r from-maroon-800 to-maroon-400" style="width:${u.u}%"></div></div></div>`).join('')}</div></div>
 <div class="card p-6 mt-5 min-w-0"><h4 class="font-display font-semibold mb-4">Mobil Paling Sering Disewa</h4><div class="space-y-2">${[['Toyota Avanza',42],['Honda Brio RS',35],['Toyota Innova Zenix',31],['Mitsubishi Xpander',27],['Toyota Fortuner',19]].map((x,i)=>`<div class="flex items-center gap-3 text-[13px] bg-ink-900 rounded-lg px-4 py-2.5"><span class="font-display font-bold text-maroon-400 w-6 shrink-0">#${i+1}</span><span class="grow truncate">${x[0]}</span><b class="shrink-0">${x[1]} rental</b></div>`).join('')}</div></div>`;}
if(t==='cus'){body=`<div class="grid sm:grid-cols-3 gap-4 mb-5">${[['Customer Baru (30 hari)','18'],['Repeat Customer','64%'],['Akun Penyewa',ACCOUNTS.length]].map((x,i)=>`<div class="card p-5 min-w-0"><div class="text-[10px] uppercase tracking-widest text-muted mb-2">${x[0]}</div><div class="font-display font-bold text-lg text-maroon-400 truncate">${x[1]}</div></div>`).join('')}</div>
 <div class="card overflow-x-auto"><table class="tbl"><thead><tr><th>Customer</th><th>Total Booking</th><th>Total Spending</th></tr></thead><tbody>${[...CUSTOMERS].sort((a,b)=>b.spend-a.spend).slice(0,6).map(c=>`<tr><td>${esc(c.name)}</td><td>${c.total}</td><td class="font-semibold text-maroon-400 whitespace-nowrap">${fmtIDR(c.spend)}</td></tr>`).join('')}</tbody></table></div>`;}
if(t==='fin'){const rev=48500000,disc=850000,ref=1300000;
 body=`<div class="grid grid-cols-2 xl:grid-cols-4 gap-4">${[['Revenue',fmtIDR(rev),'text-emerald-300'],['Discount',fmtIDR(disc),'text-amber-300'],['Refund',fmtIDR(ref),'text-red-300'],['Net Revenue',fmtIDR(rev-disc-ref),'text-maroon-400']].map(x=>`<div class="card p-5 min-w-0"><div class="text-[10px] uppercase tracking-widest text-muted mb-2">${x[0]}</div><div class="font-display font-extrabold text-base sm:text-xl ${x[2]} break-all">${x[1]}</div></div>`).join('')}</div>
 <div class="flex flex-wrap gap-3 mt-5">${['Excel','CSV','PDF'].map(f=>`<button onclick="toast('Laporan ${f} diunduh','info')" class="btn btn-g btn-sm">${ic('dl','w-4 h-4')} Export ${f}</button>`).join('')}</div>`;}
return `<div class="space-y-5"><div class="rv flex flex-wrap gap-2">${tabs.map(x=>`<button onclick="S.repTab='${x[0]}';renderAdminBody()" class="chip ${t===x[0]?'on':''}">${x[1]}</button>`).join('')}</div><div class="rv min-w-0">${body}</div></div>`;}
function exportCSV(rows){let csv='Periode;Pendapatan\n'+rows.map(r=>r[0]+';'+r[1]).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='azzid-revenue.csv';a.click();toast('CSV diunduh','info');}

function aCms(){return `<div class="max-w-3xl space-y-5">
 <div class="rv card p-6"><h3 class="font-display font-semibold mb-4">${ic('globe','w-4 h-4 inline mr-2 text-maroon-400')}Konten Homepage</h3>
 <div class="space-y-4"><div><label class="lbl">Headline Baris 1</label><input id="cm0" class="inp" value="${esc(S.cms.head1)}"></div>
 <div><label class="lbl">Headline Baris 2</label><input id="cm1" class="inp" value="${esc(S.cms.head2)}"></div>
 <div><label class="lbl">Subheadline</label><textarea id="cm2" class="inp" rows="3">${esc(S.cms.sub)}</textarea></div>
 <div><label class="lbl">Announcement Bar</label><input id="cm3" class="inp" value="${esc(S.cms.ann)}"></div>
 <div><label class="lbl">Nomor WhatsApp</label><input id="cm4" class="inp" value="${S.cms.wa}"></div>
 <button onclick="saveCms()" class="btn btn-m">${ic('check','w-4 h-4')} Simpan & Terapkan ke Website</button></div></div>
 <div class="rv card p-6"><h3 class="font-display font-semibold mb-3">Kelola Konten Lain</h3>
 <div class="grid sm:grid-cols-2 gap-2.5">${['Banner Promo','Armada Unggulan','Tentang Kami','Layanan','FAQ','Testimonial','Footer','Kontak'].map(x=>`<button onclick="toast('Editor ${x} dibuka (demo)','info')" class="card !bg-ink-900 p-4 text-left text-[13px] font-semibold hover:border-maroon-500/40 transition flex justify-between items-center gap-2">${x}${ic('edit','w-4 h-4 text-muted shrink-0')}</button>`).join('')}</div></div></div>`;}
function saveCms(){S.cms.head1=$('cm0').value;S.cms.head2=$('cm1').value;S.cms.sub=$('cm2').value;S.cms.ann=$('cm3').value;S.cms.wa=$('cm4').value;persist();applyCms();addLog('Konten CMS diperbarui');toast('Perubahan CMS diterapkan ke website!');}
function applyCms(){
 const promoText='🇮🇩 Promo MERDEKA2026 — Diskon 10% untuk rental minimal 2 hari · Berlaku s/d 31 Agustus 2026';
 const annBar=$('annBar');
 annBar.innerHTML='';
 for(let i=0;i<3;i++){
  const span=document.createElement('span');
  span.textContent=promoText;
  annBar.appendChild(span);
 }
 const wl=waLink('Halo AZZID RENTCAR, saya ingin bertanya.');$('waFloat').href=wl;$('footWa').href=wl;
}

function aUsers(){return `<div class="space-y-6">
 <div class="rv card overflow-x-auto"><table class="tbl min-w-[680px]"><thead><tr><th>Nama</th><th>Email</th><th>Role</th><th>Status</th></tr></thead><tbody>
 ${USERS.map(u=>`<tr><td class="font-semibold whitespace-nowrap">${u.n}</td><td class="text-muted whitespace-nowrap">${u.e}</td><td><select class="inp !w-36 !py-1.5 text-[12px]" onchange="toast('Role ${u.n} → '+this.value,'info')">${['Super Admin','Admin','Staff','Finance','Driver'].map(r=>`<option ${u.r===r?'selected':''}>${r}</option>`).join('')}</select></td><td><span class="badge bg-emerald-400/10 border-emerald-400/30 text-emerald-300">Active</span></td></tr>`).join('')}
 </tbody></table></div>
 <div class="rv card p-6 overflow-x-auto"><h3 class="font-display font-semibold mb-4">Role Permission Matrix</h3>
 <table class="tbl min-w-[680px]"><thead><tr><th>Modul</th><th>Super Admin</th><th>Admin</th><th>Staff</th><th>Finance</th><th>Driver</th></tr></thead><tbody>
 ${[['Kelola Sewa Mobil','✓','✓','✓','✓','◐'],['Booking (CRUD)','✓','✓','✓','—','◐'],['Armada (CRUD)','✓','✓','—','—','—'],['Customer','✓','✓','✓','—','—'],['Payment & Revenue','✓','✓','—','✓','—'],['Reports','✓','—','—','✓','—'],['CMS & Settings','✓','—','—','—','—']].map(r=>`<tr><td class="font-semibold whitespace-nowrap">${r[0]}</td>${r.slice(1).map(c=>`<td class="${c==='✓'?'text-emerald-300':c==='◐'?'text-amber-300':'text-zinc-600'} text-lg">${c}</td>`).join('')}</tr>`).join('')}
 </tbody></table></div></div>`;}

function aSettings(){return `<div class="max-w-3xl space-y-5">
 <div class="rv card p-6"><h3 class="font-display font-semibold mb-4">Informasi Bisnis</h3>
 <div class="grid sm:grid-cols-2 gap-4"><div><label class="lbl">Nama Bisnis</label><input class="inp" value="AZZID RENTCAR"></div><div><label class="lbl">Email</label><input class="inp" value="halo@azzidrentcar.id"></div><div class="sm:col-span-2"><label class="lbl">Alamat</label><input class="inp" value="Jl. Raya Kemang No. 88, Jakarta Selatan"></div></div></div>
 <div class="rv card p-6"><h3 class="font-display font-semibold mb-4">Metode Pembayaran Aktif</h3>
 <div class="flex flex-wrap gap-2.5">${['QRIS','VA BCA','VA Mandiri','GoPay','OVO','Transfer Bank'].map((m,i)=>`<label class="chip cursor-pointer ${i<5?'on':''}"><input type="checkbox" class="hidden" ${i<5?'checked':''} onchange="this.parentElement.classList.toggle('on')">${m}</label>`).join('')}</div></div>
 <div class="rv card p-6"><h3 class="font-display font-semibold mb-4">Notifikasi</h3>
 <div class="space-y-3">${['Booking baru','Pembayaran berhasil / gagal','Booking dibatalkan','Jadwal rental akan dimulai','Jadwal pengembalian','Mobil masuk maintenance'].map((n,i)=>`<label class="flex items-center justify-between gap-3 text-[13.5px] cursor-pointer"><span>${n}</span><input type="checkbox" class="accent-[#991B1B] w-4 h-4 shrink-0" ${i<4?'checked':''}></label>`).join('')}</div></div>
 <div class="rv card p-6 border-red-500/20"><h3 class="font-display font-semibold mb-2 text-red-300">Zona Pemeliharaan Data</h3>
 <p class="text-[12.5px] text-muted mb-4">Kembalikan seluruh data (armada, sewa, booking, customer, akun, promo) ke kondisi demo awal. Data yang tersimpan di browser akan dihapus.</p>
 <button onclick="resetDemo()" class="btn btn-d btn-sm">${ic('alert','w-4 h-4')} Reset Data Demo</button></div>
 <button onclick="toast('Pengaturan tersimpan')" class="btn btn-m">${ic('check','w-4 h-4')} Simpan Pengaturan</button></div>`;}

/* ================= INVOICE ================= */
function openInvoice(id){const b=BOOKINGS.find(x=>x.id===id);const v=veh(b.veh)||{name:'—'};
$('printSheet').innerHTML=`<div style="font-family:Arial,sans-serif;color:#111;max-width:700px;margin:0 auto;padding:32px">
 <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #7F1D1D;padding-bottom:16px;gap:12px">
 <div><div style="font-size:22px;font-weight:800;color:#7F1D1D">AZZID RENTCAR</div><div style="font-size:11px;color:#555">Jl. Raya Kemang No. 88, Jakarta Selatan · +62 812-3456-7890 · halo@azzidrentcar.id</div></div>
 <div style="text-align:right"><div style="font-size:16px;font-weight:700">INVOICE</div><div style="font-size:12px">${b.id}</div><div style="font-size:11px;color:#555">Tanggal: ${dLong(b.pay.at||TODAY)}</div></div></div>
 <table style="width:100%;margin-top:20px;font-size:13px"><tr><td style="vertical-align:top"><b>Tagihan Kepada</b><br>${esc(b.cust)}<br><span style="color:#555">${esc(b.pickup)}</span></td>
 <td style="vertical-align:top;text-align:right"><b>Detail Rental</b><br>${dLong(b.start)} – ${dLong(b.end)}<br><span style="color:#555">${daysDiff(b.start,b.end)} hari · ${b.type}</span></td></tr></table>
 <table style="width:100%;margin-top:24px;border-collapse:collapse;font-size:13px">
 <tr style="background:#7F1D1D;color:#fff"><th style="text-align:left;padding:8px">Deskripsi</th><th style="text-align:right;padding:8px">Jumlah</th></tr>
 <tr style="border-bottom:1px solid #ddd"><td style="padding:8px">Rental ${esc(v.name)} — ${daysDiff(b.start,b.end)} hari</td><td style="text-align:right;padding:8px">${fmtIDR(b.sub)}</td></tr>
 ${b.drv?`<tr style="border-bottom:1px solid #ddd"><td style="padding:8px">Layanan Driver profesional</td><td style="text-align:right;padding:8px">${fmtIDR(b.drv)}</td></tr>`:''}
 ${b.disc?`<tr style="border-bottom:1px solid #ddd"><td style="padding:8px">Diskon promo</td><td style="text-align:right;padding:8px">−${fmtIDR(b.disc)}</td></tr>`:''}
 <tr><td style="padding:10px 8px;font-weight:800;font-size:15px">TOTAL</td><td style="text-align:right;padding:10px 8px;font-weight:800;font-size:15px;color:#7F1D1D">${fmtIDR(b.total)}</td></tr></table>
 <p style="margin-top:14px;font-size:12px">Status Pembayaran: <b style="color:${b.pay.s==='PAID'?'#059669':'#b45309'}">${b.pay.s}</b> · Metode: ${b.pay.m} · TX: ${b.pay.tx}</p>
 <p style="margin-top:28px;font-size:11px;color:#555">Terima kasih telah percaya pada AZZID RENTCAR — Nyaman Berkendara, Tenang Bepergian.</p></div>`;
window.print();}

/* ================= ROUTER ================= */
function renderC(){const h=location.hash.replace(/^#\/?/,'');const p=h.split('/');const main=$('cMain');
$('custApp').classList.remove('hidden');$('adminApp').classList.add('hidden');
let html='';
if(!p[0])html=vHome();
else if(p[0]==='armada'&&!p[1])html=vArmada();
else if(p[0]==='armada')html=vDetail(p[1]);
else if(p[0]==='booking')html=vBooking();
else if(p[0]==='user' || p[0]==='akun' || p[0]==='customer')html=vUserPortal();
else if(p[0]==='layanan')html=vLayanan();
else if(p[0]==='tentang')html=vTentang();
else if(p[0]==='faq')html=vFaq();
else if(p[0]==='kontak')html=vKontak();
else html=vHome();
main.innerHTML=html;revealInit();
document.querySelectorAll('.navl').forEach(a=>{const t=a.getAttribute('href').replace(/^#\//,'');const cur=p[0]||'';a.classList.toggle('!text-maroon-400',(t==='armada'&&cur==='armada')||(t==='layanan'&&cur==='layanan')||(t==='tentang'&&cur==='tentang')||(t==='faq'&&cur==='faq')||(t==='kontak'&&cur==='kontak')||(t===''&&cur===''));});
window.scrollTo({top:0});}
function route(){const h=location.hash;
if(h.startsWith('#/admin')){$('custApp').classList.add('hidden');$('adminApp').classList.remove('hidden');renderA();syncAdminBtns();return;}
renderC();}
window.addEventListener('hashchange',route);
window.addEventListener('scroll',()=>{const hd=$('cHeader');const on=window.scrollY>40;hd.style.background=on?'rgba(11,11,13,.92)':'transparent';hd.style.backdropFilter=on?'blur(14px)':'none';hd.style.borderColor=on?'rgba(255,255,255,.06)':'transparent';});
applyCms();syncAdminBtns();route();
