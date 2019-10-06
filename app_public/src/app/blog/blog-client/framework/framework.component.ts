import { Component, OnInit, EventEmitter, ViewChild, Output, OnDestroy, ErrorHandler } from '@angular/core';
import { Category, ArticleList, Article } from 'src/app/shared/types/article';
import { BlogDataService } from 'src/app/shared/services/blog-data.service';
import { Subscription, EMPTY, Observable } from 'rxjs';
import { Router, NavigationEnd, RouterEvent, ActivatedRoute, Route } from '@angular/router';
import { filter, switchMap, map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit, OnDestroy {

  categories: Category[] = []
  articlelist$: Observable<ArticleList[]>
  constructor(private blogDataService: BlogDataService,
              private activatedRoute: ActivatedRoute,
              private route: Router) { }

  appstatus: string    // which type of app
  categories$: Observable<Category[]>
  categoriesSubscription: Subscription              

  article$: Observable<Article>
  // Those categoires are saved for setting the status of navigation.
  firstCategory: Category
  secondCategory: Category
  subscription: Subscription

  ngOnInit() {
    this.categories$ = this.getCategories("blog")

    // this.articlelist$ = this.route.events.pipe(
    //   filter(event=> event instanceof NavigationEnd),
    //   switchMap((event: RouterEvent)=> {
    //     console.log("framework oninit: " + event )
    //     return EMPTY
    //   })
    // )
    this.article$ = this.activatedRoute.params.pipe(
      switchMap(({ articleid })=> {
        console.log("framework oninit2: " +  articleid)
        if (articleid !== null && articleid !== undefined && articleid !== '')
          return this.blogDataService.getArticleById(articleid)
        else
          return EMPTY
      })
    )

    this.articlelist$ = this.activatedRoute.params.pipe(
      switchMap(({ categoryid, articleid })=> {
        console.log("framework oninit1: " + categoryid + " " + articleid )
        if (categoryid !== null && categoryid !== undefined && categoryid !== '')
          return this.blogDataService.getArticleListByCategory(categoryid)
        else
          return EMPTY
      })
    )


    // this.article$ = this.blogDataService.getArticleById('')



    // this.subscription = this.route.events.pipe(
    //   filter(event=> event instanceof NavigationEnd),
    //   switchMap((event: RouterEvent)=> {
    //     console.log("original: " + event.url)
    //     const target = (event.url === '/') ? 'blog' : event.url.slice(event.url.indexOf('/blog', 0)+6)
    //     console.log("after: " + target)
    //     this.blogDataService.getArticleList(target)
    //       .then((response: ArticleList[])=> {
    //         this.articlelist = response
    //       })
    //       .catch(this.handleError)
    //       return EMPTY
        // console.log("frame route change")
        // console.log("iner: " + event.url)
        // this.blogDataService.getCategories(event.url)
        //   .then((categories: Category[])=>{
        //     if (this.firstCategory === undefined) {
        //       this.categories = categories
        //       this.categories.forEach((category: Category)=> {
        //         if (category.order === 1) {
        //           this.firstCategory = category
        //           category.children.forEach(element => {
        //             if (element.order === 1)
        //               this.secondCategory = element
        //           });
        //         }
                
        //       })
        //     } else {
        //       this.
        //     }
        //     this.blogDataService.getArticleList(this.secondCategory)
        //     .then((response: ArticleList[])=> {
        //       this.articlelist = response
        //     })        
        //   })
        // .catch(this.handleError)   
    //   })
    // ).subscribe(result=>{
    //   console.log("outer:" + result)
    // })
  }

  private getCategories(category: string): Observable<Category[]> {
    console.log("frame getCategories: " + category)
    // console.log(category.split('/'))
    // const appUrl = category.split('/').length > 1 &&  category.split('/')[1] !== ''
    //                   ? category.split('/')[1] : 'blog'
    this.appstatus = category.toUpperCase()
    console.log(this.appstatus)    
    return this.blogDataService.getCategories(category)
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