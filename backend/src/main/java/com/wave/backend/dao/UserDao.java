package com.wave.backend.dao;

import com.wave.backend.model.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


public interface UserDao {

    Long getCount(String userAccount);

    Integer saveOne(User user);

    User findByAccountAndPassword(String userAccount, String userPassword);

    User findById(Integer userId);

    List<User> findAll();
}
