/* ================= DEFAULT DATA ================= */
const IMG={
hero:'./images/hero.jpg',
avanza:'./images/cars/avanza.jpg',
innova:'./images/cars/innova.jpg',
brio:'./images/cars/brio.jpg',
xpander:'./images/cars/xpander.jpg',
fortuner:'./images/cars/fortuner.jpg',
alphard:'./images/cars/alphard.jpg',
hrv:'./images/cars/hrv.jpg',
hiace:'./images/cars/hiace.jpg',
interior:'./images/interior.jpg',
dash:'./images/dash.jpg',
fleet:'./images/fleet.jpg'};

const DEF_VEHICLES=[
{id:'avanza',name:'Toyota Avanza 1.5 G',brand:'Toyota',model:'Avanza',cat:'MPV',year:2023,plate:'B 1234 AZD',trans:'Automatic',seats:7,fuel:'Bensin',color:'Silver',doors:5,bag:'2 Koper',priceLK:350000,priceDrv:500000,status:'available',img:IMG.avanza,feats:['AC Double Blower','Dual Airbag','USB Charging','Bluetooth Audio','Sensor Parkir'],desc:'MPV sejuta umat yang irit, lincah, dan lega. Pilihan tepat untuk perjalanan keluarga dalam maupun luar kota dengan biaya yang efisien.'},
{id:'innova',name:'Toyota Innova Zenix',brand:'Toyota',model:'Innova',cat:'MPV',year:2024,plate:'B 2210 AZD',trans:'Automatic',seats:7,fuel:'Hybrid',color:'Gray Metalik',doors:5,bag:'3 Koper',priceLK:650000,priceDrv:800000,status:'available',img:IMG.innova,feats:['Hybrid Irit','Captain Seat','AC Digital','USB-C Charging','Cruise Control'],desc:'Kenyamanan kelas bisnis dengan teknologi hybrid. Kabin senyap, suspensi empuk, cocok untuk perjalanan dinas maupun keluarga.'},
{id:'brio',name:'Honda Brio RS',brand:'Honda',model:'Brio',cat:'City Car',year:2023,plate:'B 876 AZD',trans:'Automatic',seats:5,fuel:'Bensin',color:'Red',doors:5,bag:'1 Koper',priceLK:300000,priceDrv:450000,status:'available',img:IMG.brio,feats:['AC Double Blower','Dual Airbag','USB Charging','Bluetooth Audio'],desc:'City car lincah dan irit untuk mobilitas harian di dalam kota. Mudah parkir, menyenangkan dikendarai.'},
{id:'xpander',name:'Mitsubishi Xpander Ultimate',brand:'Mitsubishi',model:'Xpander',cat:'MPV',year:2023,plate:'B 3311 AZD',trans:'Automatic',seats:7,fuel:'Bensin',color:'White',doors:5,bag:'2 Koper',priceLK:425000,priceDrv:575000,status:'rented',img:IMG.xpander,feats:['AC Double Blower','Cruise Control','Keyless Start','Airbag 6 Titik','Sensor Parkir'],desc:'Crossover MPV dengan tampilan tegas dan kabin senyap. Favorit untuk perjalanan keluarga jarak jauh.'},
{id:'fortuner',name:'Toyota Fortuner GR Sport',brand:'Toyota',model:'Fortuner',cat:'SUV',year:2023,plate:'B 9090 AZD',trans:'Automatic',seats:7,fuel:'Diesel',color:'Black',doors:5,bag:'4 Koper',priceLK:1200000,priceDrv:1350000,status:'available',img:IMG.fortuner,feats:['4x4 Ready','Camera 360','Cruise Control','Keyless Start','Ambient Light'],desc:'SUV besar bertenaga dengan wibawa di jalan. Ideal untuk medan berat, perjalanan dinas eksekutif, dan luar kota.'},
{id:'alphard',name:'Toyota Alphard 2.5 G',brand:'Toyota',model:'Alphard',cat:'Premium',year:2022,plate:'B 1 AZD',trans:'Automatic',seats:7,fuel:'Bensin',color:'Black',doors:5,bag:'4 Koper',priceLK:2500000,priceDrv:2650000,status:'available',img:IMG.alphard,feats:['Captain Seat','Sunroof','Ambient Light','Power Sliding Door','AC Digital'],desc:'Standar tertinggi kenyamanan MPV premium. Pilihan utama untuk eksekutif, tamu VIP, dan wedding.'},
{id:'hrv',name:'Honda HR-V SE',brand:'Honda',model:'HR-V',cat:'SUV',year:2023,plate:'B 4521 AZD',trans:'Automatic',seats:5,fuel:'Bensin',color:'White',doors:5,bag:'2 Koper',priceLK:475000,priceDrv:625000,status:'available',img:IMG.hrv,feats:['Cruise Control','Keyless Start','Airbag 6 Titik','AC Digital'],desc:'Compact SUV stylish dengan handling presisi. Cocok untuk profesional muda dan pasangan yang bepergian dengan gaya.'},
{id:'hiace',name:'Toyota Hiace Commuter',brand:'Toyota',model:'Hiace',cat:'Commercial',year:2022,plate:'B 7712 AZD',trans:'Manual',seats:15,fuel:'Diesel',color:'White',doors:4,bag:'6 Koper',priceLK:950000,priceDrv:1100000,status:'maintenance',img:IMG.hiace,feats:['AC Double Blower','Power Sliding Door','USB Charging'],desc:'Armada andalan untuk rombongan besar, shuttle perusahaan, dan kebutuhan event. Selalu dengan driver profesional.'}];

