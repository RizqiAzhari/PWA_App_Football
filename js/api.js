var base_url = "https://api.football-data.org/v2/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function cariKlub() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/2014/standings", {
      headers: {
        'X-Auth-Token': "94df46eac39942c5850dda8d43c62c2c"
      }
    }).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          // Menyusun list klasemen tim
          var clubsHTML = `
      <table class="responsive-table">
      <thead>
        <tr>
            <th>Pos</th>
            <th>Nama Klub</th>
            <th>Main</th>
            <th>Menang</th>
            <th>Seri</th>
            <th>Kalah</th>
            <th>JG</th>
            <th>JK</th>
            <th>SG</th>
            <th>Poin</th>
        </tr>
      </thead>

      <tbody>
      `;
          data.standings.forEach(function (standings) {
            if (standings.type == "TOTAL") {
              standings.table.forEach(function (table) {
                clubsHTML += `
            
                <tr>
                  <td>${table.position}</td>
                  <td><a href="./klub_info.html?id=${table.team.id}">${table.team.name}</a></td>
                  <td>${table.playedGames}</td>
                  <td>${table.won}</td>
                  <td>${table.draw}</td>
                  <td>${table.lost}</td>
                  <td>${table.goalsFor}</td>
                  <td>${table.goalsAgainst}</td>
                  <td>${table.goalDifference}</td>
                  <td>${table.points}</td>
                </tr>

          `;
              });
            }

          });
          clubsHTML += `
      </tbody>
      </table>
      `;
          // Sisipkan list klub ke dalam elemen dengan id #content
          // document.getElementById("klub").innerHTML = clubsHTML;
        });
      }
    })
  }

  fetch(base_url + "competitions/2014/standings", {
    headers: {
      'X-Auth-Token': "94df46eac39942c5850dda8d43c62c2c"
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun list klasemen tim
      var clubsHTML = `
      <table class="responsive-table">
      <thead>
        <tr>
            <th>Pos</th>
            <th>Nama Klub</th>
            <th>Main</th>
            <th>Menang</th>
            <th>Seri</th>
            <th>Kalah</th>
            <th>JG</th>
            <th>JK</th>
            <th>SG</th>
            <th>Poin</th>
        </tr>
      </thead>

      <tbody>
      `;
      data.standings.forEach(function (standings) {
        if (standings.type == "TOTAL") {
          standings.table.forEach(function (table) {
            clubsHTML += `
            
                <tr>
                  <td>${table.position}</td>
                  <td><a href="./klub_info.html?id=${table.team.id}" class="red-text text-accent-4">${table.team.name}</a></td>
                  <td>${table.playedGames}</td>
                  <td>${table.won}</td>
                  <td>${table.draw}</td>
                  <td>${table.lost}</td>
                  <td>${table.goalsFor}</td>
                  <td>${table.goalsAgainst}</td>
                  <td>${table.goalDifference}</td>
                  <td>${table.points}</td>
                </tr>

          `;
          });
        }
      });
      clubsHTML += `
      </tbody>
      </table>
      `;
      // Sisipkan list klub ke dalam elemen dengan id #content
      document.getElementById("klub").innerHTML = clubsHTML;
    })
    .catch(error);
}

