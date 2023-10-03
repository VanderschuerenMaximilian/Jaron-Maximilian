import { Injectable } from '@nestjs/common';
import { App, applicationDefault, initializeApp } from 'firebase-admin/app';
import { Auth } from 'firebase-admin/lib/auth/auth';
import { getAuth } from 'firebase-admin/auth'

@Injectable()
export class FirebaseService {
    private firebaseApp: App;
    
    // TODO: in app.module.ts import nestjs/config package
    // TODO: check path in .env file
    constructor() {
        this.firebaseApp = initializeApp({
            credential: applicationDefault(), // Looks at enviroment variables in .env => GOOGLE_APPLICATION_CREDENTIALS
        })
    }

    getAuth = (): Auth => getAuth();
}
