import React, { useEffect, useState, Fragment } from "react";
import basestyle from "../Base.module.css";
import registerstyle from "./Register.module.css";
import axios from "axios";
import { useNavigate, NavLink, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });//使用者資料
  const [formerror, setFormerror] = useState({});//儲存錯誤資訊
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };//存input資料

  const errorDetect = (values) => {
    const errors = {};
    const Formemail = /^\S+@\S+\.\S+$/;//email格式
    if (!values.fname) {
      errors.fname = "First Name is required";
    }
    if (!values.lname) {
      errors.lname = "Last Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    else if (!Formemail.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "password is required";
    }
    else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } 
    else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.cpassword) {
      errors.cpassword = "Confirm password is required";
    }
    else if (values.password !== values.cpassword) {
      errors.cpassword = "password is not the same";
    }
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault();//停止事件的默認動作
    setFormerror(errorDetect(formData));//判斷input裡的資料有沒有錯誤
    setIsSubmit(true);
    console.log('Detect:', formData);
  };//判斷格式是否有錯誤

  useEffect(() => {
    if (Object.keys(formerror).length === 0 && isSubmit) {
      axios
        .post("http://localhost:8080/login", formData)
        .then((res) => {
          alert(res.data);
        });
      navigate("/Login");
    }
  }, [formerror, isSubmit])//如果無錯誤資訊，資料會存到資料庫裡並且連至sign in

  return (
    <div className={registerstyle.container}>
      <header>
        <h1>InstAi</h1>
      </header>
      <div className={registerstyle.register}>
        <form>
          <legend>Sign Up</legend>
          <label>
            First name：
            <input
              type="text"
              name="fname"
              id="fname"
              values={formData.fname}
              onChange={handleChange}
            />
          </label>
          <p className={basestyle.error}>{formerror.fname}</p>
          <br />
          <label>
            Last name：
            <input
              type="text"
              name="lname"
              id="lname"
              value={formData.lname}
              onChange={handleChange}
            />
          </label>
          <p className={basestyle.error}>{formerror.lname}</p>
          <br />
          <label>
            email：
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <p className={basestyle.error}>{formerror.email}</p>
          <br />
          <label>
            password：
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <p className={basestyle.error}>{formerror.password}</p>
          <br />
          <label>
            Confirm password：
            <input
              type="password"
              name="cpassword"
              id="cpassword"
              value={formData.cpassword}
              onChange={handleChange}
            />
          </label>
          <p className={basestyle.error}>{formerror.cpassword}</p>
          <br />
          <button onClick={handleSubmit} className={basestyle.button_common}>Sign up</button>
          <NavLink className={registerstyle.NavLink} to="/login">
            Sign in to existing account
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Register;
