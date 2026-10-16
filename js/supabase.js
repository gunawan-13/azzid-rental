window.SUPABASE_URL = 'https://xjncvsdlnkrkhwujjbma.supabase.co';
window.SUPABASE_ANON_KEY = 'sb_publishable_nEn-yL07oLqrxPcCx1_m8A_UO2MrEPb';
window.supabaseClient = null;
window.supabaseReady = new Promise(function(resolve, reject) {
  window.resolveSupabaseReady = resolve;
  window.rejectSupabaseReady = reject;
});

(function() {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
  script.onload = function() {
    try {
      if (window.supabase && window.supabase.createClient) {
        window.supabaseClient = window.supabase.createClient(
          window.SUPABASE_URL,
          window.SUPABASE_ANON_KEY
        );
        console.log('✅ Supabase client ready');
        window.resolveSupabaseReady(window.supabaseClient);
        window.dispatchEvent(new Event('supabase-ready'));
      } else {
        window.rejectSupabaseReady(new Error('Supabase SDK tidak tersedia.'));
      }
    } catch(e) {
      console.error('Supabase init error:', e);
      window.rejectSupabaseReady(e);
    }
  };
  script.onerror = function() {
    window.rejectSupabaseReady(new Error('Supabase SDK gagal dimuat.'));
  };
  document.head.appendChild(script);
})();
