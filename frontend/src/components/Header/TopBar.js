import React from "react";
import '../../css/header.css'
import '../../css/base.css'
import {getRole, logout} from "../../services/userService";
import {message, Tooltip} from "antd";
import {Link, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDisplay, faUser, faBook, faUserCircle} from "@fortawesome/free-solid-svg-icons";

export default class TopBar extends React.Component{


	constructor(props) {
		super(props);
		this.state = {list: [], role: false};
		this.search = this.search.bind(this);
	}

	search = (e) => {
		var arr = this.state.list.filter((item, index) => item.name.indexOf(e.target.value) > -1);
		this.setState({list: arr});
	};

	async componentDidMount() {
		const userRole = await getRole();
		this.setState({role: userRole})
		console.log(this.state.role)
		console.log({userRole})
		if (typeof this.state.role == "undefined") {
			this.setState({role: false})
		}
		console.log(this.state.role)
	}

	render(){
		return(
			<div id="headTop" className="t">
				<div id="topContent" className="c">
		      <span className="topContentLeft l">
                  <Link to={'/'} className="a1">欢迎来到EBook</Link>
                  <a href='/login'>请登录</a>
                  <a href="">免费注册</a>
		      </span>
					<span className="topContentRight r"><span>
                        {this.state.role == false ? (
							<Tooltip title="个人主页">
								<Link to={"/userCenter"}>
									<FontAwesomeIcon
										icon={faUser}
										// onClick={handleClick}
										fontSize={22}
										color="white"
										style={{cursor: "pointer"}}
									/>
								</Link>

							</Tooltip>
						) : (
							<Tooltip title="管理员主页">
								<Link to={"/orderManage"}>
									<FontAwesomeIcon
										icon={faDisplay}
										fontSize={22}
										color="white"
										style={{cursor: "pointer"}}
									/>
								</Link>
							</Tooltip>
						)}
						{this.state.role == false ? (
							<span></span>
						) : (
							<Tooltip title="书籍管理">
								<Link to={"/bookManage/default"}>
									<FontAwesomeIcon
										icon={faBook}
										fontSize={22}
										color="white"
										style={{cursor: "pointer"}}
									/>
								</Link>

							</Tooltip>
						)}
						{this.state.role == false ? (
							<span></span>
						) : (
							<Tooltip title="用户管理">
								<Link to={"/userManage"}>
									<FontAwesomeIcon
										icon={faUser}
										fontSize={22}
										color="white"
										style={{cursor: "pointer"}}
									/>
								</Link>

							</Tooltip>)}
						<span>
				                <a onClick={logout} href="#">退出登录</a>
			                </span>
			</span>

		</span>
				</div>
			</div>
		)
	}
}

