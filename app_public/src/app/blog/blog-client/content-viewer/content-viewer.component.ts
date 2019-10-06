import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BlogDataService } from 'src/app/shared/services/blog-data.service';
import { switchMap } from 'rxjs/operators';
import { Article } from 'src/app/shared/types/article';

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.component.html',
  styleUrls: ['./content-viewer.component.css']
})
export class ContentViewerComponent implements OnInit {
   pageContent: Article = {
    _id: '',
    title: '',
    name: '',
    text: '',
    tags: 'test, test',
    categories: 'Product Reviews, good offers'
  }
  markdown: string = 'assets/test.md'
  constructor(private route: ActivatedRoute,
              private blogDataService: BlogDataService) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(({ articleid })=> {
        console.log("viewer: " + articleid)
        return this.blogDataService.getArticleById(articleid)
      })
    ).subscribe((article: Article)=> {
      this.pageContent = article
      // this.pageContent._id    = article._id
      // this.pageContent.name   = article.name
      // this.pageContent.title  = article.title
      // this.pageContent.text   = article.text
      // this.pageContent.tags   = article.tags
      // this.pageContent.categories = article.categories
    })
  }

}
