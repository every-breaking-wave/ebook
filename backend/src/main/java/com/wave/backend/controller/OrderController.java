package com.wave.backend.controller;



import com.wave.backend.model.domain.request.CreateOrderRequest;
import com.wave.backend.model.domain.response.CreateOrderResponse;
import com.wave.backend.model.domain.response.GetBookResponse;
import com.wave.backend.service.BookService;
import com.wave.backend.service.OrderService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;

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

        String userAccount =  createOrderRequest.getUserAccount();

        return orderService.createOrder(userAccount);
    }

}
