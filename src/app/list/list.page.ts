import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('searchbar') searchbar_elem: ElementRef;

  private selectedItem: any;
  private search_url = 'http://localhost:8080/route/1.0.0/search';
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  private page = 0;
  private query = '';
  searchText = '';
  constructor(private http: HttpClient) {
    this.search(this.query, this.page);
  }

  wordChanged() {
    this.page = 0;
    this.query = this.searchText;
    this.items = [];
    this.search(this.query, this.page);
  }

  doInfinite(event) {
    console.dir('infini');
    this.page++;
    this.search(this.query, this.page);
  }

  ngOnInit() {
  }

  public search(query, page): Promise<any[]> {
    return this.http.get(this.search_url + '?q=' + query + '&page=' + page).toPromise()
      .then((res: any) => {
        if (!res.results) {
          return;
        }
        for (let i = 0; i < res.results.length; i++) {
          let r = res.results[i];
          this.items.push({
            title: r.title,
            note: r.author,
            icon: 'beer'
          });

          this.infiniteScroll.complete();
        }

        const response: any = res;
        return response;
      });
  }

  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
