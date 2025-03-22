import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarCountryComponent } from "../../components/Navbar-Country/navbar-country.component.";

@Component({
  selector: 'app-country-layout',
  imports: [RouterOutlet, NavbarCountryComponent],
  templateUrl: './country-layout.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryLayoutComponent { }
