Imports System.Data.SqlClient

Public Class StaffReport
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
        ' ตรวจสอบว่า TextBox ของการค้นหาไม่ว่างเปล่า


        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = "SELECT W.Ward_ID, W.Ward_name, S.Staff_ID, " &
                      "S.Staff_firstname + ' ' + S.Staff_lastname AS StaffName, " &
                      "S.Staff_position AS StaffPosition, WI.Work_shift AS WorkShift, WI.Work_INDate AS WorkDate " &
                      "FROM Ward W " &
                      "INNER JOIN Work_In WI ON W.Ward_ID = WI.Ward_ID " &
                      "INNER JOIN Staff S ON WI.Staff_ID = S.Staff_ID " &
                      "WHERE S.Staff_firstname + ' ' + S.Staff_lastname LIKE '%' + @SearchTerm + '%' " &
                      "OR W.Ward_ID LIKE '%' + @SearchTerm + '%' " &
                      "ORDER BY WI.Work_INDate DESC"

        Using connection As New SqlConnection(connectionString)
            Dim command As New SqlCommand(query, connection)
            command.Parameters.AddWithValue("@SearchTerm", StaffQualiSearch.Text) ' ใช้ค่าใน TextBox เป็นเงื่อนไขการค้นหา

            Dim adapter As New SqlDataAdapter(command)
            Dim table As New DataTable()

            connection.Open()
            adapter.Fill(table)

            ' ตรวจสอบว่ามีข้อมูลตรงตามการค้นหาหรือไม่
            If table.Rows.Count > 0 Then
                DataGridView1.DataSource = table ' แสดงผลใน DataGridView


            End If

        End Using
    End Sub




End Class