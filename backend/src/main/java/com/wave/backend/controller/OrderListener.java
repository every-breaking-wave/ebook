package com.wave.backend.controller;

import com.wave.backend.model.response.CreateOrderResponse;
import com.wave.backend.service.OrderService;
import lombok.Data;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@Data
public class OrderListener {

    @Autowired
    private OrderService orderService;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private WebSocketServer ws;

    @KafkaListener(topics = "topic1", groupId = "id_test")
    public void topicListener(ConsumerRecord<String, String> record){
        String value = record.value();
        CreateOrderResponse createOrderResponse =  orderService.createOrder(Integer.valueOf(value));
        createOrderResponse.setId(Integer.valueOf(value));
        System.out.println("userId: " + value);
        kafkaTemplate.send("topic2", "key", createOrderResponse.toString());
    }

    @KafkaListener(topics = "topic2", groupId = "id_test")
    public void topic2Listener(ConsumerRecord<String, String> record) {
        String value = record.value();
        System.out.println("topic2 get message, create_order_response : " + value);
        ws.sendMessageToUser(value, "Order created successfully !");
    }

}
