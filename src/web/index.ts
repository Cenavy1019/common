/*
 * @Desc: web/utils
 * @Author: hankin.dream
 * @Date: 2022-09-02 11:05:14
 */
/**
 * @description 获取树结构已选节点, 如果是父节点下子节点全选则只获取父节点
 * @param {*} store: tree.store
 * @param {*} filterRootValue: 处理自定义根节点字段, 指定过滤值
 * @returns
 */

export function getParentOrChildrenNodeWithIndeterminate(
  store: any,
  filterRootValue = "root_"
) {
  const checkedNodes: any[] = [];

  const traverse = function (node: {
    checked?: any;
    data?: any;
    indeterminate?: any;
    root?: any;
    childNodes?: any;
  }) {
    const childNodes = node.root ? node.root.childNodes : node.childNodes;

    childNodes.forEach(
      (child: { checked?: any; data?: any; indeterminate?: any }) => {
        if (child.checked) {
          if (child.data.id.includes(filterRootValue)) {
            traverse(child);
          } else {
            checkedNodes.push(child.data);
          }
        }
        if (child.indeterminate) {
          traverse(child);
        }
      }
    );
  };

  traverse(store);
  return checkedNodes;
}

/**
 * @description 附件下载
 * @param {fileUrl, fileName, fileType}
 * @returns
 * ```typescript
 * downloadFile('http://xxxx.pdf', 'pdf', '我是文件名')
 * ```
 */
export function downloadFile({
  fileUrl,
  fileType,
  fileName,
}: {
  fileUrl: string;
  fileType?: string;
  fileName?: string;
}) {
  if (!fileUrl) {
    throw new Error("param 'fileUrl' is required");
  }

  // const checkFileName = ['.pdf', '.doc', '.docx', '.xls', '.xlsx']
  const checkFileType = [
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "mp4",
    "mp3",
    "png",
    "jpeg",
    "jpg",
    "gif",
    "bmp",
    "webp",
    "tiff",
    "svg",
    "ttf",
    "eot",
  ];

  if (fileType && checkFileType.includes(fileType)) {
    return true;
  }
  fileType = fileUrl.split(".")[fileUrl.split(".").length - 1];

  if (!fileName) {
    fileName = fileUrl;
  }

  console.log("@imchen/common/downloadFile infos", {
    fileName,
    fileType,
    fileUrl,
  });

  let requestUrl = fileUrl.replace(/\\/g, "/");
  const { protocol } = window.location;
  requestUrl = `${protocol}${requestUrl.split(":")[1]}`;
  const x = new XMLHttpRequest();
  x.open("GET", requestUrl, true);
  x.setRequestHeader("Content-Type", `application/${fileType}`);
  x.responseType = "blob";
  x.onload = function () {
    const downloadUrl = window.URL.createObjectURL(x.response);
    const a = document.createElement("a");
    a.download = fileName ?? "文件下载";
    a.href = downloadUrl;
    a.click();
  };
  x.send();
}
