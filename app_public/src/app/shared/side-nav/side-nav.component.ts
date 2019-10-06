import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../types/article';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Input() categories: Category[]
  @Input() appStatus: string
  constructor() { }

  ngOnInit() {
  }
}
