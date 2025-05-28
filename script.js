
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
    for (const [prayer, time] of Object.entries(timings)) {
        const prayerElement = document.createElement('p');
        prayerElement.textContent = `${prayer}: ${time}`;
        prayerTimesDiv.appendChild(prayerElement);
    }
}

async function fetchQuran() {
    try {
        const response = await fetch('http://api.qalb.me/v1/surah');
        const data = await response.json();
        displayQuran(data);
    } catch (error) {
        console.error('Error fetching Quran:', error);
    }
}

function displayQuran(data) {
    const quranDiv = document.getElementById('quran-content');
    data.forEach(surah => {
        const surahElement = document.createElement('p');
        surahElement.textContent = `${surah.name} (${surah.englishName})`;
        quranDiv.appendChild(surahElement);
    });
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
    hadiths.forEach(hadith => {
        const hadithElement = document.createElement('p');
        hadithElement.textContent = `${hadith.text}`;
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
    const duaElement = document.createElement('p');
    duaElement.textContent = `${data.content}`;
    duaDiv.appendChild(duaElement);
}

document.addEventListener('DOMContentLoaded', function() {
    fetchPrayerTimes();
    fetchQuran();
    fetchHadith();
    fetchDua();
});