const DEF_CUSTOMERS=[
{id:'CST-001',name:'Andi Pratama',wa:'0812-9001-1122',email:'andi.pratama@gmail.com',addr:'Jakarta Selatan',total:12,spend:8500000,last:'Toyota Avanza',status:'VIP'},
{id:'CST-002',name:'Budi Santoso',wa:'0813-2233-4455',email:'budi.santoso@outlook.com',addr:'Bekasi',total:8,spend:6200000,last:'Toyota Innova Zenix',status:'Regular'},
{id:'CST-003',name:'Citra Lestari',wa:'0821-5566-7788',email:'citra.lestari@gmail.com',addr:'Depok',total:3,spend:1800000,last:'Honda Brio RS',status:'Regular'},
{id:'CST-004',name:'Dewi Anggraini',wa:'0812-3344-5566',email:'dewi.anggraini@company.co.id',addr:'Jakarta Pusat',total:6,spend:9400000,last:'Toyota Fortuner',status:'VIP'},
{id:'CST-005',name:'Eko Prasetyo',wa:'0857-1122-3344',email:'eko.prasetyo@gmail.com',addr:'Tangerang',total:4,spend:3100000,last:'Mitsubishi Xpander',status:'Regular'},
{id:'CST-006',name:'Farhan Hidayat',wa:'0819-8877-6655',email:'farhan.hidayat@corp.id',addr:'Jakarta Selatan',total:5,spend:12600000,last:'Toyota Alphard',status:'VIP'},
{id:'CST-007',name:'Gita Maharani',wa:'0812-4455-6677',email:'gita.maharani@eventwo.id',addr:'Jakarta Barat',total:7,spend:10800000,last:'Toyota Hiace',status:'Regular'},
{id:'CST-008',name:'Hendra Wijaya',wa:'0816-7788-9900',email:'hendra.wijaya@gmail.com',addr:'Bogor',total:2,spend:700000,last:'Toyota Avanza',status:'Regular'},
{id:'CST-009',name:'Intan Permata',wa:'0822-1133-5577',email:'intan.permata@gmail.com',addr:'Jakarta Timur',total:1,spend:0,last:'—',status:'New'},
{id:'CST-010',name:'Joko Susilo',wa:'0811-2244-6688',email:'joko.susilo@group.co.id',addr:'Jakarta Pusat',total:9,spend:21500000,last:'Toyota Alphard',status:'VIP'},
{id:'CST-011',name:'Kartika Dewi',wa:'0813-9988-7766',email:'kartika.dewi@gmail.com',addr:'Depok',total:3,spend:2100000,last:'Honda Brio RS',status:'Regular'},
{id:'CST-012',name:'Lina Marlina',wa:'0852-3456-7810',email:'lina.marlina@gmail.com',addr:'Bekasi',total:1,spend:0,last:'—',status:'New'},
{id:'CST-013',name:'Maya Sari',wa:'0817-6655-4433',email:'maya.sari@travel.id',addr:'Jakarta Selatan',total:6,spend:8900000,last:'Toyota Fortuner',status:'Regular'},
{id:'CST-014',name:'Nanda Putri',wa:'0812-8899-0011',email:'nanda.putri@gmail.com',addr:'Jakarta Utara',total:2,spend:1000000,last:'Toyota Avanza',status:'New'}];

