import { Component, Input } from '@angular/core';
import { trigger, transition, style, animate } from "@angular/animations";
import { LandmarkModel } from 'services/landmarksService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss','./sliderResponsive.component.scss'],
  animations: [

    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]

}
)

export class SliderComponent {

  @Input() carouselSlides: LandmarkModel[] = [];
  slides=[
    { img:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'},
      {img:'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8='}
  ]
  

  currentSlide = 0;

constructor( private router: Router ) {
  this.carouselSlides.forEach(x=>{
    console.log(x.url)
  })
 }

onPreviousClick() {
  const previous = this.currentSlide - 1;
  this.currentSlide = previous < 0 ? this.carouselSlides.length - 1 : previous;
  console.log("previous clicked, new current slide is: ", this.currentSlide);
}

onNextClick() {
  const next = this.currentSlide + 1;
  this.currentSlide = next === this.carouselSlides.length ? 0 : next;
  console.log("next clicked, new current slide is: ", this.currentSlide);
}

RedirectToLandmark()
{
  this.router.navigate(['/landmark', this.carouselSlides[this.currentSlide].objectId])
}
}
