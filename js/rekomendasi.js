// Content-Based Filtering 
// cara kerja: setiap kali pilihan berubah -> computeScore() -> render top results

// === Data destinasi ===
const destinasi = [
  { name: "Danau Toba", types:["alam","danau"], budgetCategory:"medium", priceEstimate:150000, suasana:"tenang", desc:"Danau vulkanik luas dengan pemandangan indah dan budaya Batak.", image:"selengkapnya/menu/1.jpg", slug:"danautoba"},
  { name: "Bukit Holbung", types:["alam","bukit"], budgetCategory:"cheap", priceEstimate:50000, suasana:"tenang", desc:"Bukit berdekatan dengan area wisata kebun dan spot foto.", image:"selengkapnya/menu/3.jpg", slug:"bukit_holbung"},
  { name: "Air Terjun Sipiso-piso", types:["alam","air-terjun"], budgetCategory:"cheap", priceEstimate:50000, suasana:"ramai", desc:"Air terjun tinggi di tepi kaldera, populer untuk wisatawan.", image:"selengkapnya/menu/2.jpg", slug:"airterjunsipiso_piso"},
  { name: "Bukit Silalahi", types:["alam","bukit"], budgetCategory:"cheap", priceEstimate:60000, suasana:"tenang", desc:"Bukit untuk panorama dan area berkebun di sekitarnya.", image:"selengkapnya/menu/4.jpg", slug:"bukit_silalahi"},
  { name: "Danau Lau Kawar", types:["alam","danau"], budgetCategory:"cheap", priceEstimate:80000, suasana:"tenang", desc:"Danau kecil yang tenang dengan pemandangan pegunungan.", image:"selengkapnya/menu/7.jpg", slug:"danau_law_kawar"},
  { name: "Gunung Sibayak", types:["alam","gunung"], budgetCategory:"medium", priceEstimate:200000, suasana:"tenang", desc:"Pendakian populer dengan kawah fumarola di puncak.", image:"selengkapnya/menu/6.jpg", slug:"gunung_sibayak"},
  { name: "Paropo", types:["alam","bukit"], budgetCategory:"cheap", priceEstimate:70000, suasana:"tenang", desc:"Spot alam lokal untuk jalan-jalan dan foto.", image:"selengkapnya/menu/5.jpg", slug:"paropo"},
  { name: "Geosite Sipinsur", types:["geosite","alam"], budgetCategory:"cheap", priceEstimate:70000, suasana:"tenang", desc:"Formasi geologi & pemandangan jurang yang memukau.", image:"selengkapnya/menu/8.png", slug:"geosite_sipinsur"},
  { name: "Pulau Tulas", types:["pulau","alam"], budgetCategory:"expensive", priceEstimate:450000, suasana:"tenang", desc:"Pulau kecil dengan pantai dan fasilitas terbatas (muat perahu).", image:"selengkapnya/menu/9.jpg", slug:"pulau_tulas"},
  { name: "Gundaling Farmstead", types:["tematik","bukit"], budgetCategory:"medium", priceEstimate:120000, suasana:"ramai", desc:"Area wisata keluarga dengan kafe, taman, dan spot foto.", image:"selengkapnya/menu/11.jpg", slug:"gundaling_farmstead"},
  { name: "Mikie Funland", types:["tematik","hiburan"], budgetCategory:"expensive", priceEstimate:300000, suasana:"ramai", desc:"Taman hiburan / indoor park, cocok keluarga.", image:"selengkapnya/menu/10.jpg", slug:"mikie_funland"},
  { name: "Batu Passa & Liang Sipogu", types:["alam","geosite"], budgetCategory:"cheap", priceEstimate:70000, suasana:"tenang", desc:"Spot alam dan formasi batu khas.", image:"selengkapnya/menu/12.jpeg", slug:"batu_passa"},
  { name: "Panatapan Batu Anduhur", types:["bukit","alam"], budgetCategory:"cheap", priceEstimate:60000, suasana:"tenang", desc:"Viewpoint untuk melihat lembah dan sunrise.", image:"selengkapnya/menu/13.jpg", slug:"panatapan_batu"},
  { name: "Danau Sidihoni", types:["danau","alam"], budgetCategory:"medium", priceEstimate:130000, suasana:"tenang", desc:"Danau yang relatif sepi, cocok untuk relaksasi.", image:"selengkapnya/menu/15.jpg", slug:"danau_sidihoni"},
  { name: "Batu Gantung", types:["geosite","alam"], budgetCategory:"cheap", priceEstimate:60000, suasana:"tenang", desc:"Formasi batu menarik untuk fotografi.", image:"selengkapnya/menu/14.jpg", slug:"batu_gantung"},
  { name: "The Kaldera", types:["geosite","alam"], budgetCategory:"expensive", priceEstimate:400000, suasana:"tenang", desc:"Attraksi premium dengan pemandangan kaldera vulkanik.", image:"selengkapnya/menu/16.jpg", slug:"the_kaldera"},
  { name: "Air Terjun Efrata", types:["air-terjun","alam"], budgetCategory:"cheap", priceEstimate:60000, suasana:"tenang", desc:"Air terjun lokal, cocok untuk trekking ringan.", image:"selengkapnya/menu/17.jpg", slug:"air_terjun_efrata"},
  { name: "Air Terjun Siringo", types:["air-terjun","alam"], budgetCategory:"cheap", priceEstimate:60000, suasana:"tenang", desc:"Air terjun dengan kolam jernih.", image:"selengkapnya/menu/19.jpg", slug:"air_terjun_siringo"},
  { name: "Bukit Kubu Berastagi", types:["bukit","alam"], budgetCategory:"cheap", priceEstimate:70000, suasana:"tenang", desc:"Bukit populer dekat Berastagi dengan spot foto.", image:"selengkapnya/menu/18.jpg", slug:"bukit_kubu"},
  { name: "Air Terjun Ponot", types:["air-terjun","alam"], budgetCategory:"cheap", priceEstimate:60000, suasana:"tenang", desc:"Salah satu air terjun tersembunyi di daerah.", image:"selengkapnya/menu/20.jpeg", slug:"air_terjun_ponot"},
  { name: "Tuktuk Siadong", types:["danau","desa"], budgetCategory:"cheap", priceEstimate:90000, suasana:"ramai", desc:"Pemukiman di tepi Danau Toba yang ramai dengan pelabuhan kecil.", image:"selengkapnya/menu/21.jpg", slug:"tuktuk_siadong"},
  { name: "Wisata Anugerah Indah Sippan", types:["tematik","alam"], budgetCategory:"cheap", priceEstimate:70000, suasana:"ramai", desc:"Objek wisata lokal dengan fasilitas wisata keluarga.", image:"selengkapnya/menu/23.jpg", slug:"anugerah_indah"},
  { name: "Taman Bunga Sapo Juma", types:["tematik","garden"], budgetCategory:"cheap", priceEstimate:80000, suasana:"ramai", desc:"Kebun bunga indah untuk foto dan rekreasi keluarga.", image:"selengkapnya/menu/22.jpg", slug:"taman_bunga_sapo"},
  { name: "Air Terjun Sikulikap", types:["air-terjun","alam"], budgetCategory:"cheap", priceEstimate:70000, suasana:"tenang", desc:"Air terjun alami dengan trek yang nyaman.", image:"selengkapnya/menu/24.png", slug:"air_terjun_sikulikap"},
  { name: "The Waterfall - Taman Simalem Resort", types:["air-terjun","tematik"], budgetCategory:"expensive", priceEstimate:350000, suasana:"tenang", desc:"Air terjun di area resort premium.", image:"selengkapnya/menu/25.jpg", slug:"taman_simalem"},
  { name: "Bukit Indah Simarjarunjung", types:["bukit","alam"], budgetCategory:"medium", priceEstimate:140000, suasana:"tenang", desc:"Bukit dengan panorama fotogenik dan kafe kecil.", image:"selengkapnya/menu/27.jpg", slug:"bukit_simarjarunjung"},
  { name: "Wisata Bukit Gibeon", types:["bukit","alam"], budgetCategory:"cheap", priceEstimate:70000, suasana:"tenang", desc:"Bukit asri untuk melihat pemandangan alam.", image:"selengkapnya/menu/26.jpg", slug:"bukit_gibeon"},
  { name: "Bukit Doa", types:["bukit","spiritual"], budgetCategory:"cheap", priceEstimate:60000, suasana:"tenang", desc:"Tempat doa dan meditasi dengan pemandangan luas.", image:"selengkapnya/menu/28.jpg", slug:"bukit_doa"},
  { name: "Tangkahan", types:["satwa","alam"], budgetCategory:"expensive", priceEstimate:400000, suasana:"tenang", desc:"Ekowisata dengan pengalaman gajah dan hutan.", image:"selengkapnya/menu/29.jpg", slug:"tangkahan"},
  { name: "Hillpark Sibolangit", types:["tematik","hiburan"], budgetCategory:"medium", priceEstimate:180000, suasana:"ramai", desc:"Taman hiburan keluarga di Sibolangit.", image:"selengkapnya/menu/31.jpg", slug:"hillpark"},
  { name: "Bukit Lawang", types:["satwa","alam"], budgetCategory:"expensive", priceEstimate:300000, suasana:"tenang", desc:"Famous for orangutan trekking and jungle tours.", image:"selengkapnya/menu/30.jpg", slug:"bukit_lawang"},
  { name: "Bukit Sibea Bea", types:["bukit","alam"], budgetCategory:"cheap", priceEstimate:70000, suasana:"tenang", desc:"Bukit dengan panorama pemandangan alam.", image:"selengkapnya/menu/32.jpg", slug:"bukit_sibeabea"}
];

