import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from 'axios';
import exPhoto from "../../image/pikachu.jpg"

const TrainingItem = () => {

  const handleDownload = (file) => {
    const a = document.createElement('a');
    a.href = file//window.URL.createObjectURL(new Blob([exPhoto], { type: "image/jpeg" }));
    a.setAttribute("download",file.name);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    let a; // 宣告 a 變數
    // 清理 Blob 物件
    return () => {
      URL.revokeObjectURL(a.href);
    };
  }, []); // 這裡使用空的依賴陣列，確保只執行一次

    return (
      <>
        <Card style={{ width: '25rem', margin: '24px' }}>
          <Card.Img variant="top" src={exPhoto} style={{ width: '23rem' }} />
          <Card.Body>
            <Button variant="dark" onClick={() => handleDownload(exPhoto)}>
              Download
            </Button>
          </Card.Body>
        </Card>
      </>
    );
};

export default TrainingItem;
