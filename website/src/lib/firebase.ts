import {type FirebaseApp, initializeApp} from 'firebase/app';
import {
    type Auth,
    connectAuthEmulator,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword as logInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    type User
} from 'firebase/auth';
import {connectFirestoreEmulator, Firestore, getFirestore} from 'firebase/firestore';
import {derived, writable} from "svelte/store";
import {Env, env} from "./env";

const firebaseConfig = {
    apiKey: "AIzaSyBeHOHnHOWrvGt-T41BeAm2-iUD6svrbjU",
    authDomain: "agents-as-a-service.firebaseapp.com",
    projectId: "agents-as-a-service",
    storageBucket: "agents-as-a-service.appspot.com",
    messagingSenderId: "666361884823",
    appId: "1:666361884823:web:fc2f3f391d33298976b9d2",
    measurementId: "G-E3XCKZ2Q2B",
    useEmulator: Env.isLocal(env),
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);

if (firebaseConfig.useEmulator) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099")
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
}

export {
    GoogleAuthProvider,
    GithubAuthProvider,
    signOut
}

export async function signInWithGithub() {
    try {
        authState.update(user => ({...user, isLoading: true}));
        await signInWithPopup(auth, new GithubAuthProvider());
    } catch (e) {
        console.error(e);
    }
}

export async function signInWithGoogle() {
    try {
        authState.update(user => ({...user, isLoading: true}));
        await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e) {
        console.error(e);
    }
}

export async function signInWithEmailAndPassword(email: string, password: string) {
    try {
        authState.update(user => ({...user, isLoading: true}));
        await logInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        console.error(e);
    }
}

export const authState = writable<{
    user?: User | null,
    isLoggedIn: boolean,
    isLoading: boolean,
}>({
    user: auth.currentUser,
    isLoggedIn: false,
    isLoading: true,
});

export const authenticatedState = derived(authState, ({user}) => {
    if (user == null) throw new Error("User is not authenticated.");
    return user;
});

auth.onAuthStateChanged(async (user) => {
    authState.set({
        user: user,
        isLoggedIn: !!user,
        isLoading: false,
    });
});
