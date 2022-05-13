package com.wave.backend.controller;

import com.wave.backend.model.domain.Book;
import com.wave.backend.model.domain.response.GetBookResponse;
import com.wave.backend.model.domain.response.SearchBookResponse;
import com.wave.backend.service.BookService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;


@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/book")
public class BookController {
    @Resource
    private BookService bookService;


    @PostMapping("/getbook/{id}")
    public GetBookResponse getBook(@PathVariable String id){
        return bookService.getBook(id);
    }

    @PostMapping("/getbooks/{id}")
    public GetBookResponse getBooks(@PathVariable String id, HttpServletRequest request){
        return bookService.getBooks(id,request);
    }

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

    @PostMapping("/car")
    public SearchBookResponse getBooksInCar(HttpServletRequest request){
        Cookie[] cookies =  request.getCookies();
        if(cookies == null)
            return null;
        for (Cookie cookie : cookies) {
            String cookieName = cookie.getName();
            log.info(String.valueOf(cookie));

            //如果有，解密后拿cookie中的值和数据库中的值进行比较
//            if (Constant.cookieCustomerKey.getName().equals(cookieName)) {
//                String cookieValue = cookie.getValue();
//                String decry = EncrypUtils.Base64Util.decry(cookieValue);
//                Customer customer1 = JsonUtils.stringToObject(decry, Customer.class);
//                Customer customer2 = customerService.checkLogin(customer1.getPhoneNumber(), customer1.getPassword());
//                if (customer2 != null) {
//                    //放入到session中，放行
//                    request.getSession().setAttribute("customer", customer2);
//                    //自动登录时，更新用户的在线状态
//                    Customer onlineCustomer = new Customer();
//                    onlineCustomer.setId(customer2.getId());
//                    onlineCustomer.setOnlineStatus(String.valueOf(Constant.ONLINESTATUS.getCode()));
//                    customerService.updateById(onlineCustomer);
//                    return true;
//                }
//            }
        }
        return null;

    }
}
