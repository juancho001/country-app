import { Routes } from '@angular/router';
import { CountryLayoutComponent } from './layout/country-layout/country-layout.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';

export const countryRoutes: Routes = [
  {
    path:'',
    component:CountryLayoutComponent,
    children:[
      {
        path:'by-country',
        component:ByCountryPageComponent
      },
      {
        path:'by-capital',
        component:ByCapitalPageComponent
      },
      {
        path:'by-region',
        component:ByRegionPageComponent
      },
      {
        path:'**',
        redirectTo:'by-country'
      }
    ]
  }
];

export default countryRoutes;
