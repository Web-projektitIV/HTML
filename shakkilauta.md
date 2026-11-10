# Shakkilaudan toteutus

Tässä sivussa HTML määrittelee laudan rivit ja koordinaattikirjaimet. CSS antaa niille koon, värit ja numeroinnin. Laudassa ei ole shakkipelin nappuloita: se piirtää vain tyhjän ruudukon.

## HTML-rakenne

`shakkilauta.html`-tiedostossa lauta alkaa elementillä `<div class="board">`. Sen sisällä on kahdeksan tyhjää `<div>`-elementtiä. Kukin niistä vastaa yhtä laudan vaakariviä. Tyhjät elementit riittävät, koska ruutujen värit piirretään CSS:llä.

Rivien jälkeen on `.file-labels`-elementti, jossa ovat kirjaimet a–h. Sen kahdeksan `<span>`-elementtiä tuottavat alareunan koordinaatit.

## Laudan koko ja ruudut

CSS:n `.board`-säännössä `--size` määrittää yhden ruudun koon. `min(50px, 11vw)` tarkoittaa, että ruutu on enintään 50 pikseliä leveä ja pienenee kapealla näytöllä. Laudan leveys on kahdeksan ruutua: `calc(8 * var(--size))`.

`grid-template-rows: repeat(8, var(--size))` tekee kahdeksan yhtä korkean rivin ruudukon. Jokainen lautarivin `<div>` saa vaalean pohjavärin `#f0d9b5`.

Tummat ruudut luodaan kunkin rivin `::before`-pseudoelementillä. Pseudoelementti on CSS:n luoma sisältö, joten sitä varten ei tarvita uutta HTML-elementtiä. Tässä `content: ""` luo tyhjän pseudoelementin, jonka CSS voi silti piirtää.

```css
.board > div:not(.file-labels)::before {
	content: "";
	position: absolute;
	width: var(--size);
	height: var(--size);
	background: #b58863;
	box-shadow:
		calc(2 * var(--size)) 0 #b58863,
		calc(4 * var(--size)) 0 #b58863,
		calc(6 * var(--size)) 0 #b58863;
}
```

Valitsin kohdistuu lautarivien pseudoelementteihin ja jättää `.file-labels`-elementin pois. `position: absolute` sijoittaa ruskean neliön suhteessa omaan lautariviinsä, koska rivillä on `position: relative`. Neliön lähtöpaikka on rivin vasen yläkulma: `::before` tulee rivin ensimmäiseksi sisällöksi, eikä `top`- tai `left`-arvoa ole asetettu tässä perussäännössä. `width` ja `height` tekevät neliöstä yhden ruudun kokoisen ja `background` värittää sen.

`box-shadow` piirtää neliöstä kolme samanväristä kopiota. Kunkin varjon arvot ovat vaakasiirto, pystysiirto ja väri: esimerkiksi `calc(2 * var(--size)) 0 #b58863` siirtää kopion kaksi ruutua oikealle eikä lainkaan ylös tai alas. Yhdessä alkuperäisen neliön kanssa tämä tekee riville neljä tummaa ruutua ilman, että HTML:ään tarvitaan 32 erillistä tummaa elementtiä.

Parillisilla riveillä ensimmäinen tumma ruutu alkaa rivin vasemmasta reunasta. Parittomilla riveillä `left: var(--size)` siirtää aloituskohtaa yhden ruudun oikealle. Tämä vuorottelee ruutujen värit riviltä toiselle.

## Rivinumerot

`.board` aloittaa CSS-laskurin `rank` arvosta 9. Jokainen lautarivi pienentää sitä yhdellä (`counter-increment: rank -1`). Ensimmäisen rivin laskuriarvoksi tulee siis 8, ja viimeisen 1.

Rivin `::after`-pseudoelementti näyttää arvon `counter(rank)`. Se sijoitetaan rivin vasempaan reunaan ja keskitetään pystysuunnassa. Valitsin `:not(.file-labels)` rajaa rivisäännöt pois kirjainmerkinnöistä.

## Kirjainmerkinnät

`.file-labels` asetetaan laudan alareunaan. `grid-template-columns: repeat(8, var(--size))` jakaa sen kahdeksaan ruudun levyiseen sarakkeeseen, jolloin kirjaimet a–h asettuvat ruutujen kohdalle.

`aria-hidden="true"` piilottaa kirjainmerkinnät ruudunlukijalta. Numerot ja kirjaimet ovat tässä toteutuksessa siis visuaalisia koordinaatteja.
