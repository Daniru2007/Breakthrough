import { getDocs, collection, query, where, updateDoc, doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.tsx';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Updates the XP of a user in Firestore.
 * @param userEmail - The email of the user whose XP is to be updated.
 * @param additionalXP - The amount of XP to add to the user's current XP.
 */
export const updateUserXPInFirestore = async (userEmail: string, additionalXP: number): Promise<void> => {
    try {
        // Step 1: Query the User document to get the document ID
        const usersQuery = query(collection(db, 'users'), where('email', '==', userEmail));
        const usersSnapshot = await getDocs(usersQuery);

        if (usersSnapshot.empty) {
            console.error('No user found with the provided email.');
            return;
        }

        const userDoc = usersSnapshot.docs[0];
        const userId = userDoc.id; // The document ID for the user
        const userRef = doc(db, 'users', userId);

        // Step 2: Query the UserExtension document
        const userExtensionQuery = query(
            collection(db, 'UserExtension'),
            where('UserID', '==', userRef)
        );
        const userExtensionSnapshot = await getDocs(userExtensionQuery);

        if (userExtensionSnapshot.empty) {
            console.error('No UserExtension document found for the user.');
            return;
        }

        const userExtensionDoc = userExtensionSnapshot.docs[0];
        const userExtensionData = userExtensionDoc.data();

        // Step 3: Update the XP
        const updatedXP = (userExtensionData.XP || 0) + additionalXP;
        await updateDoc(doc(db, 'UserExtension', userExtensionDoc.id), {
            XP: updatedXP,
        });

        console.log(`User XP updated successfully: ${updatedXP}`);
    } catch (error) {
        console.error('Error updating XP in Firestore:', error);
    }
};

export const DoubleXP = async (setUserExtension, userEmail: string): Promise<void> => {
    try {
        // Step 1: Query the User document to get the document ID
        const usersQuery = query(collection(db, 'users'), where('email', '==', userEmail));
        const usersSnapshot = await getDocs(usersQuery);

        if (usersSnapshot.empty) {
            console.error('No user found with the provided email.');
            return;
        }

        const userDoc = usersSnapshot.docs[0];
        const userId = userDoc.id; // The document ID for the user
        const userRef = doc(db, 'users', userId);

        // Step 2: Query the UserExtension document
        const userExtensionQuery = query(
            collection(db, 'UserExtension'),
            where('UserID', '==', userRef)
        );
        const userExtensionSnapshot = await getDocs(userExtensionQuery);

        if (userExtensionSnapshot.empty) {
            console.error('No UserExtension document found for the user.');
            return;
        }

        const userExtensionDoc = userExtensionSnapshot.docs[0];
        const userExtensionData = userExtensionDoc.data();

        // Step 3: Update the XP and Gems
        const updatedXP = (userExtensionData.XP * 2);
        const updatedGems = (userExtensionData.Gems - 100);
        if (updatedGems < 0) {
            console.error('Not enough gems to purchase Double XP.');
            return;
        }
        await updateDoc(doc(db, 'UserExtension', userExtensionDoc.id), {
            XP: updatedXP,
            Gems: updatedGems,
        });

        setUserExtension(prev => ({...prev, Gems: updatedGems, XP: updatedXP}));
        console.log(`User XP updated successfully: ${updatedXP}`);
    } catch (error) {
        console.error('Error updating XP in Firestore:', error);
    }
};
export const DisplayGems = async (setUserExtension, userEmail: string): Promise<void> => {
    try {
        // Step 1: Query the User document to get the document ID
        const usersQuery = query(collection(db, 'users'), where('email', '==', userEmail));
        const usersSnapshot = await getDocs(usersQuery);

        if (usersSnapshot.empty) {
            console.error('No user found with the provided email.');
            return;
        }

        const userDoc = usersSnapshot.docs[0];
        const userId = userDoc.id; // The document ID for the user
        const userRef = doc(db, 'users', userId);

        // Step 2: Query the UserExtension document
        const userExtensionQuery = query(
            collection(db, 'UserExtension'),
            where('UserID', '==', userRef)
        );
        const userExtensionSnapshot = await getDocs(userExtensionQuery);

        if (userExtensionSnapshot.empty) {
            console.error('No UserExtension document found for the user.');
            return;
        }

        const userExtensionDoc = userExtensionSnapshot.docs[0];
        const userExtensionData = userExtensionDoc.data();

         setUserExtension(prev => ({...prev, Gems: userExtensionData.Gems}));

    } catch (error) {
        console.error('Error updating XP in Firestore:', error);
    }
};
