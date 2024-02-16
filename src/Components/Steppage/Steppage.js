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
  // 獲取整個查詢字串
  var queryString = window.location.search;
  // 解析查詢字串為鍵值對的物件
  var params = new URLSearchParams(queryString);
  var id = params.get('id');
  var folder_name = params.get('folder_name');
  
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
              <Nav.Link href={`/Download2?id=${id}&folder_name=${folder_name}`}>
                <Button variant="primary" >Upload</Button>{' '}
              </Nav.Link>
            </p>

            <p className={Steppagestyle.page}>
              <p>
                <p className={Steppagestyle.title}>· Provide your training requirement</p>
                <p className={Steppagestyle.inform}>
                  · Tell us your specific needs for
                  AI model training
                </p>
              </p>
              <Nav.Link href={`/Requirement?id=${id}&folder_name=${folder_name}`}>
                <Button variant="primary" >Fill out the form</Button>{' '}
              </Nav.Link>
            </p>

            <p className={Steppagestyle.page}>
              <p>
                <p className={Steppagestyle.title}>· Training your AI model</p>
                <p className={Steppagestyle.inform}>· you haven't submitted data yet</p>
              </p>
              <Nav.Link href={`/CheckData?id=${id}&folder_name=${folder_name}`}>
                <Button variant="primary">Check your data</Button>{' '}
              </Nav.Link>
            </p>

            <p className={Steppagestyle.page}>
              <p>
                <p className={Steppagestyle.title}>· Training your AI model</p>
                <p className={Steppagestyle.inform}>· 還沒做完</p>
              </p>
              <Nav.Link href="/Download2">
                <Button variant="primary" >Check your Requirement</Button>{' '}
              </Nav.Link>
            </p>

            <p className={Steppagestyle.page}>
              <p>
                <p className={Steppagestyle.title}>· Download your AI model</p>
                <p className={Steppagestyle.inform}>· Download your AI model</p>
              </p>
            </p>

          </Row>
        </div>
      </div>
    </div>
  );
};

export default Steppage;
