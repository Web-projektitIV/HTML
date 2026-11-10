# HTML-elementit tässä projektissa

Tässä oppaassa selitetään projektin HTML-tiedostoissa käytetyt eri elementit. Lista perustuu tiedostoihin `index_org.html`, `Lightdarknav.html`, `kokeilu.html` ja `shakkilauta.html`.

HTML-elementti kirjoitetaan kulmasulkeisiin, esimerkiksi `<p>`. Useimmilla elementeillä on aloitus- ja lopetustagi, joiden välissä on sisältöä. Esimerkiksi `<p>Teksti</p>`. Elementin lisätiedot, kuten `class`, `id` ja `href`, ovat attribuutteja, eivät erillisiä elementtejä.

## Sivun rakenne ja asetukset

| Elementti | Selitys |
|---|---|
| `<html>` | Koko HTML-dokumentin juurielementti. Projektissa `lang="fi"` kertoo sivun kielen ja `data-theme` liittyy teeman valintaan. |
| `<head>` | Sisältää sivun asetuksia ja resurssien linkkejä. Sen sisältö ei yleensä näy varsinaisena sivusisältönä. |
| `<meta>` | Antaa selaimelle sivun tietoja, kuten merkistön, näkymän koon mobiilissa ja sivun kuvauksen. Se on tyhjä elementti eli sillä ei ole erillistä lopetustagia. |
| `<title>` | Määrittää sivun otsikon, joka näkyy esimerkiksi selaimen välilehdessä. |
| `<link>` | Liittää sivuun ulkoisen resurssin. Projektissa sillä liitetään tyylitiedostoja, kuvake ja fontteja. Se on tyhjä elementti. |
| `<script>` | Liittää sivuun JavaScript-koodin tai sisältää sitä. Projektissa JavaScript hoitaa esimerkiksi teemavalitsimen toimintaa. |
| `<body>` | Sisältää kaiken selaimessa näkyvän sivusisällön. |

## Sivun osat ja teksti

| Elementti | Selitys |
|---|---|
| `<header>` | Sivun tai sisältöosion yläosa. Projektissa se sisältää sivuston tunnuksen ja navigaation. |
| `<nav>` | Navigointilinkkien ryhmä. Se auttaa myös ruudunlukijoita tunnistamaan sivun navigaation. |
| `<main>` | Sivun pääsisältö. Sivu käyttää yleensä yhtä `<main>`-elementtiä. |
| `<section>` | Aiheeseen liittyvän sisällön osio, jolla on yleensä oma otsikko. Projektissa osioita ovat esimerkiksi palvelut, työt ja yhteystiedot. |
| `<article>` | Itsenäinen sisältökokonaisuus. Projektissa yksittäiset palvelukuvaukset ovat artikkeleita. |
| `<footer>` | Sivun tai osion alaosa. Projektissa se sisältää tunnuksen ja tekijänoikeustiedon. |
| `<div>` | Yleiskäyttöinen lohko muiden elementtien ryhmittelyyn. Sillä ei itsessään ole erityistä semanttista merkitystä. Projektissa sitä käytetään esimerkiksi asettelun ja tyylien kohteena. |
| `<h1>` | Sivun tärkein otsikko. Tavallisesti sivulla on yksi pääotsikko. |
| `<h2>` | Toisen tason otsikko, joka aloittaa pääotsikon alla olevan osion. |
| `<h3>` | Kolmannen tason otsikko, jota käytetään esimerkiksi palvelun tai työn nimenä. |
| `<p>` | Tekstikappale. |
| `<em>` | Korostaa sanan tai ilmauksen painotusta. Selaimet näyttävät sen usein kursivoituna. |
| `<strong>` | Merkitsee sisällön tärkeäksi. Selaimet näyttävät sen usein lihavoituna. |
| `<span>` | Yleiskäyttöinen tekstin sisäinen ryhmittely. Sillä voi kohdistaa tyylejä pieneen tekstiosaan ilman erillistä lohkoa. |

## Linkit, kuvat ja ohjaimet

| Elementti | Selitys |
|---|---|
| `<a>` | Linkki toiselle sivulle tai saman sivun osioon. `href`-attribuutti kertoo linkin kohteen. |
| `<figure>` | Ympäröi itsenäisen kuvan tai muun sisältökokonaisuuden. |
| `<img>` | Näyttää kuvan. `src` kertoo kuvatiedoston ja `alt` antaa tekstivastineen. Se on tyhjä elementti. |
| `<figcaption>` | Antaa kuvatekstin tai selityksen saman `<figure>`-elementin sisällölle. |
| `<button>` | Painike, jolla käyttäjä voi käynnistää toiminnon, kuten valita teeman. |
| `<input>` | Syötekenttä. Projektissa sitä käytetään valintaruutuna mobiilivalikon avaamiseen ja sulkemiseen. Se on tyhjä elementti. |
| `<label>` | Nimeää syötekentän. Mobiilivalikon `<label>` on liitetty valintaruutuun `for`- ja `id`-attribuuttien avulla, joten sitä voi painaa valintaruudun sijasta. |
| `<i>` | Tässä projektissa Font Awesome käyttää sitä kuvakefontin kuvakkeiden näyttämiseen, kuten aurinko-, kuu- ja valikkokuvakkeisiin. Se ei tässä tarkoita tekstin kursivointia. |

## Tyhjät elementit

`<meta>`, `<link>`, `<img>` ja `<input>` eivät ympäröi sisältöä, joten niille ei kirjoiteta erillistä lopetustagia. Muilla tässä luetelluilla elementeillä on yleensä aloitus- ja lopetustagi.
