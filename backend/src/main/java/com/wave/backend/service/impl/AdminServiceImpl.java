package com.wave.backend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wave.backend.model.domain.Admin;
import com.wave.backend.service.AdminService;
import com.wave.backend.mapper.AdminMapper;
import org.springframework.stereotype.Service;

/**
* @author Feng
* @description 针对表【admin(用户表)】的数据库操作Service实现
* @createDate 2022-05-09 17:46:17
*/
@Service
public class AdminServiceImpl extends ServiceImpl<AdminMapper, Admin>
implements AdminService{

}
