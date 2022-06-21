package com.wave.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wave.backend.mapper.CaritemMapper;
import com.wave.backend.model.domain.Car;
import com.wave.backend.mapper.CarMapper;
import com.wave.backend.model.domain.CarItem;
import com.wave.backend.model.domain.response.CarListResponse;
import com.wave.backend.service.CarService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
* @author Feng
* @description 针对表【car】的数据库操作Service实现
* @createDate 2022-05-15 13:49:40
*/
@Service
public class CarServiceImpl extends ServiceImpl<CarMapper, Car>
implements CarService{
    @Resource
    private CarMapper carMapper;
    @Resource
    private CaritemMapper caritemMapper;

    @Override
    public List<CarItem> getCarList(Integer userId) {
        QueryWrapper<CarItem> queryWrapper = new QueryWrapper<>();
        QueryWrapper<Car> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("userId",userId);
        queryWrapper.eq("carId",carMapper.selectOne(queryWrapper1).getId());
        List<CarItem> cartItems = new ArrayList<>();
        return  caritemMapper.selectList(queryWrapper);
    }

    @Override
    public boolean clearCar(Integer userId) {
        QueryWrapper<Car> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userId",userId);
        Car car = carMapper.selectOne(queryWrapper);
        QueryWrapper<CarItem> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("carId",car.getId());
        List<CarItem> delList = caritemMapper.selectList(queryWrapper1);
        caritemMapper.delete(queryWrapper1);
        return  true;
    }
}
