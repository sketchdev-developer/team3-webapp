import { $, $$ } from 'protractor';

export class Navbar {
  appTitle = $('.navbar .navbar-brand');
}

export class SearchResult {
}

export class SearchResults {
  isPresent = () => $('.search-results').isPresent();

  get = (index) => {
    const el = $$('.search-results .issue').get(index);

    return {
      title: el.$('.title'),
      description: el.$('.description'),
    }
  }
}

export class HomePage {
  url = '/';

  navBar: Navbar = new Navbar();

  searchText = $('.search-text');

  searchInput = $('.search-input');
  searchButton = $('.search-button');

  searchResults = new SearchResults();
}
