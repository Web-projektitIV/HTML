# Lomakkeen validointivirheet

Selaimen omat validointiponnahdukset voi korvata kentän alle näytettävällä palautteella. HTML:n validointisäännöt, kuten `required`, `type` ja `pattern`, säilyvät käytössä.

## Miten ratkaisu toimii

1. HTML-kentän attribuutit määrittävät, millainen arvo hyväksytään.
2. Lomakkeen `novalidate` estää selaimen oman validointi-ilmoituksen.
3. `checkValidity()` tarkistaa kentät ja estää lähetyksen, jos jokin arvo ei kelpaa.
4. CSS näyttää virhetekstin virheellisen kentän alla.

## HTML-rakenne

Aseta lomakkeelle `novalidate`, jotta selain ei näytä omaa ponnahdusilmoitustaan. Lisää kenttiin tarvittavat rajoitteet ja niiden jälkeen virheteksti:

```html
<form novalidate onsubmit="return this.checkValidity()">
  <label for="email">Sähköposti</label>
  <input
    id="email"
    name="email"
    class="form-control"
    type="email"
    inputmode="email"
    pattern="[^@\s]+@[^@\s.]+(?:\.[^@\s.]+)*\.[^@\s.]{2,}"
    required
    aria-describedby="email-error"
  />
  <span id="email-error" class="invalid-feedback">
    Anna kelvollinen sähköpostiosoite.
  </span>

  <button type="submit">Lähetä</button>
</form>
```

`novalidate` estää selaimen oman ilmoitusikkunan, mutta kenttien validointisäännöt ovat edelleen käytössä. `checkValidity()` palauttaa `false`, jos jokin kenttä ei täytä sääntöjä. `onsubmit`-käsittelijä estää tällöin lomakkeen lähetyksen.

### Sähköpostin `pattern`

Esimerkin pattern on:

```regex
[^@\s]+@[^@\s.]+(?:\.[^@\s.]+)*\.[^@\s.]{2,}
```

- `[^@\s]+` vaatii ennen `@`-merkkiä vähintään yhden merkin, joka ei ole `@` tai välilyönti.
- `@` vaatii osoitteeseen `@`-merkin.
- `[^@\s.]+` vaatii verkkotunnuksen ensimmäiseen osaan vähintään yhden merkin.
- `(?:\.[^@\s.]+)*` sallii nolla tai useamman pisteellä erotetun väliosan. Sulkeet ryhmittelevät osan, `?:` tekee ryhmästä ei-kaappaavan ja `*` sallii sen toistua nolla tai useamman kerran.
- `\.[^@\s.]{2,}` vaatii viimeisen pisteen jälkeen vähintään kaksi merkkiä. `{2,}` tarkoittaa vähintään kahta merkkiä.

HTML:n `pattern` tarkistaa koko arvon, joten alku- ja loppurajamerkkejä `^` ja `$` ei tarvita. Tämä on yksinkertainen lisätarkistus, ei kaikkien sähköpostiosoitteiden täydellinen määritelmä.

## Virhepalautteen näyttäminen CSS:llä

```css
.invalid-feedback {
  display: none;
  color: #b42318;
}

.form-control:user-invalid:not(:focus) {
  border-color: #b42318;
}

.form-control:user-invalid:not(:focus) + .invalid-feedback {
  display: block;
}
```

- `:user-invalid` kohdistuu käyttäjän virheelliseksi tekemään kenttään tai kenttään, jonka virheellisyys on tullut esiin lähetysyrityksessä.
- `:not(:focus)` näyttää virheen vasta, kun kenttä ei ole aktiivisena muokattavana.
- `+ .invalid-feedback` valitsee heti kentän jälkeisen virhetekstin. Siksi palautetekstin on oltava HTML:ssä välittömästi kentän jälkeen.

## Saavutettavuus ja rajoitukset

- `aria-describedby="email-error"` liittää virhetekstin kentän kuvaukseksi. Tunnisteen (`id`) on vastattava virhetekstin tunnistetta.
- Käytä tekstissä ymmärrettävää ohjetta, kuten mitä arvoa kenttään odotetaan.
- `type="email"` tarkistaa sähköpostin perusmuodon. Esimerkin `pattern` vaatii lisäksi vähintään kaksi merkkiä verkkotunnuksen viimeisen pisteen jälkeen. Mikään yksinkertainen säännöllinen lauseke ei kata kaikkia sähköpostiosoitteiden sallittuja erikoistapauksia.
- `inputmode="email"` pyytää mobiiliselainta näyttämään sähköpostin kirjoittamiseen sopivan näppäimistön. Se ei itsessään validoi arvoa.
- Staattinen palaute ei erottele eri virhetilanteita. JavaScriptillä `input.validity`-ominaisuudesta voi tarkistaa virheen syyn ja päivittää viestin sen mukaan.
- `:user-invalid`-valitsimen toiminta riippuu selaimen tuesta. Tarkista tarvittaessa kohdeselainten yhteensopivuus.
