import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

interface UserExtension {
    XP?: number;
    Gems?: number;
}

export const updateGemsBasedOnXP = onSchedule(
    { schedule: "every 24 hours" }, // Pass the schedule string inside an object
    async () => {
        try {
            const userExtensionsRef = db.collection("UserExtension");
            const snapshot = await userExtensionsRef.get();

            if (snapshot.empty) {
                console.log("No documents found in UserExtension collection.");
                return;
            }

            const batch = db.batch();

            snapshot.forEach((doc) => {
                const data = doc.data() as UserExtension;

                if (data.XP && data.XP >= 1000) {
                    const gemsToAdd = Math.floor(data.XP / 1000) * 100;
                    const newGems = (data.Gems || 0) + gemsToAdd;

                    batch.update(doc.ref, { Gems: newGems });
                }
            });

            await batch.commit();
            console.log("Gems updated successfully.");
        } catch (error) {
            console.error("Error updating gems:", error);
            throw new Error("Failed to update gems.");
        }
    }
);
