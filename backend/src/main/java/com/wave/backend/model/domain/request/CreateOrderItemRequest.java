package com.wave.backend.model.domain.request;

import com.wave.backend.model.domain.Book;
import com.wave.backend.model.domain.BookInCar;
import com.wave.backend.model.domain.CarItem;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class CreateOrderItemRequest implements Serializable {

    private static final long serialVersionUID = -6937919124813537741L;
    private Integer id;

    private List<CarItem> bookList;

    private Integer orderId;

}
