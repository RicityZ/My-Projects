/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package PosShabuSystem;

/**
 *
 * @author Simon
 */
public class Meats extends Menu{
    private int[] meatCount  = new int[15];

    public Meats() {
        for (int i = 0; i < meatMenu.length; i++) {
            itemPrice.put(meatMenu[i], meatPrice[i]);
        }
    }

    public String orderMeats(int index) {
        meatCount[index]++;
        incrementCount(meatMenu[index]);
        return meatMenu[index];
    }
    
}
