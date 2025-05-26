Imports System.Data.SqlClient

Public Class appiontmentform
    ' ในฟอร์ม Appointment
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
    Public Sub LoadAppointmentData(ptID As String)
        ' ตั้งค่า Pt_ID ใน TextBox หรือ Label เพื่อแสดง
        TextBoxPatientName.Text = ptID
    End Sub
    Private Sub btnSearch1_Click(sender As Object, e As EventArgs) Handles manageSeacrhbutt.Click
        ' เชื่อมต่อฐานข้อมูล
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Using connection As New SqlConnection(connectionString)
            Try
                connection.Open()

                ' คำสั่ง SQL สำหรับการค้นหาข้อมูล
                Dim query As String = "SELECT * FROM Patient WHERE Pt_ID = @Pt_ID"

                ' สร้าง SqlCommand และเพิ่ม Parameter สำหรับ Pt_ID
                Dim command As New SqlCommand(query, connection)
                command.Parameters.AddWithValue("@Pt_ID", TextBoxPatientName.Text) ' txtPatientID คือ TextBox ที่ใช้ใส่ค่า Pt_ID

                ' สร้าง SqlDataAdapter และ DataTable เพื่อจัดการข้อมูล
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()
                adapter.Fill(table)

                ' แสดงข้อมูลใน DataGridView
                DataGridView1.DataSource = table

            Catch ex As Exception
                MessageBox.Show("Error: " & ex.Message)
            Finally
                connection.Close()
            End Try
        End Using
    End Sub
    Private Sub DataGridView1_CellClick(sender As Object, e As DataGridViewCellEventArgs) Handles DataGridView1.CellClick
        ' ตรวจสอบว่าแถวที่คลิกไม่ใช่ header
        If e.RowIndex >= 0 Then
            ' ดึงค่า Pt_ID, Pt_firstname, Pt_lastname จากแถวที่เลือก
            Dim selectedRow As DataGridViewRow = DataGridView1.Rows(e.RowIndex)

            ' นำข้อมูลไปแสดงใน TextBox
            txtPatientID.Text = selectedRow.Cells("Pt_ID").Value.ToString() ' แสดง Patient ID
            TextBox3.Text = selectedRow.Cells("Pt_firstname").Value.ToString() ' แสดง FirstName
            TextBox4.Text = selectedRow.Cells("Pt_lastname").Value.ToString() ' แสดง LastName
        End If
    End Sub
    Private Sub btnSearch_Click(sender As Object, e As EventArgs) Handles Button1.Click
        ' สตริงการเชื่อมต่อฐานข้อมูล
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

        ' เชื่อมต่อกับฐานข้อมูล
        Using connection As New SqlConnection(connectionString)
            Try
                connection.Open()

                ' คำสั่ง SQL สำหรับการค้นหาข้อมูล staff ตามชื่อแพทย์ (Docter)
                Dim query As String = "SELECT Staff_ID, Staff_firstname + ' ' + Staff_lastname AS FullName FROM Staff WHERE Staff_firstname LIKE @DocterName"

                ' สร้าง SqlCommand และเพิ่ม Parameter สำหรับ Docter Name
                Dim command As New SqlCommand(query, connection)
                command.Parameters.AddWithValue("@DocterName", "%" & TextBox1.Text & "%") ' txtDocterName คือ TextBox ที่ใส่ชื่อ Docter

                ' สร้าง SqlDataAdapter และ DataTable เพื่อเก็บผลลัพธ์จากฐานข้อมูล
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()
                adapter.Fill(table)

                ' แสดงข้อมูลใน DataGridView
                DataGridView2.DataSource = table
                DataGridView2.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill
            Catch ex As Exception
                MessageBox.Show("Error: " & ex.Message)
            Finally
                connection.Close()
            End Try
        End Using
    End Sub
    Private Sub DataGridView2_CellClick(sender As Object, e As DataGridViewCellEventArgs) Handles DataGridView2.CellClick
        ' ตรวจสอบว่าแถวที่คลิกไม่ใช่ header
        If e.RowIndex >= 0 Then
            ' ดึงค่า Staff_ID, FirstName, LastName จากแถวที่เลือก
            Dim selectedRow As DataGridViewRow = DataGridView2.Rows(e.RowIndex)

            ' นำข้อมูลไปแสดงใน TextBox
            txtStaffID.Text = selectedRow.Cells("Staff_ID").Value.ToString() ' แสดง Staff ID

            ' เชื่อมต่อ First Name และ Last Name ใน TextBox เดียวกัน
            TextBox8.Text = selectedRow.Cells("FullName").Value.ToString()
        End If
    End Sub

    Private Sub btnSave_Click(sender As Object, e As EventArgs) Handles Button3.Click
        ' สตริงการเชื่อมต่อฐานข้อมูล
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

        ' คำสั่ง SQL สำหรับการเพิ่มข้อมูลลงในตาราง Patient_appointment
        Dim query As String = "INSERT INTO Patient_appointment (App_date, App_time, Exam_room, Staff_ID, Pt_ID) VALUES (@AppDate, @AppTime, @ExamRoom, @StaffID, @PatientID)"

        ' เชื่อมต่อกับฐานข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                ' เพิ่ม Parameter สำหรับแต่ละค่า
                command.Parameters.AddWithValue("@AppDate", DateTimePicker1.Value.Date)
                command.Parameters.AddWithValue("@AppTime", TimePicker.SelectedItem.ToString()) ' สมมติว่าใช้ TimePicker สำหรับเวลา
                command.Parameters.AddWithValue("@ExamRoom", txtRoomNo.Text)

                command.Parameters.AddWithValue("@StaffID", txtStaffID.Text)
                command.Parameters.AddWithValue("@PatientID", txtPatientID.Text)

                Try
                    connection.Open()
                    command.ExecuteNonQuery()
                    MessageBox.Show("Appointment saved successfully.")
                Catch ex As Exception
                    MessageBox.Show("Error: " & ex.Message)
                Finally
                    connection.Close()
                End Try
            End Using
        End Using
    End Sub

    Private Sub Button6_Click(sender As Object, e As EventArgs) Handles Button6.Click
        Me.Hide()

    End Sub


End Class