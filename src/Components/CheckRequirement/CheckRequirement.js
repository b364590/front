import React, { useEffect, useState, Fragment } from "react";
import basestyle from "../Base.module.css";
// import registerstyle from "./Register.module.css";
import { useNavigate, NavLink, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Requirementstyle from "./CheckRequirement.module.css";
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


const Requirement = ({ add }) => {
  
  const navigate = useNavigate();
  const [data, setData] = useState({
    question1: "",
    answer1: "",
    question2: "",
    answer2: "",
  });//問題答案資料

  const [inform, setInform] = useState({
    data: "",//問題答案檔案
    uploadtime: "",
    folder_name: "",
    Username: "",
  });//使用者資料

  const [formerror, setFormerror] = useState({});//儲存錯誤資訊
  const [isSubmit, setIsSubmit] = useState(false);
  const Username = localStorage.getItem('token').slice(7);
  // 獲取整個查詢字串
  var queryString = window.location.search;
  // 解析查詢字串為鍵值對的物件
  var params = new URLSearchParams(queryString);
  var id2 = params.get('id');
  var folder_name2 = params.get('folder_name');

  useEffect(() => {
    axios.get(`/RequirementJson/${folder_name2}`)
      .then(response => {
        console.log("response:",response.data);
          setData(response.data)
        })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); //get .json檔案裡面的東西

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };//存input資料

  const errorDetect = (values) => {
    const errors = {};
    if (!values.answer1) {
      errors.answer1 = "Answer is required";
    }
    if (!values.answer2) {
      errors.answer2 = "Answer is required";
    }
    return errors
  }

  const Submituser = (e) => {
    e.preventDefault();//停止事件的默認動作
    setFormerror(errorDetect(data));//判斷input裡的資料有沒有錯誤
    setIsSubmit(true);

    const Datee = new Date();
    inform.uploadtime = Datee.getTime();
    inform.folder_name = folder_name2;
    inform.Username = Username;
    console.log('Detect:', data);
    console.log('Detect:', inform);

  };//判斷格式是否有錯誤



  useEffect(() => {
    if (Object.keys(formerror).length === 0 && isSubmit) {
      if (confirm('Confirm your requirement')) {
        console.log("Yes")
        axios.post("/Requirement", { data, inform},{ headers: { "Content-Type": "application/json" } }).then((response) => {
        })
          .then((response) => {
            console.log("response.data:", response.data);
          })
          .catch((error) => {
            console.error(error);
            console.error("error:", '文件上傳失敗');
          });
        localStorage.setItem('Check your Requirement',true); 
        navigate(`/Steppage?id=${id2}&folder_name=${folder_name2}`)// 用戶按下確定
      } else {
        console.log("wait")// 用戶按下取消
      }
    }
  }, [formerror, isSubmit])//如果無錯誤資訊，資料會存到資料庫裡並且連至sign in

  return (
    <div className={Requirementstyle.container}>

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
          <Nav.Link href={`/Steppage?id=${id2}&folder_name=${folder_name2}`}>
            <Button variant="outline-danger" >Back to Steppage</Button>{' '}
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* 建立專案 */}
      <div className={Requirementstyle.body}>
        <legend>Requirement</legend>
        <form>
          <label>
            Q1：
            <p className={Requirementstyle.question} id="question1" >
              {data.question1}
            </p>
            <Form.Control
              type="text"
              name="answer1"
              id="answer1"
              className="me-2"
              defaultValue={data.answer1}
              onChange={handleChange}
            />
            <p className={basestyle.error}>{formerror.answer1}</p>
          </label>
        </form>
        <form>
          <label>
            Q2：
            <p className={Requirementstyle.question} id="question2">
              {data.question2}
            </p>
            <Form.Control
              type="text"
              name="answer2"
              id="answer2"
              className="me-2"
              defaultValue={data.answer2}
              onChange={handleChange}
            />
            <p className={basestyle.error}>{formerror.answer2}</p>
          </label>
        </form>
        <Nav.Link className="d-grid gap-2">
          <Button onClick={Submituser} variant="dark" size="lg" >Submit</Button>{' '}
        </Nav.Link>
      </div>

    </div>
  );
};

export default Requirement;
