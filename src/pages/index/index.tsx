import {
  Uploader,
  Cell,
  Space,
} from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";

const Demo1 = () => {
  const demoUrl =
    "https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif";

  async function upload(file: File) {
    return new Promise<{
      url: string;
    }>((resolve) => {
      Taro.uploadFile({
        url: 'http://127.0.0.1:3000/fileUpload',
        // @ts-ignore
        filePath: file.tempFilePath,
        name: 'file',
        success (res){
          console.log("@hf: uploadFile res", res);
          resolve({ url: res.data });
        },
        fail (err) {
          console.error("@hf: uploadFile err", err);
          resolve({ url: demoUrl });
        },
      })
    })
  }

  return (
    <>
      <Cell style={{ flexWrap: "wrap" }}>
        <Space wrap>
          <Uploader
            upload={(file: File) => upload(file)}
            onChange={(files) => {
              console.log("@hf: onChange", files);
            }}
          />
        </Space>
      </Cell>
    </>
  );
};
export default Demo1;
