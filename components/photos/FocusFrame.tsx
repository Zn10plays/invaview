import {arrayRemove, DocumentSnapshot, Timestamp, updateDoc} from "@firebase/firestore";
import {Photo, Short} from "../../types/database";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from '@mui/material/ListItem'
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import {useDocumentData} from "react-firebase-hooks/firestore";
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import Switch from "@mui/material/Switch";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from '@mui/material/ListItemIcon'
import { arrayUnion } from 'firebase/firestore'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Layout = styled(Paper) (({theme}) => ( {
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}))

interface FocusFrameProps {
  image?: string;
  snapshot?: DocumentSnapshot<Photo>;
  open: boolean;
  onClose: () => void
}

export default function FocusFrame(props: FocusFrameProps) : JSX.Element {
  const [value, loading, error, snapshot] = useDocumentData<Photo>(props.snapshot?.ref);

  const handeClose = () => {
    props.onClose();
  }

  const craftId = (): string => (Math.random() + 1).toString(36).substring(7);

  const handeAdd = () => {
    if (!props.snapshot?.ref) return;
    updateDoc(props.snapshot.ref, {
      shorts: arrayUnion({
        isActive: true,
        id: craftId(),
        createdAt: Timestamp.now(),
        variant: 'Temporary',
        expiresAt: Timestamp.fromMillis(Date.now() + 1000 * 60 * 60 * 24 * 7)
      } as Short)
    })
  }

  const handeDelete = async (id: string) => {
    if (!props.snapshot?.ref || !props.snapshot.data()) return;
    await updateDoc(props.snapshot.ref,  {
      shorts: snapshot?.data()?.shorts.filter(item => item.id !== id)
    })
  }

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText('https://invadev.net/image/'+id);
  }

  const handleToggleActivate = async (id: string) => {
    if (!props.snapshot?.ref || !props.snapshot.data()) return;
    await updateDoc(props.snapshot.ref,  {
      shorts: snapshot?.data()?.shorts.map(item => {
        if (item.id !== id) return item;
        item.isActive = !item.isActive;
        return item;
      })
    })
  }

  return <Modal open={props.open} onClose={handeClose}>
    <Paper sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} >
      <Layout>
        <Box sx={{flex: '1 1', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3}}>
          <img src={props.image} alt="IMAGE" style={{width: '100%', height: '100%'}}/>
        </Box>
        <Box sx={{flex: '1 1', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <List sx={{mr: 3, mt: 3, width: '100%', maxHeight: 400, overflowY: 'auto'}} subheader={<ListSubheader sx={{display: 'flex'}}>
            Short Links
            <span style={{flex: '1 1'}}/>
            <Box>
              <IconButton sx={{alignSelf: 'end'}} onClick={handeAdd}>
                <AddIcon/>
              </IconButton>
            </Box>
          </ListSubheader>}>
            {value?.shorts && value.shorts.map(short => (<ListItem key={short.id}>
              <ListItemIcon> {short.isActive ? <LinkIcon/> : <LinkOffIcon/>} </ListItemIcon>
              <ListItemText primary={short.id} />
                <IconButton>
                  <DeleteIcon onClick={() => handeDelete(short.id)}/>
                </IconButton>
                <IconButton onClick={() => handleCopy(short.id)}>
                  <ContentCopyIcon/>
                </IconButton>
              <Switch checked={short.isActive} onChange={() => handleToggleActivate(short.id)} />
            </ListItem>)
            )}
          </List>
        </Box>
      </Layout>
    </Paper>
  </Modal>
}