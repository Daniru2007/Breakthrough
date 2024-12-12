// @ts-nocheck
import { useContext } from 'react';
import {doc, getDocs, query, where, collection, updateDoc, getFirestore} from 'firebase/firestore';
import UserContext from './UserContext';
import { firebaseConfig} from './firebase';
import {initializeApp} from "firebase/app";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default async function updateUserXP(xpIncrement: number) {
    const { user } = useContext(UserContext);

    if (!user || !user.email) {
        console.error('User context or email is missing.');
        return;
    }

    try {
        // Get the user's document
        const usersQuery = query(
            collection(db, 'users'),
            where('email', '==', user.email)
        );
        const usersSnapshot = await getDocs(usersQuery);

        if (usersSnapshot.empty) {
            console.error('No user found with the given email.');
            return;
        }

        const userDoc = usersSnapshot.docs[0];
        const userId = userDoc.id;

        // Find the relevant UserExtension document
        const userExtensionQuery = query(
            collection(db, 'UserExtension'),
            where('UserID', '==', doc(db, 'users', userId))
        );
        const userExtensionSnapshot = await getDocs(userExtensionQuery);

        if (userExtensionSnapshot.empty) {
            console.error('No UserExtension document found for the user.');
            return;
        }

        const userExtensionDoc = userExtensionSnapshot.docs[0];

        // Update XP in the UserExtension document
        await updateDoc(userExtensionDoc.ref, {
            XP: (userExtensionDoc.data().XP || 0) + xpIncrement,
        });

        console.log('XP updated successfully!');
    } catch (error) {
        console.error('Error updating XP:', error);
    }
}
