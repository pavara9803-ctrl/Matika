// ============================================================
// feedback.js
// Feedback හා යෝජනා පද්ධතිය
// EmailJS මගින් Email එකට යවයි + LocalStorage එකේ ගබඩා කරයි
// අභිධර්ම මාතිකා අධ්‍යයන යෙදුම
// ============================================================

// ============================================================
// 🔧 EMAILJS CONFIGURATION (මෙතන ඔබගේ ID යොදන්න)
// ============================================================
const EMAILJS_CONFIG = {
  PUBLIC_KEY: '7x_FOGFJJO8JY6Hmg',      // ← ඔබගේ Public Key
  SERVICE_ID: 'service_x00ykdo',      // ← ඔබගේ Service ID
  TEMPLATE_ID: 'template_REPLACE_ME'  // ← EmailJS > Email Templates වලින් 'template_' ලෙස ඇරඹෙන ID එක
};

// ============================================================
// 1. CONSTANTS
// ============================================================
const FEEDBACK_STORAGE_KEY = 'abhidhamma_feedback_data';
const FEEDBACK_META_KEY = 'abhidhamma_feedback_meta';

// ============================================================
// 2. EMAILJS INITIALIZATION
// ============================================================
var emailjsLoading = false;

function isEmailConfigured() {
  return !!EMAILJS_CONFIG.PUBLIC_KEY &&
         /^service_/.test(EMAILJS_CONFIG.SERVICE_ID) &&
         /^template_/.test(EMAILJS_CONFIG.TEMPLATE_ID) &&
         EMAILJS_CONFIG.TEMPLATE_ID !== 'template_REPLACE_ME';
}

function loadEmailJS(cb) {
  if (typeof emailjs !== 'undefined') {
    try { emailjs.init({ publicKey: EMAILJS_CONFIG.PUBLIC_KEY }); } catch (e) { console.warn('[feedback.js] EmailJS init failed:', e); }
    if (cb) cb();
    return;
  }
  if (emailjsLoading || !navigator.onLine) return;
  emailjsLoading = true;
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  script.onload = function() {
    emailjsLoading = false;
    try { emailjs.init({ publicKey: EMAILJS_CONFIG.PUBLIC_KEY }); } catch (e) { console.warn('[feedback.js] EmailJS init failed:', e); }
    if (cb) cb();
  };
  script.onerror = function() {
    emailjsLoading = false;
    console.warn('[feedback.js] EmailJS script load failed - offline mode');
  };
  document.head.appendChild(script);
}

// ============================================================
// 3. MODAL OPEN/CLOSE
// ============================================================

function openFeedbackModal() {
  var modal = document.getElementById('feedback-modal');
  if (!modal) {
    console.warn('[feedback.js] feedback-modal element not found');
    return;
  }
  
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  resetFeedbackForm();
  
  setTimeout(function() {
    var firstInput = document.getElementById('feedback-type');
    if (firstInput) firstInput.focus();
  }, 100);
  
  console.log('[feedback.js] Feedback modal opened');
}

function closeFeedbackModal() {
  var modal = document.getElementById('feedback-modal');
  if (!modal) return;
  
  modal.classList.add('hidden');
  document.body.style.overflow = '';
  
  console.log('[feedback.js] Feedback modal closed');
}

function resetFeedbackForm() {
  var nameInput = document.getElementById('feedback-name');
  var typeInput = document.getElementById('feedback-type');
  var messageInput = document.getElementById('feedback-message');
  var emailInput = document.getElementById('feedback-email');
  
  if (nameInput) nameInput.value = '';
  if (typeInput) typeInput.value = '';
  if (messageInput) messageInput.value = '';
  if (emailInput) emailInput.value = '';
  
  var submitBtn = document.getElementById('feedback-submit-btn');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> එවන්න';
  }
}

// ============================================================
// 4. FEEDBACK SUBMISSION - Email + LocalStorage
// ============================================================

