// API endpoints
const QURAN_API = "https://api.alquran.cloud/v1";
const HADITH_API = "https://api.hadith.sutanlab.id/books";
const AZKAR_API = "https://raw.githubusercontent.com/nawafalqari/azkar-api/develop/azkar.json";
const PRAYER_API = "https://api.aladhan.com/v1/timingsByCity";

// Global variables
let currentSurah = null;
let sebhaCount = 0;

// Show section function
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active class to clicked button
    event.currentTarget.classList.add('active');
    
    // Load content for the section if needed
    if (sectionId === 'quran' && !document.getElementById('surah-list').innerHTML) {
        loadSurahs();
    }
    else if (sectionId === 'hadith') {
        loadHadiths();
    }
    else if (sectionId === 'azkar') {
        loadAzkar();
    }
    else if (sectionId === 'prayer') {
        getPrayerTimes('Cairo', 'Egypt');
    }
}

// Load Quran Surahs
async function loadSurahs() {
    try {
        const response = await fetch(`${QURAN_API}/surah`);
        const data = await response.json();
        
        if (data.code === 200) {
            const surahs = data.data;
            const surahList = document.getElementById('surah-list');
            
            surahs.forEach(surah => {
                const surahItem = document.createElement('div');
                surahItem.className = 'surah-item';
                surahItem.innerHTML = `
                    <div class="surah-number">${surah.number}</div>
                    <div>
                        <div>${surah.englishName} (${surah.englishNameTranslation})</div>
                        <div>${surah.name} - ${surah.numberOfAyahs} آيات</div>
                    </div>
                `;
                
                surahItem.addEventListener('click', () => {
                    document.querySelectorAll('.surah-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    surahItem.classList.add('active');
                    loadSurahDetails(surah.number);
                });
                
                surahList.appendChild(surahItem);
            });
            
            // Load first surah by default
            if (surahs.length > 0) {
                document.querySelector('.surah-item').classList.add('active');
                loadSurahDetails(1);
            }
        }
    } catch (error) {
        console.error('Error loading surahs:', error);
        document.getElementById('surah-details').innerHTML = `
            <div class="surah-header">
                <div class="surah-name">خطأ في التحميل</div>
                <div class="surah-info">حدث خطأ أثناء تحميل السور، يرجى المحاولة لاحقاً</div>
            </div>
        `;
    }
}

// Load Surah Details
async function loadSurahDetails(surahNumber) {
    try {
        const [surahResponse, tafsirResponse] = await Promise.all([
            fetch(`${QURAN_API}/surah/${surahNumber}/ar.alafasy`),
            fetch(`${QURAN_API}/surah/${surahNumber}/ar.maududi`)
        ]);
        
        const surahData = await surahResponse.json();
        const tafsirData = await tafsirResponse.json();
        
        if (surahData.code === 200 && tafsirData.code === 200) {
            const surah = surahData.data;
            const tafsir = tafsirData.data;
            
            const surahDetails = document.getElementById('surah-details');
            surahDetails.innerHTML = `
                <div class="surah-header">
                    <div class="surah-name">${surah.englishName} (${surah.englishNameTranslation})</div>
                    <div class="surah-info">${surah.name} - ${surah.revelationType} - ${surah.numberOfAyahs} آيات</div>
                </div>
                <div class="ayahs-container">
                    ${surah.ayahs.map(ayah => `
                        <div class="ayah">
                            <div class="ayah-text">
                                ${ayah.text} <span class="ayah-number">${ayah.numberInSurah}</span>
                            </div>
                            <div class="tafsir">
                                <strong>التفسير:</strong> ${tafsir.ayahs[ayah.numberInSurah - 1].text}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading surah details:', error);
        document.getElementById('surah-details').innerHTML = `
            <div class="surah-header">
                <div class="surah-name">خطأ في التحميل</div>
                <div class="surah-info">حدث خطأ أثناء تحميل تفاصيل السورة، يرجى المحاولة لاحقاً</div>
            </div>
        `;
    }
}

// Load Hadiths
async function loadHadiths() {
    const book = document.getElementById('hadith-book').value;
    const hadithContainer = document.getElementById('hadith-container');
    const loader = document.getElementById('hadith-loader');
    
    // Show loader
    loader.style.display = 'block';
    hadithContainer.innerHTML = '';
    
    try {
        const response = await fetch(`${HADITH_API}/${book}?range=1-10`);
        const data = await response.json();
        
        if (data.code === 200) {
            const hadiths = data.data.hadiths;
            
            hadithContainer.innerHTML = hadiths.map(hadith => `
                <div class="hadith-item">
                    <div class="hadith-text">${hadith.arab}</div>
                    <div class="hadith-reference">${hadith.id} - ${data.data.name}</div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading hadiths:', error);
        hadithContainer.innerHTML = '<p>حدث خطأ أثناء تحميل الأحاديث. يرجى المحاولة مرة أخرى.</p>';
    } finally {
        // Hide loader
        loader.style.display = 'none';
    }
}

// Load Azkar
async function loadAzkar() {
    const azkarContainer = document.getElementById('azkar-container');
    const loader = document.getElementById('azkar-loader');
    
    // Show loader
    loader.style.display = 'block';
    azkarContainer.innerHTML = '';
    
    try {
        const response = await fetch(AZKAR_API);
        const data = await response.json();
        
        // Group azkar by category
        const categories = {
            morning: { title: 'أذكار الصباح', icon: 'fas fa-sun' },
            evening: { title: 'أذكار المساء', icon: 'fas fa-moon' },
            prayer: { title: 'أذكار بعد الصلاة', icon: 'fas fa-mosque' },
            sleep: { title: 'أذكار النوم', icon: 'fas fa-bed' }
        };
        
        // Display azkar cards
        Object.entries(categories).forEach(([category, info]) => {
            const categoryAzkar = data[category];
            if (categoryAzkar && categoryAzkar.length > 0) {
                const card = document.createElement('div');
                card.className = 'azkar-card';
                card.innerHTML = `
                    <div class="azkar-header">
                        <i class="${info.icon}"></i>
                        <span>${info.title}</span>
                    </div>
                    <div class="azkar-content">
                        ${categoryAzkar.map(azkar => `
                            <div class="azkar-item">
                                <div class="azkar-text">${azkar.zekr}</div>
                                <div class="azkar-count">${azkar.repeat} مرة</div>
                            </div>
                        `).join('')}
                    </div>
                `;
                azkarContainer.appendChild(card);
            }
        });
    } catch (error) {
        console.error('Error loading azkar:', error);
        azkarContainer.innerHTML = '<p>حدث خطأ أثناء تحميل الأذكار. يرجى المحاولة مرة أخرى.</p>';
    } finally {
        // Hide loader
        loader.style.display = 'none';
    }
}

// Get Prayer Times
async function getPrayerTimes(city, country) {
    const prayerContainer = document.getElementById('prayer-times');
    const locationElement = document.getElementById('prayer-location');
    const loader = document.getElementById('prayer-loader');
    
    // Show loader
    loader.style.display = 'block';
    prayerContainer.innerHTML = '';
    
    try {
        const response = await fetch(`${PRAYER_API}?city=${city}&country=${country}&method=5`);
        const data = await response.json();
        
        if (data.code === 200) {
            const timings = data.data.timings;
            const date = data.data.date.readable;
            const location = `${data.data.meta.timezone}, ${data.data.meta.method.name}`;
            
            locationElement.textContent = `${city}, ${country} | ${date}`;
            
            // Display prayer times
            const prayers = [
                { name: 'الفجر', time: timings.Fajr, key: 'Fajr' },
                { name: 'الشروق', time: timings.Sunrise, key: 'Sunrise' },
                { name: 'الظهر', time: timings.Dhuhr, key: 'Dhuhr' },
                { name: 'العصر', time: timings.Asr, key: 'Asr' },
                { name: 'المغرب', time: timings.Maghrib, key: 'Maghrib' },
                { name: 'العشاء', time: timings.Isha, key: 'Isha' }
            ];
            
            // Determine current prayer
            const now = new Date();
            const currentTime = now.getHours() * 60 + now.getMinutes();
            let currentPrayer = null;
            let nextPrayer = null;
            
            prayers.forEach((prayer, index) => {
                const [hours, minutes] = prayer.time.split(':');
                const prayerTime = parseInt(hours) * 60 + parseInt(minutes);
                
                if (prayerTime > currentTime) {
                    if (!nextPrayer) nextPrayer = prayer;
                } else {
                    currentPrayer = prayer;
                }
            });
            
            // Create prayer cards
            prayerContainer.innerHTML = prayers.map(prayer => {
                const isCurrent = prayer === currentPrayer;
                const isNext = prayer === nextPrayer;
                
                return `
                    <div class="prayer-card ${isCurrent ? 'active' : ''}">
                        <div class="prayer-name">${prayer.name}</div>
                        <div class="prayer-time">${prayer.time}</div>
                        ${isCurrent ? '<div class="prayer-next">(الصلاة الحالية)</div>' : ''}
                        ${isNext ? '<div class="prayer-next">(التالية)</div>' : ''}
                    </div>
                `;
            }).join('');
        }
    } catch (error) {
        console.error('Error loading prayer times:', error);
        prayerContainer.innerHTML = '<p>حدث خطأ أثناء تحميل مواقيت الصلاة. يرجى المحاولة مرة أخرى.</p>';
    } finally {
        // Hide loader
        loader.style.display = 'none';
    }
}

// Sebha functionality
function setupSebha() {
    const sebhaCircle = document.getElementById('sebha-circle');
    const sebhaCountElement = document.getElementById('sebha-count');
    const sebhaIncrement = document.getElementById('sebha-increment');
    const sebhaReset = document.getElementById('sebha-reset');
    
    // Increment sebha count
    sebhaCircle.addEventListener('click', () => {
        sebhaCount++;
        sebhaCountElement.textContent = sebhaCount;
        
        // Add animation
        sebhaCircle.style.transform = 'scale(1.1)';
        setTimeout(() => {
            sebhaCircle.style.transform = 'scale(1)';
        }, 100);
    });
    
    sebhaIncrement.addEventListener('click', () => {
        sebhaCount++;
        sebhaCountElement.textContent = sebhaCount;
    });
    
    // Reset sebha count
    sebhaReset.addEventListener('click', () => {
        sebhaCount = 0;
        sebhaCountElement.textContent = sebhaCount;
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Load Quran by default
    loadSurahs();
    
    // Setup event listeners
    document.getElementById('load-hadith').addEventListener('click', loadHadiths);
    document.getElementById('get-prayer-times').addEventListener('click', () => {
        const city = document.getElementById('city-input').value || 'Cairo';
        getPrayerTimes(city, 'Egypt');
    });
    
    // Setup sebha
    setupSebha();
    
    // Initialize prayer times for default city
    getPrayerTimes('Cairo', 'Egypt');
});
