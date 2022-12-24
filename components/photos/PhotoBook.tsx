import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import {collection, CollectionReference, DocumentReference, getDocs, query, where} from "@firebase/firestore";
import {auth, firestore, storage} from "../../firebase/firebase";
import {Photo} from "../../types/database";
import {useAuthState} from "react-firebase-hooks/auth";
import ResponsiveImage from "./ResponsiveImage";


interface PhotoBookProps {
  additions: Photo[];
  clearQueue(): void
}

export default function PhotoBook (props: PhotoBookProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;
    const photosRef = collection(firestore, 'photos/') as CollectionReference<Photo>;
    const photoQuery = query(photosRef, where('createdBy', '==', user.uid))
    const res = getDocs(photoQuery);

    res.then(snapShot => {
      setPhotos(snapShot.docs.map(photo => {
        const data = photo.data();
        console.log(photo.ref);
        data.ref = photo.ref;
        return data;
      }));
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
      <Grid item key={item.name} xs={3} md={3} lg={3} xl={3} sx={{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ResponsiveImage doc={item} onDeleted={handelRemove}/>
      </Grid>
    ))}
  </Grid>
}