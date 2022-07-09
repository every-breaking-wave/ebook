package com.wave.backend.dao;

import com.wave.backend.model.Order;

import java.util.List;

public interface OrderDao {

    Integer saveOne(Order order);

    List<Order> getAll();

    List<Order> findAllByUserId(Integer userId);

    Order getVo(Order order);

    List<Order> getVos(List<Order> orders);
}
