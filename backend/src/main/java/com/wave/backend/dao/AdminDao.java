package com.wave.backend.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wave.backend.model.Admin;
import com.wave.backend.model.User;


public interface AdminDao {
    Admin findByAccountAndPassword(String userAccount, String userPassword);

    Integer saveOne(Admin admin);

    Boolean ifExist(Admin admin);
}
