import type { Country, CountryCode } from "../interfaces/country.interface"
import type { Idd, RESTCountry } from "../interfaces/rest-country-intefaces"

export class CountryMapper{

  // static RestCountry => Country
  static mapResCountryToCountry(restCountry:RESTCountry):Country {
    return {
      countryCode:(restCountry.idd.root+restCountry.idd.suffixes),
      flagFifa:restCountry.fifa,
      cca3:restCountry.cca3,
      flagSvg:restCountry.flags.svg,
      country:restCountry.translations['spa'].common ?? 'No Spanish Name',
      capitalName:restCountry.capital.join(','),
      population:restCountry.population,
      idioma:restCountry.languages.spa
    }
  }

  static mapRestCountryArrayToCountryArray(restCounytries:RESTCountry[]):Country[]{
    return restCounytries.map(this.mapResCountryToCountry)
  }
}
