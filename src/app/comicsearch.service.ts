import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Issue} from '../../e2e/homepage.e2e-spec';

import 'rxjs/add/operator/map';


export class IssueSearchResult {
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

interface SearchResponse {
	results: IssueSearchResult[];
}

@Injectable()
export class ComicsearchService {

	constructor(private http: HttpClient) {
	}

	getComicsByCharacter(characterName: string): Observable<SearchResponse> {
		return this.http.post<SearchResponse>('/api/searches', {search: characterName});
			// .map(data => data.results);
	}

}