const DEF_DRIVERS=[
{id:'DRV-01',name:'Rudi Hartono',wa:'0812-1111-2222',sim:'SIM A Umum · s/d 2028',rating:4.9,trips:214,status:'On Trip'},
{id:'DRV-02',name:'Slamet Riyadi',wa:'0813-2222-3333',sim:'SIM A Umum · s/d 2027',rating:4.8,trips:186,status:'On Trip'},
{id:'DRV-03',name:'Dedi Kurniawan',wa:'0821-3333-4444',sim:'SIM B1 · s/d 2029',rating:4.7,trips:142,status:'Available'},
{id:'DRV-04',name:'Agus Salim',wa:'0857-4444-5555',sim:'SIM A Umum · s/d 2027',rating:4.9,trips:251,status:'Assigned'},
{id:'DRV-05',name:'Bayu Nugraha',wa:'0819-5555-6666',sim:'SIM B1 · s/d 2028',rating:4.6,trips:98,status:'Off Duty'}];

const DEF_BOOKINGS=[
{id:'AZR-20260728-013',cust:'Maya Sari',veh:'fortuner',start:'2026-07-28',end:'2026-07-31',type:'Lepas Kunci',pickup:'Kantor AZZID — Kemang',drop:'Kantor AZZID — Kemang',driver:null,sub:3600000,drv:0,disc:0,total:3600000,status:'Completed',pay:{m:'QRIS',s:'PAID',tx:'TRX-88114',at:'2026-07-27'},user:'maya.sari@travel.id'},
{id:'AZR-20260802-010',cust:'Joko Susilo',veh:'alphard',start:'2026-08-02',end:'2026-08-04',type:'Dengan Driver',pickup:'Bandara Soekarno-Hatta',drop:'Hotel Mulia Senayan',driver:'DRV-02',sub:5000000,drv:300000,disc:0,total:5300000,status:'Completed',pay:{m:'VA BCA',s:'PAID',tx:'TRX-88190',at:'2026-08-01'},user:null},
{id:'AZR-20260803-011',cust:'Kartika Dewi',veh:'brio',start:'2026-08-03',end:'2026-08-06',type:'Lepas Kunci',pickup:'Kantor AZZID — Kemang',drop:'Kantor AZZID — Kemang',driver:null,sub:900000,drv:0,disc:0,total:900000,status:'Completed',pay:{m:'GoPay',s:'PAID',tx:'TRX-88201',at:'2026-08-02'},user:null},
{id:'AZR-20260805-008',cust:'Hendra Wijaya',veh:'avanza',start:'2026-08-07',end:'2026-08-09',type:'Lepas Kunci',pickup:'Stasiun Gambir',drop:'Stasiun Gambir',driver:null,sub:700000,drv:0,disc:0,total:700000,status:'Cancelled',pay:{m:'VA Mandiri',s:'REFUNDED',tx:'TRX-88233',at:'2026-08-05'},user:null},
{id:'AZR-20260808-001',cust:'Andi Pratama',veh:'avanza',start:'2026-08-10',end:'2026-08-12',type:'Lepas Kunci',pickup:'Kantor AZZID — Kemang',drop:'Kantor AZZID — Kemang',driver:null,sub:700000,drv:0,disc:0,total:700000,status:'Completed',pay:{m:'QRIS',s:'PAID',tx:'TRX-88231',at:'2026-08-08'},user:'penyewa@demo.id'},
{id:'AZR-20260809-009',cust:'Intan Permata',veh:'hrv',start:'2026-08-14',end:'2026-08-16',type:'Lepas Kunci',pickup:'Kantor AZZID — Kemang',drop:'Kantor AZZID — Kemang',driver:null,sub:950000,drv:0,disc:0,total:950000,status:'Expired',pay:{m:'QRIS',s:'UNPAID',tx:'TRX-88260',at:null},user:null},
{id:'AZR-20260810-002',cust:'Budi Santoso',veh:'innova',start:'2026-08-13',end:'2026-08-15',type:'Dengan Driver',pickup:'Rumah Customer — Bekasi',drop:'Rumah Customer — Bekasi',driver:'DRV-02',sub:1300000,drv:300000,disc:0,total:1600000,status:'Ongoing',pay:{m:'QRIS',s:'PAID',tx:'TRX-88277',at:'2026-08-10'},user:null},
{id:'AZR-20260810-007',cust:'Gita Maharani',veh:'hiace',start:'2026-08-20',end:'2026-08-22',type:'Dengan Driver',pickup:'Kantor EventWO — Sudirman',drop:'Bandung — Dago',driver:'DRV-03',sub:1900000,drv:300000,disc:0,total:2200000,status:'Confirmed',pay:{m:'Transfer Bank',s:'PAID',tx:'TRX-88290',at:'2026-08-10'},user:null},
{id:'AZR-20260811-005',cust:'Eko Prasetyo',veh:'xpander',start:'2026-08-11',end:'2026-08-16',type:'Lepas Kunci',pickup:'Kantor AZZID — Kemang',drop:'Kantor AZZID — Kemang',driver:null,sub:2125000,drv:0,disc:0,total:2125000,status:'Ongoing',pay:{m:'OVO',s:'PAID',tx:'TRX-88296',at:'2026-08-11'},user:null},
{id:'AZR-20260812-003',cust:'Citra Lestari',veh:'brio',start:'2026-08-18',end:'2026-08-20',type:'Lepas Kunci',pickup:'Kantor AZZID — Kemang',drop:'Kantor AZZID — Kemang',driver:null,sub:600000,drv:0,disc:0,total:600000,status:'Pending',pay:{m:'QRIS',s:'PENDING',tx:'TRX-88310',at:null},user:null},
{id:'AZR-20260812-006',cust:'Farhan Hidayat',veh:'alphard',start:'2026-08-19',end:'2026-08-21',type:'Dengan Driver',pickup:'Bandara Halim Perdanakusuma',drop:'Kantor Pusat — SCBD',driver:'DRV-04',sub:5000000,drv:300000,disc:0,total:5300000,status:'Confirmed',pay:{m:'VA Mandiri',s:'PAID',tx:'TRX-88315',at:'2026-08-12'},user:null},
{id:'AZR-20260812-014',cust:'Nanda Putri',veh:'avanza',start:'2026-08-12',end:'2026-08-14',type:'Dengan Driver',pickup:'Rumah Customer — Jakut',drop:'Rumah Customer — Jakut',driver:'DRV-01',sub:700000,drv:300000,disc:0,total:1000000,status:'Ongoing',pay:{m:'QRIS',s:'PAID',tx:'TRX-88320',at:'2026-08-12'},user:null},
{id:'AZR-20260813-004',cust:'Dewi Anggraini',veh:'fortuner',start:'2026-08-15',end:'2026-08-17',type:'Dengan Driver',pickup:'Kantor AZZID — Kemang',drop:'Bandara Soekarno-Hatta',driver:null,sub:2400000,drv:300000,disc:0,total:2700000,status:'Confirmed',pay:{m:'VA BCA',s:'PAID',tx:'TRX-88331',at:'2026-08-13'},user:null},
{id:'AZR-20260813-012',cust:'Lina Marlina',veh:'innova',start:'2026-08-20',end:'2026-08-23',type:'Lepas Kunci',pickup:'Kantor AZZID — Kemang',drop:'Kantor AZZID — Kemang',driver:null,sub:1950000,drv:0,disc:0,total:1950000,status:'Pending',pay:{m:'QRIS',s:'UNPAID',tx:'TRX-88340',at:null},user:null}];

