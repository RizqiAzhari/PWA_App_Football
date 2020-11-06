let base_url = "https://api.football-data.org/v2/";
//menggunakan preloader untuk circle
let spinner = document.querySelector(".circle-loader");
//menggunakan div id body-content (index.html)
let main = document.getElementById("body-content");

// Blok kode yang akan di panggil jika fetch berhasil
const status = (response) => {
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
const json = (response) => {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
const error = (error) => {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
const cariKlub = () => {
  if ("caches" in window) {
    caches.match(base_url + "competitions/2014/standings/").then((response) => {
      if (response) {
        response.json().then((data) => {
          // Menyusun list klasemen tim
          let clubsHTML = `
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
          data.standings.forEach((standings) => {
            if (standings.type == "TOTAL") {
              standings.table.forEach((table) => {
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
          //atur setting waktu hilangnya preloader dan tampilan dalam waktu 1 second = 1000 milisecond
          setTimeout(() => {
            // non aktifkan circle loader
            spinner.classList.remove("active");
            // Sisipkan list klub ke dalam elemen
            document.getElementById("semua_klub").innerHTML = clubsHTML;
            // tampilan masuk
            main.style.display = "block";
          }, 1000);
        });
      }
    })
  }

  fetch(base_url + "competitions/2014/standings/", {
    headers: {
      'X-Auth-Token': "94df46eac39942c5850dda8d43c62c2c"
    }
  })
    .then(status)
    .then(json)
    .then((data) => {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun list klasemen tim
      let clubsHTML = `
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
      data.standings.forEach((standings) => {
        if (standings.type == "TOTAL") {
          standings.table.forEach((table) => {
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
      //atur setting waktu hilangnya preloader dan tampilan dalam waktu 1 second = 1000 milisecond
      setTimeout(() => {
        // non aktifkan circle loader
        spinner.classList.remove("active");
        // Sisipkan list klub ke dalam elemen
        document.getElementById("semua_klub").innerHTML = clubsHTML;
        // tampilan masuk
        main.style.display = "block";
      }, 1000);
    })
    .catch(error);
}

const cariKlubperId = () => {
  return new Promise((resolve, reject) => {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idTeam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "teams/" + idTeam).then((response) => {
        if (response) {
          response.json().then((data) => {
            let clubHTML = `
              <div class="row">
                <!-- ikon klub -->
                <div class="col s12 m4 l3 logo-bar">
                  <img src="${data.crestUrl}" alt="${data.tla}_logo"/>
                  <h6>${data.tla}</h6>
                  <h4>${data.name}</h4>
                  <p>
                    Warna Kostum: ${data.clubColors} <br>
                    Stadion: ${data.venue}
                  <p>
                </div>
                <!-- klub detail -->
                <div class="col s12 m8 l9 skuad-bar">
                  <table class = "responsive-table">
                    <thead>
                      <tr>
                          <th>Nama</th>
                          <th>Status</th>
                          <th>Posisi</th>
                          <th>Kewarganegaraan</th>
                      </tr>
                    </thead>
                    <tbody>
            `;
            data.squad.forEach((pemain) => {
              if (pemain.position == null) {
                clubHTML += `
                
                  <tr>
                    <td>${pemain.name}</td>
                    <td>${pemain.role}</td>
                    <td>-</td>
                    <td>${pemain.nationality}</td>
                  </tr>
                
                `;
              } else {
                clubHTML += `
                
                  <tr>
                    <td>${pemain.name}</td>
                    <td>${pemain.role}</td>
                    <td>${pemain.position}</td>
                    <td>${pemain.nationality}</td>
                  </tr>
                
                `;
              }
            });
            clubHTML += `
                  </tbody>
                </table>
              </div>
            </div>
            `;
            //atur setting waktu hilangnya preloader dan tampilan dalam waktu 1 second = 1000 milisecond
            setTimeout(() => {
              spinner.classList.remove("active");
              //sisipkan detail klub
              document.getElementById("konten-detail").innerHTML = clubHTML;
              //tampilan masuk
              document.getElementById("konten-detail").style.display = "block";
            }, 1000);
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
      .then((data) => {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        //console.log(data);
        // Menyusun komponen card artikel secara dinamis
        let clubHTML = `
          <div class="row">
            <!-- ikon klub -->
            <div class="col s12 m4 l3 logo-bar">
              <img src="${data.crestUrl}" alt="${data.tla}_logo"/>
              <h6>${data.tla}</h6>
              <h4>${data.name}</h4>
              <p>
                Warna Kostum: ${data.clubColors} <br>
                Stadion: ${data.venue}
              <p>
            </div>
            <!-- klub detail -->
            <div class="col s12 m8 l9 skuad-bar">
              <table class = "responsive-table">
                <thead>
                  <tr>
                      <th>Nama</th>
                      <th>Status</th>
                      <th>Posisi</th>
                      <th>Kewarganegaraan</th>
                  </tr>
                </thead>
                <tbody>
        `;
        data.squad.forEach((pemain) => {
          if (pemain.position == null) {
            clubHTML += `
            
              <tr>
                <td>${pemain.name}</td>
                <td>${pemain.role}</td>
                <td>-</td>
                <td>${pemain.nationality}</td>
              </tr>
            
            `;
          } else {
            clubHTML += `
            
              <tr>
                <td>${pemain.name}</td>
                <td>${pemain.role}</td>
                <td>${pemain.position}</td>
                <td>${pemain.nationality}</td>
              </tr>
            
            `;
          }
        });
        clubHTML += `
              </tbody>
            </table>
          </div>
        </div>
        `;
        //atur setting waktu hilangnya preloader dan tampilan fetch api dalam waktu 1 second = 1000 milisecond
        setTimeout(() => {
          spinner.classList.remove("active");
          //sisipkan detail klub
          document.getElementById("konten-detail").innerHTML = clubHTML;
          //tampilan masuk
          document.getElementById("konten-detail").style.display = "block";
        }, 1000);
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      })
      .catch(error);
  });
}

const getKlubBookmark = () => {
  getAll().then((teams) => {
    //console.log(clubs);
    let clubsHTML = `
      <table class = "responsive-table">
    `;
    // Menyusun list klub yang disimpan secara dinamis
    teams.forEach((team) => {
      clubsHTML += `
    
      <tr>
        <td><a href="./klub_info.html?id=${team.id}&saved=true" class="red-text text-accent-4" id="${team.id}">${team.name}</a></td>
        <td><i class="material-icons right">archive</i>Terarsip</td>
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

const getKlubBookmarkperId = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  getById(parseInt(idParam))
    .then((teams) => {
      //console.log(teams);
      let clubHTML = `
          <div class="row">
            <!-- ikon klub -->
            <div class="col s12 m4 l3 logo-bar">
              <img src="${teams.crestUrl}" alt="${teams.tla}_logo"/>
              <h6>${teams.tla}</h6>
              <h4>${teams.name}</h4>
              <p>
                Warna Kostum: ${teams.clubColors} <br>
                Stadion: ${teams.venue}
              <p>
            </div>
            <!-- klub detail -->
            <div class="col s12 m8 l9 skuad-bar">
              <table class = "responsive-table">
                <thead>
                  <tr>
                      <th>Nama</th>
                      <th>Status</th>
                      <th>Posisi</th>
                      <th>Kewarganegaraan</th>
                  </tr>
                </thead>
                <tbody>
        `;
      teams.squad.forEach((pemain) => {
        if (pemain.position == null) {
          clubHTML += `
            
              <tr>
                <td>${pemain.name}</td>
                <td>${pemain.role}</td>
                <td>-</td>
                <td>${pemain.nationality}</td>
              </tr>
            
            `;
        } else {
          clubHTML += `
            
              <tr>
                <td>${pemain.name}</td>
                <td>${pemain.role}</td>
                <td>${pemain.position}</td>
                <td>${pemain.nationality}</td>
              </tr>
            
            `;
        }
      });
      clubHTML += `
              </tbody>
            </table>
          </div>
        </div>
        `;

      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("konten-detail").innerHTML = clubHTML;
    });
}
