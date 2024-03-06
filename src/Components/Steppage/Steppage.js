import React, { useEffect, useState, Fragment } from "react";
import basestyle from "../Base.module.css";
import Steppagestyle from "./Steppage.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import { useNavigate, NavLink, Link } from "react-router-dom";
import background from "../../image/instai_icon.png"
import background2 from "../../image/iconnew.png"
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
  Alert,

} from "react-bootstrap";


const Steppage = () => {
  const navigate = useNavigate();
  // 獲取整個查詢字串
  var queryString = window.location.search;
  // 解析查詢字串為鍵值對的物件
  var params = new URLSearchParams(queryString);
  var id = params.get('id');
  var folder_name = params.get('folder_name');
  const [Upload, setUpload] = useState(false)
  const [Fillouttheform, setFillouttheform] = useState(false)
  const [Checkyourdata, setCheckyourdata] = useState(false)
  const [CheckyourRequirement, setCheckyourRequirement] = useState(false)
  const [Training, setTraining] = useState(true)

  useEffect(() => {
    const Upload = localStorage.getItem('Upload') === 'true'
    setUpload(Upload)
    console.log("Upload:", Upload)

    const Fillouttheform = localStorage.getItem('Fill out the form') === 'true';
    setFillouttheform(Fillouttheform)
    console.log("Fillouttheform:", Fillouttheform)

    const Checkyourdata = localStorage.getItem('Check your data') === 'true';
    setCheckyourdata(Checkyourdata)
    console.log("Checkyourdata:", Checkyourdata)

    const CheckyourRequirement = localStorage.getItem('Check your Requirement') === 'true';
    setCheckyourRequirement(CheckyourRequirement)
    console.log("CheckyourRequirement:", CheckyourRequirement)

    localStorage.setItem('Training', true);
    const Training = localStorage.getItem('Training') === 'true';
    setTraining(Training)
    console.log("Training:", Training)

    if (Upload && Fillouttheform && Checkyourdata && CheckyourRequirement) {
      localStorage.setItem('Training', false);
      const Training = localStorage.getItem('Training') === 'true';
      setTraining(Training)
      console.log("Training:", Training)
    }
  }, []);

  const reset = () => {
    localStorage.setItem('Upload', false);
    localStorage.setItem('Fill out the form', false);
    localStorage.setItem('Check your data', false);
    localStorage.setItem('Check your Requirement', false);
    localStorage.setItem('Training', true);

    const Upload = localStorage.getItem('Upload') === 'true'
    setUpload(Upload)
    console.log("Upload:", Upload)

    const Fillouttheform = localStorage.getItem('Fill out the form') === 'true';
    setFillouttheform(Fillouttheform)
    console.log("Fillouttheform:", Fillouttheform)

    const Checkyourdata = localStorage.getItem('Check your data') === 'true';
    setCheckyourdata(Checkyourdata)
    console.log("Checkyourdata:", Checkyourdata)

    const CheckyourRequirement = localStorage.getItem('Check your Requirement') === 'true';
    setCheckyourRequirement(CheckyourRequirement)
    console.log("CheckyourRequirement:", CheckyourRequirement)


  }

  const UploadComfirm = () => {
    navigate(`/Download2?id=${id}&folder_name=${folder_name}`);
  }
  const RequirementComfirm = (e) => {
    navigate(`/Requirement?id=${id}&folder_name=${folder_name}`)
  }
  const CheckUploadComfirm = (e) => {
    navigate(`/CheckData?id=${id}&folder_name=${folder_name}`)
  }
  const CheckRequirementComfirm = (e) => {
    navigate(`/CheckRequirement?id=${id}&folder_name=${folder_name}`)
  }
  const TrainingComfirm = (e) => {
    navigate(`/Training?id=${id}&folder_name=${folder_name}`)
  }

  return (
    <div className={Steppagestyle.container}>
      {/* 登出介面 */}
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
        <Nav.Item>
          <Nav.Link href="#">
            <img
              alt=""
              src={background2}
              height="70"
              className="d-inline-block align-top"
            />{' '}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item >
          <Nav.Link href="/Project">
            <Button variant="outline-danger">All Project</Button>{' '}
          </Nav.Link>
        </Nav.Item>
        {/* <Nav.Item >
          <Button variant="outline-danger" onClick={reset}>reset</Button>{' '}
        </Nav.Item> */}
      </Nav>

      {/* 查詢專案&新增專案 */}
      <div className={Steppagestyle.body}>

        <div className={Steppagestyle.bodystep}>
          <Row className="justify-content-between">
            <p className={Steppagestyle.step}>
              Steps
            </p>
            <p className={Steppagestyle.step2}>
              1.Upload & Confirm data
            </p>
            <p className={Steppagestyle.step2}>
              2. Provide and confirm your model traing requirements
            </p>
            <p className={Steppagestyle.step2}>
              3. Train your AI model
            </p>
            <p className={Steppagestyle.step2}>
              4. Download AI model
            </p>
            <p className={Steppagestyle.step2}>
              5. 文生圖
            </p>
            <p className={Steppagestyle.step2}>
              6. 圖生圖
            </p>
          </Row>
        </div>

        <div className={Steppagestyle.bodypage}>
          <Row className="justify-content-between">

            <p className={Steppagestyle.page}>
              <p>
                <p className={Steppagestyle.title}>· Upload training data</p>
                <p className={Steppagestyle.inform}>
                  · Upload the image data you wish
                  to use to train your style model
                </p>
              </p>
              {/* <Nav.Link href={`/Download2?id=${id}&folder_name=${folder_name}`} onClick={UploadComfirm}> */}
              <Button variant="primary" disabled={Upload} onClick={UploadComfirm} >Upload</Button>{' '}
              {/* </Nav.Link> */}
            </p>

            <p className={Steppagestyle.page}>
              <p>
                <p className={Steppagestyle.title}>· Provide your training requirement</p>
                <p className={Steppagestyle.inform}>
                  · Tell us your specific needs for
                  AI model training
                </p>
              </p>
              <Button variant="primary" disabled={Fillouttheform} onClick={RequirementComfirm}>Fill out the form</Button>{' '}
            </p>

            <p className={Steppagestyle.page}>
              <p>
                <p className={Steppagestyle.title}>· Training your AI model</p>
                <p className={Steppagestyle.inform}>· you haven't submitted data yet</p>
              </p>
              <Button variant="primary" disabled={Checkyourdata} onClick={CheckUploadComfirm}>Check your data</Button>{' '}
            </p>

            <p className={Steppagestyle.page}>
              <p>
                <p className={Steppagestyle.title}>· Training your AI model</p>
                <p className={Steppagestyle.inform}>· you haven't submitted data yet</p>
              </p>
              <Button variant="primary" disabled={CheckyourRequirement} onClick={CheckRequirementComfirm}>Check your Requirement</Button>{' '}
            </p>

            <p className={Steppagestyle.page}>
              <p>
                <p className={Steppagestyle.title}>· Download your AI model</p>
                <p className={Steppagestyle.inform}>· Download your AI model</p>
              </p>
              <Button variant="primary" disabled={Training} onClick={TrainingComfirm}>Training</Button>{' '}
            </p>

          </Row>
        </div>
      </div>
    </div>
  );
};

export default Steppage;
