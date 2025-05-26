Imports System.Data.SqlClient

Public Class ReqStatusFrom
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
    Private Sub ButtonSearch_Click(sender As Object, e As EventArgs) Handles ButtonSearch.Click
        ' ตรวจสอบว่าเลือกประเภทจาก ComboBox หรือยัง
        If ComboBox1.SelectedItem Is Nothing Then
            MessageBox.Show("กรุณาเลือกประเภทก่อน")
            Return
        End If

        ' สร้างสายการเชื่อมต่อฐานข้อมูล
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบว่าต้องการแสดงตารางไหน (Item หรือ Drug)
        If ComboBox1.SelectedItem.ToString() = "Item" Then
            query = "SELECT Req_no, Supply_ID, Supply_name, Supply_description, Req_qty, status FROM Req_Supply_Detail"
        ElseIf ComboBox1.SelectedItem.ToString() = "Drug" Then
            query = "SELECT Req_no, Drug_ID, Drug_name, Drug_description, Req_qty, status FROM Req_Drug_Detail"
        End If

        ' ตรวจสอบการใส่ Req_no และปรับ query
        If Not String.IsNullOrEmpty(TextBoxID.Text) Then
            query &= " WHERE Req_no = @ReqNo"
        End If

        ' เชื่อมต่อฐานข้อมูลและดึงข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                ' เพิ่มพารามิเตอร์ Req_no ถ้ามีการใส่ข้อมูล
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

        ' ตรวจสอบว่าเลือกสถานะใน RadioButton หรือไม่
        Dim status As String = ""

        If RadioButtonDelivering.Checked Then
            status = "Delivering"
        ElseIf RadioButtonDelivered.Checked Then
            status = "Delivered"
        ElseIf RadioButtonCanceled.Checked Then
            status = "Canceled"
        Else
            MessageBox.Show("กรุณาเลือกสถานะ")
            Return
        End If

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
                command.Parameters.AddWithValue("@ReqNo", TextBoxID.Text)

                connection.Open()
                command.ExecuteNonQuery()
            End Using
        End Using

        ' แสดงข้อความแจ้งเตือนเมื่อบันทึกสำเร็จ
        MessageBox.Show("อัปเดตสถานะสำเร็จ")

        ' อัปเดตข้อมูลใน DataGridView
        UpdateDataGridView()
    End Sub


    Private Sub UpdateDataGridView()
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบว่าต้องการแสดงตารางไหน (Item หรือ Drug)
        If ComboBox1.SelectedItem.ToString() = "Item" Then
            query = "SELECT Req_no, Supply_ID, Supply_name, Supply_description, Req_qty, status FROM Req_Supply_Detail"
        ElseIf ComboBox1.SelectedItem.ToString() = "Drug" Then
            query = "SELECT Req_no, Drug_ID, Drug_name, Drug_description, Req_qty, status FROM Req_Drug_Detail"
        End If

        ' ตรวจสอบการใส่ Req_no และปรับ query
        If Not String.IsNullOrEmpty(TextBoxID.Text) Then
            If ComboBox1.SelectedItem.ToString() = "Item" Then
                query &= " WHERE Req_no = @ReqNo"
            ElseIf ComboBox1.SelectedItem.ToString() = "Drug" Then
                query &= " WHERE Req_no = @ReqNo"
            End If
        End If

        ' เชื่อมต่อฐานข้อมูลและดึงข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                ' เพิ่มพารามิเตอร์ Req_no ถ้ามีการใส่ข้อมูล
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
            End Using
        End Using
    End Sub

    Private Sub DataGridView1_SelectionChanged(sender As Object, e As EventArgs) Handles DataGridView1.SelectionChanged
        ' ตรวจสอบว่ามีการเลือกแถวใน DataGridView หรือไม่
        If DataGridView1.SelectedRows.Count > 0 Then
            ' ดึงค่า Req_no จากแถวที่เลือกใน DataGridView และแสดงใน TextBox
            TextBoxID.Text = DataGridView1.SelectedRows(0).Cells("Req_no").Value.ToString()
        End If
    End Sub


End Class