import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginComponent } from './shared/components/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './shared/components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    RouterModule.forRoot(routes),
    // MarkdownModule.forRoot({
    //   loader: HttpClient, // optional, only if you use [src] attribute
    //   markedOptions: {
    //     provide: MarkedOptions,
    //     useValue: {
    //       gfm: true,
    //       tables: true,
    //       breaks: false,
    //       pedantic: false,
    //       sanitize: false,
    //       smartLists: true,
    //       smartypants: false,
    //     }
    //   }
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
