/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package PosShabuSystem;

/**
 *
 * @author Simon
 */
public class Drinks extends Menu{
    private int[] drinkCount  = new int[15];

    public Drinks() {
        for (int i = 0; i < drinkMenu.length; i++) {
            itemPrice.put(drinkMenu[i], drinkPrice[i]);
        }
    }

    public String orderDrinks(int index) {
        drinkCount[index]++;
        incrementCount(drinkMenu[index]);
        return drinkMenu[index];
    }
}