const DEF_PROMOS=[
{id:'P-01',code:'MERDEKA2026',type:'percent',value:10,cap:100000,minDays:2,start:'2026-08-01',end:'2026-08-31',status:'Active'},
{id:'P-02',code:'AZZIDHEMAT',type:'flat',value:50000,cap:0,minDays:3,start:'2026-07-01',end:'2026-12-31',status:'Active'},
{id:'P-03',code:'JULI2026',type:'percent',value:15,cap:150000,minDays:2,start:'2026-07-01',end:'2026-07-31',status:'Expired'}];

const DEF_ACCOUNTS=[
{id:'USR-001',nama:'Andi Pratama',email:'penyewa@demo.id',wa:'0812-9001-1122',pass:'demo123',alamat:'Jl. Kemang Timur No. 12, Jakarta Selatan',ktp:'3175012305920001',ttl:'1992-05-14',joined:'2024-03-10'}];

const DEF_CMS={head1:'PERJALANAN LEBIH NYAMAN.',head2:'MOBIL SIAP JALAN.',
sub:'Nikmati layanan rental mobil yang praktis, nyaman, dan terpercaya untuk kebutuhan perjalanan pribadi, bisnis, maupun wisata.',
ann:'🇮🇩 Promo MERDEKA2026 — Diskon 10% untuk rental minimal 2 hari · Berlaku s/d 31 Agustus 2026',wa:'6281234567890'};

