import axios from "axios";
import { useMemo } from "react";
import AwsS3 from "@uppy/aws-s3";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import StatusBar from "@uppy/status-bar";
import Informer from "@uppy/informer";
import "@uppy/image-editor/dist/style.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/status-bar/dist/style.min.css";
import "@uppy/informer/dist/style.min.css";

import Compressor from "@uppy/compressor";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../../Soursre";

// const renameFileName = (extension) => {
//   return `${uuidv4}-${Date.now()}.${extension}`;
// };
// console.log(uuid());

const ImageUploader = ({ formikProps }) => {
  // const { setprofileImage } = useContext(MainContext);
  const uppy = useMemo(() => {
    const uppy = new Uppy({
      autoProceed: true,
      restrictions: {
        maxFileSize: 1000000, // 1MB
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/jpeg"],
      },
    })
      .use(StatusBar)
      .use(Informer)
      .use(Compressor)
      .use(AwsS3, {
        id: "AwsS3",
        getUploadParameters: (file) => getUploadParameters(file),
      });
    return uppy;
  }, []);

  uppy.on("complete", (result) => {
    console.log(result);
    // tutors /
    // setprofileImage(`tutors/${result?.successful[0]?.meta?.name}`)


    // result?.successful[0]?.meta?.name
    formikProps.setFieldValue(
      "profileImage",
      `center-users/${result?.successful[0]?.meta?.name}`
    );
  });
  // uppy.on('upload-error', (file, error, response) => {
  // 	console.error('Upload error:', error, response);
  // });

  // uppy.on('error', (error) => {
  // 	console.error('Uppy error:', error);
  // });

  async function getUploadParameters(file) {
    file.extension = file.extension.toLowerCase();
    const newFileName = `${uuidv4()}-${Date.now()}.${file.extension}`;
    file.name = newFileName;
    file.data.name = newFileName;
    file.meta.name = newFileName;

    const { data, status } = await axios.post(`${BASE_URL}upload/images`, {
      fileName: file.name,
      contentType: file.type,
      vendor: "center-users",
    });
    if (status !== 200) throw new Error("Upload failed");

    const object = {
      method: data.method,
      url: data.url,
      fields: {},
      headers: {
        "Content-Type": file.type ? file.type : "application/octet-stream",
      },
    };
    return object;
  }
  return (
    <div className="w-full max-h-[300px] overflow-scroll scrollbar-thin">
      <Dashboard
        // style={{ width: '100%' }}
        uppy={uppy}
        proudlyDisplayPoweredByUppy={false}
      />
    </div>
  );
};
export default ImageUploader;
