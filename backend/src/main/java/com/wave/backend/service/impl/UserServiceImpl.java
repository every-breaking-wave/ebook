package com.wave.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wave.backend.constant.UserConstant;
import com.wave.backend.constant.UserServiceStatus;
import com.wave.backend.mapper.AdminMapper;
import com.wave.backend.model.domain.Admin;
import com.wave.backend.model.domain.User;
import com.wave.backend.model.domain.response.UserLoginResponse;
import com.wave.backend.model.domain.response.UserRegisterResponse;
import com.wave.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import com.wave.backend.mapper.UserMapper;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 用户服务实现类
 *
 * @author example
 */

@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
        implements UserService {
    /**
     * 盐值： 用于混淆密码
     */
    private static final String SALT = "wave";

    @Resource
    private UserMapper userMapper;
    @Resource
    private AdminMapper adminMapper;

    @Override
    public UserRegisterResponse userRegister(String userAccount, String userPassword) {
        log.info("Registering");

        UserRegisterResponse userRegisterResponse = new UserRegisterResponse();

        // 1.校验
        if (StringUtils.isAnyBlank(userAccount, userPassword)) {
            userRegisterResponse.setStatus(UserServiceStatus.USER_ACCOUNT_PASSWORD_NULL);
            return userRegisterResponse;
        }

        /*
         * 账户不能包含特殊字
         * \\pP表示标点符号
         * \\pS表示特殊符号（数学符号，货币符号等）
         * \\s+表示一或多个空格
         */

        String validPattern = "\\pP|\\pS|\\s+";
        Matcher matcher = Pattern.compile(validPattern).matcher(userAccount);
        if (matcher.find()) {
            userRegisterResponse.setStatus(UserServiceStatus.USER_ACCOUNT_ILLEGAL);
            return userRegisterResponse;
        }

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userAccount", userAccount);
        long count = userMapper.selectCount(queryWrapper);
        if (count > 0) {
            userRegisterResponse.setStatus(UserServiceStatus.USER_ALREADY_EXIST);
            return userRegisterResponse;
        }

        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
        User user = new User();
        user.setUserAccount(userAccount);
        user.setUserPassword(encryptPassword);
        int saveResult =  userMapper.insert(user);

        if (saveResult == 0) {
            userRegisterResponse.setStatus(UserServiceStatus.USER_UNKNOWN_ERROR);
            return userRegisterResponse;
        }
        userRegisterResponse.setStatus(UserServiceStatus.USER_ALL_OK);
        userRegisterResponse.setId(0L);
        return userRegisterResponse;
    }


    @Override
    public UserLoginResponse userLogin(String userAccount, String userPassword, HttpServletRequest request) {
        log.info("Logging in");

        UserLoginResponse userLoginResponse = new UserLoginResponse();

        // 1.校验
        if (StringUtils.isAnyBlank(userAccount, userPassword)) {
            userLoginResponse.setStatus(UserServiceStatus.USER_ACCOUNT_PASSWORD_NULL);
            return userLoginResponse;
        }

        // 账户不能包含特殊字符
        String validPattern = "\\p{P}|\\p{S}|\\s+";
        Matcher matcher = Pattern.compile(validPattern).matcher(userAccount);
        if (matcher.find()) {
            userLoginResponse.setStatus(UserServiceStatus.USER_ACCOUNT_ILLEGAL);
            return userLoginResponse;
        }

        // 2.加密
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
        // 查询用户是否存在并判断role

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        QueryWrapper<Admin> queryWrapper1 = new QueryWrapper<>();
        queryWrapper.eq("userAccount", userAccount);
        queryWrapper.eq("userPassword", encryptPassword);
        queryWrapper1.eq("userAccount", userAccount);
        queryWrapper1.eq("userPassword", encryptPassword);
        User user = userMapper.selectOne(queryWrapper);
        Admin admin = adminMapper.selectOne(queryWrapper1);
       
        // 用户不存在
        if (user == null && admin == null) {
            log.error("User login failed: User doesn't exist.");
            userLoginResponse.setStatus(UserServiceStatus.USER_NOT_EXIST);
            return userLoginResponse;
        }

        // 3.用户脱敏
//        User safeUser = getSaveUser(user);
//
//        doctorService.addDoctor(user);

        // 4.记录脱敏后的用户登录状态, 现在未进行脱敏处理，按用户role分类记录用户态
        if (user != null) {
            request.getSession().setAttribute(UserConstant.USER_LOGIN_STATE, user);
            userLoginResponse.setId(user.getId());
            userLoginResponse.setUserAccount(user.getUserAccount());
            userLoginResponse.setRole(UserConstant.DEFAULT_ROLE);
        }
        else if (admin != null) {
            request.getSession().setAttribute(UserConstant.USER_LOGIN_STATE, admin);
            userLoginResponse.setId(admin.getId());
            userLoginResponse.setUserAccount(admin.getUserAccount());
            userLoginResponse.setRole(UserConstant.ADMIN_ROLE);
        }

        userLoginResponse.setStatus(UserServiceStatus.USER_ALL_OK);
        return userLoginResponse;
    }

    @Override
    public User getSaveUser(User originUser) {
        User safeUser = new User();
        safeUser.setId(0L);
        safeUser.setUsername(originUser.getUsername());
        safeUser.setUserAccount(originUser.getUserAccount());
        safeUser.setAvatarUrl(originUser.getAvatarUrl());
        safeUser.setGender(originUser.getGender());
        safeUser.setEmail(originUser.getEmail());
        safeUser.setUserStatus(originUser.getUserStatus());
        safeUser.setPhoneNumber(originUser.getPhoneNumber());
        safeUser.setCreateTime(originUser.getCreateTime());
        safeUser.setIsDelete(0);
        safeUser.setUserRole(originUser.getUserRole());
        return safeUser;
    }
}