import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import {
  collection,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  getDocs,
  query,
  where
} from "@firebase/firestore";
import {auth, firestore, storage} from "../../firebase/firebase";
import {Photo} from "../../types/database";
import {useAuthState} from "react-firebase-hooks/auth";
import ResponsiveImage from "./ResponsiveImage";


interface PhotoBookProps {
  additions:  DocumentSnapshot<Photo>[];
  clearQueue(): void
}

export default function PhotoBook (props: PhotoBookProps) {
  const [photos, setPhotos] = useState<DocumentSnapshot<Photo>[]>([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;
    const photosRef = collection(firestore, 'photos/') as CollectionReference<Photo>;
    const photoQuery = query(photosRef, where('createdBy', '==', user.uid))
    const res = getDocs(photoQuery);

    res.then(snapShot => {
      setPhotos(snapShot.docs);
    })
  }, [user]);

  const queueSize = props.additions.length
  useEffect(() => {
    if (props.additions.length > 0) {
      setPhotos([...props.additions, ...photos]);
      props.clearQueue();
    }
  }, [queueSize]);

  const handelRemove = (ref: DocumentReference<Photo>) => {
    setPhotos(photos.filter(item => item.ref.id !== ref.id))
  }

  return <Grid container columns={{xs: 9, md: 12, lg: 15, xl: 18}} sx={{p: 1}} spacing={{xs: 0, sm: 1}}>
    {photos.length > 0 && photos.map<JSX.Element>(item => (
      <Grid item key={item.id} xs={3} md={3} lg={3} xl={3} sx={{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ResponsiveImage snapshot={item} onDeleted={handelRemove}/>
      </Grid>
    ))}
  </Grid>
}