
Imports System.Data.SqlClient

Public Class localdoctor
    Public Sub LoadDoctorData(Pt_ID As String)

        TextBoxPatientName.Text = Pt_ID
        ' สร้างการเชื่อมต่อกับฐานข้อมูล
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"
        Using conn As New SqlConnection(connectionString)
            conn.Open()

            ' SQL Query สำหรับดึงข้อมูล Local Doctor จากตาราง Patients
            Dim query As String = "SELECT Local_clinic_id, Local_doc_name, Local_doc_lastname, Local_doc_tel, Local_doc_address FROM Patient WHERE Pt_ID = @Pt_ID"

            Using cmd As New SqlCommand(query, conn)
                ' เพิ่ม Parameter สำหรับ Pt_ID
                cmd.Parameters.AddWithValue("@Pt_ID", Pt_ID)

                ' อ่านข้อมูลจากฐานข้อมูล
                Using reader As SqlDataReader = cmd.ExecuteReader()
                    If reader.Read() Then
                        ' ใส่ข้อมูลใน TextBox ต่างๆ ในฟอร์ม Local Doctor
                        TextBoxClinicID.Text = reader("Local_clinic_id").ToString()
                        TextBoxLocalDoctorName.Text = reader("Local_doc_name").ToString()
                        TextBoxLocalDoctorLastName.Text = reader("Local_doc_lastname").ToString()
                        TextBoxLocalDoctorTel.Text = reader("Local_doc_tel").ToString()
                        TextBoxLocalDoctorAddress.Text = reader("Local_doc_address").ToString()
                    Else
                        MessageBox.Show("ไม่พบข้อมูล Local Doctor")
                    End If
                End Using
            End Using
        End Using
    End Sub

    Private Sub btnSearch_Click(sender As Object, e As EventArgs) Handles manageSeacrhbutt.Click
        ' ตรวจสอบว่าใส่ค่า Patient ID หรือไม่
        If String.IsNullOrEmpty(TextBoxPatientName.Text) Then
            MessageBox.Show("กรุณาใส่ Patient ID")
            Return
        End If

        ' ใช้ connection string ของคุณ
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

        ' SQL Query ค้นหาข้อมูล Local Doctor โดยใช้ Patient ID
        Dim query As String = "SELECT Local_clinic_id, Local_doc_name, Local_doc_lastname, Local_doc_tel, Local_doc_address " &
                              "FROM Patient WHERE Pt_ID = @PatientID"

        Using conn As New SqlConnection(connectionString)
            Using cmd As New SqlCommand(query, conn)
                ' เพิ่ม Parameter สำหรับ Patient ID
                cmd.Parameters.AddWithValue("@PatientID", TextBoxPatientName.Text)

                Try
                    conn.Open()
                    Using reader As SqlDataReader = cmd.ExecuteReader()
                        ' ตรวจสอบว่ามีข้อมูลหรือไม่
                        If reader.Read() Then
                            ' แสดงข้อมูลใน TextBox
                            TextBoxClinicID.Text = reader("Local_clinic_id").ToString()
                            TextBoxLocalDoctorName.Text = reader("Local_doc_name").ToString()
                            TextBoxLocalDoctorLastName.Text = reader("Local_doc_lastname").ToString()
                            TextBoxLocalDoctorTel.Text = reader("Local_doc_tel").ToString()
                            TextBoxLocalDoctorAddress.Text = reader("Local_doc_address").ToString()
                        Else
                            MessageBox.Show("ไม่พบข้อมูล Local Doctor สำหรับ Patient ID นี้")
                        End If
                    End Using
                Catch ex As Exception
                    MessageBox.Show("เกิดข้อผิดพลาด: " & ex.Message)
                End Try
            End Using
        End Using
    End Sub

    Private Sub Button6_Click(sender As Object, e As EventArgs) Handles Button6.Click
        Me.Hide()
    End Sub
End Class

