Imports System.Data.SqlClient

Public Class AddStaffForm

    Private Sub Buttonhome_Click(sender As Object, e As EventArgs) Handles HOMEBUTT.Click
        homepage.Show()
        Me.Hide()

    End Sub
    Private Sub STAFFBUTTHOMEf_Click(sender As Object, e As EventArgs) Handles STAFFBUTTHOME.Click

        StaffForm.Show()
        Me.Hide()
    End Sub
    Private Sub PatientHOMEBUTT_Click(sender As Object, e As EventArgs) Handles PatientHOMEBUTT.Click
        PatientForm.Show()
        Me.Hide()
    End Sub

    Private Sub SuppliesBUTTHOME_Click(sender As Object, e As EventArgs) Handles SuppliesBUTTHOME.Click
        SupFrom.Show()
        Me.Hide()

    End Sub

    Private Sub SuppliersHOMEBUTT_Click(sender As Object, e As EventArgs) Handles SuppliersHOMEBUTT.Click
        supLIERfrom.Show()
        Me.Hide()
    End Sub

    Private Sub RequisitionHOMEBUTT_Click(sender As Object, e As EventArgs) Handles RequisitionHOMEBUTT.Click
        reqFrom.Show()
        Me.Hide()
    End Sub

    Private Sub DashboardHOMEBUTT_Click(sender As Object, e As EventArgs) Handles DashboardHOMEBUTT.Click
        Dashboard.Show()
        Me.Hide()
    End Sub





    Private Sub ButtonInsert_Click(sender As Object, e As EventArgs) Handles AddStaffInsertButt.Click
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim connection As New SqlConnection(connectionString)

        Try
            connection.Open()
            ' SQL Query สำหรับการดึงค่า Staff_ID สูงสุด
            Dim maxIdQuery As String = "SELECT MAX(CAST(Staff_ID AS INT)) FROM Staff"
            Dim maxIdCommand As New SqlCommand(maxIdQuery, connection)
            Dim maxId As Object = maxIdCommand.ExecuteScalar()

            ' กำหนดค่าเริ่มต้น ถ้ายังไม่มีข้อมูลในตาราง
            Dim newStaffID As String
            If IsDBNull(maxId) Then
                newStaffID = "000001"
            Else
                ' เพิ่มค่า 1 และฟอร์แมตให้เป็นเลข 6 หลักด้วยการเติม 0
                Dim newId As Integer = CInt(maxId) + 1
                newStaffID = newId.ToString("D6") ' ฟอร์แมตเป็น 6 หลัก เช่น 000001
            End If

            ' SQL Query สำหรับการ Insert ข้อมูล
            Dim query As String = "INSERT INTO Staff (Staff_ID, Staff_firstname, Staff_lastname, Staff_address, Staff_tel, Staff_DOB, Staff_sex, Staff_NIN, Staff_position, Staff_salary_lv, Staff_salary, Staff_hours, Staff_contract_type, Staff_payment_type) " &
                "VALUES (@StaffID, @FirstName, @LastName, @Address, @PhoneNumber, @DateOfBirth, @Gender, @NIN, @Position, @AllocatedWard, @Salary, @HoursPerWeek, @ContractType, @PaymentType)"

            Dim command As New SqlCommand(query, connection)

            ' เพิ่มค่า Staff_ID ที่ฟอร์แมตแล้ว
            command.Parameters.AddWithValue("@StaffID", newStaffID)

            ' ตรวจสอบค่าจาก TextBox และ ComboBox ก่อนเพิ่มลงไปในฐานข้อมูล
            command.Parameters.AddWithValue("@FirstName", AddStaffName.Text)
            command.Parameters.AddWithValue("@LastName", AddStaffLast.Text)
            command.Parameters.AddWithValue("@Address", AddStaffAddress.Text)
            command.Parameters.AddWithValue("@PhoneNumber", AddStaffPhone.Text)
            command.Parameters.AddWithValue("@DateOfBirth", AddStaffDOB.Value)
            command.Parameters.AddWithValue("@Gender", AddStaffSex.SelectedItem.ToString())
            command.Parameters.AddWithValue("@Position", AddStaffPosition.SelectedItem.ToString())
            command.Parameters.AddWithValue("@AllocatedWard", SalaLevel.SelectedItem.ToString())

            ' แปลงค่าจาก TextBox และตรวจสอบว่าเป็นตัวเลขที่ถูกต้อง
            Dim salary As Decimal
            Dim hoursPerWeek As Decimal

            If Decimal.TryParse(AddStaffSalary.Text, salary) Then
                command.Parameters.AddWithValue("@Salary", salary)
            Else
                MessageBox.Show("Invalid Salary value")
                Return
            End If

            If Decimal.TryParse(AddStaffHours.Text, hoursPerWeek) Then
                command.Parameters.AddWithValue("@HoursPerWeek", hoursPerWeek)
            Else
                MessageBox.Show("Invalid Hours Per Week value")
                Return
            End If

            ' กำหนดค่า ComboBox สำหรับ ContractType และ PaymentType
            If AddStaffContractType.SelectedItem IsNot Nothing Then
                command.Parameters.AddWithValue("@ContractType", AddStaffContractType.SelectedItem.ToString())
            Else
                MessageBox.Show("Please select a contract type")
                Return
            End If

            If AddStaffPaymentType.SelectedItem IsNot Nothing Then
                command.Parameters.AddWithValue("@PaymentType", AddStaffPaymentType.SelectedItem.ToString())
            Else
                MessageBox.Show("Please select a payment type")
                Return
            End If

            ' กำหนดค่าของ NIN
            command.Parameters.AddWithValue("@NIN", AddStaffNIN.Text)

            ' รันคำสั่ง SQL
            command.ExecuteNonQuery()

            MessageBox.Show("Data inserted successfully!")


        Catch ex As Exception
            MessageBox.Show("Error: " & ex.Message)
        Finally
            ' ปิดการเชื่อมต่อฐานข้อมูล
            connection.Close()
        End Try
    End Sub

    Private Sub AddstaffqualiButt_Click(sender As Object, e As EventArgs) Handles AddstaffqualiButt.Click
        QualiForm.Show()
        Me.Hide()
    End Sub

    Private Sub Button9_Click(sender As Object, e As EventArgs) Handles Button9.Click
        WorkExpForm.Show()
        Me.Hide()
    End Sub

    Private Sub AddStaffForm_Load(sender As Object, e As EventArgs) Handles MyBase.Load

    End Sub
End Class