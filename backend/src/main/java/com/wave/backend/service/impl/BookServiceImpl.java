package com.wave.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wave.backend.controller.UserController;
import com.wave.backend.model.Book;
import com.wave.backend.mapper.BookMapper;
import com.wave.backend.model.response.GetBookResponse;
import com.wave.backend.model.response.SearchBookResponse;
import com.wave.backend.service.BookService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
* @author Feng
* @description 针对表【book】的数据库操作Service实现
* @createDate 2022-05-09 23:37:44
*/
@Service
@Slf4j
public class BookServiceImpl extends ServiceImpl<BookMapper, Book>
implements BookService{
    @Resource
    private BookMapper bookMapper;
    @Resource
    private UserController userController;

    @Override
    public SearchBookResponse searchBook(String searchKey) {
        log.info("Searching books");
        SearchBookResponse searchBookResponse = new SearchBookResponse();
        QueryWrapper<Book> queryWrapper = new QueryWrapper<>();
        // 过滤已删除书本
        queryWrapper.eq("isDeleted", 0);
        // 若为空查询，返回所有书本
        if(!searchKey.equals("default")){
            queryWrapper.like("bookName",searchKey);
        }
        searchBookResponse.setBookList(bookMapper.selectList(queryWrapper));
        return searchBookResponse;
    }

    @Override
    public GetBookResponse getBook(Integer id) {
        log.info("getting book detail");
        GetBookResponse getBookResponse = new GetBookResponse();
        getBookResponse.setBook(bookMapper.selectById(id));
        return getBookResponse;
    }

    /**
     * 根据权限展示账单中的书
     */
    @Override
    public GetBookResponse getBooks(Integer id, HttpServletRequest request) {
        // 判断权限
        if(userController.isAdmin(request)){
            return  null;
        }
        return null;
    }
}
