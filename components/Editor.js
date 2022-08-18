import React, { useEffect, useRef } from "react";
import usePageLoader from "../hooks/usePageLoader";

function Editor({ onChange, editorLoaded, name, value, editorDefault }) {
  const editorRef = useRef();
  const { CKEditor, MyEditor } = editorRef.current || {};
  const [loader, showLoader, hideLoader] = usePageLoader();

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          resolve({
            url: "https://tinhtebeauty.com/wp-content/uploads/2021/04/22-69.jpg",
          });
          //   const body = new FormData();
          //   loader.file.then((file) => {
          //     body.append("files", file);
          //     // onUpload(file);
          //     console.log(file);
          //   });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      MyEditor: require("custom-editor"),
    };
  }, []);

  return (
    <div>
      {loader}
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={MyEditor}
          config={{
            extraPlugins: [uploadPlugin],
          }}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            // console.log({ event, editor, data })
            onChange(data);
          }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            // editor?.editing.view.change((writer) => {
            //   writer.setStyle(
            //     "height",
            //     "600px",
            //     editor.editing.view.document.getRoot()
            //   );
            // });
            editorDefault(editor);
          }}
        />
      ) : (
        <div className="loading">
          <img src="/img/load-image.gif" alt="Loading..." />
        </div>
      )}
    </div>
  );
}

export default Editor;
