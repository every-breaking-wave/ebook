package com.wave.backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.wave.backend.model.domain.Book;
import com.wave.backend.model.domain.BookInCar;
import com.wave.backend.model.domain.OrderItem;
import com.wave.backend.model.domain.response.CreateOrderItemResponse;

import java.util.List;

/**
* @author Feng
* @description 针对表【orderitem】的数据库操作Service
* @createDate 2022-05-13 15:13:14
*/
public interface OrderItemService extends IService<OrderItem> {

    CreateOrderItemResponse createOrderItem(List<BookInCar> bookInCarList, Long orderId);

}
