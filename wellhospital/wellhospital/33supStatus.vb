Imports System.Data.SqlClient
Imports System.Windows.Forms.VisualStyles.VisualStyleElement

Public Class supStatus
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
    Private Sub ComboBox2_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ComboBox1.SelectedIndexChanged
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบการเลือกใน ComboBox
        If ComboBox1.SelectedItem.ToString() = "ITEM" Then
            query = "SELECT ss.order_no, s.Supply_name,ss.status, ss.qty, ss.price, ss.Last_order_date, ss.Supplier_ID, ss.Supply_ID " &
                    "FROM Supply_suppliers ss " &
                    "JOIN Supply s ON ss.Supply_ID = s.Supply_ID"
        ElseIf ComboBox1.SelectedItem.ToString() = "DRUG" Then
            query = "SELECT ds.order_no, d.Drug_name,ds.status, ds.qty, ds.price, ds.Last_order_date, ds.Supplier_ID, ds.Drug_ID " &
                    "FROM Drug_suppliers ds " &
                    "JOIN Drug d ON ds.Drug_ID = d.Drug_ID"
        End If

        ' เชื่อมต่อกับฐานข้อมูลและดึงข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()
                connection.Open()
                adapter.Fill(table)
                DataGridView1.DataSource = table ' แสดงข้อมูลใน DataGridView
            End Using
        End Using
    End Sub
    Private Sub ButtonSearch_Click(sender As Object, e As EventArgs) Handles Button2.Click
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบการเลือกใน ComboBox (Item หรือ Drug)
        If ComboBox1.SelectedItem.ToString() = "ITEM" Then
            ' ถ้า TextBoxID ว่าง ให้แสดงข้อมูลทั้งหมด
            If String.IsNullOrEmpty(TextBoxID.Text) Then
                query = "SELECT ss.order_no, s.Supply_name, ss.status, ss.qty, ss.price, ss.Last_order_date, ss.Supplier_ID, ss.Supply_ID " &
                        "FROM Supply_suppliers ss " &
                        "JOIN Supply s ON ss.Supply_ID = s.Supply_ID"
            Else
                ' ถ้ามีการกรอก Order No ให้ค้นหาตาม Order No
                query = "SELECT ss.order_no, s.Supply_name, ss.status, ss.qty, ss.price, ss.Last_order_date, ss.Supplier_ID, ss.Supply_ID " &
                        "FROM Supply_suppliers ss " &
                        "JOIN Supply s ON ss.Supply_ID = s.Supply_ID " &
                        "WHERE ss.order_no = @OrderNo"
            End If

        ElseIf ComboBox1.SelectedItem.ToString() = "DRUG" Then
            ' ถ้า TextBoxID ว่าง ให้แสดงข้อมูลทั้งหมด
            If String.IsNullOrEmpty(TextBoxID.Text) Then
                query = "SELECT ds.order_no, d.Drug_name, ds.status, ds.qty, ds.price, ds.Last_order_date, ds.Supplier_ID, ds.Drug_ID " &
                        "FROM Drug_suppliers ds " &
                        "JOIN Drug d ON ds.Drug_ID = d.Drug_ID"
            Else
                ' ถ้ามีการกรอก Order No ให้ค้นหาตาม Order No
                query = "SELECT ds.order_no, d.Drug_name, ds.status, ds.qty, ds.price, ds.Last_order_date, ds.Supplier_ID, ds.Drug_ID " &
                        "FROM Drug_suppliers ds " &
                        "JOIN Drug d ON ds.Drug_ID = d.Drug_ID " &
                        "WHERE ds.order_no = @OrderNo"
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
    Private Sub ButtonSave_Click(sender As Object, e As EventArgs) Handles Button1.Click
        ' ตรวจสอบว่าเลือกแถวใน DataGridView หรือไม่
        If DataGridView1.SelectedRows.Count > 0 Then
            ' รับค่า order_no จากแถวที่เลือก
            Dim orderNo As Integer = Convert.ToInt32(DataGridView1.SelectedRows(0).Cells("order_no").Value)

            ' ตรวจสอบว่าเลือก RadioButton ใด
            Dim status As String = ""
            If RadioButtonDelivering.Checked Then
                status = "Delivering"
            ElseIf RadioButtonDelivered.Checked Then
                status = "Delivered"
            ElseIf RadioButtonCanceled.Checked Then
                status = "Canceled"
            End If

            ' อัปเดตฐานข้อมูล
            UpdateOrderStatus(orderNo, status)
        Else
            MessageBox.Show("กรุณาเลือกคำสั่งใน DataGridView ก่อน")
        End If
    End Sub

    ' ฟังก์ชันสำหรับอัปเดตสถานะในฐานข้อมูล
    Private Sub UpdateOrderStatus(orderNo As Integer, status As String)
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบว่าเลือก Item หรือ Drug
        If ComboBox1.SelectedItem.ToString() = "ITEM" Then
            query = "UPDATE Supply_suppliers SET status = @status WHERE order_no = @orderNo"
        ElseIf ComboBox1.SelectedItem.ToString() = "DRUG" Then
            query = "UPDATE Drug_suppliers SET status = @status WHERE order_no = @orderNo"
        End If

        ' เชื่อมต่อกับฐานข้อมูลและอัปเดตข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                command.Parameters.AddWithValue("@status", status)
                command.Parameters.AddWithValue("@orderNo", orderNo)

                connection.Open()
                command.ExecuteNonQuery()
            End Using
        End Using

        ' อัปเดต DataGridView หลังจากแก้ไขสถานะแล้ว
        MessageBox.Show("อัปเดตสถานะเรียบร้อยแล้ว")
        ButtonSearch_Click(Nothing, Nothing) ' เรียกค้นหาข้อมูลใหม่
    End Sub

    Private Sub Button3_Click(sender As Object, e As EventArgs) Handles Button3.Click
        RecviveFrom.Show()
        Me.Hide()
    End Sub


End Class