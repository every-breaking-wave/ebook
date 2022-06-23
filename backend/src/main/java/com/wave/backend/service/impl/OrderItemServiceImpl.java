package com.wave.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.github.dreamyoung.mprelation.AutoMapper;
import com.wave.backend.constant.CreateOrderItemStatus;
import com.wave.backend.mapper.BookMapper;
import com.wave.backend.mapper.OrderMapper;
import com.wave.backend.model.Book;
import com.wave.backend.model.CarItem;
import com.wave.backend.model.Order;
import com.wave.backend.model.OrderItem;
import  com.wave.backend.mapper.OrderitemMapper;
import com.wave.backend.model.response.CreateOrderItemResponse;
import com.wave.backend.service.OrderItemService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
* @author Feng
* @description 针对表【orderitem】的数据库操作Service实现
* @createDate 2022-05-13 15:13:14
*/
@Service
@Slf4j
public class OrderItemServiceImpl extends ServiceImpl<OrderitemMapper, OrderItem>
implements OrderItemService {

    @Resource
    private BookMapper bookMapper;
    @Resource
    private OrderMapper orderMapper;
    @Resource
    private OrderitemMapper orderitemMapper;
    @Resource
    private AutoMapper autoMapper;

    @Override
    public CreateOrderItemResponse createOrderItem(List<CarItem> bookInCarList, Integer orderId) {
        CreateOrderItemResponse createOrderItemResponse = new CreateOrderItemResponse();
        QueryWrapper<Order> orderQueryWrapper = new QueryWrapper<>();
        orderQueryWrapper.eq("id",orderId);
        // 判断order Id
        if(orderMapper.selectCount(orderQueryWrapper) == 0){
            createOrderItemResponse.setStatus(CreateOrderItemStatus.WRONG_ORDER_ID);
            return createOrderItemResponse;
        }
        Order order = orderMapper.selectById(orderId);
        System.out.println("订单列表如下:");
        // 遍历购物车，创建订单
        for (CarItem carItem : bookInCarList) {
            QueryWrapper<Book> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("id", carItem.getBookId());
            if (bookMapper.selectCount(queryWrapper) <= 0) {
                createOrderItemResponse.setStatus(CreateOrderItemStatus.WRONG_ORDER_ID);
                return createOrderItemResponse;
            }
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(orderId);
            orderItem.setBookId(carItem.getBookId());
            orderItem.setPrice(carItem.getPrice());
            Book bookInRepo = bookMapper.selectById(carItem.getBookId());
            // 判断库存
            if(carItem.getCountInCar() > bookInRepo.getInventory()){
                createOrderItemResponse.setStatus(CreateOrderItemStatus.WRONG_NUM);
                return createOrderItemResponse;
            }
            //更新库存
            bookInRepo.setInventory(bookInRepo.getInventory() - carItem.getCountInCar());
            bookMapper.updateById(bookInRepo);
            orderItem.setNum(carItem.getCountInCar());
            // 需要考虑更新order的金额吗
            this.save(orderItem);
            System.out.println(orderItem);
        }
        createOrderItemResponse.setStatus(CreateOrderItemStatus.ORDERITEM_ALL_OK);
        return createOrderItemResponse;

    }


}
