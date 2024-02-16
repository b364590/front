import React, { useEffect, useState, Fragment } from "react";
import basestyle from "../Base.module.css";
// import registerstyle from "./Register.module.css";
import { useNavigate, NavLink, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateProjectstyle from "./CreateProject.module.css";
import axios from "axios";
import background from "../../image/instai_icon.png"
import background2 from "../../image/iconnew.png"
// import addItem from "./addItem";
import { v4 } from "uuid";
import {
  Card,
  Button,
  Navbar,
  Container,
  Row,
  Col,
  Nav,
  Form,

} from "react-bootstrap";
import { Token } from "parse5";
import { get } from "lodash";


const CreateProject = ({add}) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    user: "",
    folder_name:"",
    uploadtime: "",
  });//使用者資料
  const [formerror, setFormerror] = useState({});//儲存錯誤資訊
  const [isSubmit, setIsSubmit] = useState(false);
  const [folder_name, setFolder_name] = useState("");
  const [user, setUser] = useState([]);//存之前檔案的空陣列
  function nameChange(e) {
    const { folder_name, value } = e.target;
    setFolder_name(e.target.value);
    const Datee = new Date();
    data.uploadtime = Datee.getTime();
    setData({
      ...data,
      [folder_name]: value,
    });
  }

  // function handleChange() {
  //   add(function (prevData) {
  //     return [...prevData,
  //     {
  //       id: v4(),
  //       name,
  //     },
  //     ];
  //   });
  // };//存input資料 給予不同id確保檔案不一樣

  const errorDetect = (values) => {
    const errors = {};
    if (!values) {
      errors.name = "Name is required";
    }
    return errors
  }

  const Submituser = (e) => {
    e.preventDefault();//停止事件的默認動作
    setFormerror(errorDetect(folder_name));//判斷input裡的資料有沒有錯誤
    setIsSubmit(true);
    // console.log('Detect:', name);
    console.log('Detect:', data);

  };//判斷格式是否有錯誤



  useEffect(() => {
    if (Object.keys(formerror).length === 0 && isSubmit) {
      const a =JSON.stringify(data)
      console.log(localStorage.setItem('data',a))
      console.log(localStorage.setItem('folder_name',folder_name))
      console.log(localStorage.getItem('token'))
      data.folder_name=folder_name;
      const WCreateFolder = () => {
        
        axios.post("/WCreateFolder", { token: localStorage.getItem('token'),data },{headers:{"Content-Type":"application/json"}}).then((response) => {
        });
        axios.post("/CreateFolder", {data} ).then((response) => {
          console.log(response.data)
          const a = response.data.slice(0,7)
          console.log(a)
          alert(a)
        });
      };
      WCreateFolder()
      const Username = localStorage.getItem('token').slice(7)
      alert("Success !");
      navigate(`/Project?Username:${Username}`)
    }
  }, [formerror, isSubmit])//如果無錯誤資訊，資料會存到資料庫裡並且連至sign in

  return (
    <div className={CreateProjectstyle.container}>

      {/* 返回專案介面 */}
      <Nav className="justify-content-between" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="#">
            <img
              alt=""
              src={background}
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{' '}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item >
          <Nav.Link href="/Project">
            <Button variant="secondary" size="lg" >Back to Project Pages</Button>{' '}
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* 建立專案 */}
      <div className={CreateProjectstyle.body}>
        <legend>Create Projects</legend>
        <form>
          <label>
            Project name：
            <Form.Control
              type="text"
              name="name"
              id="name"
              className="me-2"
              values={data.folder_name}
              onChange={nameChange}
            />
            <p className={basestyle.error}>{formerror.name}</p>
          </label>
        </form>
        <Nav.Link className="d-grid gap-2">
          <Button onClick={Submituser} variant="dark" size="lg" >Add</Button>{' '}
        </Nav.Link>
      </div>

    </div>
  );
};

export default CreateProject;
