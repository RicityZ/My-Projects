/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package PosShabuSystem;

import PosShabuSystem.Manager;
import PosShabuSystem.Login;
import PosShabuSystem.Permission;
import PosShabuSystem.Staff;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JOptionPane;

/**
 *
 * @author Simon
 */
public class User {
    String ID,NAME,USERNAME,PASSWORD,PERMISSION,line;
    Permission x;
    File F = new File("O:\\NetBeans-24\\POS_Shabu_System");  
    
public void checkAccount(String username, String password) {
    RandomAccessFile RAF = null;
    try {
        RAF = new RandomAccessFile(F+"\\Account.txt", "rw");
        int found = 0;
        while ((line = RAF.readLine()) != null) {
            String[] fields = line.split(":");
            if (fields.length == 5) {
                ID = fields[0];
                NAME = fields[1];
                USERNAME = fields[2];
                PASSWORD = fields[3];
                PERMISSION = fields[4];

                if (username.equalsIgnoreCase(USERNAME) && password.equals(PASSWORD)) {
                    found = 1;
                } else {
                    found = 0;
                    PERMISSION = null;
                }

                if (found == 1) {
                    if (PERMISSION.equalsIgnoreCase("manager") && ID.startsWith("M")) {
                        Permission permission = new Permission();
                        permission.openManagerMenu(ID, NAME); 
                    } else if (PERMISSION.equalsIgnoreCase("staff") && ID.startsWith("S")) {
                        Permission permission = new Permission();
                        permission.openStaffMenu(ID, NAME); 
                    } else {
                        JOptionPane.showMessageDialog(null, "Invalid ID format for " + PERMISSION);
                    }
                    return;
                }
            }
        }
        JOptionPane.showMessageDialog(null, "Login Error: Invalid username or password");  // แจ้งข้อความหากล็อกอินไม่สำเร็จ
    } catch (FileNotFoundException ex) {
        Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
    } catch (IOException ex) {
        Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
    } finally {
        if (RAF != null) {
            try {
                RAF.close();
            } catch (IOException ex) {
                Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
  }

    public void createDir() {
        File dir = new File("Data");
        if (!dir.exists()) {
            if (dir.mkdir()) {
                System.out.println("Directory created successfully.");
            } else {
                System.out.println("Failed to create directory.");
            }
        } else {
            System.out.println("Directory already exists.");
        }
    }
    public void readFile() {
        
    }
}


