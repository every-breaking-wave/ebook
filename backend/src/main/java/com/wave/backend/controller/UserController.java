package com.wave.backend.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.wave.backend.constant.UserConstant;
import com.wave.backend.model.domain.User;
import com.wave.backend.model.domain.request.UserLoginRequest;
import com.wave.backend.model.domain.request.UserRegisterRequest;
import com.wave.backend.model.domain.response.UserLoginResponse;
import com.wave.backend.model.domain.response.UserRegisterResponse;
import com.wave.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.wave.backend.constant.UserConstant.ADMIN_ROLE;

/**
 * author : wave
 */
@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    private UserService userService;

    @PostMapping("/register")
    public UserRegisterResponse userRegister(@RequestBody UserRegisterRequest userRegisterRequest){
        if(userRegisterRequest == null){
            log.info(("response is null"));
            return null;
        }


        String userAccount = userRegisterRequest.getUserAccount();
        String userPassword = userRegisterRequest.getUserPassword();
        String checkPassword = userRegisterRequest.getCheckPassword();
        // 判空
        if(StringUtils.isAnyBlank(userAccount,userPassword)){
            return null;
        }
        return userService.userRegister(userAccount, userPassword);
    }


    @PostMapping("/login")
    public UserLoginResponse userLogin(@RequestBody UserLoginRequest userLoginRequest, HttpServletRequest request){
        if(userLoginRequest == null)
            return null;
        String userAccount = userLoginRequest.getUserAccount();
        String userPassword = userLoginRequest.getUserPassword();
        // 判空
        if(StringUtils.isAnyBlank(userAccount,userPassword)){
            return null;
        }
        return userService.userLogin(userAccount, userPassword, request);
    }

    @GetMapping("/search")
    public List<User> searchUsers( String username, HttpServletRequest request){
        if(!isAdmin(request))
            return new ArrayList<>();

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        if(StringUtils.isNoneBlank(username)){
            queryWrapper.like("username",username);  // 找出含有username的user
        }

        List<User> userList =  userService.list(queryWrapper);
        return userList.stream().map(user -> {
            return userService.getSaveUser(user);
                }
        ).collect(Collectors.toList());
    }

    @PostMapping("/delete")
    public boolean deleteUser(long id, HttpServletRequest request){
        if(!isAdmin(request)  || id <= 0 )
            return false;
        return userService.removeById(id);
    }

    @PostMapping ("/check")
    public boolean checkAuth(HttpServletRequest request){
        Object userObj = request.getSession().getAttribute(UserConstant.USER_LOGIN_STATE);
        User user = (User) userObj;
        return user != null;
    }

    public boolean isAdmin(HttpServletRequest request){
        Object userObj = request.getSession().getAttribute(UserConstant.USER_LOGIN_STATE);
        User user = (User) userObj;
        return user != null && user.getUserRole() == ADMIN_ROLE; // 返回空数组
    }


}