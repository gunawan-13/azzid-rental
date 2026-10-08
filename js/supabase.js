window.SUPABASE_URL = 'https://PROJECT_ID_BARU.supabase.co';
window.SUPABASE_ANON_KEY = 'PUBLISHABLE_KEY_BARU';
window.supabaseClient = null;

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
        window.dispatchEvent(new Event('supabase-ready'));
      }
    } catch(e) { console.error('Supabase init error:', e); }
  };
  document.head.appendChild(script);
})();