/* ================= PERSISTENCE ================= */
const LS_KEY='azzid_rentcar_db_v9',LS_SES='azzid_rentcar_session',LS_CUST='azzid_customer_session';
function loadDB(){try{const r=localStorage.getItem(LS_KEY);if(r)return JSON.parse(r);}catch(e){}return null;}
const saved=loadDB()||{};
let VEHICLES=saved.vehicles||JSON.parse(JSON.stringify(DEF_VEHICLES));
let BOOKINGS=saved.bookings||JSON.parse(JSON.stringify(DEF_BOOKINGS));
let CUSTOMERS=saved.customers||JSON.parse(JSON.stringify(DEF_CUSTOMERS));
let DRIVERS=saved.drivers||JSON.parse(JSON.stringify(DEF_DRIVERS));
let PROMOS=saved.promos||JSON.parse(JSON.stringify(DEF_PROMOS));
let ACCOUNTS=saved.accounts||JSON.parse(JSON.stringify(DEF_ACCOUNTS));
let LOGS=saved.logs||[{t:'13/08/2026 08.00',txt:'Sistem diinisialisasi dengan data demo'}];
function persist(){try{localStorage.setItem(LS_KEY,JSON.stringify({vehicles:VEHICLES,bookings:BOOKINGS,customers:CUSTOMERS,drivers:DRIVERS,promos:PROMOS,accounts:ACCOUNTS,logs:LOGS,cms:S.cms}));}catch(e){}}
function resetDemo(){if(confirm('Reset semua data ke kondisi demo awal? Perubahan Anda akan hilang.')){localStorage.removeItem(LS_KEY);localStorage.removeItem(LS_SES);localStorage.removeItem(LS_CUST);location.reload();}}
function addLog(txt){LOGS.unshift({t:new Date().toLocaleString('id-ID',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}),txt});LOGS=LOGS.slice(0,40);persist();}

