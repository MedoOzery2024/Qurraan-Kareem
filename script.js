document.addEventListener('DOMContentLoaded', function() {
    // Tasbeeh functionality
    const tasbeehSection = document.getElementById('tasbeeh');
    const content = tasbeehSection.querySelector('.content');

    const dhikr = [
        { text: 'سبحان الله', count: 0 },
        { text: 'الحمد لله', count: 0 },
        { text: 'الله أكبر', count: 0 },
        { text: 'لا إله إلا الله', count: 0 },
        { text: 'لا حول ولا قوة إلا بالله', count: 0 },
        { text: 'سبحان الله وبحمده', count: 0 },
        { text: 'سبحان الله العظيم', count: 0 },
        { text: 'اللهم صل على النبي محمد', count: 0 }
    ];

    // Create tasbeeh interface
    const tasbeehHTML = `
        <div class="tasbeeh-container">
            <div class="current-dhikr">
                <h3>الذكر الحالي</h3>
                <p id="current-dhikr-text"></p>
                <div class="counter">
                    <span id="current-count">0</span>
                </div>
            </div>
            <div class="controls">
                <button id="count-btn">تسبيح</button>
                <button id="reset-btn">إعادة</button>
            </div>
            <div class="dhikr-selector">
                <select id="dhikr-select">
                    ${dhikr.map((d, index) => `
                        <option value="${index}">${d.text}</option>
                    `).join('')}
                </select>
            </div>
            <div class="dhikr-stats">
                <h3>إحصائيات التسبيح</h3>
                <div id="dhikr-stats-list"></div>
            </div>
        </div>
    `;

    content.innerHTML = tasbeehHTML;

    // Get DOM elements for tasbeeh
    const countBtn = document.getElementById('count-btn');
    const resetBtn = document.getElementById('reset-btn');
    const dhikrSelect = document.getElementById('dhikr-select');
    const currentDhikrText = document.getElementById('current-dhikr-text');
    const currentCount = document.getElementById('current-count');
    const dhikrStatsList = document.getElementById('dhikr-stats-list');

    let currentDhikrIndex = 0;

    // Update tasbeeh display
    function updateDisplay() {
        const current = dhikr[currentDhikrIndex];
        currentDhikrText.textContent = current.text;
        currentCount.textContent = current.count;
        updateStats();
    }

    // Update statistics display
    function updateStats() {
        let statsHTML = '';
        dhikr.forEach((d, index) => {
            if (d.count > 0) {
                statsHTML += `
                    <div class="stat-item ${index === currentDhikrIndex ? 'active' : ''}">
                        <span class="stat-text">${d.text}</span>
                        <span class="stat-count">${d.count}</span>
                    </div>
                `;
            }
        });
        dhikrStatsList.innerHTML = statsHTML || '<p class="no-stats">لم يتم التسبيح بعد</p>';
    }

    // Initialize tasbeeh display
    updateDisplay();

    // Tasbeeh event listeners
    countBtn.addEventListener('click', () => {
        dhikr[currentDhikrIndex].count++;
        updateDisplay();
    });

    resetBtn.addEventListener('click', () => {
        dhikr[currentDhikrIndex].count = 0;
        updateDisplay();
    });

    dhikrSelect.addEventListener('change', (e) => {
        currentDhikrIndex = parseInt(e.target.value);
        updateDisplay();
    });

    // Quran API Integration with Tafsir
    const quranSection = document.getElementById('quran');
    const quranContent = quranSection.querySelector('.content');

    async function loadQuran() {
        try {
            // Using Quran API with Tafsir
            const response = await fetch('https://api.alquran.cloud/v1/surah');
            const data = await response.json();
            
            if (data && data.data) {
                let quranHTML = '<div class="quran-navigation">';
                
                // Add surah selection
                quranHTML += '<select id="surah-select" class="surah-select">';
                data.data.forEach((surah) => {
                    quranHTML += `<option value="${surah.number}">${surah.name} (${surah.englishName})</option>`;
                });
                quranHTML += '</select>';
                
                // Add verse display
                quranHTML += '<div id="quran-verses" class="quran-verses"></div>';
                quranHTML += '</div>';
                
                quranContent.innerHTML = quranHTML;

                // Add event listener
                const surahSelect = document.getElementById('surah-select');
                
                async function loadSurahWithTafsir() {
                    const surahNumber = surahSelect.value;
                    
                    try {
                        // Get Quran text with tafsir
                        const quranResponse = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`);
                        const quranData = await quranResponse.json();
                        
                        // Get Tafsir from a reliable source
                        const tafsirResponse = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.muyassar`);
                        const tafsirData = await tafsirResponse.json();
                        
                        if (quranData.code === 200 && tafsirData.code === 200) {
                            displaySurahWithTafsir(quranData.data, tafsirData.data);
                        }
                    } catch (error) {
                        console.error('Error loading surah:', error);
                        document.getElementById('quran-verses').innerHTML = '<p class="error">عذراً، حدث خطأ في تحميل السورة</p>';
                    }
                }

                surahSelect.addEventListener('change', loadSurahWithTafsir);
                
                // Load first surah by default
                loadSurahWithTafsir();
            }
        } catch (error) {
            console.error('Error loading Quran:', error);
            quranContent.innerHTML = '<p class="error">عذراً، حدث خطأ في تحميل القرآن الكريم</p>';
        }
    }

    function displaySurahWithTafsir(quranData, tafsirData) {
        const versesContainer = document.getElementById('quran-verses');
        let versesHTML = `
            <h3>${quranData.name} (${quranData.englishName})</h3>
            <p class="surah-info">عدد الآيات: ${quranData.numberOfAyahs} | نوع السورة: ${quranData.revelationType}</p>
        `;
        
        quranData.ayahs.forEach((ayah, index) => {
            // Get the corresponding tafsir
            const tafsirAyah = tafsirData.ayahs.find(t => t.numberInSurah === ayah.numberInSurah);
            const tafsirText = tafsirAyah ? tafsirAyah.text : 'جاري تحميل التفسير...';
            
            versesHTML += `
                <div class="quran-verse">
                    <p class="verse-text">${ayah.text}</p>
                    <p class="verse-number">${ayah.numberInSurah}</p>
                    <div class="tafsir">
                        <h4>التفسير:</h4>
                        <p>${tafsirText}</p>
                    </div>
                </div>
            `;
        });
        
        versesContainer.innerHTML = versesHTML;
    }

    // Hadith API Integration with Explanation
    const hadithSection = document.getElementById('hadith');
    const hadithContent = hadithSection.querySelector('.content');

    // Using local data for hadiths since the API requires authentication
    const hadiths = [
        {
            text: 'إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى، فمن كانت هجرته إلى الله ورسوله، فهجرته إلى الله ورسوله، ومن كانت هجرته لدنيا يصيبها أو امرأة ينكحها، فهجرته إلى ما هاجر إليه',
            reference: 'صحيح البخاري',
            grade: 'صحيح',
            explanation: 'هذا الحديث أصل عظيم من أصول الإسلام، وهو يدل على أن الأعمال لا تصح إلا بالنية، وأن النية هي التي تميز العبادات عن العادات، وتميز العبادات بعضها عن بعض.',
            narrator: 'عمر بن الخطاب رضي الله عنه'
        },
        {
            text: 'من حسن إسلام المرء تركه ما لا يعنيه',
            reference: 'سنن الترمذي',
            grade: 'حسن صحيح',
            explanation: 'هذا الحديث يدل على أن من علامات حسن إسلام المرء أن يترك ما لا يعنيه من الأقوال والأفعال، وهذا يشمل ترك الفضول من الكلام، وترك التدخل في شؤون الآخرين.',
            narrator: 'أبو هريرة رضي الله عنه'
        },
        {
            text: 'لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه',
            reference: 'صحيح البخاري',
            grade: 'صحيح',
            explanation: 'هذا الحديث يدل على أن كمال الإيمان لا يتم إلا بحب الخير للآخرين كما يحبه الإنسان لنفسه، وهذا من أعظم مكارم الأخلاق.',
            narrator: 'أنس بن مالك رضي الله عنه'
        },
        {
            text: 'المسلم من سلم المسلمون من لسانه ويده',
            reference: 'صحيح البخاري',
            grade: 'صحيح',
            explanation: 'هذا الحديث يبين أن المسلم الحقيقي هو من لا يؤذي المسلمين بلسانه ولا بيده، وهذا يشمل جميع أنواع الأذى البدني واللفظي.',
            narrator: 'عبد الله بن عمرو رضي الله عنهما'
        },
        {
            text: 'من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت',
            reference: 'صحيح البخاري',
            grade: 'صحيح',
            explanation: 'هذا الحديث يدل على أن المؤمن يجب عليه أن يحفظ لسانه، فلا يتكلم إلا بخير، وإلا فليصمت، وهذا من أعظم أسباب حفظ اللسان.',
            narrator: 'أبو هريرة رضي الله عنه'
        }
    ];

    function loadHadith() {
        try {
            // Get random hadith
            const randomIndex = Math.floor(Math.random() * hadiths.length);
            const hadith = hadiths[randomIndex];
            
            let hadithHTML = '<div class="hadith-container">';
            hadithHTML += `
                <div class="hadith-text">
                    <p class="hadith-narrator">عن ${hadith.narrator}</p>
                    <p class="hadith-content">${hadith.text}</p>
                    <div class="hadith-details">
                        <p class="hadith-reference">المصدر: ${hadith.reference}</p>
                        <p class="hadith-grade">الدرجة: ${hadith.grade}</p>
                        <div class="hadith-explanation">
                            <h4>شرح الحديث:</h4>
                            <p>${hadith.explanation}</p>
                        </div>
                    </div>
                </div>
                <button id="new-hadith" class="new-hadith-btn">
                    <i class="fas fa-sync-alt"></i>
                    حديث جديد
                </button>
            `;
            hadithHTML += '</div>';
            
            hadithContent.innerHTML = hadithHTML;

            const newHadithBtn = document.getElementById('new-hadith');
            newHadithBtn.addEventListener('click', loadHadith);
        } catch (error) {
            console.error('Error loading Hadith:', error);
            hadithContent.innerHTML = '<p class="error">عذراً، حدث خطأ في تحميل الأحاديث</p>';
        }
    }

    // Duas API Integration with Details
    const duaSection = document.getElementById('dua');
    const duaContent = duaSection.querySelector('.content');

    // Using comprehensive collection of duas with explanations
    const duas = [
        {
            title: 'دعاء الاستخارة',
            arabic: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلا أَقْدِرُ، وَتَعْلَمُ وَلا أَعْلَمُ، وَأَنْتَ عَلامُ الْغُيُوبِ، اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ، وَاقْدُرْ لِي الْخَيْرَ حَيْثُ كَانَ ثُمَّ أَرْضِنِي بِهِ',
            translation: 'اللهم إني أستخيرك بعلمك، وأستقدرك بقدرتك، وأسألك من فضلك العظيم، فإنك تقدر ولا أقدر، وتعلم ولا أعلم، وأنت علام الغيوب، اللهم إن كنت تعلم أن هذا الأمر خير لي في ديني ومعاشي وعاقبة أمري، فاقدره لي ويسره لي ثم بارك لي فيه، وإن كنت تعلم أن هذا الأمر شر لي في ديني ومعاشي وعاقبة أمري، فاصرفه عني واصرفني عنه، واقدر لي الخير حيث كان ثم أرضني به',
            reference: 'صحيح البخاري',
            explanation: 'دعاء الاستخارة هو طلب الخيرة من الله تعالى في الأمور المشتبهة، وهو من أعظم الأدعية التي يعلمها النبي صلى الله عليه وسلم لأمته. وفيه إظهار العبودية لله تعالى، والاعتراف بالعجز عن معرفة الخير والشر، والاستعانة بالله تعالى في كل الأمور.',
            benefits: 'يساعد في اتخاذ القرارات الصحيحة، ويزيد من الثقة بالله تعالى، ويجلب البركة في العمل، ويبعد عن الإنسان الشرور والمضار.',
            category: 'أدعية مأثورة'
        },
        {
            title: 'دعاء الصباح',
            arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لا إِلَهَ إِلا اللهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
            translation: 'أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير، رب أسألك خير ما في هذا اليوم وخير ما بعده، وأعوذ بك من شر ما في هذا اليوم وشر ما بعده، رب أعوذ بك من الكسل وسوء الكبر، رب أعوذ بك من عذاب في النار وعذاب في القبر',
            reference: 'سنن أبي داود',
            explanation: 'هذا الدعاء من الأذكار المأثورة عن النبي صلى الله عليه وسلم، وفيه إقرار بالعبودية لله تعالى، وطلب الخير والبركة في اليوم، والاستعاذة من الشرور والمكاره.',
            benefits: 'حفظ من الله تعالى، وبركة في اليوم، ووقاية من الشرور والمكاره، وتحصين من الشيطان.',
            category: 'أذكار الصباح'
        },
        {
            title: 'دعاء المساء',
            arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لا إِلَهَ إِلا اللهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
            translation: 'أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير، رب أسألك خير ما في هذه الليلة وخير ما بعدها، وأعوذ بك من شر ما في هذه الليلة وشر ما بعدها، رب أعوذ بك من الكسل وسوء الكبر، رب أعوذ بك من عذاب في النار وعذاب في القبر',
            reference: 'سنن أبي داود',
            explanation: 'هذا الدعاء من الأذكار المأثورة عن النبي صلى الله عليه وسلم للمساء، وفيه إقرار بالعبودية لله تعالى، وطلب الخير والبركة في الليلة، والاستعاذة من الشرور والمكاره.',
            benefits: 'حفظ من الله تعالى، وبركة في الليل، ووقاية من الشرور والمكاره، وتحصين من الشيطان.',
            category: 'أذكار المساء'
        },
        {
            title: 'دعاء دخول المسجد',
            arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
            translation: 'اللهم افتح لي أبواب رحمتك',
            reference: 'صحيح مسلم',
            explanation: 'هذا الدعاء المأثور عن النبي صلى الله عليه وسلم عند دخول المسجد، وفيه طلب الرحمة من الله تعالى وفتح أبوابها.',
            benefits: 'نيل رحمة الله تعالى، وبركة في الصلاة، وتحصيل الأجر العظيم.',
            category: 'أدعية المسجد'
        },
        {
            title: 'دعاء الخروج من المسجد',
            arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
            translation: 'اللهم إني أسألك من فضلك',
            reference: 'صحيح مسلم',
            explanation: 'هذا الدعاء المأثور عن النبي صلى الله عليه وسلم عند الخروج من المسجد، وفيه طلب الفضل من الله تعالى.',
            benefits: 'نيل فضل الله تعالى، وبركة في العمل، وتحصيل الأجر.',
            category: 'أدعية المسجد'
        }
    ];

    function loadDuas() {
        try {
            let duasHTML = '<div class="duas-container">';
            
            // Add category filter
            duasHTML += `
                <div class="dua-categories">
                    <button class="category-btn active" data-category="all">الكل</button>
                    <button class="category-btn" data-category="أدعية مأثورة">أدعية مأثورة</button>
                    <button class="category-btn" data-category="أذكار الصباح">أذكار الصباح</button>
                    <button class="category-btn" data-category="أذكار المساء">أذكار المساء</button>
                    <button class="category-btn" data-category="أدعية المسجد">أدعية المسجد</button>
                </div>
            `;
            
            duas.forEach(dua => {
                duasHTML += `
                    <div class="dua-text" data-category="${dua.category}">
                        <h4>${dua.title}</h4>
                        <p class="dua-arabic">${dua.arabic}</p>
                        <div class="dua-details">
                            <p class="dua-translation">الترجمة: ${dua.translation}</p>
                            <p class="dua-reference">المصدر: ${dua.reference}</p>
                            <div class="dua-explanation">
                                <h4>شرح الدعاء:</h4>
                                <p>${dua.explanation}</p>
                            </div>
                            <div class="dua-benefits">
                                <h4>فوائد الدعاء:</h4>
                                <p>${dua.benefits}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
            duasHTML += '</div>';
            
            duaContent.innerHTML = duasHTML;

            // Add category filter functionality
            const categoryButtons = document.querySelectorAll('.category-btn');
            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    const category = button.dataset.category;
                    const duas = document.querySelectorAll('.dua-text');
                    
                    duas.forEach(dua => {
                        if (category === 'all' || dua.dataset.category === category) {
                            dua.style.display = 'block';
                        } else {
                            dua.style.display = 'none';
                        }
                    });
                });
            });
        } catch (error) {
            console.error('Error loading Duas:', error);
            duaContent.innerHTML = '<p class="error">عذراً، حدث خطأ في تحميل الأدعية</p>';
        }
    }

    // Prayer Times API Integration
    const prayerTimesSection = document.getElementById('prayer-times');
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const hijriDate = document.getElementById('hijri-date');
    const gregorianDate = document.getElementById('gregorian-date');
    const nextPrayerInfo = document.getElementById('next-prayer-info');

    async function getPrayerTimes(city) {
        try {
            // Show loading state
            nextPrayerInfo.innerHTML = '<p>جاري تحميل مواعيد الصلاة...</p>';
            
            // Get prayer times using Islamic Network API
            const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=EG&method=4`);
            
            if (!response.ok) {
                throw new Error('فشل في الاتصال بالخادم');
            }
            
            const data = await response.json();
            
            if (data.code === 200 && data.data) {
                const { timings, date } = data.data;
                
                // Update dates
                document.getElementById('hijri-date').textContent = 
                    `${date.hijri.day} ${date.hijri.month.ar} ${date.hijri.year} هـ`;
                document.getElementById('gregorian-date').textContent = 
                    `${date.gregorian.day} ${date.gregorian.month.ar} ${date.gregorian.year} م`;
                
                // Update prayer times
                document.querySelector('#fajr .time').textContent = timings.Fajr;
                document.querySelector('#sunrise .time').textContent = timings.Sunrise;
                document.querySelector('#dhuhr .time').textContent = timings.Dhuhr;
                document.querySelector('#asr .time').textContent = timings.Asr;
                document.querySelector('#maghrib .time').textContent = timings.Maghrib;
                document.querySelector('#isha .time').textContent = timings.Isha;
                
                // Calculate next prayer
                const now = new Date();
                const prayers = [
                    { name: 'الفجر', time: timings.Fajr },
                    { name: 'الشروق', time: timings.Sunrise },
                    { name: 'الظهر', time: timings.Dhuhr },
                    { name: 'العصر', time: timings.Asr },
                    { name: 'المغرب', time: timings.Maghrib },
                    { name: 'العشاء', time: timings.Isha }
                ];
                
                let nextPrayer = null;
                for (let prayer of prayers) {
                    const [hours, minutes] = prayer.time.split(':');
                    const prayerTime = new Date();
                    prayerTime.setHours(parseInt(hours), parseInt(minutes), 0);
                    
                    if (prayerTime > now) {
                        nextPrayer = prayer;
                        break;
                    }
                }
                
                if (nextPrayer) {
                    const [hours, minutes] = nextPrayer.time.split(':');
                    const prayerTime = new Date();
                    prayerTime.setHours(parseInt(hours), parseInt(minutes), 0);
                    
                    const timeUntil = prayerTime - now;
                    const hoursUntil = Math.floor(timeUntil / (1000 * 60 * 60));
                    const minutesUntil = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));
                    
                    nextPrayerInfo.innerHTML = `
                        <p>${nextPrayer.name}</p>
                        <p>${nextPrayer.time}</p>
                        <p>متبقي: ${hoursUntil} ساعة و ${minutesUntil} دقيقة</p>
                    `;
                } else {
                    nextPrayerInfo.innerHTML = '<p>انتهت مواعيد الصلاة لهذا اليوم</p>';
                }
            } else {
                throw new Error('لم يتم العثور على مواعيد الصلاة للمدينة المحددة');
            }
        } catch (error) {
            console.error('Error fetching prayer times:', error);
            nextPrayerInfo.innerHTML = `
                <p class="error">عذراً، حدث خطأ في تحميل مواعيد الصلاة</p>
                <p class="error-details">${error.message}</p>
                <p class="error-help">يرجى التأكد من كتابة اسم المدينة بشكل صحيح والمحاولة مرة أخرى</p>
            `;
        }
    }

    // Event listeners for prayer times
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            getPrayerTimes(city);
        } else {
            nextPrayerInfo.innerHTML = '<p class="error">الرجاء إدخال اسم المدينة</p>';
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                getPrayerTimes(city);
            } else {
                nextPrayerInfo.innerHTML = '<p class="error">الرجاء إدخال اسم المدينة</p>';
            }
        }
    });

    // Load prayer times for default city (Cairo)
    getPrayerTimes('Cairo');

    // Load all content
    loadQuran();
    loadHadith();
    loadDuas();
});
