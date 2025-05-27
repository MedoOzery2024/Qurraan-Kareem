// ===== البيانات والمحتوى =====

// بيانات السور
const surahs = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatiha", verses: 7, type: "مكية" },
  { number: 2, name: "البقرة", englishName: "Al-Baqara", verses: 286, type: "مدنية" },
  { number: 3, name: "آل عمران", englishName: "Aal-E-Imran", verses: 200, type: "مدنية" },
  { number: 4, name: "النساء", englishName: "An-Nisa", verses: 176, type: "مدنية" },
  { number: 5, name: "المائدة", englishName: "Al-Maeda", verses: 120, type: "مدنية" },
  { number: 6, name: "الأنعام", englishName: "Al-Anaam", verses: 165, type: "مكية" },
  { number: 7, name: "الأعراف", englishName: "Al-Araf", verses: 206, type: "مكية" },
  { number: 8, name: "الأنفال", englishName: "Al-Anfal", verses: 75, type: "مدنية" },
  { number: 9, name: "التوبة", englishName: "At-Tawba", verses: 129, type: "مدنية" },
  { number: 10, name: "يونس", englishName: "Yunus", verses: 109, type: "مكية" },
  // يمكن إضافة باقي السور هنا
];

// بيانات الأحاديث
const hadithData = {
  daily: [
    {
      text: "قال رسول الله صلى الله عليه وسلم: \"من قال حين يصبح: اللهم أصبحنا منك وإليك وبك ولك، اللهم ما أصابنا من نعمة فمنك وحدك لا شريك لك\"",
      source: "رواه أبو داود"
    },
    {
      text: "قال رسول الله صلى الله عليه وسلم: \"من قال لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير، في يوم مائة مرة\"",
      source: "رواه البخاري ومسلم"
    }
  ],
  prayer: [
    {
      text: "قال رسول الله صلى الله عليه وسلم: \"الصلاة خير موضوع فمن استطاع أن يستكثر فليستكثر\"",
      source: "رواه الطبراني"
    }
  ],
  akhlaq: [
    {
      text: "قال رسول الله صلى الله عليه وسلم: \"إنما بعثت لأتمم مكارم الأخلاق\"",
      source: "رواه أحمد"
    }
  ],
  zakat: [
    {
      text: "قال رسول الله صلى الله عليه وسلم: \"ما نقصت صدقة من مال\"",
      source: "رواه مسلم"
    }
  ]
};

// بيانات الأدعية
const duaData = {
  morning: [
    {
      text: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
      source: "أذكار الصباح"
    },
    {
      text: "اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك النشور",
      source: "أذكار الصباح"
    }
  ],
  evening: [
    {
      text: "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
      source: "أذكار المساء"
    }
  ],
  sleep: [
    {
      text: "باسمك ربي وضعت جنبي، وبك أرفعه، إن أمسكت نفسي فارحمها، وإن أرسلتها فاحفظها بما تحفظ به عبادك الصالحين",
      source: "أذكار النوم"
    }
  ],
  general: [
    {
      text: "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار",
      source: "دعاء عام"
    }
  ]
};

// بيانات الأسماء الحسنى
const asmaAlHusna = [
  { arabic: "الله", meaning: "الاسم الأعظم" },
  { arabic: "الرحمن", meaning: "ذو الرحمة الواسعة" },
  { arabic: "الرحيم", meaning: "ذو الرحمة للمؤمنين" },
  { arabic: "الملك", meaning: "المالك لكل شيء" },
  { arabic: "القدوس", meaning: "المنزه عن النقائص" },
  { arabic: "السلام", meaning: "السالم من النقائص" },
  { arabic: "المؤمن", meaning: "المصدق لأنبيائه" },
  { arabic: "المهيمن", meaning: "الرقيب الحافظ" },
  { arabic: "العزيز", meaning: "القوي الغالب" },
  { arabic: "الجبار", meaning: "القاهر العظيم" },
  // يمكن إضافة باقي الأسماء الحسنى
];

