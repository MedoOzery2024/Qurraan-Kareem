
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
const hadithBook = document.getElementById('hadith-book');
const hadithNumber = document.getElementById('hadith-number');
const hadithText = document.getElementById('hadith-text');
function loadHadithBooks() {
    hadithBook.innerHTML = '<option>جاري التحميل...</option>';
    hadithNumber.innerHTML = '';
    hadithText.innerHTML = '';
    fetch('https://api.hadith.sutanlab.id/books')
        .then(res => res.json())
        .then(data => {
            hadithBook.innerHTML = '';
            data.data.forEach(book => {
                const option = document.createElement('option');
                option.value = book.id;
                option.textContent = book.name;
                hadithBook.appendChild(option);
            });
            loadHadithNumbers(hadithBook.value);
        })
        .catch(() => {
            hadithBook.innerHTML = '<option>تعذر التحميل</option>';
            hadithText.innerHTML = 'تعذر الاتصال بخدمة الأحاديث.';
        });
}
function loadHadithNumbers(bookId) {
    hadithNumber.innerHTML = '<option>جاري التحميل...</option>';
    fetch(`https://api.hadith.sutanlab.id/books/${bookId}?range=1-10`)
        .then(res => res.json())
        .then(data => {
            hadithNumber.innerHTML = '';
            for (let i = 1; i <= Math.min(data.data.total, 100); i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `حديث رقم ${i}`;
                hadithNumber.appendChild(option);
            }
            loadHadithText(bookId, 1);
        })
        .catch(() => {
            hadithNumber.innerHTML = '<option>تعذر التحميل</option>';
        });
}
function loadHadithText(bookId, number) {
    hadithText.textContent = "جاري التحميل ...";
    fetch(`https://api.hadith.sutanlab.id/books/${bookId}/${number}`)
        .then(res => res.json())
        .then(data => {
            hadithText.innerHTML = `<b>${data.data.contents.arab}</b><br><span style="color:#0da887">المصدر: ${data.data.book}</span>`;
        })
        .catch(() => {
            hadithText.innerHTML = 'تعذر تحميل الحديث.';
        });
}
hadithBook && hadithBook.addEventListener('change', () => loadHadithNumbers(hadithBook.value));
hadithNumber && hadithNumber.addEventListener('change', () => loadHadithText(hadithBook.value, hadithNumber.value));
window.addEventListener('DOMContentLoaded', loadHadithBooks);

// ----------- الأذكار والأدعية -----------
const azkarType = document.getElementById('azkar-type');
const azkarList = document.getElementById('azkar-list');
const azkarData = {
    morning: [
        "أصبحنا وأصبح الملك لله والحمد لله...",
        "اللهم بك أصبحنا وبك أمسينا...",
        "اللهم إني أصبحت أشهدك...",
        "اللهم ما أصبح بي من نعمة...",
        "اللهم عافني في بدني..."
    ],
    evening: [
        "أمسينا وأمسى الملك لله والحمد لله...",
        "اللهم بك أمسينا وبك أصبحنا...",
        "اللهم إني أمسيت أشهدك...",
        "اللهم ما أمسى بي من نعمة...",
        "اللهم عافني في بدني..."
    ],
    prayer: [
        "أستغفر الله",
        "اللهم أنت السلام ومنك السلام...",
        "سبحان الله (33 مرات)",
        "الحمد لله (33 مرات)",
        "الله أكبر (34 مرات)"
    ],
    dua: [
        "اللهم إني أسألك العفو والعافية...",
        "اللهم اهدني وسددني...",
        "ربنا آتنا في الدنيا حسنة...",
        "اللهم ارزقني علماً نافعاً...",
        "اللهم إنك عفو تحب العفو فاعف عني..."
    ]
};
function renderAzkar(type) {
    azkarList.innerHTML = "";
    azkarData[type].forEach(zkr => {
        const el = document.createElement('div');
        el.textContent = zkr;
        azkarList.appendChild(el);
    });
}
azkarType && azkarType.addEventListener('change', () => renderAzkar(azkarType.value));
window.addEventListener('DOMContentLoaded', () => {
    if (azkarType) renderAzkar(azkarType.value);
});

// ----------- مواقيت الصلاة API -----------
const cityInput = document.getElementById('city-input');
const getPrayerBtn = document.getElementById('get-prayer-times');
const prayerResult = document.getElementById('prayer-result');
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
