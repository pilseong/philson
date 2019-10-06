import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { 
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatListModule,
  MatExpansionModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
} from '@angular/material'

const modules = [ 
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatListModule,
  MatExpansionModule,
  MatCardModule,
  FlexLayoutModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule
]

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
})
export class MaterialModule { }
