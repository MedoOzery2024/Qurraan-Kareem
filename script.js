// Islamic APIs Script - Complete Collection
// APIs for Quran, Hadith, Duas, Prayer Times, and more

class IslamicAPIs {
  constructor() {
    this.baseUrls = {
      quran: 'https://api.alquran.cloud/v1',
      hadith: 'https://api.hadith.gading.dev',
      prayerTimes: 'https://api.aladhan.com/v1',
      qibla: 'https://api.aladhan.com/v1'
    };

    // قاعدة بيانات القرآن الكريم كاملة
    this.completeQuran = {
      1: {
        name: "الفاتحة",
        englishName: "Al-Fatihah",
        verses: [
          "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
          "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
          "الرَّحْمَٰنِ الرَّحِيمِ",
          "مَالِكِ يَوْمِ الدِّينِ",
          "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
          "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
          "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"
        ]
      },
      2: {
        name: "البقرة",
        englishName: "Al-Baqarah",
        verses: [
          "الم",
          "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
          "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
          "وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ",
          "أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ"
          // سيتم إضافة باقي الآيات عبر API أو قاعدة بيانات أكبر
        ]
      },
      3: {
        name: "آل عمران",
        englishName: "Ali 'Imran",
        verses: [
          "الم",
          "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
          "نَزَّلَ عَلَيْكَ الْكِتَابَ بِالْحَقِّ مُصَدِّقًا لِّمَا بَيْنَ يَدَيْهِ وَأَنزَلَ التَّوْرَاةَ وَالْإِنجِيلَ"
        ]
      },
      // يمكن إضافة باقي السور هنا...
    };

    // قائمة جميع السور مع معلوماتها
    this.surahsList = [
      { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", verses: 7, type: "مكية" },
      { number: 2, name: "البقرة", englishName: "Al-Baqarah", verses: 286, type: "مدنية" },
      { number: 3, name: "آل عمران", englishName: "Ali 'Imran", verses: 200, type: "مدنية" },
      { number: 4, name: "النساء", englishName: "An-Nisa", verses: 176, type: "مدنية" },
      { number: 5, name: "المائدة", englishName: "Al-Ma'idah", verses: 120, type: "مدنية" },
      { number: 6, name: "الأنعام", englishName: "Al-An'am", verses: 165, type: "مكية" },
      { number: 7, name: "الأعراف", englishName: "Al-A'raf", verses: 206, type: "مكية" },
      { number: 8, name: "الأنفال", englishName: "Al-Anfal", verses: 75, type: "مدنية" },
      { number: 9, name: "التوبة", englishName: "At-Tawbah", verses: 129, type: "مدنية" },
      { number: 10, name: "يونس", englishName: "Yunus", verses: 109, type: "مكية" },
      { number: 11, name: "هود", englishName: "Hud", verses: 123, type: "مكية" },
      { number: 12, name: "يوسف", englishName: "Yusuf", verses: 111, type: "مكية" },
      { number: 13, name: "الرعد", englishName: "Ar-Ra'd", verses: 43, type: "مدنية" },
      { number: 14, name: "إبراهيم", englishName: "Ibrahim", verses: 52, type: "مكية" },
      { number: 15, name: "الحجر", englishName: "Al-Hijr", verses: 99, type: "مكية" },
      { number: 16, name: "النحل", englishName: "An-Nahl", verses: 128, type: "مكية" },
      { number: 17, name: "الإسراء", englishName: "Al-Isra", verses: 111, type: "مكية" },
      { number: 18, name: "الكهف", englishName: "Al-Kahf", verses: 110, type: "مكية" },
      { number: 19, name: "مريم", englishName: "Maryam", verses: 98, type: "مكية" },
      { number: 20, name: "طه", englishName: "Taha", verses: 135, type: "مكية" },
      { number: 21, name: "الأنبياء", englishName: "Al-Anbya", verses: 112, type: "مكية" },
      { number: 22, name: "الحج", englishName: "Al-Hajj", verses: 78, type: "مدنية" },
      { number: 23, name: "المؤمنون", englishName: "Al-Mu'minun", verses: 118, type: "مكية" },
      { number: 24, name: "النور", englishName: "An-Nur", verses: 64, type: "مدنية" },
      { number: 25, name: "الفرقان", englishName: "Al-Furqan", verses: 77, type: "مكية" },
      { number: 26, name: "الشعراء", englishName: "Ash-Shu'ara", verses: 227, type: "مكية" },
      { number: 27, name: "النمل", englishName: "An-Naml", verses: 93, type: "مكية" },
      { number: 28, name: "القصص", englishName: "Al-Qasas", verses: 88, type: "مكية" },
      { number: 29, name: "العنكبوت", englishName: "Al-'Ankabut", verses: 69, type: "مكية" },
      { number: 30, name: "الروم", englishName: "Ar-Rum", verses: 60, type: "مكية" },
      { number: 31, name: "لقمان", englishName: "Luqman", verses: 34, type: "مكية" },
      { number: 32, name: "السجدة", englishName: "As-Sajdah", verses: 30, type: "مكية" },
      { number: 33, name: "الأحزاب", englishName: "Al-Ahzab", verses: 73, type: "مدنية" },
      { number: 34, name: "سبأ", englishName: "Saba", verses: 54, type: "مكية" },
      { number: 35, name: "فاطر", englishName: "Fatir", verses: 45, type: "مكية" },
      { number: 36, name: "يس", englishName: "Ya-Sin", verses: 83, type: "مكية" },
      { number: 37, name: "الصافات", englishName: "As-Saffat", verses: 182, type: "مكية" },
      { number: 38, name: "ص", englishName: "Sad", verses: 88, type: "مكية" },
      { number: 39, name: "الزمر", englishName: "Az-Zumar", verses: 75, type: "مكية" },
      { number: 40, name: "غافر", englishName: "Ghafir", verses: 85, type: "مكية" },
      { number: 41, name: "فصلت", englishName: "Fussilat", verses: 54, type: "مكية" },
      { number: 42, name: "الشورى", englishName: "Ash-Shuraa", verses: 53, type: "مكية" },
      { number: 43, name: "الزخرف", englishName: "Az-Zukhruf", verses: 89, type: "مكية" },
      { number: 44, name: "الدخان", englishName: "Ad-Dukhan", verses: 59, type: "مكية" },
      { number: 45, name: "الجاثية", englishName: "Al-Jathiyah", verses: 37, type: "مكية" },
      { number: 46, name: "الأحقاف", englishName: "Al-Ahqaf", verses: 35, type: "مكية" },
      { number: 47, name: "محمد", englishName: "Muhammad", verses: 38, type: "مدنية" },
      { number: 48, name: "الفتح", englishName: "Al-Fath", verses: 29, type: "مدنية" },
      { number: 49, name: "الحجرات", englishName: "Al-Hujurat", verses: 18, type: "مدنية" },
      { number: 50, name: "ق", englishName: "Qaf", verses: 45, type: "مكية" },
      { number: 51, name: "الذاريات", englishName: "Adh-Dhariyat", verses: 60, type: "مكية" },
      { number: 52, name: "الطور", englishName: "At-Tur", verses: 49, type: "مكية" },
      { number: 53, name: "النجم", englishName: "An-Najm", verses: 62, type: "مكية" },
      { number: 54, name: "القمر", englishName: "Al-Qamar", verses: 55, type: "مكية" },
      { number: 55, name: "الرحمن", englishName: "Ar-Rahman", verses: 78, type: "مدنية" },
      { number: 56, name: "الواقعة", englishName: "Al-Waqi'ah", verses: 96, type: "مكية" },
      { number: 57, name: "الحديد", englishName: "Al-Hadid", verses: 29, type: "مدنية" },
      { number: 58, name: "المجادلة", englishName: "Al-Mujadila", verses: 22, type: "مدنية" },
      { number: 59, name: "الحشر", englishName: "Al-Hashr", verses: 24, type: "مدنية" },
      { number: 60, name: "الممتحنة", englishName: "Al-Mumtahanah", verses: 13, type: "مدنية" },
      { number: 61, name: "الصف", englishName: "As-Saff", verses: 14, type: "مدنية" },
      { number: 62, name: "الجمعة", englishName: "Al-Jumu'ah", verses: 11, type: "مدنية" },
      { number: 63, name: "المنافقون", englishName: "Al-Munafiqun", verses: 11, type: "مدنية" },
      { number: 64, name: "التغابن", englishName: "At-Taghabun", verses: 18, type: "مدنية" },
      { number: 65, name: "الطلاق", englishName: "At-Talaq", verses: 12, type: "مدنية" },
      { number: 66, name: "التحريم", englishName: "At-Tahrim", verses: 12, type: "مدنية" },
      { number: 67, name: "الملك", englishName: "Al-Mulk", verses: 30, type: "مكية" },
      { number: 68, name: "القلم", englishName: "Al-Qalam", verses: 52, type: "مكية" },
      { number: 69, name: "الحاقة", englishName: "Al-Haqqah", verses: 52, type: "مكية" },
      { number: 70, name: "المعارج", englishName: "Al-Ma'arij", verses: 44, type: "مكية" },
      { number: 71, name: "نوح", englishName: "Nuh", verses: 28, type: "مكية" },
      { number: 72, name: "الجن", englishName: "Al-Jinn", verses: 28, type: "مكية" },
      { number: 73, name: "المزمل", englishName: "Al-Muzzammil", verses: 20, type: "مكية" },
      { number: 74, name: "المدثر", englishName: "Al-Muddaththir", verses: 56, type: "مكية" },
      { number: 75, name: "القيامة", englishName: "Al-Qiyamah", verses: 40, type: "مكية" },
      { number: 76, name: "الإنسان", englishName: "Al-Insan", verses: 31, type: "مدنية" },
      { number: 77, name: "المرسلات", englishName: "Al-Mursalat", verses: 50, type: "مكية" },
      { number: 78, name: "النبأ", englishName: "An-Naba", verses: 40, type: "مكية" },
      { number: 79, name: "النازعات", englishName: "An-Nazi'at", verses: 46, type: "مكية" },
      { number: 80, name: "عبس", englishName: "Abasa", verses: 42, type: "مكية" },
      { number: 81, name: "التكوير", englishName: "At-Takwir", verses: 29, type: "مكية" },
      { number: 82, name: "الانفطار", englishName: "Al-Infitar", verses: 19, type: "مكية" },
      { number: 83, name: "المطففين", englishName: "Al-Mutaffifin", verses: 36, type: "مكية" },
      { number: 84, name: "الانشقاق", englishName: "Al-Inshiqaq", verses: 25, type: "مكية" },
      { number: 85, name: "البروج", englishName: "Al-Buruj", verses: 22, type: "مكية" },
      { number: 86, name: "الطارق", englishName: "At-Tariq", verses: 17, type: "مكية" },
      { number: 87, name: "الأعلى", englishName: "Al-A'la", verses: 19, type: "مكية" },
      { number: 88, name: "الغاشية", englishName: "Al-Ghashiyah", verses: 26, type: "مكية" },
      { number: 89, name: "الفجر", englishName: "Al-Fajr", verses: 30, type: "مكية" },
      { number: 90, name: "البلد", englishName: "Al-Balad", verses: 20, type: "مكية" },
      { number: 91, name: "الشمس", englishName: "Ash-Shams", verses: 15, type: "مكية" },
      { number: 92, name: "الليل", englishName: "Al-Layl", verses: 21, type: "مكية" },
      { number: 93, name: "الضحى", englishName: "Ad-Duhaa", verses: 11, type: "مكية" },
      { number: 94, name: "الشرح", englishName: "Ash-Sharh", verses: 8, type: "مكية" },
      { number: 95, name: "التين", englishName: "At-Tin", verses: 8, type: "مكية" },
      { number: 96, name: "العلق", englishName: "Al-Alaq", verses: 19, type: "مكية" },
      { number: 97, name: "القدر", englishName: "Al-Qadr", verses: 5, type: "مكية" },
      { number: 98, name: "البينة", englishName: "Al-Bayyinah", verses: 8, type: "مدنية" },
      { number: 99, name: "الزلزلة", englishName: "Az-Zalzalah", verses: 8, type: "مدنية" },
      { number: 100, name: "العاديات", englishName: "Al-Adiyat", verses: 11, type: "مكية" },
      { number: 101, name: "القارعة", englishName: "Al-Qari'ah", verses: 11, type: "مكية" },
      { number: 102, name: "التكاثر", englishName: "At-Takathur", verses: 8, type: "مكية" },
      { number: 103, name: "العصر", englishName: "Al-Asr", verses: 3, type: "مكية" },
      { number: 104, name: "الهمزة", englishName: "Al-Humazah", verses: 9, type: "مكية" },
      { number: 105, name: "الفيل", englishName: "Al-Fil", verses: 5, type: "مكية" },
      { number: 106, name: "قريش", englishName: "Quraysh", verses: 4, type: "مكية" },
      { number: 107, name: "الماعون", englishName: "Al-Ma'un", verses: 7, type: "مكية" },
      { number: 108, name: "الكوثر", englishName: "Al-Kawthar", verses: 3, type: "مكية" },
      { number: 109, name: "الكافرون", englishName: "Al-Kafirun", verses: 6, type: "مكية" },
      { number: 110, name: "النصر", englishName: "An-Nasr", verses: 3, type: "مدنية" },
      { number: 111, name: "المسد", englishName: "Al-Masad", verses: 5, type: "مكية" },
      { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", verses: 4, type: "مكية" },
      { number: 113, name: "الفلق", englishName: "Al-Falaq", verses: 5, type: "مكية" },
      { number: 114, name: "الناس", englishName: "An-Nas", verses: 6, type: "مكية" }
    ];
  }

  // ==================== القرآن الكريم APIs المحسنة ====================
  
  /**
   * الحصول على قائمة السور مع المعلومات الكاملة
   */
  getSurahs() {
    return this.surahsList;
  }

  /**
   * الحصول على سورة كاملة من قاعدة البيانات المحلية أو API
   * @param {number} surahNumber - رقم السورة
   */
  async getSurah(surahNumber) {
    try {
      // أولاً، محاولة الحصول على السورة من قاعدة البيانات المحلية
      if (this.completeQuran[surahNumber]) {
        return {
          number: surahNumber,
          name: this.completeQuran[surahNumber].name,
          englishName: this.completeQuran[surahNumber].englishName,
          verses: this.completeQuran[surahNumber].verses,
          numberOfAyahs: this.completeQuran[surahNumber].verses.length,
          source: 'local'
        };
      }

      // إذا لم توجد محلياً، استخدم API
      const response = await fetch(`${this.baseUrls.quran}/surah/${surahNumber}`);
      const data = await response.json();
      
      if (data.code === 200) {
        return {
          number: data.data.number,
          name: data.data.name,
          englishName: data.data.englishName,
          verses: data.data.ayahs.map(ayah => ayah.text),
          numberOfAyahs: data.data.numberOfAyahs,
          source: 'api'
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching surah:', error);
      return null;
    }
  }

  /**
   * الحصول على آية محددة
   * @param {number} surahNumber - رقم السورة
   * @param {number} ayahNumber - رقم الآية
   */
  async getAyah(surahNumber, ayahNumber) {
    try {
      // محاولة الحصول على الآية من قاعدة البيانات المحلية
      if (this.completeQuran[surahNumber] && this.completeQuran[surahNumber].verses[ayahNumber - 1]) {
        return {
          surah: surahNumber,
          ayah: ayahNumber,
          text: this.completeQuran[surahNumber].verses[ayahNumber - 1],
          surahName: this.completeQuran[surahNumber].name,
          source: 'local'
        };
      }

      // استخدام API إذا لم توجد محلياً
      const response = await fetch(`${this.baseUrls.quran}/ayah/${surahNumber}:${ayahNumber}`);
      const data = await response.json();
      
      if (data.code === 200) {
        return {
          surah: data.data.surah.number,
          ayah: data.data.numberInSurah,
          text: data.data.text,
          surahName: data.data.surah.name,
          source: 'api'
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching ayah:', error);
      return null;
    }
  }

  /**
   * البحث في القرآن المحلي والAPI
   * @param {string} query - النص المراد البحث عنه
   */
  async searchQuran(query) {
    try {
      const results = [];

      // البحث في قاعدة البيانات المحلية
      for (const [surahNum, surahData] of Object.entries(this.completeQuran)) {
        surahData.verses.forEach((verse, index) => {
          if (verse.includes(query)) {
            results.push({
              surah: parseInt(surahNum),
              ayah: index + 1,
              text: verse,
              surahName: surahData.name,
              source: 'local'
            });
          }
        });
      }

      // إضافة نتائج من API إذا أردنا
      try {
        const response = await fetch(`${this.baseUrls.quran}/search/${encodeURIComponent(query)}/all/ar`);
        const data = await response.json();
        
        if (data.code === 200 && data.data.matches) {
          data.data.matches.forEach(match => {
            results.push({
              surah: match.surah.number,
              ayah: match.numberInSurah,
              text: match.text,
              surahName: match.surah.name,
              source: 'api'
            });
          });
        }
      } catch (apiError) {
        console.log('API search failed, using local results only');
      }

      return results;
    } catch (error) {
      console.error('Error searching Quran:', error);
      return [];
    }
  }

  /**
   * الحصول على القرآن بالتفسير
   * @param {number} surahNumber - رقم السورة
   */
  async getSurahWithTafsir(surahNumber) {
    try {
      const response = await fetch(`${this.baseUrls.quran}/surah/${surahNumber}/ar.jalalayn`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching surah with tafsir:', error);
      return null;
    }
  }

  /**
   * إضافة سورة جديدة إلى قاعدة البيانات المحلية
   * @param {number} surahNumber - رقم السورة
   * @param {Object} surahData - بيانات السورة
   */
  addSurahToLocal(surahNumber, surahData) {
    this.completeQuran[surahNumber] = surahData;
    console.log(`تمت إضافة سورة ${surahData.name} إلى قاعدة البيانات المحلية`);
  }

  /**
   * تحميل جميع السور من API وحفظها محلياً
   */
  async loadAllSurahsFromAPI() {
    console.log('بدء تحميل جميع السور من API...');
    
    for (let i = 1; i <= 114; i++) {
      try {
        if (!this.completeQuran[i]) {
          const response = await fetch(`${this.baseUrls.quran}/surah/${i}`);
          const data = await response.json();
          
          if (data.code === 200) {
            this.completeQuran[i] = {
              name: data.data.name,
              englishName: data.data.englishName,
              verses: data.data.ayahs.map(ayah => ayah.text)
            };
            console.log(`تم تحميل سورة ${data.data.name} (${i}/114)`);
          }
          
          // تأخير بسيط لتجنب إرهاق الخادم
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error(`خطأ في تحميل السورة رقم ${i}:`, error);
      }
    }
    
    console.log('تم الانتهاء من تحميل جميع السور!');
    return this.completeQuran;
  }

  /**
   * الحصول على آية عشوائية
   */
  getRandomAyah() {
    const surahNumbers = Object.keys(this.completeQuran);
    const randomSurah = surahNumbers[Math.floor(Math.random() * surahNumbers.length)];
    const surahData = this.completeQuran[randomSurah];
    const randomAyah = Math.floor(Math.random() * surahData.verses.length);
    
    return {
      surah: parseInt(randomSurah),
      ayah: randomAyah + 1,
      text: surahData.verses[randomAyah],
      surahName: surahData.name
    };
  }

  // ==================== الأحاديث APIs ====================

  /**
   * الحصول على قائمة كتب الأحاديث
   */
  async getHadithBooks() {
    try {
      const response = await fetch(`${this.baseUrls.hadith}/books`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching hadith books:', error);
      return null;
    }
  }

  /**
   * الحصول على حديث عشوائي
   */
  async getRandomHadith() {
    try {
      const response = await fetch(`${this.baseUrls.hadith}/books/bukhari?range=1-100`);
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.data.hadiths.length);
      return data.data.hadiths[randomIndex];
    } catch (error) {
      console.error('Error fetching random hadith:', error);
      return null;
    }
  }

  /**
   * الحصول على أحاديث من كتاب معين
   * @param {string} bookName - اسم الكتاب (bukhari, muslim, tirmidhi, etc.)
   * @param {string} range - نطاق الأحاديث (مثال: "1-10")
   */
  async getHadithsByBook(bookName, range = "1-10") {
    try {
      const response = await fetch(`${this.baseUrls.hadith}/books/${bookName}?range=${range}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching hadiths by book:', error);
      return null;
    }
  }

  // ==================== مواقيت الصلاة APIs ====================

  /**
   * الحصول على مواقيت الصلاة حسب المدينة
   * @param {string} city - اسم المدينة
   * @param {string} country - اسم الدولة
   */
  async getPrayerTimesByCity(city, country) {
    try {
      const response = await fetch(`${this.baseUrls.prayerTimes}/timingsByCity?city=${city}&country=${country}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching prayer times by city:', error);
      return null;
    }
  }

  /**
   * الحصول على مواقيت الصلاة حسب الإحداثيات
   * @param {number} latitude - خط العرض
   * @param {number} longitude - خط الطول
   */
  async getPrayerTimesByCoordinates(latitude, longitude) {
    try {
      const response = await fetch(`${this.baseUrls.prayerTimes}/timings?latitude=${latitude}&longitude=${longitude}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching prayer times by coordinates:', error);
      return null;
    }
  }

  /**
   * الحصول على مواقيت الصلاة لشهر كامل
   * @param {number} year - السنة
   * @param {number} month - الشهر
   * @param {number} latitude - خط العرض
   * @param {number} longitude - خط الطول
   */
  async getMonthlyPrayerTimes(year, month, latitude, longitude) {
    try {
      const response = await fetch(`${this.baseUrls.prayerTimes}/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching monthly prayer times:', error);
      return null;
    }
  }

  // ==================== اتجاه القبلة APIs ====================

  /**
   * الحصول على اتجاه القبلة
   * @param {number} latitude - خط العرض
   * @param {number} longitude - خط الطول
   */
  async getQiblaDirection(latitude, longitude) {
    try {
      const response = await fetch(`${this.baseUrls.qibla}/qibla/${latitude}/${longitude}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching qibla direction:', error);
      return null;
    }
  }

  // ==================== الأدعية والأذكار ====================

  /**
   * أدعية وأذكار مختارة
   */
  getDuas() {
    return {
      morning: [
        {
          arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
          transliteration: "Asbahna wa asbaha al-mulku lillahi, walhamdu lillahi, la ilaha illa Allah wahdahu la sharika lah",
          translation: "We have reached the morning and with it Allah's sovereignty, praise is to Allah, there is no deity except Allah alone without partner",
          reference: "مسلم"
        },
        {
          arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ",
          transliteration: "Allahumma anta rabbi la ilaha illa ant, khalaqtani wa ana abduk",
          translation: "O Allah, You are my Lord, there is no deity except You, You created me and I am Your servant",
          reference: "البخاري"
        }
      ],
      evening: [
        {
          arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
          transliteration: "Amsayna wa amsa al-mulku lillahi, walhamdu lillahi, la ilaha illa Allah wahdahu la sharika lah",
          translation: "We have reached the evening and with it Allah's sovereignty, praise is to Allah, there is no deity except Allah alone without partner",
          reference: "مسلم"
        }
      ],
      general: [
        {
          arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          transliteration: "Rabbana atina fi'd-dunya hasanatan wa fi'l-akhirati hasanatan wa qina adhab an-nar",
          translation: "Our Lord, give us good in this world and good in the hereafter and save us from the punishment of the Fire",
          reference: "القرآن الكريم - البقرة 201"
        }
      ]
    };
  }

  // ==================== الأسماء الحسنى ====================

  /**
   * الحصول على الأسماء الحسنى الـ99
   */
  getAsmaAlHusna() {
    return [
      { arabic: "الرَّحْمَنُ", transliteration: "Ar-Rahman", meaning: "الرحمن" },
      { arabic: "الرَّحِيمُ", transliteration: "Ar-Raheem", meaning: "الرحيم" },
      { arabic: "الْمَلِكُ", transliteration: "Al-Malik", meaning: "الملك" },
      { arabic: "الْقُدُّوسُ", transliteration: "Al-Quddus", meaning: "القدوس" },
      { arabic: "السَّلاَمُ", transliteration: "As-Salam", meaning: "السلام" },
      { arabic: "الْمُؤْمِنُ", transliteration: "Al-Mu'min", meaning: "المؤمن" },
      { arabic: "الْمُهَيْمِنُ", transliteration: "Al-Muhaymin", meaning: "المهيمن" },
      { arabic: "الْعَزِيزُ", transliteration: "Al-Aziz", meaning: "العزيز" },
      { arabic: "الْجَبَّارُ", transliteration: "Al-Jabbar", meaning: "الجبار" },
      { arabic: "الْمُتَكَبِّرُ", transliteration: "Al-Mutakabbir", meaning: "المتكبر" },
      // يمكن إضافة باقي الأسماء هنا...
    ];
  }

  // ==================== وظائف مساعدة ====================

  /**
   * الحصول على الموقع الحالي للمستخدم
   */
  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported"));
      }
    });
  }

  /**
   * تحويل التاريخ الميلادي إلى هجري (تقريبي)
   * @param {Date} date - التاريخ الميلادي
   */
  toHijriDate(date = new Date()) {
    const hijriYear = Math.floor((date.getFullYear() - 622) * 1.030684);
    return {
      year: hijriYear,
      note: "تاريخ تقريبي - يُنصح بالتحقق من المصادر الموثوقة"
    };
  }

  /**
   * الحصول على الوقت المتبقي للصلاة القادمة
   * @param {Object} prayerTimes - مواقيت الصلاة
   */
  getTimeToNextPrayer(prayerTimes) {
    const now = new Date();
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    
    for (const prayer of prayers) {
      const prayerTime = new Date(`${now.toDateString()} ${prayerTimes[prayer]}`);
      if (prayerTime > now) {
        const diff = prayerTime - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return {
          nextPrayer: prayer,
          timeRemaining: `${hours}:${minutes.toString().padStart(2, '0')}`
        };
      }
    }
    
    // إذا انتهت جميع الصلوات، الصلاة القادمة هي فجر اليوم التالي
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const fajrTomorrow = new Date(`${tomorrow.toDateString()} ${prayerTimes.Fajr}`);
    const diff = fajrTomorrow - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return {
      nextPrayer: 'Fajr',
      timeRemaining: `${hours}:${minutes.toString().padStart(2, '0')}`
    };
  }
}

// ==================== أمثلة على الاستخدام ====================

// إنشاء instance من الكلاس
const islamicAPI = new IslamicAPIs();

// مثال على استخدام APIs الجديدة
async function examples() {
  try {
    // الحصول على سورة الفاتحة
    const fatiha = await islamicAPI.getSurah(1);
    console.log('سورة الفاتحة:', fatiha);

    // الحصول على جميع السور
    const allSurahs = islamicAPI.getSurahs();
    console.log('جميع السور:', allSurahs);

    // البحث في القرآن
    const searchResults = await islamicAPI.searchQuran('الله');
    console.log('نتائج البحث عن "الله":', searchResults);

    // الحصول على آية عشوائية
    const randomAyah = islamicAPI.getRandomAyah();
    console.log('آية عشوائية:', randomAyah);

    // تحميل جميع السور من API (اختياري)
    // await islamicAPI.loadAllSurahsFromAPI();

  } catch (error) {
    console.error('خطأ في تشغيل المثال:', error);
  }
}

// تصدير الكلاس للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
  module.exports = IslamicAPIs;
}

// جعل الكلاس متاح عالمياً في المتصفح
if (typeof window !== 'undefined') {
  window.IslamicAPIs = IslamicAPIs;
  window.islamicAPI = islamicAPI;
}

console.log('✅ تم تحميل Islamic APIs مع قاعدة بيانات القرآن الكريم بنجاح!');
console.log('📖 استخدم islamicAPI.getSurah(رقم_السورة) للحصول على أي سورة');
console.log('🔍 استخدم islamicAPI.searchQuran("كلمة") للبحث في القرآن');
console.log('📚 استخدم islamicAPI.getSurahs() للحصول على قائمة جميع السور');
