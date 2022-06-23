package com.wave.backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.wave.backend.model.Book;
import com.wave.backend.model.response.GetBookResponse;
import com.wave.backend.model.response.SearchBookResponse;

import javax.servlet.http.HttpServletRequest;

/**
* @author Feng
* @description 针对表【book】的数据库操作Service
* @createDate 2022-05-09 23:37:44
*/
public interface BookService extends IService<Book> {

    SearchBookResponse searchBook(String searchKey);

    GetBookResponse getBook(Integer id);

    GetBookResponse getBooks(Integer id, HttpServletRequest request);
}
