// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function () {
        console.log("Pendaftaran ServiceWorker berhasil");
      })
      .catch(function () {
        console.log("Pendaftaran ServiceWorker gagal");
      });
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}

document.addEventListener("DOMContentLoaded", function () {
  let urlParams = new URLSearchParams(window.location.search);
  let isFromSaved = urlParams.get("saved");
  let btnBookmark = document.getElementById("bookmark");
  let btnHapus = document.getElementById("hapus");
  let item = cariKlubperId();

  if (isFromSaved) {
    // hilangkan btn bookmark
    btnBookmark.style.display = 'none';
    // btnHapus.style.display = 'block';

    // ambil artikel lalu tampilkan
    getKlubBookmarkperId();
  } else {
    // hilangkan btn hapus
    // btnBookmark.style.display = 'block';
    btnHapus.style.display = 'none';

    // cari klub lain
    item;
  }
  btnBookmark.onclick = function () {
    console.log("Tombol FAB di klik.");
    item.then(function (teams) {
      bookmarkTerkini(teams);
      // munculkan btnHapus
      btnBookmark.style.display = 'none';
      btnHapus.style.display = 'block';
    });
    
  };
  btnHapus.onclick = function () {
    console.log("Tombol DELETE di klik.");
    item.then(function (teams) {
      deleteById(teams);
      //isFromSaved = false;
      //munculkan btnBookmark
      btnBookmark.style.display = 'block';
      btnHapus.style.display = 'none';
    });
    
    
  };
});