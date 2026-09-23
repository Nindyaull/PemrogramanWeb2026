// Fungsi generik untuk mengambil dan menampilkan data JSON apa saja
async function muatDataGenerik(pathJson, keys) {
    const tbody = document.querySelector(".table-responsive table tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody) return;

    if (loading) loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        await new Promise((resolve) => setTimeout(resolve, 600));
        const res = await fetch(pathJson);
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }

        const listData = await res.json();
        listData.forEach(function (item) {
            const tr = document.createElement("tr");

            // Generasi sel <td> berdasarkan daftar kunci yang dikirimkan
            let htmlKolom = "";
            keys.forEach(function (key) {
                htmlKolom += "<td>" + (item[key] !== undefined ? item[key] : "") + "</td>";
            });

            // Tambahkan kolom tombol Aksi
            htmlKolom += '<td><button type="button">Edit</button> <button type="button" class="btn-hapus">Hapus</button></td>';

            tr.innerHTML = htmlKolom;
            tbody.appendChild(tr);
        });
    } catch (err) {
        // Colspan disesuaikan otomatis dengan jumlah kolom + 1 kolom Aksi
        const totalKolom = keys.length + 1;
        tbody.innerHTML = '<tr><td colspan="' + totalKolom + '">Gagal memuat data: ' + err.message + '</td></tr>';
    } finally {
        if (loading) loading.style.display = "none";
    }
}