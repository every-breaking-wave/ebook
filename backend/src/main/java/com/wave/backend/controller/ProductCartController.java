package com.wave.backend.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.wave.backend.mapper.BookMapper;
import com.wave.backend.mapper.CarMapper;
import com.wave.backend.mapper.CaritemMapper;
import com.wave.backend.model.domain.Book;
import com.wave.backend.model.domain.BookInCar;
import com.wave.backend.model.domain.Car;
import com.wave.backend.model.domain.CarItem;
import com.wave.backend.model.domain.request.AddCartRequest;
import com.wave.backend.model.domain.request.CarListRequest;
import com.wave.backend.model.domain.request.CreateOrderRequest;
import com.wave.backend.model.domain.response.CarListResponse;
import com.wave.backend.service.BookService;
import com.wave.backend.utils.JsonUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.*;

@RestController
@Slf4j
@RequestMapping("/car")
public class ProductCartController {
    @Resource
    private BookService bookService;
    @Resource
    private CaritemMapper caritemMapper;
    @Resource
    private  CarMapper carMapper;
    @Resource
    private BookMapper bookMapper;

    //购物车在Cookie中的name
    private String productCart = "bookCar";

    //url encoder使用的字符集
    private String enc = "utf-8";

    @RequestMapping("/getId")
    public Integer getId(@RequestBody CreateOrderRequest createOrderRequest){
        QueryWrapper<Car>  queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userId",createOrderRequest.getUserId());
        Car car =  carMapper.selectOne(queryWrapper);
        return car.getId();
    }

    /**
     * 添加一个商品到购物车
     */
    @RequestMapping("/addCart")
    public String addCart(@RequestBody AddCartRequest addCartRequest, HttpServletRequest request, HttpServletResponse response) throws Exception {

        QueryWrapper<CarItem> queryWrapper = new QueryWrapper<>();
        QueryWrapper<Car> queryWrapper1 = new QueryWrapper<>();
        QueryWrapper<Book> queryWrapper2 = new QueryWrapper<>();

        queryWrapper1.eq("userId",addCartRequest.getUserId());
        queryWrapper2.eq("id",addCartRequest.getBookId());
        Car car = carMapper.selectOne(queryWrapper1);
        Book book = bookMapper.selectOne(queryWrapper2);

        queryWrapper.eq("carId",car.getId());
        queryWrapper.eq("bookId",addCartRequest.getBookId());
        CarItem caritem = caritemMapper.selectOne(queryWrapper);

        if(caritem == null){// 如果目前没有这个商品,新建carItem
            caritem = new CarItem();
            caritem.setBookId(addCartRequest.getBookId());
            caritem.setCarId(car.getId());
            caritem.setPrice(book.getPrice());
            caritem.setCountInCar(addCartRequest.getCount());
            caritem.setCover(book.getCover());
            caritem.setBookName(book.getBookName());
            caritemMapper.insert(caritem);
        }else {// 否则更新数量
            caritem.setCountInCar(caritem.getCountInCar() + addCartRequest.getCount());
            caritemMapper.updateById(caritem);
        }
        return "ok";
//        String bookId = addCartRequest.getBookId();
//        Book book = bookService.getBook(bookId).getBook();
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
//
//        Cookie[] cookies = request.getCookies();
//        Cookie cookie = null;
//        if (cookies != null && cookies.length >= 0) {
//            for (Cookie cookie1 : cookies) {
//                if (productCart.equals(cookie1.getName())) {
//                    cookie = cookie1;
//                    break;
//                }
//            }
//        }
//        if (cookie == null) {
//            cookie = new Cookie(productCart, URLEncoder.encode(JsonUtil.objectToString(new HashMap<String, BookInCar>()), enc));
//            cookie.setPath("/");
//        }
//        String value = cookie.getValue();
//        log.info("value = "+value);
//
//        Map<String , BookInCar> hashMap = JsonUtil.stringToMap(URLDecoder.decode(value, enc), String.class, BookInCar.class);
//        BookInCar item = hashMap.get(bookInCar.getId().toString());
//        if (item != null) {
//            bookInCar.setCountInCar(bookInCar.getCountInCar() + item.getCountInCar());
//        }
//        hashMap.put(book.getId().toString(), bookInCar);
//        cookie.setValue(URLEncoder.encode(JsonUtil.objectToString(hashMap), enc));
//        response.addCookie(cookie);
//        return "200";
    }