function submitFeedback(event) {
  if (event) event.preventDefault();
  
  // ========== 1. INPUT ලබා ගන්න ==========
  var name = (document.getElementById('feedback-name') || {}).value || '';
  var type = (document.getElementById('feedback-type') || {}).value || '';
  var message = (document.getElementById('feedback-message') || {}).value || '';
  var email = (document.getElementById('feedback-email') || {}).value || '';
  
  // ========== 2. VALIDATION ==========
  name = name.trim();
  type = type.trim();
  message = message.trim();
  email = email.trim();
  
  if (!type) {
    showFeedbackMessage('කරුණාකර ප්‍රතිචාරයේ වර්ගය තෝරන්න', 'error');
    return;
  }
  
  if (!message) {
    showFeedbackMessage('කරුණාකර ඔබගේ පණිවිඩය ලියන්න', 'error');
    return;
  }
  
  if (message.length < 5) {
    showFeedbackMessage('පණිවිඩය අවම වශයෙන් අකුරු 5ක් වත් විය යුතුය', 'error');
    return;
  }
  
  if (message.length > 2000) {
    showFeedbackMessage('පණිවිඩය අකුරු 2000ට වඩා වැඩි විය නොහැක', 'error');
    return;
  }
  
  if (email && !isValidEmail(email)) {
    showFeedbackMessage('කරුණාකර වලංගු ඊමේල් ලිපිනයක් ඇතුළත් කරන්න', 'error');
    return;
  }
  
  // ========== 3. SUBMIT BUTTON එක disable කරන්න ==========
  var submitBtn = document.getElementById('feedback-submit-btn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> යවමින්...';
  }
  
  // ========== 4. DATA OBJECT එක සාදන්න ==========
  var now = new Date();
  var feedbackData = {
    // EmailJS Template සඳහා
    feedback_id: generateFeedbackId(),
    from_name: name || 'නම් නොකියූ',
    from_email: email || 'නොමැත',
    feedback_type: getFeedbackTypeLabel(type),
    feedback_date: formatDate(now),
    message: message,
    language: navigator.language || 'unknown',
    page_url: window.location.href,
    screen_size: window.innerWidth + 'x' + window.innerHeight,
    app_version: '1.0.0',
    
    // LocalStorage සඳහා
    id: generateFeedbackId(),
    name: name || 'නම් නොකියූ',
    type: type,
    typeLabel: getFeedbackTypeLabel(type),
    email: email || 'නොමැත',
    timestamp: now.toISOString(),
    dateFormatted: formatDate(now),
    userAgent: navigator.userAgent,
    languageFull: navigator.language,
    pageUrl: window.location.href,
    screenSize: window.innerWidth + 'x' + window.innerHeight,
    version: '1.0.0',
    sent: false
  };
  
  // ========== 5. LOCALSTORAGE එකේ SAVE කරන්න (backup) ==========
  try {
    saveFeedbackToStorage(feedbackData);
  } catch (error) {
    console.warn('[feedback.js] LocalStorage save failed:', error);
  }
  
  // ========== 6. EMAIL එකට යවන්න (EmailJS) ==========
  sendFeedbackEmail(feedbackData, submitBtn);
}

// ============================================================
// 5. EMAIL SENDING (EmailJS)
// ============================================================

function sendFeedbackEmail(feedbackData, submitBtn) {
  if (!isEmailConfigured()) {
    console.warn('[feedback.js] EmailJS not configured (SERVICE_ID / TEMPLATE_ID පරීක්ෂා කරන්න) - saved locally');
    handleQueued(submitBtn);
    return;
  }
  if (!navigator.onLine || typeof emailjs === 'undefined') {
    handleQueued(submitBtn);
    loadEmailJS(retryPendingFeedback);
    return;
  }

  emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, feedbackData)
    .then(function(response) {
      console.log('[feedback.js] ✅ Email sent', response.status, response.text);
      markFeedbackSent(feedbackData.id);
      handleEmailSuccess(submitBtn);
    })
    .catch(function(error) {
      console.error('[feedback.js] ❌ Email send failed:', error);
      handleEmailError(submitBtn, error);
    });
}

function handleEmailSuccess(submitBtn) {
  showFeedbackMessage('ඔබගේ අදහස් සාර්ථකව ලැබුණි! ස්තූතියි 🙏', 'success');
  setTimeout(closeFeedbackModal, 2000);
}

// යැවීමට නොහැකි විට: උපාංගයේ සුරකින අතර අන්තර්ජාලය ලැබුණු විට ස්වයංක්‍රීයව යවයි
function handleQueued(submitBtn) {
  showFeedbackMessage('අදහස් උපාංගයේ සුරකින ලදී. අන්තර්ජාලය ලැබුණු විට ස්වයංක්‍රීයව යවනු ඇත.', 'warning');
  setTimeout(closeFeedbackModal, 2500);
}

function handleEmailError(submitBtn, error) {
  if (error && error.text) console.warn('[feedback.js] Email error details:', error.text);
  showFeedbackMessage('යැවීම අසාර්ථකයි. දත්ත සුරකින ලදී; පසුව නැවත යවනු ඇත.', 'warning');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> නැවත එවන්න';
  }
}

