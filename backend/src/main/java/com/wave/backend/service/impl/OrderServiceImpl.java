package com.wave.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.github.dreamyoung.mprelation.AutoMapper;
import com.wave.backend.constant.CreateOrderStatus;
import com.wave.backend.controller.UserController;
import com.wave.backend.mapper.OrderitemMapper;
import com.wave.backend.mapper.UserMapper;
import com.wave.backend.model.Order;
import  com.wave.backend.mapper.OrderMapper;
import com.wave.backend.model.OrderItem;
import com.wave.backend.model.User;
import com.wave.backend.model.response.CreateOrderResponse;
import com.wave.backend.service.CarService;
import com.wave.backend.service.OrderItemService;
import  com.wave.backend.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

import static com.wave.backend.constant.UserConstant.USER_ID;
import static com.wave.backend.constant.UserConstant.USER_LOGIN_STATE;

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
    @Resource
    private UserController userController;

    @Resource
    private AutoMapper autoMapper;
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
        orderItemService.createOrderItem(carService.getCar(userId).getCarItems(),order.getId());
        log.info("created order successfully");

        //清空购物车
        carService.clearCar(userId);
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

    private List<Order> getVoOrders(List<Order> orders) {
        for (Order order : orders) {
            autoMapper.mapperEntity(order);
            for (int i = 0; i< order.getOrderItems().size(); i++){
                autoMapper.mapperEntity(order.getOrderItems().get(i));
            }
            autoMapper.mapperEntity(order.getOrderItems());
        }
        return orders;
    }

    @Override
    public List<Order> getOrdersById(Integer userId) {
        List<Order> orders;
        QueryWrapper<Order> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userId", userId);
        // 获取所有的 Order
        orders = orderMapper.selectList(queryWrapper);
        return getVoOrders(orders);
    }


    @Override
    //TODO : 搜索过滤
    public List<Order> searchOrders(String keyword, HttpServletRequest request) {
        log.info("Searching orders");
        List<Order> Orders;
        if(!userController.isAdmin(request)){
            Object o = request.getSession().getAttribute(USER_ID);
            Integer userId = (Integer) o;
            Orders = getOrdersById(userId);
        }
        else Orders =  getFullOrders();
        if(keyword.equals("default")){
            return Orders;
        }
        // 筛选出需要的订单 items
        for (int i = 0; i < Orders.size(); i++){
            for (int j = 0; j < Orders.get(i).getOrderItems().size(); j++){
                if (!Orders.get(i).getOrderItems().get(j).getBook().getBookName().contains(keyword) ){
                    Orders.get(i).getOrderItems().remove(j);
                    j--;
                }
            }
            if(Orders.get(i).getOrderItems().size() == 0){
                Orders.remove(i);
                i--;
            }
        }
        log.info(Orders.toString());
        log.info("get search orderItems");
        return Orders;
    }

    @Override
    public List<Order> searchUserOrders(String keyword, HttpServletRequest request) {
        log.info("Searching orders");

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user = (User) userObj;
        List<Order> Orders = getOrdersById(user.getId());
        if(keyword.equals("default")){
            return Orders;
        }
        // 筛选出需要的订单 items
        for (int i = 0; i < Orders.size(); i++){
            for (int j = 0; j < Orders.get(i).getOrderItems().size(); j++){
                if (!Orders.get(i).getOrderItems().get(j).getBook().getBookName().contains(keyword) ){
                    Orders.get(i).getOrderItems().remove(j);
                    j--;
                }
            }
            if(Orders.get(i).getOrderItems().size() == 0){
                Orders.remove(i);
                i--;
            }
        }
        log.info(Orders.toString());
        log.info("get search orderItems");
        return Orders;
    }

    @Override
    public List<Order> getFullOrders() {
        List<Order> orders;
        QueryWrapper<Order> queryWrapper = new QueryWrapper<>();
        // 获取所有的 Order
        orders = orderMapper.selectList(queryWrapper);

        List<Order> fullOrderItems = new ArrayList<>();
        for (Order order : orders) {
            autoMapper.mapperEntity(order);
            for (int i = 0; i< order.getOrderItems().size(); i++){
                autoMapper.mapperEntity(order.getOrderItems().get(i));
            }
            autoMapper.mapperEntity(order.getOrderItems());
        }
        log.info(fullOrderItems.toString());
        log.info("get full orderItems");
        return orders;
    }

    @Override
    public List<Order> getUserFullOrders(Integer userId) {
        QueryWrapper<Order> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userId", userId);
        List<Order> orders = orderMapper.selectList(queryWrapper);
        return getVoOrders(orders);
    }
}




