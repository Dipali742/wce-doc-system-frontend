import {Injectable} from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class SharedVariablesComponent {
    isLoggedIn = false;
    adminInfo = null;
    userInfo = null;
    isAdmin : any;
    backend_url='https://wce-tracker-api.herokuapp.com'
} 