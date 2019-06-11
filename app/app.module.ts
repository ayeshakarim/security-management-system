import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ROUTES } from './app.routes';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

// redux
import { StoreModule, ActionReducer, Action } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { localStorageSync } from 'ngrx-store-localstorage';
import {
    issuesReducer,
    usersReducer,
    penaltiesReducer,
    offensesReducer } from './ducks/index';

// set default environment
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';



// base component
import { AppComponent } from './app.component';
import { LoadingSpinnerModule } from './components/loading-spinner/loading-spinner.module';

// Import application styles
import '../styles/index.scss';

// Generic Components
import { NoContentComponent } from './components/no-content/no-content.component';
import { IssuesController } from './ducks/issues/issues.controller';
import { UsersController } from './ducks/users/users.controller';
import { PenaltiesController } from './ducks/penalties/penalties.controller';
import { OffensesController } from './ducks/offenses/offenses.controller';
import { from } from 'rxjs';

// Application wide providers
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    Title,
    AppState,
    IssuesController,
    UsersController,
    PenaltiesController,
    OffensesController
];

export function logger(reducer) {
    return storeLogger()(reducer);
}

export function localStorageSyncReducer(reducer) {
    return localStorageSync({
        rehydrate: true,
        keys: [
            'issues',
            'users',
            'penalties',
            'offenses'
        ]
    })(reducer);
}

export const metaReducers = environment.production ? [localStorageSyncReducer] : [logger, localStorageSyncReducer];

@NgModule({
    declarations: [
        AppComponent,
        NoContentComponent,
        // LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        LoadingSpinnerModule,
        RouterModule.forRoot(ROUTES, {
            useHash: Boolean(history.pushState) === false,
            preloadingStrategy: PreloadAllModules
        }),
        // Redux module config
        StoreModule.forRoot({
            issues: issuesReducer,
            users: usersReducer,
            penalties: penaltiesReducer,
            offenses: offensesReducer
        }, {
            metaReducers
        })
    ],
    providers: [
        APP_PROVIDERS,
        // api interceptor provider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
