import { Router, Routes } from '@angular/router';
import { SignInComponent } from './authentication/sign-in.component';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

function isSignedIn() {
    const signed_in = inject(AuthService).is_logged_in();
    const router = inject(Router);
    if (signed_in) {
        router.navigate([ '', 'dashboard' ]);
        return false;
    } else {
        return true;
    }

}

export const routes: Routes = [
    {
        path: "", redirectTo: 'signin', pathMatch: "full",

    },
    {
        path: "signin", component: SignInComponent,
        canActivate: [ () => isSignedIn() ]
    },
    {
        path: 'signup', canActivate: [ () => isSignedIn() ],
        loadComponent: () => import('./authentication/sign-up.component').then(c => c.SignUpComponent)
    },
    {
        path: 'profile', canActivate: [ () => inject(AuthService).is_logged_in() ],
        loadComponent: () => import('./authentication/profile.component').then(c => c.ProfileComponent)
    },

    {
        path: 'dashboard', canActivate: [ () => inject(AuthService).is_logged_in() ],
        loadChildren: () => import('./dashboard/dashboard.routes').then(r => r.dashbardRoutes)

    },

    { path: '**', redirectTo: "" }
];
