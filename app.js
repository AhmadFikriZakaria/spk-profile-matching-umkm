// Data Pelamar dari Google Form / Spreadsheet (per Juni 2026)
const candidates = [
    { name: "Nabila Lutfia Sari", scores: [5, 5, 5, 5, 5] },
    { name: "Rita Rahmawati", scores: [4, 2, 3, 3, 2] },
    { name: "Dhanda Rismanda", scores: [3, 2, 4, 4, 3] },
    { name: "Elfarizki Naufal", scores: [3, 4, 2, 2, 3] },
    { name: "Dwi Bagus Purwo Aji", scores: [5, 5, 3, 4, 4] },
    { name: "Haydar Ali Furqon", scores: [5, 4, 5, 4, 5] },
    { name: "Yusuf Rafii Ahmad", scores: [3, 2, 3, 4, 3] },
    { name: "Rizky Maulana", scores: [4, 3, 4, 5, 4] },
    { name: "Anisa Fitriani", scores: [5, 4, 5, 3, 4] },
    { name: "Dimas Saputra", scores: [3, 4, 3, 4, 3] },
    { name: "Putri Wulandari", scores: [5, 5, 4, 4, 5] },
    { name: "Kevin Pratama", scores: [4, 3, 5, 2, 4] },
    { name: "Tiara Kusuma", scores: [5, 4, 4, 5, 4] },
    { name: "Bima Satria", scores: [3, 2, 3, 4, 3] },
    { name: "Nadya Aulia", scores: [4, 5, 5, 3, 5] },
    { name: "Reza Aditya", scores: [5, 4, 3, 5, 4] },
    { name: "Siti Fadhilah", scores: [4, 4, 4, 4, 4] },
    { name: "Fajar Nugroho", scores: [3, 5, 4, 2, 3] },
    { name: "Amira Ramadhani", scores: [5, 4, 5, 5, 5] },
    { name: "Gilang Ramadhan", scores: [4, 3, 4, 4, 3] },
    { name: "Citra Ayu", scores: [5, 5, 4, 3, 4] },
    { name: "Dwi Susanto", scores: [2, 3, 3, 4, 2] },
    { name: "Viona Amelia", scores: [4, 4, 5, 4, 5] },
    { name: "Ihsan Kamil", scores: [5, 3, 4, 5, 4] },
    { name: "Sarah Oktaviani", scores: [4, 5, 4, 3, 3] },
    { name: "Hendra Wijaya", scores: [3, 4, 5, 4, 3] },
    { name: "Ayu Lestari", scores: [5, 4, 5, 5, 5] }
];

// Profil Target Ideal: K1=5, K2=4, K3=4, K4=4, K5=3
const targetProfile = [5, 4, 4, 4, 3];

// Fungsi Konversi Bobot GAP sesuai Aturan Jurnal
function getGapWeight(gap) {
    const gapMap = {
        0: 5.0,
        1: 4.5,
        "-1": 4.0,
        2: 3.5,
        "-2": 3.0,
        3: 2.5,
        "-3": 2.0,
        4: 1.5,
        "-4": 1.0
    };
    return gapMap[gap] !== undefined ? gapMap[gap] : 0;
}

// Format Angka Desimal
function formatNumber(num) {
    return num.toFixed(3);
}

// Inisialisasi Aplikasi
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Render Tabel Data Mentah
    const tbodyRaw = document.querySelector("#table-raw tbody");
    candidates.forEach((c, index) => {
        tbodyRaw.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td style="text-align: left">${c.name}</td>
                ${c.scores.map(s => `<td>${s}</td>`).join("")}
            </tr>
        `;
    });
    // Baris Target Ideal
    tbodyRaw.innerHTML += `
        <tr class="target-row">
            <td>-</td>
            <td style="text-align: left">Nilai Target Ideal</td>
            ${targetProfile.map(t => `<td>${t}</td>`).join("")}
        </tr>
    `;

    // 2 & 3. Render Tabel GAP dan Tabel Pembobotan
    const tbodyGap = document.querySelector("#table-gap tbody");
    const tbodyWeight = document.querySelector("#table-weight tbody");
    
    // Array untuk menyimpan data akhir kandidat
    const calculatedCandidates = [];

    candidates.forEach((c, index) => {
        const gaps = [];
        const weights = [];
        
        c.scores.forEach((score, i) => {
            const gap = score - targetProfile[i];
            const weight = getGapWeight(gap);
            gaps.push(gap);
            weights.push(weight);
        });

        // HTML Tabel GAP
        tbodyGap.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td style="text-align: left">${c.name}</td>
                ${gaps.map(g => `<td>${g}</td>`).join("")}
            </tr>
        `;

        // HTML Tabel Bobot
        tbodyWeight.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td style="text-align: left">${c.name}</td>
                ${weights.map(w => `<td>${w}</td>`).join("")}
            </tr>
        `;

        // 4. Hitung NCF dan NSF
        // K1, K2, K3 adalah Core Factor (Indeks 0, 1, 2)
        const coreSum = weights[0] + weights[1] + weights[2];
        const ncf = coreSum / 3;
        
        // K4, K5 adalah Secondary Factor (Indeks 3, 4)
        const secSum = weights[3] + weights[4];
        const nsf = secSum / 2;

        // Hitung Nilai Total Akhir (60% NCF + 40% NSF)
        const total = (0.6 * ncf) + (0.4 * nsf);

        calculatedCandidates.push({
            name: c.name,
            coreSum: coreSum,
            ncf: ncf,
            secSum: secSum,
            nsf: nsf,
            total: total
        });
    });

    // Render Tabel Factors (NCF & NSF)
    const tbodyFactors = document.querySelector("#table-factors tbody");
    calculatedCandidates.forEach((c, index) => {
        tbodyFactors.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td style="text-align: left">${c.name}</td>
                <td>${c.coreSum}</td>
                <td><strong>${formatNumber(c.ncf)}</strong></td>
                <td>${c.secSum}</td>
                <td><strong>${formatNumber(c.nsf)}</strong></td>
            </tr>
        `;
    });

    // 5. Urutkan dan Render Tabel Peringkat Akhir
    // Urutkan berdasarkan Nilai Total, jika sama (tie-breaker) urutkan berdasarkan NCF
    calculatedCandidates.sort((a, b) => {
        // Toleransi error desimal kecil
        if (Math.abs(b.total - a.total) < 0.0001) {
            return b.ncf - a.ncf;
        }
        return b.total - a.total;
    });

    const tbodyFinal = document.querySelector("#table-final tbody");
    calculatedCandidates.forEach((c, index) => {
        const isRank1 = index === 0;
        const rankClass = isRank1 ? "rank-1" : "";
        const rankLabel = isRank1 ? `<span class="rank-badge">1</span>` : index + 1;
        
        tbodyFinal.innerHTML += `
            <tr class="${rankClass}">
                <td>${rankLabel}</td>
                <td style="text-align: left">${c.name} ${isRank1 ? '👑 (Rekomendasi Utama)' : ''}</td>
                <td>${formatNumber(c.ncf)}</td>
                <td>${formatNumber(c.nsf)}</td>
                <td><strong>${formatNumber(c.total)}</strong></td>
            </tr>
        `;
    });

});
