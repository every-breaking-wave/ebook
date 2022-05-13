package com.wave.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sun.org.apache.xpath.internal.operations.Or;
import com.wave.backend.constant.CreateOrderStatus;
import com.wave.backend.mapper.UserMapper;
import  com.wave.backend.model.domain.Order;
import  com.wave.backend.mapper.OrderMapper;
import com.wave.backend.model.domain.User;
import com.wave.backend.model.domain.response.CreateOrderResponse;
import  com.wave.backend.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.omg.CORBA.OMGVMCID;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

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
    @Override
    public CreateOrderResponse createOrder(String userAccount) {
        log.info("Creating Order");

        CreateOrderResponse createOrderResponse = new CreateOrderResponse();

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userAccount",userAccount);
        User user = userMapper.selectOne(queryWrapper);
        // 查询 UserAccount 是否存在
        if (userMapper.selectCount(queryWrapper) <= 0) {
            createOrderResponse.setStatus(CreateOrderStatus.WRONG_USER_ID);
            return createOrderResponse;
        }

        Order order = new Order();
        order.setUserId(user.getId());
//        this.save(order);
        orderMapper.insert(order);

        createOrderResponse.setStatus(CreateOrderStatus.ORDER_ALL_OK);
        log.info("created order successfully");
        createOrderResponse.setId(order.getId());
        return createOrderResponse;
    }
}
