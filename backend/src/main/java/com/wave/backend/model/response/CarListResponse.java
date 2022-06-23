package com.wave.backend.model.response;

import com.wave.backend.model.CarItem;
import lombok.Data;

import java.util.List;


@Data
public class CarListResponse {
    List <CarItem> bookInCarList;
}
