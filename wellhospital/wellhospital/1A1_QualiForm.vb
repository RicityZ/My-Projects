Imports System.Data.SqlClient

Public Class QualiForm
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
    Private Sub Button9_Click(sender As Object, e As EventArgs) Handles Button9.Click
        WorkExpForm.Show()
        Me.Hide()
    End Sub
    Private Sub qualiSeacrhbutt_Click(sender As Object, e As EventArgs) Handles qualiSeacrhbutt.Click
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim connection As New SqlConnection(connectionString)

        Try
            connection.Open()

            ' เริ่มต้น SQL Query
            Dim query As String = "SELECT Staff_ID, staff_q_no,Staff_q_type, Staff_q_date, Staff_q_institution FROM Staff_qualification WHERE 1=1"

            ' ตรวจสอบว่ามีการกรอก StaffID หรือไม่
            If Not String.IsNullOrEmpty(StaffQualiSearch.Text) Then
                query &= " AND Staff_ID = @StaffID"
            End If

            ' สร้าง SqlCommand
            Dim command As New SqlCommand(query, connection)

            ' เพิ่มค่า Parameter ถ้ามีการกรอก StaffID
            If Not String.IsNullOrEmpty(StaffQualiSearch.Text) Then
                command.Parameters.AddWithValue("@StaffID", StaffQualiSearch.Text)
            End If

            ' ใช้ SqlDataAdapter เพื่อดึงข้อมูล
            Dim adapter As New SqlDataAdapter(command)
            Dim table As New DataTable()

            ' เติมข้อมูลลงใน DataTable
            adapter.Fill(table)

            ' ตรวจสอบว่ามีข้อมูลหรือไม่
            If table.Rows.Count = 0 Then
                MessageBox.Show("No records found for the entered Staff ID")
            Else
                ' แสดงผลใน DataGridView
                DataGridView1.DataSource = table
            End If

        Catch ex As Exception
            MessageBox.Show("Error: " & ex.Message)
        Finally
            ' ปิดการเชื่อมต่อฐานข้อมูล
            connection.Close()
        End Try
    End Sub



    Private Sub EditButton_Click(sender As Object, e As EventArgs) Handles Button1.Click

        ' ตรวจสอบว่าได้เลือกแถวใน DataGridView หรือไม่
        If DataGridView1.SelectedRows.Count > 0 Then
            ' ดึงข้อมูลจากแถวที่เลือกใน DataGridView
            Dim selectedRow = DataGridView1.SelectedRows(0)
            Dim staffID As String = selectedRow.Cells("Staff_ID").Value.ToString()
            Dim staffQNo As String = selectedRow.Cells("Staff_q_no").Value.ToString()

            ' สายการเชื่อมต่อไปยัง SQL Server
            Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
            Dim connection As New SqlConnection(connectionString)

            Try
                connection.Open()

                ' SQL Query สำหรับการอัปเดตข้อมูล โดยใช้ทั้ง Staff_ID และ Staff_q_no
                Dim query As String = "UPDATE Staff_qualification SET Staff_q_type = @Type, Staff_q_date = @Date, Staff_q_institution = @Institution WHERE Staff_ID = @StaffID AND Staff_q_no = @StaffQNo"
                Dim command As New SqlCommand(query, connection)

                ' เพิ่มค่าจาก DataGridView และ TextBox เข้าไปใน SqlCommand
                command.Parameters.AddWithValue("@StaffID", staffID)
                command.Parameters.AddWithValue("@StaffQNo", staffQNo)
                command.Parameters.AddWithValue("@Type", QualificationTypeTextBox.Text)
                command.Parameters.AddWithValue("@Date", qualiDate.Value.Date)
                command.Parameters.AddWithValue("@Institution", InstitutionTextBox.Text)

                ' รันคำสั่ง SQL
                command.ExecuteNonQuery()

                MessageBox.Show("Data updated successfully!")

                ' โหลดข้อมูลใหม่ใน DataGridView
                LoadData()

            Catch ex As Exception
                MessageBox.Show("Error: " & ex.Message)
            Finally
                connection.Close()
            End Try
        Else
            MessageBox.Show("กรุณาเลือกข้อมูลที่ต้องการอัปเดต")
        End If
    End Sub


    Private Sub ButtonAdd_Click(sender As Object, e As EventArgs) Handles AddqualiButt.Click
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim connection As New SqlConnection(connectionString)

        Try
            connection.Open()

            ' ตรวจสอบว่ามีการกรอกข้อมูลที่จำเป็นหรือไม่
            If String.IsNullOrEmpty(StaffQualiSearch.Text) OrElse String.IsNullOrEmpty(QualificationTypeTextBox.Text) OrElse String.IsNullOrEmpty(InstitutionTextBox.Text) Then
                MessageBox.Show("Please fill in all fields before adding.")
                Return
            End If

            ' SQL Query สำหรับการ Insert ข้อมูลใหม่
            Dim query As String = "INSERT INTO Staff_qualification (Staff_ID, Staff_q_type, Staff_q_date, Staff_q_institution) " &
                      "VALUES (@StaffID, @Type, @Date, @Institution)"

            ' กำหนด SqlCommand และเพิ่มค่า Parameter
            Dim command As New SqlCommand(query, connection)

            ' แทรกค่า Parameter ตามข้อมูลที่กรอก
            command.Parameters.AddWithValue("@StaffID", TextBox1.Text)

            command.Parameters.AddWithValue("@Type", QualificationTypeTextBox.Text)
            command.Parameters.AddWithValue("@Date", qualiDate.Value.Date)
            command.Parameters.AddWithValue("@Institution", InstitutionTextBox.Text)

            ' รันคำสั่ง SQL เพื่อเพิ่มข้อมูลใหม่
            command.ExecuteNonQuery()

            MessageBox.Show("Data added successfully!")

            ' อัปเดต DataGridView เพื่อแสดงข้อมูลใหม่ที่เพิ่ม
            LoadData()

        Catch ex As Exception
            MessageBox.Show("Error: " & ex.Message)
        Finally
            ' ปิดการเชื่อมต่อฐานข้อมูล
            connection.Close()
        End Try
    End Sub

    Private Function GetNextStaffQNo(staffID As String, connection As SqlConnection) As Integer
        Dim query As String = "SELECT ISNULL(MAX(Staff_q_no), 0) + 1 FROM Staff_qualification WHERE Staff_ID = @StaffID"
        Dim command As New SqlCommand(query, connection)
        command.Parameters.AddWithValue("@StaffID", staffID)
        Return Convert.ToInt32(command.ExecuteScalar())
    End Function

    ' ฟังก์ชันโหลดข้อมูลใหม่หลังจากเพิ่มข้อมูล
    Private Sub LoadData()
        ' เรียกฟังก์ชันค้นหาข้อมูลเพื่ออัปเดต DataGridView ใหม่
        qualiSeacrhbutt_Click(Nothing, Nothing)
    End Sub

    ' ฟังก์ชันเพื่ออัปเดตข้อมูลใน DataGridView
    Private Sub InsertQualification(staffID As Integer)
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim connection As New SqlConnection(connectionString)

        Try
            connection.Open()

            ' SQL Query สำหรับการ Insert ข้อมูลลงในตาราง Staff_qualification
            Dim query As String = "INSERT INTO Staff_qualification (Staff_ID, Staff_q_no, Staff_q_type, Staff_q_date, Staff_q_institution) " &
                              "VALUES (@StaffID, @QualificationType, @QualificationDate, @Institution)"

            Dim command As New SqlCommand(query, connection)

            ' เพิ่มค่า Staff_ID และข้อมูลอื่นๆ
            command.Parameters.AddWithValue("@StaffID", staffID)
            command.Parameters.AddWithValue("@QualificationType", QualificationTypeTextBox.Text)
            command.Parameters.AddWithValue("@QualificationDate", qualiDate.Value)
            command.Parameters.AddWithValue("@Institution", InstitutionTextBox.Text)

            ' รันคำสั่ง SQL
            command.ExecuteNonQuery()

            MessageBox.Show("Qualification added successfully!")

        Catch ex As Exception
            MessageBox.Show("Error: " & ex.Message)
        Finally
            connection.Close()
        End Try
    End Sub
    Private Sub DeleteButton_Click(sender As Object, e As EventArgs) Handles Button3.Click
        ' ตรวจสอบว่ามีการเลือกแถวใน DataGridView หรือไม่
        If DataGridView1.SelectedRows.Count = 0 Then
            MessageBox.Show("Please select a row to delete")
            Return
        End If

        ' ยืนยันว่าต้องการลบข้อมูลหรือไม่
        Dim result As DialogResult = MessageBox.Show("Are you sure you want to delete this record?", "Delete Record", MessageBoxButtons.YesNo, MessageBoxIcon.Question)
        If result = DialogResult.No Then
            Return
        End If

        ' ดึงค่าของ Staff_ID และ Staff_q_no จากแถวที่เลือก
        Dim selectedRow As DataGridViewRow = DataGridView1.SelectedRows(0)
        Dim staffID As String = selectedRow.Cells("Staff_ID").Value.ToString()
        Dim staffQNo As String = selectedRow.Cells("Staff_q_no").Value.ToString()

        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim connection As New SqlConnection(connectionString)

        Try
            connection.Open()

            ' SQL Query สำหรับการลบข้อมูล
            Dim query As String = "DELETE FROM Staff_qualification WHERE Staff_ID = @StaffID AND Staff_q_no = @StaffQNo"
            Dim command As New SqlCommand(query, connection)

            ' กำหนดค่า parameter สำหรับ SQL Command
            command.Parameters.AddWithValue("@StaffID", staffID)
            command.Parameters.AddWithValue("@StaffQNo", staffQNo)

            ' รันคำสั่ง SQL
            command.ExecuteNonQuery()

            MessageBox.Show("Data deleted successfully!")

            ' โหลดข้อมูลใหม่ใน DataGridView
            LoadData()

        Catch ex As Exception
            MessageBox.Show("Error: " & ex.Message)
        Finally
            connection.Close()
        End Try
    End Sub
    Private Sub DataGridView1_CellClick(sender As Object, e As DataGridViewCellEventArgs) Handles DataGridView1.CellClick
        ' Ensure the row index is valid
        If e.RowIndex >= 0 Then
            ' Get the selected row
            Dim selectedRow As DataGridViewRow = DataGridView1.Rows(e.RowIndex)

            ' Populate the textboxes with the values from the selected row
            TextBox1.Text = selectedRow.Cells("Staff_ID").Value.ToString()
            InstitutionTextBox.Text = selectedRow.Cells("Staff_q_institution").Value.ToString()
            QualificationTypeTextBox.Text = selectedRow.Cells("Staff_q_type").Value.ToString()

        End If
    End Sub

End Class

