package com.wave.backend.controller;

import com.wave.backend.model.domain.Book;
import com.wave.backend.model.domain.BookInCar;
import com.wave.backend.model.domain.CartItem;
import com.wave.backend.model.domain.request.AddCartRequest;
import com.wave.backend.model.domain.response.CarListResponse;
import com.wave.backend.service.BookService;
import com.wave.backend.utils.JsonUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sun.misc.BASE64Encoder;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping("/car")
public class ProductCartController {
    @Resource
    private BookService bookService;

    //购物车在Cookie中的name
    private String productCart = "bookCar";

    //url encoder使用的字符集
    private String enc = "utf-8";

    /**
     * 添加一个商品到购物车
     */
    @RequestMapping("/addCart")
    public String addCart(@RequestBody AddCartRequest addCartRequest, HttpServletRequest request, HttpServletResponse response) throws Exception {
        String bookId = addCartRequest.getBookId();
        Book book = bookService.getBook(bookId).getBook();
        BookInCar bookInCar = new BookInCar();
        bookInCar.setId(book.getId());
        bookInCar.setBookName(book.getBookName());
        bookInCar.setAuthor(book.getAuthor());
        bookInCar.setPrice(book.getPrice());
        bookInCar.setCover(book.getCover());
        bookInCar.setCountInCar(addCartRequest.getCount());

        if (bookInCar == null || bookInCar.getCountInCar() <= 0) {
            return "参数错误";
        }

        Cookie[] cookies = request.getCookies();
        Cookie cookie = null;
        if (cookies != null && cookies.length >= 0) {
            for (Cookie cookie1 : cookies) {
                if (productCart.equals(cookie1.getName())) {
                    cookie = cookie1;
                    break;
                }
            }
        }
//        int i = 10 / 0;
        if (cookie == null) {
            cookie = new Cookie(productCart, URLEncoder.encode(JsonUtil.objectToString(new HashMap<String, BookInCar>()), enc));
            cookie.setPath("/");
        }
        String value = cookie.getValue();
        log.info("value = "+value);

        Map<String , BookInCar> hashMap = JsonUtil.stringToMap(URLDecoder.decode(value, enc), String.class, BookInCar.class);
        BookInCar item = hashMap.get(bookInCar.getId().toString());
        if (item != null) {
            bookInCar.setCountInCar(bookInCar.getCountInCar() + item.getCountInCar());
        }
        hashMap.put(book.getId().toString(), bookInCar);
        cookie.setValue(URLEncoder.encode(JsonUtil.objectToString(hashMap), enc));
        response.addCookie(cookie);
        return "200";
    }

    /**
     * 减少一个商品到购物车
     */
    @RequestMapping("/minCart")
    public String minCart(@RequestBody AddCartRequest addCartRequest, HttpServletRequest request, HttpServletResponse response) throws Exception {
        String bookId = addCartRequest.getBookId();
        Book book = bookService.getBook(bookId).getBook();
        BookInCar bookInCar = new BookInCar();
        bookInCar.setId(book.getId());
        bookInCar.setBookName(book.getBookName());
        bookInCar.setAuthor(book.getAuthor());
        bookInCar.setPrice(book.getPrice());
        bookInCar.setCover(book.getCover());
        bookInCar.setCountInCar(addCartRequest.getCount());

        if (bookInCar == null || bookInCar.getCountInCar() <= 0) {
            return "参数错误";
        }

        Cookie[] cookies = request.getCookies();
        Cookie cookie = null;
        if (cookies != null && cookies.length >= 0) {
            for (Cookie cookie1 : cookies) {
                if (productCart.equals(cookie1.getName())) {
                    cookie = cookie1;
                    break;
                }
            }
        }
        if (cookie == null) {
            cookie = new Cookie(productCart, URLEncoder.encode(JsonUtil.objectToString(new HashMap<String, BookInCar>()), enc));
            cookie.setPath("/");
        }
        String value = cookie.getValue();
        log.info("value = "+value);

        Map<String , BookInCar> hashMap = JsonUtil.stringToMap(URLDecoder.decode(value, enc), String.class, BookInCar.class);
        BookInCar item = hashMap.get(bookInCar.getId().toString());
        if (item != null) {
            bookInCar.setCountInCar(item.getCountInCar() - bookInCar.getCountInCar());
        }
        hashMap.put(book.getId().toString(), bookInCar);
        cookie.setValue(URLEncoder.encode(JsonUtil.objectToString(hashMap), enc));
        response.addCookie(cookie);
        return "200";
    }


    @RequestMapping("/delCart")
    public String delCart(@RequestBody AddCartRequest addCartRequest, HttpServletRequest request, HttpServletResponse response) throws Exception {
        String bookId = addCartRequest.getBookId();
        Book book = bookService.getBook(bookId).getBook();
//        BookInCar bookInCar = new BookInCar();
//        bookInCar.setId(book.getId());
//        bookInCar.setBookName(book.getBookName());
//        bookInCar.setAuthor(book.getAuthor());
//        bookInCar.setPrice(book.getPrice());
//        bookInCar.setCover(book.getCover());
//        bookInCar.setCountInCar(addCartRequest.getCount());
//
//        if (bookInCar == null || bookInCar.getCountInCar() <= 0) {
//            return "参数错误";
//        }

        Cookie[] cookies = request.getCookies();
        Cookie cookie = null;
        if (cookies != null && cookies.length >= 0) {
            for (Cookie cookie1 : cookies) {
                if (productCart.equals(cookie1.getName())) {
                    cookie = cookie1;
                    break;
                }
            }
        }
        if (cookie == null) {
            cookie = new Cookie(productCart, URLEncoder.encode(JsonUtil.objectToString(new HashMap<String, BookInCar>()), enc));
            cookie.setPath("/");
        }
        String value = cookie.getValue();
        Map<String , BookInCar> hashMap = JsonUtil.stringToMap(URLDecoder.decode(value, enc), String.class, BookInCar.class);
        assert hashMap != null;
        hashMap.remove(book.getId().toString());
        cookie.setValue(URLEncoder.encode(JsonUtil.objectToString(hashMap), enc));
        response.addCookie(cookie);
        return "200";
    }

    /**
     * 购物车商品列表
     */
    @RequestMapping("/cartList")
    public CarListResponse cartList(HttpServletRequest request) throws UnsupportedEncodingException {
        List<BookInCar> bookInCarList = new ArrayList<>();
        CarListResponse carListResponse = new CarListResponse();
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0) {
            Cookie cookie = null;
            for (Cookie cookie1 : cookies) {
                if (productCart.equals(cookie1.getName())) {
                    cookie = cookie1;
                }
            }
            if (cookie != null) {
                String value = cookie.getValue();
                Map<String, BookInCar> itemMap = JsonUtil.stringToMap(URLDecoder.decode(value, enc), String.class, BookInCar.class);
                if (itemMap != null && !itemMap.isEmpty()) {
                    System.out.println("购物车列表如下:");
                    for (BookInCar bookInCar : itemMap.values()) {
                        bookInCarList.add(bookInCar);
                        System.out.println(bookInCar);
                    }
                    carListResponse.setBookInCarList(bookInCarList);
                    return carListResponse;
                }
            }
        }
        System.out.println("无数据");
        return null;
    }

}
