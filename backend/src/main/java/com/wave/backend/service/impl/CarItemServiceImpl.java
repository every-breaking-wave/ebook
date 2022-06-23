package com.wave.backend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wave.backend.model.CarItem;
import com.wave.backend.mapper.CaritemMapper;
import com.wave.backend.service.CarItemService;
import org.springframework.stereotype.Service;

/**
* @author Feng
* @description 针对表【caritem】的数据库操作Service实现
* @createDate 2022-05-15 13:49:47
*/
@Service
public class CarItemServiceImpl extends ServiceImpl<CaritemMapper, CarItem>
implements CarItemService {

}
