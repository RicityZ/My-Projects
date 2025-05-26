/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package PosShabuSystem;

/**
 *
 * @author Simon
 */
public class Seafoods extends Menu{
    private int[] seafoodCount  = new int[15];

    public Seafoods() {
        for (int i = 0; i < seafoodMenu.length; i++) {
            itemPrice.put(seafoodMenu[i], seafoodPrice[i]);
        }
    }

    public String orderSeafoods(int index) {
        seafoodCount[index]++;
        incrementCount(seafoodMenu[index]);
        return seafoodMenu[index];
    }
    
}
