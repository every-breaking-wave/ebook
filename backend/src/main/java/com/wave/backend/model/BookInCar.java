package com.wave.backend.model;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
public class BookInCar implements Serializable {
    /**
     *
     */
    @TableId
    private Integer id;

    /**
     *
     */
    private String bookName;

    /**
     * 封面图片
     */
    private String cover;

    /**
     *
     */
    private BigDecimal price;

    /**
     *
     */
    private String author;
//
//    /**
//     * 书本库存
//     */
//    private Integer inventory;

//    /**
//     * 书本简介
//     */
//    private String bookDesciption;

    /**
     * categrary
     */
    private String category;

    private Integer countInCar;
}
