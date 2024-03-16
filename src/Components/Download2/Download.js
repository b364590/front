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
  // const [blobArray,setBlobArray] = useState([]);
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
    
    const files = new Array();
    for(let i=0; i < event.target.files.length; i++){
      files.push(event.target.files[i]);
    }
    console.log(typeof files);
    console.log(files);
    // const formData1 = new FormData();
    // for(let i=0; i < event.target.files.length; i++){
    //   formData1.append('image',  files[i]);
    //   axios.post(`/uploadphoto/${folder_name}`, formData1, { headers: { 'Content-Type': 'multipart/form-data' } })
    //       .then((response) => {
    //         console.log("response.data:", response.data);
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //         console.error("error:", '文件上傳失敗');
    //       });
    // }//photo 單一拉出來上傳

    // 過濾文件
    const allowedFileTypes = ['image/jpeg', 'image/png'];
    const filteredFiles = files.filter((file) =>
      allowedFileTypes.includes(file.type)
    );
   const fileNames = files.map((file) => file.name);

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

    const blobArray = await Promise.all(filteredFiles.map(file => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const blob = new Blob([new Uint8Array(reader.result)]);
        resolve(blob);
      };
      reader.readAsArrayBuffer(file);
    })));

    console.log("blobArray:", blobArray);

    const data = {
      user: a.slice(7),
      folder: folderName,
      project_name: fileNames,
      project_data: files,
      upload_time: Datee.getTime(),
    }
    setPrevdata((prevList) => [...prevList, data]);
    const formData = new FormData();
    console.log("formData:", formData);
    for (let i = 0; i < files.length; ++i) {
      formData.append('file', files[i]);
    }
    console.log("formData2:", formData);
  };

  const SendtoDatabase = () => {
    for (let i = 0; i < prevdata.length; ++i) {
      if (prevdata && prevdata.length > 0 && prevdata[0].project_data !== undefined) {
        console.log(`I ${i} :`,typeof prevdata[i].project_data[0])
        // const formData = new FormData();
        // formData.append('image',  prevdata[i].project_data);
        // axios.post(`/upload`, { data: prevdata[i] }, { headers: { 'Content-Type': 'application/json' } })
        //   .then((response) => {
        //     console.log("response.data:", response.data);
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //     console.error("error:", '文件上傳失敗');
        //   });
        const formData1 = new FormData();
        formData1.append('image', prevdata[i].project_data[0]);
        axios.post(`/upload/?user=${prevdata[i].user}&project_name=${prevdata[i].project_name[0]}&folder=${prevdata[i].folder}&upload_time=${prevdata[i].upload_time}`, 
        formData1, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
              console.log("response.data:", response.data);
            })
            .catch((error) => {
              console.error(error);
              console.error("error:", '文件上傳失敗');
            });
      //photo 單一拉出來上傳
        // 處理未定義的情況
      } else {
        console.log("undefine")
      }
    }
    alert("ok");
    const Username = localStorage.getItem('token').slice(7)
    localStorage.setItem('Upload', true);
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

