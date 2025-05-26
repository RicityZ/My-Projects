Imports System.Data.SqlClient

Public Class supLIERfrom
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
        Me.Show()
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
        Dim query As String

        If String.IsNullOrEmpty(TextBoxID.Text) Then
            query = "SELECT * FROM Supplier"
        Else
            query = "SELECT * FROM Supplier WHERE Supplier_ID = @SupplierID"
        End If

        ' เชื่อมต่อฐานข้อมูลและค้นหาข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                If Not String.IsNullOrEmpty(TextBoxID.Text) Then
                    command.Parameters.AddWithValue("@SupplierID", TextBoxID.Text)
                End If

                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()

                connection.Open()
                adapter.Fill(table)

                DataGridView1.DataSource = table
                DataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill
                ' แสดงข้อความถ้าไม่พบข้อมูล
                If table.Rows.Count = 0 Then
                    MessageBox.Show("ไม่พบข้อมูล")
                End If
            End Using
        End Using
    End Sub

    Private Sub DataGridView1_SelectionChanged(sender As Object, e As EventArgs) Handles DataGridView1.SelectionChanged
        If DataGridView1.SelectedRows.Count > 0 Then
            TextBoxID.Text = DataGridView1.SelectedRows(0).Cells("Supplier_ID").Value.ToString()
            TextBoxName.Text = DataGridView1.SelectedRows(0).Cells("Supplier_name").Value.ToString()
            TextBoxTel.Text = DataGridView1.SelectedRows(0).Cells("Supplier_tel").Value.ToString()
            TextBoxFax.Text = DataGridView1.SelectedRows(0).Cells("Supplier_fax").Value.ToString()
            TextBoxAddress.Text = DataGridView1.SelectedRows(0).Cells("Supplier_add").Value.ToString()
        End If
    End Sub

    Private Sub ButtonAdd_Click(sender As Object, e As EventArgs) Handles ButtonAdd.Click
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = "INSERT INTO Supplier (Supplier_name, Supplier_add, Supplier_tel, Supplier_fax) VALUES (@Name, @Address, @Tel, @Fax)"

        ' เชื่อมต่อฐานข้อมูลและบันทึกข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                command.Parameters.AddWithValue("@Name", TextBoxName.Text)
                command.Parameters.AddWithValue("@Address", TextBoxAddress.Text)
                command.Parameters.AddWithValue("@Tel", TextBoxTel.Text)
                command.Parameters.AddWithValue("@Fax", TextBoxFax.Text)

                connection.Open()
                command.ExecuteNonQuery()
                MessageBox.Show("เพิ่มข้อมูลสำเร็จ")
            End Using
        End Using

        ' รีเฟรชข้อมูลใน DataGridView โดยเรียกฟังก์ชัน UpdateDataGrid
        UpdateDataGrid()

        ' ลบข้อมูลใน TextBox
        ButtonClear_Click(sender, e)
    End Sub

    Private Sub ButtonEdit_Click(sender As Object, e As EventArgs) Handles ButtonEdit.Click
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = "UPDATE Supplier SET Supplier_name = @Name, Supplier_add = @Address, Supplier_tel = @Tel, Supplier_fax = @Fax WHERE Supplier_ID = @SupplierID"

        ' เชื่อมต่อฐานข้อมูลและอัปเดตข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                command.Parameters.AddWithValue("@SupplierID", TextBoxID.Text)
                command.Parameters.AddWithValue("@Name", TextBoxName.Text)
                command.Parameters.AddWithValue("@Address", TextBoxAddress.Text)
                command.Parameters.AddWithValue("@Tel", TextBoxTel.Text)
                command.Parameters.AddWithValue("@Fax", TextBoxFax.Text)

                connection.Open()
                command.ExecuteNonQuery()
                MessageBox.Show("แก้ไขข้อมูลสำเร็จ")
            End Using
        End Using

        ' รีเฟรชข้อมูลใน DataGridView โดยเรียกฟังก์ชัน UpdateDataGrid
        UpdateDataGrid()

        ' ลบข้อมูลใน TextBox
        ButtonClear_Click(sender, e)
    End Sub

    Private Sub ButtonDelete_Click(sender As Object, e As EventArgs) Handles ButtonDelete.Click
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = "DELETE FROM Supplier WHERE Supplier_ID = @SupplierID"

        ' เชื่อมต่อฐานข้อมูลและลบข้อมูล
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                command.Parameters.AddWithValue("@SupplierID", TextBoxID.Text)

                connection.Open()
                command.ExecuteNonQuery()
                MessageBox.Show("ลบข้อมูลสำเร็จ")
            End Using
        End Using

        ' รีเฟรชข้อมูลใน DataGridView โดยเรียกฟังก์ชัน UpdateDataGrid
        UpdateDataGrid()

        ' ลบข้อมูลใน TextBox
        ButtonClear_Click(sender, e)
    End Sub

    Private Sub ButtonClear_Click(sender As Object, e As EventArgs) Handles ButtonClear.Click
        ' เคลียร์ข้อมูลใน TextBox ทั้งหมด
        TextBoxID.Clear()
        TextBoxName.Clear()
        TextBoxTel.Clear()
        TextBoxFax.Clear()
        TextBoxAddress.Clear()

        ' รีเซ็ตโฟกัสไปที่ TextBox ID
        TextBoxID.Focus()
    End Sub
    Private Sub UpdateDataGrid()
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = "SELECT * FROM Supplier"

        ' เชื่อมต่อฐานข้อมูลและดึงข้อมูลทั้งหมดมาแสดงใน DataGridView
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()

                connection.Open()
                adapter.Fill(table)

                ' ผูกข้อมูลกับ DataGridView
                DataGridView1.DataSource = table
                DataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill
            End Using
        End Using
    End Sub


End Class