function markFeedbackSent(id) {
  try {
    var all = getAllFeedbackFromStorage();
    all.forEach(function(item) { if (item.id === id) item.sent = true; });
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(all));
  } catch (e) { console.warn('[feedback.js] markFeedbackSent failed:', e); }
}

var retryingFeedback = false;
function retryPendingFeedback() {
  if (retryingFeedback || !isEmailConfigured() || !navigator.onLine) return;
  var pending = getAllFeedbackFromStorage().filter(function(i) { return i.sent === false; });
  if (!pending.length) return;
  if (typeof emailjs === 'undefined') { loadEmailJS(retryPendingFeedback); return; }
  retryingFeedback = true;
  pending.reduce(function(chain, item) {
    return chain.then(function() {
      return emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, item)
        .then(function() { markFeedbackSent(item.id); });
    });
  }, Promise.resolve())
  .catch(function(e) { console.warn('[feedback.js] Retry failed:', e); })
  .then(function() { retryingFeedback = false; });
}

window.addEventListener('online', function() { loadEmailJS(retryPendingFeedback); });

// ============================================================
// 6. STORAGE FUNCTIONS (Backup)
// ============================================================

function saveFeedbackToStorage(feedbackData) {
  var existingData = getAllFeedbackFromStorage();
  existingData.push(feedbackData);
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(existingData));
  updateFeedbackMetadata(existingData.length);
  console.log('[feedback.js] Total feedback items:', existingData.length);
}

function getAllFeedbackFromStorage() {
  try {
    var data = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) || [];
  } catch (error) {
    console.error('[feedback.js] Error reading feedback data:', error);
    return [];
  }
}

function updateFeedbackMetadata(count) {
  var meta = {
    totalCount: count,
    lastUpdated: new Date().toISOString(),
    lastUpdatedFormatted: formatDate(new Date())
  };
  localStorage.setItem(FEEDBACK_META_KEY, JSON.stringify(meta));
}

function getFeedbackMetadata() {
  try {
    var meta = localStorage.getItem(FEEDBACK_META_KEY);
    if (!meta) return { totalCount: 0 };
    return JSON.parse(meta);
  } catch (error) {
    return { totalCount: 0 };
  }
}

// ============================================================
// 7. EXPORT/DOWNLOAD FUNCTIONS
// ============================================================

function downloadFeedbackAsJSON() {
  var allData = getAllFeedbackFromStorage();
  if (allData.length === 0) {
    showFeedbackMessage('Download කිරීමට දත්ත නොමැත', 'error');
    return;
  }
  
  var exportData = {
    exportDate: new Date().toISOString(),
    exportDateFormatted: formatDate(new Date()),
    totalItems: allData.length,
    appName: 'අභිධර්ම මාතිකා අධ්‍යයනය',
    appVersion: '1.0.0',
    feedback: allData
  };
  
  var jsonString = JSON.stringify(exportData, null, 2);
  var blob = new Blob([jsonString], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  
  var a = document.createElement('a');
  a.href = url;
  a.download = 'abhidhamma-feedback-' + getDateStamp() + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  console.log('[feedback.js] Feedback downloaded as JSON');
}

function downloadFeedbackAsCSV() {
  var allData = getAllFeedbackFromStorage();
  if (allData.length === 0) {
    showFeedbackMessage('Download කිරීමට දත්ත නොමැත', 'error');
    return;
  }
  
  var headers = ['ID', 'Date', 'Name', 'Type', 'Message', 'Email', 'Language', 'Page URL'];
  var csvRows = [headers.join(',')];
  
  allData.forEach(function(item) {
    var row = [
      escapeCSV(item.id),
      escapeCSV(item.dateFormatted),
      escapeCSV(item.name),
      escapeCSV(item.typeLabel),
      escapeCSV(item.message),
      escapeCSV(item.email),
      escapeCSV(item.languageFull || item.language),
      escapeCSV(item.pageUrl)
    ];
    csvRows.push(row.join(','));
  });
  
  var csvString = '\uFEFF' + csvRows.join('\n');
  var blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  var url = URL.createObjectURL(blob);
  
  var a = document.createElement('a');
  a.href = url;
  a.download = 'abhidhamma-feedback-' + getDateStamp() + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  console.log('[feedback.js] Feedback downloaded as CSV');
}

function copyFeedbackToClipboard() {
  var allData = getAllFeedbackFromStorage();
  if (allData.length === 0) {
    showFeedbackMessage('Copy කිරීමට දත්ත නොමැත', 'error');
    return;
  }
  
  var text = 'අභිධර්ම මාතිකා - Feedback Data\n';
  text += '='.repeat(50) + '\n';
  text += 'Export Date: ' + formatDate(new Date()) + '\n';
  text += 'Total Items: ' + allData.length + '\n';
  text += '='.repeat(50) + '\n\n';
  
  allData.forEach(function(item, index) {
    text += '[' + (index + 1) + '] ' + item.typeLabel + '\n';
    text += 'ID: ' + item.id + '\n';
    text += 'Date: ' + item.dateFormatted + '\n';
    text += 'Name: ' + item.name + '\n';
    text += 'Email: ' + item.email + '\n';
    text += 'Message: ' + item.message + '\n';
    text += '-'.repeat(50) + '\n\n';
  });
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      showFeedbackMessage('දත්ත Clipboard එකට copy කරන ලදී! 📋', 'success');
    }).catch(function(err) {
      console.error('[feedback.js] Clipboard copy failed:', err);
      fallbackCopyToClipboard(text);
    });
  } else {
    fallbackCopyToClipboard(text);
  }
}

