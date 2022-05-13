import React from "react";
import '../css/header.css'
import '../css/base.css'
import '../css/footer.css'
import LeftNav from "./leftNav";

export default class Footer extends React.Component{

    render() {
        return (
        <div>
            {/*<div className="footerInfo t">*/}
            {/*    <div className="footerInfoContent c">*/}
            {/*        <div className="footerIcon">*/}
            {/*            <em className="footerIcon1"></em>*/}
            {/*            <span className="footerFond">顺丰EMS速达</span>*/}
            {/*        </div>*/}
            {/*        <span className="footerIcons"></span>*/}
            {/*        <div className="footerIcon">*/}
            {/*            <em className="footerIcon2"></em>*/}
            {/*            <span className="footerFond">顺丰EMS速达</span>*/}
            {/*        </div>*/}
            {/*        <span className="footerIcons"></span>*/}
            {/*        <div className="footerIcon">*/}
            {/*            <em className="footerIcon3"></em>*/}
            {/*            <span className="footerFond">顺丰EMS速达</span>*/}
            {/*        </div>*/}
            {/*        <span className="footerIcons"></span>*/}
            {/*        <div className="footerIcon">*/}
            {/*            <em className="footerIcon4"></em>*/}
            {/*            <span className="footerFond">顺丰EMS速达</span>*/}
            {/*        </div>*/}
            {/*        <span className="footerIcons"></span>*/}
            {/*        <div className="footerIcon">*/}
            {/*            <em className="footerIcon5"></em>*/}
            {/*            <span className="footerFond">顺丰EMS速达</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="footerMap t">
                <ul className="footerMaPContent">
                    <li>
                        <a className="boldT" href=""><span>购物流程</span></a>
                    </li>
                    <li>
                        <a className="boldT" href=""><span>支付/配送</span></a>
                    </li>
                    <li>
                        <a className="boldT" href=""><span>售后服务</span></a>
                    </li>
                    <li>
                        <a className="boldT" href=""><span>关于EBook</span></a>
                    </li>
                    <li className="footerMapa"><a className="boldT" href="">网上订购咨询热线 : 400 670 0055</a></li>
                </ul>
            </div>
            <div className="foot t">
                <div className="footContent c">
                    <ul className="footList">
                        <li>

                            <a className="footIcon" href="">沪公网安备 xxxxxxxxxx号</a>
                            <a href="">ICP备案序号:沪ICP备xxxxxxxx号</a>
                            <a href="">网站使用条款严正声明</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        )
    }
}
