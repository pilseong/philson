import { Component, OnInit, Inject } from '@angular/core';
import { Article, Category } from "src/app/shared/types/article";
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BlogDataService } from 'src/app/shared/services/blog-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-content-editor',
  templateUrl:'content-editor.component.html',
  styleUrls: ['./content-editor.component.css']
})
export class ContentEditorComponent implements OnInit {
  private post: Article = {
    _id: '',
    title: '',
    name: '',
    text: '',
    tags: '',
    categories: ''
  }
  
  private formErrors: string = ''

  constructor(private authenticaionService: AuthenticationService,
              private blogDataService: BlogDataService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private sharedService: SharedService) { }

  onSubmit(formData: any): void {
    this.post.categories = this.activatedRoute.snapshot.params.categoryid
    this.post.name = this.authenticaionService.getCurrentUser().name
    this.post.title = formData.title
    this.post.text = formData.text
    console.log(this.post)

    this.formErrors = ''
    if (this.formIsValid()) {
      this.blogDataService.addArticle(this.post)
        .then((article: Article)=> {
          this.router.navigateByUrl(`/blog/${article._id}`)
          // console.log(JSON.stringify(article))
        })
        .catch((message)=> this.formErrors = message)
    } else {
      this.formErrors = 'All fields required, please try again'
    }
  }

  private formIsValid(): boolean {
    if (this.post.title && this.post.text) {
      return true
    } else {
      return false
    }
  }

  openDialog(formData: any) {
    this.post.categories = this.activatedRoute.snapshot.params.categoryid
    this.post.name = this.authenticaionService.getCurrentUser().name
    this.post.title = formData.title
    this.post.text = formData.text
    console.log(this.post)

    this.formErrors = ''
    if (this.formIsValid()) {
      const dialogRef = this.dialog.open(BlogPostDialog, {
        width: '450px',
        data: this.post
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed')
        console.log(JSON.stringify(result))
        if (result !== undefined) {
          this.blogDataService.addArticle(this.post)
              .then((article: Article)=> {
              // this.router.navigateByUrl(`/blog/${article._id}`)
              console.log(JSON.stringify(article))
              this.sharedService.setMode("read")
            })
            .catch((message)=> this.formErrors = message)
        }
      });

    } else {
      this.formErrors = 'All fields required, please try again'
    }
  }

  ngOnInit() {
  }
}

@Component({
  selector: 'blog-post-dialog',
  templateUrl: 'blog-post-dialog.html',
})
export class BlogPostDialog implements OnInit{
  categories$: Observable<Category[]>
  // categories: Category[]
  constructor(
    public dialogRef: MatDialogRef<BlogPostDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Article,
    private blogDataService: BlogDataService) {}

  ngOnInit(): void {
    this.categories$ = this.blogDataService.getCategories("blog", false, true)
    console.log(this.data)

    // this.blogDataService.getCategories("blog", false, true).subscribe(result=> {
    //   this.categories = result
    //   console.log(this.categories)
    // })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
