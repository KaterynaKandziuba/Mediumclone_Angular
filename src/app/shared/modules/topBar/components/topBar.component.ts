import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { isAnonymousSelector, isLoggedInSelector, CurrentUserSelector } from '../../../../auth/store/selectors';
import { CurrentUserInterface } from '../../../../auth/shared/types/currentUser.interface';
import { Store, select } from '@ngrx/store';

@Component({
    selector: 'mc-topbar',
    templateUrl: './topBar.component.html',
})
export class TopBarComponent implements OnInit{
    isLoggedIn$: Observable<boolean>
    isAnonymous$: Observable<boolean>
    currentUser$: Observable<CurrentUserInterface | null>

    constructor(private store: Store){}

    ngOnInit(): void {
        this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
        this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))
        this.currentUser$ = this.store.pipe(select(CurrentUserSelector))
    }
}