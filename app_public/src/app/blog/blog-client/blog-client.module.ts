import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameworkComponent } from './framework/framework.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PostListComponent } from './post-list/post-list.component';
import { ContentViewerComponent } from './content-viewer/content-viewer.component';
import { ContentEditorComponent } from './content-editor/content-editor.component';
import { FormsModule } from '@angular/forms';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { MarkdownModule } from 'ngx-markdown';
import { SideNavModule } from 'src/app/shared/side-nav/side-nav.module';

const routes: Routes = [
  // { path: '', component: FrameworkComponent }
  { path: '', pathMatch: 'full', redirectTo: 'blog/categories' }, 
  { path: 'blog', pathMatch: 'full', redirectTo: 'blog/categories' },
  { path: 'blog/categories', children: [
    { path: '', pathMatch: 'full', redirectTo: 'all' },
    { path: ':categoryid', component: FrameworkComponent , children: [
      { path: '', pathMatch: 'full', component: ContentViewerComponent },
      { path: ':articleid', pathMatch: 'full', component: ContentViewerComponent },
    ]},
  ]}

  // { path: ':categoriId', pathMatch: 'full', component: ContentViewerComponent },
  // { path: 'new', pathMatch: 'full', component: ContentEditorComponent },
  // { path: '', pathMatch: 'full', redirectTo: 'categories' },
  // { path: 'search-results', component: SearchResultsComponent },
  // { path: 'categories', children: [
  //   { path: '', pathMatch: 'full', redirectTo: 'all' },
  //   { path: ':category', component: CategoriesComponent },
]


@NgModule({
  declarations: [
    FrameworkComponent, 
    PostListComponent, 
    ContentViewerComponent, 
    ContentEditorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    LMarkdownEditorModule,
    SideNavModule,
    MarkdownModule.forChild(),
    RouterModule.forChild(routes)
  ]
})
export class BlogClientModule { }
