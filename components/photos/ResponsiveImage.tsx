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
import {deleteDoc, DocumentReference, DocumentSnapshot} from "@firebase/firestore";
import {useState} from "react";

const Image = styled('img') (({theme}) => ({
  objectFit: 'cover',
  objectPosition: 'center',
  overflow: 'hidden',
  height: '100%',
  width: '100%'
}))

interface ResponsiveImageProps {
  snapshot:  DocumentSnapshot<Photo>,
  onDeleted: (id: DocumentReference<Photo>) => void
  onSelect?: (image: string, snapshot: DocumentSnapshot<Photo>) => void
}

export default function ResponsiveImage (props: ResponsiveImageProps) {
  const {snapshot} = props;
  const data = snapshot.data();

  const imageRef = ref(storage, data?.location)
  const [downloadUrl, loading, error] = useDownloadURL(imageRef);
  // const [isFocused, setIsFocused] = useState(false);

  const handleShare = () => {
    const { onSelect } = props;
    if (!onSelect || !downloadUrl) return;

    onSelect(downloadUrl, snapshot);
  };

  const handelDelete = () => {
    deleteDoc(snapshot.ref);
    deleteObject(imageRef);
    props.onDeleted(snapshot.ref);
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
      <Image src={downloadUrl} alt={data?.name} />
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
        <Tooltip title={'Share'}>
          <IconButton onClick={handleShare}>
            <ShareIcon fontSize={'small'} />
          </IconButton>
        </Tooltip>
      </Paper>
    </Paper>}
  </>
}