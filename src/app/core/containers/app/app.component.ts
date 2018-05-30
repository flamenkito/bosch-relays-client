import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  OnInit,
  OnDestroy
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import * as fromAuth from '@app/auth/reducers';
import * as fromRoot from '@app/app/reducers';

import { AuthAction } from '@app/auth/actions';
import { LayoutAction, PopupAction } from '@app/core/actions';
import { LoggedUserModel } from '@app/auth/models';
import { routerTransition } from '@app/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  // store
  showSidenav$: Observable<boolean>;
  mobileView$: Observable<boolean>;
  loggedIn$: Observable<boolean>;
  loggedUser$: Observable<LoggedUserModel>;
  showPopup$: Observable<boolean>;
  popupMessage$: Observable<string>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromRoot.State>
  ) {
    this.showSidenav$ = store.select(fromRoot.selectShowSidenav);
    this.mobileView$ = store.select(fromRoot.selectIsMobileView);
    this.showPopup$ = store.select(fromRoot.selectShowPopup);
    this.popupMessage$ = store.select(fromRoot.selectPopupMessage);
    this.loggedIn$ = store.select(fromAuth.selectLoggedIn);
    this.loggedUser$ = store.select(fromAuth.selectLoggedUser);
  }

  @ViewChild('routerOutlet') routerOutlet: RouterOutlet;

  navigate$: Observable<void>;
  menuButton$: Observable<boolean>;
  destroy$ = new Subject<void>();

  ngOnInit() {
    // TODO: refactor
    // mobile view
    this.breakpointObserver
      .observe('(min-width: 922px)')
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ matches }) =>
        this.store.dispatch(new LayoutAction.MobileView(!matches))
      );
    // show menu button on mobile view only
    this.menuButton$ = combineLatest(this.mobileView$, this.loggedIn$).pipe(
      map(([mobileView, loggedIn]) => loggedIn && mobileView),
      takeUntil(this.destroy$)
    );
    // trigger animation on component change
    this.navigate$ = this.routerOutlet.activateEvents.pipe(
      map(event => event.constructor),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPopupClose() {
    // TODO: refactor (PopupClosed event?)
    this.store.dispatch(new PopupAction.Dismiss());
  }

  openSidenav() {
    this.store.dispatch(new LayoutAction.Open());
  }

  closeSidenav() {
    this.store.dispatch(new LayoutAction.Close());
  }

  toggleSidenav() {
    this.store.dispatch(new LayoutAction.Toggle());
  }

  logout() {
    this.closeSidenav();
    this.store.dispatch(new AuthAction.Logout());
  }
}
