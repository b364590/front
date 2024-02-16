import React, { useState, useEffect } from 'react';
import downloadstyle from "./Download.module.css";
import axios from 'axios';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
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
import { name } from 'xml-name-validator';

function Download2() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [prevdata, setPrevdata] = useState([]);
  const [data2, setData2] = useState([]);
  const [username, setUsername] = useState("");
  const [filename, setFilename] = useState("");
  const type = searchParams.get('type');
  const userid = searchParams.get('userid');
  const projectName = searchParams.get('projectName');
  const Username = localStorage.getItem('token').slice(7)
  // 獲取整個查詢字串
  var queryString = window.location.search;
  // 解析查詢字串為鍵值對的物件
  var params = new URLSearchParams(queryString);
  var id2 = params.get('id');
  var folder_name = params.get('folder_name');
  

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

    const previews = filteredFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
    console.log("imagePreviews:", imagePreviews);
    console.log("previews:", previews);

    const a = localStorage.getItem("token");
    const Datee = new Date();
    const searchParams = new URLSearchParams(window.location.search);
    const folderName = searchParams.get('folder_name');// 使用get方法獲取folder_name參數的值

    const data = {
      user : a.slice(7),
      folder : folderName,
      project_name : fileNames,
      project_data : previews,
      upload_time : Datee.getTime(),
    }
      setPrevdata((prevList) => [...prevList, data]);

    // console.log("prevdata:", data);

      // console.log('发送请求到URL:', 'http://localhost:8080/api/upload/download');

      const formData = new FormData();
      console.log("formData:", formData);
      for (let i = 0; i < files.length; ++i) {
        formData.append('file', files[i]);
      }
      console.log("formData2:", formData);
  };

  const SendtoDatabase = () => {
    for (let i = 0; i < prevdata.length; ++i) {
      if (prevdata && prevdata.length > 0 && prevdata[0] !== undefined) {
        console.log(`I ${i} :`,prevdata[i])
        
        axios.post(`/upload`, { data: prevdata[i] } ,{ headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
          console.log("response.data:", response.data);
        })
        .catch((error) => {
          console.error(error);
          console.error("error:", '文件上傳失敗');
        });
        // 處理未定義的情況
      } else {
        console.log("undifined")
      }
    }
        alert("ok");
        const Username = localStorage.getItem('token').slice(7)
        navigate(`/Steppage?id=${id2}&folder_name=${folder_name}`);
  }

  // console.log("data:", data);
  console.log("prevdata:", prevdata);//存多筆圖片資料


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
      console.log("response.data:", response.data);
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
          <Nav.Link href={`/Steppage?id=${id2}&folder_name=${folder_name}`}>
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
            <Button variant="dark" onClick={SendtoDatabase}>Done</Button>
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