function fallbackCopyToClipboard(text) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    showFeedbackMessage('දත්ත Clipboard එකට copy කරන ලදී! 📋', 'success');
  } catch (err) {
    console.error('[feedback.js] Fallback copy failed:', err);
    showFeedbackMessage('Copy කිරීමට නොහැකි විය', 'error');
  }
  
  document.body.removeChild(textarea);
}

// ============================================================
// 8. VIEW FEEDBACK FUNCTIONS
// ============================================================

function viewAllFeedback() {
  var allData = getAllFeedbackFromStorage();
  if (allData.length === 0) {
    console.log('[feedback.js] No feedback data found');
    return;
  }
  
  console.log('='.repeat(60));
  console.log('📋 අභිධර්ම මාතිකා - Feedback Data');
  console.log('='.repeat(60));
  console.log('Total Items:', allData.length);
  console.log('='.repeat(60));
  console.table(allData.map(function(item) {
    return {
      'ID': item.id,
      'Date': item.dateFormatted,
      'Name': item.name,
      'Type': item.typeLabel,
      'Message': item.message.substring(0, 50) + (item.message.length > 50 ? '...' : ''),
      'Email': item.email
    };
  }));
  console.log('='.repeat(60));
}

function getFeedbackCount() {
  var meta = getFeedbackMetadata();
  return meta.totalCount || 0;
}

// ============================================================
// 9. DELETE FUNCTIONS
// ============================================================

function deleteFeedback(feedbackId) {
  var allData = getAllFeedbackFromStorage();
  var filteredData = allData.filter(function(item) {
    return item.id !== feedbackId;
  });
  
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(filteredData));
  updateFeedbackMetadata(filteredData.length);
  
  console.log('[feedback.js] Feedback deleted:', feedbackId);
}

function clearAllFeedback() {
  if (!confirm('සියලු feedback දත්ත delete කිරීමට ඔබට විශ්වාසද?')) {
    return;
  }
  
  localStorage.removeItem(FEEDBACK_STORAGE_KEY);
  localStorage.removeItem(FEEDBACK_META_KEY);
  
  console.log('[feedback.js] All feedback cleared');
  showFeedbackMessage('සියලු දත්ත delete කරන ලදී', 'success');
}

// ============================================================
// 10. UTILITY FUNCTIONS
// ============================================================

function generateFeedbackId() {
  var timestamp = Date.now().toString(36);
  var random = Math.random().toString(36).substring(2, 8);
  return 'FB-' + timestamp + '-' + random;
}

function isValidEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function getFeedbackTypeLabel(type) {
  var labels = {
    'bug': '🐞 දෝෂයක්',
    'suggestion': '💡 යෝජනාවක්',
    'content': '📖 අන්තර්ගතය ගැන',
    'design': '🎨 නිර්මාණය ගැන',
    'praise': '👏 ප්‍රශංසාවක්',
    'other': '📝 වෙනත්'
  };
  return labels[type] || 'වෙනත්';
}

function formatDate(date) {
  var d = new Date(date);
  var year = d.getFullYear();
  var month = String(d.getMonth() + 1).padStart(2, '0');
  var day = String(d.getDate()).padStart(2, '0');
  var hours = String(d.getHours()).padStart(2, '0');
  var minutes = String(d.getMinutes()).padStart(2, '0');
  var seconds = String(d.getSeconds()).padStart(2, '0');
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}

function getDateStamp() {
  var d = new Date();
  var year = d.getFullYear();
  var month = String(d.getMonth() + 1).padStart(2, '0');
  var day = String(d.getDate()).padStart(2, '0');
  var hours = String(d.getHours()).padStart(2, '0');
  var minutes = String(d.getMinutes()).padStart(2, '0');
  return year + month + day + '-' + hours + minutes;
}

