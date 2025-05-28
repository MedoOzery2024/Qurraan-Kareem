
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

// ----------- الأحاديث النبوية API ---------
async function getHadithFromFawazahmed0(edition = "ara-bukhari", hadithNumber = 1) {
    const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${edition}/${hadithNumber}.json`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.hadith) {
            console.log(`\nحديث من fawazahmed0/hadith-api (${edition}):`);
            console.log(`الكتاب: ${edition}, رقم الحديث: ${hadithNumber}`);
            console.log(`الحديث: ${data.hadith}`);
        } else {
            console.log("لم يتم العثور على الحديث أو بيانات غير صالحة.");
        }
    } catch (error) {
        console.error("حدث خطأ في جلب الحديث:", error);
    }
}

// مثال: الحصول على الحديث الأول من صحيح البخاري (بالعربية)
getHadithFromFawazahmed0("ara-bukhari", 1);
getHadithFromFawazahmed0("ara-bukhari", 2);
// ----------- الأذكار والأدعية -----------

async function getQuranicDuasFromAlQuranVip() {
    const url = "https://alquran.vip/APIs/duas";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.quran_duas) {
            console.log("\nأدعية قرآنية من AlQuran.vip:");
            data.quran_duas.forEach(dua => {
                console.log(`ID: ${dua.id}`);
                console.log(`النص: ${dua.text}`);
                console.log("-".repeat(30));
            });
        } else {
            console.log("لم يتم العثور على أدعية قرآنية أو بيانات غير صالحة.");
        }
    } catch (error) {
        console.error("حدث خطأ في جلب الأدعية القرآنية:", error);
    }
}

// قد لا يكون هذا المسار موجودًا للأذكار اليومية بشكل منفصل
// عادةً ما تكون الأذكار جزءًا من API أكبر أو ضمن نفس بيانات الأدعية
async function getDailyAzkarFromAlQuranVip() {
    const url = "https://alquran.vip/APIs/duas"; // قد تحتاج للبحث عن مسار specific للأذكار
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.home_azkar) { // تحقق إذا كان المفتاح 'home_azkar' موجودًا
            console.log("\nأذكار يومية من AlQuran.vip (إذا كانت متاحة):");
            data.home_azkar.forEach(azkar => {
                console.log(`ID: ${azkar.id}`);
                console.log(`النص: ${azkar.text}`);
                console.log(`العدد: ${azkar.count}`);
                console.log("-".repeat(30));
            });
        } else {
            console.log("لم يتم العثور على أذكار يومية أو بيانات غير صالحة.");
        }
    } catch (error) {
        console.error("حدث خطأ في جلب الأذكار اليومية:", error);
    }
}

getQuranicDuasFromAlQuranVip();
getDailyAzkarFromAlQuranVip();
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
