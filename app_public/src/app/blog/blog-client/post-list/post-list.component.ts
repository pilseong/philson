import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'viewcount', 'createdOn'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}


export interface PeriodicElement {
  title: string;
  viewcount: number;
  createdOn: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {title: 'Hydrogen', viewcount: 1.0079, createdOn: '2019-09-10'},
  {title: 'Helium', viewcount: 4.0026, createdOn: '2019-09-10'},
  {title: 'Lithium', viewcount: 6.941, createdOn: '2019-09-10'},
  {title: 'Beryllium', viewcount: 9.0122, createdOn: '2019-09-10'},
  {title: 'Boron', viewcount: 10.811, createdOn:'2019-09-10'},
  {title: 'Carbon', viewcount: 12.0107, createdOn: '2019-09-10'},
  {title: 'Nitrogen', viewcount: 14.0067, createdOn: '2019-09-10'},
  {title: 'Oxygen', viewcount: 15.9994, createdOn: '2019-09-10'},
  {title: 'Fluorine', viewcount: 18.9984, createdOn:'2019-09-10'},
  {title:  'Neon', viewcount: 20.1797, createdOn: '2019-09-10'},
  {title:  'Sodium', viewcount: 22.9897, createdOn:'2019-09-10'},
  {title:  'Magnesium', viewcount: 24.305, createdOn:'2019-09-10'},
  {title:  'Aluminum', viewcount: 26.9815, createdOn: '2019-09-10'},
  {title:  'Silicon', viewcount: 28.0855, createdOn:'2019-09-10'},
  {title:  'Phosphorus', viewcount: 30.9738, createdOn:'2019-09-10'},
  {title:  'Sulfur', viewcount: 32.065, createdOn:'2019-09-10'},
  {title:  'Chlorine', viewcount: 35.453, createdOn: '2019-09-10'},
  {title:  'Argon', viewcount: 39.948, createdOn: '2019-09-10'},
  {title:  'Potassium', viewcount: 39.0983, createdOn: '2019-09-10'},
  {title:  'Calcium', viewcount: 40.078, createdOn: '2019-09-10'},
];

