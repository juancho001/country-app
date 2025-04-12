import { Currencies } from './../interfaces/rest-country-intefaces';
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
      country:restCountry.translations['spa'].common.toString() ?? 'No Spanish Name',
      capitalName:restCountry.capital?.join(',').toString(),
      population:restCountry.population,
      languages:restCountry.languages?.spa,
      regregion:restCountry.region,
      subregion:restCountry.subregion,
      googleMaps:restCountry.maps.googleMaps,
      timezones:restCountry.timezones?.join(',') ?? 'No timezones ',
      continents:restCountry.continents?.join(',') ?? 'No continents',
      borders:restCountry.borders?.join(',') ?? 'No borders',
      area:restCountry.area
    }
  }

  static mapRestCountryArrayToCountryArray(restCounytries:RESTCountry[]):Country[]{
    return restCounytries.map(this.mapResCountryToCountry)
  }
}
