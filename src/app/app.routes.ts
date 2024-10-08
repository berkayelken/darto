import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ArtGalleryComponent } from './art-gallery/art-gallery.component';

export const routes: Routes = [{ path: 'home', component: HomeComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'art-gallery', component: ArtGalleryComponent },
    { path: '**', component: HomeComponent }
];
