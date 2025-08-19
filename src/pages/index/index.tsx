import { Uploader } from "@nutui/nutui-react";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { Plus } from "@nutui/icons-react";

const Demo1 = () => {
  const demoUrl =
    "https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif";

  const [imgUrl, setImgUrl] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");

  async function upload(file: File) {
    return new Promise<{
      url: string;
    }>((resolve) => {
      try {
        Taro.uploadFile({
          url: "http://127.0.0.1:3000/fileUpload",
          // @ts-ignore
          filePath: file.tempFilePath,
          name: "file",
          success(res) {
            console.log("@hf: uploadFile res", res);
            resolve({ url: res.data });
          },
          fail(err) {
            console.error("@hf: uploadFile err", err);
            resolve({ url: demoUrl });
          },
        });
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <>
      <p>上传图片：{imgUrl}</p>
      <Uploader
        upload={(file: File) => upload(file)}
        onChange={(files) => {
          console.log("@hf: onChange", files);
          setImgUrl(files[0]?.path || "");
        }}
      />

      <p>上传文件：{fileUrl}</p>
      <Uploader
        accept="*"
        previewType="list"
        preview={false}
        upload={async (file: File) => {
          return { url: demoUrl };
          // return upload(file);
        }}
        onChange={(files) => {
          console.log("@hf: onChange", files);
          setFileUrl(files[0]?.path || "");
        }}
        uploadIcon={<Plus />}
        style={{ marginBottom: 20 }}
      />
    </>
  );
};
export default Demo1;
