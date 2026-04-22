// ============================================================
// Forma Finance - Form Handler
// Uses WhatsApp redirect for instant, reliable lead delivery
// ============================================================
const WHATSAPP_NUMBER = '972549073080';

// Optional: Update this URL if you re-deploy the Google Apps Script
// See google-apps-script.gs for setup instructions
const SCRIPT_URL = '';

function submitLead(data) {
  // Try Google Apps Script if URL is configured
  if (SCRIPT_URL && SCRIPT_URL !== 'PASTE_YOUR_SCRIPT_URL_HERE') {
    const params = new URLSearchParams(data);
    fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    }).catch(() => {});
  }

  // Build WhatsApp message
  const typeMap = { cfo: 'CFO / ליווי פיננסי', contact: 'יצירת קשר', guide: 'מדריך' };
  const typeLabel = typeMap[data.type] || data.type || 'ליד';

  let msg = 'שלום, פניה חדשה מאתר פורמה פיננסים:\n\n';
  msg += 'סוג: ' + typeLabel + '\n';
  if (data.name)    msg += 'שם: '    + data.name    + '\n';
  if (data.phone)   msg += 'טלפון: ' + data.phone   + '\n';
  if (data.email)   msg += 'מייל: '  + data.email   + '\n';
  if (data.extra)   msg += 'פרטים: ' + data.extra   + '\n';
  if (data.message) msg += 'הודעה: ' + data.message + '\n';

  setTimeout(function() {
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
  }, 1200);
}