function escapeCSV(str) {
  if (str === null || str === undefined) return '';
  str = String(str);
  if (str.indexOf(',') !== -1 || str.indexOf('"') !== -1 || str.indexOf('\n') !== -1) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

// ============================================================
// 11. MESSAGE DISPLAY
// ============================================================

function showFeedbackMessage(message, type) {
  type = type || 'info';
  
  var colors = {
    'success': 'bg-green-500',
    'error': 'bg-red-500',
    'info': 'bg-blue-500',
    'warning': 'bg-yellow-500'
  };
  
  var icons = {
    'success': 'fa-check-circle',
    'error': 'fa-exclamation-circle',
    'info': 'fa-info-circle',
    'warning': 'fa-exclamation-triangle'
  };
  
  var toast = document.createElement('div');
  toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] ' + 
                    (colors[type] || colors.info) + 
                    ' text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-bold';
  toast.style.animation = 'slideDown 0.3s ease-out';
  toast.innerHTML = '<i class="fa-solid ' + (icons[type] || icons.info) + '"></i> ' + message;
  
  if (!document.getElementById('feedback-toast-animation')) {
    var style = document.createElement('style');
    style.id = 'feedback-toast-animation';
    style.innerHTML = '@keyframes slideDown { from { opacity: 0; transform: translate(-50%, -20px); } to { opacity: 1; transform: translate(-50%, 0); } }';
    document.head.appendChild(style);
  }
  
  document.body.appendChild(toast);
  
  setTimeout(function() {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, -20px)';
    setTimeout(function() {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

// ============================================================
// 12. KEYBOARD SHORTCUTS
// ============================================================

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    var modal = document.getElementById('feedback-modal');
    if (modal && !modal.classList.contains('hidden')) {
      closeFeedbackModal();
    }
  }
});

document.addEventListener('click', function(event) {
  var modal = document.getElementById('feedback-modal');
  if (!modal) return;
  
  if (event.target === modal) {
    closeFeedbackModal();
  }
});

// ============================================================
// 13. WINDOW EXPORTS
// ============================================================
window.openFeedbackModal = openFeedbackModal;
window.closeFeedbackModal = closeFeedbackModal;
window.submitFeedback = submitFeedback;
window.downloadFeedbackAsJSON = downloadFeedbackAsJSON;
window.downloadFeedbackAsCSV = downloadFeedbackAsCSV;
window.copyFeedbackToClipboard = copyFeedbackToClipboard;
window.viewAllFeedback = viewAllFeedback;
window.getFeedbackCount = getFeedbackCount;
window.deleteFeedback = deleteFeedback;
window.clearAllFeedback = clearAllFeedback;

// ============================================================
// 14. INITIALIZATION
// ============================================================
(function initFeedback() {
  var existingData = getAllFeedbackFromStorage();
  var meta = getFeedbackMetadata();
  
  console.log('[feedback.js] Loaded successfully');
  console.log('[feedback.js] Total feedback items:', existingData.length);
  console.log('[feedback.js] Last updated:', meta.lastUpdatedFormatted || 'Never');
  
  if (isEmailConfigured()) {
    console.log('[feedback.js] ✅ EmailJS configured');
    loadEmailJS(retryPendingFeedback);
  } else {
    console.warn('[feedback.js] ⚠️ EmailJS NOT configured - TEMPLATE_ID (template_...) සකසන්න');
  }

  console.log('');
  console.log('%c📋 FEEDBACK CONSOLE COMMANDS', 'background: #f59e0b; color: #3f0a0c; padding: 4px 8px; border-radius: 4px; font-weight: bold;');
  console.log('');
  console.log('%cviewAllFeedback()', 'color: #10b981; font-weight: bold;', '       → සියලු feedback Console එකේ පෙන්වයි');
  console.log('%cdownloadFeedbackAsJSON()', 'color: #10b981; font-weight: bold;', ' → JSON ගොනුවක් ලෙස download කරයි');
  console.log('%cdownloadFeedbackAsCSV()', 'color: #10b981; font-weight: bold;', '  → CSV ගොනුවක් ලෙස download කරයි');
  console.log('%ccopyFeedbackToClipboard()', 'color: #10b981; font-weight: bold;', '→ Clipboard එකට copy කරයි');
  console.log('%cgetFeedbackCount()', 'color: #10b981; font-weight: bold;', '       → මුළු සංඛ්‍යාව පෙන්වයි');
  console.log('%cclearAllFeedback()', 'color: #ef4444; font-weight: bold;', '        → සියලු දත්ත delete කරයි');
  console.log('');
})();