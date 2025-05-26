Imports System.Data.SqlClient
Imports System.Windows.Forms.VisualStyles
Imports System.Windows.Forms.VisualStyles.VisualStyleElement

Public Class ManangeForM
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

    ' ฟังก์ชันสำหรับดึงข้อมูลจากฐานข้อมูลมาแสดงใน DataGridView
    Private Sub LoadData()
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = "SELECT Staff_ID, Staff_firstname, Staff_lastname, Staff_address, Staff_tel, Staff_DOB, Staff_sex, Staff_NIN, Staff_position, Staff_salary, Staff_salary_lv, Staff_hours, Staff_contract_type, Staff_payment_type FROM Staff"

        Using connection As New SqlConnection(connectionString)
            Dim command As New SqlCommand(query, connection)
            Dim adapter As New SqlDataAdapter(command)
            Dim table As New DataTable()

            connection.Open()
            adapter.Fill(table)
            DataGridView1.DataSource = table ' แสดงข้อมูลใน DataGridView
        End Using
    End Sub

    ' เรียกฟังก์ชัน LoadData เมื่อกดปุ่ม Search
    Private Sub manageSeacrhbutt_Click(sender As Object, e As EventArgs) Handles manageSeacrhbutt.Click
        LoadData()
    End Sub

    Private Sub DataGridView1_CellClick(sender As Object, e As DataGridViewCellEventArgs) Handles DataGridView1.CellClick
        ' ตรวจสอบว่ามีการคลิกเลือกแถวใน DataGridView หรือไม่
        If e.RowIndex >= 0 Then
            Dim row As DataGridViewRow = DataGridView1.Rows(e.RowIndex)

            ' นำข้อมูลจากแถวที่เลือกมาแสดงใน TextBox
            TextBoxID.Text = row.Cells("Staff_ID").Value.ToString()
            TextBoxFirstName.Text = row.Cells("Staff_firstname").Value.ToString()
            TextBoxLastName.Text = row.Cells("Staff_lastname").Value.ToString()

            TextBoxPhone.Text = row.Cells("Staff_tel").Value.ToString()
            TextBoxDOB.Text = row.Cells("Staff_DOB").Value.ToString()
            TextBoxNIN.Text = row.Cells("Staff_NIN").Value.ToString()
            TextBoxGender.Text = row.Cells("Staff_sex").Value.ToString()
            TextBoxPosition.Text = row.Cells("Staff_position").Value.ToString()
            TextBoxSalary.Text = row.Cells("Staff_salary").Value.ToString()

            ' ดึงข้อมูลจากคอลัมน์ Salary Level มาแสดง
            SalaryLE.Text = row.Cells("Staff_salary_lv").Value.ToString()

            TextBoxHours.Text = row.Cells("Staff_hours").Value.ToString()
            TextBoxContractType.Text = row.Cells("Staff_contract_type").Value.ToString()
            TextBoxPaymentType.Text = row.Cells("Staff_payment_type").Value.ToString()
        End If
    End Sub
    Private Sub editmanage_Click(sender As Object, e As EventArgs) Handles editmanage.Click
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = "UPDATE Staff SET Staff_firstname = @FirstName, Staff_lastname = @LastName, " &
                              "Staff_tel = @PhoneNumber, Staff_DOB = @DateOfBirth, Staff_sex = @Gender, Staff_NIN = @NIN, " &
                              "Staff_position = @Position, Staff_salary = @Salary, Staff_salary_lv = @SalaryLv, Staff_hours = @HoursPerWeek, " &
                              "Staff_contract_type = @ContractType, Staff_payment_type = @PaymentType WHERE Staff_ID = @StaffID"

        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                ' เพิ่มค่า Parameters จาก TextBox
                command.Parameters.AddWithValue("@StaffID", TextBoxID.Text)
                command.Parameters.AddWithValue("@FirstName", TextBoxFirstName.Text)
                command.Parameters.AddWithValue("@LastName", TextBoxLastName.Text)

                command.Parameters.AddWithValue("@PhoneNumber", TextBoxPhone.Text)
                command.Parameters.AddWithValue("@DateOfBirth", TextBoxDOB.Text)
                command.Parameters.AddWithValue("@Gender", TextBoxGender.Text)
                command.Parameters.AddWithValue("@NIN", TextBoxNIN.Text)
                command.Parameters.AddWithValue("@Position", TextBoxPosition.Text)
                command.Parameters.AddWithValue("@Salary", TextBoxSalary.Text)
                command.Parameters.AddWithValue("@SalaryLv", SalaryLE.Text)
                command.Parameters.AddWithValue("@HoursPerWeek", TextBoxHours.Text)
                command.Parameters.AddWithValue("@ContractType", TextBoxContractType.Text)
                command.Parameters.AddWithValue("@PaymentType", TextBoxPaymentType.Text)

                connection.Open()
                command.ExecuteNonQuery()
                connection.Close()

                MessageBox.Show("Data updated successfully!")
                ' อัปเดต DataGridView ใหม่หลังการอัปเดต
                LoadData()
            End Using
        End Using
    End Sub

    Private Sub ButtonSearch_Click(sender As Object, e As EventArgs) Handles manageSeacrhbutt.Click
        ' ตรวจสอบว่า TextBox ของ Staff ID มีค่าหรือไม่


        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = "SELECT Staff_ID, Staff_firstname, Staff_lastname, Staff_address, Staff_tel, Staff_DOB, " &
                          "Staff_NIN, Staff_sex, Staff_position, Staff_salary, Staff_salary_lv, Staff_hours, " &
                          "Staff_contract_type, Staff_payment_type FROM Staff WHERE Staff_ID = @StaffID"

        Using connection As New SqlConnection(connectionString)
            Dim command As New SqlCommand(query, connection)
            command.Parameters.AddWithValue("@StaffID", StaffQualiSearch.Text) ' นำค่า Staff ID จาก TextBox มาใช้เป็น Parameter

            Dim adapter As New SqlDataAdapter(command)
            Dim table As New DataTable()

            connection.Open()
            adapter.Fill(table)

            ' ตรวจสอบว่าพบข้อมูลหรือไม่
            If table.Rows.Count > 0 Then
                DataGridView1.DataSource = table ' แสดงข้อมูลใน DataGridView

            End If

        End Using
    End Sub

    Private Sub managedel_Click(sender As Object, e As EventArgs) Handles managedel.Click
        ' ตรวจสอบว่ามีการเลือกข้อมูลใน DataGridView หรือไม่

        ' แสดงข้อความยืนยันการลบ
        Dim result As DialogResult = MessageBox.Show("คุณต้องการลบพนักงานนี้หรือไม่?", "Confirm Delete", MessageBoxButtons.YesNo)

        If result = DialogResult.Yes Then
            ' สายการเชื่อมต่อไปยัง SQL Server
            Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
            Dim query As String = "DELETE FROM Staff WHERE Staff_ID = @StaffID"

            Using connection As New SqlConnection(connectionString)
                Using command As New SqlCommand(query, connection)
                    command.Parameters.AddWithValue("@StaffID", TextBoxID.Text)

                    connection.Open()
                    command.ExecuteNonQuery()
                    connection.Close()

                    MessageBox.Show("ข้อมูลพนักงานถูกลบเรียบร้อยแล้ว!")
                End Using
            End Using

            ' โหลดข้อมูลใหม่ใน DataGridView
            LoadData()
        End If
    End Sub

    Private Sub addstaff_Click(sender As Object, e As EventArgs) Handles addstaff.Click
        AddStaffForm.Show()
        Me.Hide()

    End Sub
End Class