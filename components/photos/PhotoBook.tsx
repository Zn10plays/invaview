import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import {collection, CollectionReference, DocumentReference, getDocs, query, where} from "@firebase/firestore";
import {auth, firestore, storage} from "../../firebase/firebase";
import {Photo} from "../../types/database";
import {useAuthState} from "react-firebase-hooks/auth";
import {ref} from "@firebase/storage";
import Skeleton from "@mui/material/Skeleton";
import {useDownloadURL} from "react-firebase-hooks/storage";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Image = styled('img') (({theme}) => ({
  objectFit: 'cover',
  objectPosition: 'center',
  overflow: 'hidden',
  height: '100%',
  width: '100%'
}))

interface ResponsiveImageProps {
  doc: Photo,
}

function ResponsiveImage (props: ResponsiveImageProps) {
  const [downloadUrl, loading, error] = useDownloadURL(ref(storage, props.doc.location));
  const loading1 = true
  return <>
    {loading && <Skeleton sx={{height: '100%', width: '100%', minHeight: '126px'}} />}
    {!loading && <Paper sx={{height: 1}} variant={'outlined'}>
      <Image src={downloadUrl} alt={props.doc.name} />
    </Paper>}
  </>
}

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
      setPhotos(snapShot.docs.map(photo => photo.data()));
    })
  }, [user]);

  const queueSize = props.additions.length
  useEffect(() => {
    if (props.additions.length > 0) {
      setPhotos([...props.additions, ...photos]);
      props.clearQueue();
    }
  }, [queueSize]);

  return <Grid container columns={{xs: 9, md: 12, lg: 15, xl: 18}} sx={{p: 1}} spacing={{xs: 0, sm: 1}}>
    {photos.length > 0 && photos.map<JSX.Element>(item => (
      <Grid item key={item.name} xs={3} md={3} lg={3} xl={3} sx={{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ResponsiveImage doc={item} />
      </Grid>
    ))}
  </Grid>
}