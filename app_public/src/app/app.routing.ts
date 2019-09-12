import { Route } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';

export const routes: Route[] = [
  // { path: '', component: ''}
  { path: '', loadChildren: './blog/blog-client/blog-client.module#BlogClientModule' },
  { path: 'login', component: LoginComponent }
  // { path: 'products/:productId', loadChildren: './product/product.module#ProductModule'}
]