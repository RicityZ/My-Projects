Imports System.Data.SqlClient
Imports System.Windows.Forms.VisualStyles
Imports System.Windows.Forms.VisualStyles.VisualStyleElement

Public Class SearchPatient
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

    Private Sub manageSeacrhbutt_Click(sender As Object, e As EventArgs) Handles manageSeacrhbutt.Click
        ' Connection string to your database
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Using connection As New SqlConnection(connectionString)
            Try
                connection.Open()

                ' Query to search patients based on the entered ID or Name
                Dim query As String = "SELECT * FROM Patient WHERE Pt_ID LIKE @Search OR Pt_firstname LIKE @Search"
                Dim command As New SqlCommand(query, connection)
                command.Parameters.AddWithValue("@Search", "%" & TextBoxSearch.Text & "%")

                ' Adapter and DataTable to fill the DataGridView
                Dim adapter As New SqlDataAdapter(command)
                Dim table As New DataTable()
                adapter.Fill(table)
                DataGridViewPatients.DataSource = table

            Catch ex As Exception
                MessageBox.Show("Error: " & ex.Message)
            End Try
        End Using
    End Sub
    Private Sub DataGridView_CellClick(sender As Object, e As DataGridViewCellEventArgs) Handles DataGridViewPatients.CellClick
        If e.RowIndex >= 0 Then
            Dim row As DataGridViewRow = DataGridViewPatients.Rows(e.RowIndex)

            ' Populate TextBox fields
            TextBoxID.Text = row.Cells("Pt_ID").Value.ToString()
            TextBoxFirstName.Text = row.Cells("Pt_firstname").Value.ToString()
            TextBoxLastname.Text = row.Cells("Pt_lastname").Value.ToString()
            TextBoxTel.Text = row.Cells("Pt_tel").Value.ToString()
            DateTimePickerDOB.Text = DateTime.Parse(row.Cells("Pt_birth").Value.ToString())
            ComboBoxSex.Text = row.Cells("Pt_sex").Value.ToString()
            TextBoxMarital.Text = row.Cells("Pt_marital").Value.ToString()
            DateTimePickerRegisterDate.Value = DateTime.Parse(row.Cells("Pt_reg_date").Value.ToString())
            TextBoxAddress.Text = row.Cells("Pt_address").Value.ToString()
        End If
    End Sub


    Private Sub PTSearchButt_Click(sender As Object, e As EventArgs) Handles PTSearchButt.Click
        ' ประกาศ Connection String
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

        ' SQL Query เพื่อดึงข้อมูลจากตาราง staff
        Dim queryStaff As String = "SELECT Staff_ID, Staff_firstname, Staff_lastname, Staff_address, Staff_tel, Staff_DOB, Staff_sex, Staff_NIN, Staff_position, Staff_salary, Staff_salary_lv, Staff_hours, Staff_contract_type, Staff_payment_type FROM Staff"

        ' สร้าง Connection เพื่อเชื่อมต่อกับฐานข้อมูล
        Using connection As New SqlConnection(connectionString)
            ' สร้าง SqlCommand
            Using command As New SqlCommand(queryStaff, connection)
                ' สร้าง SqlDataAdapter เพื่อดึงข้อมูลจากฐานข้อมูล
                Dim adapter As New SqlDataAdapter(command)
                ' สร้าง DataTable เพื่อเก็บข้อมูลที่ดึงมา
                Dim table As New DataTable()

                ' เปิดการเชื่อมต่อ
                connection.Open()

                ' เติมข้อมูลลงใน DataTable
                adapter.Fill(table)

                ' แสดงข้อมูลใน DataGridView
                viewSearchPT.DataSource = table
            End Using
        End Using
    End Sub
    Private Sub DataGridViewStaff_CellClick(sender As Object, e As DataGridViewCellEventArgs) Handles viewSearchPT.CellClick
        ' ตรวจสอบว่าแถวที่คลิกมีข้อมูล
        If e.RowIndex >= 0 Then
            ' เลือกแถวที่ถูกคลิก
            Dim selectedRow As DataGridViewRow = viewSearchPT.Rows(e.RowIndex)

            ' ดึงค่า Staff_ID จากคอลัมน์ที่ต้องการ (เช่น คอลัมน์ที่ 0)
            Dim staffID As String = selectedRow.Cells("Staff_ID").Value.ToString()

            ' แสดงค่า Staff_ID ใน TextBox
            TextBox12.Text = staffID
        End If
    End Sub
    Private Sub ButtonSearch_Click(sender As Object, e As EventArgs) Handles PTSearchButt.Click
        ' ตรวจสอบให้แน่ใจว่ามีการป้อนค่า Staff ID ใน TextBox

        ' สร้าง Connection String
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

        ' สร้าง Query ค้นหา Staff ตาม Staff ID
        Dim query As String = "SELECT Staff_ID, Staff_firstname, Staff_lastname FROM Staff WHERE Staff_ID = @StaffID"

        ' สร้าง Connection และ Command
        Using conn As New SqlConnection(connectionString)
            Using cmd As New SqlCommand(query, conn)
                ' เพิ่ม Parameter ให้กับ Query
                cmd.Parameters.AddWithValue("@StaffID", TextBoxDoctor.Text)

                ' สร้าง DataAdapter และ DataTable เพื่อดึงข้อมูล
                Dim adapter As New SqlDataAdapter(cmd)
                Dim table As New DataTable()

                Try
                    ' เปิดการเชื่อมต่อฐานข้อมูล
                    conn.Open()
                    ' ดึงข้อมูลจากฐานข้อมูล
                    adapter.Fill(table)

                    ' ตรวจสอบว่ามีข้อมูลหรือไม่
                    If table.Rows.Count > 0 Then
                        ' แสดงข้อมูลใน DataGridView
                        viewSearchPT.DataSource = table

                    End If

                Catch ex As Exception
                    MessageBox.Show("เกิดข้อผิดพลาด: " & ex.Message)
                Finally
                    conn.Close() ' ปิดการเชื่อมต่อฐานข้อมูล
                End Try
            End Using
        End Using
    End Sub
    Private Sub ButtonSave_Click(sender As Object, e As EventArgs) Handles Button10.Click
        Try
            ' การเชื่อมต่อกับฐานข้อมูล
            Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

            ' สร้างการเชื่อมต่อ
            Using conn As New SqlConnection(connectionString)
                conn.Open()

                ' คำสั่ง SQL สำหรับอัปเดตข้อมูลรวมทั้ง Shift
                Dim query As String = "UPDATE Patient SET Pt_type = @Type, Pt_status = @Status, Ward_ID = @Ward, Shift_time = @Shift WHERE Pt_ID = @PtID"

                ' สร้าง SQL Command
                Using cmd As New SqlCommand(query, conn)
                    ' เพิ่ม Parameter จากข้อมูลที่กรอกในฟอร์ม
                    cmd.Parameters.AddWithValue("@Type", ComboBoxType.SelectedItem.ToString())
                    cmd.Parameters.AddWithValue("@Status", ComboBoxStatus.SelectedItem.ToString())
                    cmd.Parameters.AddWithValue("@Ward", ComboBoxWard.SelectedItem.ToString())
                    cmd.Parameters.AddWithValue("@Shift", ComboBoxShift.SelectedItem.ToString()) ' ค่า Shift เช่น Night
                    cmd.Parameters.AddWithValue("@PtID", TextBoxID.Text)

                    ' อัพเดทข้อมูล
                    cmd.ExecuteNonQuery()

                    ' แจ้งเตือนเมื่อบันทึกเสร็จ

                End Using
            End Using
        Catch ex As Exception
            ' แสดงข้อความเมื่อเกิดข้อผิดพลาด
            MessageBox.Show("เกิดข้อผิดพลาด: " & ex.Message)
        End Try
    End Sub
    ' ปุ่ม View Local Doctor
    ' ปุ่ม View Local Doctor
    Private Sub btnViewLocalDoctor_Click(sender As Object, e As EventArgs) Handles Button3.Click
        ' ตรวจสอบว่ามีการเลือกแถวใน DataGridView หรือไม่
        If DataGridViewPatients.SelectedRows.Count > 0 Then
            ' ดึงค่า Pt_ID จากแถวที่เลือกใน DataGridView
            Dim selectedPT_ID As String = DataGridViewPatients.SelectedRows(0).Cells("Pt_ID").Value.ToString()

            ' สร้างหน้าต่าง Local Doctor
            Dim localDoctorForm As New localdoctor()

            ' ส่งค่า Pt_ID ไปยังฟอร์ม Local Doctor
            localDoctorForm.LoadDoctorData(selectedPT_ID)

            ' เปิดฟอร์ม Local Doctor
            localDoctorForm.ShowDialog()
        Else
            MessageBox.Show("กรุณาเลือกผู้ป่วยจากรายการก่อน")
        End If
    End Sub




    Private Sub Button6_Click(sender As Object, e As EventArgs) Handles Button6.Click

        If DataGridViewPatients.SelectedRows.Count > 0 Then
            ' Get the selected Pt_ID from the DataGridView
            Dim selectedPtID As String = DataGridViewPatients.SelectedRows(0).Cells("Pt_ID").Value.ToString()

            ' Create an instance of the next of kin form
            Dim nextOfKinForm As New nextofkinForm()

            ' Pass the selected Pt_ID to the new form
            nextOfKinForm.LoadNextOfKin(selectedPtID)

            ' Show the next of kin form
            nextOfKinForm.ShowDialog()
        Else
            MessageBox.Show("กรุณาเลือกผู้ป่วยจากตารางก่อน")
        End If
    End Sub

    Private Sub ButtonUpdate_Click(sender As Object, e As EventArgs) Handles Button10.Click
        ' ตรวจสอบว่าช่อง ID ไม่ว่างเปล่า
        If TextBoxID.Text <> "" Then
            Try
                ' สร้างการเชื่อมต่อ SQL
                Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
                Using conn As New SqlConnection(connectionString)
                    conn.Open()

                    ' สร้าง SQL Query สำหรับการอัปเดตข้อมูล
                    Dim query As String = "UPDATE Patient SET Pt_firstname = @Pt_firstname, Pt_lastname = @Pt_lastname, Pt_tel = @Pt_tel, Pt_birth = @Pt_birth, Pt_marital = @Pt_marital, Pt_reg_date = @Pt_reg_date, Pt_type = @Pt_type, Pt_status = @Pt_status, Ward_ID = @Ward_ID, Shift_time = @Shift_time, Staff_ID = @Staff_ID WHERE Pt_ID = @Pt_ID"

                    ' ใช้ SqlCommand และใส่ค่าจาก TextBox
                    Using cmd As New SqlCommand(query, conn)
                        cmd.Parameters.AddWithValue("@Pt_firstname", TextBoxFirstName.Text)
                        cmd.Parameters.AddWithValue("@Pt_lastname", TextBoxLastname.Text)
                        cmd.Parameters.AddWithValue("@Pt_tel", TextBoxTel.Text)
                        cmd.Parameters.AddWithValue("@Pt_birth", DateTimePickerDOB.Text)
                        cmd.Parameters.AddWithValue("@Pt_marital", TextBoxMarital.Text)
                        cmd.Parameters.AddWithValue("@Pt_reg_date", DateTimePickerRegisterDate.Value)
                        cmd.Parameters.AddWithValue("@Pt_type", ComboBoxType.SelectedItem.ToString())
                        cmd.Parameters.AddWithValue("@Pt_status", ComboBoxStatus.SelectedItem.ToString())
                        cmd.Parameters.AddWithValue("@Ward_ID", ComboBoxWard.SelectedItem.ToString())
                        cmd.Parameters.AddWithValue("@Shift_time", ComboBoxShift.SelectedItem.ToString())
                        cmd.Parameters.AddWithValue("@Staff_ID", TextBox12.Text) ' เพิ่ม Staff_ID ที่จะอัปเดต
                        cmd.Parameters.AddWithValue("@Pt_ID", TextBoxID.Text)

                        ' เรียกใช้คำสั่ง ExecuteNonQuery เพื่อทำการอัปเดต
                        Dim rowsAffected As Integer = cmd.ExecuteNonQuery()

                        ' ตรวจสอบว่าการอัปเดตสำเร็จหรือไม่
                        If rowsAffected > 0 Then
                            MessageBox.Show("ข้อมูลอัปเดตเรียบร้อยแล้ว")
                            ' โหลดข้อมูลใหม่ไปยัง DataGridView
                            LoadData()
                        Else
                            MessageBox.Show("ไม่พบข้อมูลที่ต้องการอัปเดต")
                        End If
                    End Using
                End Using

            Catch ex As Exception
                MessageBox.Show("เกิดข้อผิดพลาด: " & ex.Message)
            End Try
        Else
            MessageBox.Show("กรุณาใส่ Patient ID")
        End If
    End Sub

    Private Sub LoadData()
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim query As String = "SELECT * FROM Patient"

        Using conn As New SqlConnection(connectionString)
            Using cmd As New SqlCommand(query, conn)
                Dim adapter As New SqlDataAdapter(cmd)
                Dim table As New DataTable()

                adapter.Fill(table)
                DataGridViewPatients.DataSource = table
            End Using
        End Using
    End Sub
    Private Sub DataGridView1_CellClick(sender As Object, e As DataGridViewCellEventArgs) Handles DataGridViewPatients.CellClick
        If e.RowIndex >= 0 Then
            Dim row As DataGridViewRow = DataGridViewPatients.Rows(e.RowIndex)
            TextBoxID.Text = row.Cells("Pt_ID").Value.ToString()
        End If
        ' ตรวจสอบว่าแถวที่คลิกไม่ใช่ header
        If e.RowIndex >= 0 Then
            ' ดึงค่า Pt_ID จากแถวที่เลือก
            Dim selectedRow As DataGridViewRow = DataGridViewPatients.Rows(e.RowIndex)
            Dim ptID As String = selectedRow.Cells("Pt_ID").Value.ToString()

            ' เปิดฟอร์มใหม่และส่งค่า ptID ไปแสดงใน TextBox
            Dim form2 As New appiontmentform()
            form2.TextBoxPatientName.Text = ptID ' สมมติว่า TextBox ในฟอร์มใหม่ชื่อว่า TextBoxPtID

        End If
    End Sub


    Private Sub ButtonDelete_Click(sender As Object, e As EventArgs) Handles Button9.Click
        If TextBoxID.Text <> "" Then
            Try
                Dim result As DialogResult = MessageBox.Show("คุณต้องการลบข้อมูลนี้หรือไม่?", "ยืนยันการลบ", MessageBoxButtons.YesNo)
                If result = DialogResult.Yes Then
                    Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
                    Using conn As New SqlConnection(connectionString)
                        conn.Open()

                        ' ลบข้อมูลในตาราง Next_of_kin ก่อน
                        Dim queryDeleteNextOfKin As String = "DELETE FROM Next_of_kin WHERE Pt_ID = @Pt_ID"
                        Using cmdDeleteNextOfKin As New SqlCommand(queryDeleteNextOfKin, conn)
                            cmdDeleteNextOfKin.Parameters.AddWithValue("@Pt_ID", TextBoxID.Text)
                            cmdDeleteNextOfKin.ExecuteNonQuery()
                        End Using

                        ' จากนั้นลบข้อมูลในตาราง Patient
                        Dim queryDeletePatient As String = "DELETE FROM Patient WHERE Pt_ID = @Pt_ID"
                        Using cmdDeletePatient As New SqlCommand(queryDeletePatient, conn)
                            cmdDeletePatient.Parameters.AddWithValue("@Pt_ID", TextBoxID.Text)
                            cmdDeletePatient.ExecuteNonQuery()
                        End Using

                        MessageBox.Show("ข้อมูลถูกลบเรียบร้อยแล้ว")
                        LoadData()
                    End Using
                End If

            Catch ex As Exception
                MessageBox.Show("เกิดข้อผิดพลาด: " & ex.Message)
            End Try
        Else
            MessageBox.Show("กรุณาเลือกข้อมูลที่ต้องการลบ")
        End If
    End Sub



    Private Sub btnAppointment_Click(sender As Object, e As EventArgs) Handles appbutt.Click
        ' ตรวจสอบว่ามีแถวใน DataGridView ที่ถูกเลือกหรือไม่
        If DataGridViewPatients.SelectedRows.Count > 0 Then
            ' ดึงค่า Pt_ID จากแถวที่เลือก
            Dim selectedPtID As String = DataGridViewPatients.SelectedRows(0).Cells("Pt_ID").Value.ToString()

            ' สร้างฟอร์ม Appointment ใหม่
            Dim appointmentForm As New appiontmentform()

            ' ส่งค่า Pt_ID ไปที่ฟอร์ม Appointment
            appointmentForm.LoadAppointmentData(selectedPtID)

            ' เปิดฟอร์ม Appointment
            appointmentForm.ShowDialog()

        Else
            MessageBox.Show("กรุณาเลือกผู้ป่วยก่อนทำการนัดหมาย")
        End If

    End Sub

    ' สมมุติว่า DataGridView ของคุณชื่อว่า DataGridView1
    ' และปุ่ม Add Diagnostic ชื่อว่า btnAddDiagnostic

    Private Sub Button8_Click(sender As Object, e As EventArgs) Handles Button8.Click
        ' ตรวจสอบว่าได้เลือกแถวใน DataGridView หรือไม่
        If DataGridViewPatients.SelectedRows.Count > 0 Then
            ' ดึงข้อมูลจากแถวที่เลือก
            Dim selectedRow As DataGridViewRow = DataGridViewPatients.SelectedRows(0)
            Dim ptID As String = selectedRow.Cells("Pt_ID").Value.ToString()
            Dim firstName As String = selectedRow.Cells("Pt_firstname").Value.ToString()
            Dim lastName As String = selectedRow.Cells("Pt_lastname").Value.ToString()

            ' เปิดฟอร์ม AddDiagnosticForm และส่งข้อมูลไปยังฟอร์มนั้น
            Dim diagnosticForm As New diagnosticForm()
            diagnosticForm.SetPatientInfo(ptID, firstName, lastName)
            diagnosticForm.Show()
        Else
            MessageBox.Show("กรุณาเลือกผู้ป่วยจากตาราง", "การเลือกผู้ป่วย", MessageBoxButtons.OK, MessageBoxIcon.Information)
        End If
    End Sub


End Class