// === End data ===

// weights untuk scoring 
const WEIGHTS = {
  type: 0.5,
  budget: 0.3,
  suasana: 0.2
};

// util: check if destinasi types contains selected type
function typeMatchScore(itemTypes, selectedType){
  if(selectedType === "any") return 1;
  return itemTypes.includes(selectedType) ? 1 : 0;
}

// budget match: if user selects 'any' -> 1
function budgetMatchScore(itemBudget, selectedBudget){
  if(selectedBudget === "any") return 1;
  return itemBudget === selectedBudget ? 1 : 0;
}

// suasana match
function suasanaMatchScore(itemSuasana, selectedSuasana){
  if(selectedSuasana === "any") return 1;
  if(selectedSuasana === "tenang" || selectedSuasana === "ramai"){
    if(itemSuasana === "mixed") return 0.6;
    return itemSuasana === selectedSuasana ? 1 : 0;
  }
  return 0;
}

// compute score for single item
function computeScore(item, prefs){
  const t = typeMatchScore(item.types, prefs.type);
  const b = budgetMatchScore(item.budgetCategory, prefs.budget);
  const s = suasanaMatchScore(item.suasana, prefs.suasana);

  const score = (t * WEIGHTS.type) + (b * WEIGHTS.budget) + (s * WEIGHTS.suasana);
  return score;
}

