import { Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ArticleList } from 'src/app/shared/types/article';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['title', 'viewcount', 'createdOn'];
  dataSource: MatTableDataSource<ArticleList>
  @Input() articleList: ArticleList[]

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor() {
    this.articleList = []
    this.dataSource = new MatTableDataSource<ArticleList>(this.articleList); 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("PostListComponent onChange: " + JSON.stringify(this.articleList))
    if (this.articleList !== undefined && this.articleList !== null)
      this.dataSource.data = this.articleList
  }
}