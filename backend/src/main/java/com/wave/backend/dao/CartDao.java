package com.wave.backend.dao;

import com.wave.backend.model.Cart;



public interface CartDao {
    Integer saveOne(Cart cart);

    Cart findByUserId(Integer userId);

    Cart getVo(Cart cart);
}