const USERS=[
{n:'Aziz Ramadhan',e:'owner@azzidrentcar.id',p:'owner123',r:'Super Admin'},
{n:'Rina Kusuma',e:'admin@azzidrentcar.id',p:'admin123',r:'Admin'},
{n:'Fajar Sidiq',e:'staff@azzidrentcar.id',p:'staff123',r:'Staff'},
{n:'Sinta Dewi',e:'finance@azzidrentcar.id',p:'finance123',r:'Finance'}];
/* Semua role demo mendapat menu lengkap sesuai struktur PRD */
const FULL_MENU=['overview','rental','booking','calendar','armada','customers','drivers','payments','promo','reports','cms','users','settings'];
const ROLE_MENU={'Super Admin':FULL_MENU,'Admin':FULL_MENU,'Staff':FULL_MENU,'Finance':FULL_MENU};

const NOTIFS=[
{ic:'file',t:'Booking baru AZR-20260813-012 dari Lina Marlina',w:'5 menit lalu',cl:'text-sky-300'},
{ic:'card',t:'Pembayaran berhasil AZR-20260813-004 · Rp2.700.000',w:'1 jam lalu',cl:'text-emerald-300'},
{ic:'clock',t:'Jadwal pengembalian AZR-20260812-014 besok 20.00',w:'2 jam lalu',cl:'text-amber-300'},
{ic:'alert',t:'Toyota Hiace Commuter masuk maintenance s/d 18 Agu',w:'Kemarin',cl:'text-red-300'},
{ic:'x',t:'Pembayaran gagal AZR-20260809-009 — booking expired',w:'3 hari lalu',cl:'text-zinc-400'}];

const TESTIMONIALS=[
{n:'Andi Pratama',r:'Karyawan Swasta',t:'Proses booking cuma 5 menit, mobil bersih dan wangi. Driver tepat waktu banget. Langganan terus di AZZID!'},
{n:'Dewi Anggraini',r:'Corporate Client',t:'Perusahaan kami rutin sewa untuk dinas luar kota. Armada selalu prima, invoice rapi, admin responsif 24 jam.'},
{n:'Gita Maharani',r:'Event Organizer',t:'Sewa Hiace untuk event klien, kondisi mobil terawat dan driver profesional. Klien kami puas, kami tenang.'},
{n:'Farhan Hidayat',r:'Pengusaha',t:'Alphard-nya mewah dan terawat. Cocok untuk jemput tamu VIP perusahaan. Harga sebanding dengan kualitas layanan.'},
{n:'Kartika Dewi',r:'Ibu Rumah Tangga',t:'Sewa Brio buat liburan keluarga, harga transparan tanpa biaya tersembunyi. Proses pengembalian juga cepat.'},
{n:'Maya Sari',r:'Travel Agent',t:'Partner rental paling bisa diandalkan. Konfirmasi cepat, mobil sesuai foto, dan selalu siap saat high season.'}];

