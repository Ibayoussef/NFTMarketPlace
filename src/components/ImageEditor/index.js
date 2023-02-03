import Editor from "./Editor";
import Progress from "./Progress";
function ImageEditor() {
  return (
    <>
      <Progress active={"first"} />
      <Editor />
    </>
  );
}

export default ImageEditor;
