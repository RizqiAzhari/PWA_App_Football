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

    // ambil artikel lalu tampilkan
    getKlubBookmarkperId();
  } else {
    // hilangkan btn hapus
    btnHapus.style.display = 'none';

    // cari klub lain
    item;
  }

  btnBookmark.onclick = function () {
    //console.log dengan toast background merah dan tulisan lime
    M.toast({
      html: 'Detail Klub di bookmark. Cek di bagian menu favorit.',
      classes: 'red darken-4 lime-text text-accent-2'
    });
    item.then(function (teams) {
      bookmarkTerkini(teams);
      // munculkan btnHapus
      btnBookmark.style.display = 'none';
      btnHapus.style.display = 'block';
    });
    
  };

  btnHapus.onclick = function () {
    //console.log dengan toast background merah dan tulisan lime
    M.toast({
      html: 'Detail Klub di hapus',
      classes: 'red darken-4 lime-text text-accent-2'
    });
    item.then(function (teams) {
      deleteById(teams);
      //munculkan btnBookmark
      btnBookmark.style.display = 'block';
      btnHapus.style.display = 'none';
    });
    
    
  };
});