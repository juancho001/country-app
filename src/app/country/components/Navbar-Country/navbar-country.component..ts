import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'country-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './Navbar-Country.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarCountryComponent { }
