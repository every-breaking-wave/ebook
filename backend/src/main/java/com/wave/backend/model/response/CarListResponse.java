package com.wave.backend.model.response;

import com.wave.backend.model.CartItem;
import lombok.Data;

import java.util.List;


@Data
public class CarListResponse {
    List <CartItem> bookInCarList;
}
