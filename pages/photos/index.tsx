import Layout from "../../components/layout/Layout";
import MicroNav from '../../components/photos/MicroNav'
import PhotoBook from "../../components/photos/PhotoBook";
import DropBox from "../../components/photos/DropBox";
import UploadPhoto from "../../util/photos/upload";

export default function Photos() {

  const handleUpload = async (files: File | FileList) => {
    if (files instanceof FileList)
      for (let i = 0; i < files.length; i++) {
        await UploadPhoto(files[i]);
      }
    else await UploadPhoto(files);
  };

  return <Layout>
    <DropBox onUpload={handleUpload}>
      <MicroNav onUpload={handleUpload} />
      <PhotoBook />
    </DropBox>
  </Layout>
}