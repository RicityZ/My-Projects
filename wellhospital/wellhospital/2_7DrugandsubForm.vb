Imports System.Data.SqlClient
Imports System.Windows.Forms.VisualStyles.VisualStyleElement

Public Class DrugandsubForm
    Public Class Form2
        ' Define textboxes or labels where you want to show Patient ID and Med ID
        Public Property PatientIDTextBox As TextBox
        Public Property MedIDTextBox As TextBox

        ' Other form logic here
    End Class


    ' Assuming you have a ComboBox named 'comboBoxDrugName'
    ' and a TextBox named 'textBoxDrugID'

    Private Sub buttonSearch_Click(sender As Object, e As EventArgs) Handles Button1.Click
        ' รับชื่อยาที่เลือกจาก ComboBox
        Dim selectedDrugName As String = TimePicker.SelectedItem.ToString()

        ' สร้างคำสั่ง SQL เพื่อค้นหา Drug_ID ตาม Drug_name ที่เลือก
        Dim query As String = "SELECT Drug_ID FROM Drug WHERE Drug_name = @DrugName"

        ' ใช้ SqlConnection และ SqlCommand ในการเชื่อมต่อกับฐานข้อมูล
        Using conn As New SqlConnection("Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True")
            Dim cmd As New SqlCommand(query, conn)
            cmd.Parameters.AddWithValue("@DrugName", selectedDrugName)

            conn.Open()
            Dim reader As SqlDataReader = cmd.ExecuteReader()

            If reader.Read() Then
                ' แสดง Drug_ID ที่พบใน TextBox
                drugIDdd.Text = reader("Drug_ID").ToString()
            Else
                MessageBox.Show("ไม่พบ Drug ID ที่ตรงกับชื่อที่เลือก")
            End If

            reader.Close()
            conn.Close()
        End Using
    End Sub
    Private Sub buttonInsert1_Click(sender As Object, e As EventArgs) Handles Button2.Click
        ' ตรวจสอบว่ามีการกรอก Drug ID หรือไม่


        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = "INSERT INTO Med_Drug_Detail (Med_ID, Drug_ID, Med_dosage, Med_start, Med_end, Med_method, Med_drug_qty) " &
                              "VALUES (@MedID, @DrugID, @Dosage, @StartDate, @EndDate, @Method, @Quantity)"

        Using conn As New SqlConnection(connectionString)
            Using cmd As New SqlCommand(query, conn)
                ' กำหนดค่าจากฟอร์มที่ถูกกรอกลงใน SQL
                cmd.Parameters.AddWithValue("@MedID", MedIDTextBox.Text) ' Med_ID
                cmd.Parameters.AddWithValue("@DrugID", drugIDdd.Text) ' Drug_ID
                cmd.Parameters.AddWithValue("@Dosage", TextBox3.Text) ' Dosage
                cmd.Parameters.AddWithValue("@StartDate", DateTimePicker1.Value) ' Start Date
                cmd.Parameters.AddWithValue("@EndDate", DateTimePicker2.Value) ' End Date
                cmd.Parameters.AddWithValue("@Method", TextBox7.Text) ' Method
                cmd.Parameters.AddWithValue("@Quantity", TextBox8.Text) ' Quantity

                Try
                    ' เปิดการเชื่อมต่อฐานข้อมูล
                    conn.Open()

                    ' รันคำสั่ง SQL
                    cmd.ExecuteNonQuery()

                    ' แสดงข้อความเมื่อบันทึกสำเร็จ
                    MessageBox.Show("Data inserted successfully!")
                     
                Catch ex As Exception
                    ' แสดงข้อความเมื่อเกิดข้อผิดพลาด
                    MessageBox.Show("Error: " & ex.Message)

                Finally
                    ' ปิดการเชื่อมต่อฐานข้อมูล
                    conn.Close()
                End Try
            End Using
        End Using
    End Sub
    Private Sub ButtonInsert2_Click(sender As Object, e As EventArgs) Handles Button2.Click
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim connection As New SqlConnection(connectionString)

        Try
            ' เปิดการเชื่อมต่อ
            connection.Open()

            ' ตรวจสอบว่ามีค่า Med_ID ใน TextBox หรือไม่
            Dim medID As Integer
            If Not Integer.TryParse(MedIDTextBox.Text, medID) Then
                MessageBox.Show("กรุณาใส่ค่า Med ID ที่ถูกต้อง")
                Exit Sub
            End If

            ' ตรวจสอบว่า Drug_ID มีค่าใน TextBox หรือไม่
            Dim drugID As Integer
            If Not Integer.TryParse(drugIDdd.Text, drugID) Then
                MessageBox.Show("กรุณาใส่ค่า Drug ID ที่ถูกต้อง")
                Exit Sub
            End If

            ' SQL Query สำหรับการ Update Drug_ID ลงใน Medication_Head โดยใช้ Med_ID จาก TextBox
            Dim query As String = "UPDATE Medication_Head SET Drug_ID = @DrugID WHERE Med_ID = @MedID"
            Dim command As New SqlCommand(query, connection)

            ' เพิ่มค่า Parameters ให้กับ SQL Command
            command.Parameters.AddWithValue("@MedID", medID)
            command.Parameters.AddWithValue("@DrugID", drugID)

            ' รันคำสั่ง SQL
            Dim rowsAffected As Integer = command.ExecuteNonQuery()


        Catch ex As Exception
            ' แสดงข้อความเมื่อเกิดข้อผิดพลาด
            MessageBox.Show("Error: " & ex.Message)
        Finally
            ' ปิดการเชื่อมต่อฐานข้อมูล
            connection.Close()
        End Try
    End Sub

    Private Sub Button6_Click(sender As Object, e As EventArgs) Handles Button6.Click
        Me.Hide()
    End Sub
End Class