function cariKlubperId() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idTeam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "teams/" + idTeam, {
        headers: {
          'X-Auth-Token': "94df46eac39942c5850dda8d43c62c2c"
        }
      }).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            // .... kode lain disembunyikan agar lebih ringkas

            //document.getElementById("body-content").innerHTML = clubHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "teams/" + idTeam, {
      headers: {
        'X-Auth-Token': "94df46eac39942c5850dda8d43c62c2c"
      }
    })
      .then(status)
      .then(json)
      .then(function (data) {
        // ... kode lain disembunyikan agar lebih ringkas 
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        //console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var clubHTML = `
          <div class="row">
            <!-- ikon klub -->
            <div class="col s12 m4 l3 logo-bar">
              <img src="${data.crestUrl}" width="70%" height="70%"/>
              <h6>${data.tla}</h6>
              <h4>${data.name}</h4>
              <p>
                Warna Kostum: ${data.clubColors} <br>
                Stadion: ${data.venue}
              <p>
            </div>
            <!-- klub detail -->
            <div class="col s12 m8 l9 skuad-bar">
              <table class = "centered">
                <thead>
                  <tr>
                      <th>Nama</th>
                      <th>Status</th>
                      <th>Posisi</th>
                      <th>Kewarganegaraan</th>
                  </tr>
                </thead>
        `;
        data.squad.forEach(function (pemain) {
          if (pemain.position == null) {
            clubHTML += `
            <tbody>
              <tr>
                <td>${pemain.name}</td>
                <td>${pemain.role}</td>
                <td>-</td>
                <td>${pemain.nationality}</td>
              </tr>
            </tbody>
            `;
          } else {
            clubHTML += `
            <tbody>
              <tr>
                <td>${pemain.name}</td>
                <td>${pemain.role}</td>
                <td>${pemain.position}</td>
                <td>${pemain.nationality}</td>
              </tr>
            </tbody>
            `;
          }
        });
        clubHTML += `
            </table>
          </div>
        </div>
        `;
        document.getElementById("body-content").innerHTML = clubHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getKlubBookmark() {
  getAll().then(function (teams) {
    //console.log(clubs);
    var clubsHTML = `
      <table class = "highlight">
    `;
    // Menyusun list klub yang disimpan secara dinamis
    teams.forEach(function (team) {
      clubsHTML += `
    
      <tr>
        <td><a href="./klub_info.html?id=${team.id}&saved=true" class="red-text text-accent-4" id="${team.id}">${team.name}</a></td>
        <td><i class="material-icons right">archive</i>Terarsip</td>
        <td>
          <a class="waves-effect waves-light btn-small red darken-4 btnDelete" id="${team.id}">
            <i class="material-icons right">highlight_off</i>Hapus
          </a>
        </td>
      </tr>
    
    `;
    });
    clubsHTML += `
    </table>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("klub").innerHTML = clubsHTML;

  });
}

function getKlubBookmarkperId() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(parseInt(idParam))
    .then(function (teams) {
    //  var clubHTML = "";
    //console.log(teams);
    //teams.forEach(function (club) {
      var clubHTML = `
          <div class="row">
            <!-- ikon klub -->
            <div class="col s12 m4 l3 logo-bar">
              <img src="${teams.crestUrl}" width="70%" height="70%"/>
              <h6>${teams.tla}</h6>
              <h4>${teams.name}</h4>
              <p>
                Warna Kostum: ${teams.clubColors} <br>
                Stadion: ${teams.venue}
              <p>
            </div>
            <!-- klub detail -->
            <div class="col s12 m8 l9 skuad-bar">
              <table class = "centered">
                <thead>
                  <tr>
                      <th>Nama</th>
                      <th>Status</th>
                      <th>Posisi</th>
                      <th>Kewarganegaraan</th>
                  </tr>
                </thead>
        `;
      teams.squad.forEach(function (pemain) {
        if (pemain.position == null) {
          clubHTML += `
            <tbody>
              <tr>
                <td>${pemain.name}</td>
                <td>${pemain.role}</td>
                <td>-</td>
                <td>${pemain.nationality}</td>
              </tr>
            </tbody>
            `;
        } else {
          clubHTML += `
            <tbody>
              <tr>
                <td>${pemain.name}</td>
                <td>${pemain.role}</td>
                <td>${pemain.position}</td>
                <td>${pemain.nationality}</td>
              </tr>
            </tbody>
            `;
        }
      });
      clubHTML += `
            </table>
          </div>
        </div>
        `;
    //});

    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = clubHTML;
  });
}

// function deleteBookmark(){
//   var urlParams = new URLSearchParams(window.location.search);
//   var idParam = urlParams.get("id");

//   deleteById(idParam).then(function (club) {

//   });
// }
