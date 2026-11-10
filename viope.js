// 5.1 OLIO JA METODI: this viittaa kulloiseenkin retkiolioon.
const lomakeMuuta = document.querySelector("#lomakeMuuta");
const lomakeLisaa = document.querySelector("#lomakeLisaa");
const toggleLomakkeet = (muokkaus) => {
  lomakeMuuta.hidden = !muokkaus;
  lomakeLisaa.hidden = muokkaus;
  document.querySelectorAll("#lajittele, #kopioi, #palauta, #rivit button")
    .forEach(painike => {
      painike.disabled = muokkaus;
    });
}


const avaaMuutaLomake = (retki, indeksi) => {
  toggleLomakkeet(true);
  lomakeMuuta.dataset.indeksi = indeksi;
  lomakeMuuta.elements.nimi.value = retki.nimi;
  lomakeMuuta.elements.matka.value = retki.matka;
  lomakeMuuta.elements.aika.value = retki.aika;
}

const lisaaPoistaPainike = (retki,indeksi) => {
    const painike = document.createElement("button");
    painike.type = "button";
    painike.textContent = "Poista";
    painike.setAttribute("aria-label", `Poista retki ${retki.nimi}`);
    painike.addEventListener("click", () => {
      // filter + nuolifunktio muodostaa uuden taulukon.
      retket = retket.filter((_, i) => i !== indeksi);
      nayta();
      });
  return painike;
}

const lisaaMuutaPainike = (retki,indeksi) => {
    const painike = document.createElement("button");
    painike.type = "button";
    painike.textContent = "Muuta";
    painike.setAttribute("aria-label", `Muuta retki ${retki.nimi}`);
    painike.addEventListener("click", () => {
      // filter + nuolifunktio muodostaa uuden taulukon.
      // retket = retket.filter((_, i) => i !== indeksi);
      avaaMuutaLomake(retki, indeksi);
      });
    return painike;
    };


class Retki {
  constructor(nimi, matka, aika) {
    this.nimi = nimi;
    this.matka = matka;
    this.aika = aika;
  }

  nopeus() {
    return this.matka / this.aika;
  }
}

// 5.2 TAULUKKO: taulukon alkiot ovat Retki-luokan olioita.
const alkuperaiset = () => [
  new Retki("Kävely", 6, 1.5),
  new Retki("Pyöräily", 24, 1.2),
  new Retki("Juoksu", 10, 1)
];
let retket = alkuperaiset();

// REST: kaikki argumentit kerätään luvut-taulukkoon.
const summa = (...luvut) => luvut.reduce((kertynyt, luku) => kertynyt + luku, 0);
const rivit = document.querySelector("#rivit");
const yhteenveto = document.querySelector("#yhteenveto");

const muotoile = luku =>
  luku.toLocaleString("fi-FI", { maximumFractionDigits: 1 });

const nayta = () => {
  rivit.replaceChildren();
  // forEach + nuolifunktio käy taulukon alkiot läpi.
  retket.forEach((retki, indeksi) => {
    const tr = document.createElement("tr");
    // Pistenotaatio ja hakasuljenotaatio viittaavat samaan ominaisuuteen.
    const arvot = [
      retki["nimi"],
      muotoile(retki.matka),
      muotoile(retki.aika),
      muotoile(retki.nopeus())
    ];

    arvot.forEach(arvo => {
      const td = document.createElement("td");
      td.textContent = arvo;
      tr.append(td);
    });

    const poista = lisaaPoistaPainike(retki, indeksi);
    let td = document.createElement("td");
    td.append(poista);
    tr.append(td);

    const muuta = lisaaMuutaPainike(retki, indeksi);
    td = document.createElement("td");
    td.append(muuta);
    tr.append(td);
    rivit.append(tr);

  });

  // map tuottaa matkoista lukutaulukon; spread avaa sen argumenteiksi.
  const matkat = retket.map(retki => retki.matka);
  const yhteismatka = summa(...matkat);
  const kokonaisaika = summa(...retket.map(retki => retki.aika));

  yhteenveto.textContent =
    `Retkiä ${retket.length} kpl · Matkaa yhteensä ${muotoile(yhteismatka)} km · Keskimääräinen matkanopeus ${kokonaisaika ? muotoile(yhteismatka / kokonaisaika) : "–"} km/h`;
}
lomakeLisaa.addEventListener("submit", tapahtuma => {
  tapahtuma.preventDefault();
  const lomake = tapahtuma.currentTarget;
  const tiedot = new FormData(lomake);
  const nimi = String(tiedot.get("nimi")).trim();
  const matka = Number(tiedot.get("matka"));
  const aika = Number(tiedot.get("aika"));
  if (!nimi || !Number.isFinite(matka) || !Number.isFinite(aika) || matka <= 0 || aika <= 0) {
    return;
    }
  retket.push(new Retki(nimi, matka, aika));
  lomake.reset();
  nayta();
});

lomakeMuuta.addEventListener("submit", tapahtuma => {
  tapahtuma.preventDefault();
  const lomake = tapahtuma.currentTarget;
  const indeksi = Number(lomake.dataset.indeksi);
  const tiedot = new FormData(lomake);
  const nimi = String(tiedot.get("nimi")).trim();
  const matka = Number(tiedot.get("matka"));
  const aika = Number(tiedot.get("aika"));
  if (!nimi || !Number.isFinite(matka) || !Number.isFinite(aika) || matka <= 0 || aika <= 0) {
    return;
    }
  retket[indeksi] = new Retki(nimi, matka, aika);
  lomake.reset();
  toggleLomakkeet(false);
  nayta();
});



document.querySelector("#lajittele").addEventListener("click", () => {
  // Spread kopioi taulukon ennen järjestämistä.
  retket = [...retket].sort((a, b) => b.nopeus() - a.nopeus());
  nayta();
});

document.querySelector("#kopioi").addEventListener("click", () => {
  if (!retket.length) return;

  const viimeinen = retket.at(-1);
  // Spread kopioi olion ominaisuudet.
  const kopio = Object.assign(new Retki(), {
    ...viimeinen,
    nimi: viimeinen.nimi + " (kopio)"
  });

  retket.push(kopio);
  nayta();
});

document.querySelector("#palauta").addEventListener("click", () => {
  retket = alkuperaiset();
  nayta();
});

nayta();