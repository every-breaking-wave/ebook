package com.wave.backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.wave.backend.model.domain.CarItem;
import com.wave.backend.model.domain.DetailOrderItem;
import com.wave.backend.model.domain.OrderItem;
import com.wave.backend.model.domain.response.CreateOrderItemResponse;

import java.util.List;

/**
* @author Feng
* @description 针对表【orderitem】的数据库操作Service
* @createDate 2022-05-13 15:13:14
*/
public interface OrderItemService extends IService<OrderItem> {

    CreateOrderItemResponse createOrderItem(List<CarItem> bookInCarList, Integer orderId);

    List<OrderItem> getOrderItemsById(Integer orderId);

    List<List<DetailOrderItem>> getFullOrderItems();

    List<List<DetailOrderItem>> getUserFullOrderItems(Integer userId);

    DetailOrderItem getDetailOrderItem(OrderItem orderItem);

    List<List<DetailOrderItem>> searchOrderItems(String keyword);
}
