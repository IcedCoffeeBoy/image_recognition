import { Component, OnInit, Input, ViewChild } from '@angular/core';


@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  @Input() box;
  @ViewChild('boxRef', { static: false }) boxRef;

  constructor() { }

  ngOnInit() {

  }

}
