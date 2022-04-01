import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-gift',
  templateUrl: './add-gift.component.html',
  styleUrls: ['./add-gift.component.scss']
})
export class AddGiftComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
	files: File[] = [];

	onSelect(event) {
	  console.log(event);
	  this.files.push(...event.addedFiles);
	}

	onRemove(event) {
	  console.log(event);
	  this.files.splice(this.files.indexOf(event), 1);
	}

}
