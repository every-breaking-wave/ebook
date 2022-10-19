package com.wave.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;


@Data
@Builder
public class KafkaMessage implements Serializable {
    private String status;
    private Integer id;
    private Integer userId;

    public KafkaMessage(String status, Integer id, Integer userId) {
        this.status = status;
        this.id = id;
        this.userId = userId;
    }
}