    /**
     * 减少一个商品到购物车
     */
    @RequestMapping("/minCart")
    public String minCart(@RequestBody AddCartRequest addCartRequest, HttpServletRequest request, HttpServletResponse response) throws Exception {
        QueryWrapper<CarItem> queryWrapper = new QueryWrapper<>();
        QueryWrapper<Car> queryWrapper1 = new QueryWrapper<>();
//        QueryWrapper<Book> queryWrapper2 = new QueryWrapper<>();

        queryWrapper1.eq("userId",addCartRequest.getUserId());
//        queryWrapper2.eq("id",addCartRequest.getBookId());
        Car car = carMapper.selectOne(queryWrapper1);
//        Book book = bookMapper.selectOne(queryWrapper2);

        queryWrapper.eq("carId",car.getId());
        queryWrapper.eq("bookId",addCartRequest.getBookId());
        CarItem caritem = caritemMapper.selectOne(queryWrapper);

        caritem.setCountInCar(caritem.getCountInCar() - addCartRequest.getCount());
        caritemMapper.updateById(caritem);

        return "ok";

        //        String bookId = addCartRequest.getBookId();
//        Book book = bookService.getBook(bookId).getBook();
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
//
//        Cookie[] cookies = request.getCookies();
//        Cookie cookie = null;
//        if (cookies != null && cookies.length >= 0) {
//            for (Cookie cookie1 : cookies) {
//                if (productCart.equals(cookie1.getName())) {
//                    cookie = cookie1;
//                    break;
//                }
//            }
//        }
//        if (cookie == null) {
//            cookie = new Cookie(productCart, URLEncoder.encode(JsonUtil.objectToString(new HashMap<String, BookInCar>()), enc));
//            cookie.setPath("/");
//        }
//        String value = cookie.getValue();
//        log.info("value = "+value);
//
//        Map<String , BookInCar> hashMap = JsonUtil.stringToMap(URLDecoder.decode(value, enc), String.class, BookInCar.class);
//        BookInCar item = hashMap.get(bookInCar.getId().toString());
//        if (item != null) {
//            bookInCar.setCountInCar(item.getCountInCar() - bookInCar.getCountInCar());
//        }
//        hashMap.put(book.getId().toString(), bookInCar);
//        cookie.setValue(URLEncoder.encode(JsonUtil.objectToString(hashMap), enc));
//        response.addCookie(cookie);
//        return "200";
    }


    @RequestMapping("/delCart")
    public String delCart(@RequestBody AddCartRequest addCartRequest, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Integer bookId = addCartRequest.getBookId();
        Book book = bookService.getBook(bookId).getBook();
        QueryWrapper<Car> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userId",addCartRequest.getUserId());
        Car car = carMapper.selectOne(queryWrapper);

        QueryWrapper<CarItem> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("carId",car.getId());
        queryWrapper1.eq("bookId",book.getId());
        CarItem carItem =  caritemMapper.selectOne(queryWrapper1);
        if(carItem == null){
            return "no such item in car";
        }
        carItem.setCountInCar(0);
        return  "OK";
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
//
//        Cookie[] cookies = request.getCookies();
//        Cookie cookie = null;
//        if (cookies != null && cookies.length >= 0) {
//            for (Cookie cookie1 : cookies) {
//                if (productCart.equals(cookie1.getName())) {
//                    cookie = cookie1;
//                    break;
//                }
//            }
//        }
//        if (cookie == null) {
//            cookie = new Cookie(productCart, URLEncoder.encode(JsonUtil.objectToString(new HashMap<String, BookInCar>()), enc));
//            cookie.setPath("/");
//        }
//        String value = cookie.getValue();
//        Map<String , BookInCar> hashMap = JsonUtil.stringToMap(URLDecoder.decode(value, enc), String.class, BookInCar.class);
//        assert hashMap != null;
//        hashMap.remove(book.getId().toString());
//        cookie.setValue(URLEncoder.encode(JsonUtil.objectToString(hashMap), enc));
//        response.addCookie(cookie);
    }



    @RequestMapping("/changeCart")
    public String changeCart(@RequestBody AddCartRequest addCartRequest, HttpServletRequest request, HttpServletResponse response) throws Exception {
        QueryWrapper<CarItem> queryWrapper = new QueryWrapper<>();
        QueryWrapper<Car> queryWrapper1 = new QueryWrapper<>();


        queryWrapper1.eq("userId",addCartRequest.getUserId());
        Car car = carMapper.selectOne(queryWrapper1);

        queryWrapper.eq("carId",car.getId());
        queryWrapper.eq("bookId",addCartRequest.getBookId());
        CarItem caritem = caritemMapper.selectOne(queryWrapper);

        caritem.setCountInCar(addCartRequest.getCount());
        caritemMapper.updateById(caritem);
        return "ok";
    }

    /**
     * 购物车商品列表
     */
    @RequestMapping("/cartList")
    public CarListResponse cartList(@RequestBody CarListRequest carListRequest) throws UnsupportedEncodingException {
        QueryWrapper<CarItem> queryWrapper = new QueryWrapper<>();
        QueryWrapper<Car> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("userId",carListRequest.getUserId());
        queryWrapper.eq("carId",carMapper.selectOne(queryWrapper1).getId());
        List<CarItem> cartItems = new ArrayList<>();
        cartItems = caritemMapper.selectList(queryWrapper);
        CarListResponse carListResponse = new CarListResponse();
        carListResponse.setBookInCarList(cartItems);

        System.out.println("购物车列表如下:");
        for (CarItem carItem : cartItems) {
            System.out.println(carItem);
        }

        return carListResponse;
    }
//        List<BookInCar> bookInCarList = new ArrayList<>();
//        CarListResponse carListResponse = new CarListResponse();
//        Cookie[] cookies = request.getCookies();
//        if (cookies != null && cookies.length > 0) {
//            Cookie cookie = null;
//            for (Cookie cookie1 : cookies) {
//                if (productCart.equals(cookie1.getName())) {
//                    cookie = cookie1;
//                }
//            }
//            if (cookie != null) {
//                String value = cookie.getValue();
//                Map<String, BookInCar> itemMap = JsonUtil.stringToMap(URLDecoder.decode(value, enc), String.class, BookInCar.class);
//                if (itemMap != null && !itemMap.isEmpty()) {
//                    System.out.println("购物车列表如下:");
//                    for (BookInCar bookInCar : itemMap.values()) {
//                        bookInCarList.add(bookInCar);
//                        System.out.println(bookInCar);
//                    }
//                    carListResponse.setBookInCarList(bookInCarList);
//                    return carListResponse;
//                }
//            }
//        }
//        System.out.println("无数据");
//        return null;
//    }

}
