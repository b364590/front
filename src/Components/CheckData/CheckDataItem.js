import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from 'axios';


const CheckDataItem = ({ fileNames ,filePath, deleteData }) => {
  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  // const deleteItem = () => {
  //   // 在此處加入呼叫後端刪除的邏輯
  //   console.log('Delete ID：', id);
  //   axios.delete(`/DeleteItem/${id}`)//路徑要改一下
  //   deleteData((prev) => {
  //     alert("Delete Success!");
  //     return prev.filter((item) => item.id !== id);
  //   });
  // };
  const fileName = filePath.split('\\').pop(); // 使用 split 和 pop
  var queryString = window.location.search;
  var params = new URLSearchParams(queryString);
  var id = params.get('id');
  var folder_name = params.get('folder_name');

  const deleteItem = async () => {
    try {
      // 在此处加入调用后端删除的逻辑
      console.log('Delete filePath:', filePath);
      // 这里调用删除接口，示例：await axios.delete(`/api/delete-item?filePath=${encodeURIComponent(filePath)}`);
      axios.delete(`/DeleteItem/${folder_name}/${fileName}`)//路徑要改一下
      deleteData((prev) => {
        alert("Delete Success!");
        return prev.filter((item) => item.split('\\').pop() !== fileName);
      });
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
  useEffect(() => {

  }, []);
//   useEffect(() => {
//     console.log("project_data:", project_data)
//     // const url = URL.createObjectURL(new Blob([project_data], { type: 'image/jpeg' }));
//     const uint8Array = new Uint8Array(project_data);
//     console.log("uint8Array:",uint8Array);
//     const blob = new Blob([uint8Array], { type: "image/jpeg" } );
//     console.log("blob:",blob);
//     console.log("blob type:", blob.type);
//     const url = URL.createObjectURL(blob);
//     setImageUrl(url);
//     console.log("url:", url)
//   }, [project_data]);

//   if (!imageUrl) {
//     return null; // 或者你可以返回一個佔位符或加載中的狀態
// }
  
  if (!show) {
    return (
      <>
        <Card style={{ width: '16rem', margin: '15px' }}>
          <Card.Img variant="top" src={filePath} alt={`image ${fileName}`} style={{ width: '14rem' }} />
          <Card.Body>
            <Button variant="danger" onClick={deleteItem}>
              Delete
            </Button>
            {/* <Button variant="dark" onClick={() => handleDownload(photo_data)}>
              Download
            </Button> */}
          </Card.Body>
        </Card>
      </>
    );
  }
};

export default CheckDataItem;
