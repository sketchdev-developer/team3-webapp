import {Component, OnInit} from '@angular/core';
import {ComicsearchService, IssueSearchResult} from '../comicsearch.service';
import { NgForm } from '@angular/forms';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	searchResults: Array<IssueSearchResult>;
	characterName: string;

	constructor(private comicsearch: ComicsearchService) {
	}

	ngOnInit() {
		this.searchResults = [];
	}

	searchForBooks() {
		this.comicsearch.getComicsByCharacter(this.characterName).subscribe(data => {
			console.log('????????', data[0].issue);
			this.searchResults = data[0].issue;
		});
	}
}
