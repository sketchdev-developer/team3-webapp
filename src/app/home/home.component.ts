import {Component, OnInit} from '@angular/core';


class IssueSearchResult {
	// id: string;
	title: string;
	description: string;
	image_url: string;
	// issue_number: string;
	// publication_date: string;

	constructor(attrs: any = {}) {
		// this.id = attrs.id;
		this.title = attrs.title;
		this.description = attrs.description;
		this.image_url = attrs.image_url;
		// this.issue_number = attrs.issue_number;
		// this.publication_date = attrs.publication_date;
	}
}

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	searchResults: Array<IssueSearchResult>;

	constructor() {
	}

	ngOnInit() {
		this.searchResults = [];
	}

	searchForBooks() {
		this.searchResults.push({
			image_url: 'https://static.comicvine.com/uploads/square_small/0/3848/5807889-stl002782.jpg',
			title: 'The Gemstone Project',
			description: 'Gemstone Project Description'
		});
	}

}
