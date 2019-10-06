import { Route } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';

export const routes: Route[] = [
  // { path: '', component: ''}
  { path: '', loadChildren: './blog/blog-client/blog-client.module#BlogClientModule' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }

  // { path: 'products/:productId', loadChildren: './product/product.module#ProductModule'}
]