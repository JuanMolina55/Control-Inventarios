import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tip-doc',
  templateUrl: './tip-doc.component.html',
  styleUrls: ['./tip-doc.component.css']
})
export class TipDocComponent implements OnInit {

  constructor() { }

  titulo:string= "TIP DOC"
  
  ngOnInit(): void {
  }

}
