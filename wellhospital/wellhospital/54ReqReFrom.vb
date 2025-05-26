Imports System.Data.SqlClient

Public Class ReqReFrom
    Private Sub ComboBox1_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ComboBox1.SelectedIndexChanged
        ' ตรวจสอบว่าเลือกประเภทจาก ComboBox หรือยัง
        If ComboBox1.SelectedItem Is Nothing Then
            MessageBox.Show("กรุณาเลือกประเภทก่อน")
            Return
        End If

        ' สร้างสายการเชื่อมต่อฐานข้อมูล
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบว่าเลือก Item หรือ Drug และสร้าง query ให้ตรงตามประเภท
        If ComboBox1.SelectedItem.ToString() = "Item" Then
            query = "SELECT rh.Req_NO, rs.Supply_ID, rs.Supply_name, rs.Req_qty, rs.status, rh.Req_date, rh.Recieve_date " &
                    "FROM Requisition_Head rh " &
                    "JOIN Req_Supply_Detail rs ON rh.Req_NO = rs.Req_no " &
                    "WHERE rs.status = 'received'"
        ElseIf ComboBox1.SelectedItem.ToString() = "Drug" Then
            query = "SELECT rh.Req_NO, rd.Drug_ID, rd.Drug_name, rd.Req_qty, rd.status, rh.Req_date, rh.Recieve_date " &
                    "FROM Requisition_Head rh " &
                    "JOIN Req_Drug_Detail rd ON rh.Req_NO = rd.Req_no " &
                    "WHERE rd.status = 'received'"
        End If

        ' เชื่อมต่อฐานข้อมูลและดึงข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()

                connection.Open()
                adapter.Fill(table)

                ' แสดงข้อมูลใน DataGridView
                DataGridView1.DataSource = table
                DataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill
            End Using
        End Using
    End Sub
    Private Sub ButtonSearch_Click(sender As Object, e As EventArgs) Handles ButtonSearch.Click
        ' ตรวจสอบว่าเลือกประเภทจาก ComboBox หรือยัง
        If ComboBox1.SelectedItem Is Nothing Then
            MessageBox.Show("กรุณาเลือกประเภทก่อน")
            Return
        End If

        ' สร้างสายการเชื่อมต่อฐานข้อมูล
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบว่าเลือก Item หรือ Drug และสร้าง query ให้ตรงตามประเภท
        If ComboBox1.SelectedItem.ToString() = "Item" Then
            query = "SELECT rh.Req_NO, rs.Supply_ID, rs.Supply_name, rs.Req_qty, rs.status, rh.Req_date, rh.Recieve_date " &
                    "FROM Requisition_Head rh " &
                    "JOIN Req_Supply_Detail rs ON rh.Req_NO = rs.Req_no " &
                    "WHERE rs.status = 'received'"

            ' ตรวจสอบว่ามีการใส่ Req_NO ใน TextBoxID หรือไม่
            If Not String.IsNullOrEmpty(TextBoxID.Text) Then
                query &= " AND rh.Req_NO = @ReqNo"
            End If
        ElseIf ComboBox1.SelectedItem.ToString() = "Drug" Then
            query = "SELECT rh.Req_NO, rd.Drug_ID, rd.Drug_name, rd.Req_qty, rd.status, rh.Req_date, rh.Recieve_date " &
                    "FROM Requisition_Head rh " &
                    "JOIN Req_Drug_Detail rd ON rh.Req_NO = rd.Req_no " &
                    "WHERE rd.status = 'received'"

            ' ตรวจสอบว่ามีการใส่ Req_NO ใน TextBoxID หรือไม่
            If Not String.IsNullOrEmpty(TextBoxID.Text) Then
                query &= " AND rh.Req_NO = @ReqNo"
            End If
        End If

        ' เชื่อมต่อฐานข้อมูลและดึงข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                ' เพิ่มพารามิเตอร์ Req_NO ถ้ามีการใส่ข้อมูล
                If Not String.IsNullOrEmpty(TextBoxID.Text) Then
                    command.Parameters.AddWithValue("@ReqNo", TextBoxID.Text)
                End If

                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()

                connection.Open()
                adapter.Fill(table)

                ' แสดงข้อมูลใน DataGridView
                DataGridView1.DataSource = table
                DataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill

                ' แจ้งเตือนถ้าไม่พบข้อมูล
                If table.Rows.Count = 0 Then
                    MessageBox.Show("ไม่พบข้อมูล")
                End If
            End Using
        End Using
    End Sub

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
End Class