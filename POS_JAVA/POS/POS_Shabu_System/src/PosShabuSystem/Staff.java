/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package PosShabuSystem;

import javax.swing.JFrame;

/**
 *
 * @author Simon
 */
public class Staff extends User {
    public void openStaffMenu(String ID1, String NAME1) {
        StaffMenu staffMenu = new StaffMenu(ID1, NAME1);

        staffMenu.setVisible(true);

        staffMenu.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
}
