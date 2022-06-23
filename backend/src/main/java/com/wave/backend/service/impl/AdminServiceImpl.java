package com.wave.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wave.backend.mapper.*;
import com.wave.backend.model.Admin;
import com.wave.backend.model.Book;
import com.wave.backend.model.Order;
import com.wave.backend.model.User;
import com.wave.backend.service.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
* @author Feng
* @description 针对表【admin(用户表)】的数据库操作Service实现
* @createDate 2022-05-09 17:46:17
*/
@Slf4j
@Service
public class AdminServiceImpl extends ServiceImpl<AdminMapper, Admin>
implements AdminService{

    @Resource
    private UserMapper userMapper;
    @Resource
    private BookMapper bookMapper;

    @Resource
    private OrderMapper orderMapper;

    @Override
    public void addBook(Book book) {
        // 判断是否同名
//
//        QueryWrapper<Book> queryWrapper = new QueryWrapper<>();
        bookMapper.insert(book);
        log.info("addBook Ok");
    }

    @Override
    public void delBook(Book book) {

        QueryWrapper<Book> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("bookName", book.getBookName());
        if(bookMapper.selectCount(queryWrapper) == 0){
            return;
        }
        book.setIsDeleted(1);
        bookMapper.updateById(book);
        log.info("delete Ok");
    }

    @Override
    public void updateBook(Book book) {

        QueryWrapper<Book> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("bookName", book.getBookName());
        if(bookMapper.selectCount(queryWrapper) == 0){
            bookMapper.insert(book);
            return;
        }
        bookMapper.updateById(book);
        log.info("updateBook Ok");
    }

    @Override
    public boolean banUser(Integer userId) {

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        if( userMapper.selectById(userId) == null){
            log.info("Del user failed, user not exsits");
            return false;
        }
        User user = userMapper.selectById(userId);
        user.setUserStatus(user.getUserStatus() == 1? 0 : 1);
        userMapper.updateById(user);
        log.info("ban user succeed");
        return true;
    }

    @Override
    public List<Order> getAllOrders() {
        QueryWrapper<Order> queryWrapper = new QueryWrapper<>();
        List<Order> orderItems = orderMapper.selectList(queryWrapper);
        if(orderItems != null){
            log.info("Get all orders ok");
            return orderItems;
        }
        log.info("Get all orders failed");
            return null;

    }

    @Override
    public List<User> getAllUser() {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        List<User> users = userMapper.selectList(queryWrapper);
        if(users != null){
            log.info("Get all users ok");
            return users;
        }
        log.info("Get all users failed");
        return null;
    }
}