// بيانات مواقيت الصلاة (مثال للمدن)
const prayerTimesData = {
  mecca: {
    fajr: "05:15",
    sunrise: "06:30",
    dhuhr: "12:20",
    asr: "15:45",
    maghrib: "18:15",
    isha: "19:45"
  },
  medina: {
    fajr: "05:10",
    sunrise: "06:25",
    dhuhr: "12:25",
    asr: "15:50",
    maghrib: "18:20",
    isha: "19:50"
  },
  riyadh: {
    fajr: "05:05",
    sunrise: "06:20",
    dhuhr: "12:15",
    asr: "15:40",
    maghrib: "18:10",
    isha: "19:40"
  },
  cairo: {
    fajr: "04:45",
    sunrise: "06:00",
    dhuhr: "11:55",
    asr: "15:20",
    maghrib: "17:50",
    isha: "19:20"
  },
  dubai: {
    fajr: "05:20",
    sunrise: "06:35",
    dhuhr: "12:25",
    asr: "15:50",
    maghrib: "18:20",
    isha: "19:50"
  }
};

// ===== المتغيرات العامة =====
let counters = {
  main: 0,
  subhanallah: 0,
  alhamdulillah: 0,
  allahu_akbar: 0,
  la_ilaha: 0,
  salat: 0,
  istighfar: 0
};

let currentZikr = 'سبحان الله';
let targetCount = 33;

// ===== وظائف التنقل =====
function showSection(sectionId) {
  // إخفاء جميع الأقسام
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  
  // إظهار القسم المطلوب
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }
  
  // تحديث شريط التنقل
  updateNavigation(sectionId);
  
  // تحميل محتوى القسم حسب الحاجة
  loadSectionContent(sectionId);
}

