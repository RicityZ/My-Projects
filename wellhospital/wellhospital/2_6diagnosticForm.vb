Imports System.Data.SqlClient
Imports System.Windows.Forms.VisualStyles.VisualStyleElement

Public Class diagnosticForm
    Public Sub SetPatientInfo(ptID As String, firstName As String, lastName As String)
        ' ตั้งค่าให้กับ textbox ในฟอร์ม AddDiagnosticForm
        TextBoxPtID.Text = ptID
        TextBoxFirstName.Text = firstName
        TextBoxLastName.Text = lastName
        TextBox5.Text = ptID
    End Sub
    Private Sub SearchButton_Click(sender As Object, e As EventArgs) Handles manageSeacrhbutt.Click
        ' สายการเชื่อมต่อฐานข้อมูล
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim connection As New SqlConnection(connectionString)

        Try
            connection.Open()

            ' สร้างคำสั่ง SQL สำหรับค้นหาข้อมูล
            Dim query As String = "SELECT App_ID, Staff_ID FROM Patient_appointment"

            ' ตรวจสอบว่ากรอก App_ID หรือไม่ ถ้ากรอกเพิ่มเงื่อนไขในคำสั่ง SQL
            If Not String.IsNullOrEmpty(TextBox6.Text) Then
                query += " AND App_ID = @AppID"
            End If

            Dim command As New SqlCommand(query, connection)


            ' ใช้ SqlDataAdapter ในการดึงข้อมูลจากฐานข้อมูล
            Dim adapter As New SqlDataAdapter(command)
            Dim table As New DataTable()
            adapter.Fill(table)

            ' แสดงข้อมูลใน DataGridView
            DataGridView1.DataSource = table

        Catch ex As Exception
            MessageBox.Show("Error: " & ex.Message)
        Finally
            connection.Close()
        End Try
    End Sub
    Private Sub DataGridView3_CellClick(sender As Object, e As DataGridViewCellEventArgs) Handles DataGridView1.CellClick
        ' ตรวจสอบว่าแถวที่ถูกเลือกมีค่า
        If e.RowIndex >= 0 Then
            ' สร้างตัวแปรสำหรับเก็บค่าแถวที่ถูกเลือก
            Dim selectedRow As DataGridViewRow = DataGridView1.Rows(e.RowIndex)

            ' ดึงค่า App_ID จากคอลัมน์ และแสดงใน TextBox
            TextBox6.Text = selectedRow.Cells("App_ID").Value.ToString()
        End If
    End Sub
    Private Sub ButtonSave_Click(sender As Object, e As EventArgs) Handles Button1.Click
        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Dim connection As New SqlConnection(connectionString)

        Try
            connection.Open()

            ' SQL Query สำหรับการ Insert ข้อมูลลงใน Medication_Head และให้บันทึก Med_order_date และ Pt_ID พร้อมกัน
            Dim query2 As String = "INSERT INTO Medication_Head (Med_order_date, Pt_ID) VALUES (@MedOrderDate, @PtID)"
            Dim command2 As New SqlCommand(query2, connection)

            ' เพิ่มค่า Parameters สำหรับ Med_order_date และ Pt_ID
            command2.Parameters.AddWithValue("@MedOrderDate", DateTime.Now) ' ใช้ค่าเวลาปัจจุบัน
            command2.Parameters.AddWithValue("@PtID", TextBox5.Text) ' Pt_ID มาจาก TextBox5

            ' รันคำสั่ง SQL สำหรับ Medication_Head
            command2.ExecuteNonQuery()

            ' หลังจากบันทึก Medication_Head เสร็จ ให้ดึง Med_ID ที่เพิ่งถูกสร้างขึ้นมา
            Dim query As String = "SELECT TOP 1 Med_ID FROM Medication_Head ORDER BY Med_ID DESC"
            Dim command As New SqlCommand(query, connection)

            ' รันคำสั่ง SQL และดึงค่า Med_ID ล่าสุด
            Dim latestMedID As Object = command.ExecuteScalar()

            If latestMedID IsNot Nothing Then
                ' แสดงค่า Med_ID ใน TextBox
                TextBox7.Text = latestMedID.ToString()

                ' SQL Query สำหรับการ Insert ข้อมูลลงใน Diagnosis_report พร้อมกับ Med_ID ล่าสุด
                Dim query1 As String = "INSERT INTO Diagnosis_report (Diagnosis_datetime, Diagnosis_detail, Exam_result, App_ID, Med_ID) " &
                                  "VALUES (@Datetime, @Detail, @Result, @AppID, @MedID)"

                Dim command1 As New SqlCommand(query1, connection)

                ' เพิ่มค่า Parameters จาก TextBox และ Control ต่างๆ สำหรับ Diagnosis_report
                command1.Parameters.AddWithValue("@Datetime", DateTimePicker1.Value)
                command1.Parameters.AddWithValue("@Detail", TextBox3.Text)
                command1.Parameters.AddWithValue("@Result", TextBox4.Text)
                command1.Parameters.AddWithValue("@AppID", TextBox6.Text)
                command1.Parameters.AddWithValue("@MedID", latestMedID) ' ใช้ Med_ID ที่เพิ่งสร้าง

                ' รันคำสั่ง SQL สำหรับ Diagnosis_report
                command1.ExecuteNonQuery()

                MessageBox.Show("Data inserted successfully!")
            Else
                MessageBox.Show("No Med_ID found!")
            End If

        Catch ex As Exception
            MessageBox.Show("Error: " & ex.Message)
        Finally
            ' ปิดการเชื่อมต่อฐานข้อมูล
            connection.Close()
        End Try
    End Sub



    ' Assuming Form2 is the new form and it has Patient ID and Med ID textboxes
    Private Sub NextButton_Click(sender As Object, e As EventArgs) Handles Button2.Click
        ' Get the values from the textboxes on the current form
        Dim patientId As String = TextBox5.Text
        Dim medId As String = TextBox7.Text

        ' Create a new instance of the second form
        Dim newForm As New DrugandsubForm()

        ' Pass the values to the new form
        newForm.PatientIDTextBox.Text = patientId
        newForm.MedIDTextBox.Text = medId

        ' Show the new form
        newForm.Show()

        ' Optionally, hide the current form if you want to move completely to the next form
        ' Me.Hide()
    End Sub

    Private Sub diagnosticForm_Load(sender As Object, e As EventArgs) Handles MyBase.Load

    End Sub

    Private Sub Button6_Click(sender As Object, e As EventArgs) Handles Button6.Click
        Me.Hide()
    End Sub
End Class