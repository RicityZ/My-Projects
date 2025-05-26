Imports System.Data.SqlClient
Imports System.Windows.Forms.VisualStyles
Public Class WorkExpForm
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

    Private Sub ButtonSearch_Click(sender As Object, e As EventArgs) Handles Searchworkexpbutt.Click
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim connection As New SqlConnection(connectionString)

        Try
            connection.Open()

            ' SQL Query เริ่มต้นการค้นหาข้อมูล
            Dim query As String = "SELECT Staff_ID,Staff_exp_no, Staff_exp_place, Staff_exp_position, Staff_exp_start, Staff_exp_end " &
                              "FROM Staff_work_experience WHERE 1=1"

            ' ตรวจสอบว่ามีการกรอกค่าในช่อง Staff หรือไม่ ถ้ามีเพิ่มเงื่อนไขใน SQL Query
            If Not String.IsNullOrEmpty(TextBoxWorkExpStaffID.Text) Then
                query &= " AND Staff_ID = @StaffID"
            End If

            ' สร้าง SqlCommand และส่งค่า StaffID
            Dim command As New SqlCommand(query, connection)

            ' เพิ่ม Parameter สำหรับ StaffID ที่กรอกใน TextBox
            If Not String.IsNullOrEmpty(TextBoxWorkExpStaffID.Text) Then
                command.Parameters.AddWithValue("@StaffID", TextBoxWorkExpStaffID.Text)
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
                DataGridViewWorkExp.DataSource = table
            End If

        Catch ex As Exception
            MessageBox.Show("Error: " & ex.Message)
        Finally
            ' ปิดการเชื่อมต่อฐานข้อมูล
            connection.Close()
        End Try
    End Sub
    Private Sub DataGridViewWorkExp_SelectionChanged(sender As Object, e As EventArgs) Handles DataGridViewWorkExp.SelectionChanged
        ' ตรวจสอบว่ามีแถวถูกเลือกอยู่หรือไม่
        If DataGridViewWorkExp.SelectedRows.Count > 0 Then
            Dim selectedRow As DataGridViewRow = DataGridViewWorkExp.SelectedRows(0)

            ' ดึงข้อมูลจากเซลล์และตั้งค่าให้กับ TextBox
            TextBoxWorkExpStaffID.Text = selectedRow.Cells("Staff_ID").Value.ToString()
            TextBoxWorkExpOrganization.Text = selectedRow.Cells("Staff_exp_place").Value.ToString()
            TextBoxWorkExpPosition.Text = selectedRow.Cells("Staff_exp_position").Value.ToString()

        End If
    End Sub
    Private Sub ButtonAdd_Click(sender As Object, e As EventArgs) Handles AddqualiButt.Click
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = "INSERT INTO Staff_work_experience (Staff_ID, Staff_exp_place, Staff_exp_position, Staff_exp_start, Staff_exp_end) VALUES (@StaffID, @Place, @Position, @StartDate, @EndDate)"

        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                command.Parameters.AddWithValue("@StaffID", TextBoxWorkExpStaffID.Text)
                command.Parameters.AddWithValue("@Place", TextBoxWorkExpOrganization.Text)
                command.Parameters.AddWithValue("@Position", TextBoxWorkExpPosition.Text)
                command.Parameters.AddWithValue("@StartDate", DateWorkExpStartDate.Value)
                command.Parameters.AddWithValue("@EndDate", DateWorkExpEndDate.Value)

                connection.Open()
                command.ExecuteNonQuery()
                MessageBox.Show("เพิ่มข้อมูลสำเร็จ")
            End Using
        End Using

        LoadData() ' โหลดข้อมูลใหม่ลง DataGridView
    End Sub

    Private Sub ButtonSave_Click(sender As Object, e As EventArgs) Handles Button1.Click
        If DataGridViewWorkExp.SelectedRows.Count > 0 Then
            Dim selectedRow = DataGridViewWorkExp.SelectedRows(0)
            Dim staffID As String = selectedRow.Cells("Staff_ID").Value.ToString()
            Dim staffExpNo As String = selectedRow.Cells("Staff_exp_no").Value.ToString()

            If String.IsNullOrEmpty(TextBoxWorkExpOrganization.Text) Or String.IsNullOrEmpty(TextBoxWorkExpPosition.Text) Then
                MessageBox.Show("กรุณากรอกข้อมูลให้ครบถ้วน")
                Return
            End If

            Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
            Dim query As String = "UPDATE Staff_work_experience SET Staff_exp_place = @Place, Staff_exp_position = @Position, Staff_exp_start = @StartDate, Staff_exp_end = @EndDate WHERE Staff_ID = @StaffID AND Staff_exp_no = @StaffExpNo"

            Using connection As New SqlConnection(connectionString)
                Using command As New SqlCommand(query, connection)
                    command.Parameters.AddWithValue("@StaffID", staffID)
                    command.Parameters.AddWithValue("@StaffExpNo", staffExpNo)
                    command.Parameters.AddWithValue("@Place", TextBoxWorkExpOrganization.Text)
                    command.Parameters.AddWithValue("@Position", TextBoxWorkExpPosition.Text)
                    command.Parameters.AddWithValue("@StartDate", DateWorkExpStartDate.Value)
                    command.Parameters.AddWithValue("@EndDate", DateWorkExpEndDate.Value)

                    connection.Open()
                    command.ExecuteNonQuery()
                    MessageBox.Show("อัปเดตข้อมูลสำเร็จ")
                End Using
            End Using

            LoadData() ' โหลดข้อมูลใหม่ลง DataGridView
        Else
            MessageBox.Show("กรุณาเลือกข้อมูลที่ต้องการอัปเดต")
        End If
    End Sub


    ' ปุ่ม Delete ใช้สำหรับลบข้อมูลที่เลือกใน DataGridView และฐานข้อมูล
    Private Sub ButtonDelete_Click(sender As Object, e As EventArgs) Handles Button3.Click
        If DataGridViewWorkExp.SelectedRows.Count > 0 Then
            Dim selectedRow = DataGridViewWorkExp.SelectedRows(0)
            Dim staffID As String = selectedRow.Cells("Staff_ID").Value.ToString()
            Dim expNo As String = selectedRow.Cells("Staff_exp_no").Value.ToString()

            Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
            Dim query As String = "DELETE FROM Staff_work_experience WHERE Staff_ID = @StaffID AND Staff_exp_no = @ExpNo"

            Using connection As New SqlConnection(connectionString)
                Using command As New SqlCommand(query, connection)
                    command.Parameters.AddWithValue("@StaffID", staffID)
                    command.Parameters.AddWithValue("@ExpNo", expNo)
                    connection.Open()
                    command.ExecuteNonQuery()
                    MessageBox.Show("ลบข้อมูลสำเร็จ")
                End Using
            End Using

            LoadData() ' โหลดข้อมูลใหม่ลง DataGridView
        Else
            MessageBox.Show("กรุณาเลือกข้อมูลที่ต้องการลบ")
        End If
    End Sub


    ' ฟังก์ชันสำหรับโหลดข้อมูลจากฐานข้อมูลไปที่ DataGridView
    Private Sub LoadData()
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = "SELECT Staff_ID, Staff_exp_no, Staff_exp_position, Staff_exp_place, Staff_exp_start, Staff_exp_end " &
                          "FROM Staff_work_experience ORDER BY Staff_ID, Staff_exp_no"

        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()
                adapter.Fill(table)
                DataGridViewWorkExp.DataSource = table
            End Using
        End Using
    End Sub
    ' โหลดข้อมูลเมื่อฟอร์มเปิดขึ้น
    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        LoadData()
    End Sub

    Private Sub Button9_Click(sender As Object, e As EventArgs) Handles Button9.Click
        QualiForm.Show()
        Me.Hide()

    End Sub


End Class


