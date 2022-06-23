package com.wave.backend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wave.backend.model.Order;
import com.wave.backend.model.OrderItem;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
* @author Feng
* @description 针对表【order】的数据库操作Mapper
* @createDate 2022-05-13 15:13:11
* @Entity generator.domain.Order
*/
public interface OrderMapper extends BaseMapper<Order> {
    @Results({
            @Result(column = "orderId", property = "orderId"),//必须要加，否则user实体中userId为null
            @Result(column = "orderId", property = "",//
                    one = @One(select = "com.wave.backend.mapper..selectById"))
    })
    @Select("select * from orderItem")
    List<OrderItem> findAllUserAndOrders();

}
