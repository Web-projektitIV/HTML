const BASE_URL = 'https://example.com';

// --- GET: Hae tietoa ---
function getResource(endpoint) {
  return fetch(`${BASE_URL}${endpoint}`)
    .then(response => {
      // Fetch EI heitä virhettä statuskoodeilla 404 tai 500. 
      // Se on tarkistettava itse response.ok-muuttujasta.
      if (!response.ok) {
        throw new Error(`HTTP-virhe! Status: ${response.status}`);
      }
      return response.json(); // Palauttaa uuden Promisen, joka parsii JSONin
    })
    .catch(error => {
      console.error('Fetch GET -virhe:', error);
      throw error; // Heitetään virhe eteenpäin kutsujalle
    });
}

// --- POST: Luo uutta tietoa ---
function createResource(endpoint, data) {
  return fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // Muutetaan JavaScript-objekti JSON-tekstiksi
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP-virhe! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetch POST -virhe:', error);
      throw error;
    });
}

// --- PUT: Päivitä/korvaa tietoa ---
function updateResource(endpoint, id, data) {
  return fetch(`${BASE_URL}${endpoint}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP-virhe! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetch PUT -virhe:', error);
      throw error;
    });
}

// --- DELETE: Poista tietoa ---
function deleteResource(endpoint, id) {
  return fetch(`${BASE_URL}${endpoint}/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP-virhe! Status: ${response.status}`);
      }
      // Jos API palauttaa "204 No Content", JSON-dataa ei ole.
      if (response.status === 204) {
        return { success: true };
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetch DELETE -virhe:', error);
      throw error;
    });
}


// 1. Haetaan kaikki käyttäjät
getResource('/users')
  .then(users => {
    console.log('Käyttäjälista:', users);
  })
  .catch(err => {
    console.error('Käyttäjien haku epäonnistui sovelluksessa.');
  });

// 2. Luodaan uusi käyttäjä
createResource('/users', { name: 'Matti Meikäläinen', role: 'Käyttäjä' })
  .then(newUser => {
    console.log('Luotu käyttäjä:', newUser);
  });



  /* jshint esversion: 6 */
  // BIN_ID ei ole salaisuus. 
// ACCESS_KEY on luotu JSONBinissä rajoitetuilla oikeuksilla (vain READ & UPDATE tälle biniin).
const BIN_ID = '6af44f8eac6210605a7f6725'; 
const ACCESS_KEY = '$2a$10$TÄHÄN_SINUN_RAJOITETTU_ACCESS_KEY'; 
const API_URL = `https://jsonbin.io{BIN_ID}`;

// --- 1. Datan haku (GET) ---
function haeTuotteet() {
  fetch(API_URL, {
    method: 'GET',
    headers: {
      'X-Access-Key': ACCESS_KEY // Käytetään X-Access-Keyä Master Keyn sijaan
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Haku epäonnistui! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // JSONBin palauttaa datan aina .record-olion sisällä
      console.log('Tuotteet haettu pilvestä:', data.record.tuotteet);
      
      // Tässä kohtaa voisit kutsua funktiota, joka tulostaa tuotteet HTML-sivulle
    })
    .catch(error => {
      console.error('Virhe haussa:', error);
    });
}

// --- 2. Uuden tuotteen lisääminen (PUT) ---
// Koska PUT korvaa koko JSON-tiedon, meidän täytyy ensin hakea nykyinen data,
// lisätä uusi tuote taulukkoon ja lähettää koko paketti takaisin.
function lisaaUusiTuote(uusiTuote) {
  // Vaihe A: Haetaan nykyinen tilanne
  fetch(API_URL, {
    method: 'GET',
    headers: { 'X-Access-Key': ACCESS_KEY }
  })
    .then(response => {
      if (!response.ok) throw new Error('Datan haku epäonnistui ennen päivitystä');
      return response.json();
    })
    .then(data => {
      const nykyinenData = data.record;
      
      // Lisätään uusi tuote olemassa olevaan taulukkoon
      nykyinenData.tuotteet.push(uusiTuote);

      // Vaihe B: Lähetetään päivitetty taulukko takaisin pilveen
      return fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': ACCESS_KEY
        },
        body: JSON.stringify(nykyinenData)
      });
    })
    .then(response => {
      if (!response.ok) throw new Error('Päivitys epäonnistui');
      return response.json();
    })
    .then(paivitettyTulos => {
      console.log('Onnistui! Uusi tuote tallennettu pysyvästi:', paivitettyTulos.record.tuotteet);
    })
    .catch(error => {
      console.error('Virhe tuotteen lisäyksessä:', error);
    });
}


// --- FUNKTIOIDEN TESTAUS ---

// Kokeile hakea tuotteet konsoliin:
haeTuotteet();

// Kokeile lisätä uusi tuote (poista kommenttimerkit testataksesi):
// lisaaUusiTuote({ id: 3, nimi: "Kahvinkeitin", hinta: 49.90 });
