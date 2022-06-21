package com.wave.backend.controller;



import com.wave.backend.model.domain.DetailOrderItem;
import com.wave.backend.model.domain.Order;
import com.wave.backend.model.domain.OrderItem;
import com.wave.backend.model.domain.request.CreateOrderRequest;
import com.wave.backend.model.domain.response.CreateOrderResponse;
import com.wave.backend.model.domain.response.GetBookResponse;
import com.wave.backend.model.domain.response.SearchBookResponse;
import com.wave.backend.service.BookService;
import com.wave.backend.service.OrderService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/order")
public class OrderController {

    @Resource
    private OrderService orderService;


    @PostMapping("/create")
    public CreateOrderResponse createOrder(@RequestBody CreateOrderRequest createOrderRequest) {

        if (createOrderRequest == null)
            return null;

        Integer userId =  createOrderRequest.getUserId();

        return orderService.createOrder(userId);
    }

    @PostMapping("/get/{userId}")
    public List<Order> getOrdersById(@PathVariable Integer userId){
        return orderService.getOrdersById(userId);
    }




}
