/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package PosShabuSystem;

import java.util.HashMap;

/**
 *
 * @author Simon
 */
public class Menu extends Order {
    private HashMap<String, Integer> itemCount = new HashMap<String, Integer>();
    public  HashMap<String, Double> itemPrice = new HashMap<String, Double>();
    private int orderId = 16;
            protected void incrementCount(String itemName) {
        if (itemCount.containsKey(itemName)) {
            int count = itemCount.get(itemName);
            itemCount.put(itemName, count + 1);
        } else {
            itemCount.put(itemName, 1);
        }
    }
    public HashMap<String, Integer> getItemCount() {
        return itemCount;
    }

    public double getItemPrice(String itemName) {
        return itemPrice.get(itemName);
    }

    public String generateOrderId() {
        return "Order ID: " + orderId;
    }
    
}
