import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useToast } from './use-toast';

export function useSchoolUpdate() {
  const { toast } = useToast();

  const updateSchool = async (email: string, school: string) => {
    try {
      const usersQuery = query(
        collection(db, 'users'),
        where('email', '==', email)
      );
      const querySnapshot = await getDocs(usersQuery);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        await updateDoc(userDoc.ref, { school });
        toast({
          title: "School Updated",
          description: `Your school has been set to ${school}`,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating school:', error);
      toast({
        title: "Error",
        description: "Failed to update school. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  return { updateSchool };
}