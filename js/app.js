// ===============================
// ANDRI WEBSITE
// app.js
// ===============================

// Database Local
let barang = JSON.parse(localStorage.getItem("barangEvent")) || [];

// Element
const listKontruksi = document.getElementById("listKontruksi");
const listFurniture = document.getElementById("listFurniture");
const listElectric = document.getElementById("listElectric");

const kategori = document.getElementById("kategori");
const namaBarang = document.getElementById("namaBarang");
const jumlahBarang = document.getElementById("jumlahBarang");

const btnTambah = document.getElementById("btnTambah");
const search = document.getElementById("search");

// Dashboard
const totalBarang = document.getElementById("totalBarang");
const totalKontruksi = document.getElementById("totalKontruksi");
const totalFurniture = document.getElementById("totalFurniture");
const totalElectric = document.getElementById("totalElectric");


// ===============================
// Simpan LocalStorage
// ===============================

function simpan(){

    localStorage.setItem(
        "barangEvent",
        JSON.stringify(barang)
    );

}

// ===============================
// Generate ID
// ===============================

function buatID(){

    return Date.now();

}

// ===============================
// Tambah Barang
// ===============================

btnTambah.onclick = ()=>{

    if(
        namaBarang.value.trim()===""
        ||
        jumlahBarang.value==""
    ){

        alert("Lengkapi Data!");

        return;

    }

    barang.push({

        id:buatID(),

        kategori:kategori.value,

        nama:namaBarang.value,

        jumlah:Number(jumlahBarang.value),

        favorit:false

    });

    simpan();

    render();

    namaBarang.value="";

    jumlahBarang.value="";

}

// ===============================
// Render
// ===============================

function render(){

    listKontruksi.innerHTML="";
    listFurniture.innerHTML="";
    listElectric.innerHTML="";

    let total=0;

    let jKon=0;
    let jFur=0;
    let jEle=0;

    let keyword=search.value.toLowerCase();

    barang.forEach((item)=>{

        if(
            !item.nama.toLowerCase().includes(keyword)
        ){
            return;
        }

        total+=item.jumlah;

        let card=document.createElement("div");

        card.className="barangCard";

        if(item.jumlah<=3){

            card.classList.add("stokHabis");

        }

        card.innerHTML=`

        <div class="atas">

            <h3>${item.nama}</h3>

            <button onclick="favorit(${item.id})">

                ${item.favorit ? "⭐":"☆"}

            </button>

        </div>

        <p>

            Jumlah :
            <b>${item.jumlah}</b>

        </p>

        <div class="quickButton">

            <button onclick="ubahJumlah(${item.id},-5)">-5</button>

            <button onclick="ubahJumlah(${item.id},-1)">-1</button>

            <button onclick="ubahJumlah(${item.id},1)">+1</button>

            <button onclick="ubahJumlah(${item.id},5)">+5</button>

        </div>

        <div class="aksi">

            <button
            class="edit"
            onclick="editBarang(${item.id})">

            ✏ Edit

            </button>

            <button
            class="hapus"
            onclick="hapusBarang(${item.id})">

            🗑 Hapus

            </button>

        </div>

        `;

        if(item.kategori=="Kontruksi"){

            listKontruksi.appendChild(card);

            jKon+=item.jumlah;

        }

        if(item.kategori=="Furniture"){

            listFurniture.appendChild(card);

            jFur+=item.jumlah;

        }

        if(item.kategori=="Electric"){

            listElectric.appendChild(card);

            jEle+=item.jumlah;

        }

    });

    totalBarang.innerHTML=total;

    totalKontruksi.innerHTML=jKon;

    totalFurniture.innerHTML=jFur;

    totalElectric.innerHTML=jEle;

    simpan();

}

// ===============================
// Search
// ===============================

search.onkeyup=()=>{

    render();

}

render();

// ===============================
// EDIT BARANG
// ===============================

function editBarang(id){

    let item = barang.find(b => b.id === id);

    if(!item) return;

    let namaBaru = prompt("Nama Barang", item.nama);

    if(namaBaru === null) return;

    let jumlahBaru = prompt("Jumlah Barang", item.jumlah);

    if(jumlahBaru === null) return;

    item.nama = namaBaru.trim();
    item.jumlah = Number(jumlahBaru);

    simpan();
    render();

}

// ===============================
// HAPUS BARANG
// ===============================

function hapusBarang(id){

    if(!confirm("Hapus barang ini?")) return;

    barang = barang.filter(b => b.id !== id);

    simpan();
    render();

}

// ===============================
// FAVORIT
// ===============================

function favorit(id){

    let item = barang.find(b => b.id === id);

    if(!item) return;

    item.favorit = !item.favorit;

    barang.sort((a,b)=>{

        return b.favorit - a.favorit;

    });

    simpan();
    render();

}

// ===============================
// UBAH JUMLAH
// ===============================

function ubahJumlah(id,nilai){

    let item = barang.find(b => b.id === id);

    if(!item) return;

    item.jumlah += nilai;

    if(item.jumlah < 0){

        item.jumlah = 0;

    }

    simpan();
    render();

}

// ===============================
// SCROLL KATEGORI
// ===============================

function scrollKategori(id){

    document
    .getElementById(id)
    .scrollIntoView({

        behavior:"smooth"

    });

}

// ===============================
// DARK MODE
// ===============================

const btnDark = document.getElementById("btnDark");

if(localStorage.getItem("darkMode")=="true"){

    document.body.classList.add("dark");

}

btnDark.onclick = ()=>{

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );

}

// ===============================
// RESET DATA
// ===============================

const btnReset = document.getElementById("btnReset");

btnReset.onclick = ()=>{

    if(!confirm("Hapus semua data?")) return;

    barang = [];

    simpan();

    render();

}

// ===============================
// BACKUP JSON
// ===============================

const btnBackup = document.getElementById("btnBackup");

btnBackup.onclick = ()=>{

    const data = JSON.stringify(barang,null,2);

    const blob = new Blob([data],{

        type:"application/json"

    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "stok_worker.json";

    a.click();

}

// ===============================
// RESTORE JSON
// ===============================

const btnRestore = document.getElementById("btnRestore");

const inputFile = document.createElement("input");

inputFile.type = "file";

inputFile.accept = ".json";

btnRestore.onclick = ()=>{

    inputFile.click();

}

inputFile.onchange = (e)=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(){

        barang = JSON.parse(reader.result);

        simpan();

        render();

        alert("Restore berhasil.");

    }

    reader.readAsText(file);

}