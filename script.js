
let counter = 0;

function tasbeeh(text) {
    counter++;
    document.getElementById('counter').textContent = `العدد: ${counter}`;
    alert(text);
}

// Mock data for prayer times
function displayPrayerTimes() {
    const prayerTimesDiv = document.getElementById('prayer-times-content');
    prayerTimesDiv.innerHTML = ''; // Clear previous content

    const mockPrayerTimes = {
        "Fajr": "05:00 AM",
        "Dhuhr": "12:00 PM",
        "Asr": "03:30 PM",
        "Maghrib": "06:00 PM",
        "Isha": "07:30 PM"
    };

    for (const [prayer, time] of Object.entries(mockPrayerTimes)) {
        const prayerElement = document.createElement('p');
        prayerElement.textContent = `${prayer}: ${time}`;
        prayerTimesDiv.appendChild(prayerElement);
    }
}

// Mock data for Quran
function displayQuran() {
    const quranDiv = document.getElementById('quran-content');
    quranDiv.innerHTML = ''; // Clear previous content

    const mockSurahs = [
        {
            name: "الفاتحة",
            englishName: "Al-Fatiha",
            ayahs: [
                { text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", tafsir: "التفسير: هذه الآية هي بداية كل سورة في القرآن الكريم." },
                { text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", tafsir: "التفسير: الحمد لله رب العالمين." }
            ]
        },
        {
            name: "البقرة",
            englishName: "Al-Baqara",
            ayahs: [
                { text: "الم", tafsir: "التفسير: هذه الحروف المقطعة لها معاني خاصة." },
                { text: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ", tafsir: "التفسير: هذا الكتاب لا ريب فيه هدى للمتقين." }
            ]
        }
    ];

    for (const surah of mockSurahs) {
        const surahElement = document.createElement('div');
        surahElement.innerHTML = `<h3>${surah.name} (${surah.englishName})</h3>`;
        quranDiv.appendChild(surahElement);

        for (const ayah of surah.ayahs) {
            const ayahElement = document.createElement('p');
            ayahElement.textContent = `${ayah.text}`;
            surahElement.appendChild(ayahElement);

            const tafsirElement = document.createElement('p');
            tafsirElement.textContent = `التفسير: ${ayah.tafsir}`;
            tafsirElement.style.fontStyle = 'italic';
            surahElement.appendChild(tafsirElement);
        }
    }
}

// Mock data for Hadith
function displayHadith() {
    const hadithDiv = document.getElementById('hadith-content');
    hadithDiv.innerHTML = ''; // Clear previous content

    const mockHadiths = [
        { text: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى.", narrator: "عمر بن الخطاب" },
        { text: "من حسن إسلام المرء تركه ما لا يعنيه.", narrator: "أبو هريرة" }
    ];

    mockHadiths.forEach(hadith => {
        const hadithElement = document.createElement('div');
        hadithElement.innerHTML = `<p>${hadith.text}</p><p><strong>الراوي:</strong> ${hadith.narrator}</p>`;
        hadithDiv.appendChild(hadithElement);
    });
}

// Mock data for Dua
function displayDua() {
    const duaDiv = document.getElementById('dua-content');
    duaDiv.innerHTML = ''; // Clear previous content

    const mockDua = {
        content: "اللهم إني أسألك العفو والعافية في الدنيا والآخرة. اللهم إني أسألك العفو والعافية في ديني ودنياي وأهلي ومالي.",
        source: "صحيح البخاري"
    };

    const duaElement = document.createElement('div');
    duaElement.innerHTML = `<p>${mockDua.content}</p><p><strong>المصدر:</strong> ${mockDua.source}</p>`;
    duaDiv.appendChild(duaElement);
}

document.addEventListener('DOMContentLoaded', function() {
    displayPrayerTimes();
    displayQuran();
    displayHadith();
    displayDua();
});

