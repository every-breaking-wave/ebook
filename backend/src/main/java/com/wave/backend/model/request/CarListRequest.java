package com.wave.backend.model.request;

import lombok.Data;

import java.io.Serializable;

@Data
public class CarListRequest implements Serializable {

    private static final long serialVersionUID = 1530358749934584714L;

    private Integer userId;
}
