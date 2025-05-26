Imports System.Data.SqlClient

Public Class OrderFrom
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

        ' รับค่าจาก TextBox สำหรับการค้นหา Supplier ID
        Dim supplierID As String = TextBoxSuppliersID.Text.Trim()

        ' สร้าง SQL Query ที่จะดึงข้อมูลจากตาราง Suppliers
        Dim query As String

        ' ตรวจสอบว่าช่อง Supplier ID มีค่าหรือไม่
        If String.IsNullOrEmpty(supplierID) Then
            ' ถ้าไม่มีการป้อนค่าในช่อง Supplier ID ให้เคลียร์ช่อง Supplier Name
            TextBoxSuppliersName.Text = String.Empty
            ' และแสดงข้อมูลทั้งหมดใน DataGridView
            query = "SELECT Supplier_ID, Supplier_name FROM Supplier"
        Else
            ' ถ้ามีค่าใน Supplier ID ให้แสดงเฉพาะข้อมูลที่ตรงกับ Supplier ID
            query = "SELECT Supplier_ID, Supplier_name FROM Supplier WHERE Supplier_ID LIKE '%' + @SupplierID + '%'"
        End If

        ' เชื่อมต่อกับฐานข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                ' ถ้ามีการป้อนค่าใน Supplier ID ให้เพิ่มค่า Parameters ให้กับคำสั่ง SQL
                If Not String.IsNullOrEmpty(supplierID) Then
                    command.Parameters.AddWithValue("@SupplierID", supplierID)
                End If

                ' เปิดการเชื่อมต่อฐานข้อมูล
                connection.Open()

                ' ใช้ SqlDataAdapter เพื่อเติมข้อมูลลงใน DataTable
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()

                ' เติมข้อมูลจากฐานข้อมูลลงใน DataTable
                adapter.Fill(table)

                ' แสดงผลข้อมูลใน DataGridView
                DataGridView2.DataSource = table
                DataGridView2.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill
                ' ถ้ามีการค้นหาจาก Supplier ID ให้แสดงชื่อใน TextBox
                If table.Rows.Count > 0 AndAlso Not String.IsNullOrEmpty(supplierID) Then
                    TextBoxSuppliersName.Text = table.Rows(0)("Supplier_name").ToString()
                Else
                    ' ถ้าไม่พบข้อมูล Supplier Name ก็เคลียร์ TextBox
                    TextBoxSuppliersName.Text = String.Empty
                End If
            End Using
        End Using
    End Sub



    Private Sub DataGridView1_CellClick(sender As Object, e As DataGridViewCellEventArgs) Handles DataGridView2.CellClick
        ' ตรวจสอบว่าเลือกแถวที่ถูกต้องหรือไม่
        If e.RowIndex >= 0 Then
            Dim row As DataGridViewRow = DataGridView2.Rows(e.RowIndex)

            ' ดึงข้อมูลจากแถวที่เลือกมาใส่ใน TextBox
            TextBoxSuppliersID.Text = row.Cells("Supplier_ID").Value.ToString()
            TextBoxSuppliersName.Text = row.Cells("Supplier_name").Value.ToString()
        End If
    End Sub

    Private Sub ComboBox1_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ComboBox1.SelectedIndexChanged
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบค่าใน ComboBox
        If ComboBox1.SelectedItem.ToString() = "ITEM" Then
            query = "SELECT * FROM Supply_suppliers"
        ElseIf ComboBox1.SelectedItem.ToString() = "DRUG" Then
            query = "SELECT * FROM Drug_suppliers"
        End If

        ' เชื่อมต่อกับฐานข้อมูลและดึงข้อมูล
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
    End Sub

    Private Sub ComboBox2_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ComboBox2.SelectedIndexChanged
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบค่าใน ComboBox
        If ComboBox2.SelectedItem.ToString() = "ITEM" Then
            query = "SELECT * FROM Supply"
        ElseIf ComboBox2.SelectedItem.ToString() = "DRUG" Then
            query = "SELECT * FROM Drug"
        End If

        ' เชื่อมต่อกับฐานข้อมูลและดึงข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()
                connection.Open()
                adapter.Fill(table)
                DataGridView3.DataSource = table
            End Using
        End Using
    End Sub

    Private Sub DataGridView3_SelectionChanged(sender As Object, e As EventArgs) Handles DataGridView3.SelectionChanged
        If DataGridView3.SelectedRows.Count > 0 Then
            ' ตรวจสอบค่าใน ComboBox เพื่อกำหนดว่าจะแสดงข้อมูล Supply หรือ Drug
            If ComboBox2.SelectedItem.ToString() = "ITEM" Then
                ' สำหรับ Supply
                TextBoxID.Text = DataGridView3.SelectedRows(0).Cells("Supply_ID").Value.ToString() ' Assuming ID is in the first column
                TextBoxName.Text = DataGridView3.SelectedRows(0).Cells("Supply_name").Value.ToString() ' Assuming Name is in the second column
                TextBoxPrice.Text = DataGridView3.SelectedRows(0).Cells("Supply_cost").Value.ToString()

            ElseIf ComboBox2.SelectedItem.ToString() = "DRUG" Then
                ' สำหรับ Drug
                TextBoxID.Text = DataGridView3.SelectedRows(0).Cells("Drug_ID").Value.ToString() ' Assuming ID is in the first column
                TextBoxName.Text = DataGridView3.SelectedRows(0).Cells("Drug_name").Value.ToString() ' Assuming Name is in the second column
                TextBoxPrice.Text = DataGridView3.SelectedRows(0).Cells("Drug_cost").Value.ToString()

            End If
        End If
    End Sub




    Private Sub ButtonSearch2_Click(sender As Object, e As EventArgs) Handles Button2.Click
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบว่า TextBoxID ว่างหรือไม่
        If String.IsNullOrEmpty(TextBoxID.Text.Trim()) Then
            ' เคลียร์ข้อมูลใน TextBox ทุกช่อง
            TextBoxID.Clear()
            TextBoxName.Clear()
            TextBoxQuantity.Clear()
            TextBoxPrice.Clear()
            DateTimePicker1.Value = DateTime.Now ' ตั้งค่าวันที่เป็นวันที่ปัจจุบัน
            MessageBox.Show("เคลียร์แล้ว")
            Return
        End If

        ' ตรวจสอบว่าเลือก Item หรือ Drug ใน ComboBox
        If ComboBox2.SelectedItem.ToString() = "ITEM" Then
            query = "SELECT Supply_ID AS ID, Supply_name AS Name, Supply_stock_qty AS Quantity FROM Supply WHERE Supply_ID = @ID"
        ElseIf ComboBox2.SelectedItem.ToString() = "DRUG" Then
            query = "SELECT Drug_ID AS ID, Drug_name AS Name, Drug_stock_qty AS Quantity FROM Drug WHERE Drug_ID = @ID"
        End If

        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                ' เพิ่มค่า Parameters ให้กับคำสั่ง SQL
                command.Parameters.AddWithValue("@ID", TextBoxID.Text)

                ' ใช้ SqlDataAdapter เพื่อเติมข้อมูลลงใน DataTable
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()

                connection.Open()
                adapter.Fill(table)

                ' ถ้ามีข้อมูล ให้แสดงข้อมูลใน TextBox ต่างๆ
                If table.Rows.Count > 0 Then
                    TextBoxID.Text = table.Rows(0)("ID").ToString()
                    TextBoxName.Text = table.Rows(0)("Name").ToString()
                    TextBoxQuantity.Text = table.Rows(0)("Quantity").ToString()

                    ' กรณีที่ไม่มีวันที่ในตาราง Supply หรือ Drug ให้ตั้งเป็นวันที่ปัจจุบัน
                    DateTimePicker1.Value = DateTime.Now
                Else
                    MessageBox.Show("ไม่พบข้อมูลที่ค้นหา")
                    ' Clear ข้อมูลใน TextBox ถ้าไม่พบข้อมูล
                    TextBoxID.Clear()
                    TextBoxName.Clear()
                    TextBoxQuantity.Clear()
                    TextBoxPrice.Clear()
                End If
            End Using
        End Using
    End Sub

    Private Sub TextBoxQuantity_TextChanged(sender As Object, e As EventArgs) Handles TextBoxQuantity.TextChanged
        ' ตรวจสอบว่าช่อง TextBoxQuantity และ TextBoxPrice ไม่ว่างเปล่า
        If Not String.IsNullOrEmpty(TextBoxQuantity.Text) AndAlso Not String.IsNullOrEmpty(TextBoxPrice.Text) Then
            Dim quantity As Decimal
            Dim price As Decimal

            ' พยายามแปลงค่าใน TextBox เป็นจำนวนตัวเลข
            If Decimal.TryParse(TextBoxQuantity.Text, quantity) AndAlso Decimal.TryParse(TextBoxPrice.Text, price) Then
                ' คำนวณราคาทั้งหมดและแสดงใน TextBoxTotalPrice
                Dim totalPrice As Decimal = quantity * price
                TextBoxTotalPrice.Text = totalPrice.ToString("F2") ' แสดงผลเป็นทศนิยม 2 ตำแหน่ง
            Else
                ' ถ้าแปลงค่าไม่สำเร็จ ให้ล้างช่อง Total Price
                TextBoxTotalPrice.Clear()
            End If
        Else
            ' ถ้าช่องใดช่องหนึ่งว่างเปล่า ให้ล้างช่อง Total Price
            TextBoxTotalPrice.Clear()
        End If
    End Sub
    Private Sub UpdateDataGridView1()
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบค่าใน ComboBox ว่าเลือก ITEM หรือ DRUG
        If ComboBox2.SelectedItem.ToString() = "ITEM" Then
            query = "SELECT * FROM Supply_suppliers ORDER BY Last_order_date DESC"
        ElseIf ComboBox2.SelectedItem.ToString() = "DRUG" Then
            query = "SELECT * FROM Drug_suppliers ORDER BY Last_order_date DESC"
        End If

        ' เชื่อมต่อกับฐานข้อมูลและดึงข้อมูลมาแสดงใน DataGridView
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()
                connection.Open()
                adapter.Fill(table)
                DataGridView1.DataSource = table ' แสดงข้อมูลใหม่ใน DataGridView
                DataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill
            End Using
        End Using
    End Sub

    ' แก้ไขโค้ดในปุ่ม Order เพื่อเรียกใช้ฟังก์ชัน UpdateDataGridView หลังการบันทึกข้อมูล
    Private Sub ButtonOrder_Click(sender As Object, e As EventArgs) Handles ButtonOrder.Click
        ' ตรวจสอบข้อมูลก่อนบันทึก
        If String.IsNullOrEmpty(TextBoxID.Text) Or String.IsNullOrEmpty(TextBoxQuantity.Text) Or String.IsNullOrEmpty(TextBoxPrice.Text) Then
            MessageBox.Show("กรุณากรอกข้อมูลให้ครบถ้วน")
            Return
        End If

        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        If ComboBox2.SelectedItem.ToString() = "ITEM" Then
            query = "INSERT INTO Supply_suppliers (Supplier_ID, Supply_ID, Last_order_date, qty, price) VALUES (@SupplierID, @ItemID, @OrderDate, @Quantity, @Price)"
        ElseIf ComboBox2.SelectedItem.ToString() = "DRUG" Then
            query = "INSERT INTO Drug_suppliers (Supplier_ID, Drug_ID, Last_order_date, qty, price) VALUES (@SupplierID, @DrugID, @OrderDate, @Quantity, @Price)"
        End If

        ' บันทึกข้อมูลลงฐานข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                command.Parameters.AddWithValue("@SupplierID", TextBoxSuppliersID.Text)
                command.Parameters.AddWithValue("@OrderDate", DateTimePicker1.Value)
                command.Parameters.AddWithValue("@Quantity", TextBoxQuantity.Text)
                command.Parameters.AddWithValue("@Price", TextBoxTotalPrice.Text)

                If ComboBox2.SelectedItem.ToString() = "ITEM" Then
                    command.Parameters.AddWithValue("@ItemID", TextBoxID.Text)
                ElseIf ComboBox2.SelectedItem.ToString() = "DRUG" Then
                    command.Parameters.AddWithValue("@DrugID", TextBoxID.Text)
                End If

                connection.Open()
                command.ExecuteNonQuery()
                MessageBox.Show("บันทึกข้อมูลสำเร็จ")
            End Using
        End Using

        ' เรียกฟังก์ชัน UpdateDataGridView เพื่ออัปเดต DataGridView
        UpdateDataGridView1()
    End Sub

End Class