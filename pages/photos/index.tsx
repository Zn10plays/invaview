import Layout from "../../components/layout/Layout";
import MicroNav from '../../components/photos/MicroNav'
import PhotoBook from "../../components/photos/PhotoBook";
import DropBox from "../../components/photos/DropBox";
import UploadPhoto from "../../util/photos/upload";
import {useState} from "react";
import {Photo} from "../../types/database";

export default function Photos() {

  const [additions, setAdditions] = useState<Photo[]>([]);

  const handleUpload = async (files: File | FileList) => {
    if (files instanceof FileList)
      for (let i = 0; i < files.length; i++) {
        await UploadPhoto(files[i])
          .then(data => addToQueue(data));
      }
    else await UploadPhoto(files)
      .then(data => addToQueue(data));
  };

  const addToQueue = (data: Photo | undefined) => {
    if (!data) return;
    setAdditions([...additions, ...[data]])
  }

  const emptyQueue = () => {
    setAdditions([]);
  };

  return <Layout>
    <DropBox onUpload={handleUpload}>
      <MicroNav onUpload={handleUpload} />
      <PhotoBook additions={additions} clearQueue={emptyQueue} />
    </DropBox>
  </Layout>
}