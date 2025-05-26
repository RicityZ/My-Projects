Imports System.Data.SqlClient
Imports System.Windows.Forms.VisualStyles.VisualStyleElement

Public Class ItemANDdrugManageFrom
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


    Private Sub ComboBox1_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ComboBox1.SelectedIndexChanged
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบว่าผู้ใช้เลือกอะไรใน ComboBox
        If ComboBox1.SelectedItem.ToString() = "ITEM" Then
            query = "SELECT Supply_ID, Supply_name, Supply_detail, Supply_stock_qty, Supply_cost FROM Supply"
        ElseIf ComboBox1.SelectedItem.ToString() = "DRUG" Then
            query = "SELECT Drug_ID, Drug_name, Drug_detail, Drug_stock_qty, Drug_cost FROM Drug"
        End If

        ' เชื่อมต่อกับฐานข้อมูลและรันคำสั่ง SQL
        Using connection As New SqlConnection(connectionString)
            Dim command As New SqlCommand(query, connection)
            Dim adapter As New SqlDataAdapter(command)
            Dim table As New DataTable()

            connection.Open()
            adapter.Fill(table)

            ' แสดงผลใน DataGridView
            DataGridView1.DataSource = table
            DataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill
        End Using
    End Sub

    Private Sub DataGridView1_CellClick(sender As Object, e As DataGridViewCellEventArgs) Handles DataGridView1.CellClick
        ' ตรวจสอบว่าแถวที่เลือกไม่เป็นแถวใหม่ (new row)
        If e.RowIndex >= 0 Then
            ' รับค่าแถวที่เลือกจาก DataGridView
            Dim selectedRow As DataGridViewRow = DataGridView1.Rows(e.RowIndex)

            ' ตรวจสอบว่าผู้ใช้เลือกอะไรใน ComboBox แล้วเติมข้อมูลลงใน TextBox
            If ComboBox1.SelectedItem.ToString() = "ITEM" Then
                TextBoxID.Text = selectedRow.Cells("Supply_ID").Value.ToString()
                TextBoxName.Text = selectedRow.Cells("Supply_name").Value.ToString()
                TextBoxDetail.Text = selectedRow.Cells("Supply_detail").Value.ToString()
                TextBoxCostPerUnit.Text = selectedRow.Cells("Supply_cost").Value.ToString()
                TextBoxQuantity.Text = selectedRow.Cells("Supply_stock_qty").Value.ToString()
            ElseIf ComboBox1.SelectedItem.ToString() = "DRUG" Then
                TextBoxID.Text = selectedRow.Cells("Drug_ID").Value.ToString()
                TextBoxName.Text = selectedRow.Cells("Drug_name").Value.ToString()
                TextBoxDetail.Text = selectedRow.Cells("Drug_detail").Value.ToString()
                TextBoxCostPerUnit.Text = selectedRow.Cells("Drug_cost").Value.ToString()
                TextBoxQuantity.Text = selectedRow.Cells("Drug_stock_qty").Value.ToString()
            End If
        End If
    End Sub

    ' ปุ่ม Add
    Private Sub ButtonAdd_Click(sender As Object, e As EventArgs) Handles ButtonAdd.Click
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Using connection As New SqlConnection(connectionString)
            Dim query As String = ""

            If ComboBox1.SelectedItem.ToString() = "ITEM" Then
                query = "INSERT INTO Supply (Supply_name, Supply_detail, Supply_stock_qty, Supply_cost) VALUES (@Name, @Detail, @StockQty, @Cost)"
            ElseIf ComboBox1.SelectedItem.ToString() = "DRUG" Then
                query = "INSERT INTO Drug (Drug_name, Drug_detail, Drug_stock_qty, Drug_cost) VALUES (@Name, @Detail, @StockQty, @Cost)"
            End If

            Using command As New SqlCommand(query, connection)
                command.Parameters.AddWithValue("@Name", TextBoxName.Text)
                command.Parameters.AddWithValue("@Detail", TextBoxDetail.Text)
                command.Parameters.AddWithValue("@StockQty", TextBoxQuantity.Text)
                command.Parameters.AddWithValue("@Cost", TextBoxCostPerUnit.Text)

                connection.Open()
                command.ExecuteNonQuery()
            End Using
        End Using
        MessageBox.Show("Record added successfully!")
        UpdateDataGridView() ' เรียกฟังก์ชันเพื่ออัปเดต DataGridView
    End Sub

    ' ปุ่ม Edit
    Private Sub ButtonEdit_Click(sender As Object, e As EventArgs) Handles ButtonEdit.Click
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Using connection As New SqlConnection(connectionString)
            Dim query As String = ""

            If ComboBox1.SelectedItem.ToString() = "ITEM" Then
                query = "UPDATE Supply SET Supply_name = @Name, Supply_detail = @Detail, Supply_stock_qty = @StockQty, Supply_cost = @Cost WHERE Supply_ID = @ID"
            ElseIf ComboBox1.SelectedItem.ToString() = "DRUG" Then
                query = "UPDATE Drug SET Drug_name = @Name, Drug_detail = @Detail, Drug_stock_qty = @StockQty, Drug_cost = @Cost WHERE Drug_ID = @ID"
            End If

            Using command As New SqlCommand(query, connection)
                command.Parameters.AddWithValue("@Name", TextBoxName.Text)
                command.Parameters.AddWithValue("@Detail", TextBoxDetail.Text)
                command.Parameters.AddWithValue("@StockQty", TextBoxQuantity.Text)
                command.Parameters.AddWithValue("@Cost", TextBoxCostPerUnit.Text)
                command.Parameters.AddWithValue("@ID", TextBoxID.Text)

                connection.Open()
                command.ExecuteNonQuery()
            End Using
        End Using
        MessageBox.Show("Record updated successfully!")
        UpdateDataGridView() ' เรียกฟังก์ชันเพื่ออัปเดต DataGridView
    End Sub

    ' ปุ่ม Delete
    Private Sub ButtonDelete_Click(sender As Object, e As EventArgs) Handles ButtonDelete.Click
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Using connection As New SqlConnection(connectionString)
            Dim query As String = ""

            If ComboBox1.SelectedItem.ToString() = "ITEM" Then
                query = "DELETE FROM Supply WHERE Supply_ID = @ID"
            ElseIf ComboBox1.SelectedItem.ToString() = "DRUG" Then
                query = "DELETE FROM Drug WHERE Drug_ID = @ID"
            End If

            Using command As New SqlCommand(query, connection)
                command.Parameters.AddWithValue("@ID", TextBoxID.Text)

                connection.Open()
                command.ExecuteNonQuery()
            End Using
        End Using
        MessageBox.Show("Record deleted successfully!")
        UpdateDataGridView() ' เรียกฟังก์ชันเพื่ออัปเดต DataGridView
    End Sub

    ' ฟังก์ชันสำหรับอัปเดต DataGridView
    Private Sub UpdateDataGridView()
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบว่าเลือก ITEM หรือ DRUG
        If ComboBox1.SelectedItem.ToString() = "ITEM" Then
            query = "SELECT Supply_ID, Supply_name, Supply_detail, Supply_stock_qty, Supply_cost FROM Supply"
        ElseIf ComboBox1.SelectedItem.ToString() = "DRUG" Then
            query = "SELECT Drug_ID, Drug_name, Drug_detail, Drug_stock_qty, Drug_cost FROM Drug"
        End If

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
    ' ปุ่ม Clear
    Private Sub ButtonClear_Click(sender As Object, e As EventArgs) Handles ButtonClear.Click
        ' ลบข้อความใน TextBox ทุกอัน
        TextBoxID.Clear()
        TextBoxName.Clear()
        TextBoxDetail.Clear()
        TextBoxQuantity.Clear()
        TextBoxCostPerUnit.Clear()

        ' เคลียร์ข้อมูลใน DataGridView

        ' แสดงข้อความแจ้งเตือนว่าเคลียร์ข้อมูลสำเร็จ
        MessageBox.Show("Cleared successfully!")
    End Sub


End Class