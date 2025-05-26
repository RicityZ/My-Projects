Imports System.Data.SqlClient

Public Class RecviveFrom
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
    Private Sub ButtonSearch_Click(sender As Object, e As EventArgs) Handles Button2.Click
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบการเลือกใน ComboBox (Item หรือ Drug)
        If ComboBox1.SelectedItem.ToString() = "ITEM" Then
            ' ถ้า TextBoxID ว่าง ให้แสดงข้อมูลทั้งหมดที่มี status เป็น Delivered
            If String.IsNullOrEmpty(TextBoxID.Text) Then
                query = "SELECT ss.order_no, s.Supply_name, ss.status, ss.qty, ss.price, ss.Last_order_date, ss.Supplier_ID, ss.Supply_ID " &
                    "FROM Supply_suppliers ss " &
                    "JOIN Supply s ON ss.Supply_ID = s.Supply_ID " &
                    "WHERE ss.status = 'Delivered'"
            Else
                ' ถ้ามีการกรอก Order No ให้ค้นหาตาม Order No และต้องมี status เป็น Delivered
                query = "SELECT ss.order_no, s.Supply_name, ss.status, ss.qty, ss.price, ss.Last_order_date, ss.Supplier_ID, ss.Supply_ID " &
                    "FROM Supply_suppliers ss " &
                    "JOIN Supply s ON ss.Supply_ID = s.Supply_ID " &
                    "WHERE ss.order_no = @OrderNo AND ss.status = 'Delivered'"
            End If

        ElseIf ComboBox1.SelectedItem.ToString() = "DRUG" Then
            ' ถ้า TextBoxID ว่าง ให้แสดงข้อมูลทั้งหมดที่มี status เป็น Delivered
            If String.IsNullOrEmpty(TextBoxID.Text) Then
                query = "SELECT ds.order_no, d.Drug_name, ds.status, ds.qty, ds.price, ds.Last_order_date, ds.Supplier_ID, ds.Drug_ID " &
                    "FROM Drug_suppliers ds " &
                    "JOIN Drug d ON ds.Drug_ID = d.Drug_ID " &
                    "WHERE ds.status = 'Delivered'"
            Else
                ' ถ้ามีการกรอก Order No ให้ค้นหาตาม Order No และต้องมี status เป็น Delivered
                query = "SELECT ds.order_no, d.Drug_name, ds.status, ds.qty, ds.price, ds.Last_order_date, ds.Supplier_ID, ds.Drug_ID " &
                    "FROM Drug_suppliers ds " &
                    "JOIN Drug d ON ds.Drug_ID = d.Drug_ID " &
                    "WHERE ds.order_no = @OrderNo AND ds.status = 'Delivered'"
            End If
        End If

        ' เชื่อมต่อกับฐานข้อมูลและค้นหาข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                ' ถ้ามีการกรอก Order No ให้เพิ่ม Parameter
                If Not String.IsNullOrEmpty(TextBoxID.Text) Then
                    command.Parameters.AddWithValue("@OrderNo", TextBoxID.Text)
                End If

                ' ใช้ SqlDataAdapter เพื่อเติมข้อมูลลงใน DataTable
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()

                ' เปิดการเชื่อมต่อและเติมข้อมูลลงใน DataTable
                connection.Open()
                adapter.Fill(table)

                ' แสดงผลข้อมูลใน DataGridView
                DataGridView1.DataSource = table

                ' ถ้าไม่พบข้อมูล
                If table.Rows.Count = 0 Then
                    MessageBox.Show("ไม่พบข้อมูล")
                End If
            End Using
        End Using
    End Sub


End Class