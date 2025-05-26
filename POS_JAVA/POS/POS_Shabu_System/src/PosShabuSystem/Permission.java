/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package PosShabuSystem;

/**
 *
 * @author Simon
 */
public class Permission {
    void openStaffMenu(String ID1, String NAME1){
        StaffMenu staffMenu = new StaffMenu(ID1, NAME1);
        staffMenu.setVisible(true);
        staffMenu.setDefaultCloseOperation(javax.swing.JFrame.DISPOSE_ON_CLOSE);
    }
    
    // Method ManagerMenu
    void openManagerMenu(String ID1, String NAME1){
        ManagerMenu managerMenu = new ManagerMenu(ID1, NAME1);
        managerMenu.setVisible(true);
        managerMenu.setDefaultCloseOperation(javax.swing.JFrame.DISPOSE_ON_CLOSE);
    }
    
    void navigateMenu(String ID, String NAME, String PERMISSION) {
        if (PERMISSION.equalsIgnoreCase("manager") && ID.startsWith("M")) {
            openManagerMenu(ID, NAME);  
        } else if (PERMISSION.equalsIgnoreCase("staff") && ID.startsWith("S")) {
            openStaffMenu(ID, NAME);  
        } else {
            System.out.println("Invalid ID format or permission mismatch.");
        }
    }
}
