import { ref } from 'vue'
import { initializeApp } from 'firebase/app';
import { 
    getAuth, signInWithEmailAndPassword, 
    setPersistence, browserLocalPersistence, 
    onAuthStateChanged, signOut,
    createUserWithEmailAndPassword, updateProfile,
    sendPasswordResetEmail,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import type { Router } from 'vue-router';

const app = initializeApp({
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messageSenderId,
    appId: import.meta.env.VITE_appId,
});

const auth = getAuth(app);
// om te zorgen dat de gebruiker ingelogd blijft
setPersistence(auth, browserLocalPersistence)
const firebaseUser = ref<User | null>(auth.currentUser)

// const router = useRouter()

const restoreUser = async () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                firebaseUser.value = user
                resolve(user)
            } else {
                firebaseUser.value = null
                resolve(null)
            }
        })
    })
}

const login = async (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                firebaseUser.value = userCredential.user
                resolve(userCredential.user)
            })
            .catch((error) => {
                reject(error)
            });
    })
};

const signOutUser = async (router: Router) => {
    return new Promise((resolve, reject) => {
        signOut(auth).then(() => {
            firebaseUser.value = null
            router.push("/")
            resolve(null)
        })
        .catch((error) => {
            reject(error)
        });
    })
}

const register = async (name: string, email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                firebaseUser.value = userCredential.user
                updateProfile(firebaseUser.value, { displayName: name })
                resolve(userCredential.user)
            })
            .catch((error) => {
                reject(error)
            });
    })
}

const forgotPassword = async (email: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                resolve()
            })
            .catch((error) => {
                reject(error)
            });
    })
}

export default () => {
    // voor elk composable
    return { 
        firebaseUser,
        
        forgotPassword,
        login,
        register,
        restoreUser,
        signOutUser,
    }
}