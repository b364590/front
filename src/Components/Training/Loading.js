import React, { useState, useEffect } from 'react';
import Loadingstyle from "./Loading.module.css";

const Loading = () => {
    return (
        <div className={Loadingstyle.loading}>
            <div className={Loadingstyle.shape1}></div>
            <div className={Loadingstyle.shape2}></div>
            <div className={Loadingstyle.shape3}></div>
            <div className={Loadingstyle.shape4}></div>
        </div>
    )
};

export default Loading;