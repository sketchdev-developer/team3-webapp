import { $, $$ } from 'protractor';

export class Navbar {
  appTitle = $('.navbar .navbar-brand');
}

export class HomePage {
  url = '/';

  navBar: Navbar = new Navbar();

  searchText = $('.search-text');
}
