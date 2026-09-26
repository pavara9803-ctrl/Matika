// ============================================================
// feedback.js
// Feedback හා යෝජනා පද්ධතිය
// දත්ත LocalStorage එකේ ගබඩා වේ
// අභිධර්ම මාතිකා අධ්‍යයන යෙදුම
// ============================================================

// ============================================================
// 1. CONSTANTS
// ============================================================
const FEEDBACK_STORAGE_KEY = 'abhidhamma_feedback_data';
const FEEDBACK_META_KEY = 'abhidhamma_feedback_meta';

// ============================================================
// 2. MODAL OPEN/CLOSE
// ============================================================

/**
 * Feedback Modal එක විවෘත කරයි
 */
function openFeedbackModal() {
  var modal = document.getElementById('feedback-modal');
  if (!modal) {
    console.warn('[feedback.js] feedback-modal element not found');
    return;
  }
  
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // පෝරමය නැවත පිරිසිදු කරන්න
  resetFeedbackForm();
  
  // පළමු input එකට focus කරන්න
  setTimeout(function() {
    var firstInput = document.getElementById('feedback-type');
    if (firstInput) firstInput.focus();
  }, 100);
  
  console.log('[feedback.js] Feedback modal opened');
}

/**
 * Feedback Modal එක වසා දමයි
 */
function closeFeedbackModal() {
  var modal = document.getElementById('feedback-modal');
  if (!modal) return;
  
  modal.classList.add('hidden');
  document.body.style.overflow = '';
  
  console.log('[feedback.js] Feedback modal closed');
}

/**
 * පෝරමය නැවත පිරිසිදු කරයි
 */
function resetFeedbackForm() {
  var nameInput = document.getElementById('feedback-name');
  var typeInput = document.getElementById('feedback-type');
  var messageInput = document.getElementById('feedback-message');
  var emailInput = document.getElementById('feedback-email');
  
  if (nameInput) nameInput.value = '';
  if (typeInput) typeInput.value = '';
  if (messageInput) messageInput.value = '';
  if (emailInput) emailInput.value = '';
  
  // Submit බොත්තම නැවත සක්‍රීය කරන්න
  var submitBtn = document.getElementById('feedback-submit-btn');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> එවන්න';
  }
}

// ============================================================
// 3. FEEDBACK SUBMISSION
// ============================================================

/**
 * Feedback එක submit කරයි
 * දත්ත LocalStorage එකේ ගබඩා කරයි
 */
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
  
  // Required fields
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
  
  // Email validation (optional but if provided, must be valid)
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
  var feedbackData = {
    id: generateFeedbackId(),
    name: name || 'නම් නොකියූ',
    type: type,
    typeLabel: getFeedbackTypeLabel(type),
    message: message,
    email: email || 'නොමැත',
    timestamp: new Date().toISOString(),
    dateFormatted: formatDate(new Date()),
    userAgent: navigator.userAgent,
    language: navigator.language,
    pageUrl: window.location.href,
    screenSize: window.innerWidth + 'x' + window.innerHeight,
    version: '1.0.0'
  };
  
  // ========== 5. LOCALSTORAGE එකේ SAVE කරන්න ==========
  try {
    saveFeedbackToStorage(feedbackData);
    
    // ========== 6. SUCCESS MESSAGE ==========
    setTimeout(function() {
      showFeedbackMessage('ඔබගේ අදහස් සාර්ථකව ලැබුණි! ස්තූතියි 🙏', 'success');
      
      // Modal එක 2.5s පසුව වසා දමන්න
      setTimeout(function() {
        closeFeedbackModal();
      }, 2000);
      
    }, 500);
    
    console.log('[feedback.js] Feedback saved:', feedbackData);
    
  } catch (error) {
    console.error('[feedback.js] Error saving feedback:', error);
    
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> එවන්න';
    }
    
    showFeedbackMessage('දෝෂයක් ඇතිවිය. කරුණාකර නැවත උත්සාහ කරන්න.', 'error');
  }
}

// ============================================================
// 4. STORAGE FUNCTIONS
// ============================================================

/**
 * Feedback දත්ත LocalStorage එකේ ගබඩා කරයි
 */
function saveFeedbackToStorage(feedbackData) {
  // පවතින දත්ත ලබා ගන්න
  var existingData = getAllFeedbackFromStorage();
  
  // නව දත්ත එකතු කරන්න
  existingData.push(feedbackData);
  
  // LocalStorage එකේ save කරන්න
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(existingData));
  
  // Metadata update කරන්න
  updateFeedbackMetadata(existingData.length);
  
  console.log('[feedback.js] Total feedback items:', existingData.length);
}

/**
 * සියලු feedback දත්ත ලබා ගනී
 */
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

/**
 * Metadata update කරයි
 */
function updateFeedbackMetadata(count) {
  var meta = {
    totalCount: count,
    lastUpdated: new Date().toISOString(),
    lastUpdatedFormatted: formatDate(new Date())
  };
  localStorage.setItem(FEEDBACK_META_KEY, JSON.stringify(meta));
}

/**
 * Feedback Metadata ලබා ගනී
 */
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
// 5. EXPORT/DOWNLOAD FUNCTIONS
// ============================================================

/**
 * සියලු feedback දත්ත JSON ගොනුවක් ලෙස download කරයි
 */
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

