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
  var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");
  //var isFromSaved = urlParams.get("saved");
  //var btnDeletes = document.querySelectorAll(".deleted");
  var item = getById();
  //   // Hide fab jika dimuat dari indexed db
  //   //btnDelete.style.display = 'none';

  //   // hapus list bookmark klub
  //   deleteById(id);
  // }
  btnDelete.onclick = function () {
    console.log("Tombol hapus di klik.");
    item.then(function (id) {
      deleteById(id);
    });
  };
  // btnDeletes.forEach(function (btnDelete) {
  //   btnDelete.addEventListener('click', function(e) {
  //     deleteById(parseInt(e.target.id))
  //     .then(function () {
  //       getKlubBookmark();
  //     });
  //   });
  // });

//  getKlubBookmark();
});