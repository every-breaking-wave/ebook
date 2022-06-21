package com.wave.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sun.org.apache.xpath.internal.operations.Or;
import com.wave.backend.constant.CreateOrderItemStatus;
import com.wave.backend.mapper.BookMapper;
import com.wave.backend.mapper.OrderMapper;
import com.wave.backend.model.domain.*;
import  com.wave.backend.mapper.OrderitemMapper;
import com.wave.backend.model.domain.response.CreateOrderItemResponse;
import com.wave.backend.model.domain.response.SearchBookResponse;
import com.wave.backend.service.OrderItemService;
import com.wave.backend.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
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

    @Override
    public CreateOrderItemResponse createOrderItem(List<CarItem> bookInCarList,Integer orderId) {
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

    @Override
    public List<OrderItem> getOrderItemsById(Integer orderId) {
        List<OrderItem> orderItems;
        QueryWrapper<OrderItem> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("orderId", orderId);
        orderItems =  orderitemMapper.selectList(queryWrapper);
        if(orderItems == null){
            log.error("failed, no items of such orderId");
        }
        log.info("succeed, get orderItems by id");
        return orderItems;
    }

    public List<DetailOrderItem> transToDetailOrderItems(List<OrderItem> orderItems) {
        List<DetailOrderItem> detailOrderItems = new ArrayList<>();
        for (OrderItem orderItem : orderItems) {
            DetailOrderItem detailOrderItem = getDetailOrderItem(orderItem);
            if(detailOrderItem == null)
                continue;
            detailOrderItems.add(detailOrderItem);
        }
        return detailOrderItems;
    }


    @Override
    public List<List<DetailOrderItem>> getFullOrderItems() {
        List<Order> orders;
        QueryWrapper<Order> queryWrapper = new QueryWrapper<>();
        // 获取所有的 Order
        orders = orderMapper.selectList(queryWrapper);
        List<List<DetailOrderItem>> fullOrderItems = new ArrayList<>();
        for (Order order : orders) {
            fullOrderItems.add(transToDetailOrderItems(getOrderItemsById(order.getId())));
        }
        log.info(fullOrderItems.toString());
        log.info("get full orderItems");
        return fullOrderItems;
    }

    @Override
    public List<List<DetailOrderItem>> getUserFullOrderItems(Integer userId) {
        QueryWrapper<Order> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userId", userId);
        List<Order> orders = orderMapper.selectList(queryWrapper);
        List<List<DetailOrderItem>> fullOrderItems = new ArrayList<>();
        for (Order order : orders) {
            fullOrderItems.add(transToDetailOrderItems(getOrderItemsById(order.getId())));
        }
        log.info(fullOrderItems.toString());
        log.info("get user full orderItems");
        return fullOrderItems;
    }


    @Override
    public DetailOrderItem getDetailOrderItem(OrderItem orderItem) {
        Book book = bookMapper.selectById(orderItem.getBookId());
        Order order = orderMapper.selectById(orderItem.getOrderId());
        DetailOrderItem detailOrderItem = new DetailOrderItem();
        detailOrderItem.setOrderId(orderItem.getOrderId());
        detailOrderItem.setNum(orderItem.getNum());
        detailOrderItem.setBookName(book.getBookName());
        detailOrderItem.setCreateTime(order.getCreateTime());
        detailOrderItem.setPrice(book.getPrice());
        return detailOrderItem;
    }

    @Override
    public List<List<DetailOrderItem>> searchOrderItems(String keyword) {
        log.info("Searching orders");
        List<List<DetailOrderItem>> fullOrderItems = getFullOrderItems();
        if(keyword.equals("default")){
            return fullOrderItems;
        }
        // 筛选出需要的书本 items
        for (int i = 0; i < fullOrderItems.size(); i++){
            for (int j = 0; j < fullOrderItems.get(i).size(); j++){
                if (!fullOrderItems.get(i).get(j).getBookName().contains(keyword) ){
                    fullOrderItems.get(i).remove(j);
                    j--;
                }
            }
            if(fullOrderItems.get(i).size() == 0){
                fullOrderItems.remove(i);
                i--;
            }
        }
        log.info(fullOrderItems.toString());
        log.info("get full orderItems");
        return fullOrderItems;
    }
}
