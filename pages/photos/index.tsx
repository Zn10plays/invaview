import Box from "@mui/material/Box";
import Layout from "../../components/layout/Layout";
import {useEffect, useState} from "react";
import {Photo} from "../../types/database";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, firestore} from "../../firebase/firebase";
import {collection, CollectionReference, getDocs, query, where} from "@firebase/firestore";
import styles from '../../styles/Photos.module.css'
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function Photos() {
  const [photos, setPhotos] = useState<Photo[]|undefined>(undefined);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;
    const photosRef = collection(firestore, 'photos/') as CollectionReference<Photo>;
    const photoQuery = query(photosRef, where('createdBy', '==', user.uid))
    const res = getDocs(photoQuery);
    res.then(snapShot => {
      setPhotos(snapShot.docs.map(photo => photo.data()));
    })
  }, [user])

  return <Layout>
    <ImageList cols={3} rowHeight={164}>
      {photos != undefined && photos.map<JSX.Element>(item => (
        <ImageListItem key={item.name}> <img src={item.location} alt={item.name} className={styles.trackImages}/> </ImageListItem >
      ))}
    </ImageList>
  </Layout>
}