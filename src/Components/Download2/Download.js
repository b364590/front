import React, { useState } from 'react';
import downloadstyle from "./Download.module.css";
import axios from 'axios';
import { NavLink, useLocation } from 'react-router-dom';
import background from "../../image/instai_icon.png"
import background2 from "../../image/iconnew.png"

import {
  Card,
  Button,
  Navbar,
  Container,
  Row,
  Col,
  Nav,
  Form,
  Alert,

} from "react-bootstrap";

function Download2() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [username, setUsername] = useState("");
  const [filename, setFilename] = useState("");
  const type = searchParams.get('type');
  const userid = searchParams.get('userid');
  const projectName = searchParams.get('projectName');

  // 文件選擇
  const handleFileSelect = async (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    // 過濾文件
    const allowedFileTypes = ['image/jpeg', 'image/png'];
    const filteredFiles = fileArray.filter((file) =>
      allowedFileTypes.includes(file.type)
    );

    const fileNames = filteredFiles.map((file) => file.name);

    setFilename(fileNames);
    setSelectedFiles(filteredFiles);

    try {
      console.log('发送请求到URL:', 'http://localhost:8080/api/upload/download');

      const formData = new FormData();
      for (let i = 0; i < files.length; ++i) {
        formData.append('file', files[i]);
      }

      axios
        .post(
          `/upload/upload?filename=${fileNames}&username=${username}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        .then((response) => {
          console.log(response.data);
          alert('upload success');
        })
        .catch((error) => {
          console.error(error);
          console.error('文件上傳失敗');
        });
    } catch (error) {
      console.error('发生错误:', error);
    }

    const previews = filteredFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
    console.log("imagePreviews:",imagePreviews);
    console.log("previews:",previews);
  };


  // 文件下載 //modified
  const handleDownload = (file) => {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([file]));
    a.setAttribute("download", file.name);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 處理刪除單一圖片
  const handleDeleteImage = async (index) => {
    const filenameToDelete = selectedFiles[index].name;

    try {
      // 调用后端接口删除照片
      const response = await axios.delete(`/upload/delete/?filename=${filenameToDelete}`);
      console.log(response.data);
      alert('照片删除成功');
    }
    catch (error) {
      console.error(error);
      console.log("__dirname:", __dirname);
      console.log("username:", username);
      console.log("filenameToDelete:", filenameToDelete);
      alert('照片删除失败');
    }

    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...imagePreviews];

    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setSelectedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  // 刪除預覽
  const handleDeleteAllPreviews = () => {
    setImagePreviews([]);
    setSelectedFiles([]);
  };

  // 下載預覽 //modified
  const handleDownloadAll = () => {
    selectedFiles.forEach((file) => {
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(new Blob([file]));
      console.log(a.href)
      a.setAttribute("download", file.name);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  return (
    <div className={downloadstyle.container}>

      <Nav className="justify-content-between align-items-center" style={{ boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)' }} activeKey="/home">
        <Nav.Item>
          <Nav.Link href="#">
            <img
              alt=""
              src={background}
              width="70"
              height="70"
              className="d-inline-block align-top"
            />{' '}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item >
          <Nav.Link href="/Project">
            <Button variant="outline-danger"  >Back to Step page</Button>{' '}
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className={downloadstyle.body}>
        <legend>Upload/Download</legend>
        <form>
          <label>
            <input type="file" accept="image/*" multiple name="images" onChange={handleFileSelect} />
            <Button variant="dark" onClick={handleDeleteAllPreviews}>Remove all</Button>
            <Button variant="dark" onClick={handleDownloadAll}>Download All</Button>
            <NavLink to={`/Step?id=${type ? id : userid}&project=${projectName}`}><Button variant="dark">Done</Button></NavLink>
          </label>
        </form>
      </div>
      <div className="preview">
        {imagePreviews.map((preview, index) => (
          <span key={index} className="preview">
            <img
              src={preview}
              alt={`image ${index}`}
              style={{ width: '250px', height: '300px' }}
            />
            <Button variant="dark" onClick={() => handleDeleteImage(index)}>刪除</Button>
            <Button variant="dark" onClick={() => handleDownload(selectedFiles[index])}>Download</Button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Download2;

