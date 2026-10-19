/* ============================================================
   matika-theme.js — පොදු වර්ණ හා අකුරු පද්ධතිය (Tailwind config augment)
   පිටුවේ tailwind.config සැකසූ පසු load වේ. අන්තර්ගතය වෙනස් නොකරයි.
   ============================================================ */
(function () {
  if (!window.tailwind) return;
  var c = window.tailwind.config || {};
  c.darkMode = 'class';
  c.theme = c.theme || {};
  var ext = c.theme.extend = c.theme.extend || {};
  var col = ext.colors = ext.colors || {};
  // පුස්කොළ (ola-leaf) පාට - slate වෙනුවට උණුසුම් දුඹුරු-අළු
  col.slate = {
    50: '#faf6f1', 100: '#f3ece4', 200: '#e5d9cd', 300: '#cdbcac', 400: '#a69281',
    500: '#7e6a5b', 600: '#5e4d41', 700: '#40332b', 800: '#2b211c', 900: '#1d1613', 950: '#130e0c'
  };
  col.saffron = col.saffron || {
    50:'#fffbeb',100:'#fef3c7',200:'#fde68a',300:'#fcd34d',400:'#fbbf24',500:'#f59e0b',
    600:'#d97706',700:'#b45309',800:'#92400e',900:'#78350f',950:'#451a03'
  };
  col.maroon = Object.assign({ 50:'#fbf1f1', 100:'#f5dcdc', 600:'#8a2326' }, col.maroon || { 700:'#701a1d',800:'#581113',900:'#3f0a0c',950:'#260507' });
  ext.fontFamily = Object.assign({}, ext.fontFamily, {
    sans: ['"Noto Serif Sinhala"', 'Inter', 'serif'],
    serif: ['"Abhaya Libre"', '"Noto Serif Sinhala"', 'serif'],
    display: ['"Abhaya Libre"', '"Noto Serif Sinhala"', 'serif']
  });
  window.tailwind.config = c;
})();
