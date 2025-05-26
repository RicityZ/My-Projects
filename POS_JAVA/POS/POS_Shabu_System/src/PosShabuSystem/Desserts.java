/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package PosShabuSystem;

/**
 *
 * @author Simon
 */
public class Desserts extends Menu{
    private int[] dessertCount  = new int[15];

    public Desserts() {
        for (int i = 0; i < dessertMenu.length; i++) {
            itemPrice.put(dessertMenu[i], dessertPrice[i]);
        }
    }

    public String orderDesserts(int index) {
        dessertCount[index]++;
        incrementCount(dessertMenu[index]);
        return dessertMenu[index];
    }
    
}
