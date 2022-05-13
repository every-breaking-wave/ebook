package com.wave.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wave.backend.constant.CreateOrderItemStatus;
import com.wave.backend.constant.UserServiceStatus;
import com.wave.backend.mapper.BookMapper;
import com.wave.backend.mapper.OrderMapper;
import com.wave.backend.model.domain.*;
import  com.wave.backend.mapper.OrderitemMapper;
import com.wave.backend.model.domain.response.CreateOrderItemResponse;
import com.wave.backend.service.OrderItemService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
* @author Feng
* @description 针对表【orderitem】的数据库操作Service实现
* @createDate 2022-05-13 15:13:14
*/
@Service
public class OrderItemServiceImpl extends ServiceImpl<OrderitemMapper, OrderItem>
implements OrderItemService {

    @Resource
    private BookMapper bookMapper;
    @Resource
    private OrderMapper orderMapper;

    @Override
    public CreateOrderItemResponse createOrderItem(List<BookInCar> bookInCarList,Long orderId) {
        CreateOrderItemResponse createOrderItemResponse = new CreateOrderItemResponse();
        QueryWrapper<Order> orderQueryWrapper = new QueryWrapper<>();
        orderQueryWrapper.eq("id",orderId);
        // 判断order Id
        if(orderMapper.selectCount(orderQueryWrapper) == 0){
            createOrderItemResponse.setStatus(CreateOrderItemStatus.WRONG_ORDER_ID);
            return createOrderItemResponse;
        }
//        Order order = orderMapper.selectById(orderId);
        // 遍历购物车，创建订单
        for (BookInCar bookInCar : bookInCarList) {
            QueryWrapper<Book> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("id", bookInCar.getId());
            if (bookMapper.selectCount(queryWrapper) <= 0) {
                createOrderItemResponse.setStatus(CreateOrderItemStatus.WRONG_ORDER_ID);
                return createOrderItemResponse;
            }
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(orderId);
            orderItem.setBookId(bookInCar.getId());
            // 判断库存
            if(bookInCar.getCountInCar() > bookMapper.selectById(bookInCar.getId()).getInventory()){
                createOrderItemResponse.setStatus(CreateOrderItemStatus.WRONG_NUM);
                return createOrderItemResponse;
            }
            orderItem.setNum(bookInCar.getCountInCar());
            // 需要考虑更新order的金额吗
            this.save(orderItem);
        }
        createOrderItemResponse.setStatus(CreateOrderItemStatus.ORDERITEM_ALL_OK);
        return createOrderItemResponse;
    }
}
