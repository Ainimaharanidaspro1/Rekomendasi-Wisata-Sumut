document.addEventListener("DOMContentLoaded", () => {

    // ID halaman ini 
    const currentId = document.body.getAttribute("data-id");

    console.log("Current ID:", currentId);
    console.log("Total destinasi:", destinasi.length);

    // Build TF-IDF
    const { TFIDFs } = buildSimilarityMatrix(destinasi);

    const MIN_SIMILARITY = 0.05;
    const TAG_BONUS = 0.15;   // Jika 2 tag sama, dapat bonus

    const currentDest = destinasi.find(d => d.id === currentId);
    if (!currentDest) return;

    const currentTypes = currentDest.types || [];

    // Cari destinasi mirip
    const hasil = getSimilarDestinations(destinasi, TFIDFs, currentId, 10)
    // threshold similarity
    .filter(item => item.skor >= MIN_SIMILARITY)

    // wajib minimal 1 tag sama
    .map(item => {
      const itemTypes = item.types || [];

      const sameTags = itemTypes.filter(t => currentTypes.includes(t));
      const sameCount = sameTags.length;

      if (sameCount === 0) return null;

    // bonus hanya jika 2 tag sama
      let finalScore = item.skor;
      if (sameCount >= 2) {
        finalScore += TAG_BONUS;
      }

     return {
        ...item,
        finalScore,
        sameCount
      };
    })
    .filter(Boolean)

     // urutkan ulang
    .sort((a, b) => b.finalScore - a.finalScore)

    // ambil top 5
    .slice(0, 5);

    console.log("Hasil mirip:", hasil);

    const box = document.getElementById("miripContainer");
      console.log("Container:", box);

    if (!box) {
        console.error("miripContainer TIDAK ditemukan di HTML");
        return;
    }

    if (hasil.length === 0) {
        box.innerHTML = "<p>Tidak ada destinasi mirip.</p>";
        return;
    }

    function ambilKalimatPertama(text) {
    return text
        .replace(/\n+/g, " ")
        .split(".")[0] + ".";
    }

    hasil.forEach(item => {
    box.innerHTML += `
        <div class="mirip-card">
            <img src="${item.gambar}" alt="${item.nama}">
            <div class="mirip-content">
                <h3>${item.nama}</h3>
                <p>${ambilKalimatPertama(item.deskripsi)}</p>
                <div class="mirip-score">
                    Kemiripan: ${(item.skor * 100).toFixed(1)}%
                </div>
                <a href="${item.link}" class="mirip-btn">
                    Selengkapnya
                </a>
            </div>
        </div>
    `;
});

});
