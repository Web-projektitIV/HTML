# Teeman määritykset

Sivun vaalea ja tumma ulkoasu määritellään [styles.css](styles.css)-tiedostossa. Teemavalitsimen painikkeet ja sivun rakenne ovat [Lightdarknav.html](Lightdarknav.html)-tiedostossa, ja valinnan tallennus hoidetaan [scripts.js](scripts.js)-tiedostossa.

## Teeman värit

CSS:n `:root`-säännössä `color-scheme: light dark` kertoo selaimelle, että sivu tukee sekä vaaleaa että tummaa teemaa. Se vaikuttaa selaimen omien käyttöliittymäosien, kuten lomakekenttien ja vierityspalkin, oletusväreihin. Se ei kuitenkaan vaihda sivun itse määriteltyjä värejä.

Värit on koottu CSS-muuttujiin, ja `light-dark()` valitsee arvon käytössä olevan väriteeman perusteella:

```css
:root {
  color-scheme: light dark;
  --paper: light-dark(#f4f2ed, #171c19);
  --surface: light-dark(#fffefa, #222a24);
  --ink: light-dark(#19271f, #edf1e9);
  --muted: light-dark(#59635d, #b2bcb4);
  --line: light-dark(#d9ddd5, #3c4740);
  --accent: light-dark(#a53d25, #ef9472);
}
```

`light-dark(vaalea, tumma)` palauttaa ensimmäisen värin vaaleassa tilassa ja toisen tummassa. Sama toimintatapa koskee myös taustavärejä, reunuksia ja varjoa. `color-scheme` siis kertoo, kumpaa teemaa käytetään, ja `light-dark()` antaa teemaan sopivan arvon.

## Selaimen käyttöliittymän väri

HTML:n `<meta name="theme-color" content="#f4f2ed">` antaa selaimelle vihjeen sivun ympärillä näkyvien käyttöliittymäosien väristä. Tuetuissa mobiiliselaimissa se voi sävyttää esimerkiksi osoitepalkkia; se ei muuta sivun taustaa, joka määritellään CSS:ssä.

Nykyinen arvo `#f4f2ed` on vaalea ja pysyy samana myös tummassa teemassa. Jos selaimen käyttöliittymän värin halutaan seuraavan teemavalintaa, arvoa pitää päivittää teeman vaihtuessa tai käyttää selaimen tukemia teemakohtaisia meta-määrityksiä.

## Valittu teema

HTML-elementin `data-theme`-attribuutti kertoo, mikä teema on käytössä:

- `auto`: selain valitsee värit käyttöjärjestelmän teema-asetuksen mukaan.
- `light`: CSS asettaa `color-scheme: light`.
- `dark`: CSS asettaa `color-scheme: dark`.

`data-theme` ja `color-scheme` eivät ole sama asia. `data-theme` on sivun oma tila, jota JavaScript voi muuttaa ja käyttää CSS-valitsimissa. `color-scheme` on CSS-ominaisuus, joka kertoo selaimelle käytössä olevasta teemasta ja vaikuttaa esimerkiksi selaimen omien lomakekenttien ja vierityspalkin väreihin. `data-theme` valitsee siis sivun teeman; `color-scheme` välittää teeman selaimelle.

CSS:ssä `html[data-theme="light"]` ja `html[data-theme="dark"]` asettavat selaimen käyttämän väriteeman. Värit pysyvät samoissa CSS-muuttujissa, joten erillisiä värilistoja tai `prefers-color-scheme`-media queryä ei tarvita.

## Valitsimen toiminta

Teemapainikkeissa on `data-theme-choice="light"` ja `data-theme-choice="dark"`. Aurinko- ja kuuikonit ovat Font Awesome -kuvakkeita; niiden nimet ruudunlukijoille annetaan painikkeiden `aria-label`-attribuuteissa. `aria-pressed` ilmaisee, kumpi valinta on aktiivinen.

[scripts.js](scripts.js) toimii näin:

1. Lukee `valo-theme`-arvon selaimen `localStorage`-tallennuksesta. Jos arvoa ei löydy, oletuksena käytetään `auto`-tilaa.
2. Asettaa teeman HTML-elementin `data-theme`-attribuuttiin.
3. Päivittää painikkeiden aktiivisuuden ja tallentaa uuden valinnan, kun käyttäjä vaihtaa teemaa.

Ensikäynnillä käyttöjärjestelmän teema määrää ulkoasun automaattisesti. Valitsimessa näytetään vain vaalea ja tumma vaihtoehto; `auto` on oletus, kunnes käyttäjä valitsee teeman. Tallennettu valinta säilyy sivun uudelleenlatauksen jälkeen.
