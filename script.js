
let counter = 0;

function tasbeeh(text) {
    counter++;
    document.getElementById('counter').textContent = `العدد: ${counter}`;
    alert(text);
}

async function fetchPrayerTimes() {
    try {
        const response = await fetch('http://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5');
        const data = await response.json();
        displayPrayerTimes(data.data.timings);
    } catch (error) {
        console.error('Error fetching prayer times:', error);
    }
}

function displayPrayerTimes(timings) {
    const prayerTimesDiv = document.getElementById('prayer-times-content');
    prayerTimesDiv.innerHTML = ''; // Clear previous content
    for (const [prayer, time] of Object.entries(timings)) {
        const prayerElement = document.createElement('p');
        prayerElement.textContent = `${prayer}: ${time}`;
        prayerTimesDiv.appendChild(prayerElement);
    }
}

async function fetchQuran() {
    try {
        const response = await fetch('http://api.quran.com/api/v3/surahs');
        const data = await response.json();
        displayQuran(data.data);
    } catch (error) {
        console.error('Error fetching Quran:', error);
    }
}

async function fetchTafsir(ayahKey) {
    try {
        const response = await fetch(`http://api.quran.com/api/v3/tafsir/ayah/${ayahKey}`);
        const data = await response.json();
        return data.data.tafsir;
    } catch (error) {
        console.error('Error fetching Tafsir:', error);
        return 'لا يوجد تفسير متاح لهذه الآية.';
    }
}

async function displayQuran(surahs) {
    const quranDiv = document.getElementById('quran-content');
    quranDiv.innerHTML = ''; // Clear previous content
    for (const surah of surahs) {
        const surahElement = document.createElement('div');
        surahElement.innerHTML = `<h3>${surah.name} (${surah.englishName})</h3>`;
        quranDiv.appendChild(surahElement);

        for (const ayah of surah.ayahs) {
            const ayahElement = document.createElement('p');
            ayahElement.textContent = `${ayah.text}`;
            surahElement.appendChild(ayahElement);

            const tafsir = await fetchTafsir(ayah.ayahKey);
            const tafsirElement = document.createElement('p');
            tafsirElement.textContent = `التفسير: ${tafsir}`;
            tafsirElement.style.fontStyle = 'italic';
            surahElement.appendChild(tafsirElement);
        }
    }
}

async function fetchHadith() {
    try {
        const response = await fetch('https://hadithapi.com/api/hadiths?apiKey=YOUR_API_KEY');
        const data = await response.json();
        displayHadith(data.hadiths);
    } catch (error) {
        console.error('Error fetching Hadith:', error);
    }
}

function displayHadith(hadiths) {
    const hadithDiv = document.getElementById('hadith-content');
    hadithDiv.innerHTML = ''; // Clear previous content
    hadiths.forEach(hadith => {
        const hadithElement = document.createElement('div');
        hadithElement.innerHTML = `<p>${hadith.text}</p><p><strong>الراوي:</strong> ${hadith.narrator}</p>`;
        hadithDiv.appendChild(hadithElement);
    });
}

async function fetchDua() {
    try {
        const response = await fetch('https://hisnmuslim.com/api/ar/1.json');
        const data = await response.json();
        displayDua(data);
    } catch (error) {
        console.error('Error fetching Dua:', error);
    }
}

function displayDua(data) {
    const duaDiv = document.getElementById('dua-content');
    duaDiv.innerHTML = ''; // Clear previous content
    const duaElement = document.createElement('div');
    duaElement.innerHTML = `<p>${data.content}</p><p><strong>المصدر:</strong> ${data.source}</p>`;
    duaDiv.appendChild(duaElement);
}

document.addEventListener('DOMContentLoaded', function() {
    fetchPrayerTimes();
    fetchQuran();
    fetchHadith();
    fetchDua();
});

