import React, { FC, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
const toolbarOptions = [
  ["link", "image", "video"],
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
];

// 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "background",
  "color",
  "link",
  "image",
  "video",
  "width",
];

const modules = {
  toolbar: {
    container: toolbarOptions,
  },
};
interface CustomEditorProps {
  placeholder?: string;
  value?: string;
}

const CustomEditor: FC<CustomEditorProps> = ({
  placeholder,
  value,
  ...rest
}) => {
  useEffect(() => {
    console.log("value", value);
  }, [value]);

  return (
    <div>
      <div id="toolBar">{/*<ReactModule/>*/}</div>
      <ReactQuill
        {...rest}
        style={{ width: "100%", height: "300px" }}
        placeholder={placeholder}
        value={value || ""}
        theme="snow"
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default CustomEditor;
