// PRE-PROCESSING 
function tokenize(text) {
    return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(/\s+/)
        .filter(t => t.length > 1); // buang kata terlalu pendek
}

// Hitung TF (Term Frequency)
function computeTF(words) {
    const tf = {};
    words.forEach(w => {
        tf[w] = (tf[w] || 0) + 1;
    });
    const total = words.length;
    for (let w in tf) tf[w] = tf[w] / total;
    return tf;
}

// Hitung IDF (Inverse Document Frequency)
function computeIDF(docs) {
    const idf = {};
    const totalDocs = docs.length;

    docs.forEach(doc => {
        const encountered = new Set();
        for (let w in doc) {
            if (!encountered.has(w)) {
                idf[w] = (idf[w] || 0) + 1;
                encountered.add(w);
            }
        }
    });

    for (let w in idf) {
        idf[w] = Math.log10(totalDocs / idf[w]);
    }
    return idf;
}

// TF-IDF untuk satu dokumen
function computeTFIDF(tf, idf) {
    const tfidf = {};
    for (let w in tf) {
        tfidf[w] = tf[w] * (idf[w] || 0);
    }
    return tfidf;
}

// Hitung cosine similarity
function cosineSimilarity(a, b) {
    let dot = 0, magA = 0, magB = 0;

    for (let w in a) {
        dot += (a[w] || 0) * (b[w] || 0);
    }

    for (let w in a) magA += a[w] ** 2;
    for (let w in b) magB += b[w] ** 2;

    magA = Math.sqrt(magA);
    magB = Math.sqrt(magB);

    if (magA === 0 || magB === 0) return 0;

    return dot / (magA * magB);
}

// ======== BUILD MODEL SIMILARITY ========
function buildSimilarityMatrix(destinasi) {
    const docsWords = destinasi.map(d => tokenize(d.deskripsi));
    const TFs = docsWords.map(words => computeTF(words));
    const IDF = computeIDF(TFs);
    const TFIDFs = TFs.map(tf => computeTFIDF(tf, IDF));

    return { TFIDFs };
}

// Ambil destinasi mirip
function getSimilarDestinations(destinasi, TFIDFs, currentId, topN = 4) {
    const index = destinasi.findIndex(d => d.id === currentId);
    if (index === -1) return [];

    const currentVec = TFIDFs[index];

    const scores = destinasi.map((d, i) => {
        if (i === index) return null;
        return {
            ...d,
            skor: cosineSimilarity(currentVec, TFIDFs[i])
        };
    }).filter(Boolean);

    return scores.sort((a,b) => b.skor - a.skor).slice(0, topN);
}
