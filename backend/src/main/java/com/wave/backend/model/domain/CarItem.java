package com.wave.backend.model.domain;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.math.BigDecimal;
import lombok.Data;

/**
 *
 * @TableName caritem
 */
@TableName(value ="caritem")
@Data
public class CarItem implements Serializable {
    /**
     *
     */
    @TableId
    private Integer id;

    /**
     *
     */
    private Integer carId;

    /**
     *
     */
    private Integer countInCar;

    /**
     *
     */
    private BigDecimal price;

    /**
     *
     */
    private Integer bookId;

    /**
     *
     */
    private String cover;

    /**
     *
     */
    private String bookName;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        CarItem other = (CarItem) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
                && (this.getCarId() == null ? other.getCarId() == null : this.getCarId().equals(other.getCarId()))
                && (this.getCountInCar() == null ? other.getCountInCar() == null : this.getCountInCar().equals(other.getCountInCar()))
                && (this.getPrice() == null ? other.getPrice() == null : this.getPrice().equals(other.getPrice()))
                && (this.getBookId() == null ? other.getBookId() == null : this.getBookId().equals(other.getBookId()))
                && (this.getCover() == null ? other.getCover() == null : this.getCover().equals(other.getCover()))
                && (this.getBookName() == null ? other.getBookName() == null : this.getBookName().equals(other.getBookName()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getCarId() == null) ? 0 : getCarId().hashCode());
        result = prime * result + ((getCountInCar() == null) ? 0 : getCountInCar().hashCode());
        result = prime * result + ((getPrice() == null) ? 0 : getPrice().hashCode());
        result = prime * result + ((getBookId() == null) ? 0 : getBookId().hashCode());
        result = prime * result + ((getCover() == null) ? 0 : getCover().hashCode());
        result = prime * result + ((getBookName() == null) ? 0 : getBookName().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", carId=").append(carId);
        sb.append(", countInCar=").append(countInCar);
        sb.append(", price=").append(price);
        sb.append(", bookId=").append(bookId);
        sb.append(", cover=").append(cover);
        sb.append(", bookName=").append(bookName);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}