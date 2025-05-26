Imports System.Data.SqlClient

Public Class outPTfrom
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

    Private Sub manageSeacrhbutt_Click(sender As Object, e As EventArgs) Handles manageSeacrhbutt.Click

        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

        ' รับค่าจาก TextBox สำหรับการค้นหา
        Dim searchValue As String = TextBox1.Text.Trim()

        ' สร้าง SQL Query ที่จะดึงข้อมูล Pt_ID, Pt_firstname, Pt_lastname, Pt_type, Ward_name โดยมีเงื่อนไขการค้นหา
        ' แสดงเฉพาะผู้ป่วยที่มีประเภท Pt_type เป็น 'OUT PATIENT'
        Dim query As String = "SELECT Patient.Pt_ID, 
                           Patient.Pt_firstname + ' ' + Patient.Pt_lastname AS PatientName, 
                           Patient.Pt_type, 
                           Ward.Ward_name
                           FROM Ward 
                           LEFT JOIN Patient ON Ward.Ward_ID = Patient.Ward_ID
                           WHERE (Patient.Pt_ID LIKE @SearchTerm OR
                                  Patient.Pt_firstname + ' ' + Patient.Pt_lastname LIKE @SearchTerm)
                           AND Patient.Pt_type = 'OUT PATIENT'"

        ' เชื่อมต่อกับฐานข้อมูลและรันคำสั่ง SQL
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                ' เพิ่มค่า Parameters ให้กับคำสั่ง SQL
                command.Parameters.AddWithValue("@SearchTerm", "%" & searchValue & "%")

                ' เปิดการเชื่อมต่อฐานข้อมูล
                connection.Open()

                ' ใช้ SqlDataAdapter เพื่อเติมข้อมูลลงใน DataTable
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()

                ' เติมข้อมูลจากฐานข้อมูลลงใน DataTable
                adapter.Fill(table)

                ' แสดงผลข้อมูลใน DataGridView
                DataGridView1.DataSource = table

                ' ปรับ DataGridView ให้เต็มพื้นที่
                DataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill
            End Using
        End Using
    End Sub




End Class