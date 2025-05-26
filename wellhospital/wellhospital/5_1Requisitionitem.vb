Imports System.Data.SqlClient
Imports System.Windows.Forms.VisualStyles.VisualStyleElement

Public Class Requisitionitem
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
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' สร้าง query สำหรับการค้นหาข้อมูลทั้งหมดถ้าไม่กรอก Ward ID
        query = "SELECT w.Ward_ID, w.Ward_name, wi.Staff_ID, " &
            "CONCAT(s.staff_firstname, ' ', s.staff_lastname) AS Staff_fullname " &
            "FROM Ward w " &
            "JOIN Work_In wi ON w.Ward_ID = wi.Ward_ID " &
            "JOIN Staff s ON wi.Staff_ID = s.Staff_ID"

        ' ถ้าใส่ค่าใน TextBoxWardID หรือ TextBoxStaffName จะเพิ่มเงื่อนไขการค้นหา
        Dim conditions As New List(Of String)

        If Not String.IsNullOrEmpty(TextBoxWardID.Text) Then
            conditions.Add("w.Ward_ID = @WardID")
        End If


        ' เพิ่มเงื่อนไขการค้นหาถ้ามีการกรอก Ward ID หรือ Staff Name
        If conditions.Count > 0 Then
            query &= " WHERE " & String.Join(" AND ", conditions)
        End If

        ' เชื่อมต่อกับฐานข้อมูลและดึงข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                ' กำหนดค่า parameter ถ้ามีการกรอก Ward ID
                If Not String.IsNullOrEmpty(TextBoxWardID.Text) Then
                    command.Parameters.AddWithValue("@WardID", TextBoxWardID.Text)
                End If

                ' กำหนดค่า parameter ถ้ามีการกรอก Staff Name


                ' ใช้ SqlDataAdapter เพื่อดึงข้อมูล
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()

                ' เปิดการเชื่อมต่อและเติมข้อมูลลงใน DataTable
                connection.Open()
                adapter.Fill(table)

                ' แสดงผลข้อมูลใน DataGridView
                DataGridView2.DataSource = table


                ' ถ้าไม่พบข้อมูล
                If table.Rows.Count = 0 Then
                    MessageBox.Show("ไม่พบข้อมูล")
                End If
            End Using
        End Using
    End Sub
    Private Sub DataGridView2_SelectionChanged(sender As Object, e As EventArgs) Handles DataGridView2.SelectionChanged
        If DataGridView2.SelectedRows.Count > 0 Then
            ' แสดงข้อมูลใน TextBox
            TextBoxWardID.Text = DataGridView2.SelectedRows(0).Cells("Ward_ID").Value.ToString()
            TextBoxWardName.Text = DataGridView2.SelectedRows(0).Cells("Ward_name").Value.ToString()
            TextBoxStaffName.Text = DataGridView2.SelectedRows(0).Cells("Staff_fullname").Value.ToString()
        End If
    End Sub

    Private Sub BButton1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        ' ตรวจสอบการเลือกประเภทใน ComboBox ก่อนทำการค้นหา
        If ComboBox2.SelectedItem Is Nothing Then
            MessageBox.Show("กรุณาเลือกประเภทก่อน")
            Return
        End If

        ' กำหนดสายการเชื่อมต่อฐานข้อมูล
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบการเลือกประเภทและสร้าง query ให้เหมาะสม
        If ComboBox2.SelectedItem.ToString() = "Drug" Then
            query = "SELECT Drug_ID AS ID, Drug_name AS Name, Drug_stock_qty AS Quantity, Drug_detail AS Description FROM Drug"
            If Not String.IsNullOrEmpty(TextBoxID.Text) Then
                query &= " WHERE Drug_ID = @ID"
            End If
        ElseIf ComboBox2.SelectedItem.ToString() = "Item" Then
            query = "SELECT Supply_ID AS ID, Supply_name AS Name, Supply_stock_qty AS Quantity, Supply_detail AS Description FROM Supply"
            If Not String.IsNullOrEmpty(TextBoxID.Text) Then
                query &= " WHERE Supply_ID = @ID"
            End If
        End If

        ' เชื่อมต่อกับฐานข้อมูลและดึงข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                ' เพิ่ม parameter ID ถ้ามีการกรอกข้อมูลใน TextBoxID
                If Not String.IsNullOrEmpty(TextBoxID.Text) Then
                    command.Parameters.AddWithValue("@ID", TextBoxID.Text)
                End If

                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()

                connection.Open()
                adapter.Fill(table)

                ' แสดงผลข้อมูลใน DataGridView
                DataGridView3.DataSource = table


                ' ถ้าไม่พบข้อมูล ให้ลบข้อมูลใน TextBox
                If table.Rows.Count = 0 Then
                    MessageBox.Show("ไม่พบข้อมูล")
                    ClearTextBoxes()
                ElseIf table.Rows.Count = 1 Then
                    ' กรอกข้อมูลลง TextBox เมื่อพบข้อมูล
                    TextBoxID.Text = table.Rows(0)("ID").ToString()
                    TextBoxName.Text = table.Rows(0)("Name").ToString()

                End If
            End Using
        End Using
    End Sub

    ' ฟังก์ชันสำหรับการเคลียร์ TextBox ทั้งหมด
    Private Sub ClearTextBoxes()
        TextBoxID.Clear()
        TextBoxName.Clear()
        TextBoxQuantity.Clear()
        TextBoxDescription.Clear()
    End Sub

    ' ฟังก์ชันสำหรับการเลือกข้อมูลจาก DataGridView
    Private Sub DataGridView3_SelectionChanged(sender As Object, e As EventArgs) Handles DataGridView3.SelectionChanged
        If DataGridView3.SelectedRows.Count > 0 Then
            TextBoxID.Text = DataGridView3.SelectedRows(0).Cells("ID").Value.ToString()
            TextBoxName.Text = DataGridView3.SelectedRows(0).Cells("Name").Value.ToString()

        End If
    End Sub
    Private Sub ButtonOrder_Click(sender As Object, e As EventArgs) Handles ButtonOrder.Click
        ' ตรวจสอบการเลือกข้อมูลใน DataGridView
        If DataGridView2.SelectedRows.Count = 0 Then
            MessageBox.Show("กรุณาเลือกข้อมูลในตารางด้านซ้ายก่อน")
            Return
        End If

        ' ดึงข้อมูลจาก DataGridView
        Dim wardID As Integer = Integer.Parse(DataGridView2.SelectedRows(0).Cells("Ward_ID").Value.ToString())
        Dim chargeNurseID As Integer = Integer.Parse(DataGridView2.SelectedRows(0).Cells("Staff_ID").Value.ToString())

        ' กำหนดสายการเชื่อมต่อฐานข้อมูล
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = "INSERT INTO Requisition_Head (Req_date, Ward_ID, Charge_nurse) VALUES (@ReqDate, @WardID, @ChargeNurse)"

        ' เชื่อมต่อกับฐานข้อมูลและบันทึกข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                ' กำหนดค่าพารามิเตอร์
                command.Parameters.AddWithValue("@ReqDate", DateTime.Now)
                command.Parameters.AddWithValue("@WardID", wardID)
                command.Parameters.AddWithValue("@ChargeNurse", chargeNurseID)

                ' เปิดการเชื่อมต่อและบันทึกข้อมูล
                connection.Open()
                command.ExecuteNonQuery()

            End Using
        End Using
    End Sub

    Private Sub ButtonOrder1_Click(sender As Object, e As EventArgs) Handles ButtonOrder.Click
        ' ตรวจสอบว่ามีการเลือกประเภทใน ComboBox หรือไม่
        If ComboBox2.SelectedItem Is Nothing Then
            MessageBox.Show("กรุณาเลือกประเภทก่อน")
            Return
        End If

        ' กำหนดค่าเชื่อมต่อฐานข้อมูล
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""
        Dim req_no As Integer

        ' ดึงค่า Req_no ล่าสุดจาก Requisition_Head
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand("SELECT TOP 1 Req_NO FROM Requisition_Head ORDER BY Req_NO DESC", connection)
                connection.Open()
                Dim result As Object = command.ExecuteScalar()
                If result IsNot Nothing Then
                    req_no = Convert.ToInt32(result)
                Else
                    MessageBox.Show("ไม่พบหมายเลขคำร้องในฐานข้อมูล")
                    Return
                End If
            End Using
        End Using

        ' ตรวจสอบว่ากำลังสั่ง Item หรือ Drug และตั้งค่า Query ตามที่เลือก
        If ComboBox2.SelectedItem.ToString() = "Item" Then
            query = "INSERT INTO Req_Supply_Detail (Req_no, Supply_ID, Req_qty, Supply_name, Supply_description) " &
            "VALUES (@Req_no, @ID, @Qty, @Name, @Description)"
        ElseIf ComboBox2.SelectedItem.ToString() = "Drug" Then
            query = "INSERT INTO Req_Drug_Detail (Req_no, Drug_ID, Req_qty, Drug_name, Drug_description) " &
            "VALUES (@Req_no, @ID, @Qty, @Name, @Description)"
        End If

        ' ดึงข้อมูลจาก TextBox
        Dim id As Integer = Integer.Parse(TextBoxID.Text)
        Dim qty As Integer = Integer.Parse(TextBoxQuantity.Text)
        Dim name As String = TextBoxName.Text
        Dim description As String = TextBoxDescription.Text

        ' เชื่อมต่อกับฐานข้อมูลและบันทึกข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                ' เพิ่ม Parameter
                command.Parameters.AddWithValue("@Req_no", req_no)
                command.Parameters.AddWithValue("@ID", id)
                command.Parameters.AddWithValue("@Qty", qty)
                command.Parameters.AddWithValue("@Name", name)
                command.Parameters.AddWithValue("@Description", description)

                ' เปิดการเชื่อมต่อและทำการ Execute
                connection.Open()
                command.ExecuteNonQuery()
                MessageBox.Show("บันทึกข้อมูลสำเร็จ")
            End Using
        End Using

        ' เรียกใช้ ComboBox1_SelectedIndexChanged เพื่ออัปเดต DataGridView
        ComboBox1_SelectedIndexChanged(sender, e)
    End Sub


    Private Sub ComboBox1_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ComboBox1.SelectedIndexChanged
        ' สายการเชื่อมต่อไปยังฐานข้อมูล
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบการเลือกจาก ComboBox เพื่อกำหนด query ให้ตรงกับประเภท
        If ComboBox1.SelectedItem IsNot Nothing Then
            If ComboBox1.SelectedItem.ToString() = "Item" Then
                query = "SELECT Req_no,Supply_ID, Supply_name, Supply_description, Req_qty FROM Req_Supply_Detail"
            ElseIf ComboBox1.SelectedItem.ToString() = "Drug" Then
                query = "SELECT Req_no,Drug_ID, Drug_name, Drug_description, Req_qty FROM Req_Drug_Detail"
            End If

            ' แสดงผลข้อมูลใน DataGridView ตามประเภทที่เลือก
            Using connection As New SqlConnection(connectionString)
                Using command As New SqlCommand(query, connection)
                    Dim adapter As New SqlDataAdapter(command)
                    Dim table As New DataTable()

                    connection.Open()
                    adapter.Fill(table)

                    DataGridView1.DataSource = table
                    DataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill
                End Using
            End Using
        Else
            MessageBox.Show("กรุณาเลือกประเภทจาก ComboBox ก่อน")
        End If
    End Sub



End Class