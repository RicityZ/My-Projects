/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package PosShabuSystem;

/**
 *
 * @author Simon
 */
public class Pay {   
    double subtotal, vat, sc, total;
 
    public void settoltal(double a){
        subtotal = a;
    }
    
    public double calculatevat(){
        return vat = 7*subtotal/100;
        
    }
    
    public double calculatesc(){
        return sc = 10*subtotal/100;
        
    }
    
    public double calculatetotal(){
        return total = subtotal  + sc;
    }
}
