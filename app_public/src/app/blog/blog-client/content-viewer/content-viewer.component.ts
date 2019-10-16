import { Component, OnInit, Output, EventEmitter, OnDestroy, SimpleChanges, OnChanges, DoCheck, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BlogDataService } from 'src/app/shared/services/blog-data.service';
import { switchMap } from 'rxjs/operators';
import { Article, Category } from 'src/app/shared/types/article';
import { SharedService } from '../shared/services/shared.service';
import { EMPTY } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.component.html',
  styleUrls: ['./content-viewer.component.css'],
})
export class ContentViewerComponent implements OnInit, OnDestroy {
  pageContent: Article
    = {
    _id: '',
    title: '',
    name: '',
    text: '',
    tags: '',
    categories: ''
  }
  category: Category;

  constructor(private route: ActivatedRoute,
              private sharedService: SharedService,
              private blogDataService: BlogDataService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    console.log("viewer oninit")
    this.route.params.pipe(
      switchMap(({ articleid })=> {
        console.log(articleid)
        if (articleid !== undefined) {
          console.log("viewer: " + articleid)
          console.log("viewer change mode " + this.sharedService.getMode())
          return this.blogDataService.getArticleById(articleid)
        } else {
          return EMPTY;
        }
      })
    ).subscribe((article: Article)=> {
      this.pageContent = article
      this.sharedService.setMode("read")
      this.category = this.sharedService.getCategory(article.categories)
    })
  }

  ngOnDestroy() {
    console.log("viewer destroied")
  }

  delete() {
    
  }

  toggleMode() {
    if (this.sharedService.getMode() === 'write') {
      // this.sharedService.emitChange('read')
      this.sharedService.setMode("read")
    } else {
      // this.sharedService.emitChange('write')
      this.sharedService.setMode("write")
    }
  }

  getMode(): string {
    return this.sharedService.getMode(); 
  }

  public isLoggedIn(): boolean {
    const value = this.authenticationService.loggedIn()
    // console.log("Client -- isLoggedIn with " + value)
    return value
  }
}
