package com.wave.backend.service;

import com.baomidou.mybatisplus.extension.service.IService;

import com.wave.backend.model.domain.Order;
import com.wave.backend.model.domain.response.CreateOrderResponse;

import java.util.Date;


/**
* @author Feng
* @description 针对表【order】的数据库操作Service
* @createDate 2022-05-13 15:13:11
*/
public interface OrderService extends IService<Order> {

    CreateOrderResponse createOrder(String userAccount);
}