const FAQS=[
{q:'Apa saja syarat rental lepas kunci?',a:'KTP aktif, SIM A aktif, dan kartu identitas tambahan (KK/NPWP/KTM). Untuk pertama kali, berlaku survei singkat via WhatsApp. Deposit tidak diperlukan untuk paket harian.'},
{q:'Apakah harga sudah termasuk asuransi?',a:'Ya. Semua unit terlindungi asuransi all-risk dasar. Biaya sendiri (own risk) maksimal Rp300.000 berlaku hanya jika terjadi kecelakaan akibat kelalaian penyewa.'},
{q:'Bagaimana ketentuan overtime (telat pengembalian)?',a:'Toleransi 1 jam pertama gratis. Lewat dari itu dikenakan biaya Rp50.000/jam, dan lebih dari 4 jam dihitung 1 hari rental.'},
{q:'Metode pembayaran apa saja yang didukung?',a:'QRIS, Virtual Account (BCA, Mandiri, BNI, BRI), e-wallet (GoPay, OVO, DANA), dan transfer bank manual. Pembayaran diverifikasi otomatis.'},
{q:'Bisakah batal atau reschedule booking?',a:'Reschedule gratis maksimal H-2 sebelum tanggal mulai. Pembatalan H-3 atau lebih awal refund 100%; kurang dari itu refund 50%.'},
{q:'Apakah tersedia antar-jemput mobil?',a:'Ya, gratis antar-jemput dalam radius 10 km dari kantor kami. Area bandara dan stasiun tersedia dengan biaya operasional ringan.'},
{q:'Berapa minimum hari rental?',a:'Minimum 1 hari (24 jam) untuk lepas kunci dan dengan driver. Paket bulanan dan corporate tersedia dengan harga khusus.'},
{q:'Bagaimana jika mobil mogok di jalan?',a:'Tim rescue kami siaga 24/7. Jika kendala bukan akibat kelalaian, kami kirimkan unit pengganti maksimal 3 jam di area Jabodetabek.'}];

const SERVICES=[
{ic:'key',t:'Lepas Kunci',d:'Bebas atur perjalanan sendiri dengan prosedur cepat dan syarat mudah.',p:'mulai Rp300rb/hari'},
{ic:'wheel',t:'Dengan Driver',d:'Driver profesional, berpengalaman 5+ tahun, ramah dan tepat waktu.',p:'+Rp150rb/hari'},
{ic:'plane',t:'Antar-Jemput Bandara',d:'Penjemputan Soekarno-Hatta & Halim dengan flight monitoring.',p:'gratis radius 10 km'},
{ic:'map',t:'Paket Wisata & Luar Kota',d:'Itinerary fleksibel ke Bandung, Puncak, Yogyakarta, dan lainnya.',p:'custom quote'},
{ic:'brief',t:'Bulanan & Corporate',d:'Kontrak perusahaan dengan invoice berkala dan unit pengganti.',p:'mulai Rp7jt/bulan'},
{ic:'award',t:'Wedding & Event Premium',d:'Alphard & Fortuner dengan dekorasi pita dan driver berpenampilan rapi.',p:'custom quote'}];

/* ================= STATE ================= */
const S={
 adminView:'overview', session:null, custSession:null, calY:2026, calM:7, revRange:30, repTab:'rev',
 filters:{cat:'Semua',trans:'Semua',seats:0,maxPrice:0,q:'',avail:false,sort:'pop'},
 draft:{veh:null,start:'',end:'',type:'Lepas Kunci',pickup:'',drop:'',cust:{},promo:null,method:''},
 step:0,lastBooking:null,_q:'',_bst:'',_bps:'',_vq:'',_vst:'',_vc:'',
 cms:saved.cms||JSON.parse(JSON.stringify(DEF_CMS))};
try{const ss=localStorage.getItem(LS_SES);if(ss)S.session=JSON.parse(ss);}catch(e){}
try{const cs=localStorage.getItem(LS_CUST);if(cs)S.custSession=JSON.parse(cs);}catch(e){}
if(S.session&&!ROLE_MENU[S.session.role])S.session.role='Super Admin';
function curAccount(){return S.custSession?ACCOUNTS.find(a=>a.email===S.custSession.email)||null:null;}
function ongoingCount(){return BOOKINGS.filter(b=>['Ongoing','Confirmed'].includes(b.status)).length;}