// render results (top N)
function renderResults(sorted){
  const container = document.getElementById('hasil');
  container.innerHTML = '';
  if(sorted.length === 0){
    container.innerHTML = '<p>Tidak ada hasil. Coba ubah preferensi.</p>';
    return;
  }

sorted.forEach(item => { 

    const card = document.createElement('div');
    card.className = 'card';

    // TYPE = dipisah per kata, satu bubble satu kata
    const typeTags = item.types
        .map(t => `<span class="tag-type">${escapeHtml(t)}</span>`)
        .join('');

    card.innerHTML = `
      <img src="${item.image}" alt="${escapeHtml(item.name)}" />

      <div class="body">
        
        <h3>${escapeHtml(item.name)}</h3>
        
        <div class="meta-top">
          <div class="type-tags">${typeTags}</div>

          <div class="tag-suasana">${escapeHtml(item.suasana)}</div>

          <div class="tag-price">Rp ${formatNumber(item.priceEstimate)}</div>

          <div class="tag-score">Score: ${item._score.toFixed(2)}</div>
        </div>

        <!-- DESC = 1 bubble saja -->
        <div class="desc-tags">
          <span class="tag-desc">${escapeHtml(item.desc)}</span>
        </div>

        <a class="more-btn" href="selengkapnya/${item.slug}.html">
        Selengkapnya
        </a>

      </div>
    `;

    container.appendChild(card);
});

}

// helper: format number
function formatNumber(n){
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
    })[m];
  });
}

function hasAtLeastOneSameType(itemTypes, selectedType) {
  if (selectedType === "any") return true;
  return itemTypes.includes(selectedType);
}

// main filtering function
function doFilterAndRender(){
  const type = document.getElementById('tipe').value;
  const budget = document.getElementById('budget').value;
  const suasana = document.getElementById('suasana').value;

// jika masih 'any' (belum dipilih user) → jangan tampilkan apa pun
  if (type === "any" || budget === "any" || suasana === "any") {
    document.getElementById('hasil').innerHTML = "";
    return;
  }

  const prefs = { type, budget, suasana };

  // compute score for every destinasi
  const scored = destinasi
  // FILTER TAG WAJIB
  .filter(d => hasAtLeastOneSameType(d.types, prefs.type))
  // HITUNG SCORE
  .map(d => {
    const clone = Object.assign({}, d);
    clone._score = computeScore(d, prefs);
    return clone;
  });

  // sort by score desc, filter only score > 0 
  const sorted = scored
  .filter(x => x._score > 0)
  .sort((a, b) => {
      // Sort score (descending)
      const scoreDiff = b._score - a._score;
      if (scoreDiff !== 0) return scoreDiff;

      // Jika score sama → urutkan berdasarkan priceEstimate (ascending)
      return a.priceEstimate - b.priceEstimate;
  });

  // render top 12
  renderResults(sorted.slice(0,12));
}

// attach event listeners
document.addEventListener('DOMContentLoaded', () => {

document.getElementById("btnRekomendasi")
    .addEventListener("click", doFilterAndRender);

});

