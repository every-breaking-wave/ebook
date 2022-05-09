package com.wave.backend.controller;


import com.wave.backend.model.domain.Book;
import com.wave.backend.model.domain.request.SearchBookRequest;
import com.wave.backend.model.domain.response.SearchBookResponse;
import com.wave.backend.service.BookService;
import com.wave.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/book")
public class BookController {
    @Resource
    private BookService bookService;

//    @PostMapping("/search")
//    public List<Book> searchBooks(@RequestBody SearchBookRequest searchBookRequest){
//        if(searchBookRequest == null){
//            return new ArrayList<>();
//        }
//        return bookService.searchBook(searchBookRequest.getSearchKey());
//    }
@PostMapping("/search/{keyword}")
public SearchBookResponse searchBooks(@PathVariable String keyword){
    return bookService.searchBook(keyword);
}
}
