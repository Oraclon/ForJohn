import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'about_john';
  subscribeForm!: FormGroup;
  subscribeStatus:boolean = false;
  subscribeComplete!: string;

  ngOnInit(): void {
    this.subscribeForm = new FormGroup({
      'subscribeEmail': new FormControl(null, [Validators.required, Validators.email])
    })
  }

  onSubscribe()
    {
      const text = 'Thank you for your subscription.'
      this.subscribeComplete = text;
    }
}
