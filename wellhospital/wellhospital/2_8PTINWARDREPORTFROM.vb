Imports System.Data.SqlClient

Public Class PTINWARDREPORTFROM
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
    Private Sub ButtonSearch_Click(sender As Object, e As EventArgs) Handles manageSeacrhbutt.Click
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim searchTerm As String = TextBox1.Text.Trim()

        ' สร้าง SQL Query ที่จะดึงข้อมูล Ward, Patient และ Staff โดยมี Ward_ID ตรงกัน
        ' แสดงเฉพาะแถวที่มีค่า Ward_ID ในตาราง Patient และ Staff
        Dim query As String = "SELECT Ward.Ward_ID, Ward.Ward_name, 
                                  Patient.Pt_firstname + ' ' + Patient.Pt_lastname AS PatientName, 
                                  Staff.Staff_firstname + ' ' + Staff.Staff_lastname AS StaffName
                           FROM Ward
                           LEFT JOIN Patient ON Ward.Ward_ID = Patient.Ward_ID
                           LEFT JOIN Work_In ON Ward.Ward_ID = Work_In.Ward_ID
                           LEFT JOIN Staff ON Work_In.Staff_ID = Staff.Staff_ID
                           WHERE Patient.Ward_ID IS NOT NULL 
                             AND Work_In.Staff_ID IS NOT NULL 
                             AND (@SearchTerm = '' OR Staff.Staff_firstname + ' ' + Staff.Staff_lastname LIKE '%' + @SearchTerm + '%'
                                  OR Staff.Staff_ID LIKE '%' + @SearchTerm + '%'
                                  OR Ward.Ward_ID LIKE '%' + @SearchTerm + '%')"

        ' เชื่อมต่อกับฐานข้อมูลและรันคำสั่ง SQL
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)

                ' กำหนดค่าพารามิเตอร์
                command.Parameters.AddWithValue("@SearchTerm", searchTerm)

                ' เปิดการเชื่อมต่อฐานข้อมูล
                connection.Open()

                ' ใช้ SqlDataAdapter เพื่อเติมข้อมูลลงใน DataTable
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()

                ' เติมข้อมูลจากฐานข้อมูลลงใน DataTable
                adapter.Fill(table)

                ' แสดงผลข้อมูลใน DataGridView
                DataGridView1.DataSource = table

                ' ปรับขนาดคอลัมน์ให้เต็ม DataGridView อัตโนมัติ
                DataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill
            End Using
        End Using
    End Sub


End Class

