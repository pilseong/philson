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
  MatDialogModule,
  MatOptionModule,
  MatSelectModule,
  MatChipsModule,
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
  MatDialogModule,
  FlexLayoutModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatOptionModule,
  MatChipsModule
]

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
})
export class MaterialModule { }
