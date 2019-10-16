import { Component, OnInit, EventEmitter, ViewChild, Output, OnDestroy, ErrorHandler, ElementRef } from '@angular/core';
import { Category, ArticleList, Article } from 'src/app/shared/types/article';
import { BlogDataService } from 'src/app/shared/services/blog-data.service';
import { Subscription, EMPTY, Observable } from 'rxjs';
import { Router, NavigationEnd, RouterEvent, ActivatedRoute, Route } from '@angular/router';
import { filter, switchMap, map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css'],
})
export class FrameworkComponent implements OnInit, OnDestroy {
  activeCategory: Category
  categories: Category[] = []
  articlelist$: Observable<ArticleList[]>
  constructor(private blogDataService: BlogDataService,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService,
              private route: Router) { 
  }

  appstatus: string    // which type of app
  // categories$: Observable<Category[]>
  categoriesSubscription: Subscription              

  article$: Observable<Article>
  // Those categoires are saved for setting the status of navigation.
  firstCategory: Category
  secondCategory: Category
  subscription: Subscription

  ngOnInit() {
    this.getCategories("blog").subscribe(categories=> {
      this.categories = categories;
      this.sharedService.setCategories(categories)
    })

    this.articlelist$ = this.activatedRoute.params.pipe(
      switchMap(({ categoryid, articleid })=> {
        console.log("framework change route " + this.sharedService.getMode())
        if (categoryid === 'all') {
          this.activeCategory = undefined
        } else {
          this.activeCategory = this.sharedService.setActiveCategory(categoryid)
          console.log(this.activeCategory)
        }
        console.log("framework oninit1: " + categoryid + " " + articleid )
        if (categoryid !== null && categoryid !== undefined && categoryid !== '')
          return this.blogDataService.getArticleListByCategory(categoryid)
        else
          return EMPTY
      })
    )
  }

  public changeMode(event) {
      console.log(event)
  }

  private getCategories(category: string): Observable<Category[]> {
    console.log("frame getCategories: " + category)
    // console.log(category.split('/'))
    // const appUrl = category.split('/').length > 1 &&  category.split('/')[1] !== ''
    //                   ? category.split('/')[1] : 'blog'
    this.appstatus = category.toUpperCase()
    console.log(this.appstatus)    
    return this.blogDataService.getCategories(category, true, false)
  }

  getMode(): string {
    return this.sharedService.getMode()
  }

  toggleSidebar(menu: MatSidenav) {
      menu.toggle()
  }

  
  closeSidebar(sidebar: MatSidenav) {
    if (sidebar.opened) {
      sidebar.close()
    }
  }

  ngOnDestroy() {
    console.log("framework destory")
    // this.subscription.unsubscribe()
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error)
    return Promise.reject(error.message || error)
  }
}