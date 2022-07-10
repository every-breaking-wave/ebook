package com.wave.backend.dao.daoImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.github.dreamyoung.mprelation.AutoMapper;
import com.wave.backend.dao.OrderDao;
import com.wave.backend.mapper.OrderMapper;
import com.wave.backend.model.Order;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

@Component
public class OrderDaoImpl implements OrderDao {

    @Resource
    private OrderMapper orderMapper;

    @Resource
    private AutoMapper autoMapper;

    @Override
    public Integer saveOne(Order order) {
        if(order.getId() == null){
            return orderMapper.insert(order);
        }
        return orderMapper.updateById(order);
    }

    @Override
    public List<Order> getAll() {
        return orderMapper.selectList(new QueryWrapper<>());
    }

    @Override
    public List<Order> findAllByUserId(Integer userId) {
        QueryWrapper<Order> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userId", userId);
        return orderMapper.selectList(queryWrapper);
    }

    @Override
    public Order getVo(Order order) {
        return autoMapper.mapperEntity(order);
    }

    @Override
    public List<Order> getVos(List<Order> orders) {
        for (Order order : orders) {
            autoMapper.mapperEntity(order);
            for (int i = 0; i< order.getOrderItems().size(); i++){
                autoMapper.mapperEntity(order.getOrderItems().get(i));
            }
            autoMapper.mapperEntity(order.getOrderItems());
        }
        return orders;
    }
}