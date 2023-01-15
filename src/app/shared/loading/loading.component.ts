import { Component, OnInit, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() color: ThemePalette = 'primary';
  @Input() mode: ProgressSpinnerMode = 'determinate';
  @Input() value: number = 50;
  @Input() view: boolean = false;


  constructor() { }

  ngOnInit(): void {

  }

  Open() {
    this.view = true;
  }

  Hide() {
    this.view = false;
  }

}
