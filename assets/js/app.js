/* ============================================================
   අභිධර්ම මාතිකා - Application Logic (app.js)
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // ONLINE/OFFLINE INDICATOR
  // ============================================================
  function updateOnlineStatus() {
    var indicator = document.getElementById('offline-indicator');
    if (!indicator) return;
    if (navigator.onLine) {
      indicator.classList.remove('show');
    } else {
      indicator.classList.add('show');
    }
  }
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  // SERVICE WORKER ලියාපදිංචිය සහ යාවත්කාලීන දැනුම්දීම: assets/js/sw-update.js බලන්න

  // ============================================================
  // NAVIGATION
  // ============================================================
  var currentView = 'home';

  function initApp() {
    updateOnlineStatus();
    checkIfInstalled();
    console.log('[App] Initialized');
  }

  window.navigateTo = function (viewName) {
    currentView = viewName;
    var sections = document.querySelectorAll('#view-container > section');
    sections.forEach(function (sec) { sec.classList.add('hidden'); });
    var targetSec = document.getElementById('view-' + viewName);
    if (targetSec) targetSec.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ============================================================
  // MENU
  // ============================================================
  window.toggleMenu = function () {
    var menu = document.getElementById('custom-menu');
    if (menu) menu.classList.toggle('hidden');
  };

  document.addEventListener('click', function (event) {
    var menu = document.getElementById('custom-menu');
    if (!menu) return;
    var menuBtn = event.target.closest('button[onclick="toggleMenu()"]');
    if (!menu.contains(event.target) && !menuBtn && !menu.classList.contains('hidden')) {
      menu.classList.add('hidden');
    }
  });

  // ============================================================
  // RATE APP
  // ============================================================
  var APP_PACKAGE_NAME = 'com.abhidhamma.matika';

  function rateThisApp() {
    var playStoreUrl = 'https://play.google.com/store/apps/details?id=' + APP_PACKAGE_NAME;
    try {
      if (/android/i.test(navigator.userAgent)) {
        window.location.href = 'market://details?id=' + APP_PACKAGE_NAME;
        setTimeout(function () { window.location.href = playStoreUrl; }, 1500);
      } else {
        window.open(playStoreUrl, '_blank');
      }
    } catch (e) {
      window.open(playStoreUrl, '_blank');
    }
  }

  // ============================================================
  // SHARE APP
  // ============================================================
  function shareThisApp() {
    var shareData = {
      title: 'අභිධර්ම මාතිකා අධ්‍යයනය',
      text: 'අභිධර්ම මාතිකා අධ්‍යයනය සඳහා වූ මෙම යෙදුම භාවිතා කර බලන්න.',
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(shareData).catch(function (err) {
        if (err.name !== 'AbortError') fallbackShare(shareData);
      });
    } else {
      fallbackShare(shareData);
    }
  }

  function fallbackShare(shareData) {
    var text = shareData.title + '\n\n' + shareData.text + '\n\n' + shareData.url;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showShareToast('✅ Link එක copy කරන ලදී!', 'success');
      }).catch(function () { showManualShareDialog(text); });
    } else {
      showManualShareDialog(text);
    }
  }

  function showManualShareDialog(text) {
    var modal = document.createElement('div');
    modal.id = 'share-modal';
    modal.className = 'fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4';
    modal.innerHTML =
      '<div class="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4">' +
        '<textarea readonly rows="6" id="share-text-area" class="w-full p-3 rounded-lg border text-xs">' + text + '</textarea>' +
        '<button onclick="closeShareModal()" class="px-4 py-2 bg-slate-200 rounded-lg text-xs">වසන්න</button>' +
      '</div>';
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
  }

  window.closeShareModal = function () {
    var modal = document.getElementById('share-modal');
    if (modal) modal.remove();
    document.body.style.overflow = '';
  };

  function showShareToast(message, type) {
    type = type || 'info';
    var colors = { 'success': 'bg-green-500', 'error': 'bg-red-500', 'info': 'bg-blue-500' };
    var toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 z-[110] ' +
                      (colors[type] || colors.info) +
                      ' text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-bold';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
    }, 3000);
  }

  // ============================================================
  // PWA INSTALL
  // ============================================================
  var deferredInstallPrompt = null;
  var isAppInstalled = false;

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredInstallPrompt = e;
    console.log('[App] Install prompt available');
    showInstallButton();
  });

  function showInstallButton() {
    if (isAppInstalled) return;
    if (isStandalone()) return;
    if (isFromPlayStore()) return;
    var btn = document.getElementById('install-btn');
    if (btn) btn.classList.remove('hidden');
    var menuBtn = document.getElementById('menu-install-btn');
    if (menuBtn) menuBtn.classList.remove('hidden');
  }

  function hideInstallButton() {
    var btn = document.getElementById('install-btn');
    if (btn) btn.classList.add('hidden');
    var menuBtn = document.getElementById('menu-install-btn');
    if (menuBtn) menuBtn.classList.add('hidden');
  }

  function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true ||
           document.referrer.includes('android-app://');
  }

  function isFromPlayStore() {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('utm_source') === 'playstore' || urlParams.get('ref') === 'playstore') return true;
    if (localStorage.getItem('abhidhamma_installed') === 'true') return true;
    if (document.referrer &&
        (document.referrer.includes('play.google.com') ||
         document.referrer.includes('market://'))) return true;
    return false;
  }

  window.installApp = function () {
    if (!deferredInstallPrompt) {
      showInstallInstructions();
      return;
    }
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then(function (choiceResult) {
      if (choiceResult.outcome === 'accepted') {
        isAppInstalled = true;
        localStorage.setItem('abhidhamma_installed', 'true');
        hideInstallButton();
        showShareToast('✅ යෙදුම සාර්ථකව install කරන ලදී!', 'success');
      }
      deferredInstallPrompt = null;
    });
  };

  function showInstallInstructions() {
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    var isAndroid = /android/i.test(navigator.userAgent);
    var message = '';
    if (isIOS) {
      message = '📱 iOS උපාංගයේ install කිරීමට:\n\n1. Safari browser එකේ පහළ ඇති Share බොත්තම ඔබන්න\n2. "Add to Home Screen" තෝරන්න\n3. "Add" ඔබන්න';
    } else if (isAndroid) {
      message = '📱 Android උපාංගයේ install කිරීමට:\n\n1. Chrome browser එකේ ඉහළ දකුණේ ඇති ⋮ මෙනුව ඔබන්න\n2. "Install app" හෝ "Add to Home screen" තෝරන්න\n3. "Install" ඔබන්න';
    } else {
      message = '💻 Desktop එකේ install කිරීමට:\n\n1. Browser එකේ address bar එකේ ඇති install icon එක ඔබන්න\n2. හෝ browser මෙනුවෙන් "Install" තෝරන්න';
    }
    alert(message);
  }

  window.addEventListener('appinstalled', function () {
    isAppInstalled = true;
    localStorage.setItem('abhidhamma_installed', 'true');
    hideInstallButton();
    deferredInstallPrompt = null;
    var menu = document.getElementById('custom-menu');
    if (menu) menu.classList.add('hidden');
  });

  function checkIfInstalled() {
    if (isStandalone() || isFromPlayStore() || localStorage.getItem('abhidhamma_installed') === 'true') {
      isAppInstalled = true;
      hideInstallButton();
      return true;
    }
    return false;
  }

  window.matchMedia('(display-mode: standalone)').addEventListener('change', function (e) {
    if (e.matches) {
      isAppInstalled = true;
      hideInstallButton();
    }
  });

  // ============================================================
  // MENU ACTIONS
  // ============================================================
  window.menuAction = function (action) {
    var menu = document.getElementById('custom-menu');
    if (menu) menu.classList.add('hidden');
    switch (action) {
      case 'install': window.installApp(); break;
      case 'rate': rateThisApp(); break;
      case 'share': shareThisApp(); break;
      case 'star': rateThisApp(); break;
      case 'about': window.location.href = 'about.html'; break;
      case 'help': window.location.href = 'help.html'; break;
      case 'feedback':
        if (typeof window.openFeedbackModal === 'function') {
          window.openFeedbackModal();
        } else {
          alert('Feedback module loading...');
        }
        break;
    }
  };

  // ============================================================
  // THEME TOGGLE
  // ============================================================
  window.toggleDarkMode = function () {
    var html = document.documentElement;
    var icon = document.getElementById('theme-toggle-icon');
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('abhidhamma_theme', 'light');
      if (icon) icon.className = 'fa-solid fa-moon text-lg';
    } else {
      html.classList.add('dark');
      localStorage.setItem('abhidhamma_theme', 'dark');
      if (icon) icon.className = 'fa-solid fa-sun text-lg';
    }
  };

  if (localStorage.getItem('abhidhamma_theme') === 'dark' ||
      (!localStorage.getItem('abhidhamma_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    var themeIcon = document.getElementById('theme-toggle-icon');
    if (themeIcon) themeIcon.className = 'fa-solid fa-sun text-lg';
  }

  // ============================================================
  // INITIALIZE
  // ============================================================
  window.addEventListener('DOMContentLoaded', initApp);

})();