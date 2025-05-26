/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package PosShabuSystem;

/**
 *
 * @author Simon
 */
public class Order {
        protected String[] meatMenu = {
           "Paleron", "Wagyu A5 beef", "Shank Beef", 
           //pork
           "Pork Tenderloin","Pork Belly", "Ground Pork", "Pork Ribeye", 
           //chicken
           "Chicken Breast", "Ground Chicken",
           //other
           "Sausage", "Pink Sausage"
    };
    protected double[] meatPrice = { 150.0,190.0,190.0,120.0,190.0,140.0,110.0,120.0,95.0,80.0,85.0 };    
    
        protected String[] seafoodMenu  = {
           //(Fish)
           "Tilapia","Salmon","Snapper","White Bass","Dory",
           //(Shrimp)
           "White Shrimp","River Shrimp","Tiger Shrimp"
    };
    protected double[] seafoodPrice  = { 100.0,180.0,150.0,120.0,130.0,120.0,140.0,160.0};
    
     protected String[] noodleNvegieMenu  = {
           "Seaweed Kombu", "Veggie Set A", "Eggs" , "Glass noodles"
    };
    protected double[] noodleNvegiePrice  = {90.0, 100.0, 15.0, 50.0};
    
        protected String[] drinkMenu  = {
           "Water", "Thai Tea", "Orange Juice", "Green Tea", "Mixed Fruit Juice","Oishi", "Coca Cola"
    };
    protected double[] drinkPrice  = {20.0,30.0,40.0,30.0,50.0,35.0,25.0 };
    
        protected String[] dessertMenu  = {
           "Ice Cream", "Mango Sticky Rice", "Bua Loy", "Mixed Fruit"
    };
    protected double[] dessertPrice  = {40.0,60.0,50.0,45.0};
}
    
