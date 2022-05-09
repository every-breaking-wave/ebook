package com.wave.backend.model.domain.request;

import lombok.Data;

import java.io.Serializable;

@Data
public class SearchBookRequest implements Serializable {
    private static final long serialVersionUID = 3038467148739716245L;
    private  String  searchKey;
}
