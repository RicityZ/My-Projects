/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package PosShabuSystem;

/**
 *
 * @author Simon
 */
public class NoodlesNVeggie extends Menu{
    private int[] noodleNvegieCount  = new int[15];

    public NoodlesNVeggie() {
        for (int i = 0; i < noodleNvegieMenu.length; i++) {
            itemPrice.put(noodleNvegieMenu[i], noodleNvegiePrice[i]);
        }
    }

    public String orderNoodlesNVeggie(int index) {
        noodleNvegieCount[index]++;
        incrementCount(noodleNvegieMenu[index]);
        return noodleNvegieMenu[index];
    }
    
}
