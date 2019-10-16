import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment.prod';;
import { BROWSER_STORAGE } from '../types/storage';
import { Article, Category, ArticleList } from "../types/article";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogDataService {
  private apiBaseUrl = environment.apiBaseUrl
  private loadingError$ = new Subject<boolean>()
  
  constructor(private http: HttpClient, 
              @Inject(BROWSER_STORAGE) private storage: Storage) { }

  // post an article
  public addArticle(article: Article): Promise<Article> {
    const url: string = `${this.apiBaseUrl}/blog/articles`

    // console.log(this.storage.getItem('philson-token'))
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('philson-token')}`
      })
    }
    return this.http.post(url, article, httpOptions)
      .toPromise()
      .then(response=> response as Article)
      .catch(this.handleError)
  }

  public getArticleById(id: string): Observable<Article> {
    const url: string = `${this.apiBaseUrl}/blog/articles/${id}`
    console.log("getArticleById: " + url)
    return this.http.get<Article>(url)
  }

  public getArticleListByCategory(categoryid: string): Observable<ArticleList[]> {
    const url: string = `${this.apiBaseUrl}/blog/articles?categories=${categoryid}`
    console.log("getArticleListByCategory: " + url)
    return this.http.get<ArticleList[]>(url)
  }

  public getCategories(currenturl: string, parent:boolean, children: boolean): Observable<Category[]> {
    const url: string = `${this.apiBaseUrl}/blog/categories/${currenturl}?parent=${parent}&children=${children}`
    console.log("getCategories: " + url)
    return this.http.get<Category[]>(url)
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error)
    return Promise.reject(error.message || error)
  }
}