import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'property-space',
  templateUrl: './property-space.component.html',
  styleUrls: ['./property-space.component.css']
})
export class PropertySpaceComponent implements OnInit {

  @Input('location') location: object;

  constructor() { }

  ngOnInit() {
  }

}
