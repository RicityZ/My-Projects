Imports System.Data.SqlClient
Imports System.Windows.Forms.VisualStyles

Public Class WardAllowcate
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
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

        ' รับค่าจาก TextBox สำหรับการค้นหา Staff ID
        Dim searchValue As String = TextBox4.Text.Trim()

        ' สร้าง SQL Query ที่จะใช้ค้นหา Staff ID
        Dim query As String = "SELECT * FROM Staff WHERE Staff_ID LIKE @SearchTerm OR 
                           Staff_firstname + ' ' + Staff_lastname LIKE @SearchTerm"

        ' เชื่อมต่อกับฐานข้อมูลและรันคำสั่ง SQL
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                ' เพิ่มค่า Parameters ให้กับคำสั่ง SQL
                command.Parameters.AddWithValue("@SearchTerm", "%" & searchValue & "%")

                ' เปิดการเชื่อมต่อฐานข้อมูล
                connection.Open()

                ' ใช้ SqlDataAdapter เพื่อเติมข้อมูลลงใน DataTable
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()

                ' เติมข้อมูลจากฐานข้อมูลลงใน DataTable
                adapter.Fill(table)

                ' แสดงผลข้อมูลใน DataGridView
                DataGridView1.DataSource = table
            End Using
        End Using
    End Sub
    Private Sub ComboBoxWardName_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ComboBox2.SelectedIndexChanged
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

        ' รับค่า Ward Name ที่เลือกจาก ComboBox
        Dim selectedWardName As String = ComboBox2.SelectedItem.ToString()

        ' สร้าง SQL Query เพื่อค้นหา Ward ID และ Ward Locate ที่ตรงกับ Ward Name
        Dim query As String = "SELECT Ward_ID, Ward_locate FROM Ward WHERE Ward_name = @WardName"

        ' เชื่อมต่อกับฐานข้อมูลและรันคำสั่ง SQL
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                ' เพิ่มค่า Parameters ให้กับคำสั่ง SQL
                command.Parameters.AddWithValue("@WardName", selectedWardName)

                ' เปิดการเชื่อมต่อฐานข้อมูล
                connection.Open()

                ' รันคำสั่ง SQL และดึงค่า Ward ID และ Ward Locate
                Dim reader As SqlDataReader = command.ExecuteReader()

                If reader.Read() Then
                    ' แสดงผลใน TextBox หากพบค่า Ward ID และ Ward Locate
                    ComboBox1.Text = reader("Ward_ID").ToString()
                    TextBox1.Text = reader("Ward_locate").ToString()
                Else
                    MessageBox.Show("ไม่พบข้อมูลที่ตรงกับ Ward Name ที่เลือก")
                End If

                ' ปิดการอ่านข้อมูล
                reader.Close()
            End Using
        End Using
    End Sub
    Private Sub DataGridView_CellClick(sender As Object, e As DataGridViewCellEventArgs) Handles DataGridView1.CellClick
        ' ตรวจสอบว่าแถวที่คลิกไม่ใช่แถวหัวข้อหรือแถวที่ไม่มีข้อมูล
        If e.RowIndex >= 0 Then
            ' ดึงค่า Staff ID จากแถวที่ถูกคลิกในคอลัมน์แรก (เปลี่ยนตามคอลัมน์ของ Staff ID ใน DataGridView ของคุณ)
            Dim selectedStaffID As String = DataGridView1.Rows(e.RowIndex).Cells("Staff_ID").Value.ToString()

            ' แสดงค่า Staff ID ใน TextBox ที่ต้องการ
            TextBox4.Text = selectedStaffID
        End If
    End Sub
    Private Sub ButtonAdd_Click(sender As Object, e As EventArgs) Handles Button1.Click
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

        ' SQL Query สำหรับการ Insert ข้อมูลลงในตาราง Work_In
        Dim query As String = "INSERT INTO Work_In (Work_INDate, Work_shift, Staff_ID, Ward_ID) VALUES (@WorkINDate, @WorkShift, @StaffID, @WardID)"

        ' เชื่อมต่อกับฐานข้อมูลและรันคำสั่ง SQL
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                ' กำหนดค่าจากฟอร์มที่ถูกกรอกลงใน SQL
                command.Parameters.AddWithValue("@WorkINDate", DateTimePicker1.Value) ' Date จาก DateTimePicker
                command.Parameters.AddWithValue("@WorkShift", ComboBox3.SelectedItem.ToString()) ' Shift จาก ComboBox
                command.Parameters.AddWithValue("@StaffID", TextBox4.Text) ' Staff_ID จาก TextBox
                command.Parameters.AddWithValue("@WardID", ComboBox1.SelectedItem.ToString()) ' Ward_ID จาก ComboBox

                Try
                    ' เปิดการเชื่อมต่อฐานข้อมูล
                    connection.Open()

                    ' รันคำสั่ง SQL
                    command.ExecuteNonQuery()

                    ' แสดงข้อความเมื่อบันทึกสำเร็จ
                    MessageBox.Show("Data added successfully!")

                    ' อัปเดต DataGridView หลังจากบันทึกข้อมูลสำเร็จ
                    UpdateDataGridView()

                Catch ex As Exception
                    ' แสดงข้อความเมื่อเกิดข้อผิดพลาด
                    MessageBox.Show("Error: " & ex.Message)
                Finally
                    ' ปิดการเชื่อมต่อฐานข้อมูล
                    connection.Close()
                End Try
            End Using
        End Using
    End Sub
    Private Sub UpdateDataGridView()
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

        ' SQL Query สำหรับการดึงข้อมูลจาก Work_In และ Ward
        Dim query As String = "SELECT Work_In.Staff_ID, Work_In.Ward_ID, Ward.Ward_name, Ward.Ward_locate, Work_In.Work_INDate, Work_In.Work_shift 
                           FROM Work_In 
                           INNER JOIN Ward ON Work_In.Ward_ID = Ward.Ward_ID"

        ' เชื่อมต่อกับฐานข้อมูลและรันคำสั่ง SQL
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)

                ' เปิดการเชื่อมต่อฐานข้อมูล
                connection.Open()

                ' ใช้ SqlDataAdapter เพื่อเติมข้อมูลลงใน DataTable
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()

                ' เติมข้อมูลจากฐานข้อมูลลงใน DataTable
                adapter.Fill(table)

                ' แสดงผลข้อมูลใน DataGridView
                DataGridView1.DataSource = table

                ' ปรับ DataGridView ให้เต็มพื้นที่

            End Using
        End Using
    End Sub
    Private Sub ButtonDelete_Click(sender As Object, e As EventArgs) Handles Button3.Click
        ' ตรวจสอบว่ามีการเลือกแถวใน DataGridView หรือไม่
        If DataGridView1.SelectedRows.Count > 0 Then
            ' รับค่า Staff_ID และ Ward_ID จากแถวที่เลือกใน DataGridView
            Dim staffID As Integer = Convert.ToInt32(DataGridView1.SelectedRows(0).Cells("Staff_ID").Value)
            Dim wardID As Integer = Convert.ToInt32(DataGridView1.SelectedRows(0).Cells("Ward_ID").Value)

            ' สายการเชื่อมต่อไปยัง SQL Server
            Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

            ' SQL Query สำหรับการลบข้อมูลจากตาราง Work_In
            Dim query As String = "DELETE FROM Work_In WHERE Staff_ID = @StaffID AND Ward_ID = @WardID"

            ' เชื่อมต่อกับฐานข้อมูลและรันคำสั่ง SQL
            Using connection As New SqlConnection(connectionString)
                Using command As New SqlCommand(query, connection)
                    ' กำหนดค่า Parameters ให้กับคำสั่ง SQL
                    command.Parameters.AddWithValue("@StaffID", staffID)
                    command.Parameters.AddWithValue("@WardID", wardID)

                    Try
                        ' เปิดการเชื่อมต่อฐานข้อมูล
                        connection.Open()

                        ' รันคำสั่ง SQL เพื่อลบข้อมูล
                        command.ExecuteNonQuery()

                        ' แสดงข้อความเมื่อการลบสำเร็จ
                        MessageBox.Show("Data deleted successfully!")

                        ' อัปเดต DataGridView เพื่อแสดงข้อมูลล่าสุด
                        UpdateDataGridView1()

                    Catch ex As Exception
                        ' แสดงข้อความเมื่อเกิดข้อผิดพลาด
                        MessageBox.Show("Error: " & ex.Message)
                    Finally
                        ' ปิดการเชื่อมต่อฐานข้อมูล
                        connection.Close()
                    End Try
                End Using
            End Using
        Else
            MessageBox.Show("Please select a row to delete.")
        End If
    End Sub
    Private Sub UpdateDataGridView1()
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

        ' SQL Query สำหรับการดึงข้อมูลจาก Work_In และ Ward
        Dim query As String = "SELECT Work_In.Staff_ID, Work_In.Ward_ID, Ward.Ward_name, Ward.Ward_locate, Work_In.Work_INDate, Work_In.Work_shift 
                           FROM Work_In 
                           INNER JOIN Ward ON Work_In.Ward_ID = Ward.Ward_ID"

        ' เชื่อมต่อกับฐานข้อมูลและรันคำสั่ง SQL
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)

                ' เปิดการเชื่อมต่อฐานข้อมูล
                connection.Open()

                ' ใช้ SqlDataAdapter เพื่อเติมข้อมูลลงใน DataTable
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()

                ' เติมข้อมูลจากฐานข้อมูลลงใน DataTable
                adapter.Fill(table)

                ' แสดงผลข้อมูลใน DataGridView
                DataGridView1.DataSource = table

                ' ปรับ DataGridView ให้เต็มพื้นที่

            End Using
        End Using
    End Sub

    Private Sub RadioButton_CheckedChanged(sender As Object, e As EventArgs) Handles RadioButtonStaff.CheckedChanged, RadioButtonWard.CheckedChanged
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = ""

        ' ตรวจสอบว่าเลือก RadioButton ตัวใด
        If RadioButtonStaff.Checked Then
            query = "SELECT Staff_ID, Staff_firstname + ' ' + Staff_lastname AS FullName, Staff_address, Staff_tel FROM Staff"
        ElseIf RadioButtonWard.Checked Then
            query = "SELECT Work_In.Staff_ID, Work_In.Ward_ID, Ward.Ward_name, Ward.Ward_locate, Work_In.Work_INDate, Work_In.Work_shift " &
                "FROM Work_In INNER JOIN Ward ON Work_In.Ward_ID = Ward.Ward_ID"
        End If

        ' แสดงข้อมูลใน DataGridView
        Using connection As New SqlConnection(connectionString)
            Using command As New SqlCommand(query, connection)
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()
                adapter.Fill(table)
                DataGridView1.DataSource = table
                DataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill
            End Using
        End Using
    End Sub

End Class
