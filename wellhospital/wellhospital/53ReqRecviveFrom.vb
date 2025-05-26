Imports System.Data.SqlClient

Public Class ReqRecviveFrom
    Private Sub ButtonSearch_Click(sender As Object, e As EventArgs) Handles ButtonSearch.Click
        ' ตรวจสอบว่าเลือกประเภทจาก ComboBox หรือยัง
        If ComboBox1.SelectedItem Is Nothing Then
            MessageBox.Show("กรุณาเลือกประเภทก่อน")
            Return
        End If

        ' สร้างสายการเชื่อมต่อฐานข้อมูล
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบว่าต้องการแสดงตารางไหน (Item หรือ Drug) และตั้งค่า query
        If ComboBox1.SelectedItem.ToString() = "Item" Then
            query = "SELECT rh.Req_NO, rs.Supply_ID, rs.Supply_name, rs.Req_qty, rs.status, rh.Req_date, rh.Recieve_date " &
                    "FROM Requisition_Head rh " &
                    "JOIN Req_Supply_Detail rs ON rh.Req_NO = rs.Req_no " &
                    "WHERE rs.status = 'Delivered'"
        ElseIf ComboBox1.SelectedItem.ToString() = "Drug" Then
            query = "SELECT rh.Req_NO, rd.Drug_ID, rd.Drug_name, rd.Req_qty, rd.status, rh.Req_date, rh.Recieve_date " &
                    "FROM Requisition_Head rh " &
                    "JOIN Req_Drug_Detail rd ON rh.Req_NO = rd.Req_no " &
                    "WHERE rd.status = 'Delivered'"
        End If

        ' ตรวจสอบการใส่ ID และปรับ query
        If Not String.IsNullOrEmpty(TextBoxID.Text) Then
            query &= " AND rh.Req_NO = @ReqNo"
        End If

        ' เชื่อมต่อฐานข้อมูลและดึงข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                ' เพิ่มพารามิเตอร์ ReqNo ถ้ามีการใส่ข้อมูล
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
    Private Sub ButtonSave_Click(sender As Object, e As EventArgs) Handles ButtonSave.Click
        ' ตรวจสอบว่ามีการเลือกประเภทใน ComboBox หรือไม่
        If ComboBox1.SelectedItem Is Nothing Then
            MessageBox.Show("กรุณาเลือกประเภทก่อน")
            Return
        End If

        ' ตรวจสอบว่ามีการเลือกสถานะใน RadioButton หรือไม่
        Dim status As String = ""
        Dim updateRecieveDate As Boolean = False

        If RadioButtonReceived.Checked Then
            status = "Received"
            updateRecieveDate = True ' ถ้าสถานะเป็น Received ให้บันทึกวันที่ลง Recieve_date ด้วย
        ElseIf RadioButtonCanceled.Checked Then
            status = "Canceled"
        Else
            MessageBox.Show("กรุณาเลือกสถานะ")
            Return
        End If

        ' ตรวจสอบว่ามีการเลือกแถวใน DataGridView หรือไม่
        If DataGridView1.SelectedRows.Count = 0 Then
            MessageBox.Show("กรุณาเลือกแถวใน DataGridView")
            Return
        End If

        ' ดึงค่า Req_NO จากแถวที่เลือก
        Dim req_no As Integer = Convert.ToInt32(DataGridView1.SelectedRows(0).Cells("Req_no").Value)

        ' สายการเชื่อมต่อฐานข้อมูล
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบว่าเลือก Item หรือ Drug และกำหนด query สำหรับอัปเดตสถานะ
        If ComboBox1.SelectedItem.ToString() = "Item" Then
            query = "UPDATE Req_Supply_Detail SET status = @Status WHERE Req_no = @ReqNo"
        ElseIf ComboBox1.SelectedItem.ToString() = "Drug" Then
            query = "UPDATE Req_Drug_Detail SET status = @Status WHERE Req_no = @ReqNo"
        End If

        ' อัปเดตสถานะในตาราง Req_Supply_Detail หรือ Req_Drug_Detail
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                command.Parameters.AddWithValue("@Status", status)
                command.Parameters.AddWithValue("@ReqNo", req_no)

                connection.Open()
                command.ExecuteNonQuery()
            End Using
        End Using

        ' ถ้าสถานะเป็น Received ให้บันทึก Recieve_date ใน Requisition_Head
        If updateRecieveDate Then
            Dim updateRecieveDateQuery As String = "UPDATE Requisition_Head SET Recieve_date = @RecieveDate WHERE Req_NO = @ReqNo"
            Using connection As New SqlConnection(connectionString)
                Using command As New SqlCommand(updateRecieveDateQuery, connection)
                    command.Parameters.AddWithValue("@RecieveDate", DateTime.Now) ' ใส่วันที่ปัจจุบัน
                    command.Parameters.AddWithValue("@ReqNo", req_no)

                    connection.Open()
                    command.ExecuteNonQuery()
                End Using
            End Using
        End If

        ' แสดงข้อความแจ้งเตือนเมื่อบันทึกสำเร็จ
        MessageBox.Show("อัปเดตสถานะสำเร็จ")

        ' อัปเดตข้อมูลใน DataGridView
        UpdateDataGridView()
    End Sub

    Private Sub UpdateDataGridView()
        ' ฟังก์ชันในการอัปเดตข้อมูลใน DataGridView ตามประเภทที่เลือกใน ComboBox
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        If ComboBox1.SelectedItem.ToString() = "Item" Then
            query = "SELECT rh.Req_NO, rs.Supply_ID, rs.Supply_name, rs.Req_qty, rs.status, rh.Req_date, rh.Recieve_date " &
                "FROM Requisition_Head rh " &
                "JOIN Req_Supply_Detail rs ON rh.Req_NO = rs.Req_no " &
                "WHERE rs.status = 'Delivered'"
        ElseIf ComboBox1.SelectedItem.ToString() = "Drug" Then
            query = "SELECT rh.Req_NO, rd.Drug_ID, rd.Drug_name, rd.Req_qty, rd.status, rh.Req_date, rh.Recieve_date " &
                "FROM Requisition_Head rh " &
                "JOIN Req_Drug_Detail rd ON rh.Req_NO = rd.Req_no " &
                "WHERE rd.status = 'Delivered'"
        End If

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

    Private Sub Button3_Click(sender As Object, e As EventArgs) Handles Button3.Click
        ReqReFrom.Show()
        Me.Hide()

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