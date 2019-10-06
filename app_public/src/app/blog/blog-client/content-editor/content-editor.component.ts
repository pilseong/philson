import { Component, OnInit } from '@angular/core';
import { Article } from "src/app/shared/types/article";
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BlogDataService } from 'src/app/shared/services/blog-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-editor',
  template: `
  <mat-card>
    <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
      <div fxLayout="row" fxLayoutAlign="space-between">
        <mat-form-field class="title">
          <input matInput placeholder="Title" name="title" ngModel>
        </mat-form-field>
        <button class="save_button" 
                mat-raised-button 
                color="primary">SAVE</button>
      </div>
      <md-editor name="text" 
        [upload]="doUpload" 
        [preRender]="preRenderFunc" 
        [(ngModel)]="text" 
        [height]="'1000px'" 
        [mode]="mode" 
        [options]="options" 
        required 
        maxlength="2500"
        ngModel>
      </md-editor>
    </form>
  </mat-card>
  `,
  styleUrls: ['./content-editor.component.css']
})
export class ContentEditorComponent implements OnInit {
  private post: Article = {
    _id: '',
    title: '',
    name: '',
    text: '',
    tags: 'test, test',
    categories: 'Product Reviews, good offers'
  }
  
  private formErrors: string = ''

  constructor(private authenticaionService: AuthenticationService,
              private blogDataService: BlogDataService,
              private route: Router) { }

  onSubmit(formData: any): void {
    this.post.name = this.authenticaionService.getCurrentUser().name
    this.post.title = formData.title
    this.post.text = formData.text
    console.log(this.post)

    this.formErrors = ''
    if (this.formIsValid()) {
      this.blogDataService.addArticle(this.post)
        .then((article: Article)=> {
          this.route.navigateByUrl(`/blog/${article._id}`)
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

  ngOnInit() {
  }
}
