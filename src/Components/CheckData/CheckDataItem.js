import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

const CheckDataItem = ({ id, photo_data, deleteData }) => {
  const [show, setShow] = useState(false);

  const deleteItem = () => {
    deleteData((prev) => {
      alert("Delete Success!");
      return prev.filter((item) => item.id !== id);
    });
  };

  // const deleteItem = () => {
  //   // 在此處加入呼叫後端刪除的邏輯
  //   axios.delete(`/Download2/deleteItem/${id}`)//路徑要改一下
  //     .then((response) => {
  //       // 成功後，再更新前端的狀態
  //       deleteData((prev) => {
  //         alert("Delete Success!");
  //         return prev.filter((item) => item.id !== id);
  //       });
  //     })
  //     .catch((error) => {
  //       console.error('Error deleting item:', error);
  //       // 在此處處理錯誤，例如顯示錯誤訊息
  //     });
  // };

  // console.log("Item - folder_name:", folder_name); // Log the folder_name for debugging

  if (!show) {
    return (
      <>
        <Card style={{ width: '16rem', margin: '15px' }}>
          <Card.Img variant="top" src={photo_data} style={{ width: '14rem' }}/>
          <Card.Body>
            <Button variant="danger" onClick={deleteItem}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
};

export default CheckDataItem;