function updateNavigation(activeSection) {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${activeSection}`) {
      link.classList.add('active');
    }
  });
}

function loadSectionContent(sectionId) {
  switch(sectionId) {
    case 'quran':
      loadSurahList();
      break;
    case 'hadith':
      showHadithCategory('daily');
      break;
    case 'dua':
      showDuaCategory('morning');
      break;
    case 'prayer':
      updatePrayerTimes();
      break;
    case 'names':
      loadAsmaAlHusna();
      break;
    case 'sebha':
      loadSebhaCounters();
      break;
  }
}

// ===== وظائف القرآن الكريم =====
function loadSurahList() {
  const container = document.getElementById('surah-list-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  surahs.forEach(surah => {
    const surahDiv = document.createElement('div');
    surahDiv.className = 'surah-item';
    surahDiv.innerHTML = `
      <h4>${surah.number}. ${surah.name}</h4>
      <p>${surah.englishName} - ${surah.verses} آية - ${surah.type}</p>
    `;
    surahDiv.onclick = () => loadSurah(surah.number);
    container.appendChild(surahDiv);
  });
}

function searchSurah() {
  const searchTerm = document.getElementById('surah-search').value.toLowerCase();
  const surahItems = document.querySelectorAll('.surah-item');
  
  surahItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function loadSurah(surahNumber) {
  const content = document.getElementById('quran-content');
  if (!content) return;
  
  // في التطبيق الحقيقي، ستحتاج لاستدعاء API للحصول على نص السورة
  content.innerHTML = `
    <div class="surah-header">
      <h3>${surahs[surahNumber-1].name}</h3>
      <p>السورة رقم ${surahNumber} - ${surahs[surahNumber-1].verses} آية</p>
    </div>
    <div class="ayah-container">
      <div class="ayah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ (1)</div>
      <div class="ayah">هذا مثال على عرض الآيات - يجب ربطه بـ API للقرآن الكريم للحصول على النص الكامل</div>
    </div>
  `;
} 
// تحميل القرآن الكريم بالكامل
fetch('https://api.alquran.cloud/v1/quran/ar')
  .then(response => response.json())
  .then(data => {
    const quranContainer = document.getElementById("quran-section");
    data.data.surahs.forEach(surah => {
      const surahDiv = document.createElement("div");
      surahDiv.className = "surah";
      surahDiv.innerHTML = `<h3>${surah.name}</h3>`;
      surah.ayahs.forEach(ayah => {
        const ayahP = document.createElement("p");
        ayahP.textContent = `${ayah.numberInSurah}. ${ayah.text}`;
        surahDiv.appendChild(ayahP);
      });
      quranContainer.appendChild(surahDiv);
    });
  })
  .catch(err => console.error("حدث خطأ في جلب القرآن:", err))

async function fetchQuran() {
    try {
        const response = await fetch('https://api.alquran.cloud/v1/quran/ar.alafasy');
        const data = await response.json();
        if (data.status === "OK") {
            const surahs = data.data.surahs;
            const container = document.getElementById('quran-container');
            surahs.forEach(surah => {
                // اسم السورة
                const surahTitle = document.createElement('h2');
                surahTitle.textContent = `سورة ${surah.englishName} - ${surah.name}`;
                container.appendChild(surahTitle);
                // آيات السورة
                surah.ayahs.forEach(ayah => {
                    const ayahElem = document.createElement('p');
                    ayahElem.textContent = `${ayah.text} (${ayah.numberInSurah})`;
                    container.appendChild(ayahElem);
                });
            });
        }
    } catch (error) {
        console.error('حدث خطأ أثناء جلب القرآن:', error);
    }
}
// ===== وظائف الأحاديث =====
function showHadithCategory(category) {
  const content = document.getElementById('hadith-content');
  const buttons = document.querySelectorAll('.hadith-categories .category-btn');
  
  if (!content) return;
  
  // تحديث الأزرار
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // عرض الأحاديث
  const hadiths = hadithData[category] || [];
  content.innerHTML = '';
  
  hadiths.forEach(hadith => {
    const hadithDiv = document.createElement('div');
    hadithDiv.className = 'hadith-item';
    hadithDiv.innerHTML = `
      <div class="hadith-text">${hadith.text}</div>
      <div class="hadith-source">${hadith.source}</div>
    `;
    content.appendChild(hadithDiv);
  });
}
async function fetchHadith() {
    try {
        // تحتاج مفتاح API من https://api.sunnah.com/
        const response = await fetch('https://api.sunnah.com/v1/collections/bukhari/books/1/hadiths', {
            headers: {
                'X-API-Key': 'YOUR_API_KEY' // ضع مفتاحك هنا
            }
        });
        const data = await response.json();
        const container = document.getElementById('hadith-container');
        data.data.hadiths.forEach(hadith => {
            const hadithElem = document.createElement('p');
            hadithElem.textContent = hadith.hadith[0].text;
            container.appendChild(hadithElem);
        });
    } catch (error) {
        console.error('حدث خطأ أثناء جلب الحديث:', error);
    }
}
// ===== وظائف الأدعية =====
function showDuaCategory(category) {
  const content = document.getElementById('dua-content');
  const buttons = document.querySelectorAll('.dua-categories .category-btn');
  
  if (!content) return;
  
  // تحديث الأزرار
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // عرض الأدعية
  const duas = duaData[category] || [];
  content.innerHTML = '';
  
  duas.forEach(dua => {
    const duaDiv = document.createElement('div');
    duaDiv.className = 'dua-item';
    duaDiv.innerHTML = `
      <div class="dua-text">${dua.text}</div>
      <div class="dua-source">${dua.source}</div>
    `;
    content.appendChild(duaDiv);
  });
}

// ===== وظائف السبحة الإلكترونية =====
function loadSebhaCounters() {
  // تحميل العدادات المحفوظة
  const savedCounters = localStorage.getItem('sebhaCounters');
  if (savedCounters) {
    counters = JSON.parse(savedCounters);
    updateAllCounters();
  }
}

function incrementMainCounter() {
  counters.main++;
  document.getElementById('main-counter').textContent = counters.main;
  
  // تحديث العداد الحالي
  if (currentZikr === 'سبحان الله') {
    count('subhanallah');
  }
  
  saveCounters();
}

function count(zikrType) {
  counters[zikrType]++;
  document.getElementById(zikrType).textContent = counters[zikrType];
  
  // تشغيل صوت أو اهتزاز (إذا كان متاحاً)
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
  
  saveCounters();
}

function resetCounts() {
  if (confirm('هل تريد إعادة تعيين جميع العدادات؟')) {
    for (let key in counters) {
      counters[key] = 0;
    }
    updateAllCounters();
    saveCounters();
  }
}

function setTarget() {
  const newTarget = prompt('حدد الهدف:', targetCount);
  if (newTarget && !isNaN(newTarget)) {
    targetCount = parseInt(newTarget);
    localStorage.setItem('targetCount', targetCount);
  }
}

function updateAllCounters() {
  document.getElementById('main-counter').textContent = counters.main;
  document.getElementById('subhanallah').textContent = counters.subhanallah;
  document.getElementById('alhamdulillah').textContent = counters.alhamdulillah;
  document.getElementById('allahu_akbar').textContent = counters.allahu_akbar;
  document.getElementById('la_ilaha').textContent = counters.la_ilaha;
  document.getElementById('salat').textContent = counters.salat;
  document.getElementById('istighfar').textContent = counters.istighfar;
}

function saveCounters() {
  localStorage.setItem('sebhaCounters', JSON.stringify(counters));
}

// ===== وظائف مواقيت الصلاة =====
function updatePrayerTimes() {
  const citySelect = document.getElementById('city-select');
  const prayerTimesContainer = document.getElementById('prayer-times');
  const nextPrayerInfo = document.getElementById('next-prayer-info');
  
  if (!citySelect || !prayerTimesContainer) return;
  
  const selectedCity = citySelect.value;
  const times = prayerTimesData[selectedCity];
  
  if (!times) return;
  
  // عرض مواقيت الصلاة
  prayerTimesContainer.innerHTML = `
    <div class="prayer-time">
      <h3>الفجر</h3>
      <div class="time">${times.fajr}</div>
    </div>
    <div class="prayer-time">
      <h3>الشروق</h3>
      <div class="time">${times.sunrise}</div>
    </div>
    <div class="prayer-time">
      <h3>الظهر</h3>
      <div class="time">${times.dhuhr}</div>
    </div>
    <div class="prayer-time">
      <h3>العصر</h3>
      <div class="time">${times.asr}</div>
    </div>
    <div class="prayer-time">
      <h3>المغرب</h3>
      <div class="time">${times.maghrib}</div>
    </div>
    <div class="prayer-time">
      <h3>العشاء</h3>
      <div class="time">${times.isha}</div>
    </div>
  `;
  
  // تحديد الصلاة القادمة
  updateNextPrayer(times);
}

function updateNextPrayer(times) {
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  const prayers = [
    { name: 'الفجر', time: times.fajr },
    { name: 'الظهر', time: times.dhuhr },
    { name: 'العصر', time: times.asr },
    { name: 'المغرب', time: times.maghrib },
    { name: 'العشاء', time: times.isha }
  ];
  
  let nextPrayer = prayers.find(prayer => prayer.time > currentTime);
  if (!nextPrayer) {
    nextPrayer = prayers[0]; // الفجر في اليوم التالي
  }
  
  const nextPrayerInfo = document.getElementById('next-prayer-info');
  if (nextPrayerInfo) {
    nextPrayerInfo.innerHTML = `
      <h4>${nextPrayer.name}</h4>
      <p>الوقت: ${nextPrayer.time}</p>
    `;
  }
}

// ===== وظائف الأسماء الحسنى =====
function loadAsmaAlHusna() {
  const container = document.getElementById('names-grid');
  if (!container) return;
  
  container.innerHTML = '';
  
  asmaAlHusna.forEach(name => {
    const nameDiv = document.createElement('div');
    nameDiv.className = 'name-card';
    nameDiv.innerHTML = `
      <div class="name-arabic">${name.arabic}</div>
      <div class="name-meaning">${name.meaning}</div>
    `;
    container.appendChild(nameDiv);
  });
}

// ===== وظائف القبلة =====
function findQibla() {
  if (!navigator.geolocation) {
    alert('خدمة تحديد الموقع غير متاحة في متصفحك');
    return;
  }
  
  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      calculateQiblaDirection(lat, lng);
    },
    error => {
      alert('تعذر الحصول على موقعك. يرجى التأكد من السماح بالوصول للموقع.');
    }
  );
}

function calculateQiblaDirection(lat, lng) {
  // إحداثيات مكة المكرمة
  const meccaLat = 21.4225;
  const meccaLng = 39.8262;
  
  // حساب الاتجاه
  const deltaLng = meccaLng - lng;
  const y = Math.sin(deltaLng * Math.PI / 180);
  const x = Math.cos(lat * Math.PI / 180) * Math.tan(meccaLat * Math.PI / 180) - 
            Math.sin(lat * Math.PI / 180) * Math.cos(deltaLng * Math.PI / 180);
  
  let qiblaAngle = Math.atan2(y, x) * 180 / Math.PI;
  qiblaAngle = (qiblaAngle + 360) % 360;
  
  // حساب المسافة
  const distance = calculateDistance(lat, lng, meccaLat, meccaLng);
  
  // تحديث الواجهة
  updateQiblaDisplay(qiblaAngle, distance);
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // نصف قطر الأرض بالكيلومتر
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function updateQiblaDisplay(angle, distance) {
  const needle = document.getElementById('compass-needle');
  const angleDisplay = document.getElementById('qibla-angle');
  const distanceDisplay = document.getElementById('distance-to-mecca');
  
  if (needle) {
    needle.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
  }
  
  if (angleDisplay) {
    angleDisplay.textContent = `زاوية القبلة: ${Math.round(angle)}°`;
  }
  
  if (distanceDisplay) {
    distanceDisplay.textContent = `المسافة إلى مكة: ${Math.round(distance)} كم`;
  }
}

// ===== وظائف القائمة المتنقلة =====
function toggleMobileMenu() {
  const navUl = document.querySelector('nav ul');
  if (navUl) {
    navUl.classList.toggle('show');
  }
}

// ===== وظائف التهيئة =====
function initializeApp() {
  // تحميل الصفحة الرئيسية
  showSection('home');
  
  // تحميل العدادات المحفوظة
  loadSebhaCounters();
  
  // تحميل الهدف المحفوظ
  const savedTarget = localStorage.getItem('targetCount');
  if (savedTarget) {
    targetCount = parseInt(savedTarget);
  }
  
  // تحديث مواقيت الصلاة كل دقيقة
  setInterval(updatePrayerTimes, 60000);
  
  console.log('تم تحميل الموقع بنجاح');
}

// ===== APIs للمحتوى الخارجي =====

// API للحصول على القرآن الكريم
async function fetchQuranData(surahNumber) {
  try {
    // يمكن استخدام API مثل القرآن الكريم API
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.asad`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('خطأ في جلب بيانات القرآن:', error);
    return null;
  }
}

// API للحصول على مواقيت الصلاة
async function fetchPrayerTimes(city, country) {
  try {
    const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=4`);
    const data = await response.json();
    return data.data.timings;
  } catch (error) {
    console.error('خطأ في جلب مواقيت الصلاة:', error);
    return null;
  }
}

// API للحصول على الأحاديث
async function fetchHadith(collection, book, hadithNumber) {
  try {
    const response = await fetch(`https://api.hadith.gading.dev/${collection}/${book}/${hadithNumber}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('خطأ في جلب الحديث:', error);
    return null;
  }
}

// ===== تشغيل التطبيق =====
document.addEventListener('DOMContentLoaded', initializeApp);

// تصدير الوظائف للاستخدام العام
window.showSection = showSection;
window.searchSurah = searchSurah;
window.showHadithCategory = showHadithCategory;
window.showDuaCategory = showDuaCategory;
window.incrementMainCounter = incrementMainCounter;
window.count = count;
window.resetCounts = resetCounts;
window.setTarget = setTarget;
window.updatePrayerTimes = updatePrayerTimes;
window.findQibla = findQibla;
window.toggleMobileMenu = toggleMobileMenu;
window.onload = function() {
    fetchQuran();
