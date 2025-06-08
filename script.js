document.addEventListener('DOMContentLoaded', function() {
    // إضافة الساعة الرقمية والتاريخ في أعلى الصفحة
    const header = document.querySelector('.header');
    const clockContainer = document.createElement('div');
    clockContainer.className = 'digital-clock-container';
    clockContainer.innerHTML = `
        <div class="clock-section">
            <div class="digital-clock">
                <span id="hours">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span>
                <span id="period">AM</span>
            </div>
            <div class="current-date">
                <div id="gregorian-date-display"></div>
                <div id="hijri-date-display"></div>
                <div id="current-day"></div>
            </div>
        </div>
    `;
    header.insertBefore(clockContainer, header.firstChild);

    // تحديث الساعة والتاريخ
    function updateClock() {
        const now = new Date();
        
        // تحديث الساعة بتوقيت 12 ساعة
        let hours = now.getHours();
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // تحويل 0 إلى 12
        
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = now.getMinutes().toString().padStart(2, '0');
        document.getElementById('seconds').textContent = now.getSeconds().toString().padStart(2, '0');
        document.getElementById('period').textContent = period;

        // تحديث التاريخ الميلادي
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        const gregorianDate = `${day}/${month}/${year}`;
        document.getElementById('gregorian-date-display').textContent = `التاريخ الميلادي: ${gregorianDate}`;

        // تحديث التاريخ الهجري
        const hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(now);
        document.getElementById('hijri-date-display').textContent = `التاريخ الهجري: ${hijriDate}`;

        // تحديث اليوم الحالي
        const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        document.getElementById('current-day').textContent = `اليوم: ${days[now.getDay()]}`;
    }

    // تحديث الساعة كل ثانية
    setInterval(updateClock, 1000);
    updateClock(); // تحديث فوري عند تحميل الصفحة

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

    // قسم الفقه والشريعة
    const fiqhSection = document.getElementById('fiqh');
    const categoryButtons = fiqhSection.querySelectorAll('.category-btn');
    const searchInput = document.getElementById('fiqh-search');
    const searchButton = document.getElementById('search-fiqh-btn');
    const lessonsContainer = document.getElementById('lessons-container');
    const faqContainer = document.getElementById('faq-container');

    // محتوى الفقه والشريعة
    const fiqhContent = {
        worship: [
            {
                title: 'أحكام الطهارة',
                content: 'تعريف الطهارة، أنواع المياه، أحكام الوضوء، الغسل، التيمم، النجاسات وكيفية تطهيرها',
                details: [
                    'تعريف الطهارة: هي إزالة النجاسة أو رفع الحدث',
                    'أنواع المياه: طهور، طاهر، نجس',
                    'أحكام الوضوء: فروضه، سننه، نواقضه',
                    'الغسل: موجباته، صفته، أحكامه',
                    'التيمم: شروطه، صفته، أحكامه',
                    'النجاسات: أنواعها، كيفية تطهيرها'
                ]
            },
            {
                title: 'أحكام الصلاة',
                content: 'شروط الصلاة، أركان الصلاة، واجبات الصلاة، سنن الصلاة، مبطلات الصلاة، صلاة الجماعة',
                details: [
                    'شروط الصلاة: الإسلام، العقل، التمييز، رفع الحدث، إزالة النجاسة، ستر العورة، دخول الوقت، استقبال القبلة',
                    'أركان الصلاة: القيام، تكبيرة الإحرام، قراءة الفاتحة، الركوع، السجود، التشهد الأخير',
                    'واجبات الصلاة: التكبيرات، التسبيح في الركوع والسجود، التشهد الأول',
                    'سنن الصلاة: رفع اليدين، وضع اليمين على الشمال، دعاء الاستفتاح',
                    'مبطلات الصلاة: الكلام، الأكل، الشرب، الضحك، الحركة الكثيرة',
                    'صلاة الجماعة: فضلها، شروطها، أحكامها'
                ]
            },
            {
                title: 'أحكام الصيام',
                content: 'شروط الصيام، أركان الصيام، مبطلات الصيام، صيام التطوع، قضاء الصيام، كفارة الصيام',
                details: [
                    'شروط الصيام: الإسلام، العقل، البلوغ، القدرة، الإقامة، الصحة',
                    'أركان الصيام: النية، الإمساك عن المفطرات',
                    'مبطلات الصيام: الأكل والشرب عمداً، الجماع، القيء عمداً، خروج دم الحيض أو النفاس، الردة عن الإسلام',
                    'صيام التطوع: فضله، أنواعه، أحكامه',
                    'قضاء الصيام: شروطه، أحكامه، وقته',
                    'كفارة الصيام: أنواعها، أحكامها، شروطها'
                ]
            },
            {
                title: 'أحكام الزكاة',
                content: 'شروط وجوب الزكاة، الأموال التي تجب فيها الزكاة، نصاب الزكاة، مصارف الزكاة',
                details: [
                    'شروط وجوب الزكاة: الإسلام، الحرية، ملك النصاب، تمام الملك، حولان الحول',
                    'الأموال التي تجب فيها الزكاة: الذهب، الفضة، الأنعام، الزروع، الثمار، عروض التجارة',
                    'نصاب الزكاة: مقداره، أحكامه، شروطه',
                    'مصارف الزكاة: الفقراء، المساكين، العاملون عليها، المؤلفة قلوبهم، في الرقاب، الغارمون، في سبيل الله، ابن السبيل'
                ]
            },
            {
                title: 'أحكام الحج',
                content: 'شروط وجوب الحج، أركان الحج، واجبات الحج، محظورات الإحرام، أنواع النسك',
                details: [
                    'شروط وجوب الحج: الإسلام، العقل، البلوغ، الحرية، الاستطاعة',
                    'أركان الحج: الإحرام، الوقوف بعرفة، طواف الإفاضة، السعي',
                    'واجبات الحج: الإحرام من الميقات، المبيت بمزدلفة، رمي الجمرات، الحلق أو التقصير',
                    'محظورات الإحرام: لبس المخيط، تغطية الرأس، حلق الشعر، تقليم الأظافر، الطيب',
                    'أنواع النسك: التمتع، القران، الإفراد'
                ]
            }
        ],
        transactions: [
            {
                title: 'أحكام البيع والشراء',
                content: 'شروط البيع، أركان البيع، أنواع البيوع المحرمة، الخيارات في البيع، الربا وأحكامه',
                details: [
                    'شروط البيع: التراضي، الأهلية، الملكية، القدرة على التسليم',
                    'أركان البيع: العاقدان، المعقود عليه، الصيغة',
                    'أنواع البيوع المحرمة: بيع الغرر، بيع المزابنة، بيع المحاقلة، بيع الملامسة',
                    'الخيارات في البيع: خيار المجلس، خيار الشرط، خيار العيب',
                    'الربا: أنواعه، أحكامه، عقوباته'
                ]
            },
            {
                title: 'أحكام الإجارة',
                content: 'شروط الإجارة، حقوق المؤجر والمستأجر، الإجارة المنتهية بالتمليك، الإجارة المشتركة',
                details: [
                    'شروط الإجارة: التراضي، الأهلية، المنفعة، الأجرة',
                    'حقوق المؤجر: استيفاء الأجرة، حفظ العين المؤجرة',
                    'حقوق المستأجر: الانتفاع بالعين، ضمان العين',
                    'الإجارة المنتهية بالتمليك: شروطها، أحكامها',
                    'الإجارة المشتركة: أنواعها، أحكامها'
                ]
            },
            {
                title: 'أحكام الشركة',
                content: 'أنواع الشركات، شروط الشركة، حقوق الشركاء، حل الشركة، المسؤولية في الشركة',
                details: [
                    'أنواع الشركات: شركة العنان، شركة المفاوضة، شركة الأبدان، شركة الوجوه',
                    'شروط الشركة: التراضي، الأهلية، رأس المال، العمل',
                    'حقوق الشركاء: المشاركة في الربح، المشاركة في الإدارة',
                    'حل الشركة: أسبابها، أحكامها',
                    'المسؤولية في الشركة: أنواعها، حدودها'
                ]
            },
            {
                title: 'أحكام القرض',
                content: 'شروط القرض، حقوق المقرض والمقترض، القرض الحسن، الربا في القروض',
                details: [
                    'شروط القرض: التراضي، الأهلية، المالية',
                    'حقوق المقرض: استرداد القرض، ضمان القرض',
                    'حقوق المقترض: الانتفاع بالقرض، ضمان القرض',
                    'القرض الحسن: فضله، أحكامه',
                    'الربا في القروض: أنواعه، أحكامه، عقوباته'
                ]
            }
        ],
        family: [
            {
                title: 'أحكام النكاح',
                content: 'شروط النكاح، أركان النكاح، المحرمات في النكاح، حقوق الزوجين، الطلاق وأحكامه',
                details: [
                    'شروط النكاح: التراضي، الأهلية، الولي، الشهود، الصداق',
                    'أركان النكاح: الزوجان، الصيغة، الولي، الشهود',
                    'المحرمات في النكاح: المحرمات بالنسب، المحرمات بالرضاع، المحرمات بالمصاهرة',
                    'حقوق الزوجين: حقوق الزوج، حقوق الزوجة',
                    'الطلاق: أنواعه، أحكامه، شروطه'
                ]
            },
            {
                title: 'أحكام الميراث',
                content: 'أسباب الإرث، موانع الإرث، أصحاب الفروض، العصبات، الحجب، التوريث',
                details: [
                    'أسباب الإرث: النسب، الزوجية، الولاء',
                    'موانع الإرث: القتل، اختلاف الدين، الرق',
                    'أصحاب الفروض: الزوج، الزوجة، الأب، الأم، البنت، الأخت',
                    'العصبات: العصبة بالنفس، العصبة بالغير، العصبة مع الغير',
                    'الحجب: حجب حرمان، حجب نقصان',
                    'التوريث: كيفية توزيع التركة'
                ]
            },
            {
                title: 'أحكام النفقة',
                content: 'نفقة الزوجة، نفقة الأولاد، نفقة الأقارب، شروط وجوب النفقة، تقدير النفقة',
                details: [
                    'نفقة الزوجة: شروطها، مقدارها، أحكامها',
                    'نفقة الأولاد: شروطها، مقدارها، أحكامها',
                    'نفقة الأقارب: شروطها، مقدارها، أحكامها',
                    'شروط وجوب النفقة: الحاجة، القدرة، القرابة',
                    'تقدير النفقة: كيفية تقديرها، عوامل التقدير'
                ]
            }
        ],
        criminal: [
            {
                title: 'أحكام الحدود',
                content: 'حد الزنا، حد السرقة، حد القذف، حد شرب الخمر، حد الحرابة، حد الردة',
                details: [
                    'حد الزنا: شروطه، عقوبته، أحكامه',
                    'حد السرقة: شروطه، عقوبته، أحكامه',
                    'حد القذف: شروطه، عقوبته، أحكامه',
                    'حد شرب الخمر: شروطه، عقوبته، أحكامه',
                    'حد الحرابة: شروطه، عقوبته، أحكامه',
                    'حد الردة: شروطه، عقوبته، أحكامه'
                ]
            },
            {
                title: 'أحكام القصاص',
                content: 'شروط القصاص، القصاص في النفس، القصاص في الأطراف، الدية وأحكامها',
                details: [
                    'شروط القصاص: المساواة، الأهلية، التراضي',
                    'القصاص في النفس: شروطه، أحكامه',
                    'القصاص في الأطراف: شروطه، أحكامه',
                    'الدية: أنواعها، مقدارها، أحكامها'
                ]
            },
            {
                title: 'أحكام التعزير',
                content: 'تعريف التعزير، حالات التعزير، أنواع التعزير، تقدير التعزير',
                details: [
                    'تعريف التعزير: هو العقوبة غير المقدرة شرعاً',
                    'حالات التعزير: الجرائم التي ليس فيها حد ولا كفارة',
                    'أنواع التعزير: التعزير بالقتل، التعزير بالجلد، التعزير بالحبس',
                    'تقدير التعزير: كيفية تقديره، عوامل التقدير'
                ]
            }
        ]
    };

    // الأسئلة الشائعة
    const faqContent = [
        {
            question: 'ما هي شروط صحة الصلاة؟',
            answer: 'شروط صحة الصلاة هي: الإسلام، العقل، التمييز، رفع الحدث، إزالة النجاسة، ستر العورة، دخول الوقت، استقبال القبلة، النية.'
        },
        {
            question: 'ما هي أركان الصيام؟',
            answer: 'أركان الصيام هي: النية، الإمساك عن المفطرات من طلوع الفجر إلى غروب الشمس.'
        },
        {
            question: 'ما هي شروط وجوب الزكاة؟',
            answer: 'شروط وجوب الزكاة هي: الإسلام، الحرية، ملك النصاب، تمام الملك، حولان الحول، سقوط الدين.'
        },
        {
            question: 'ما هي أركان النكاح؟',
            answer: 'أركان النكاح هي: الصيغة (الإيجاب والقبول)، الزوجان، الولي، الشهود.'
        },
        {
            question: 'ما هي أنواع البيوع المحرمة؟',
            answer: 'من أنواع البيوع المحرمة: بيع الغرر، بيع المزابنة، بيع المحاقلة، بيع الملامسة، بيع المنابذة، بيع الحصاة.'
        }
    ];

    // تحميل الدروس حسب الفئة
    function loadLessons(category) {
        try {
            console.log('Loading category:', category);
            const lessons = fiqhContent[category] || [];
            displayLessons(lessons);
        } catch (error) {
            console.error('Error loading lessons:', error);
            showError('حدث خطأ في تحميل الدروس');
        }
    }

    // عرض الدروس
    function displayLessons(lessons) {
        if (!lessonsContainer) {
            console.error('Lessons container not found');
            return;
        }

        lessonsContainer.innerHTML = '';
        if (lessons.length === 0) {
            lessonsContainer.innerHTML = '<p>لا توجد دروس متاحة لهذه الفئة</p>';
            return;
        }

        lessons.forEach(lesson => {
            const lessonCard = document.createElement('div');
            lessonCard.className = 'lesson-card';
            lessonCard.innerHTML = `
                <h4>${lesson.title}</h4>
                <div class="lesson-content">
                    <p class="lesson-summary">${lesson.content}</p>
                    <div class="lesson-details">
                        <h5>التفاصيل:</h5>
                        <ul>
                            ${lesson.details.map(detail => `<li>${detail}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            lessonsContainer.appendChild(lessonCard);
        });

        // إضافة مستمعي الأحداث للدروس
        document.querySelectorAll('.lesson-card').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('active');
            });
        });
    }

    // تحميل الأسئلة الشائعة
    function loadFAQ() {
        try {
            displayFAQ(faqContent);
        } catch (error) {
            console.error('Error loading FAQ:', error);
            showError('حدث خطأ في تحميل الأسئلة الشائعة');
        }
    }

    // عرض الأسئلة الشائعة
    function displayFAQ(faqs) {
        faqContainer.innerHTML = '';
        faqs.forEach(faq => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            faqItem.innerHTML = `
                <h4>${faq.question}</h4>
                <div class="faq-answer">
                    <p>${faq.answer}</p>
                </div>
            `;
            faqContainer.appendChild(faqItem);
        });

        // إضافة مستمعي الأحداث للأسئلة
        document.querySelectorAll('.faq-item').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    }

    // البحث في الفقه والشريعة
    function searchFiqh(query) {
        try {
            const results = [];
            Object.values(fiqhContent).forEach(category => {
                category.forEach(lesson => {
                    if (lesson.title.includes(query) || lesson.content.includes(query)) {
                        results.push(lesson);
                    }
                });
            });
            displaySearchResults(results);
        } catch (error) {
            console.error('Error searching:', error);
            showError('حدث خطأ في البحث');
        }
    }

    // عرض نتائج البحث
    function displaySearchResults(results) {
        lessonsContainer.innerHTML = '';
        if (results.length === 0) {
            lessonsContainer.innerHTML = '<p>لم يتم العثور على نتائج</p>';
            return;
        }

        results.forEach(result => {
            const resultCard = document.createElement('div');
            resultCard.className = 'lesson-card';
            resultCard.innerHTML = `
                <h4>${result.title}</h4>
                <div class="lesson-content">
                    <p class="lesson-summary">${result.content}</p>
                    <div class="lesson-details">
                        <h5>التفاصيل:</h5>
                        <ul>
                            ${result.details.map(detail => `<li>${detail}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            lessonsContainer.appendChild(resultCard);
        });

        // إضافة مستمعي الأحداث للنتائج
        document.querySelectorAll('.lesson-card').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('active');
            });
        });
    }

    // إظهار رسالة الخطأ
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        lessonsContainer.innerHTML = '';
        lessonsContainer.appendChild(errorDiv);
    }

    // إضافة مستمعي الأحداث للأزرار
    if (categoryButtons) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Button clicked:', this.dataset.category);

                // إزالة الفئة النشطة من جميع الأزرار
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // إضافة الفئة النشطة للزر المحدد
                this.classList.add('active');
                
                const category = this.dataset.category;
                loadLessons(category);
            });
        });
    } else {
        console.error('Category buttons not found');
    }

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            searchFiqh(query);
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchFiqh(query);
            }
        }
    });

    // تحميل المحتوى الأولي
    loadLessons('worship');
    loadFAQ();

    // قسم إمساكية رمضان
    const ramadanSection = document.getElementById('ramadan');
    const yearSelect = document.getElementById('ramadan-year-select');
    const citySelect = document.getElementById('ramadan-city-select');
    const ramadanTable = document.getElementById('ramadan-table');
    const ramadanDate = document.getElementById('ramadan-date');

    // قائمة المدن المصرية
    const cities = [
        'القاهرة', 'الإسكندرية', 'الجيزة', 'شبرا الخيمة', 'بورسعيد',
        'السويس', 'طنطا', 'المنصورة', 'أسيوط', 'الزقازيق',
        'دمياط', 'الغردقة', 'شرم الشيخ', 'أسوان', 'الأقصر'
    ];

    // ملء قائمة المدن
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });

    // ملء قائمة السنوات (من 2024 إلى 2030)
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= currentYear + 6; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    // تحويل التاريخ الميلادي إلى هجري
    function gregorianToHijri(date) {
        // استخدام مكتبة moment-hijri للتحويل
        const hijriDate = moment(date).format('iYYYY/iM/iD');
        return hijriDate;
    }

    // حساب مواعيد الصلاة لشهر رمضان
    async function calculateRamadanTimes(year, city) {
        try {
            const ramadanStart = new Date(year, 2, 10); // تاريخ بداية رمضان (تقريبي)
            const ramadanEnd = new Date(year, 3, 9); // تاريخ نهاية رمضان (تقريبي)
            
            let tableHTML = '';
            
            for (let date = new Date(ramadanStart); date <= ramadanEnd; date.setDate(date.getDate() + 1)) {
                const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=EG&method=4&date=${moment(date).format('DD-MM-YYYY')}`);
                const data = await response.json();
                
                if (data.code === 200) {
                    const timings = data.data.timings;
                    const hijriDate = gregorianToHijri(date);
                    
                    // حساب وقت الإمساك (قبل الفجر بـ 10 دقائق)
                    const fajrTime = moment(timings.Fajr, 'HH:mm');
                    const imsakTime = fajrTime.subtract(10, 'minutes').format('HH:mm');
                    
                    tableHTML += `
                        <tr>
                            <td>${moment(date).format('DD/MM/YYYY')}</td>
                            <td>${hijriDate}</td>
                            <td>${moment(date).format('DD/MM/YYYY')}</td>
                            <td>${imsakTime}</td>
                            <td>${timings.Fajr}</td>
                            <td>${timings.Sunrise}</td>
                            <td>${timings.Dhuhr}</td>
                            <td>${timings.Asr}</td>
                            <td>${timings.Maghrib}</td>
                            <td>${timings.Isha}</td>
                        </tr>
                    `;
                }
            }
            
            ramadanTable.querySelector('tbody').innerHTML = tableHTML;
            
            // تحديث عنوان الإمساكية
            ramadanDate.innerHTML = `
                <p>إمساكية شهر رمضان ${year}</p>
                <p>المدينة: ${city}</p>
            `;
        } catch (error) {
            console.error('Error calculating Ramadan times:', error);
            ramadanTable.querySelector('tbody').innerHTML = `
                <tr>
                    <td colspan="10" class="error-message">
                        عذراً، حدث خطأ في تحميل مواعيد الإمساكية
                    </td>
                </tr>
            `;
        }
    }

    // إضافة دالة للحصول على إحداثيات المدن
    async function getCityCoordinates(city) {
        const cityCoordinates = {
            'القاهرة': { latitude: 30.0444, longitude: 31.2357 },
            'الإسكندرية': { latitude: 31.2001, longitude: 29.9187 },
            'الجيزة': { latitude: 30.0131, longitude: 31.2089 },
            'شبرا الخيمة': { latitude: 30.1304, longitude: 31.2425 },
            'بورسعيد': { latitude: 31.2667, longitude: 32.3000 },
            'السويس': { latitude: 29.9668, longitude: 32.5498 },
            'طنطا': { latitude: 30.7865, longitude: 30.9998 },
            'المنصورة': { latitude: 31.0409, longitude: 31.3785 },
            'أسيوط': { latitude: 27.1828, longitude: 31.1828 },
            'الزقازيق': { latitude: 30.5877, longitude: 31.5020 },
            'دمياط': { latitude: 31.4167, longitude: 31.8167 },
            'الغردقة': { latitude: 27.2578, longitude: 33.8116 },
            'شرم الشيخ': { latitude: 27.9158, longitude: 34.3300 },
            'أسوان': { latitude: 24.0889, longitude: 32.8998 },
            'الأقصر': { latitude: 25.6872, longitude: 32.6396 }
        };

        if (cityCoordinates[city]) {
            return cityCoordinates[city];
        } else {
            // إذا لم يتم العثور على المدينة، نستخدم إحداثيات القاهرة كقيمة افتراضية
            console.warn(`لم يتم العثور على إحداثيات لمدينة ${city}، سيتم استخدام إحداثيات القاهرة`);
            return cityCoordinates['القاهرة'];
        }
    }

    // تحديث وظائف إمساكية رمضان
    async function loadRamadanData() {
        try {
            const year = document.getElementById('ramadan-year-select').value;
            const city = document.getElementById('ramadan-city-select').value;
            
            // تحديث المحتوى
            const ramadanContent = document.querySelector('.ramadan-content');
            ramadanContent.innerHTML = `
                <div class="ramadan-info-section">
                    <h3>معلومات عن شهر رمضان ${year}</h3>
                    <div class="ramadan-cards">
                        <div class="info-card">
                            <h4>فضل شهر رمضان</h4>
                            <p>شهر رمضان هو الشهر التاسع في التقويم الهجري، وهو شهر الصيام عند المسلمين، وفيه ليلة القدر التي هي خير من ألف شهر.</p>
                        </div>
                        <div class="info-card">
                            <h4>أحكام الصيام</h4>
                            <ul>
                                <li>شروط وجوب الصيام: الإسلام، البلوغ، العقل، القدرة، الإقامة، الصحة</li>
                                <li>مبطلات الصيام: الأكل والشرب عمداً، الجماع، القيء عمداً، خروج دم الحيض أو النفاس</li>
                                <li>كفارة الصيام: إطعام مسكين عن كل يوم أفطر فيه</li>
                            </ul>
                        </div>
                        <div class="info-card">
                            <h4>أدعية رمضان</h4>
                            <div class="dua-section">
                                <h5>دعاء الصيام</h5>
                                <p>نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هَذِهِ السَّنَةِ للهِ تَعَالَى</p>
                                <h5>دعاء الإفطار</h5>
                                <p>اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ، ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ</p>
                            </div>
                        </div>
                        <div class="info-card">
                            <h4>نصائح للصائم</h4>
                            <ul>
                                <li>تأخير السحور وتعجيل الإفطار</li>
                                <li>الإكثار من شرب الماء بين الإفطار والسحور</li>
                                <li>تجنب الأطعمة المالحة والحارة</li>
                                <li>ممارسة الرياضة الخفيفة قبل الإفطار</li>
                                <li>النوم الكافي وتجنب السهر</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="ramadan-activities">
                    <h3>أنشطة رمضانية</h3>
                    <div class="activity-cards">
                        <div class="activity-card">
                            <h4>صلاة التراويح</h4>
                            <p>صلاة التراويح هي صلاة قيام الليل في رمضان، وتصلى بعد صلاة العشاء، وهي سنة مؤكدة عن النبي صلى الله عليه وسلم.</p>
                        </div>
                        <div class="activity-card">
                            <h4>صدقة الفطر</h4>
                            <p>صدقة الفطر هي زكاة تجب على كل مسلم قبل صلاة عيد الفطر، وهي طهرة للصائم من اللغو والرفث.</p>
                        </div>
                        <div class="activity-card">
                            <h4>العمرة في رمضان</h4>
                            <p>العمرة في رمضان تعدل حجة مع النبي صلى الله عليه وسلم، وهي من أفضل الأعمال في هذا الشهر المبارك.</p>
                        </div>
                    </div>
                </div>
            `;

            // تحديث عنوان الإمساكية
            const ramadanDate = document.getElementById('ramadan-date');
            ramadanDate.innerHTML = `
                <p>شهر رمضان المبارك ${year}</p>
                <p>المدينة: ${city}</p>
            `;

        } catch (error) {
            console.error('خطأ في تحميل بيانات رمضان:', error);
            const ramadanContent = document.querySelector('.ramadan-content');
            ramadanContent.innerHTML = `
                <div class="error-message">
                    <p>عذراً، حدث خطأ في تحميل المحتوى</p>
                    <p class="error-details">${error.message}</p>
                    <p class="error-help">يرجى المحاولة مرة أخرى</p>
                </div>
            `;
        }
    }

    // تحديث الإمساكية عند تغيير السنة أو المدينة
    document.getElementById('ramadan-year-select').addEventListener('change', loadRamadanData);
    document.getElementById('ramadan-city-select').addEventListener('change', loadRamadanData);

    // تحميل الإمساكية للعام الحالي
    loadRamadanData();

    // إدارة عرض الأقسام
    const mainCards = document.querySelectorAll('.main-card');
    const sectionsContainer = document.getElementById('sections-container');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-list a');

    // إخفاء جميع الأقسام في البداية
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // إضافة مستمعي الأحداث للبطاقات
    mainCards.forEach(card => {
        card.addEventListener('click', () => {
            const sectionId = card.getAttribute('data-section');
            showSection(sectionId);
            updateActiveNavLink(sectionId);
        });
    });

    // إضافة مستمعي الأحداث لروابط القائمة
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            if (sectionId === 'home') {
                showHome();
            } else {
                showSection(sectionId);
            }
            updateActiveNavLink(sectionId);
        });
    });

    // دالة لعرض القسم المحدد
    function showSection(sectionId) {
        // إخفاء البطاقات الرئيسية
        document.getElementById('home').style.display = 'none';
        
        // إخفاء جميع الأقسام
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // عرض القسم المحدد
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
            selectedSection.classList.add('active-section');
            
            // التمرير إلى القسم
            selectedSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // دالة لعرض الصفحة الرئيسية
    function showHome() {
        // إخفاء جميع الأقسام
        sections.forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active-section');
        });

        // عرض البطاقات الرئيسية
        document.getElementById('home').style.display = 'grid';
    }

    // دالة لتحديث الرابط النشط في القائمة
    function updateActiveNavLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // إضافة تأثيرات حركية للبطاقات
    mainCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
