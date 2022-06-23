package com.wave.backend.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.wave.backend.mapper.OrderMapper;
import com.wave.backend.mapper.OrderitemMapper;
import com.wave.backend.model.CarItem;
import com.wave.backend.model.Order;
import com.wave.backend.model.OrderItem;
import com.wave.backend.model.request.CreateOrderItemRequest;
import com.wave.backend.model.response.CreateOrderItemResponse;
import com.wave.backend.service.OrderItemService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/orderitem")
public class OrderItemController {

    @Resource
    private OrderItemService orderItemService;
    @Resource
    private OrderMapper orderMapper;
    @Resource
    private OrderitemMapper orderitemMapper;


    @PostMapping("/create")
    public CreateOrderItemResponse createOrder(@RequestBody CreateOrderItemRequest createOrderItemRequest) {

        if (createOrderItemRequest == null)
            return null;
        Integer orderId =  createOrderItemRequest.getOrderId();
        List<CarItem> bookList = createOrderItemRequest.getBookList();

        return orderItemService.createOrderItem(bookList, orderId);
    }

    @PostMapping("/list")
    public List<OrderItem> GetOrderItemList(Integer userId){
        //TODO: 通过userId得到orderId, 后续可改进
        QueryWrapper<OrderItem> queryWrapper = new QueryWrapper<>();
        QueryWrapper<Order> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("userId", userId);
        Order order = orderMapper.selectOne(queryWrapper1);
        queryWrapper.eq("orderId",order.getId());

        List<OrderItem> orderItems = orderitemMapper.selectList(queryWrapper);
        return orderItems;
    }


}
