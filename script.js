
// ----------- عرض الأقسام -----------
function showSection(id) {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

// ----------- القرآن الكريم API -----------
const quranSurahSelector = document.getElementById('surah-selector');
const ayahsDiv = document.getElementById('ayahs');
function loadQuranSurahs() {
    quranSurahSelector.innerHTML = '<option>جاري التحميل...</option>';
    ayahsDiv.innerHTML = '';
    fetch('https://api.quran.com/api/v4/chapters?language=ar')
        .then(res => res.json())
        .then(data => {
            quranSurahSelector.innerHTML = '';
            data.chapters.forEach(surah => {
                const option = document.createElement('option');
                option.value = surah.id;
                option.textContent = `${surah.id} - ${surah.name_arabic}`;
                quranSurahSelector.appendChild(option);
            });
            loadSurahAyahs(data.chapters[0].id);
        })
        .catch(() => {
            quranSurahSelector.innerHTML = '<option>تعذر الاتصال بالانترنت</option>';
            ayahsDiv.innerHTML = 'تعذر الاتصال بخدمة القرآن الكريم.';
        });
}
function loadSurahAyahs(surahId) {
    ayahsDiv.innerHTML = "جاري التحميل ...";
    fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`)
        .then(res => res.json())
        .then(data => {
            ayahsDiv.innerHTML = '';
            data.verses.forEach(ayah => {
                const ayahDiv = document.createElement('div');
                ayahDiv.innerHTML = `<span style="color:#1a7f5a;font-weight:bold">${ayah.verse_number}</span> - ${ayah.text_uthmani}`;
                ayahsDiv.appendChild(ayahDiv);
            });
        })
        .catch(() => {
            ayahsDiv.innerHTML = "تعذر جلب الآيات.";
        });
}
quranSurahSelector && quranSurahSelector.addEventListener('change', () => {
    loadSurahAyahs(quranSurahSelector.value);
});
window.addEventListener('DOMContentLoaded', loadQuranSurahs);

// ----------- الأحاديث النبوية API -----------
// جلب حديث معين من البخاري مثلا
fetch('https://api.hadith.sutanlab.id/books/bukhari/1')
  .then(res => res.json())
  .then(data => {
    const hadithText = data.data.contents.arab; // نص الحديث
    const source = data.data.book; // اسم الكتاب
  });
// ----------- الأذكار والأدعية -----------
// جلب أذكار الصباح
fetch('https://azkar-api.nawafdev.com/azkar?category=morning')
  .then(res => res.json())
  .then(data => {
    const morningAzkar = data.content; // مصفوفة الأذكار
  });
// ----------- مواقيت الصلاة API -----------
const cityInput = document.getElementById('city-input');
const getPrayerBtn = document.getElementById('get-prayer-times');
const prayerResult = document.getElementById('prayer-reult');
getPrayerBtn && (getPrayerBtn.onclick = () => {
    const city = cityInput.value.trim() || "Cairo";
    prayerResult.textContent = "جاري التحميل ...";
    fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=Egypt&method=5`)
        .then(res => res.json())
        .then(data => {
            if (!data.data) {prayerResult.textContent = "تعذر جلب المواقيت"; return;}
            const t = data.data.timings;
            prayerResult.innerHTML = `
                <b>مواقيت الصلاة في ${city} اليوم:</b><br>
                الفجر: ${t.Fajr} | الشروق: ${t.Sunrise}<br>
                الظهر: ${t.Dhuhr} | العصر: ${t.Asr}<br>
                المغرب: ${t.Maghrib} | العشاء: ${t.Isha}`;
        })
        .catch(() => {
            prayerResult.textContent = "تعذر الاتصال بخدمة المواقيت.";
        });
});

// ----------- السبحة الإلكترونية -----------
const sebhaType = document.getElementById('sebha-type');
const sebhaCount = document.getElementById('sebha-count');
const sebhaIncrement = document.getElementById('sebha-increment');
const sebhaReset = document.getElementById('sebha-reset');
let count = 0;
sebhaIncrement && (sebhaIncrement.onclick = () => {
    count++;
    sebhaCount.textContent = count;
});
sebhaReset && (sebhaReset.onclick = () => {
    count = 0;
    sebhaCount.textContent = count;
});
sebhaType && sebhaType.addEventListener('change', () => {
    count = 0;
    sebhaCount.textContent = count;
});
