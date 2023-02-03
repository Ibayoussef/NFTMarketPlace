import Editor from "./Editor";
import PinataForm from "./PinataForm";
import Progress from "./Progress";
import { useState } from "react";
function ImageEditor() {
  const [active, setActive] = useState("first");
  return (
    <>
      <Progress active={active} />
      {active === "first" && <Editor setActive={setActive} />}
      {active === "second" && <PinataForm />}
    </>
  );
}

export default ImageEditor;