/**
 * සියලු feedback දත්ත CSV ගොනුවක් ලෙස download කරයි
 */
function downloadFeedbackAsCSV() {
  var allData = getAllFeedbackFromStorage();
  
  if (allData.length === 0) {
    showFeedbackMessage('Download කිරීමට දත්ත නොමැත', 'error');
    return;
  }
  
  // CSV header
  var headers = ['ID', 'Date', 'Name', 'Type', 'Message', 'Email', 'Language', 'Page URL'];
  var csvRows = [headers.join(',')];
  
  // CSV rows
  allData.forEach(function(item) {
    var row = [
      escapeCSV(item.id),
      escapeCSV(item.dateFormatted),
      escapeCSV(item.name),
      escapeCSV(item.typeLabel),
      escapeCSV(item.message),
      escapeCSV(item.email),
      escapeCSV(item.language),
      escapeCSV(item.pageUrl)
    ];
    csvRows.push(row.join(','));
  });
  
  var csvString = '\uFEFF' + csvRows.join('\n'); // BOM for UTF-8
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

/**
 * සියලු feedback දත්ත Clipboard එකට copy කරයි
 */
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

/**
 * Fallback clipboard copy
 */
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
// 6. VIEW FEEDBACK FUNCTIONS
// ============================================================

/**
 * සියලු feedback දත්ත Console එකේ පෙන්වයි
 */
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

/**
 * Feedback සංඛ්‍යාව ලබා දෙයි
 */
function getFeedbackCount() {
  var meta = getFeedbackMetadata();
  return meta.totalCount || 0;
}

// ============================================================
// 7. DELETE FUNCTIONS
// ============================================================

/**
 * එක් feedback එකක් delete කරයි
 */
function deleteFeedback(feedbackId) {
  var allData = getAllFeedbackFromStorage();
  var filteredData = allData.filter(function(item) {
    return item.id !== feedbackId;
  });
  
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(filteredData));
  updateFeedbackMetadata(filteredData.length);
  
  console.log('[feedback.js] Feedback deleted:', feedbackId);
}

/**
 * සියලු feedback දත්ත delete කරයි
 */
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
// 8. UTILITY FUNCTIONS
// ============================================================

/**
 * නව Feedback ID එකක් සාදයි
 */
function generateFeedbackId() {
  var timestamp = Date.now().toString(36);
  var random = Math.random().toString(36).substring(2, 8);
  return 'FB-' + timestamp + '-' + random;
}

/**
 * ඊමේල් ලිපිනය වලංගු ද පරීක්ෂා කරයි
 */
function isValidEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Feedback වර්ගයේ ලේබලය ලබා දෙයි
 */
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

/**
 * දිනය format කරයි
 */
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

/**
 * දිනය stamp එකක් සාදයි (file name සඳහා)
 */
function getDateStamp() {
  var d = new Date();
  var year = d.getFullYear();
  var month = String(d.getMonth() + 1).padStart(2, '0');
  var day = String(d.getDate()).padStart(2, '0');
  var hours = String(d.getHours()).padStart(2, '0');
  var minutes = String(d.getMinutes()).padStart(2, '0');
  return year + month + day + '-' + hours + minutes;
}

/**
 * CSV සඳහා escape කරයි
 */
function escapeCSV(str) {
  if (str === null || str === undefined) return '';
  str = String(str);
  if (str.indexOf(',') !== -1 || str.indexOf('"') !== -1 || str.indexOf('\n') !== -1) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

// ============================================================
// 9. MESSAGE DISPLAY
// ============================================================

/**
 * පණිවිඩයක් පෙන්වයි (modal එක ඇතුළේ)
 */
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
  
  // Animation style එක එකතු කරන්න (එක් වරක් පමණි)
  if (!document.getElementById('feedback-toast-animation')) {
    var style = document.createElement('style');
    style.id = 'feedback-toast-animation';
    style.innerHTML = '@keyframes slideDown { from { opacity: 0; transform: translate(-50%, -20px); } to { opacity: 1; transform: translate(-50%, 0); } }';
    document.head.appendChild(style);
  }
  
  document.body.appendChild(toast);
  
  // 3 seconds පසුව ඉවත් කරන්න
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
// 10. KEYBOARD SHORTCUTS
// ============================================================

/**
 * ESC යතුර එබූ විට modal එක වසා දමයි
 */
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    var modal = document.getElementById('feedback-modal');
    if (modal && !modal.classList.contains('hidden')) {
      closeFeedbackModal();
    }
  }
});

/**
 * Modal එකේ එළියේ click කළ විට වසා දමයි
 */
document.addEventListener('click', function(event) {
  var modal = document.getElementById('feedback-modal');
  if (!modal) return;
  
  if (event.target === modal) {
    closeFeedbackModal();
  }
});

// ============================================================
// 11. WINDOW EXPORTS
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
// 12. INITIALIZATION
// ============================================================
(function initFeedback() {
  // පවතින දත්ත පරීක්ෂා කරන්න
  var existingData = getAllFeedbackFromStorage();
  var meta = getFeedbackMetadata();
  
  console.log('[feedback.js] Loaded successfully');
  console.log('[feedback.js] Total feedback items:', existingData.length);
  console.log('[feedback.js] Last updated:', meta.lastUpdatedFormatted || 'Never');
  
  // පරිශීලකයාට console commands පෙන්වන්න
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