import { SpecHelper } from './support/spec.helper';
import { HomePage } from './pages/home.po';

export interface Issue {
	id: string;
	name: string;
	image: string;
	issue_number: string;
	location_credits: string[];

	aliases: string;
	api_detail_url: string;
	character_credits:	string[];
	characters_died_in: string[];
	concept_credits: string[];
	cover_date: string;
	date_added: string;
	date_last_updated: string;
	deck: string;
	description: string;
	disbanded_teams: string[];
	first_appearance_characters: string[];
	first_appearance_concepts: string[];
	first_appearance_locations: string[];
	first_appearance_objects: string[];
	first_appearance_storyarcs: string[];
	first_appearance_teams: string[];
	object_credits: string[];
	person_credits: string[];
	site_detail_url: string;
	store_date: string;
	story_arc_credits: string[];
	team_credits: string[];
	teams_disbanded_in: string[];
	volume: string;

	//has_staff_review
}

class IssueSearchResult {
  id: string;
  title: string;
  description: string;
  image_url: string;
  issue_number: string;
  publication_date: string;

  constructor(attrs: any = {}) {
    this.id = attrs.id;
    this.title = attrs.title;
    this.description = attrs.description;
    this.image_url = attrs.image_url;
    this.issue_number = attrs.issue_number;
    this.publication_date = attrs.publication_date;
  }
}

describe('homepage', () => {
  let homePage: HomePage;
  let specHelper: SpecHelper;

  beforeEach(() => {
    specHelper = new SpecHelper();
    homePage = new HomePage();
  });

  it('displays welcome text', () => {
    specHelper.navigateTo(homePage);

    expect(homePage.navBar.appTitle.getText()).toEqual('Comic Search');
    expect(homePage.searchText.getText()).toEqual('Search for your favorite comic book character');
  });

  describe('searching for character', () => {
    let characterName;
    let firstSearchResultItem;

    let searchResults: IssueSearchResult[];

    let result1;

    beforeEach(() => {
      characterName = 'wolverine';
      firstSearchResultItem = homePage.searchResults.get(0);

      result1 = new IssueSearchResult({
        id: 'issue-id',
        title: 'The Gemstone Project',
        description: 'Gemstone Project Description',
        image_url: 'https://static.comicvine.com/uploads/square_small/0/3848/5807889-stl002782.jpg',
        issue_number: '123',
        publication_date: `${new Date()}`
      });

      searchResults = [
        result1
      ];
    });

    it('can search for comic book character', () => {
      specHelper.navigateTo(homePage);

      expect(homePage.searchResults.isPresent()).toEqual(false);

      homePage.searchInput.sendKeys(characterName);
      homePage.searchButton.click();

      expect(homePage.searchResults.isPresent()).toEqual(true);

      const firstSearchResultItem = homePage.searchResults.get(0);

      expect(firstSearchResultItem.title.getText()).toEqual(result1.title);
      expect(firstSearchResultItem.description.getText()).toEqual(result1.description);
    });
  });
});
