package com.wave.backend.controller;

import com.wave.backend.model.domain.Book;
import com.wave.backend.model.domain.BookInCar;
import com.wave.backend.model.domain.request.CreateOrderItemRequest;
import com.wave.backend.model.domain.request.CreateOrderRequest;
import com.wave.backend.model.domain.response.CreateOrderItemResponse;
import com.wave.backend.model.domain.response.CreateOrderResponse;
import com.wave.backend.service.OrderItemService;
import com.wave.backend.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/orderitem")
public class OrderItemController {

    @Resource
    private OrderItemService orderItemService;


    @PostMapping("/create")
    public CreateOrderItemResponse createOrder(@RequestBody CreateOrderItemRequest createOrderItemRequest) {

        if (createOrderItemRequest == null)
            return null;
        Long orderId =  createOrderItemRequest.getOrderId();
        List<BookInCar> bookList = createOrderItemRequest.getBookList();

        return orderItemService.createOrderItem(bookList, orderId);
    }
}
