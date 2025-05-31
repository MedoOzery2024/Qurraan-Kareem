import React, { useState, useEffect } from 'react';
import { Book, BookOpen, Clock, Heart, Search, RotateCcw, MessageSquare } from 'lucide-react';

const QuranSection = ({ surahs, loadSurahDetails, selectedSurah, showTafsir, setShowTafsir }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-emerald-700 flex items-center gap-4">
          <BookOpen className="w-8 h-8 text-amber-500" />
          القرآن الكريم
        </h2>
        <button
          onClick={() => setShowTafsir(prev => !prev)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            showTafsir ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          {showTafsir ? 'إخفاء التفسير' : 'إظهار التفسير'}
        </button>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Surah List */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 max-h-96 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4 text-emerald-700">قائمة السور</h3>
          <div className="space-y-2">
            {surahs.map(surah => (
              <div
                key={surah.number}
                onClick={() => loadSurahDetails(surah.number)}
                className="flex items-center gap-4 p-4 bg-white rounded-lg cursor-pointer hover:bg-emerald-50 transition-all duration-300 hover:shadow-md"
              >
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  {surah.number}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{surah.englishName}</div>
                  <div className="text-sm text-gray-600">{surah.name} - {surah.numberOfAyahs} آيات</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Surah Details */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6">
          {selectedSurah ? (
            <div>
              <div className="bg-emerald-600 text-white p-6 rounded-xl text-center mb-6">
                <h3 className="text-2xl font-bold">{selectedSurah.englishName}</h3>
                <p className="opacity-90">{selectedSurah.name} - {selectedSurah.numberOfAyahs} آيات</p>
              </div>
              <div className="max-h-96 overflow-y-auto space-y-6">
                {selectedSurah.ayahs?.map(ayah => (
                  <div key={ayah.number} className="bg-white p-6 rounded-lg border-r-4 border-amber-400">
                    <p className="text-xl leading-relaxed mb-4 font-arabic">{ayah.text}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block w-8 h-8 bg-amber-100 rounded-full text-center leading-8 text-sm font-bold text-amber-700">
                        {ayah.numberInSurah}
                      </span>
                      <p className="text-gray-600 italic">{ayah.translation}</p>
                    </div>
                    {showTafsir && (
                      <div className="bg-emerald-50 p-4 rounded-lg border-r-2 border-emerald-400">
                        <h4 className="font-semibold text-emerald-700 mb-2">التفسير:</h4>
                        <p className="text-gray-700 leading-relaxed">{ayah.tafsir}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>الرجاء اختيار سورة من القائمة</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const HadithSection = ({ hadiths, selectedHadithBook, setSelectedHadithBook, loadHadiths }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-emerald-700 mb-8 flex items-center gap-4">
        <Book className="w-8 h-8 text-amber-500" />
        الأحاديث النبوية الشريفة مع الشروح والفوائد
      </h2>
      
      <div className="mb-6 flex gap-4">
        <select 
          value={selectedHadithBook}
          onChange={(e) => setSelectedHadithBook(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="bukhari">صحيح البخاري</option>
          <option value="muslim">صحيح مسلم</option>
        </select>
        <button 
          onClick={loadHadiths}
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-300 flex items-center gap-2"
        >
          <Search className="w-5 h-5" />
          عرض الأحاديث
        </button>
      </div>

      <div className="space-y-8">
        {hadiths.map(hadith => (
          <div key={hadith.id} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl overflow-hidden shadow-lg">
            {/* Hadith Header */}
            <div className="bg-emerald-600 text-white p-4">
              <h3 className="text-xl font-bold">{hadith.title}</h3>
              <p className="text-emerald-100 text-sm">{hadith.reference}</p>
            </div>
            
            {/* Hadith Content */}
            <div className="p-6">
              {/* Full Hadith Text */}
              <div className="bg-white p-6 rounded-lg border-r-4 border-emerald-500 mb-6">
                <h4 className="font-bold text-gray-800 mb-3">نص الحديث:</h4>
                <p className="text-lg leading-relaxed text-gray-800 font-arabic">{hadith.text}</p>
              </div>

              {/* Explanation */}
              <div className="bg-amber-50 p-6 rounded-lg border-r-4 border-amber-400 mb-6">
                <h4 className="font-bold text-amber-700 mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  الشرح والتفسير:
                </h4>
                <p className="text-gray-700 leading-relaxed">{hadith.explanation}</p>
              </div>

              {/* Benefits */}
              {hadith.benefits && (
                <div className="bg-green-50 p-6 rounded-lg border-r-4 border-green-400">
                  <h4 className="font-bold text-green-700 mb-3">الفوائد والعبر:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    {hadith.benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-700">{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AzkarSection = ({ azkar }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-emerald-700 mb-8 flex items-center gap-4">
        <Heart className="w-8 h-8 text-amber-500" />
        الأذكار والأدعية
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {azkar.map((category, index) => (
          <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-emerald-600 text-white p-4 text-center">
              <div className="text-2xl mb-2">{category.icon}</div>
              <h3 className="text-lg font-bold">{category.category}</h3>
            </div>
            <div className="p-4 space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="bg-white p-4 rounded-lg border border-emerald-100">
                  <p className="text-sm leading-relaxed mb-2">{item.text}</p>
                  <div className="text-amber-600 font-semibold text-sm">{item.count} مرة</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PrayerTimesSection = ({ city, setCity, prayerTimes, loadPrayerTimes }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-emerald-700 mb-8 flex items-center gap-4">
        <Clock className="w-8 h-8 text-amber-500" />
        مواقيت الصلاة
      </h2>
      
      <div className="mb-6 flex gap-4">
        <input 
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="ادخل اسم المدينة"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
        <button 
          onClick={loadPrayerTimes}
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-300 flex items-center gap-2"
        >
          <Search className="w-5 h-5" />
          عرض المواقيت
        </button>
      </div>

      {prayerTimes && (
        <div>
          <div className="text-center mb-6 text-lg text-gray-600">
            {city} - {prayerTimes.date.readable}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'الفجر', time: prayerTimes.timings.Fajr },
              { name: 'الشروق', time: prayerTimes.timings.Sunrise },
              { name: 'الظهر', time: prayerTimes.timings.Dhuhr },
              { name: 'العصر', time: prayerTimes.timings.Asr },
              { name: 'المغرب', time: prayerTimes.timings.Maghrib },
              { name: 'العشاء', time: prayerTimes.timings.Isha }
            ].map((prayer, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl text-center border-t-4 border-emerald-500 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-bold text-emerald-700 mb-2">{prayer.name}</h3>
                <div className="text-2xl font-bold text-gray-800">{prayer.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SebhaSection = ({ sebhaCount, incrementSebha, resetSebha }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-emerald-700 mb-8 flex items-center gap-4">
        <RotateCcw className="w-8 h-8 text-amber-500" />
        السبحة الإلكترونية
      </h2>
      
      <div className="max-w-md mx-auto text-center">
        <div 
          onClick={incrementSebha}
          className="w-64 h-64 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full mx-auto mb-8 flex items-center justify-center text-white text-6xl font-bold cursor-pointer shadow-2xl hover:scale-105 transition-transform duration-300 active:scale-95"
        >
          {sebhaCount}
        </div>
        
        <select className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
          <option>سبحان الله وبحمده سبحان الله العظيم</option>
          <option>الحمد لله يوما وعمرا علي كل حال</option>
          <option>الله أكبر</option>
          <option>لا إله إلا الله</option>
          <option>أستغفر الله</option>
          <option>لا حول ولا قوة إلا بالله</option>
          <option>اللهم صلي علي النبي</option>
        </select>
        
        <div className="flex gap-4">
          <button 
            onClick={incrementSebha}
            className="flex-1 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-300"
          >
            تسبيح
          </button>
          <button 
            onClick={resetSebha}
            className="flex-1 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300"
          >
            إعادة
          </button>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [activeSection, setActiveSection] = useState('quran');
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [hadiths, setHadiths] = useState([]);
  const [azkar, setAzkar] = useState([]);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [sebhaCount, setSebhaCount] = useState(0);
  const [selectedHadithBook, setSelectedHadithBook] = useState('bukhari');
  const [city, setCity] = useState('Cairo');
  const [loading, setLoading] = useState(false);
  const [showTafsir, setShowTafsir] = useState(false);

  // Load Surahs
  const loadSurahs = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.alquran.cloud/v1/surah');
      const data = await response.json();
      if (data.code === 200) {
        setSurahs(data.data);
        if (data.data.length > 0) {
          loadSurahDetails(1);
        }
      }
    } catch (error) {
      console.error('Error loading surahs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load Surah Details with Tafsir
  const loadSurahDetails = async (surahNumber) => {
    try {
      setLoading(true);
      // Get Arabic text
      const arabicResponse = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`);
      const arabicData = await arabicResponse.json();
      
      // Get English translation for reference
      const translationResponse = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.sahih`);
      const translationData = await translationResponse.json();

      if (arabicData.code === 200 && translationData.code === 200) {
        // Combine Arabic and translation
        const combinedData = {
          ...arabicData.data,
          ayahs: arabicData.data.ayahs.map((ayah, index) => ({
            ...ayah,
            translation: translationData.data.ayahs[index]?.text || '',
            tafsir: getTafsirForAyah(surahNumber, ayah.numberInSurah)
          }))
        };
        setSelectedSurah(combinedData);
      }
    } catch (error) {
      console.error('Error loading surah details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Simple Tafsir data (in real implementation, you'd fetch from a tafsir API)
  const getTafsirForAyah = (surahNumber, ayahNumber) => {
    const tafsirData = {
      1: {
        1: "بسم الله الرحمن الرحيم: افتتاح كل عمل بذكر الله تعالى، والرحمن والرحيم صفتان من صفات الله تدلان على سعة رحمته",
        2: "الحمد لله رب العالمين: الثناء والشكر لله الذي خلق جميع المخلوقات ورباها وأنعم عليها",
        3: "الرحمن الرحيم: تأكيد على رحمة الله الواسعة في الدنيا والآخرة",
        4: "مالك يوم الدين: الله وحده هو الحاكم والمتصرف في يوم القيامة",
        5: "إياك نعبد وإياك نستعين: توحيد الله في العبادة والاستعانة به وحده",
        6: "اهدنا الصراط المستقيم: دعاء بطلب الهداية إلى الطريق القويم",
        7: "صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين: طريق الأنبياء والصالحين، وليس طريق اليهود والنصارى"
      }
    };
    return tafsirData[surahNumber]?.[ayahNumber] || "التفسير غير متوفر لهذه الآية";
  };

  // Load Complete Hadiths with detailed explanations
  const loadHadiths = () => {
    const hadithData = {
      bukhari: [
        {
          id: 1,
          title: "حديث النية",
          text: "حدثنا الحميدي عبد الله بن الزبير قال: حدثنا سفيان قال: حدثنا يحيى بن سعيد الأنصاري قال: أخبرني محمد بن إبراهيم التيمي أنه سمع علقمة بن وقاص الليثي يقول: سمعت عمر بن الخطاب رضي الله عنه على المنبر قال: سمعت رسول الله صلى الله عليه وسلم يقول: (إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى، فمن كانت هجرته إلى الله ورسوله فهجرته إلى الله ورسوله، ومن كانت هجرته لدنيا يصيبها أو امرأة ينكحها فهجرته إلى ما هاجر إليه)",
          reference: "صحيح البخاري - كتاب بدء الوحي - باب كيف كان بدء الوحي إلى رسول الله صلى الله عليه وسلم - حديث رقم 1",
          explanation: "هذا الحديث من أهم الأحاديث في الإسلام، ويُعرف بحديث النية. يعلمنا أن قبول العمل عند الله مرتبط بالنية الصحيحة. فالعمل الواحد قد يكون عبادة أو عادة حسب النية. والهجرة المذكورة تشمل الهجرة الحسية من مكة إلى المدينة، والهجرة المعنوية من المعاصي إلى الطاعات. وهذا الحديث أصل في تطهير القلوب وإخلاص العمل لله تعالى.",
          benefits: [
            "وجوب إخلاص النية لله في جميع الأعمال",
            "أن الأعمال تُقبل أو تُرد بحسب النيات",
            "أهمية تطهير القلب من حظوظ النفس",
            "أن الهجرة لها أنواع مختلفة حسب النية"
          ]
        },
        {
          id: 2,
          title: "حديث جبريل في تعليم الدين",
          text: "حدثنا أبو بكر بن أبي شيبة، حدثنا أبو خالد الأحمر، عن عمرو بن قيس، عن عمرو بن أوس، عن عبد الرحمن بن أهبان، عن عبد الله بن مسعود، قال: بينما نحن عند رسول الله صلى الله عليه وسلم ذات يوم، إذ طلع علينا رجل شديد بياض الثياب، شديد سواد الشعر، لا يُرى عليه أثر السفر، ولا يعرفه منا أحد، فجلس إلى النبي صلى الله عليه وسلم، فأسند ركبتيه إلى ركبتيه، ووضع كفيه على فخذيه، وقال: يا محمد، أخبرني عن الإسلام؟ فقال رسول الله صلى الله عليه وسلم: (الإسلام أن تشهد أن لا إله إلا الله وأن محمداً رسول الله، وتقيم الصلاة، وتؤتي الزكاة، وتصوم رمضان، وتحج البيت إن استطعت إليه سبيلاً). قال: صدقت. قال: فعجبنا له يسأله ويصدقه، قال: فأخبرني عن الإيمان؟ قال: (أن تؤمن بالله، وملائكته، وكتبه، ورسله، واليوم الآخر، وتؤمن بالقدر خيره وشره). قال: صدقت. قال: فأخبرني عن الإحسان؟ قال: (أن تعبد الله كأنك تراه، فإن لم تكن تراه فإنه يراك). قال: فأخبرني عن الساعة؟ قال: (ما المسؤول عنها بأعلم من السائل). قال: فأخبرني عن أمارتها؟ قال: (أن تلد الأمة ربتها، وأن ترى الحفاة العراة العالة رعاء الشاء يتطاولون في البنيان). قال: ثم انطلق، فلبثت مليّاً، ثم قال لي: (يا عمر، أتدري من السائل؟). قلت: الله ورسوله أعلم. قال: (فإنه جبريل، أتاكم يعلمكم دينكم)",
          reference: "صحيح البخاري - كتاب الإيمان - باب سؤال جبريل النبي عن الإيمان والإسلام والإحسان - حديث رقم 50",
          explanation: "هذا الحديث العظيم يُعرف بحديث جبريل، وهو من أصول الدين الإسلامي. يشتمل على تعريف مراتب الدين الثلاث: الإسلام والإيمان والإحسان. والحديث يوضح أن الإسلام هو الأعمال الظاهرة، والإيمان هو الاعتقادات الباطنة، والإحسان هو مراقبة الله في العبادة. كما يشير إلى علامات الساعة وطرق التعليم بالسؤال والجواب.",
          benefits: [
            "تعريف مراتب الدين الثلاث: الإسلام والإيمان والإحسان",
            "أهمية العلم وطلبه بالطرق المناسبة",
            "مراقبة الله في العبادة والعمل",
            "التحذير من علامات الساعة والاستعداد لها",
            "أن جبريل عليه السلام يأتي لتعليم الأمة"
          ]
        },
        {
          id: 3,
          title: "حديث تعريف المسلم",
          text: "حدثنا آدم بن أبي إياس، قال: حدثنا شعبة، عن عبد الله بن أبي السفر وإسماعيل بن أبي خالد، عن الشعبي، عن عبد الله بن عمرو، عن النبي صلى الله عليه وسلم قال: (المسلم من سلم المسلمون من لسانه ويده، والمهاجر من هجر ما نهى الله عنه)",
          reference: "صحيح البخاري - كتاب الإيمان - باب المسلم من سلم المسلمون من لسانه ويده - حديث رقم 10",
          explanation: "هذا الحديث يوضح حقيقة الإسلام العملية، فالمسلم الحقيقي هو من أمن الناس من أذاه بالقول والفعل. واللسان واليد ذُكرا لأنهما أكثر أعضاء الإنسان استعمالاً في إيذاء الآخرين. والهجرة المذكورة هي الهجرة المعنوية من المعاصي إلى الطاعات، وهي نوع من الجهاد النفسي المطلوب من كل مسلم.",
          benefits: [
            "تعريف المسلم الحقيقي بأعماله وليس بمجرد الانتساب",
            "أهمية حفظ اللسان من الكلام المؤذي",
            "ضرورة كف الأذى عن الناس بالأفعال",
            "الهجرة من المعاصي واجب على كل مسلم",
            "الإسلام دين السلام والأمان للجميع"
          ]
        }
      ],
      muslim: [
        {
          id: 1,
          title: "حديث الإحسان في كل شيء",
          text: "حدثنا يحيى بن يحيى التميمي، قال: قرأت على مالك، عن أبي الزناد، عن الأعرج، عن أبي هريرة، أن رسول الله صلى الله عليه وسلم قال: (إن الله كتب الإحسان على كل شيء، فإذا قتلتم فأحسنوا القتلة، وإذا ذبحتم فأحسنوا الذبح، وليحد أحدكم شفرته، فليرح ذبيحته)",
          reference: "صحيح مسلم - كتاب الصيد والذبائح وما يؤكل من الحيوان - باب الأمر بإحسان الذبح والقتل وتحديد الشفرة - حديث رقم 1955",
          explanation: "هذا الحديث العظيم يؤسس لمبدأ الإحسان في جميع جوانب الحياة. فالإسلام دين الرحمة حتى في الأمور التي قد تبدو قاسية كالقتل والذبح. والحديث يعلمنا أن نتقن أعمالنا ونحسن فيها، وأن نراعي الرحمة حتى مع الحيوانات عند ذبحها للطعام. وهذا من كمال الشريعة الإسلامية التي تراعي الرحمة في كل الأحوال.",
          benefits: [
            "وجوب الإحسان في جميع الأعمال",
            "إظهار الرحمة حتى مع الحيوانات",
            "إتقان العمل وعدم الإهمال فيه",
            "التوازن بين المصلحة والرحمة",
            "أن الإسلام دين شامل لجميع جوانب الحياة"
          ]
        },
        {
          id: 2,
          title: "حديث فضل الدال على الخير",
          text: "حدثنا يحيى بن أيوب وقتيبة بن سعيد وعلي بن حجر قالوا: حدثنا إسماعيل - وهو ابن جعفر - عن العلاء، عن أبيه، عن أبي هريرة، أن رسول الله صلى الله عليه وسلم قال: (من دعا إلى هدى كان له من الأجر مثل أجور من تبعه لا ينقص ذلك من أجورهم شيئاً، ومن دعا إلى ضلالة كان عليه من الإثم مثل آثام من تبعه لا ينقص ذلك من آثامهم شيئاً)",
          reference: "صحيح مسلم - كتاب العلم - باب من سن سنة حسنة أو سيئة ومن دعا إلى هدى أو ضلالة - حديث رقم 2674",
          explanation: "هذا الحديث يبين فضل الدعوة إلى الخير والهداية، وأن الداعي إلى الخير ينال أجر كل من اتبعه دون أن ينقص من أجرهم شيء. وهذا من عدل الله وكرمه أن يضاعف الأجر للداعين إلى الخير. كما يحذر من الدعوة إلى الباطل والضلال لأن صاحبها يحمل وزر كل من ضل بسببه. والحديث يحث على نشر العلم والخير بين الناس.",
          benefits: [
            "فضل الدعوة إلى الخير والهداية",
            "مضاعفة الأجر للداعي إلى الخير",
            "التحذير من الدعوة إلى الباطل",
            "أهمية نشر العلم النافع",
            "مسؤولية كل مسلم في هداية الآخرين"
          ]
        }
      ]
    };
    setHadiths(hadithData[selectedHadithBook] || []);
  };

  const loadAzkar = () => {
    const azkarData = [
      {
        category: "أذكار الصباح",
        icon: "☀️",
        items: [
          { text: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير", count: 1 },
          { text: "اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت", count: 1 },
          { text: "سبحان الله وبحمده", count: 100 }
        ]
      },
      {
        category: "أذكار المساء",
        icon: "🌙",
        items: [
          { text: "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له", count: 1 },
          { text: "اللهم بك أمسينا وبك أصبحنا وبك نحيا وبك نموت وإليك النشور", count: 1 }
        ]
      },
      {
        category: "أذكار بعد الصلاة",
        icon: "🕌",
        items: [
          { text: "أستغفر الله، أستغفر الله، أستغفر الله", count: 3 },
          { text: "اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام", count: 1 },
          { text: "سبحان الله", count: 33 },
          { text: "الحمد لله", count: 33 },
          { text: "الله أكبر", count: 34 }
        ]
      }
    ];
    setAzkar(azkarData);
  };

  const loadPrayerTimes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5`);
      const data = await response.json();
      if (data.code === 200) {
        setPrayerTimes(data.data);
      }
    } catch (error) {
      console.error('Error loading prayer times:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeSection === 'quran' && surahs.length === 0) {
      loadSurahs();
    } else if (activeSection === 'hadith') {
      loadHadiths();
    } else if (activeSection === 'azkar') {
      loadAzkar();
    } else if (activeSection === 'prayer') {
      loadPrayerTimes();
    }
  }, [activeSection, selectedHadithBook]);

  const showSection = (section) => {
    setActiveSection(section);
  };

  const incrementSebha = () => {
    setSebhaCount(prev => prev + 1);
  };

  const resetSebha = () => {
    setSebhaCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-2xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-4xl">🕌</span>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2">فإني قريب</h1>
              <p className="text-lg opacity-90 mb-2">موقع إسلامي شامل للقرآن والحديث والأذكار ومواقيت الصلاة</p>
              <span className="text-sm bg-white/20 px-4 py-1 rounded-full">
                تصميم المبرمج: محمود محمد محمود أبو الفتوح احمد العزيري
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 py-4">
            {[
              { id: 'quran', label: 'القرآن الكريم', icon: <BookOpen className="w-5 h-5" /> },
              { id: 'hadith', label: 'الأحاديث النبوية', icon: <Book className="w-5 h-5" /> },
              { id: 'azkar', label: 'الأذكار والأدعية', icon: <Heart className="w-5 h-5" /> },
              { id: 'prayer', label: 'مواقيت الصلاة', icon: <Clock className="w-5 h-5" /> },
              { id: 'sebha', label: 'السبحة الإلكترونية', icon: <RotateCcw className="w-5 h-5" /> }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => showSection(item.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeSection === item.id
                    ? 'bg-emerald-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeSection === 'quran' && (
          <QuranSection
            surahs={surahs}
            loadSurahDetails={loadSurahDetails}
            selectedSurah={selectedSurah}
            showTafsir={showTafsir}
            setShowTafsir={setShowTafsir}
          />
        )}

        {activeSection === 'hadith' && (
          <HadithSection
            hadiths={hadiths}
            selectedHadithBook={selectedHadithBook}
            setSelectedHadithBook={setSelectedHadithBook}
            loadHadiths={loadHadiths}
          />
        )}

        {activeSection === 'azkar' && (
          <AzkarSection azkar={azkar} />
        )}

        {activeSection === 'prayer' && (
          <PrayerTimesSection
            city={city}
            setCity={setCity}
            prayerTimes={prayerTimes}
            loadPrayerTimes={loadPrayerTimes}
          />
        )}

        {activeSection === 'sebha' && (
          <SebhaSection
            sebhaCount={sebhaCount}
            incrementSebha={incrementSebha}
            resetSebha={resetSebha}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-12">
        <p>&copy; 2025 فإني قريب | جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
};

export default Index;
