import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { SliderComponent } from './home/slider/slider.component';
import { LandmarksPageComponent } from './landmarks-page/landmarks-page.component';
import { LandmarkItemComponent } from './landmark-item/landmark-item.component';
import { LandmarkComponent } from './landmark/landmark.component';
import { AuthComponent } from './auth/auth.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LandmarksService } from 'services/landmarksService.service';
import { AuthenticationGuard } from 'services/authenticationGuard.service';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from 'services/authenticationInterceptor.service';
import { NavSearchPipe } from 'services/navSearchPipe.pipe';
import { UserMenuDirective } from 'directives/user-menu.directive';
import { KeypressedDirective } from '../../directives/keypressed.directive';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  { path: 'landmarks', component: LandmarksPageComponent },
  { path: 'landmark/:object_id', component: LandmarkComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'adminPage', canActivate:[ AuthenticationGuard ], component:AdminPageComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    SliderComponent,
    LandmarksPageComponent,
    LandmarkItemComponent,
    LandmarkComponent,
    AuthComponent,
    NavSearchPipe,
    AdminPageComponent,
    UserMenuDirective,
    KeypressedDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ],
  providers: [
    LandmarksService,
    AuthenticationGuard,
    CookieService,
   { provide:HTTP_INTERCEPTORS, useClass:AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
