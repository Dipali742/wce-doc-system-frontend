import {Injectable} from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class SharedVariablesComponent {
    isLoggedIn = false;
    adminInfo = null;
    userInfo = null;
    isAdmin : any;
    currentLoginAsAdmin = null;
} 