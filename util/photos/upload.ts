import {firestore, storage} from "../../firebase/firebase";
import {ref, uploadBytes} from "@firebase/storage";
import {uuidv4} from "@firebase/util";
import { auth } from '../../firebase/firebase'
import {addDoc, collection, CollectionReference, serverTimestamp} from "@firebase/firestore";
import {Photo} from "../../types/database";

export default async function UploadPhoto(file: Blob | File) : Promise<{ref: string}> {
  const user = auth.currentUser;

  if (!user) throw new Error('NO USER A')

  const newName = uuidv4();
  const fileRef = ref(storage, '/photos/' + newName);
  uploadBytes(fileRef, file)
    .then(snapshot => {
      const userPhotos = collection(firestore, 'photos') as CollectionReference<Photo>;
      addDoc(userPhotos, {
        name: file.name,
        location: 'photos/' + newName,
        createdBy: user.uid,
        type: 'web',
        isPublic: false,
        createdAt: serverTimestamp()
      })
    })
  return {
    ref: newName
  };
}