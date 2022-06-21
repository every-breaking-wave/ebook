package com.wave.backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.wave.backend.model.domain.Car;
import com.wave.backend.model.domain.CarItem;

import java.util.List;

/**
* @author Feng
* @description 针对表【car】的数据库操作Service
* @createDate 2022-05-15 13:49:40
*/
public interface CarService extends IService<Car> {

    List<CarItem> getCarList(Integer userId);

    boolean clearCar(Integer userId);
}
