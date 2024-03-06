import React, { useEffect, useState, Fragment } from "react";
import Projectstyle from "./Training.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import { useNavigate, NavLink, Link } from "react-router-dom";
import background from "../../image/instai_icon.png"
import background2 from "../../image/iconnew.png"
import TrainingList from "./TrainingList.js";
import Loading from "./Loading.js";
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


const Training = () => {
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载完成后隐藏加载动画
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // 清除定时器以避免内存泄漏
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      {isLoading ? (
        <Loading />
      ) : (
        <div className={Projectstyle.container}>
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
                <Nav.Item >
                    <Nav.Link href={`/Project`}>
                        <Button variant="outline-danger"  >Back to Project</Button>{' '}
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            {/* 專案 */}
            <p className={Projectstyle.title}>Training Result:</p>
            <Row className="justify-content-start flex-direction-column">
                <Col>
                    <TrainingList/>
                </Col>
            </Row>
        </div>
      )}
    </div>
  );
};

export default Training;