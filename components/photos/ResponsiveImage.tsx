import {styled} from "@mui/material/styles";
import {Photo} from "../../types/database";
import {useDownloadURL} from "react-firebase-hooks/storage";
import {deleteObject, getBlob, ref} from "@firebase/storage";
import {storage} from "../../firebase/firebase";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from '@mui/icons-material/Download'
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import {deleteDoc, DocumentReference} from "@firebase/firestore";

const Image = styled('img') (({theme}) => ({
  objectFit: 'cover',
  objectPosition: 'center',
  overflow: 'hidden',
  height: '100%',
  width: '100%'
}))

interface ResponsiveImageProps {
  doc: Photo,
  onDeleted: (id: DocumentReference<Photo>) => void
}

export default function ResponsiveImage (props: ResponsiveImageProps) {
  const imageRef = ref(storage, props.doc.location)
  const [downloadUrl, loading, error] = useDownloadURL(imageRef);

  const handleShare = () => {};

  const handelDelete = () => {
    if (!props.doc.ref) return;
    deleteDoc(props.doc.ref);
    deleteObject(imageRef);
    props.onDeleted(props.doc.ref);
  }

  const handleDownload = async () => {
    const a = document.createElement('a');

    a.download = 'file';
    a.href = URL.createObjectURL(await getBlob(imageRef));
    a.addEventListener('click', (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  }

  return <>
    {loading && <Skeleton sx={{height: '100%', width: '100%', minHeight: '126px'}} />}
    {!loading && <Paper sx={{height: 1, position: 'relative'}} variant={'outlined'}>
      <Image src={downloadUrl} alt={props.doc.name} />
      <Box sx={{position: 'absolute', top: 0, right: 0}}>
        <IconButton onClick={handelDelete}>
          <DeleteIcon fontSize={'small'} />
        </IconButton>
      </Box>
      <Paper
        sx={{position: 'absolute',
          bottom: 0,
          textAlign: 'right',
          width: '100%',
          background: 'linear-gradient(transparent, black)'
        }}>
        <Tooltip title={'Download'}>
          <IconButton onClick={handleDownload}>
            <DownloadIcon fontSize={'small'} />
          </IconButton>
        </Tooltip>
        <Tooltip title={'Copy Link'}>
          <IconButton>
            <ShareIcon fontSize={'small'} />
          </IconButton>
        </Tooltip>
      </Paper>
    </Paper>}
  </>
}