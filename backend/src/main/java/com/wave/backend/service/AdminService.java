package com.wave.backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.wave.backend.model.domain.*;

import java.util.List;

/**
* @author Feng
* @description 针对表【admin(用户表)】的数据库操作Service
* @createDate 2022-05-09 17:46:17
*/
public interface AdminService extends IService<Admin> {
    public void addBook(Book book);

    public void delBook(Book book);

    public void updateBook(Book book);

    public boolean banUser(Integer userId);

    public List<Order> getAllOrders();

    public List<User> getAllUser();
}
