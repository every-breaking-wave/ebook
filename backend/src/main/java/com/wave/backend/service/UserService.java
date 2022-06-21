package com.wave.backend.service;
import com.baomidou.mybatisplus.extension.service.IService;
import com.wave.backend.model.domain.User;
import com.wave.backend.model.domain.response.UserLoginResponse;
import com.wave.backend.model.domain.response.UserRegisterResponse;

import javax.servlet.http.HttpServletRequest;

import static com.wave.backend.constant.UserConstant.USER_LOGIN_STATE;

/**
* @author 16541
* @description 针对表【user(用户表)】的数据库操作Service
* @createDate 2022-04-12 22:46:44
*/


public interface UserService extends IService<User> {

    /**
     *
     * @param userAccount:用户账号
     * @param userPassword：用户密码
     * @return 生成的用户ID
     */
    UserRegisterResponse userRegister(String userAccount, String userPassword);
    UserLoginResponse userLogin(String userAccount, String userPassword, HttpServletRequest request);

    /**
     *
     * @param originUser: 原用户
     * @return 脱敏后的用户
     */
    User getSaveUser(User originUser);

    public int userLogout(HttpServletRequest request);
}
