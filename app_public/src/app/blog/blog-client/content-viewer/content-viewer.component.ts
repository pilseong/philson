import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.component.html',
  styleUrls: ['./content-viewer.component.css']
})
export class ContentViewerComponent implements OnInit {

  markdown: string = 'assets/test.md'
  constructor() { }

  ngOnInit() {
  }

}
