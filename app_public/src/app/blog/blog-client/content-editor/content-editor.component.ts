import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-editor',
  template: `
  <mat-card>
    <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
      <div fxLayout="row" fxLayoutAlign="space-between center">
        <mat-form-field>
          <input matInput placeholder="Title" name="title" ngModel>
        </mat-form-field>
        <button class="save_button" mat-raised-button color="primary">SAVE</button>
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

  content: string
  constructor() { }

  onSubmit(formData: any): void {
    console.log(formData)
  }

  ngOnInit() {
  }


}
