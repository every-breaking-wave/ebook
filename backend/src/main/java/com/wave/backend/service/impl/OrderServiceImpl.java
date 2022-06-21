package com.wave.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sun.org.apache.xpath.internal.operations.Or;
import com.wave.backend.constant.CreateOrderStatus;
import com.wave.backend.controller.ProductCartController;
import com.wave.backend.mapper.OrderitemMapper;
import com.wave.backend.mapper.UserMapper;
import  com.wave.backend.model.domain.Order;
import  com.wave.backend.mapper.OrderMapper;
import com.wave.backend.model.domain.OrderItem;
import com.wave.backend.model.domain.User;
import com.wave.backend.model.domain.response.CreateOrderResponse;
import com.wave.backend.service.CarService;
import com.wave.backend.service.OrderItemService;
import  com.wave.backend.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.omg.CORBA.OMGVMCID;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
* @author Feng
* @description 针对表【order】的数据库操作Service实现
* @createDate 2022-05-13 15:13:11
*/
@Service
@Slf4j
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Order>
implements OrderService{

    @Resource
    private UserMapper userMapper;
    @Resource
    private OrderMapper orderMapper;
    @Resource
    private OrderItemService orderItemService;

    @Resource
    private OrderitemMapper orderitemMapper;
    @Resource
    private CarService carService;
    @Override
    public CreateOrderResponse createOrder(Integer userId) {
        log.info("Creating Order");

        CreateOrderResponse createOrderResponse = new CreateOrderResponse();

        User user = userMapper.selectById(userId);
        // 查询 UserId 是否存在
        if (user == null) {
            createOrderResponse.setStatus(CreateOrderStatus.WRONG_USER_ID);
            return createOrderResponse;
        }

        Order order = new Order();
        order.setUserId(user.getId());
        orderMapper.insert(order);

        createOrderResponse.setStatus(CreateOrderStatus.ORDER_ALL_OK);
        createOrderResponse.setId(order.getId());
        orderItemService.createOrderItem(carService.getCarList(userId),order.getId());
        log.info("created order successfully");

        //清空购物车
        if(carService.clearCar(userId)){

        }

        return createOrderResponse;
    }

    @Override
    public boolean delOrder(Integer userId) {
        if(orderMapper.selectById(userId) != null){
            log.error("no such user");
            return false;
        }

        QueryWrapper<Order> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userId", userId);
        Order order = orderMapper.selectOne(queryWrapper);
        QueryWrapper<OrderItem> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("orderId", order.getId());
        orderitemMapper.delete(queryWrapper1);
        orderMapper.delete(queryWrapper);
        log.info("del Order !");
        return true;
    }

    @Override
    public List<Order> getOrdersById(Integer userId) {
        List<Order> orders;
        QueryWrapper<Order> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userId", userId);
        orders = orderMapper.selectList(queryWrapper);
        log.info("get orders by id");
        return orders;
    }
}
