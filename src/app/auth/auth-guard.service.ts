import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private auth: AuthService,
                private router: Router) {
    }

    public canActivate(next: ActivatedRouteSnapshot,
                       state: RouterStateSnapshot): Observable<boolean> | boolean {

        return this.auth.authUser
            .take(1)
            .map(user => !!user)
            .do(loggedIn => {
                if (!loggedIn) {
                    this.router.navigate(['/login']);
                }
            })
    }
}
